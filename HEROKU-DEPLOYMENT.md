# Deploy The Sunday Table to Heroku

The site builds without a configured domain and works at the public URL assigned by Heroku or another host. Heroku builds the static recipe pages from this pnpm workspace and serves them with a small Node.js server on the assigned `PORT`.

## Deploy

From the repository root:

```sh
heroku login
heroku create
git push heroku HEAD:main
```

The build does not require the app URL in advance. Without `SITE_BASE_URL`, it uses relative canonical links and page navigation, and omits absolute Open Graph/structured-data URLs and the sitemap.

After deployment, you may set `SITE_BASE_URL` to the HTTPS origin assigned to the app to enable absolute canonical/structured-data URLs and a sitemap. This is optional and does not affect whether the site runs.

Google can crawl the linked pages without a sitemap, but Search Console verification and Google Ads setup require the live destination URL.

After deploying, check a recipe page and a missing page:

```sh
heroku open --app your-app-name
heroku logs --tail --app your-app-name
```

Never place a Heroku API key or account token in this repository or in chat. Authenticate with the Heroku CLI on your own machine.

## Local smoke test

```sh
pnpm run heroku-postbuild
PORT=5000 pnpm start
```

The generated `dist` output is build-only and is created during the build.

## Optional JCI homepage learning collector

The Heroku server supports the supplied standalone fingerprint-learning protocol.
The PHP relay has been adapted to Node.js; no PHP buildpack is needed.
Only the homepage (`/` and `/index.html`, including query strings) loads the collector.
Recipe/category pages, static exports, and the Replit static preview do not load it.

Tracking is off by default. Configure these in the Heroku app's **Settings →
Config Vars**, not in source files, GitHub, or browser HTML:

- `JCI_ENABLED`: `true` to enable; remove it or set `false` to disable.
- `JCI_USER_ID`: the `JCI_FINGERPRINT_USER_ID` value in your supplied PHP code.
- `JCI_CAMPAIGN_ID`: the `JCI_FINGERPRINT_CAMPAIGN_ID` value in that code.
- `JCI_INSTALLATION_KEY`: the private installation key in that code.
- `JCI_ALLOWED_ORIGINS` (optional): comma-separated exact HTTPS origins without
  trailing slashes, to further restrict requests. By default, only the same
  origin serving the page is accepted, so no public URL is required in advance.

If enabled configuration is incomplete, the server warns, omits the collector
from the homepage, and returns an explicit 503 on tracking endpoints. The site
still works. The relay rejects cross-origin requests, oversized/invalid payloads,
and excessive collection requests. It forwards the client IP appended by Heroku
rather than trusting arbitrary IP headers.

The collector posts to `/tracking/jci-fingerprint`. The server sends only fixed
JCI primary/fallback endpoints, does not follow redirects, and returns only a
collection acknowledgement—not upstream page content or navigation commands.
The installation key is added server-side, including inside the fingerprint
payload, instead of being embedded in the browser as in the supplied snippet.

Before enabling live collection, update the privacy notice for IP collection and
browser fingerprinting and assess any applicable consent requirements. The
collector preserves the supplied canvas, WebGL, audio, device, screen, language,
timezone, plugin, and automation signals. It does not set cookies or write
persistent browser storage, but fingerprinting still has privacy implications.

Run offline protocol/security checks with:

```sh
node --test scripts/jci-fingerprint.test.cjs
```

After enabling, load the homepage and check the JCI learning log. A 200 response
from the local relay means JCI returned a successful JSON acknowledgement; actual
dashboard recording must still be confirmed against the live JCI account.
