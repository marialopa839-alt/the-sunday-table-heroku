'use strict';

const fs = require('node:fs');
const path = require('node:path');

const configPath = path.resolve(__dirname, '../artifacts/recipe-publication/site-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const configuredUrl = process.env.SITE_BASE_URL || config.siteBaseUrl;

if (!configuredUrl) {
  console.log('SITE_BASE_URL is unset; building a host-independent site without absolute SEO URLs or sitemap.xml.');
  process.exit(0);
}

let parsed;
try {
  parsed = new URL(configuredUrl);
} catch {
  console.error('SITE_BASE_URL must be a valid public HTTPS origin.');
  process.exit(1);
}

const isValidOrigin = parsed.protocol === 'https:' &&
  parsed.pathname === '/' &&
  !parsed.search &&
  !parsed.hash &&
  !parsed.username &&
  !parsed.password;

if (!isValidOrigin) {
  console.error('SITE_BASE_URL must be a public HTTPS origin, without a path, query, or fragment.');
  process.exit(1);
}

console.log(`Using public site origin ${parsed.origin}.`);
