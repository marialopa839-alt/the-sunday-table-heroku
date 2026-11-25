'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createServer, request } = require('node:http');
const { once } = require('node:events');
const { readFileSync } = require('node:fs');
const { spawn } = require('node:child_process');
const { webcrypto } = require('node:crypto');
const path = require('node:path');
const vm = require('node:vm');
const { createJciTracking, RELAY_PATH, SCRIPT_PATH } = require('./jci-fingerprint.cjs');

// Dummy credentials and local/mock requests only. No JCI network traffic.
const env = {
  JCI_ENABLED: 'true', JCI_USER_ID: 'unit-test-account',
  JCI_CAMPAIGN_ID: '123', JCI_INSTALLATION_KEY: 'unit-test-private-key',
};
const payload = {
  fingerprint_hash: 'a'.repeat(64), components: { screen: 'b'.repeat(64) },
  fingerprint: {}, automation: {}, timestamp: 123456789,
};

async function fixture(t, options = {}) {
  const calls = [];
  const tracker = createJciTracking({
    env, fetchImpl: async (url, init) => {
      calls.push({ url, init, payload: JSON.parse(init.body) });
      return Response.json({ ok: true });
    }, ...options,
  });
  const server = createServer(async (req, res) => {
    if (!await tracker.handle(req, res, new URL(req.url, 'http://localhost').pathname)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(tracker.inject('<html><head></head><body>Recipes</body></html>'));
    }
  }).listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => { server.closeAllConnections(); server.close(); });
  const origin = `http://127.0.0.1:${server.address().port}`;
  const post = (body = payload, options = {}) => fetch(origin + RELAY_PATH, {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify(body), ...options,
  });
  return { tracker, calls, origin, post };
}

test('collector is opt-in and disabled sites keep their original HTML', async t => {
  const { tracker, origin, calls } = await fixture(t, { env: {} });
  assert.equal(tracker.ready, false);
  assert.equal(tracker.inject('<head></head>'), '<head></head>');
  assert.equal((await fetch(origin + SCRIPT_PATH)).status, 503);
  assert.equal(calls.length, 0);
});

test('same-origin collection forwards the JCI protocol with server-owned credentials', async t => {
  const { post, calls, origin } = await fixture(t);
  const res = await post({ ...payload, installation_key: 'attacker-value', visitor_ip: 'attacker-value' });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, queued: false });
  assert.equal(res.headers.get('location'), null);
  assert.equal(calls.length, 1);
  const sent = calls[0].payload;
  assert.equal(calls[0].url, 'https://jclit.com/fingerprint/unit-test-account/123');
  assert.equal(calls[0].init.redirect, 'error');
  assert.equal(sent.installation_key, env.JCI_INSTALLATION_KEY);
  assert.equal(sent.fingerprint_payload.installation_key, env.JCI_INSTALLATION_KEY);
  assert.equal(sent.source_origin, origin);
  assert.equal(sent.visitor_ip, '127.0.0.1');
  assert.equal(sent.campaign_id, 123);
  assert.match(sent.event_id, /^[a-f0-9]{32}$/);
  assert.equal(sent.fingerprint_payload.visitor_ip, undefined);
});

test('collector script is credential-free and injected asynchronously', async t => {
  const { tracker, origin } = await fixture(t);
  assert.match(tracker.inject('<head></head>'), /<script defer src="\/tracking\/jci-fingerprint.js">/);
  const response = await fetch(origin + SCRIPT_PATH);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /javascript/);
  const source = await response.text();
  assert.equal(source.includes(env.JCI_INSTALLATION_KEY), false);
  assert.doesNotMatch(source, /location\s*=|location\.(?:replace|assign)\(|document\.write\(/);
});

test('cross-origin, missing-origin, wrong-method and non-JSON requests are rejected', async t => {
  const { post, origin, calls } = await fixture(t);
  assert.equal((await post(payload, { headers: { Origin: 'https://attacker.invalid', 'Content-Type': 'application/json' } })).status, 403);
  assert.equal((await post(payload, { headers: { 'Content-Type': 'application/json' } })).status, 403);
  assert.equal((await fetch(origin + RELAY_PATH, { headers: { Origin: origin } })).status, 405);
  assert.equal((await post(payload, { headers: { Origin: origin, 'Content-Type': 'text/plain' } })).status, 415);
  assert.equal(calls.length, 0);
});

test('invalid and oversized JSON cannot reach JCI', async t => {
  const { post, calls } = await fixture(t);
  assert.equal((await post([])).status, 422);
  assert.equal((await post({}, { body: '{' })).status, 422);
  assert.equal((await post({ ...payload, extra: 'x'.repeat(262144) })).status, 413);
  assert.equal(calls.length, 0);
});

test('chunked oversized input returns 413 rather than forwarding or resetting', async t => {
  const { origin, calls } = await fixture(t);
  const status = await new Promise((resolve, reject) => {
    const req = request(origin + RELAY_PATH, {
      method: 'POST',
      headers: { Origin: origin, 'Content-Type': 'application/json', 'Transfer-Encoding': 'chunked' },
    }, res => { res.resume(); resolve(res.statusCode); });
    req.on('error', reject);
    req.write('x'.repeat(200000)); req.end('x'.repeat(100000));
  });
  assert.equal(status, 413);
  assert.equal(calls.length, 0);
});

test('primary outage falls back with the same event and ignores upstream navigation fields', async t => {
  const calls = [];
  const { post } = await fixture(t, {
    fetchImpl: async (url, init) => {
      calls.push({ url, payload: JSON.parse(init.body) });
      return calls.length === 1 ? Response.json({}, { status: 503 })
        : Response.json({ ok: true, redirect: 'https://not-followed.invalid', html: '<script>bad()</script>' });
    },
  });
  const response = await post();
  assert.deepEqual(await response.json(), { ok: true, queued: true });
  assert.match(calls[1].url, /fingerprint-offline/);
  assert.deepEqual(calls[0].payload, calls[1].payload);
});

test('an account rejection is not disguised as a success or retried', async t => {
  let calls = 0;
  const { post } = await fixture(t, {
    fetchImpl: async () => { calls++; return Response.json({ ok: false }, { status: 401 }); },
  });
  assert.equal((await post()).status, 502);
  assert.equal(calls, 1);
});

test('failed primary and fallback return a controlled error', async t => {
  const { post, tracker } = await fixture(t, { fetchImpl: async () => { throw new Error('offline'); } });
  const response = await post();
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /unit-test-private-key|offline/);
  assert.match(tracker.inject('<head></head>'), /<script defer/);
});

test('Heroku uses the appended IP and rejects attacker-controlled IP alternatives', async t => {
  const sent = [];
  const { post, origin } = await fixture(t, {
    env: { ...env, DYNO: 'web.1' },
    fetchImpl: async (_, init) => { sent.push(JSON.parse(init.body)); return Response.json({ ok: true }); },
  });
  const response = await post(payload, { headers: {
    Origin: origin, 'Content-Type': 'application/json', 'X-Forwarded-Proto': 'http',
    'X-Forwarded-For': '1.1.1.1, 8.8.8.8', 'CF-Connecting-IP': '9.9.9.9',
  } });
  assert.equal(response.status, 200);
  assert.equal(sent[0].visitor_ip, '8.8.8.8');
});

test('non-Heroku deployments ignore forwarded IP headers', async t => {
  const { post, origin, calls } = await fixture(t);
  await post(payload, { headers: {
    Origin: origin, 'Content-Type': 'application/json', 'X-Forwarded-For': '8.8.8.8',
  } });
  assert.equal(calls[0].payload.visitor_ip, '127.0.0.1');
});

test('request rate limits protect the collection relay', async t => {
  const { post, calls } = await fixture(t);
  for (let i = 0; i < 30; i++) assert.equal((await post()).status, 200);
  const limited = await post();
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '60');
  assert.equal(calls.length, 30);
});

test('browser collector produces the expected learning payload without navigation or storage writes', async () => {
  const source = readFileSync(path.join(__dirname, 'jci-fingerprint-browser.js'), 'utf8');
  let complete;
  const done = new Promise(resolve => { complete = resolve; });
  const browser = {
    innerWidth: 1000, innerHeight: 800, devicePixelRatio: 1,
    location: { href: 'https://recipes.invalid/' }, localStorage: {}, indexedDB: {},
  };
  browser.self = browser; browser.top = browser;
  let sent;
  vm.runInNewContext(source, {
    document: {
      currentScript: { src: 'https://recipes.invalid/tracking/jci-fingerprint.js' },
      createElement: () => ({ getContext: () => null }),
    },
    window: browser,
    navigator: { language: 'en', languages: ['en'], hardwareConcurrency: 4 },
    screen: { width: 1200, height: 900, availWidth: 1200, availHeight: 900, colorDepth: 24, pixelDepth: 24 },
    crypto: webcrypto, TextEncoder, URL, AbortSignal, setTimeout, clearTimeout,
    console: { debug: () => {} },
    fetch: async (url, init) => {
      sent = { url, init, data: JSON.parse(init.body) };
      complete();
      return Response.json({ ok: true });
    },
  });
  await Promise.race([done, new Promise((_, reject) => {
    const timer = setTimeout(() => reject(new Error('Collector did not submit.')), 3000);
    timer.unref();
  })]);
  assert.equal(sent.url, 'https://recipes.invalid/tracking/jci-fingerprint');
  assert.equal(sent.init.redirect, 'error');
  assert.equal(sent.data.installation_key, undefined);
  assert.equal(sent.data.minimum_signals, 5);
  assert.match(sent.data.fingerprint_hash, /^[a-f0-9]{64}$/);
  assert.equal(Object.keys(sent.data.fingerprint).length, 9);
  assert.equal(Object.keys(sent.data.automation).length, 5);
});

test('real Heroku server injects only home routes and preserves static pages and 404s', async t => {
  // Port zero is intentionally not allowed by the production server; reserve a
  // temporary port before starting it with dummy credentials.
  const reservation = createServer().listen(0, '127.0.0.1');
  await once(reservation, 'listening');
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  const child = spawn(process.execPath, ['heroku-server.cjs'], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, ...env, PORT: String(port), DYNO: '' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  t.after(() => child.kill());
  await Promise.race([
    once(child.stdout, 'data'),
    new Promise((_, reject) => {
      const timer = setTimeout(() => reject(new Error('Server did not start.')), 5000);
      timer.unref();
    }),
  ]);
  const origin = `http://127.0.0.1:${port}`;
  for (const route of ['/', '/index.html', '/?utm_source=test', '/index.html?campaign=test']) {
    const response = await fetch(origin + route);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.equal(html.split(`src="${SCRIPT_PATH}"`).length - 1, 1);
    assert.equal(Buffer.byteLength(html), Number(response.headers.get('content-length')));
    assert.equal(html.includes(env.JCI_INSTALLATION_KEY), false);
  }
  for (const route of ['/recipes.html', '/recipes/honey-garlic-salmon.html', '/privacy-policy.html']) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200);
    assert.equal((await response.text()).includes(SCRIPT_PATH), false);
  }
  assert.equal((await fetch(origin + '/missing-page')).status, 404);
  assert.equal((await fetch(origin + '/index.html', { method: 'HEAD' })).status, 200);
});
