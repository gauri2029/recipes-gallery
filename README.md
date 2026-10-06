# Saffron Kitchen — Recipe Gallery

A deliberately drifted static site, built as a **test fixture for design-drift detection**.

Plain HTML/CSS/JS. No build step, no dependencies, no framework. Six static recipes
rendered as a card gallery.

```
index.html              implementation markup
styles.css              implementation styles
app.js                  static recipe data + gallery rendering
assets/*.svg            6 deterministic thumbnails (no external images)
design/DESIGN_SPEC.md   ← design source of truth (tokens, components, content)
design/reference.html   ← the intended design, rendered pixel-true (Figma import source)
design/DRIFTS.md        ← answer key: the 4 planted drifts
vercel.json             static hosting config
```

## The point

`design/` is the **design**. The root is the **implementation**. They disagree in exactly
**4 places**, spanning 4 detection classes:

| # | Class | What's wrong |
|---|---|---|
| 1 | Color token | accent is `#FF6B35`, design says `#E8590C` |
| 2 | Spacing token | grid gap is `16px`, design says `24px` |
| 3 | Missing component | the 5 category filter chips were never built |
| 4 | Text content | the hero subtitle was rewritten |

Full details and fixes in [`design/DRIFTS.md`](design/DRIFTS.md). Everything else matches the
spec exactly, so a well-behaved tool should report 4 findings — not 40.

## Run locally

```bash
python3 -m http.server 8080
```

- Implementation (drifted): http://localhost:8080/
- Design reference (correct): http://localhost:8080/design/reference.html

## Deploy to Vercel

Zero config needed — it's a static site.

```bash
npm i -g vercel && vercel --prod
```

Or import the repo at [vercel.com/new](https://vercel.com/new): framework preset
**Other**, root directory `./`, no build command, output directory `./`. Both routes get you:

- `https://<project>.vercel.app/` — the drifted implementation
- `https://<project>.vercel.app/design/reference.html` — the design reference

GitHub Pages works identically (Settings → Pages → deploy from this branch, root).

## Getting the Figma file

`design/reference.html` exists so you don't have to draw the design by hand. Deploy it, then:

1. In Figma: **Resources → Plugins → search "html.to.design" → Run**
2. Paste the deployed `/design/reference.html` URL, width **1440**, and import.
3. You get a real Figma frame with live layers, text nodes and fills matching
   `DESIGN_SPEC.md` — which is what your drift tool reads via the Figma REST API.

Then point your tool at that Figma file and at the deployed root URL. Step-by-step
instructions, including the manual build and the API calls, are in the project notes.
