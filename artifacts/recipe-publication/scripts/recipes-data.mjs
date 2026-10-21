// Source data for every recipe page. Edit here, then run `pnpm run generate`
// to rebuild the static HTML files. Nothing in here ships to the browser as JS.
// Recipe photos are currently served from Unsplash.

const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=72`;

export const recipes = [
  {
    slug: 'fluffy-buttermilk-pancakes', title: 'Fluffy Buttermilk Pancakes', cat: 'Breakfast', cats: ['breakfast'], cuisine: 'American',
    img: u('photo-1567620905732-2d1ec7ab7445'), alt: 'A tall stack of golden buttermilk pancakes topped with berries and a drizzle of syrup',
    desc: 'Tall, tender pancakes with a gentle tang, made from a lumpy batter that is allowed to rest for ten minutes.',
    intro: [
      'Good pancakes are mostly about restraint. The batter should be stirred until the flour just disappears and then left alone, lumps and all. Overmixing develops gluten and gives you flat, chewy rounds instead of soft, risen ones.',
      'Buttermilk does two jobs here: its acidity reacts with the baking soda for lift, and it adds a mild sourness that keeps the stack from tasting one-note sweet. A ten-minute rest lets the bubbles form before the batter ever touches the pan.'
    ],
    prep: 10, cook: 20, serves: 4, yieldText: '12 pancakes (4 servings)', diff: 'Easy',
    keywords: 'pancakes buttermilk eggs flour brunch weekend griddle',
    ingredients: [
      { items: ['2 cups (250 g) all-purpose flour', '2 tablespoons granulated sugar', '1 teaspoon baking powder', '1 teaspoon baking soda', '1/2 teaspoon fine salt', '2 cups (480 ml) buttermilk, room temperature', '2 large eggs', '3 tablespoons (45 g) unsalted butter, melted and slightly cooled, plus more for the pan', '1 teaspoon vanilla extract'] },
      { h: 'To serve', items: ['Maple syrup', 'Fresh berries', 'Softened butter'] }
    ],
    steps: [
      'In a large bowl, whisk together the flour, sugar, baking powder, baking soda and salt.',
      'In a second bowl, whisk the buttermilk, eggs, melted butter and vanilla until smooth.',
      'Pour the wet ingredients into the dry ones and fold with a spatula until no dry streaks remain. The batter should still be lumpy. Let it rest for 10 minutes.',
      'Heat a heavy skillet or griddle over medium-low heat for 3 to 4 minutes. Brush lightly with butter.',
      'Pour 1/4 cup of batter per pancake. Cook until bubbles appear across the surface and the edges look set, about 2 to 3 minutes.',
      'Flip once and cook 1 to 2 minutes more, until golden and springy in the centre. Keep finished pancakes warm on a rack in a 200°F (95°C) oven while you cook the rest.'
    ],
    tips: ['Your first pancake is a thermometer. If it browns before bubbles appear, lower the heat.', 'Do not press pancakes with the spatula after flipping; it squeezes out the air you rested the batter to build.', 'Wipe excess butter from the pan between batches so the surfaces brown evenly instead of frying.'],
    subs: ['No buttermilk: stir 2 tablespoons lemon juice into 2 cups milk and let stand 5 minutes.', 'Swap up to half the all-purpose flour for whole-wheat flour for a nuttier pancake.', 'Use neutral oil instead of butter in the batter if needed.'],
    vars: ['Blueberry: scatter berries onto each pancake right after pouring rather than stirring them into the batter.', 'Lemon-poppy seed: add the zest of one lemon and 1 tablespoon poppy seeds to the dry mix.', 'Brown butter: brown the butter before adding it for a toasty, nutty flavour.'],
    storage: 'Cool completely, then refrigerate in an airtight container for up to 3 days or freeze between sheets of parchment for up to 2 months.',
    reheat: 'Toast from chilled or frozen in a toaster, or warm on a baking sheet at 350°F (175°C) for 8 to 10 minutes.',
    nutrition: { calories: 440, protein: '13 g', carbs: '62 g', fat: '15 g', fiber: '2 g' },
    faqs: [['Why are my pancakes flat?', 'The usual causes are overmixing, old baking powder or soda, or a pan that is too cool so the batter spreads before it sets.'], ['Can I make the batter the night before?', 'It is best fresh. The leaveners start working as soon as they meet the buttermilk, so overnight batter rises less. You can mix the dry ingredients ahead.']],
    related: ['berry-overnight-oats', 'avocado-egg-toast', 'strawberry-cheesecake']
  },
  {
    slug: 'avocado-egg-toast', title: 'Avocado Egg Toast', cat: 'Breakfast', cats: ['breakfast', 'quick-easy', 'healthy'], cuisine: 'American',
    img: u('photo-1541519227354-08fa5d50c44d'), alt: 'Toasted sourdough topped with smashed avocado and a soft-cooked egg on a ceramic plate',
    desc: 'Crisp sourdough, lemony smashed avocado and a jammy egg, ready in about twelve minutes.',
    intro: [
      'Avocado toast became a punchline because it is so often made carelessly: under-seasoned avocado on soft bread. Treat each layer seriously and it is a genuinely satisfying breakfast.',
      'The method here uses a six-and-a-half-minute egg, which gives a set white and a yolk that is thick rather than runny, so it stays on the toast. Lemon and flaky salt do most of the seasoning work.'
    ],
    prep: 5, cook: 7, serves: 2, yieldText: '2 toasts', diff: 'Easy',
    keywords: 'avocado eggs toast sourdough breakfast vegetarian quick',
    ingredients: [{ items: ['2 large eggs', '2 thick slices sourdough bread', '1 large ripe avocado', '2 teaspoons lemon juice', '1/4 teaspoon fine salt, plus flaky salt to finish', '1 tablespoon olive oil', 'Pinch of red pepper flakes', 'Freshly ground black pepper', 'A few chives or a small handful of microgreens (optional)'] }],
    steps: [
      'Bring a small pot of water to a gentle boil. Lower the eggs in with a spoon and cook for exactly 6 1/2 minutes.',
      'Meanwhile, transfer the eggs to a bowl of cold water when the time is up and leave them for 2 minutes.',
      'Brush the bread with olive oil and toast in a skillet over medium heat or in a toaster until deeply golden.',
      'Halve the avocado, scoop it into a bowl and mash with the lemon juice and fine salt, leaving some texture.',
      'Spread the avocado thickly over the toast. Peel and halve the eggs and set them on top.',
      'Finish with flaky salt, pepper, red pepper flakes and chives. Eat right away.'
    ],
    tips: ['Choose an avocado that yields to gentle pressure near the stem end; firm ones will not mash smoothly.', 'Peel eggs under running water, starting at the wide end where the air pocket sits.', 'Season the avocado itself, not only the top. That is the difference between flat and bright.'],
    subs: ['Use whole-grain or gluten-free bread as preferred.', 'Lime juice works in place of lemon.', 'For an egg-free version, top with white beans dressed in olive oil.'],
    vars: ['Add sliced radishes and cucumber for crunch.', 'Crumble feta over the top and add a few cherry tomatoes.', 'Swap the boiled egg for a fried egg with crisp edges.'],
    storage: 'Best eaten immediately. Mashed avocado can be pressed under plastic wrap and refrigerated for up to 1 day, though it may darken slightly on top.',
    reheat: 'Not recommended. Peeled soft-boiled eggs can be warmed in hot tap water for 1 minute.',
    nutrition: { calories: 360, protein: '13 g', carbs: '29 g', fat: '23 g', fiber: '8 g' },
    faqs: [['How do I get the same yolk every time?', 'Use eggs straight from the refrigerator, start timing when they go into boiling water, and chill them immediately.']],
    related: ['fluffy-buttermilk-pancakes', 'berry-overnight-oats', 'mediterranean-chickpea-bowl']
  },
  {
    slug: 'berry-overnight-oats', title: 'Berry Overnight Oats', cat: 'Breakfast', cats: ['breakfast', 'healthy', 'quick-easy'], cuisine: 'American',
    img: u('photo-1517673400267-0251440c45dc'), alt: 'A bowl of creamy oats topped with fresh blueberries, raspberries and sliced fruit',
    desc: 'A make-ahead jar of creamy oats, yogurt and berries that is ready when you wake up.',
    intro: [
      'Overnight oats are less a recipe than a ratio: equal parts oats and liquid, plus a spoonful of yogurt for body. Once that is right, the rest is personal taste.',
      'Chia seeds thicken the mixture and keep it from turning soupy as the berries release juice. Make two or three jars on a Sunday and breakfast is handled for half the week.'
    ],
    prep: 5, cook: 0, chill: 'Chill at least 6 hours', serves: 2, yieldText: '2 jars', diff: 'Easy',
    keywords: 'oats oatmeal berries yogurt chia make ahead breakfast vegetarian',
    ingredients: [{ items: ['1 cup (90 g) old-fashioned rolled oats', '1 cup (240 ml) milk of choice', '1/2 cup (120 g) plain Greek yogurt', '1 tablespoon chia seeds', '1 to 2 tablespoons maple syrup or honey', '1/2 teaspoon vanilla extract', 'Pinch of salt', '1 cup (150 g) mixed berries, fresh or frozen', '2 tablespoons toasted almonds or pumpkin seeds'] }],
    steps: [
      'In a bowl or large jar, stir together the oats, milk, yogurt, chia seeds, maple syrup, vanilla and salt.',
      'Divide between two jars or containers. Top each with half of the berries.',
      'Cover and refrigerate for at least 6 hours or overnight.',
      'In the morning, stir, loosen with a splash of milk if it is too thick, and add the toasted nuts just before eating.'
    ],
    tips: ['Use rolled oats, not quick oats (which turn mushy) or steel-cut (which stay too firm without cooking).', 'Frozen berries work well; they thaw overnight and tint the oats.', 'Add crunchy toppings at the last moment so they stay crisp.'],
    subs: ['Dairy-free: use oat or almond milk and a coconut-based yogurt.', 'Gluten-free: use oats labelled gluten-free.', 'Swap chia seeds for ground flaxseed.'],
    vars: ['Peanut butter and banana: stir in 1 tablespoon peanut butter and top with sliced banana.', 'Apple pie: grated apple, cinnamon and a pinch of nutmeg.', 'Cocoa: add 1 tablespoon cocoa powder and a little extra sweetener.'],
    storage: 'Keeps in the refrigerator in sealed jars for up to 4 days. Add fresh berries and nuts on the day you eat it for the best texture.',
    reheat: 'Usually eaten cold. To warm, microwave in a heatproof bowl for 1 to 2 minutes, stirring halfway, with a splash of milk.',
    nutrition: { calories: 390, protein: '16 g', carbs: '56 g', fat: '12 g', fiber: '9 g' },
    faqs: [['Do I have to cook the oats?', 'No. Soaking softens rolled oats enough to eat without cooking.'], ['Why is mine too thick?', 'Oats and chia keep absorbing liquid. Stir in a few tablespoons of milk before serving.']],
    related: ['fluffy-buttermilk-pancakes', 'avocado-egg-toast', 'quinoa-vegetable-bowl']
  },
  {
    slug: 'grilled-chicken-caesar-salad', title: 'Grilled Chicken Caesar Salad', cat: 'Lunch', cats: ['lunch'], cuisine: 'American',
    img: u('photo-1550304943-4f24f54ddde9'), alt: 'Crisp green salad with grilled chicken, shaved parmesan and croutons in a wide bowl',
    desc: 'Charred chicken, cold romaine and a garlicky, anchovy-backed dressing made in a jar.',
    intro: [
      'A great Caesar depends on contrast: cold, crunchy leaves against warm chicken, a sharp dressing against rich cheese, soft lettuce against crisp croutons.',
      'This version skips raw egg in favour of mayonnaise as the base, which makes the dressing steady and safe to keep for several days. The anchovy is not optional in spirit; it gives the depth people recognise as Caesar.'
    ],
    prep: 20, cook: 15, serves: 4, yieldText: '4 salads', diff: 'Medium',
    keywords: 'chicken caesar salad romaine parmesan croutons anchovy lunch grill',
    ingredients: [
      { h: 'Dressing', items: ['1/2 cup (115 g) mayonnaise', '3 anchovy fillets, finely chopped', '1 small garlic clove, grated', '2 tablespoons lemon juice', '1 teaspoon Dijon mustard', '1 teaspoon Worcestershire sauce', '1/3 cup (30 g) finely grated parmesan', '2 tablespoons olive oil', 'Black pepper'] },
      { h: 'Salad', items: ['1 1/2 lb (680 g) boneless skinless chicken breasts', '1 tablespoon olive oil', '1/2 teaspoon salt', '1/2 teaspoon smoked paprika', '3 cups (120 g) day-old bread, torn into bite-size pieces', '2 tablespoons olive oil for croutons', '2 large heads romaine lettuce, chopped', 'Shaved parmesan to serve'] }
    ],
    steps: [
      'Shake all dressing ingredients in a jar until smooth. Taste and adjust lemon and pepper. Refrigerate.',
      'Heat the oven to 375°F (190°C). Toss the bread with 2 tablespoons olive oil and a pinch of salt and bake 10 to 12 minutes until crisp.',
      'Butterfly or pound the chicken to an even 3/4-inch (2 cm) thickness. Rub with oil, salt and paprika.',
      'Heat a grill pan or outdoor grill to medium-high. Grill the chicken 5 to 6 minutes per side until it reaches 165°F (74°C) inside.',
      'Rest the chicken 5 minutes, then slice against the grain.',
      'Toss the romaine with about two-thirds of the dressing. Top with chicken, croutons and shaved parmesan, and pass the remaining dressing at the table.'
    ],
    tips: ['Pounding the chicken evenly is what keeps it from drying at the edges while the centre cooks.', 'Dry the romaine thoroughly; water dilutes the dressing and makes it slide off.', 'An instant-read thermometer removes all guesswork from grilled chicken.'],
    subs: ['Anchovy paste (about 2 teaspoons) works in place of fillets.', 'Use Greek yogurt for half the mayonnaise for a lighter, tangier dressing.', 'Chicken thighs stay juicier and grill in about the same time.'],
    vars: ['Add halved soft-boiled eggs and cherry tomatoes.', 'Swap chicken for grilled shrimp, cooked 2 minutes per side.', 'Make it a wrap with a large flour tortilla.'],
    storage: 'Store dressing, chicken, croutons and lettuce separately. Dressing keeps 5 days, chicken 3 days, croutons 4 days at room temperature in a sealed container.',
    reheat: 'Serve chicken cold or warm gently in a covered skillet with a splash of water for 2 to 3 minutes.',
    nutrition: { calories: 560, protein: '46 g', carbs: '20 g', fat: '33 g', fiber: '4 g' },
    faqs: [['Can I make the dressing without anchovies?', 'Yes. Add an extra teaspoon of Worcestershire and a little more parmesan, though the flavour will be milder. Note that Worcestershire usually contains anchovy as well.']],
    related: ['grilled-salmon-salad', 'mediterranean-chickpea-bowl', 'chicken-quesadillas']
  },
  {
    slug: 'creamy-tomato-pasta', title: 'Creamy Tomato Pasta', cat: 'Lunch', cats: ['lunch', 'quick-easy'], cuisine: 'Italian-American',
    img: u('photo-1621996346565-e3dbc646d9a9'), alt: 'Rigatoni coated in a creamy tomato sauce with basil leaves in a shallow bowl',
    desc: 'Pantry tomatoes cooked down with garlic and finished with a little cream for a sauce that clings.',
    intro: [
      'This is the pasta to make when the refrigerator looks bare. A can of good tomatoes, garlic, a splash of cream and a hunk of parmesan add up to a sauce that tastes far more involved than it is.',
      'Tomato paste, browned in the oil before anything else goes in, is the step that gives the sauce real depth. Starchy pasta water does the rest, turning the sauce glossy instead of greasy.'
    ],
    prep: 5, cook: 20, serves: 4, yieldText: '4 bowls', diff: 'Easy',
    keywords: 'pasta tomato cream rigatoni parmesan vegetarian pantry',
    ingredients: [{ items: ['12 oz (340 g) rigatoni or penne', '2 tablespoons olive oil', '1 tablespoon butter', '3 garlic cloves, thinly sliced', '2 tablespoons tomato paste', '1/4 teaspoon red pepper flakes', '1 can (28 oz / 794 g) crushed tomatoes', '1/2 teaspoon salt, plus more for pasta water', '1/2 cup (120 ml) heavy cream', '1/2 cup (45 g) grated parmesan', 'A handful of fresh basil'] }],
    steps: [
      'Bring a large pot of well-salted water to a boil.',
      'In a wide skillet, warm the oil and butter over medium heat. Add garlic and cook 1 minute until fragrant but not browned.',
      'Stir in the tomato paste and pepper flakes and cook 2 minutes, until the paste darkens to brick red.',
      'Add the crushed tomatoes and salt. Simmer 12 to 15 minutes, stirring occasionally, until thickened.',
      'Meanwhile, cook the pasta until 1 minute short of al dente. Reserve 1 cup of pasta water before draining.',
      'Stir the cream into the sauce, add the pasta and 1/3 cup pasta water, and toss over medium heat for 1 to 2 minutes. Remove from heat, add parmesan and torn basil, and loosen with more pasta water if needed.'
    ],
    tips: ['Taste the sauce before adding cream; acidic tomatoes may need a pinch of sugar.', 'Finish pasta in the sauce so it absorbs flavour.', 'Add cheese off the heat to keep it from turning stringy.'],
    subs: ['Use half-and-half or whole milk with 1 extra tablespoon parmesan for a lighter sauce.', 'Pecorino Romano instead of parmesan gives a saltier, sharper finish.', 'Any short pasta shape with ridges works.'],
    vars: ['Add browned Italian sausage for a heartier dinner.', 'Stir in two handfuls of spinach at the end.', 'Vodka sauce: deglaze with 1/4 cup vodka after the tomato paste.'],
    storage: 'Refrigerate in an airtight container for up to 4 days.',
    reheat: 'Warm in a skillet over medium-low heat with a few tablespoons of water or milk, stirring until creamy again.',
    nutrition: { calories: 520, protein: '16 g', carbs: '74 g', fat: '19 g', fiber: '6 g' },
    faqs: [['Can I use fresh tomatoes?', 'Yes, about 2 1/2 lb (1.1 kg) ripe tomatoes, chopped. Simmer a little longer, 20 to 25 minutes, to cook off the extra water.']],
    related: ['creamy-tuscan-pasta', 'garlic-pasta', 'margherita-pizza']
  },
  {
    slug: 'mediterranean-chickpea-bowl', title: 'Mediterranean Chickpea Bowl', cat: 'Lunch', cats: ['lunch', 'healthy'], cuisine: 'Mediterranean',
    img: u('photo-1512621776951-a57141f2eefd'), alt: 'A grain bowl with chickpeas, cucumber, tomatoes, greens and a creamy dressing',
    desc: 'Crispy roasted chickpeas, crunchy vegetables and a lemon tahini dressing over fluffy grains.',
    intro: [
      'This bowl is built for packed lunches. Every component holds up in the refrigerator for days, and assembling it takes two minutes once things are prepped.',
      'Roasting the chickpeas with cumin and paprika gives them a crisp shell, which makes them taste less like a can and more like a main ingredient.'
    ],
    prep: 15, cook: 25, serves: 4, yieldText: '4 bowls', diff: 'Easy',
    keywords: 'chickpeas tahini cucumber bowl vegan vegetarian mediterranean meal prep lunch',
    ingredients: [
      { h: 'Chickpeas', items: ['2 cans (15 oz / 425 g each) chickpeas, drained, rinsed and patted dry', '2 tablespoons olive oil', '1 teaspoon ground cumin', '1 teaspoon smoked paprika', '1/2 teaspoon salt'] },
      { h: 'Lemon tahini dressing', items: ['1/3 cup (80 g) tahini', '3 tablespoons lemon juice', '1 small garlic clove, grated', '1/4 teaspoon salt', '4 to 6 tablespoons cold water'] },
      { h: 'Bowls', items: ['3 cups cooked couscous, bulgur or rice', '1 English cucumber, diced', '1 1/2 cups (225 g) cherry tomatoes, halved', '1/2 small red onion, thinly sliced', '1/3 cup (50 g) Kalamata olives, halved', '1/2 cup (75 g) crumbled feta (optional)', 'Chopped parsley'] }
    ],
    steps: [
      'Heat the oven to 425°F (220°C). Toss the chickpeas with oil and spices and spread on a sheet pan.',
      'Roast 22 to 25 minutes, shaking the pan halfway, until crisp and deep golden.',
      'Whisk tahini, lemon juice, garlic and salt. It will seize and thicken; keep whisking in cold water a tablespoon at a time until pourable.',
      'Divide grains among bowls. Arrange cucumber, tomatoes, onion, olives and chickpeas on top.',
      'Drizzle with dressing and finish with feta and parsley.'
    ],
    tips: ['Dry chickpeas thoroughly; moisture is the enemy of crispness.', 'Rinse sliced red onion in cold water to soften its bite.', 'Keep dressing separate in meal-prep containers until serving.'],
    subs: ['Vegan: leave out the feta.', 'Gluten-free: use rice or quinoa as the base.', 'Swap tahini for Greek yogurt thinned with lemon.'],
    vars: ['Add roasted red peppers and a spoonful of hummus.', 'Top with grilled halloumi.', 'Use warm farro and wilted greens for a cold-weather version.'],
    storage: 'Store components separately: grains and vegetables up to 4 days, dressing up to 5 days. Chickpeas soften in the refrigerator but stay flavourful.',
    reheat: 'Re-crisp chickpeas in a 400°F (200°C) oven or a dry skillet for 5 minutes. Grains can be microwaved with a splash of water.',
    nutrition: { calories: 540, protein: '19 g', carbs: '64 g', fat: '24 g', fiber: '13 g' },
    faqs: [['Why did my tahini sauce get thick when I added lemon?', 'That is normal. Tahini tightens when acid is added. Keep whisking in water and it will turn smooth and creamy.']],
    related: ['quinoa-vegetable-bowl', 'grilled-salmon-salad', 'avocado-egg-toast']
  },
  {
    slug: 'garlic-butter-chicken', title: 'Garlic Butter Chicken', cat: 'Dinner', cats: ['dinner', 'quick-easy'], cuisine: 'American',
    img: u('photo-1598103442097-8b74394b95c6'), alt: 'Golden seared chicken pieces in a skillet with garlic butter sauce and herbs',
    desc: 'Seared chicken thighs basted with garlic, thyme and butter, with a pan sauce made in the same skillet.',
    intro: [
      'Basting is an old restaurant technique that works beautifully at home. Once the chicken is browned, you tilt the pan and spoon foaming garlic butter over it again and again, so it seasons the meat while it finishes cooking.',
      'Boneless thighs are forgiving and cook in about fifteen minutes. Serve with something to catch the sauce: mashed potatoes, rice, or a good loaf.'
    ],
    prep: 10, cook: 20, serves: 4, yieldText: '4 servings', diff: 'Easy',
    keywords: 'chicken garlic butter thighs skillet thyme dinner weeknight',
    ingredients: [{ items: ['2 lb (900 g) boneless skinless chicken thighs (about 8)', '1 teaspoon salt', '1/2 teaspoon black pepper', '1 tablespoon neutral oil', '4 tablespoons (55 g) unsalted butter', '6 garlic cloves, smashed', '4 sprigs fresh thyme', '1/2 cup (120 ml) chicken stock', '1 tablespoon lemon juice', '2 tablespoons chopped parsley'] }],
    steps: [
      'Pat the chicken dry and season both sides with salt and pepper.',
      'Heat the oil in a large skillet over medium-high heat. Add the chicken smooth side down and cook undisturbed 5 to 6 minutes until well browned.',
      'Flip, reduce heat to medium, and add butter, garlic and thyme.',
      'As the butter foams, tilt the pan and spoon it over the chicken continuously for 3 to 4 minutes, until the chicken reaches 175°F (80°C).',
      'Move the chicken to a plate. Add stock and lemon juice to the pan and simmer 2 minutes, scraping up the browned bits.',
      'Return the chicken and any juices, spoon sauce over, and scatter with parsley.'
    ],
    tips: ['Do not move the chicken while it browns; it releases from the pan when ready.', 'Thighs are at their best around 175°F (80°C), higher than breasts, because the connective tissue softens.', 'If the butter starts to burn, lower the heat and add a splash of stock.'],
    subs: ['Use chicken breasts, pounded to even thickness, cooked to 165°F (74°C).', 'Rosemary or sage can replace thyme.', 'Dry white wine can replace half the stock.'],
    vars: ['Add sliced mushrooms to the pan after removing the chicken.', 'Stir 2 tablespoons cream into the sauce for a richer finish.', 'Add a spoonful of Dijon to the pan sauce.'],
    storage: 'Refrigerate chicken and sauce together for up to 3 days.',
    reheat: 'Warm covered in a skillet over medium-low heat with a splash of stock, about 6 to 8 minutes, or microwave in short bursts.',
    nutrition: { calories: 420, protein: '45 g', carbs: '2 g', fat: '26 g', fiber: '0 g' },
    faqs: [['Can I use bone-in thighs?', 'Yes. Brown skin side down, then finish in a 400°F (200°C) oven for 20 to 25 minutes before basting on the stovetop.']],
    related: ['one-pan-lemon-chicken', 'honey-garlic-salmon', 'chicken-vegetable-stir-fry']
  },
  {
    slug: 'creamy-tuscan-pasta', title: 'Creamy Tuscan Pasta', cat: 'Dinner', cats: ['dinner'], cuisine: 'Italian-American',
    img: u('photo-1563379926898-05f4575a45d8'), alt: 'Pasta tossed in a creamy sauce with sun-dried tomatoes and spinach',
    desc: 'Sun-dried tomatoes, spinach and garlic in a parmesan cream sauce with plenty of black pepper.',
    intro: [
      'The name is more American restaurant than Tuscan tradition, but the combination has earned its place: sweet-tart sun-dried tomatoes cut through a rich sauce, and spinach adds colour and freshness.',
      'Using a little of the oil from the sun-dried tomato jar to cook the garlic is an easy way to layer in flavour without any extra ingredients.'
    ],
    prep: 10, cook: 20, serves: 4, yieldText: '4 servings', diff: 'Easy',
    keywords: 'pasta tuscan sun-dried tomatoes spinach cream parmesan vegetarian dinner',
    ingredients: [{ items: ['12 oz (340 g) penne or fusilli', '1/2 cup (55 g) oil-packed sun-dried tomatoes, chopped, plus 1 tablespoon of their oil', '4 garlic cloves, minced', '1 teaspoon dried Italian herbs', '1 cup (240 ml) heavy cream', '1/2 cup (120 ml) chicken or vegetable stock', '3/4 cup (65 g) grated parmesan', '4 packed cups (120 g) baby spinach', 'Salt and plenty of black pepper', 'Lemon wedges to serve'] }],
    steps: [
      'Cook the pasta in well-salted boiling water until just al dente. Reserve 1 cup pasta water and drain.',
      'In a large skillet, warm the sun-dried tomato oil over medium heat. Add garlic and dried herbs and cook 1 minute.',
      'Add the sun-dried tomatoes and cook 1 minute more.',
      'Pour in cream and stock and simmer gently 4 to 5 minutes until slightly thickened.',
      'Stir in spinach a handful at a time until wilted. Lower heat and stir in parmesan.',
      'Add the pasta and toss, loosening with pasta water. Season with pepper and salt to taste, and serve with lemon.'
    ],
    tips: ['Keep the cream at a gentle simmer; a hard boil can make it split.', 'A squeeze of lemon at the table brightens the whole dish.', 'Pat sun-dried tomatoes dry before chopping so they do not slip.'],
    subs: ['Use half-and-half plus 1 teaspoon cornstarch for a lighter sauce.', 'Kale instead of spinach: add it 2 minutes earlier.', 'Gluten-free pasta works; reserve extra pasta water as it can absorb more sauce.'],
    vars: ['Add sliced pan-seared chicken breast.', 'Add sautéed shrimp in the final minute.', 'Fold in a handful of chopped artichoke hearts.'],
    storage: 'Refrigerate up to 3 days. Cream sauces thicken considerably when cold.',
    reheat: 'Reheat gently on the stove with a splash of milk or stock, stirring often.',
    nutrition: { calories: 640, protein: '20 g', carbs: '70 g', fat: '31 g', fiber: '5 g' },
    faqs: [['Can this be made dairy-free?', 'Full-fat coconut milk and a dairy-free hard cheese alternative can stand in, though the flavour will change noticeably.']],
    related: ['creamy-tomato-pasta', 'garlic-pasta', 'garlic-butter-chicken']
  },
  {
    slug: 'honey-garlic-salmon', title: 'Honey Garlic Salmon', cat: 'Dinner', cats: ['dinner', 'healthy', 'quick-easy'], cuisine: 'American',
    img: u('photo-1467003909585-2f8a72700288'), alt: 'Glazed salmon fillet with a caramelised honey garlic sauce on a plate with greens',
    desc: 'Pan-seared salmon finished with a sticky honey, soy and garlic glaze in about twenty minutes.',
    intro: [
      'Salmon rewards a hot pan and a light touch. Sear it hard on one side for colour, then turn the heat down and let a quick glaze reduce around it.',
      'The glaze balances honey with soy sauce and a splash of rice vinegar, so it reads as savoury and bright rather than dessert-sweet. It is equally good spooned over rice or roasted vegetables.'
    ],
    prep: 5, cook: 12, serves: 4, yieldText: '4 fillets', diff: 'Easy',
    keywords: 'salmon fish honey garlic soy glaze seafood dinner quick',
    ingredients: [{ items: ['4 skin-on salmon fillets (about 6 oz / 170 g each)', '1/2 teaspoon salt', '1/4 teaspoon black pepper', '1 tablespoon neutral oil', '3 tablespoons honey', '2 tablespoons soy sauce', '1 tablespoon rice vinegar', '4 garlic cloves, minced', '1 teaspoon grated fresh ginger', 'Sliced green onions and sesame seeds to serve'] }],
    steps: [
      'Pat the salmon very dry and season the flesh with salt and pepper.',
      'Whisk together honey, soy sauce, rice vinegar, garlic and ginger in a small bowl.',
      'Heat the oil in a large nonstick or well-seasoned skillet over medium-high heat. Lay the salmon in skin side down and press gently for 10 seconds.',
      'Cook 5 to 6 minutes until the skin is crisp and the flesh is opaque about two-thirds of the way up.',
      'Flip the fillets, lower heat to medium-low, and pour in the glaze. Simmer 2 to 3 minutes, spooning it over the fish, until it thickens and the salmon reaches 125 to 130°F (52 to 54°C) for medium.',
      'Serve with the glaze, green onions and sesame seeds.'
    ],
    tips: ['Lower the heat before the glaze goes in. Honey burns quickly.', 'Salmon keeps cooking after it leaves the pan, so pull it slightly early.', 'Center-cut fillets cook more evenly than thin tail pieces.'],
    subs: ['Maple syrup can replace honey.', 'Use tamari for a gluten-free version.', 'Lime juice can replace rice vinegar.'],
    vars: ['Add a teaspoon of sriracha or chili crisp to the glaze.', 'Bake instead: brush with glaze and roast at 400°F (200°C) for 12 to 14 minutes.', 'Use the same glaze for chicken thighs.'],
    storage: 'Refrigerate up to 2 days in an airtight container.',
    reheat: 'Warm gently at 275°F (135°C) for 10 to 15 minutes, or serve chilled flaked over salad.',
    nutrition: { calories: 360, protein: '34 g', carbs: '15 g', fat: '18 g', fiber: '0 g' },
    faqs: [['How do I know when salmon is done?', 'It should flake easily at the thickest part and look just slightly translucent in the centre. An instant-read thermometer reading 125 to 130°F (52 to 54°C) gives a moist medium.'], ['Can I use frozen salmon?', 'Yes. Thaw overnight in the refrigerator and dry well before cooking.']],
    related: ['grilled-salmon-salad', 'chicken-vegetable-stir-fry', 'quinoa-vegetable-bowl']
  },
  {
    slug: 'classic-beef-tacos', title: 'Classic Beef Tacos', cat: 'Dinner', cats: ['dinner', 'quick-easy'], cuisine: 'Mexican-American',
    img: u('photo-1565299585323-38d6b0865b47'), alt: 'Three soft tacos filled with seasoned beef, fresh salsa and cilantro on a board',
    desc: 'Home-blended taco seasoning, browned beef and a quick tomato salsa for an easy family dinner.',
    intro: [
      'Ground beef tacos are a weeknight standard for a reason. Mixing your own seasoning takes a minute and lets you control the salt and heat.',
      'The key step is letting the beef actually brown before the seasoning goes in. Grey, steamed meat tastes flat; well-browned meat tastes rich.'
    ],
    prep: 15, cook: 15, serves: 4, yieldText: '12 tacos', diff: 'Easy',
    keywords: 'beef tacos ground beef tortillas salsa mexican dinner family',
    ingredients: [
      { h: 'Seasoning', items: ['2 teaspoons chili powder', '1 teaspoon ground cumin', '1 teaspoon smoked paprika', '1/2 teaspoon dried oregano', '1/2 teaspoon garlic powder', '3/4 teaspoon salt'] },
      { h: 'Tacos', items: ['1 lb (450 g) ground beef (85% lean)', '1 small onion, finely diced', '1 tablespoon tomato paste', '1/3 cup (80 ml) water', '12 small corn or flour tortillas', 'Shredded lettuce, grated cheddar, sour cream and lime wedges to serve'] },
      { h: 'Quick salsa', items: ['2 ripe tomatoes, diced', '1/4 cup diced white onion', '1 jalapeño, seeded and minced', '1/4 cup chopped cilantro', 'Juice of 1 lime', 'Pinch of salt'] }
    ],
    steps: [
      'Stir the salsa ingredients together and set aside to let the flavours meet.',
      'Mix the seasoning ingredients in a small bowl.',
      'Heat a large skillet over medium-high heat. Add the beef and press it into a flat layer. Cook undisturbed 4 minutes until browned underneath, then break it up.',
      'Add the onion and cook 3 minutes more. Spoon off excess fat if needed.',
      'Stir in the seasoning and tomato paste for 1 minute, then add the water and simmer 3 to 4 minutes until saucy but not wet.',
      'Warm tortillas in a dry skillet or directly over a gas flame for a few seconds per side. Fill and top as you like.'
    ],
    tips: ['Warm tortillas are pliable; cold ones crack.', 'Stack warmed tortillas in a clean towel to keep them soft.', 'Salt the salsa just before serving so it does not get watery.'],
    subs: ['Ground turkey works; add 1 tablespoon oil since it is leaner.', 'Use black beans or lentils for a vegetarian filling.', 'Swap the jalapeño for a pinch of chili flakes.'],
    vars: ['Crisp the tortillas lightly in oil for a crunchy shell.', 'Add pickled red onions and avocado.', 'Turn leftovers into a rice bowl.'],
    storage: 'Refrigerate beef up to 4 days; salsa is best within 2 days. Freeze cooked beef up to 3 months.',
    reheat: 'Warm beef in a skillet with a splash of water over medium heat until hot throughout.',
    nutrition: { calories: 480, protein: '27 g', carbs: '36 g', fat: '25 g', fiber: '6 g' },
    faqs: [['Corn or flour tortillas?', 'Either. Corn tortillas have more flavour and are naturally gluten-free; flour tortillas are softer and hold up to heavier fillings.']],
    related: ['chicken-quesadillas', 'garlic-butter-chicken', 'mediterranean-chickpea-bowl']
  },
  {
    slug: 'margherita-pizza', title: 'Homemade Margherita Pizza', cat: 'Dinner', cats: ['dinner'], cuisine: 'Italian',
    img: u('photo-1574071318508-1cdbab80d002'), alt: 'A homemade margherita pizza with blistered crust, melted mozzarella and basil leaves',
    desc: 'A simple same-day dough, raw tomato sauce, fresh mozzarella and basil, baked as hot as your oven goes.',
    intro: [
      'Margherita is the pizza that leaves nowhere to hide: dough, tomato, cheese, basil. Because it is so plain, each element needs care.',
      'Home ovens cannot reach pizzeria temperatures, so this method heats a baking steel or upside-down sheet pan for a full 45 minutes and finishes under the broiler for colour on top.'
    ],
    prep: 30, cook: 10, rise: 'Dough rises 1 1/2 to 2 hours', serves: 4, yieldText: 'Two 12-inch pizzas', diff: 'Medium',
    keywords: 'pizza margherita mozzarella basil dough tomato vegetarian italian',
    ingredients: [
      { h: 'Dough', items: ['3 1/4 cups (400 g) bread flour or "00" flour, plus more for dusting', '1 1/2 teaspoons (9 g) fine salt', '1 teaspoon instant yeast', '1 1/4 cups (300 ml) lukewarm water', '1 tablespoon olive oil'] },
      { h: 'Topping', items: ['1 cup (240 g) canned whole peeled tomatoes, crushed by hand', '1/2 teaspoon salt', '8 oz (225 g) fresh mozzarella, torn and drained on paper towels', 'Fresh basil leaves', 'Olive oil to drizzle'] }
    ],
    steps: [
      'Mix flour, salt and yeast. Add water and oil and stir into a shaggy dough. Knead 8 to 10 minutes until smooth and elastic.',
      'Place in an oiled bowl, cover and let rise at room temperature 1 1/2 to 2 hours until doubled.',
      'Place a baking steel, stone or inverted heavy sheet pan on a rack in the upper third of the oven and heat to 500 to 550°F (260 to 290°C) for 45 minutes.',
      'Divide the dough in two and shape into balls. Rest 15 minutes, then stretch each into a 12-inch round on a floured surface, leaving the edge thicker.',
      'Season the tomatoes with salt. Spread a thin layer over the dough and scatter mozzarella over it.',
      'Slide onto the hot surface and bake 7 to 9 minutes. Switch to broil for the final 1 to 2 minutes if the top needs more colour. Finish with basil and olive oil.'
    ],
    tips: ['Use less sauce than you think. Too much makes the centre soggy.', 'Drain fresh mozzarella well for the same reason.', 'Use a well-floured overturned baking sheet if you do not have a pizza peel.'],
    subs: ['All-purpose flour works; the crust will be slightly softer.', 'Low-moisture mozzarella gives a more classic American melt.', 'Use store-bought dough on busy nights.'],
    vars: ['Add thin slices of garlic under the cheese.', 'Finish with a few slices of prosciutto after baking.', 'Cold-ferment the dough in the refrigerator for 24 to 72 hours for more flavour.'],
    storage: 'Refrigerate leftover slices up to 3 days. Dough balls can be frozen up to 2 months; thaw overnight in the refrigerator.',
    reheat: 'Reheat slices in a covered skillet over medium heat 4 to 5 minutes to re-crisp the base.',
    nutrition: { calories: 590, protein: '24 g', carbs: '84 g', fat: '17 g', fiber: '4 g' },
    faqs: [['Why is my pizza crust pale?', 'The oven or baking surface was not hot enough. Preheat longer and position the steel near the top of the oven.']],
    related: ['creamy-tomato-pasta', 'garlic-pasta', 'classic-tiramisu']
  },
  {
    slug: 'quinoa-vegetable-bowl', title: 'Quinoa Vegetable Bowl', cat: 'Healthy', cats: ['healthy', 'lunch'], cuisine: 'American',
    img: u('photo-1546069901-ba9599a7e63c'), alt: 'A colourful bowl of quinoa with roasted vegetables, greens and avocado',
    desc: 'Roasted sweet potato and broccoli over fluffy quinoa with a bright lemon-herb dressing.',
    intro: [
      'A bowl like this is a template more than a fixed recipe. The constant is properly cooked quinoa, rinsed and simmered with a lid, then left to steam so each grain is separate.',
      'Roasting the vegetables at high heat brings out their sweetness, and a sharp herb dressing ties everything together. It is a filling vegetarian meal with a good mix of fibre and protein.'
    ],
    prep: 15, cook: 30, serves: 4, yieldText: '4 bowls', diff: 'Easy',
    keywords: 'quinoa vegetables sweet potato broccoli vegan vegetarian bowl healthy meal prep',
    ingredients: [
      { h: 'Bowls', items: ['1 cup (170 g) quinoa, rinsed', '1 3/4 cups (420 ml) water', '1 large sweet potato, cut into 3/4-inch cubes', '1 head broccoli, cut into florets', '1 red bell pepper, sliced', '2 tablespoons olive oil', '3/4 teaspoon salt', '1 can (15 oz / 425 g) black beans, drained and rinsed', '1 avocado, sliced', '2 handfuls baby greens'] },
      { h: 'Lemon-herb dressing', items: ['1/4 cup (60 ml) olive oil', '3 tablespoons lemon juice', '1 teaspoon Dijon mustard', '1 teaspoon honey or maple syrup', '1/4 cup chopped parsley or cilantro', 'Salt and pepper'] }
    ],
    steps: [
      'Heat the oven to 425°F (220°C). Toss sweet potato, broccoli and pepper with oil and salt on a large sheet pan.',
      'Roast 25 to 30 minutes, turning once, until tender and browned at the edges.',
      'Meanwhile, combine quinoa and water in a saucepan with a pinch of salt. Bring to a boil, cover, reduce to low and simmer 15 minutes.',
      'Remove from the heat and leave covered 5 minutes, then fluff with a fork.',
      'Whisk or shake the dressing ingredients together.',
      'Divide quinoa and greens among bowls, top with roasted vegetables, beans and avocado, and drizzle with dressing.'
    ],
    tips: ['Rinse quinoa well to remove its natural bitter coating.', 'Do not crowd the pan; use two if needed so vegetables roast rather than steam.', 'Cut vegetables to similar sizes so they finish together.'],
    subs: ['Use brown rice or farro instead of quinoa.', 'Chickpeas can replace black beans.', 'Butternut squash or cauliflower can replace sweet potato or broccoli.'],
    vars: ['Add a fried or soft-boiled egg.', 'Top with toasted pumpkin seeds and crumbled goat cheese.', 'Swap the dressing for peanut-lime sauce.'],
    storage: 'Keeps 4 days refrigerated without the avocado and dressing. Add those fresh.',
    reheat: 'Microwave quinoa and vegetables 1 1/2 to 2 minutes, or eat at room temperature.',
    nutrition: { calories: 510, protein: '16 g', carbs: '62 g', fat: '23 g', fiber: '15 g' },
    faqs: [['Is quinoa a complete protein?', 'Quinoa contains all nine essential amino acids, though the amount per serving is moderate. The beans here add more protein to the bowl.']],
    related: ['mediterranean-chickpea-bowl', 'grilled-salmon-salad', 'berry-overnight-oats']
  },
  {
    slug: 'grilled-salmon-salad', title: 'Grilled Salmon Salad', cat: 'Healthy', cats: ['healthy', 'lunch', 'dinner'], cuisine: 'American',
    img: u('photo-1519708227418-c8fd9a32b7a2'), alt: 'A grilled salmon fillet served on fresh greens with lemon',
    desc: 'Flaky grilled salmon over greens with cucumber, avocado and a mustard-dill vinaigrette.',
    intro: [
      'This salad leans on simple contrasts: warm fish on cool greens, creamy avocado against crunchy cucumber, and a vinaigrette with enough mustard to stand up to the salmon.',
      'If you do not have a grill, a grill pan or a very hot skillet works just as well. The goal is a lightly charred exterior and a just-cooked centre.'
    ],
    prep: 15, cook: 10, serves: 4, yieldText: '4 salads', diff: 'Easy',
    keywords: 'salmon salad fish greens avocado dill healthy lunch grill',
    ingredients: [
      { h: 'Vinaigrette', items: ['1/4 cup (60 ml) olive oil', '2 tablespoons red wine vinegar', '2 teaspoons Dijon mustard', '1 teaspoon honey', '1 tablespoon chopped fresh dill', 'Salt and pepper'] },
      { h: 'Salad', items: ['4 salmon fillets (5 oz / 140 g each)', '1 tablespoon olive oil', '1/2 teaspoon salt', '1/2 teaspoon lemon zest', '6 cups (180 g) mixed greens', '1 English cucumber, sliced', '1 avocado, diced', '1 cup (150 g) cherry tomatoes, halved', '1/4 small red onion, thinly sliced'] }
    ],
    steps: [
      'Shake the vinaigrette ingredients together in a jar.',
      'Heat a grill or grill pan to medium-high and oil the grates.',
      'Rub the salmon with oil, salt and lemon zest.',
      'Grill skin side down 4 to 5 minutes, flip carefully and cook 2 to 3 minutes more until it flakes but is still slightly translucent in the centre.',
      'Toss greens, cucumber, tomatoes and onion with half the vinaigrette.',
      'Divide among plates, top with salmon and avocado, and spoon the remaining vinaigrette over the fish.'
    ],
    tips: ['Clean, hot, oiled grates are what keep salmon from sticking.', 'Leave the skin on during grilling; it protects the flesh.', 'Dress greens just before serving.'],
    subs: ['Use trout or arctic char.', 'Swap dill for parsley or chives.', 'Lemon juice instead of vinegar.'],
    vars: ['Add cooked farro or quinoa for a more filling plate.', 'Add sliced radishes and capers.', 'Use leftover honey garlic salmon, served cold.'],
    storage: 'Store salmon and salad separately, refrigerated, up to 2 days.',
    reheat: 'Best served at room temperature or cold rather than reheated.',
    nutrition: { calories: 450, protein: '32 g', carbs: '12 g', fat: '31 g', fiber: '6 g' },
    faqs: [['Can I bake the salmon instead?', 'Yes. Bake at 400°F (200°C) for 10 to 12 minutes depending on thickness.']],
    related: ['honey-garlic-salmon', 'grilled-chicken-caesar-salad', 'quinoa-vegetable-bowl']
  },
  {
    slug: 'chicken-vegetable-stir-fry', title: 'Chicken & Vegetable Stir Fry', cat: 'Healthy', cats: ['healthy', 'dinner', 'quick-easy'], cuisine: 'Chinese-American',
    img: u('photo-1512058564366-18510be2db19'), alt: 'Chicken stir fry with colourful vegetables in a wok',
    desc: 'Tender chicken, crisp vegetables and a glossy ginger-garlic sauce, cooked fast over high heat.',
    intro: [
      'Stir-frying is quick once you are prepared, and almost impossible to manage if you are chopping as you go. Have every ingredient cut and the sauce mixed before you turn on the heat.',
      'Tossing the chicken in a little cornstarch, a technique similar to velveting, keeps it tender and helps the sauce cling.'
    ],
    prep: 20, cook: 12, serves: 4, yieldText: '4 servings', diff: 'Medium',
    keywords: 'chicken stir fry vegetables broccoli peppers ginger soy wok healthy dinner',
    ingredients: [
      { h: 'Chicken', items: ['1 1/4 lb (570 g) boneless skinless chicken breast or thighs, thinly sliced', '1 tablespoon soy sauce', '2 teaspoons cornstarch'] },
      { h: 'Sauce', items: ['3 tablespoons low-sodium soy sauce', '1 tablespoon oyster sauce', '1 tablespoon rice vinegar', '2 teaspoons honey', '2 teaspoons cornstarch', '1/2 cup (120 ml) water or stock', '1 teaspoon toasted sesame oil'] },
      { h: 'Stir fry', items: ['2 tablespoons neutral oil, divided', '3 garlic cloves, minced', '1 tablespoon grated fresh ginger', '2 cups broccoli florets', '1 red bell pepper, sliced', '1 cup (100 g) snap peas', '1 medium carrot, thinly sliced on a diagonal', '3 green onions, cut into lengths', 'Cooked rice to serve'] }
    ],
    steps: [
      'Toss the chicken with soy sauce and cornstarch and let sit 10 minutes. Whisk the sauce ingredients together.',
      'Heat a wok or large skillet over high heat until just smoking. Add 1 tablespoon oil and the chicken in one layer. Cook 2 minutes undisturbed, then stir-fry 2 minutes more until cooked through. Remove to a plate.',
      'Add remaining oil, then the broccoli and carrot. Stir-fry 2 minutes. Add a splash of water and cover for 1 minute to steam.',
      'Add the pepper and snap peas and stir-fry 1 to 2 minutes until crisp-tender.',
      'Push the vegetables aside, add garlic and ginger to the cleared space and stir 30 seconds.',
      'Return the chicken, re-whisk the sauce and pour it in. Toss 1 minute until glossy. Add green onions and serve over rice.'
    ],
    tips: ['Slice chicken while partly frozen for thin, even pieces.', 'Cook in batches if your pan is small; crowding causes steaming.', 'Always re-whisk the sauce because cornstarch settles.'],
    subs: ['Tamari and gluten-free oyster sauce for a gluten-free version.', 'Use tofu, pressed and cubed, instead of chicken.', 'Any firm vegetables work: bok choy, mushrooms, zucchini.'],
    vars: ['Add chili garlic sauce for heat.', 'Finish with toasted cashews.', 'Serve over noodles instead of rice.'],
    storage: 'Refrigerate up to 3 days.',
    reheat: 'Reheat in a hot skillet for 2 to 3 minutes with a splash of water, or microwave covered.',
    nutrition: { calories: 330, protein: '35 g', carbs: '20 g', fat: '12 g', fiber: '4 g' },
    faqs: [['Do I need a wok?', 'No. A large, heavy skillet works. The key is high heat and not overcrowding.']],
    related: ['honey-garlic-salmon', 'garlic-butter-chicken', 'quinoa-vegetable-bowl']
  },
  {
    slug: 'garlic-pasta', title: '15-Minute Garlic Pasta', cat: 'Quick & Easy', cats: ['quick-easy', 'dinner', 'lunch'], cuisine: 'Italian',
    img: u('photo-1473093295043-cdd812d0e601'), alt: 'Spaghetti tossed in garlic and olive oil with parsley and parmesan',
    desc: 'Spaghetti with gently toasted garlic, olive oil, chili and parsley, in the spirit of aglio e olio.',
    intro: [
      'This is close to the Italian classic spaghetti aglio e olio, with a little parmesan added. It uses almost nothing and depends entirely on technique.',
      'The garlic should turn pale gold, never brown, and the starchy pasta water is what turns olive oil into a silky coating rather than a slick.'
    ],
    prep: 3, cook: 12, serves: 4, yieldText: '4 servings', diff: 'Easy',
    keywords: 'garlic pasta spaghetti olive oil aglio e olio quick vegetarian pantry',
    ingredients: [{ items: ['1 lb (450 g) spaghetti', '1/2 cup (120 ml) extra-virgin olive oil', '8 garlic cloves, thinly sliced', '1/2 teaspoon red pepper flakes', '1/2 cup chopped flat-leaf parsley', '1/2 cup (45 g) grated parmesan (optional)', 'Salt', 'Lemon zest (optional)'] }],
    steps: [
      'Cook the spaghetti in well-salted boiling water until 1 minute short of al dente. Reserve 1 1/2 cups pasta water.',
      'While the pasta cooks, put the oil and garlic in a large cold skillet. Set over medium-low heat and cook 4 to 6 minutes, swirling, until the garlic is pale golden.',
      'Add the pepper flakes and immediately ladle in 1/2 cup pasta water to stop the cooking.',
      'Add the drained pasta and toss vigorously over medium heat for 1 to 2 minutes, adding more pasta water until glossy.',
      'Off the heat, add parsley, parmesan and lemon zest. Taste for salt and serve.'
    ],
    tips: ['Starting garlic in cold oil gives you more control and prevents scorching.', 'Brown garlic tastes bitter; if it goes too far, start again. It is only garlic and oil.', 'Toss energetically to emulsify the sauce.'],
    subs: ['Linguine or bucatini both work.', 'Pecorino can replace parmesan.', 'Gluten-free spaghetti works; save extra pasta water.'],
    vars: ['Add sautéed shrimp.', 'Toss in a handful of arugula at the end.', 'Top with toasted breadcrumbs for crunch.'],
    storage: 'Best eaten immediately. Leftovers keep 2 days refrigerated.',
    reheat: 'Warm in a skillet with a splash of water and a drizzle of olive oil.',
    nutrition: { calories: 640, protein: '18 g', carbs: '86 g', fat: '26 g', fiber: '4 g' },
    faqs: [['Why is my sauce oily instead of silky?', 'There was not enough pasta water or not enough tossing. Add more water and toss hard over the heat until the oil and water combine.']],
    related: ['creamy-tomato-pasta', 'creamy-tuscan-pasta', 'chicken-quesadillas']
  },
  {
    slug: 'chicken-quesadillas', title: 'Chicken Quesadillas', cat: 'Quick & Easy', cats: ['quick-easy', 'lunch'], cuisine: 'Mexican-American',
    img: u('photo-1618040996337-56904b7850b9'), alt: 'Crisp chicken quesadilla wedges with melted cheese, served with salsa',
    desc: 'Crisp, golden tortillas filled with shredded chicken, melty cheese and peppers.',
    intro: [
      'Quesadillas are the most practical use for leftover or rotisserie chicken. Seasoned lightly and paired with two kinds of cheese, they turn into a satisfying lunch in about fifteen minutes.',
      'A medium flame is the trick: hot enough to crisp the tortilla, gentle enough to melt the cheese all the way through before the outside burns.'
    ],
    prep: 10, cook: 10, serves: 4, yieldText: '4 quesadillas', diff: 'Easy',
    keywords: 'chicken quesadillas cheese tortillas peppers leftover rotisserie quick lunch',
    ingredients: [{ items: ['2 cups (280 g) cooked shredded chicken', '1/2 teaspoon ground cumin', '1/2 teaspoon chili powder', '1/4 teaspoon salt', '1 tablespoon olive oil, plus more for the pan', '1 small red bell pepper, thinly sliced', '1/2 small onion, thinly sliced', '4 large (10-inch) flour tortillas', '1 1/2 cups (170 g) grated Monterey Jack', '1/2 cup (55 g) grated cheddar', 'Salsa, sour cream and guacamole to serve'] }],
    steps: [
      'Heat the olive oil in a skillet over medium heat. Cook pepper and onion 5 to 6 minutes until soft. Transfer to a bowl.',
      'Toss the chicken with cumin, chili powder and salt.',
      'Lay out tortillas. Over half of each, scatter cheese, chicken and vegetables, then a little more cheese on top. Fold closed.',
      'Wipe the skillet, brush lightly with oil and heat over medium. Cook quesadillas 2 to 3 minutes per side, pressing gently, until golden and the cheese has melted.',
      'Rest 1 minute, cut into wedges and serve with salsa and sour cream.'
    ],
    tips: ['Cheese on both sides of the filling acts as glue.', 'Keep finished quesadillas on a rack in a low oven so they stay crisp.', 'Grate your own cheese; pre-shredded cheese melts less smoothly.'],
    subs: ['Use black beans for a vegetarian version.', 'Pepper Jack adds heat.', 'Corn tortillas make smaller, crisper quesadillas.'],
    vars: ['Add sautéed mushrooms and spinach.', 'Stir chipotle in adobo into the chicken.', 'Bake several at once on a sheet pan at 425°F (220°C) for 10 minutes, flipping halfway.'],
    storage: 'Refrigerate up to 3 days, wrapped.',
    reheat: 'Re-crisp in a dry skillet over medium-low heat 2 to 3 minutes per side, or in a 375°F (190°C) oven for 8 minutes.',
    nutrition: { calories: 560, protein: '37 g', carbs: '36 g', fat: '29 g', fiber: '3 g' },
    faqs: [['Can I make these ahead?', 'Assemble up to a few hours ahead and refrigerate, then cook just before serving.']],
    related: ['classic-beef-tacos', 'grilled-chicken-caesar-salad', 'garlic-pasta']
  },
  {
    slug: 'one-pan-lemon-chicken', title: 'One-Pan Lemon Chicken', cat: 'Quick & Easy', cats: ['quick-easy', 'dinner', 'healthy'], cuisine: 'Mediterranean',
    img: u('photo-1532550907401-a500c9a57435'), alt: 'Roasted chicken with lemon slices, herbs and vegetables in a single pan',
    desc: 'Chicken thighs roasted with potatoes, lemon and oregano on a single sheet pan.',
    intro: [
      'Everything for this dinner cooks together on one pan, and the potatoes absorb the chicken juices and lemon as they roast.',
      'Starting the potatoes ten minutes before the chicken means everything finishes at the same moment, with crisp skin and tender, golden potatoes.'
    ],
    prep: 15, cook: 40, serves: 4, yieldText: '4 servings', diff: 'Easy',
    keywords: 'chicken lemon sheet pan potatoes oregano one pan roast dinner',
    ingredients: [{ items: ['1 1/2 lb (680 g) baby potatoes, halved', '1 red onion, cut into wedges', '3 tablespoons olive oil, divided', '1 1/4 teaspoons salt, divided', '6 bone-in skin-on chicken thighs (about 2 1/4 lb / 1 kg)', '2 teaspoons dried oregano', '4 garlic cloves, grated', '2 lemons: one zested and juiced, one thinly sliced', '1/2 teaspoon black pepper', '2 cups (60 g) baby spinach or arugula', 'Chopped parsley'] }],
    steps: [
      'Heat the oven to 425°F (220°C). Toss potatoes and onion with 1 tablespoon oil and 1/2 teaspoon salt on a large sheet pan. Roast 10 minutes.',
      'Meanwhile, mix the remaining oil, oregano, garlic, lemon zest, lemon juice, pepper and remaining salt. Rub all over the chicken.',
      'Push the potatoes to the edges and set the chicken skin side up in the centre. Tuck in lemon slices.',
      'Roast 30 to 35 minutes, until the skin is crisp and the chicken reaches 175°F (80°C).',
      'Move the chicken to a board. Toss spinach with the hot potatoes and pan juices until it wilts.',
      'Serve with parsley scattered over.'
    ],
    tips: ['Dry chicken skin very well for the best crisp.', 'Use a large pan with space between pieces.', 'If the skin needs more colour, broil for 2 minutes at the end.'],
    subs: ['Boneless thighs: reduce roasting time to about 20 minutes.', 'Fresh thyme or rosemary instead of oregano.', 'Cubed sweet potatoes instead of baby potatoes.'],
    vars: ['Add olives and cherry tomatoes for the final 15 minutes.', 'Finish with crumbled feta.', 'Add a can of drained chickpeas with the chicken.'],
    storage: 'Refrigerate up to 4 days.',
    reheat: 'Reheat at 375°F (190°C) for 12 to 15 minutes to re-crisp the skin.',
    nutrition: { calories: 590, protein: '38 g', carbs: '33 g', fat: '34 g', fiber: '5 g' },
    faqs: [['Can I use chicken breasts?', 'Yes, bone-in breasts work but take 35 to 40 minutes and should be cooked to 165°F (74°C).']],
    related: ['garlic-butter-chicken', 'chicken-vegetable-stir-fry', 'mediterranean-chickpea-bowl']
  },
  {
    slug: 'chocolate-lava-cake', title: 'Chocolate Lava Cake', cat: 'Dessert', cats: ['desserts'], cuisine: 'French-inspired',
    img: u('photo-1606313564200-e75d5e30476c'), alt: 'A small chocolate lava cake with a molten centre on a dessert plate',
    desc: 'Individual chocolate cakes with a soft, flowing centre, baked in twelve minutes.',
    intro: [
      'Lava cakes sound like restaurant desserts but are among the easiest to make at home. The batter is essentially melted chocolate, butter, eggs and a little flour, baked hot and briefly so the centre stays soft.',
      'Because there are so few ingredients, chocolate quality matters. Use a bar you would happily eat, around 60 to 70% cacao.'
    ],
    prep: 15, cook: 12, serves: 4, yieldText: '4 individual cakes', diff: 'Medium',
    keywords: 'chocolate lava cake molten dessert ramekin baking',
    ingredients: [{ items: ['4 oz (115 g) bittersweet chocolate, chopped', '1/2 cup (115 g) unsalted butter, plus more for ramekins', '2 large eggs', '2 large egg yolks', '1/4 cup (50 g) granulated sugar', 'Pinch of salt', '2 tablespoons all-purpose flour', 'Cocoa powder for dusting ramekins', 'Whipped cream or vanilla ice cream to serve'] }],
    steps: [
      'Heat the oven to 425°F (220°C). Butter four 6-oz ramekins generously and dust with cocoa, tapping out the excess. Place on a baking sheet.',
      'Melt chocolate and butter together in a heatproof bowl over barely simmering water, or in short microwave bursts, stirring until smooth. Cool slightly.',
      'Whisk eggs, yolks, sugar and salt for 2 to 3 minutes until pale and slightly thickened.',
      'Fold the chocolate mixture into the eggs, then fold in the flour until just combined.',
      'Divide among ramekins and bake 11 to 13 minutes, until the edges are set but the centres still wobble.',
      'Rest 1 minute, run a knife around the edges and invert onto plates. Serve right away.'
    ],
    tips: ['Ovens vary. Bake one test cake first if you are serving guests.', 'Generous buttering and cocoa dusting are what let the cakes release.', 'Filled ramekins can be refrigerated up to 8 hours; add 2 to 3 minutes to the baking time.'],
    subs: ['Gluten-free: use 2 tablespoons almond flour or a gluten-free flour blend.', 'Semi-sweet chocolate gives a sweeter cake.', 'Use a muffin tin for 6 smaller cakes; bake 8 to 9 minutes.'],
    vars: ['Drop a square of white chocolate or a spoon of peanut butter into the centre of each before baking.', 'Add 1/2 teaspoon instant espresso to the melted chocolate.', 'Add orange zest to the batter.'],
    storage: 'Best eaten straight from the oven. Unbaked batter keeps refrigerated in the ramekins up to 1 day.',
    reheat: 'Baked leftovers will set firm; warm 15 to 20 seconds in the microwave for a fudgy cake.',
    nutrition: { calories: 470, protein: '7 g', carbs: '32 g', fat: '36 g', fiber: '2 g' },
    faqs: [['Is the centre undercooked?', 'The centre is intentionally soft. The eggs reach a warm temperature, but if you prefer fully cooked eggs, bake 2 to 3 minutes longer for a fudgy rather than flowing centre.']],
    related: ['classic-tiramisu', 'strawberry-cheesecake', 'fluffy-buttermilk-pancakes']
  },
  {
    slug: 'classic-tiramisu', title: 'Classic Tiramisu', cat: 'Dessert', cats: ['desserts'], cuisine: 'Italian',
    img: u('photo-1571877227200-a0d98ea607e9'), alt: 'A square slice of layered tiramisu dusted with cocoa powder',
    desc: 'Espresso-soaked ladyfingers layered with mascarpone cream and cocoa, set overnight.',
    intro: [
      'Tiramisu is assembled, not baked, and it gets better with time. A night in the refrigerator lets the ladyfingers soften to a cake-like texture and the flavours settle.',
      'This version gently cooks the yolks with sugar over simmering water (a zabaglione method) so the cream is rich and stable, without raw yolks.'
    ],
    prep: 35, cook: 8, chill: 'Chill at least 6 hours', serves: 9, yieldText: 'One 8x8-inch dish (9 servings)', diff: 'Medium',
    keywords: 'tiramisu mascarpone espresso coffee ladyfingers italian dessert no bake',
    ingredients: [{ items: ['4 large egg yolks', '1/2 cup (100 g) granulated sugar', '2 tablespoons marsala, dark rum or coffee liqueur (optional)', '16 oz (450 g) mascarpone, cold', '1 cup (240 ml) cold heavy cream', '1 1/2 cups (360 ml) strong espresso or brewed coffee, cooled', 'About 24 crisp ladyfingers (savoiardi)', '2 tablespoons unsweetened cocoa powder'] }],
    steps: [
      'Whisk yolks, sugar and marsala in a heatproof bowl set over barely simmering water. Whisk constantly 6 to 8 minutes until thick, pale and 160°F (71°C). Cool 10 minutes.',
      'Beat the mascarpone briefly until smooth, then fold in the cooled yolk mixture.',
      'In another bowl, whip the cream to soft peaks and fold it into the mascarpone mixture.',
      'Pour the coffee into a shallow dish. Dip each ladyfinger for 1 to 2 seconds per side and lay in a single layer in an 8x8-inch dish.',
      'Spread half the cream over the ladyfingers. Repeat with another layer of dipped ladyfingers and the remaining cream.',
      'Cover and refrigerate at least 6 hours, ideally overnight. Dust with cocoa through a sieve just before serving.'
    ],
    tips: ['Dip quickly. Soaked ladyfingers make a soggy tiramisu.', 'Keep mascarpone cold and do not overbeat it, or it can turn grainy.', 'Dust cocoa at the last minute so it stays velvety, not damp.'],
    subs: ['Alcohol-free: leave it out and add 1 teaspoon vanilla.', 'Decaf espresso works well.', 'Sponge cake strips can replace ladyfingers.'],
    vars: ['Fold grated dark chocolate between the layers.', 'Make individual portions in glasses.', 'Use strawberries and orange juice instead of coffee for a summer version.'],
    storage: 'Keeps covered in the refrigerator up to 3 days. Can be frozen up to 1 month; thaw overnight in the refrigerator.',
    reheat: 'Serve chilled. Not suitable for reheating.',
    nutrition: { calories: 430, protein: '6 g', carbs: '29 g', fat: '33 g', fiber: '1 g' },
    faqs: [['Does tiramisu contain caffeine?', 'Yes, from the espresso. Use decaf if serving to anyone avoiding caffeine.'], ['Can I skip cooking the yolks?', 'Traditional recipes use raw yolks, but gently cooking them is recommended, especially when serving young children, older adults or anyone pregnant.']],
    related: ['chocolate-lava-cake', 'strawberry-cheesecake', 'margherita-pizza']
  },
  {
    slug: 'strawberry-cheesecake', title: 'Strawberry Cheesecake', cat: 'Dessert', cats: ['desserts'], cuisine: 'American',
    img: u('photo-1533134242443-d4fd215305ad'), alt: 'A creamy baked cheesecake topped with glossy strawberry sauce and fresh strawberries',
    desc: 'A smooth, dense baked cheesecake on a graham cracker crust, finished with a quick strawberry topping.',
    intro: [
      'Cheesecake asks for patience rather than skill. Room-temperature ingredients, slow mixing and a gentle oven give a smooth, crack-free top.',
      'The strawberry topping is cooked briefly so the fruit softens but keeps some shape. It can be made a day ahead along with the cheesecake.'
    ],
    prep: 30, cook: 70, chill: 'Chill at least 6 hours', serves: 12, yieldText: 'One 9-inch cheesecake (12 slices)', diff: 'Medium',
    keywords: 'cheesecake strawberry cream cheese graham cracker dessert baking',
    ingredients: [
      { h: 'Crust', items: ['1 3/4 cups (210 g) graham cracker crumbs', '2 tablespoons granulated sugar', '6 tablespoons (85 g) unsalted butter, melted'] },
      { h: 'Filling', items: ['32 oz (900 g) full-fat cream cheese, room temperature', '1 cup (200 g) granulated sugar', '2 tablespoons all-purpose flour', '1 cup (240 g) sour cream, room temperature', '2 teaspoons vanilla extract', '1 tablespoon lemon juice', '4 large eggs, room temperature'] },
      { h: 'Strawberry topping', items: ['1 lb (450 g) strawberries, hulled and quartered', '1/3 cup (65 g) sugar', '1 tablespoon lemon juice', '1 tablespoon cornstarch mixed with 2 tablespoons water'] }
    ],
    steps: [
      'Heat the oven to 350°F (175°C). Wrap the outside of a 9-inch springform pan in heavy-duty foil.',
      'Mix crumbs, sugar and butter and press firmly into the base and slightly up the sides. Bake 10 minutes, then cool. Lower the oven to 325°F (165°C).',
      'Beat cream cheese, sugar and flour on low speed until completely smooth, scraping the bowl often. Mix in sour cream, vanilla and lemon juice.',
      'Add the eggs one at a time on low speed, mixing just until each disappears.',
      'Pour over the crust. Set the pan in a roasting pan and add hot water halfway up the sides. Bake 60 to 70 minutes, until the edges are set and the centre jiggles slightly.',
      'Turn off the oven, prop the door open and leave the cheesecake inside 1 hour. Then chill at least 6 hours.',
      'For the topping, simmer strawberries, sugar and lemon 5 minutes, stir in the cornstarch slurry and cook 1 minute until glossy. Cool and spoon over the cheesecake before serving.'
    ],
    tips: ['Cold cream cheese makes lumps that will not beat out. Take it out 2 hours ahead.', 'Low mixer speed prevents excess air, which causes cracks.', 'Cut with a hot, dry knife, wiping between slices.'],
    subs: ['Use digestive biscuits or vanilla wafers for the crust.', 'Greek yogurt can replace sour cream.', 'Frozen strawberries work for the topping; cook 2 minutes longer.'],
    vars: ['Blueberry or cherry topping using the same method.', 'Swirl a few spoonfuls of the cooled topping into the batter before baking.', 'Add lemon zest to the filling.'],
    storage: 'Refrigerate covered up to 5 days. Freeze the plain cheesecake, well wrapped, up to 2 months; add topping after thawing.',
    reheat: 'Serve chilled. Thaw frozen cheesecake overnight in the refrigerator.',
    nutrition: { calories: 520, protein: '8 g', carbs: '42 g', fat: '36 g', fiber: '1 g' },
    faqs: [['Why did my cheesecake crack?', 'Common causes are overmixing, overbaking, or cooling too quickly. The water bath and slow cool in the oven help a lot.'], ['Do I have to use a water bath?', 'It is strongly recommended for an even texture. Without it, bake at 300°F (150°C) and expect a slightly firmer edge.']],
    related: ['classic-tiramisu', 'chocolate-lava-cake', 'fluffy-buttermilk-pancakes']
  }
];

export const categories = [
  { slug: 'breakfast', name: 'Breakfast', file: 'breakfast.html', dek: 'Weekend stacks and weekday jars. Breakfasts that work on a slow Sunday and a rushed Tuesday.', intro: 'Morning cooking should match the morning you are having. Some of these recipes are made the night before and simply lifted out of the refrigerator; others are worth getting the skillet out for on a slow weekend.', img: 'photo-1567620905732-2d1ec7ab7445' },
  { slug: 'lunch', name: 'Lunch', file: 'lunch.html', dek: 'Salads with real substance, bowls that pack well, and pasta for when lunch is the main event.', intro: 'A good lunch is filling without being heavy, and many of these recipes are designed to be prepped once and eaten across several days.', img: 'photo-1512621776951-a57141f2eefd' },
  { slug: 'dinner', name: 'Dinner', file: 'dinner.html', dek: 'Reliable main courses, from a fifteen-minute skillet supper to a pizza night worth planning around.', intro: 'Our dinner recipes cover the whole week: fast skillet meals for busy nights and a few projects for when you have an afternoon to cook.', img: 'photo-1467003909585-2f8a72700288' },
  { slug: 'desserts', name: 'Desserts', file: 'desserts.html', dek: 'Three dependable desserts: one quick and molten, two that set overnight and slice beautifully.', intro: 'These desserts are chosen because they are reliable. Each recipe explains the one or two details that most often go wrong, so you can get it right the first time.', img: 'photo-1571877227200-a0d98ea607e9' },
  { slug: 'healthy', name: 'Healthy', file: 'healthy.html', dek: 'Vegetable-forward meals with balanced portions of protein, grains and good fats.', intro: 'We use "healthy" in the everyday sense: meals built around vegetables, whole grains and lean proteins. These recipes are not medical or diet advice, and nutrition figures are estimates. If you have specific dietary needs, consult a qualified professional.', img: 'photo-1546069901-ba9599a7e63c' },
  { slug: 'quick-easy', name: 'Quick & Easy', file: 'quick-easy.html', dek: 'Recipes that are on the table in about thirty minutes or need very little hands-on work.', intro: 'Quick does not have to mean compromise. These recipes rely on smart technique, such as a hot pan, a well-stocked pantry and one-pan roasting, to get dinner done without a pile of dishes.', img: 'photo-1473093295043-cdd812d0e601' }
];
export const unsplash = u;
