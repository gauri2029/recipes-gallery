/* Saffron Kitchen — static recipe data + gallery rendering. No build step, no deps. */

const RECIPES = [
  {
    slug: 'blueberry-pancakes',
    category: 'Breakfast',
    title: 'Blueberry Buttermilk Pancakes',
    description: 'Fluffy, tangy and ready in twenty minutes — the stack that makes a slow morning worth it.',
    time: '20 min',
    difficulty: 'Easy',
    servings: 4,
    vegan: false
  },
  {
    slug: 'avocado-toast',
    category: 'Breakfast',
    title: 'Smashed Avocado Toast',
    description: 'Lemon, chilli flakes and good sourdough. Simple food that tastes like effort.',
    time: '10 min',
    difficulty: 'Easy',
    servings: 2,
    vegan: true
  },
  {
    slug: 'tomato-basil-pasta',
    category: 'Main',
    title: 'Tomato & Basil Pasta',
    description: 'Slow-blistered tomatoes, torn basil, and just enough pasta water to pull it together.',
    time: '30 min',
    difficulty: 'Easy',
    servings: 4,
    vegan: true
  },
  {
    slug: 'lemon-tart',
    category: 'Dessert',
    title: 'Classic Lemon Tart',
    description: 'Sharp citrus curd in a crisp butter shell, chilled until it slices clean.',
    time: '55 min',
    difficulty: 'Medium',
    servings: 8,
    vegan: false
  },
  {
    slug: 'chickpea-curry',
    category: 'Main',
    title: 'Coconut Chickpea Curry',
    description: 'A one-pot weeknight curry that leans on pantry staples and gets better overnight.',
    time: '35 min',
    difficulty: 'Easy',
    servings: 4,
    vegan: true
  },
  {
    slug: 'dark-choc-brownies',
    category: 'Dessert',
    title: 'Dark Chocolate Brownies',
    description: 'Crackled top, dense middle, and a pinch of flaky salt to keep it honest.',
    time: '40 min',
    difficulty: 'Medium',
    servings: 12,
    vegan: false
  }
];

function cardMarkup(recipe) {
  return `
    <article class="card" data-category="${recipe.category}" data-vegan="${recipe.vegan}">
      <img src="assets/${recipe.slug}.svg" alt="${recipe.title}" loading="lazy" width="480" height="320" />
      <div class="card-body">
        <p class="eyebrow">${recipe.category}</p>
        <h2 class="card-title">${recipe.title}</h2>
        <p class="card-desc">${recipe.description}</p>
        <div class="card-meta">
          <span>⏱ ${recipe.time}</span>
          <span>◆ ${recipe.difficulty}</span>
          <span>🍽 Serves ${recipe.servings}</span>
        </div>
      </div>
    </article>`;
}

function renderGallery() {
  const grid = document.getElementById('recipe-grid');
  if (!grid) return;
  grid.innerHTML = RECIPES.map(cardMarkup).join('');
}

document.addEventListener('DOMContentLoaded', renderGallery);
