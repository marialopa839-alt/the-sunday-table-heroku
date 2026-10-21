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
