# Saffron Kitchen — Recipe Gallery · Design Spec

This is the **design source of truth**. The Figma file is built from this spec, and
`index.html` / `styles.css` are the (deliberately imperfect) implementation of it.

---

## 1. Design tokens

### Color

| Token | Value | Usage |
|---|---|---|
| `color/accent` | `#E8590C` | Category labels, chip active fill, link hover, footer rule |
| `color/accent-soft` | `#FFF1E8` | Chip resting fill, badge backgrounds |
| `color/ink` | `#1A1A1A` | Headings, card titles |
| `color/ink-muted` | `#6B6B6B` | Body copy, meta text, nav links |
| `color/surface` | `#FFFFFF` | Card background, header background |
| `color/page` | `#FAF7F2` | Page background |
| `color/border` | `#E8E2D9` | Card border, header rule, chip border |

### Typography

| Token | Family | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| `type/logo` | Playfair Display | 24px | 700 | 1.2 | `0` |
| `type/nav` | Inter | 15px | 500 | 1.4 | `0` |
| `type/h1` | Playfair Display | 48px | 700 | 1.15 | `-0.5px` |
| `type/subtitle` | Inter | 18px | 400 | 1.6 | `0` |
| `type/chip` | Inter | 14px | 500 | 1 | `0` |
| `type/eyebrow` | Inter | 12px | 600 | 1 | `1px` (UPPERCASE) |
| `type/card-title` | Playfair Display | 22px | 700 | 1.25 | `0` |
| `type/card-body` | Inter | 15px | 400 | 1.55 | `0` |
| `type/meta` | Inter | 13px | 500 | 1 | `0` |
| `type/footer` | Inter | 14px | 400 | 1.5 | `0` |

Fonts load from Google Fonts: `Playfair Display` (700) and `Inter` (400, 500, 600).

### Spacing, radius, shadow

| Token | Value |
|---|---|
| `space/card-gap` | **24px** (both row and column gap in the recipe grid) |
| `space/card-padding` | `20px` |
| `space/section-gap` | `56px` |
| `space/page-max-width` | `1120px` |
| `space/page-gutter` | `24px` |
| `radius/card` | `16px` |
| `radius/pill` | `999px` |
| `shadow/card` | `0 1px 2px rgba(26,26,26,0.04), 0 8px 24px rgba(26,26,26,0.06)` |

---

## 2. Layout

Single page, vertical stack, centered at `1120px` max width with `24px` gutters:

```
Header  →  Hero  →  Filter chips  →  Recipe grid  →  Footer
```

Recipe grid is **3 columns** at ≥960px, 2 columns at 640–959px, 1 column below 640px.

---

## 3. Components

### 3.1 Header
- Height 72px, `color/surface` background, 1px bottom border in `color/border`.
- Left: logo lockup — a 28×28px accent circle followed by the wordmark **“Saffron Kitchen”** in `type/logo`.
- Right: nav links, 28px apart — **Recipes**, **Seasonal**, **About**. `type/nav`, `color/ink-muted`.

### 3.2 Hero
- Top padding 64px, bottom padding 40px. Text left-aligned.
- Eyebrow: **“SIX WEEKNIGHT FAVOURITES”** in `type/eyebrow`, `color/accent`.
- H1: **“Everyday recipes, beautifully simple.”** in `type/h1`, `color/ink`, max width 680px.
- Subtitle (`type/subtitle`, `color/ink-muted`, max width 560px):
  > “Six tested dishes from our kitchen — each one under an hour, with ingredients you already have.”

### 3.3 Filter chips  ← *required component*
A single horizontal row of 5 pill buttons, 10px apart, sitting between the hero and the grid:

**All · Breakfast · Main · Dessert · Vegan**

- Pill: `radius/pill`, padding `9px 18px`, `type/chip`, 1px border in `color/border`.
- Resting: `color/accent-soft` fill, `color/ink` text.
- Active (default = **All**): `color/accent` fill, `#FFFFFF` text, no border.
- Clicking a chip filters the grid to recipes in that category; **All** shows all six.

### 3.4 Recipe card
Vertical stack on `color/surface`, `radius/card`, 1px `color/border`, `shadow/card`.

1. **Image** — 3:2 ratio, full card width, flush to the top corners.
2. **Body** — `space/card-padding` (20px) on all sides:
   - Eyebrow: category, `type/eyebrow`, `color/accent`.
   - Title: `type/card-title`, `color/ink`. 10px below eyebrow.
   - Description: `type/card-body`, `color/ink-muted`, 2 lines. 8px below title.
   - **Meta row** — 16px below the description, separated by a 1px `color/border` top rule with 14px of space above it. Three items, 16px apart, `type/meta`, `color/ink-muted`:
     `⏱ <time>` · `◆ <difficulty>` · `🍽 <servings>`
     All three items appear on **every** card.

Hover: card lifts 2px, shadow deepens. 150ms ease.

### 3.5 Footer
- 1px top border in `color/border`, 32px vertical padding, `type/footer`, `color/ink-muted`.
- Left: `© 2026 Saffron Kitchen`
- Right: `Made for people who cook on weeknights.`

---

## 4. Content — the six recipes

| # | Category | Title | Description | Time | Difficulty | Servings |
|---|---|---|---|---|---|---|
| 1 | Breakfast | Blueberry Buttermilk Pancakes | Fluffy, tangy and ready in twenty minutes — the stack that makes a slow morning worth it. | 20 min | Easy | 4 |
| 2 | Breakfast | Smashed Avocado Toast | Lemon, chilli flakes and good sourdough. Simple food that tastes like effort. | 10 min | Easy | 2 |
| 3 | Main | Tomato & Basil Pasta | Slow-blistered tomatoes, torn basil, and just enough pasta water to pull it together. | 30 min | Easy | 4 |
| 4 | Dessert | Classic Lemon Tart | Sharp citrus curd in a crisp butter shell, chilled until it slices clean. | 55 min | Medium | 8 |
| 5 | Main | Coconut Chickpea Curry | A one-pot weeknight curry that leans on pantry staples and gets better overnight. | 35 min | Easy | 4 |
| 6 | Dessert | Dark Chocolate Brownies | Crackled top, dense middle, and a pinch of flaky salt to keep it honest. | 40 min | Medium | 12 |

The **Vegan** chip matches recipes 2, 3 and 5.
