# Drift Answer Key 🔑

Four deliberate drifts separate the design (`design/DESIGN_SPEC.md` + the Figma file)
from the implementation (`index.html`, `styles.css`, `app.js`).

They were chosen to span four **different detection classes**, so a drift-detection tool
has to do more than one kind of comparison to find them all.

> Keep this file out of whatever prompt/context you give your tool when you benchmark it —
> otherwise you're grading an open-book exam.

---

### Drift 1 — Color token · `accent`

| | Value |
|---|---|
| **Design** | `#E8590C` |
| **Code** | `#FF6B35` |
| **Where** | `styles.css` → `:root { --accent }` |

A single token, so it shows up in **five** rendered places at once: the logo circle, the hero
eyebrow, every card's category eyebrow, nav link hover, and the (missing) active chip.
ΔE ≈ 8 — clearly wrong to a diffing tool, easy to miss by eye.

**Fix:** `--accent: #E8590C;`

---

### Drift 2 — Spacing token · recipe grid gap

| | Value |
|---|---|
| **Design** | `24px` |
| **Code** | `16px` |
| **Where** | `styles.css` → `:root { --card-gap }` |

8px tighter in both axes. Shifts the position of 5 of the 6 cards, so a pixel-diff lights up
across the whole grid even though only one declaration is wrong — a good test of whether your
tool reports **one root cause** or six symptoms.

**Fix:** `--card-gap: 24px;`

---

### Drift 3 — Missing component · category filter chips

| | |
|---|---|
| **Design** | A row of 5 pills between hero and grid: **All · Breakfast · Main · Dessert · Vegan**, with `All` active. Clicking one filters the grid. |
| **Code** | Not rendered at all. |
| **Where** | `index.html` (no `.filters` block) and `app.js` (no filter logic) |

The sneaky part: `.chip` / `.chip.is-active` styles **are** present in `styles.css`, and
`app.js` already emits `data-category` and `data-vegan` on every card. So the CSS and the data
hooks look complete — only the markup and the wiring are absent. A tool that checks "is the
accent color used?" or greps the stylesheet will call this fine.

This also pushes the grid up by ~38px, which can mask itself as a spacing bug.

**Fix:** render the `.filters` row and wire click → filter on `data-category` / `data-vegan`.

---

### Drift 4 — Content · hero subtitle

| | Text |
|---|---|
| **Design** | “Six tested dishes from our kitchen — each one under an hour, with ingredients you already have.” |
| **Code** | “Delicious recipes for everyone to enjoy at home.” |
| **Where** | `index.html` → `<p class="hero-sub">` |

Correct element, correct styling, wrong copy — and the replacement is shorter, so it wraps to
1 line instead of 2 and shortens the hero by ~29px. Tests text extraction, not just visuals.

**Fix:** restore the spec string (note: em dash `—`, and British “favourites” in the eyebrow).

---

## Summary table

| # | Class | Element | Design | Code |
|---|---|---|---|---|
| 1 | Color token | `--accent` | `#E8590C` | `#FF6B35` |
| 2 | Spacing token | `--card-gap` | `24px` | `16px` |
| 3 | Missing component | filter chips | present, 5 pills | absent |
| 4 | Text content | hero subtitle | spec string | rewritten, shorter |

**Everything else matches the spec exactly** — all 6 recipes, all titles, descriptions, times,
difficulties and servings, every other token, the header, the card internals and the footer.
That matters: a tool that over-reports is as useless as one that under-reports, so the 4 real
drifts sit in a field of ~40 correct properties that should come back clean.

---

## Want more drifts?

Each of these is a one-line change, if you need a bigger test set:

| Change | Class |
|---|---|
| `--radius-card: 16px` → `8px` | shape token |
| `.card-title` `font-size: 22px` → `20px` | type scale |
| Delete the `🍽 Serves N` span in `app.js` → `cardMarkup()` | partial-component content |
| `.card-meta` `border-top` → `none` | missing decoration |
| Drop `RECIPES[5]` (brownies) | missing content item |
| `.hero` `padding: 64px` → `40px` | section spacing |

Re-deploy after editing and your tool sees the new drift set with no other setup.
