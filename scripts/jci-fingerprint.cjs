'use strict';

// Server-side equivalent of the supplied standalone JCI learning-mode PHP relay.
// This module never redirects requests or returns upstream content to visitors.
const { randomBytes } = require('node:crypto');
const { isIP } = require('node:net');
const { readFileSync } = require('node:fs');
const path = require('node:path');

const RELAY_PATH = '/tracking/jci-fingerprint';
const SCRIPT_PATH = '/tracking/jci-fingerprint.js';
const MAX_BODY = 262144;
const MAX_RESPONSE = 65536;
const script = readFileSync(path.join(__dirname, 'jci-fingerprint-browser.js'), 'utf8');

function configuration(env) {
  if (env.JCI_ENABLED !== 'true') return { ready: false, reason: 'Tracking is disabled.' };
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(env.JCI_USER_ID || '') ||
      !/^[1-9]\d*$/.test(env.JCI_CAMPAIGN_ID || '') ||
      !(env.JCI_INSTALLATION_KEY || '').trim()) {
    return { ready: false, reason: 'JCI server configuration is incomplete.' };
  }
  const origins = (env.JCI_ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  for (const origin of origins) {
    try {
      const url = new URL(origin);
      if (url.protocol !== 'https:' || url.origin !== origin) throw new Error();
    } catch {
      return { ready: false, reason: 'JCI_ALLOWED_ORIGINS must contain exact HTTPS origins.' };
    }
  }
  const suffix = `${env.JCI_USER_ID}/${env.JCI_CAMPAIGN_ID}`;
  return {
    ready: true,
    userId: env.JCI_USER_ID,
    campaignId: Number(env.JCI_CAMPAIGN_ID),
    installationKey: env.JCI_INSTALLATION_KEY.trim(),
    primary: `https://jclit.com/fingerprint/${suffix}`,
    fallback: `https://jclit.com/fingerprint-offline/${suffix}`,
    trustHerokuProxy: Boolean(env.DYNO),
    origins,
  };
}

function sendJson(res, status, body) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(json),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(json);
}

function allowedOrigin(req, config) {
  const origin = req.headers.origin;
  if (!origin || typeof origin !== 'string') return false;
  try {
    const url = new URL(origin);
    if (url.origin !== origin || !['http:', 'https:'].includes(url.protocol)) return false;
    if (config.origins.length) return config.origins.includes(origin);
    // No preconfigured hostname required. Never trust a client-supplied forwarded host.
    const protocol = config.trustHerokuProxy
      ? String(req.headers['x-forwarded-proto'] || 'https').split(',').at(-1).trim()
      : req.socket.encrypted ? 'https' : 'http';
    return origin === `${protocol}://${req.headers.host}`;
  } catch {
    return false;
  }
}

function visitorIp(req, config) {
  // Heroku appends the connecting client's IP. Do not trust arbitrary CF/client-IP
  // headers, or the leftmost X-Forwarded-For value supplied by a client.
  if (config.trustHerokuProxy) {
    const candidate = String(req.headers['x-forwarded-for'] || '').split(',').at(-1).trim();
    if (isIP(candidate)) return candidate;
  }
  return req.socket.remoteAddress || '';
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

async function readPayload(req) {
  const declared = Number(req.headers['content-length'] || 0);
  if (declared > MAX_BODY) throw Object.assign(new Error('Request too large.'), { status: 413 });
  const raw = await new Promise((resolve, reject) => {
    const parts = [];
    let size = 0;
    const timer = setTimeout(() => fail(408, 'Request timed out.'), 10000);
    timer.unref();
    function cleanup() {
      clearTimeout(timer);
      req.off('data', onData);
      req.off('end', onEnd);
      req.off('error', onError);
      req.off('aborted', onAborted);
    }
    function fail(status, message) {
      cleanup();
      req.resume();
      reject(Object.assign(new Error(message), { status }));
    }
    function onData(chunk) {
      size += chunk.length;
      if (size > MAX_BODY) return fail(413, 'Request too large.');
      parts.push(chunk);
    }
    function onEnd() { cleanup(); resolve(Buffer.concat(parts).toString('utf8')); }
    function onError() { fail(400, 'Request could not be read.'); }
    function onAborted() { fail(400, 'Request was aborted.'); }
    req.on('data', onData);
    req.on('end', onEnd);
    req.on('error', onError);
    req.on('aborted', onAborted);
  });
  let data;
  try { data = JSON.parse(raw); } catch {
    throw Object.assign(new Error('Invalid JSON.'), { status: 422 });
  }
  if (!isRecord(data) || !/^[a-f0-9]{64}$/.test(data.fingerprint_hash || '') ||
      !isRecord(data.components) || !isRecord(data.fingerprint) ||
      !isRecord(data.automation) || !Number.isFinite(data.timestamp)) {
    throw Object.assign(new Error('Invalid fingerprint payload.'), { status: 422 });
  }
  return {
    fingerprint_hash: data.fingerprint_hash,
    components: data.components,
    fingerprint: data.fingerprint,
    automation: data.automation,
    minimum_signals: 5,
    timestamp: data.timestamp,
  };
}

async function callPlatform(fetchImpl, url, body, timeout) {
  try {
    const response = await fetchImpl(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body,
      redirect: 'error',
      signal: AbortSignal.timeout(timeout),
    });
    if (Number(response.headers.get('content-length') || 0) > MAX_RESPONSE) throw new Error('Oversized response.');
    const chunks = [];
    let size = 0;
    if (response.body) {
      for await (const chunk of response.body) {
        size += chunk.length;
        if (size > MAX_RESPONSE) throw new Error('Oversized response.');
        chunks.push(Buffer.from(chunk));
      }
    }
    const decoded = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!isRecord(decoded)) throw new Error('Invalid response.');
    return {
      retry: [408, 425, 429].includes(response.status) || response.status >= 500,
      accepted: response.ok && decoded.ok !== false && decoded.success !== false,
    };
  } catch {
    return { retry: true, accepted: false };
  }
}

function createJciTracking({ env = process.env, fetchImpl = fetch } = {}) {
  const config = configuration(env);
  const windows = new Map();
  if (env.JCI_ENABLED === 'true' && !config.ready) {
    console.warn(config.reason); // Never print credentials, IPs, or fingerprints.
  }
  function rateLimited(ip) {
    const now = Date.now();
    if (windows.size >= 5000) {
      for (const [key, entry] of windows) if (entry.until <= now) windows.delete(key);
      if (windows.size >= 5000 && !windows.has(ip)) return true;
    }
    const entry = windows.get(ip);
    if (!entry || entry.until <= now) {
      windows.set(ip, { until: now + 60000, count: 1 });
      return false;
    }
    return ++entry.count > 30;
  }
  return {
    ready: config.ready,
    inject(html) {
      return config.ready
        ? html.replace(/<\/head>/i, `<script defer src="${SCRIPT_PATH}"></script>\n</head>`)
        : html;
    },
    async handle(req, res, pathname) {
      if (pathname !== RELAY_PATH && pathname !== SCRIPT_PATH) return false;
      if (!config.ready) {
        sendJson(res, 503, { ok: false, error: config.reason });
        return true;
      }
      if (pathname === SCRIPT_PATH) {
        if (!['GET', 'HEAD'].includes(req.method)) {
          res.setHeader('Allow', 'GET, HEAD');
          sendJson(res, 405, { ok: false, error: 'Method not allowed.' });
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/javascript; charset=utf-8',
            'Content-Length': Buffer.byteLength(script),
            'Cache-Control': 'no-store',
            'X-Content-Type-Options': 'nosniff',
          });
          res.end(req.method === 'HEAD' ? undefined : script);
        }
        return true;
      }
      // Same-origin collector only: no wildcard CORS or externally configurable destination.
      if (!allowedOrigin(req, config)) {
        sendJson(res, 403, { ok: false, error: 'Origin is not allowed.' });
        return true;
      }
      if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        sendJson(res, 405, { ok: false, error: 'Method not allowed.' });
        return true;
      }
      if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) {
        sendJson(res, 415, { ok: false, error: 'JSON is required.' });
        return true;
      }
      const ip = visitorIp(req, config);
      if (rateLimited(ip)) {
        res.setHeader('Retry-After', '60');
        sendJson(res, 429, { ok: false, error: 'Too many requests.' });
        return true;
      }
      try {
        const payload = await readPayload(req);
        payload.installation_key = config.installationKey;
        const body = JSON.stringify({
          event_id: randomBytes(16).toString('hex'),
          user_id: config.userId,
          campaign_id: config.campaignId,
          installation_key: config.installationKey,
          visitor_ip: ip,
          source_origin: req.headers.origin,
          fingerprint_payload: payload,
        });
        let result = await callPlatform(fetchImpl, config.primary, body, 8000);
        let queued = false;
        if (result.retry) {
          result = await callPlatform(fetchImpl, config.fallback, body, 10000);
          queued = result.accepted;
        }
        // Never return upstream HTML, URLs, response headers, or instructions.
        sendJson(res, result.accepted ? 200 : 502, result.accepted
          ? { ok: true, queued }
          : { ok: false, error: 'Tracking service did not accept the event.' });
      } catch (error) {
        sendJson(res, error.status || 500, { ok: false, error: error.status ? error.message : 'Tracking request failed.' });
      }
      return true;
    },
  };
}

module.exports = { createJciTracking, RELAY_PATH, SCRIPT_PATH };
