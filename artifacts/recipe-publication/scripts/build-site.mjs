// Static page generator for The Sunday Table.
// Run: pnpm --filter @workspace/recipe-publication run generate
// Writes plain .html files into the artifact root (and recipes/). The output
// has no build-time or runtime dependencies; upload it to any static host.
import fs from 'fs';
import path from 'path';
import { recipes, categories, unsplash } from './recipes-data.mjs';

const SITE_NAME = 'The Sunday Table';
const siteConfig = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../site-config.json'), 'utf8'));
const configuredSiteBaseUrl = process.env.SITE_BASE_URL?.trim() || siteConfig.siteBaseUrl?.trim() || '';
const DOMAIN = (() => {
  if (!configuredSiteBaseUrl) return '';
  const parsed = new URL(configuredSiteBaseUrl);
  if (parsed.protocol !== 'https:' || parsed.pathname !== '/' || parsed.search || parsed.hash || parsed.username || parsed.password) {
    throw new Error('SITE_BASE_URL must be an HTTPS origin without a path, query, or fragment.');
  }
  return parsed.origin;
})();
const OWNER_NAME = 'Radhe foods LLC';
const BUSINESS_ADDRESS = '1622 SW Bayshore Blvd, Port St. Lucie, FL 34984, United States';
const UPDATED = 'Last updated: October 21, 2026';

const root = path.resolve(import.meta.dirname, '..');
const bySlug = Object.fromEntries(recipes.map((r) => [r.slug, r]));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (src, w) => src.replace('w=1400', `w=${w}`);
const total = (r) => r.prep + r.cook;
const mins = (m) => (m >= 60 ? `${Math.floor(m / 60)} hr${m % 60 ? ` ${m % 60} min` : ''}` : `${m} min`);
const iso = (m) => `PT${m >= 60 ? Math.floor(m / 60) + 'H' : ''}${m % 60 ? (m % 60) + 'M' : m === 0 ? '0M' : ''}`;
const catName = (s) => categories.find((c) => c.slug === s)?.name || s;
const catFile = (s) => categories.find((c) => c.slug === s)?.file;

const NAV = [
  ['index.html', 'Home'], ['recipes.html', 'Recipes'], ['breakfast.html', 'Breakfast'], ['lunch.html', 'Lunch'],
  ['dinner.html', 'Dinner'], ['desserts.html', 'Desserts'], ['healthy.html', 'Healthy'], ['quick-easy.html', 'Quick &amp; Easy'], ['about.html', 'About'],
];

function layout({ file, title, description, body, p = '', ogImage, ogType = 'website', jsonld = '', bodyClass = '' }) {
  const url = DOMAIN ? `${DOMAIN}/${file === 'index.html' ? '' : file}` : '';
  const canonicalUrl = url || (file === 'index.html' ? './' : `${p}${file}`);
  const og = ogImage || img(unsplash('photo-1467003909585-2f8a72700288'), 1200);
  const nav = NAV.map(([h, l]) => `<li><a href="${p}${h}"${h === file ? ' aria-current="page"' : ''}>${l}</a></li>`).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonicalUrl}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${ogType}">
${url ? `<meta property="og:url" content="${url}">` : ''}
<meta property="og:image" content="${esc(og)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(og)}">
<meta name="theme-color" content="#f6efe3">
<link rel="icon" type="image/svg+xml" href="${p}favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=Instrument+Sans:wght@400;500;600&display=swap">
<link rel="stylesheet" href="${p}css/style.css">
${jsonld}
<script defer src="https://cloud.umami.is/script.js" data-website-id="eaea93b0-ea14-4b4f-9acc-f4680692850b" data-exclude-search="true"></script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Skip to content</a>
<header class="masthead">
  <div class="masthead__bar wrap">
    <a class="brand" href="${p}index.html" aria-label="${SITE_NAME} home">
      <span class="brand__mark" aria-hidden="true"><svg viewBox="0 0 40 40" width="34" height="34"><circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="20" cy="20" r="11" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M6 33 L12 27 M34 33 L28 27" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>
      <span class="brand__name">The Sunday<em> Table</em></span>
    </a>
    <form class="search-mini" action="${p}recipes.html" method="get" role="search">
      <label class="sr-only" for="q-top">Search recipes</label>
      <input id="q-top" name="q" type="search" placeholder="Search chicken, pasta, salmon..." autocomplete="off">
      <button type="submit" aria-label="Search"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    </form>
    <a class="saved-link" href="${p}recipes.html?saved=1" data-saved-link>Saved <span class="saved-count" data-saved-count>0</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="menu-toggle__lines" aria-hidden="true"></span><span class="menu-toggle__label">Menu</span></button>
  </div>
  <nav id="site-nav" class="site-nav" aria-label="Main">
    <ul class="wrap">${nav}</ul>
  </nav>
</header>
<main id="main">
${body}
</main>
<footer class="footer">
  <div class="wrap footer__grid">
    <div class="footer__about">
      <p class="footer__brand">The Sunday<em> Table</em></p>
      <p>An independent recipe publication for home cooks. Clear recipes, useful cooking notes and honest details about what can go wrong.</p>
    </div>
    <nav aria-label="Recipe categories"><h2 class="footer__h">Recipes</h2><ul>
      <li><a href="${p}recipes.html">All recipes</a></li>${categories.map((c) => `<li><a href="${p}${c.file}">${c.name}</a></li>`).join('')}</ul></nav>
    <nav aria-label="About the publication"><h2 class="footer__h">The publication</h2><ul>
      <li><a href="${p}about.html">About</a></li><li><a href="${p}kitchen-guide.html">Kitchen guide</a></li><li><a href="${p}contact.html">Contact</a></li><li><a href="${p}privacy-policy.html">Privacy policy</a></li><li><a href="${p}terms.html">Terms of use</a></li></ul></nav>
  </div>
  <div class="wrap footer__legal">
    <p>&copy; <span data-year>2025</span> ${SITE_NAME}. Operated by ${OWNER_NAME}. Nutrition values are estimates and not medical advice. Food photography via Unsplash; see each photographer's licence.</p>
  </div>
</footer>
<script src="${p}js/main.js" defer></script>
</body>
</html>
`;
}

const meta = (r) => `<ul class="meta"><li><span>Prep</span>${mins(r.prep)}</li><li><span>Cook</span>${r.cook ? mins(r.cook) : 'No cook'}</li><li><span>Level</span>${r.diff}</li></ul>`;

function card(r, p, { lazy = true, size = '' } = {}) {
  const searchText = `${r.title} ${r.cats.map(catName).join(' ')} ${r.keywords} ${r.cuisine}`.toLowerCase();
  return `<article class="card ${size}" data-recipe="${r.slug}" data-cats="${r.cats.join(' ')}" data-search="${esc(searchText)}">
  <a class="card__media" href="${p}recipes/${r.slug}.html" tabindex="-1" aria-hidden="true"><img src="${esc(img(r.img, 800))}" alt="${esc(r.alt)}" width="800" height="600"${lazy ? ' loading="lazy"' : ''} decoding="async"></a>
  <button class="fav" type="button" data-fav="${r.slug}" aria-pressed="false" aria-label="Save ${esc(r.title)} to your saved recipes"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill="currentColor"/></svg></button>
  <div class="card__body">
    <p class="kicker">${r.cat} <span aria-hidden="true">/</span> ${mins(total(r))}</p>
    <h3 class="card__title"><a href="${p}recipes/${r.slug}.html">${r.title}</a></h3>
    <p class="card__desc">${r.desc}</p>
    <p class="card__foot"><span>${r.diff}</span><span>Serves ${r.serves}</span><a class="card__link" href="${p}recipes/${r.slug}.html" aria-label="View recipe: ${esc(r.title)}">View recipe</a></p>
  </div>
</article>`;
}

/* ------------------------------ Recipe pages ------------------------------ */
function recipePage(r) {
  const p = '../';
  const primaryCat = r.cats[0];
  const flatIng = r.ingredients.flatMap((g) => g.items);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Recipe', name: r.title, description: r.desc,
    image: [img(r.img, 1400)], author: { '@type': 'Organization', name: SITE_NAME, ...(DOMAIN ? { url: `${DOMAIN}/` } : {}) },
    prepTime: iso(r.prep), cookTime: iso(r.cook), totalTime: iso(total(r)), recipeYield: r.yieldText,
    recipeCategory: r.cat, recipeCuisine: r.cuisine, keywords: r.keywords.split(' ').join(', '),
    recipeIngredient: flatIng,
    recipeInstructions: r.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })),
    nutrition: { '@type': 'NutritionInformation', servingSize: '1 serving', calories: `${r.nutrition.calories} calories`, proteinContent: r.nutrition.protein, carbohydrateContent: r.nutrition.carbs, fatContent: r.nutrition.fat, fiberContent: r.nutrition.fiber },
  };
  const crumbs = DOMAIN ? { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
    { '@type': 'ListItem', position: 2, name: catName(primaryCat), item: `${DOMAIN}/${catFile(primaryCat)}` },
    { '@type': 'ListItem', position: 3, name: r.title, item: `${DOMAIN}/recipes/${r.slug}.html` }] } : null;
  const jsonld = `<script type="application/ld+json">${JSON.stringify(ld)}</script>${crumbs ? `\n<script type="application/ld+json">${JSON.stringify(crumbs)}</script>` : ''}`;
  const related = r.related.map((s) => bySlug[s]);
  const more = recipes.filter((x) => x.slug !== r.slug && !r.related.includes(x.slug) && x.cats.some((c) => r.cats.includes(c))).slice(0, 3);
  const fill = more.length < 3 ? recipes.filter((x) => x.slug !== r.slug && !r.related.includes(x.slug) && !more.includes(x)).slice(0, 3 - more.length) : [];
  const timeExtra = r.chill || r.rise;
  const body = `
<article class="recipe" data-recipe-page="${r.slug}">
  <header class="recipe-head wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="${p}index.html">Home</a></li><li><a href="${p}${catFile(primaryCat)}">${catName(primaryCat)}</a></li><li aria-current="page">${r.title}</li></ol></nav>
    <p class="kicker kicker--lg">${r.cats.map((c) => `<a href="${p}${catFile(c)}">${catName(c)}</a>`).join('<span aria-hidden="true"> / </span>')}</p>
    <h1 class="recipe-title">${r.title}</h1>
    <p class="dek">${r.desc}</p>
    <div class="recipe-actions">
      <a class="btn btn--solid" href="#recipe-card">Jump to recipe</a>
      <button class="btn" type="button" data-print>Print recipe</button>
      <button class="btn fav-btn" type="button" data-fav="${r.slug}" aria-pressed="false"><span data-fav-label>Save recipe</span></button>
    </div>
  </header>
  <figure class="recipe-hero wrap">
    <img src="${esc(img(r.img, 1400))}" alt="${esc(r.alt)}" width="1400" height="900" fetchpriority="high">
    <figcaption>Photo via Unsplash, used for illustration. Your finished dish may look different.</figcaption>
  </figure>
  <div class="recipe-layout wrap">
    <div class="recipe-main">
      <section class="intro prose" aria-labelledby="about-dish">
        <h2 id="about-dish" class="sr-only">About this dish</h2>
        ${r.intro.map((t, i) => `<p${i === 0 ? ' class="dropcap"' : ''}>${t}</p>`).join('\n        ')}
      </section>
      <dl class="facts" aria-label="Recipe summary">
        <div><dt>Prep time</dt><dd>${mins(r.prep)}</dd></div>
        <div><dt>Cook time</dt><dd>${r.cook ? mins(r.cook) : 'None'}</dd></div>
        <div><dt>Total time</dt><dd>${mins(total(r))}${timeExtra ? `<small>+ ${timeExtra.replace(/^(Chill|Dough rises)/, (m) => m.toLowerCase())}</small>` : ''}</dd></div>
        <div><dt>Servings</dt><dd>${r.serves}<small>${r.yieldText}</small></dd></div>
        <div><dt>Difficulty</dt><dd>${r.diff}</dd></div>
      </dl>
      <section id="recipe-card" class="recipe-card" aria-labelledby="ing-h">
        <div class="recipe-card__ing">
          <h2 id="ing-h">Ingredients</h2>
          <p class="note">Tick items off as you gather them. Your checks are not saved.</p>
          ${r.ingredients.map((g, gi) => `${g.h ? `<h3>${g.h}</h3>` : ''}<ul class="ing">${g.items.map((it, i) => `<li><label><input type="checkbox"> <span>${it}</span></label></li>`).join('')}</ul>`).join('\n')}
        </div>
        <div class="recipe-card__steps">
          <h2>Method</h2>
          <ol class="steps">${r.steps.map((s) => `<li><p>${s}</p></li>`).join('')}</ol>
        </div>
      </section>
      <section class="notes" aria-labelledby="tips-h">
        <h2 id="tips-h">Cook's notes</h2>
        <ul class="ticks">${r.tips.map((t) => `<li>${t}</li>`).join('')}</ul>
      </section>
      <div class="split">
        <section aria-labelledby="subs-h"><h2 id="subs-h">Substitutions</h2><ul class="ticks">${r.subs.map((t) => `<li>${t}</li>`).join('')}</ul></section>
        <section aria-labelledby="vars-h"><h2 id="vars-h">Variations</h2><ul class="ticks">${r.vars.map((t) => `<li>${t}</li>`).join('')}</ul></section>
      </div>
      <div class="split">
        <section aria-labelledby="store-h"><h2 id="store-h">Storage</h2><p>${r.storage}</p></section>
        <section aria-labelledby="reheat-h"><h2 id="reheat-h">Reheating</h2><p>${r.reheat}</p></section>
      </div>
      <section class="nutrition" aria-labelledby="nut-h">
        <h2 id="nut-h">Approximate nutrition <small>per serving</small></h2>
        <dl class="nut">
          <div><dt>Calories</dt><dd>${r.nutrition.calories}</dd></div><div><dt>Protein</dt><dd>${r.nutrition.protein}</dd></div><div><dt>Carbohydrates</dt><dd>${r.nutrition.carbs}</dd></div><div><dt>Fat</dt><dd>${r.nutrition.fat}</dd></div><div><dt>Fibre</dt><dd>${r.nutrition.fiber}</dd></div>
        </dl>
        <p class="disclaimer">These figures are estimates calculated from typical ingredients. Actual values vary with brands, quantities, substitutions and preparation, and optional toppings are not included. They are provided for general information and are not medical or dietary advice.</p>
      </section>
      ${r.faqs.length ? `<section class="faq" aria-labelledby="faq-h"><h2 id="faq-h">Questions</h2>${r.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>` : ''}
    </div>
    <aside class="recipe-aside" aria-label="Related recipes">
      <div class="aside-sticky">
        <h2 class="aside-h">Related recipes</h2>
        <ul class="mini-list">${related.map((x) => `<li><a href="${x.slug}.html"><img src="${esc(img(x.img, 240))}" alt="${esc(x.alt)}" width="96" height="96" loading="lazy" decoding="async"><span><small>${x.cat}</small>${x.title}</span></a></li>`).join('')}</ul>
        <p class="aside-browse">Browse more <a href="${p}${catFile(primaryCat)}">${catName(primaryCat)} recipes</a> or the <a href="${p}kitchen-guide.html">kitchen guide</a>.</p>
      </div>
    </aside>
  </div>
</article>
<section class="band band--soft" aria-labelledby="ymal-h">
  <div class="wrap">
    <h2 id="ymal-h" class="section-title">You may also like</h2>
    <div class="grid grid--3">${[...more, ...fill].map((x) => card(x, p)).join('')}</div>
  </div>
</section>`;
  return layout({ file: `recipes/${r.slug}.html`, p, title: `${r.title} Recipe | ${SITE_NAME}`, description: `${r.desc} Ready in ${mins(total(r))}, serves ${r.serves}. Includes tips, substitutions and storage notes.`.slice(0, 300), body, ogImage: img(r.img, 1200), ogType: 'article', jsonld, bodyClass: 'page-recipe' });
}

/* ------------------------------ Category pages ---------------------------- */
function categoryPage(c) {
  const list = recipes.filter((r) => r.cats.includes(c.slug));
  const others = categories.filter((x) => x.slug !== c.slug);
  const body = `
<section class="cat-hero">
  <div class="wrap cat-hero__inner">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">Home</a></li><li><a href="recipes.html">Recipes</a></li><li aria-current="page">${c.name}</li></ol></nav>
    <p class="kicker kicker--lg">${list.length} recipes</p>
    <h1 class="display">${c.name}</h1>
    <p class="dek">${c.dek}</p>
  </div>
  <img class="cat-hero__img" src="${esc(img(unsplash(c.img), 1400))}" alt="${esc(recipes.find((r) => r.img.includes(c.img))?.alt || c.name)}" width="1400" height="700" fetchpriority="high">
</section>
<section class="wrap section">
  <p class="lede">${c.intro}</p>
  <div class="grid grid--3">${list.map((r) => card(r, '')).join('')}</div>
</section>
<section class="band band--soft"><div class="wrap">
  <h2 class="section-title">Other sections</h2>
  <ul class="chips">${others.map((o) => `<li><a class="chip" href="${o.file}">${o.name}</a></li>`).join('')}<li><a class="chip" href="recipes.html">All recipes</a></li></ul>
</div></section>`;
  return layout({ file: c.file, title: `${c.name} Recipes | ${SITE_NAME}`, description: `${c.dek} ${list.length} original ${c.name.toLowerCase().replace('&amp;', 'and')} recipes with clear steps and tips.`, body, ogImage: img(unsplash(c.img), 1200) });
}

/* ------------------------------ All recipes ------------------------------- */
function recipesPage() {
  const filters = [['all', 'All'], ['breakfast', 'Breakfast'], ['lunch', 'Lunch'], ['dinner', 'Dinner'], ['desserts', 'Dessert'], ['healthy', 'Healthy'], ['quick-easy', 'Quick &amp; Easy'], ['saved', 'Saved']];
  const body = `
<section class="wrap page-head">
  <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">Home</a></li><li aria-current="page">Recipes</li></ol></nav>
  <h1 class="display">Every recipe</h1>
  <p class="dek">All ${recipes.length} recipes in one place. Search by dish, ingredient or category, or narrow it down with the filters.</p>
</section>
<section class="wrap finder" aria-label="Find a recipe" data-finder>
  <div class="finder__search">
    <label for="finder-q">Search recipes</label>
    <input id="finder-q" type="search" placeholder="Try chicken, pasta, salmon, breakfast, dessert" autocomplete="off" data-finder-input>
    <button class="btn btn--ghost" type="button" data-finder-clear>Clear</button>
  </div>
  <div class="filters" role="group" aria-label="Filter by category">
    ${filters.map(([v, l], i) => `<button type="button" class="filter${i === 0 ? ' is-active' : ''}" data-filter="${v}" aria-pressed="${i === 0}">${l}</button>`).join('')}
  </div>
  <p class="finder__status" role="status" aria-live="polite" data-finder-status>Showing all ${recipes.length} recipes</p>
  <div class="grid grid--3" data-finder-grid>${recipes.map((r, i) => card(r, '', { lazy: i > 2 })).join('')}</div>
  <div class="empty" data-finder-empty hidden>
    <p class="empty__title">Nothing matches that yet.</p>
    <p data-empty-text>Try a main ingredient such as chicken, salmon or pasta, or clear the search to see everything.</p>
    <button class="btn btn--solid" type="button" data-finder-reset>Show all recipes</button>
  </div>
</section>`;
  return layout({ file: 'recipes.html', title: `All Recipes | ${SITE_NAME}`, description: `Browse and search all ${recipes.length} recipes from The Sunday Table by name, category or main ingredient, from breakfast pancakes to baked cheesecake.`, body });
}

/* ------------------------------ Home -------------------------------------- */
function homePage() {
  const hero = bySlug['honey-garlic-salmon'];
  const second = ['fluffy-buttermilk-pancakes', 'mediterranean-chickpea-bowl', 'classic-tiramisu'].map((s) => bySlug[s]);
  const popular = ['garlic-butter-chicken', 'creamy-tuscan-pasta', 'margherita-pizza', 'classic-beef-tacos', 'avocado-egg-toast', 'creamy-tomato-pasta'].map((s) => bySlug[s]);
  const quick = ['garlic-pasta', 'chicken-quesadillas', 'one-pan-lemon-chicken', 'chicken-vegetable-stir-fry'].map((s) => bySlug[s]);
  const healthy = ['quinoa-vegetable-bowl', 'grilled-salmon-salad', 'berry-overnight-oats'].map((s) => bySlug[s]);
  const desserts = ['chocolate-lava-cake', 'classic-tiramisu', 'strawberry-cheesecake'].map((s) => bySlug[s]);
  const body = `
<section class="hero wrap" aria-labelledby="hero-h">
  <div class="hero__lead">
    <a class="hero__media" href="recipes/${hero.slug}.html" tabindex="-1" aria-hidden="true"><img src="${esc(img(hero.img, 1400))}" alt="${esc(hero.alt)}" width="1400" height="1000" fetchpriority="high"></a>
    <div class="hero__copy">
      <p class="kicker kicker--lg">This week's feature <span aria-hidden="true">/</span> ${hero.cat}</p>
      <h1 id="hero-h" class="hero__title"><a href="recipes/${hero.slug}.html">${hero.title}</a></h1>
      <p class="dek">${hero.intro[0]}</p>
      ${meta(hero)}
      <a class="btn btn--solid" href="recipes/${hero.slug}.html">View recipe</a>
    </div>
  </div>
  <div class="hero__side">
    <p class="side-label">Also on the table</p>
    ${second.map((r) => `<article class="side-item"><a href="recipes/${r.slug}.html"><img src="${esc(img(r.img, 400))}" alt="${esc(r.alt)}" width="400" height="300" decoding="async"><span><small class="kicker">${r.cat} / ${mins(total(r))}</small><strong>${r.title}</strong><em>${r.desc}</em></span></a></article>`).join('')}
  </div>
</section>

<section class="wrap section home-search" aria-labelledby="hs-h">
  <h2 id="hs-h" class="sr-only">Search recipes</h2>
  <form class="big-search" action="recipes.html" method="get" role="search">
    <label for="q-home">What are you cooking?</label>
    <div><input id="q-home" name="q" type="search" placeholder="Chicken, pasta, salmon, breakfast, dessert..."><button class="btn btn--solid" type="submit">Search</button></div>
  </form>
</section>

<section class="wrap section" aria-labelledby="pop-h">
  <div class="section-head"><h2 id="pop-h" class="section-title">Popular recipes</h2><a class="more" href="recipes.html">All ${recipes.length} recipes</a></div>
  <div class="grid grid--3">${popular.map((r) => card(r, '')).join('')}</div>
</section>

<section class="band band--ink" aria-labelledby="cat-h">
  <div class="wrap">
    <h2 id="cat-h" class="section-title">Browse by category</h2>
    <ul class="cat-grid">${categories.map((c, i) => `<li><a class="cat-tile" href="${c.file}"><img src="${esc(img(unsplash(c.img), 600))}" alt="${esc(recipes.find((r) => r.img.includes(c.img))?.alt || c.name)}" width="600" height="450" loading="lazy" decoding="async"><span class="cat-tile__n">0${i + 1}</span><span class="cat-tile__name">${c.name}</span><span class="cat-tile__count">${recipes.filter((r) => r.cats.includes(c.slug)).length} recipes</span></a></li>`).join('')}</ul>
  </div>
</section>

<section class="wrap section" aria-labelledby="quick-h">
  <div class="section-head"><h2 id="quick-h" class="section-title">Quick weeknight meals</h2><a class="more" href="quick-easy.html">More quick recipes</a></div>
  <p class="lede">Dinners that come together in about half an hour, most in a single pan.</p>
  <ol class="list-rows">${quick.map((r, i) => `<li><a href="recipes/${r.slug}.html"><span class="num">${String(i + 1).padStart(2, '0')}</span><img src="${esc(img(r.img, 300))}" alt="${esc(r.alt)}" width="300" height="200" loading="lazy" decoding="async"><span class="row-copy"><strong>${r.title}</strong><span>${r.desc}</span></span><span class="row-time">${mins(total(r))}</span></a></li>`).join('')}</ol>
</section>

<section class="band band--sage" aria-labelledby="healthy-h">
  <div class="wrap">
    <div class="section-head"><h2 id="healthy-h" class="section-title">Healthy picks</h2><a class="more" href="healthy.html">All healthy recipes</a></div>
    <p class="lede">Vegetable-forward meals with whole grains and lean protein. Everyday good eating, not a diet plan.</p>
    <div class="grid grid--3">${healthy.map((r) => card(r, '')).join('')}</div>
  </div>
</section>

<section class="wrap section" aria-labelledby="dess-h">
  <div class="section-head"><h2 id="dess-h" class="section-title">Something sweet</h2><a class="more" href="desserts.html">All desserts</a></div>
  <div class="dessert-row">${desserts.map((r, i) => card(r, '', { size: i === 0 ? 'card--tall' : '' })).join('')}</div>
</section>

<section class="band band--paper" aria-labelledby="tips-h">
  <div class="wrap tips">
    <div class="tips__intro"><p class="kicker kicker--lg">From the kitchen guide</p><h2 id="tips-h" class="section-title">Six habits that make every recipe work better</h2><p>Small, repeatable things that matter more than any special equipment. The <a href="kitchen-guide.html">full kitchen guide</a> goes deeper.</p></div>
    <ol class="tip-list">
      <li><h3>Read the whole recipe first</h3><p>Before you turn on the heat, read every step. Rests, chill times and "reserve the pasta water" are easy to miss halfway through.</p></li>
      <li><h3>Prep before you cook</h3><p>Chop, measure and line up ingredients first. Fast methods like stir-frying leave no time to mince garlic mid-recipe.</p></li>
      <li><h3>Salt in stages</h3><p>Season pasta water, then the sauce, then taste at the end. Small amounts at each stage taste better than one big pinch.</p></li>
      <li><h3>Dry what you want to brown</h3><p>Pat chicken, fish and chickpeas dry. Surface moisture has to evaporate before browning can begin.</p></li>
      <li><h3>Give food room</h3><p>Crowded pans steam instead of sear. Cook in batches or use two pans.</p></li>
      <li><h3>Trust a thermometer</h3><p>An inexpensive instant-read thermometer takes the guesswork out of meat, fish and even custards.</p></li>
    </ol>
  </div>
</section>

<section class="wrap section about-strip" aria-labelledby="ab-h">
  <h2 id="ab-h" class="section-title">About this publication</h2>
  <p>${SITE_NAME} publishes practical, original recipes with clear measurements, honest timings and the kind of notes you would want from a friend who has made the dish before. There are no pop-ups and no sponsored recipes. <a href="about.html">Read how we write and select recipes</a>.</p>
</section>`;
  return layout({ file: 'index.html', title: `${SITE_NAME} | Practical Recipes for Home Cooks`, description: 'Original, clearly written recipes for home cooks: breakfasts, lunches, weeknight dinners, healthy bowls and dependable desserts, with tips, substitutions and storage notes.', body, ogImage: img(hero.img, 1200),
    jsonld: DOMAIN ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: `${DOMAIN}/`, potentialAction: { '@type': 'SearchAction', target: `${DOMAIN}/recipes.html?q={search_term_string}`, 'query-input': 'required name=search_term_string' } })}</script>` : '' });
}

/* ------------------------------ Info pages -------------------------------- */
const page = (file, title, description, h1, dek, inner) => layout({ file, title: `${title} | ${SITE_NAME}`, description, body: `
<section class="wrap page-head">
  <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">Home</a></li><li aria-current="page">${title}</li></ol></nav>
  <h1 class="display">${h1}</h1>
  <p class="dek">${dek}</p>
</section>
<div class="wrap doc">${inner}</div>` });

const about = page('about.html', 'About', 'About The Sunday Table: what we publish, how recipes are developed and selected, and the editorial standards behind every page.', 'About The Sunday Table', 'A small, independent recipe publication for people who cook at home.', `
<div class="prose">
<h2>What this site is</h2>
<p>${SITE_NAME} is an online recipe publication. It collects everyday recipes, from breakfasts and packable lunches to weeknight dinners and a handful of reliable desserts, and explains them clearly enough that you can cook them successfully the first time.</p>
<h2>Why it exists</h2>
<p>Many recipes online are hard to use. Ingredient amounts are vague, timings are optimistic, and the one detail that makes the dish work is buried or missing. We want each page here to be the one you keep coming back to: measurements in both US and metric where practical, numbered steps, realistic times, and notes on what to do when you do not have an ingredient.</p>
<h2>What we publish</h2>
<ul>
<li>Familiar dishes that home cooks actually make, written with care rather than novelty for its own sake.</li>
<li>Recipes using ingredients found in ordinary supermarkets.</li>
<li>Substitutions, variations, storage and reheating guidance for each recipe.</li>
<li>Practical technique in our <a href="kitchen-guide.html">kitchen guide</a>.</li>
</ul>
<h2>How recipes are developed and selected</h2>
<p>Recipes are chosen because they are useful: they solve a real mealtime need, work with standard equipment, and can be explained clearly. We do not claim that every recipe has been cooked and tested. Cooking times and results can vary by kitchen, ingredients and equipment.</p>
<h2>Editorial philosophy</h2>
<ul>
<li><strong>Clarity first.</strong> Every step should be something you can act on.</li>
<li><strong>Honesty about time.</strong> Total time includes the real work, and chill or rise times are listed separately.</li>
<li><strong>No sensational claims.</strong> We describe food plainly. We do not make health, weight-loss or medical claims, and nutrition figures are labelled as estimates.</li>
<li><strong>Content over clutter.</strong> The recipe is the point of the page. If advertising is ever added, it will be clearly separated from recipe content and will never be disguised as navigation or buttons.</li>
<li><strong>Corrections welcome.</strong> If something does not work, please <a href="contact.html">tell us</a>. We will review and update the recipe.</li>
</ul>
<h2>Who runs this site</h2>
<p>${SITE_NAME} is operated by ${OWNER_NAME}.</p>
<h2>Independence</h2>
<p>${SITE_NAME} is not affiliated with, endorsed by or sponsored by any search engine, advertising platform, food brand or retailer. Product or brand names that appear in recipes are used descriptively.</p>
<h2>Photography</h2>
<p>Food photographs on this site are currently sourced from Unsplash and are used for illustration. They are the work of their respective photographers, and ${SITE_NAME} does not claim ownership of them. A finished dish made from our recipe may look different.</p>
</div>`);

const contact = page('contact.html', 'Contact', 'Contact The Sunday Table by post with recipe questions, corrections or feedback.', 'Get in touch', 'Questions about a recipe, a correction, or a dish that did not turn out as expected? Write to us at the mailing address below.', `
<div class="contact-grid">
<section class="prose" aria-labelledby="direct-h">
  <h2 id="direct-h">Contact details</h2>
  <dl class="contact-dl">
    <div><dt>Publication</dt><dd>${SITE_NAME}</dd></div>
    <div><dt>Operated by</dt><dd>${OWNER_NAME}</dd></div>
    <div><dt>Postal address</dt><dd><address>${BUSINESS_ADDRESS}</address></dd></div>
  </dl>
  <h3>Helpful details to include</h3>
  <ul><li>The recipe name or page link.</li><li>Any substitutions you made.</li><li>What happened, and at which step.</li></ul>
</section>
</div>`);

const privacy = page('privacy-policy.html', 'Privacy Policy', 'How The Sunday Table handles information, postal correspondence, cookies, analytics, advertising and privacy.', 'Privacy policy', UPDATED, `
<div class="prose">
<h2>Who we are</h2>
<p>${SITE_NAME} is operated by ${OWNER_NAME}. Postal correspondence may be sent to ${BUSINESS_ADDRESS}.</p>
<h2>Information we collect</h2>
<p>You can read every recipe without creating an account or giving us personal information. Information may be collected in these ways:</p>
<ul><li><strong>Postal correspondence</strong>, including any contact details and message you choose to include in a letter sent to our mailing address.</li><li><strong>Technical information</strong> that the hosting service may process to deliver and secure the site, such as IP address, browser type, pages requested and time of request.</li><li><strong>Information stored on your device</strong>, described under "Cookies and local storage".</li></ul>
<h2>Postal correspondence</h2>
<p>If you write to us at the postal address on our contact page, your letter may contain personal information. We use information you include to handle your inquiry. Do not send sensitive personal information by post.</p>
<h2>Newsletter subscriptions</h2>
<p>${SITE_NAME} does not currently offer a newsletter.</p>
<h2>Cookies and local storage</h2>
<p>The site itself does not set cookies. It uses your browser's local storage to remember recipes you save with the "Save" button. Saved recipe names stay on your device and can be removed by clearing this site's browser storage.</p>
<p>Fonts are loaded from Google Fonts, so your browser connects to Google's servers when a page loads.</p>
<h2>Analytics</h2>
<p>We use Umami Cloud to measure visits to this site. Its tracker loads automatically on site pages and may record page views and related visit information such as referrers, device and browser details, and location estimates. The script is configured to exclude URL search parameters. Umami states that its tracker works without cookies or cross-site tracking and does not automatically collect personal data. See the <a href="https://docs.umami.is/docs" rel="noopener noreferrer">Umami documentation</a>. Analytics use is subject to the privacy rules that apply in the regions where this site is used.</p>
<h2>Advertising</h2>
<p>This site does not currently display third-party advertisements or use advertising, conversion-tracking or remarketing tags.</p>
<h2>Third-party services</h2>
<ul><li><strong>Unsplash</strong> serves food photographs, so your browser requests images from Unsplash's servers.</li><li><strong>Google Fonts</strong> serves typefaces, as described above.</li><li><strong>Umami Cloud</strong> provides automatically loaded site analytics; see the <a href="https://docs.umami.is/docs" rel="noopener noreferrer">Umami documentation</a>.</li><li><strong>Hosting provider</strong> serves the site and may process technical logs under its own terms.</li></ul>
<h2>Data retention</h2>
<p>We keep postal correspondence only as long as reasonably needed to handle the inquiry and meet record-keeping obligations. Hosting-log and Umami Cloud analytics retention follow the providers' current service settings.</p>
<h2>Your choices and rights</h2>
<ul><li>Clear saved recipes at any time by clearing your browser's storage for this site.</li><li>Block or delete cookies using your browser settings.</li><li>Request access to, correction of, or deletion of personal information by writing to the postal address on our contact page.</li><li>Depending on where you live, you may have additional rights under local law.</li></ul>
<h2>External links</h2>
<p>Pages may link to other websites. We are not responsible for their content or privacy practices, so please review their policies.</p>
<h2>Children's privacy</h2>
<p>This site is intended for a general audience and is not directed at children under 13 (or the equivalent minimum age where you live). We do not knowingly collect personal information from children. If you believe a child has sent us information, write to us at the postal address on our contact page.</p>
<h2>Changes to this policy</h2>
<p>We will update this page when our practices change, for example if advertising or a newsletter is added, and revise the date at the top.</p>
<h2>Contact</h2>
<p>Questions about this policy may be sent to the postal address on our <a href="contact.html">contact page</a>.</p>
</div>`);

const terms = page('terms.html', 'Terms of Use', 'Terms of use for The Sunday Table, including recipe and nutrition disclaimers, intellectual property and external links.', 'Terms of use', UPDATED, `
<div class="prose">
<p>These terms apply to your use of ${SITE_NAME}, operated by ${OWNER_NAME}. By using the site, you agree to them.</p>
<h2>Informational purpose</h2>
<p>Content on this site is provided for general information and home-cooking inspiration. It is offered free of charge and without any guarantee that a recipe will suit your particular needs.</p>
<h2>Using our recipes</h2>
<p>Cooking involves heat, sharp tools and food-safety considerations. Use your own judgement, follow safe food-handling practice, and check that ingredients are suitable for everyone you are cooking for. Results vary with equipment, ingredients and technique. Always check labels if you or your guests have allergies; our recipes are not prepared in an allergen-controlled environment and we cannot guarantee any recipe is free from a particular allergen.</p>
<h2>Nutrition information</h2>
<p>Nutrition figures are estimates based on typical ingredients and can vary with brands, quantities, substitutions and preparation methods. They are not medical, dietary or nutritional advice. If you have a medical condition or specific dietary requirements, please consult a qualified professional.</p>
<h2>Intellectual property</h2>
<p>The recipe text, editorial writing and site design are the property of ${OWNER_NAME} unless stated otherwise. You are welcome to cook from our recipes, print them for personal use and share links. Please do not republish full recipe text or the site's writing without permission. Photographs are provided by third-party photographers through Unsplash and remain subject to their licence terms.</p>
<h2>External links</h2>
<p>We may link to other websites for reference. Those sites are not under our control, and a link does not mean we endorse them.</p>
<h2>Limitation of liability</h2>
<p>To the fullest extent permitted by law, ${SITE_NAME} and its operator are not liable for any loss or damage arising from use of the site or its recipes. Nothing in these terms limits liability that cannot be limited under applicable law.</p>
<h2>Changes to these terms</h2>
<p>We may update these terms from time to time. The date at the top of this page shows when they were last revised.</p>
<h2>Contact</h2>
<p>Questions about these terms may be sent to the postal address on our <a href="contact.html">contact page</a>.</p>
</div>`);

const guide = page('kitchen-guide.html', 'Kitchen Guide', 'A practical kitchen guide: measuring, seasoning, safe cooking temperatures, pan heat, storing leftovers and stocking a useful pantry.', 'The kitchen guide', 'The techniques that come up again and again across our recipes, explained once, properly.', `
<div class="prose guide">
<nav class="toc" aria-label="On this page"><p>On this page</p><ol><li><a href="#measuring">Measuring</a></li><li><a href="#heat">Heat and pans</a></li><li><a href="#seasoning">Seasoning</a></li><li><a href="#temps">Safe temperatures</a></li><li><a href="#leftovers">Storing leftovers</a></li><li><a href="#pantry">A useful pantry</a></li></ol></nav>
<h2 id="measuring">Measuring</h2>
<p>Our recipes give US cup measures alongside grams for baking ingredients. For cakes, cheesecake and pizza dough, a digital scale is the most reliable option. If you use cups, spoon flour into the cup and level it with a knife rather than scooping, which packs in extra flour.</p>
<h2 id="heat">Heat and pans</h2>
<p>Medium-high heat is for searing and browning; medium for sautéing onions and garlic; medium-low for eggs, pancakes and gentle sauces. A pan is ready for searing when a drop of water skitters across the surface. Heavy pans, such as cast iron or thick stainless steel, hold heat better and brown more evenly than thin ones.</p>
<h2 id="seasoning">Seasoning</h2>
<p>Recipes here use fine table salt in measured amounts unless "flaky salt" is specified. If you use coarse kosher salt, you may need a little more by volume. Taste at the end of cooking and adjust. Acid, such as lemon juice or vinegar, often fixes a dish that tastes flat when salt alone does not.</p>
<h2 id="temps">Safe internal temperatures</h2>
<p>An instant-read thermometer is the best tool for doneness. Widely used food-safety guidance in the US recommends:</p>
<table class="table"><caption class="sr-only">Recommended minimum internal temperatures</caption><thead><tr><th scope="col">Food</th><th scope="col">Minimum internal temperature</th></tr></thead><tbody>
<tr><td>Poultry (whole or pieces, ground)</td><td>165°F / 74°C</td></tr><tr><td>Ground beef, pork</td><td>160°F / 71°C</td></tr><tr><td>Fish</td><td>145°F / 63°C (many cooks prefer salmon slightly lower; see recipe notes)</td></tr><tr><td>Egg dishes</td><td>160°F / 71°C</td></tr><tr><td>Reheated leftovers</td><td>165°F / 74°C</td></tr></tbody></table>
<p>Guidance varies by country; check your local food-safety authority.</p>
<h2 id="leftovers">Storing leftovers</h2>
<ul><li>Refrigerate cooked food within 2 hours of cooking (1 hour in hot weather).</li><li>Shallow containers cool food faster and more safely than deep ones.</li><li>Most cooked dishes keep 3 to 4 days in the refrigerator. Each recipe gives specific guidance.</li><li>Label frozen food with the date. Thaw in the refrigerator, not on the counter.</li></ul>
<h2 id="pantry">A useful pantry</h2>
<p>With these on hand, most recipes on this site need only a short shopping trip for fresh ingredients:</p>
<ul class="cols"><li>Olive oil and a neutral oil</li><li>Fine salt and flaky salt</li><li>Black peppercorns, red pepper flakes</li><li>Ground cumin, smoked paprika, chili powder, dried oregano</li><li>Canned tomatoes and tomato paste</li><li>Canned chickpeas and black beans</li><li>Dried pasta, rice, quinoa, rolled oats</li><li>Soy sauce, honey, Dijon mustard</li><li>Red wine vinegar and rice vinegar</li><li>Garlic, onions and lemons</li></ul>
<p>Put the guide into practice with <a href="quick-easy.html">quick and easy recipes</a> or browse <a href="recipes.html">every recipe</a>.</p>
</div>`);

/* ------------------------------ 404 --------------------------------------- */
const notFound = layout({ file: '404.html', title: `Page not found | ${SITE_NAME}`, description: 'The page you were looking for could not be found.', body: `
<section class="wrap page-head nf"><p class="display nf__num" aria-hidden="true">404</p><h1 class="display">This page is not on the menu</h1><p class="dek">The link may be out of date. Try searching for a recipe or head back to the homepage.</p>
<form class="big-search" action="recipes.html" method="get" role="search"><label for="q-404">Search recipes</label><div><input id="q-404" name="q" type="search"><button class="btn btn--solid" type="submit">Search</button></div></form>
<p><a class="btn" href="index.html">Go to the homepage</a></p></section>` }).replace('index, follow', 'noindex, follow');

/* ------------------------------ Write ------------------------------------- */
const out = (f, c) => { fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); fs.writeFileSync(path.join(root, f), c); };
out('index.html', homePage());
out('recipes.html', recipesPage());
categories.forEach((c) => out(c.file, categoryPage(c)));
out('about.html', about); out('contact.html', contact); out('privacy-policy.html', privacy); out('terms.html', terms); out('kitchen-guide.html', guide); out('404.html', notFound);
recipes.forEach((r) => out(`recipes/${r.slug}.html`, recipePage(r)));

const urls = ['', 'recipes.html', ...categories.map((c) => c.file), 'kitchen-guide.html', 'about.html', 'contact.html', 'privacy-policy.html', 'terms.html', ...recipes.map((r) => `recipes/${r.slug}.html`)];
if (DOMAIN) {
  out('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${DOMAIN}/${u}</loc><changefreq>${u.startsWith('recipes/') ? 'monthly' : 'weekly'}</changefreq><priority>${u === '' ? '1.0' : u.startsWith('recipes/') ? '0.8' : '0.6'}</priority></url>`).join('\n')}
</urlset>
`);
} else {
  fs.rmSync(path.join(root, 'public/sitemap.xml'), { force: true });
}
out('public/robots.txt', `# ${SITE_NAME} - all public content may be crawled, including by Googlebot and AdsBot-Google.
User-agent: *
Allow: /

User-agent: AdsBot-Google
Allow: /

User-agent: AdsBot-Google-Mobile
Allow: /

${DOMAIN ? `Sitemap: ${DOMAIN}/sitemap.xml` : ''}
`);
console.log(`Generated ${urls.length + 1} pages${DOMAIN ? ' with absolute SEO URLs and a sitemap' : ' for any host with relative canonical links; absolute SEO URLs and sitemap omitted'}.`);
