# Getting the Figma file

Your drift tool needs a Figma file that represents the **intended** design. There are two
ways to get one; the first takes about 5 minutes.

---

## Option A — Import `reference.html` into Figma (recommended)

`design/reference.html` renders the design spec pixel-true, so you can convert it straight
into real Figma layers instead of drawing anything.

1. **Deploy the site first** (see the README). You need a public URL — the importer fetches
   the page, so `localhost` won't work unless you tunnel it.
2. In Figma, open a new file → **Resources** (or `Shift`+`I`) → **Plugins** tab →
   search **`html.to.design`** → **Run**.
3. Paste your reference URL:
   ```
   https://<your-project>.vercel.app/design/reference.html
   ```
4. Set width **1440**, leave "load lazy images" on, and import.

You get a frame with real layers: text nodes with actual font/size/color, frames with real
fills, strokes and corner radii, and the SVG thumbnails as vectors. That's exactly what the
Figma REST API will hand your tool.

**After importing, do this** — it's what makes the file useful as a drift baseline:

- Rename the top frame to `Recipe Gallery / Desktop`.
- Rename the layer groups to match the spec: `Header`, `Hero`, `Filters`, `Recipe Grid`,
  `Card / 1...6`, `Footer`. Your tool matches design nodes to DOM nodes by name, so flat
  auto-generated names (`div`, `Frame 12`) make that much harder.
- Publish the 7 colors and 10 text styles from `DESIGN_SPEC.md` as **Figma variables /
  styles**. Token-level drift (drifts 1 and 2) is far easier to detect when the design side
  exposes `color/accent = #E8590C` as a named variable rather than a raw fill on 5 layers.

> Alternatives if that plugin doesn't suit: **Figma to HTML & Back**, or **Builder.io**.
> Any of them produce editable layers rather than a flat image.

---

## Option B — Build it by hand

If you want a cleanly structured file (better layer names, real auto-layout, proper
components), build it from `DESIGN_SPEC.md` directly. It's about 30 minutes:

1. **Frame**: Desktop `1440 x auto`, fill `#FAF7F2`.
2. **Variables**: create a collection with the 7 colors from section 1 of the spec, then the
   10 text styles. Do this *first* — everything else references them.
3. **Header**: auto-layout frame, `1440 x 72`, horizontal, space-between, padding `0 160`,
   fill `#FFFFFF`, bottom stroke `#E8E2D9`.
4. **Hero**: vertical auto-layout, padding `64 160 40`, gap `16`. Three text nodes
   (eyebrow / h1 / subtitle) with the spec's exact strings.
5. **Filters**: horizontal auto-layout, gap `10`. Build *one* chip as a **component** with a
   `state` variant (`default` / `active`), then place 5 instances.
6. **Card**: build **one** card as a component — vertical auto-layout, fill `#FFFFFF`,
   radius `16`, stroke `#E8E2D9`, the shadow from the spec. Image 3:2 on top, body frame
   with padding `20`, and the meta row with its `14px` top padding and divider stroke.
   Then make 6 instances and fill in the content from section 4 of the spec.
7. **Grid**: wrap the 6 instances in a horizontal auto-layout that wraps, gap `24` both axes,
   3 per row.
8. **Footer**: horizontal auto-layout, space-between, padding `32 160`, top stroke.

Use `design/reference.html` side by side as your visual check — if the two match, the file
is right.

---

## Wiring it into your tool

Once the file exists:

1. **File key** — from the URL: `figma.com/file/<FILE_KEY>/...` (or `/design/<FILE_KEY>/`).
2. **Token** — Figma → Settings → Security → **Personal access tokens** → generate one with
   `File content: read`.
3. **Fetch the node tree:**
   ```bash
   curl -H "X-Figma-Token: $FIGMA_TOKEN" \
     "https://api.figma.com/v1/files/$FILE_KEY"
   ```
   Useful companions:
   - `/v1/files/$FILE_KEY/nodes?ids=<id>` — one subtree, much smaller payload.
   - `/v1/images/$FILE_KEY?ids=<id>&format=png&scale=2` — rendered PNG, for pixel diffing
     against a Playwright screenshot of the deployed site.
   - `/v1/files/$FILE_KEY/variables/local` — your published tokens (needs an Enterprise
     plan; otherwise read styles via `/v1/files/$FILE_KEY/styles`).
4. **Compare** against the deployed implementation. The four drifts in `DRIFTS.md` are
   reachable by:
   - Drift 1 → fill color on text/vector nodes vs. computed `color` / `background-color`
   - Drift 2 → auto-layout `itemSpacing` vs. computed `gap` on `.grid`
   - Drift 3 → a named design node with no DOM counterpart
   - Drift 4 → `characters` on the text node vs. `textContent`

A sanity check worth running first: diff `reference.html` against `index.html` with a
headless browser. If your pipeline finds the 4 drifts there, the Figma layer is the only
remaining variable.
