'use strict';

const { createServer } = require('node:http');
const { createReadStream, promises: fs } = require('node:fs');
const path = require('node:path');

const publicRoot = path.resolve(__dirname, 'artifacts/recipe-publication/dist/public');
const notFoundFile = path.join(publicRoot, '404.html');
const rawPort = process.env.PORT;
const port = Number(rawPort);

if (!rawPort || !Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be set to a valid TCP port.');
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

function sendText(res, status, message, method) {
  const body = `${message}\n`;
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(method === 'HEAD' ? undefined : body);
}

function resolveRequestPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relative = decoded.replace(/^\/+/, '') || 'index.html';
  const candidate = path.resolve(publicRoot, relative);
  if (candidate !== publicRoot && !candidate.startsWith(`${publicRoot}${path.sep}`)) {
    return null;
  }
  return candidate;
}

async function resolveFile(pathname) {
  const candidate = resolveRequestPath(pathname);
  if (!candidate) return { file: notFoundFile, status: 404 };

  try {
    const stats = await fs.stat(candidate);
    const file = stats.isDirectory() ? path.join(candidate, 'index.html') : candidate;
    const fileStats = stats.isDirectory() ? await fs.stat(file) : stats;
    return fileStats.isFile() ? { file, status: 200 } : { file: notFoundFile, status: 404 };
  } catch {
    return { file: notFoundFile, status: 404 };
  }
}

const server = createServer(async (req, res) => {
  const method = req.method || 'GET';
  if (method !== 'GET' && method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return sendText(res, 405, 'Method not allowed.', method);
  }

  let pathname;
  try {
    pathname = new URL(req.url || '/', 'http://localhost').pathname;
  } catch {
    return sendText(res, 400, 'Invalid request URL.', method);
  }

  let resolved;
  try {
    resolved = await resolveFile(pathname);
  } catch {
    return sendText(res, 400, 'Invalid request path.', method);
  }

  const isNotFound = resolved.status === 404;
  let stats;
  try {
    stats = await fs.stat(resolved.file);
  } catch {
    return sendText(res, 404, 'Not found.', method);
  }

  let notFoundHtml;
  if (isNotFound && path.extname(resolved.file).toLowerCase() === '.html') {
    try {
      const html = await fs.readFile(resolved.file, 'utf8');
      notFoundHtml = html.replace(/<\/head>/i, '<base href="/">\n</head>');
    } catch {
      notFoundHtml = 'Not found.\n';
    }
  }

  const headers = {
    'Content-Type': contentTypes[path.extname(resolved.file).toLowerCase()] || 'application/octet-stream',
    'Content-Length': notFoundHtml === undefined ? stats.size : Buffer.byteLength(notFoundHtml),
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff',
  };
  res.writeHead(resolved.status, headers);

  if (method === 'HEAD') return res.end();

  if (notFoundHtml !== undefined) return res.end(notFoundHtml);

  const stream = createReadStream(resolved.file);
  stream.on('error', () => {
    if (!res.headersSent) return sendText(res, 500, 'Unable to read the requested file.', method);
    res.destroy();
  });
  stream.pipe(res);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`The Sunday Table is listening on port ${port}.`);
});
