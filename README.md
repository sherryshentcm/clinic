# 夏草堂 Xia's TCM — website

Bilingual (中 / EN) website for a Traditional Chinese Medicine & acupuncture
clinic in Mississauga, Ontario. Static site with a self-service article CMS.

This README is the **deployment handoff** — follow it to put the site online
and enable the article dashboard. For day-to-day article publishing (after
deploy), see **`Publishing-Guide.html`** (written for the clinic owner).

---

## What this is (tech overview)

- **Static, no build step.** Plain HTML + CSS, with React 18 + Babel
  transformed **in the browser** via `<script type="text/babel">`. There is
  nothing to compile — the files are deployed exactly as they sit in the repo.
- **Single page app** with hash routing (`#home`, `#about`, … `#article/<slug>`).
- **Bilingual** via a tiny `t(zh, en)` helper + a language toggle; choice is
  auto-detected from the browser and remembered in `localStorage`.
- **Images** use a custom `<image-slot>` element: editors drag a photo onto a
  slot and it persists to a sidecar file (`.image-slots.state.json`).
- **Articles** load at runtime from `content/articles.json`; the Decap CMS in
  `admin/` edits that same file.

> Note: in-browser Babel is fine for this traffic level but recompiles on every
> load. If you later want to optimise, precompile the `.jsx` to plain JS and
> drop the Babel `<script>` — no other changes needed.

## Project structure

```
index.html              Site entry — loads fonts, React/Babel, then the .jsx files
styles.css              Full design system + all component styles
data.jsx                Clinic facts (phone, address, hours), services, conditions,
                        practitioners (CLINIC, SHEN), language context
components.jsx          Header, Footer, nav, language toggle, image Slot, helpers
home.jsx                Home page sections (hero, story, disciple, methods, etc.)
pages.jsx               About, Services, Conditions, Pricing, Blog, Contact
articles.jsx            Journal: article loader, card grid, full article page
app.jsx                 Router + language/articles providers (mounts <App/>)
image-slot.js           <image-slot> web component (user-fillable images)

content/articles.json   ← ARTICLES LIVE HERE (the CMS reads/writes this)
admin/index.html        Decap CMS loader  (dashboard at /admin/)
admin/config.yml        Decap CMS field definitions
images/                 Site/article images
netlify.toml            Netlify config (publish = repo root, no build)

Publishing-Guide.html   Owner-facing guide for adding articles
Plan.html               Original design plan (reference only; not part of the site)
```

---

## Deploy + enable the CMS (one time, ~30 min, free)

1. **Push to GitHub.** Create a repo and upload this folder (default branch
   `main`; if you use a different branch, update `branch:` in
   `admin/config.yml`).

2. **Connect Netlify.** In Netlify → *Add new site → Import an existing
   project* → pick the repo. No build command, publish directory `.`
   (already set in `netlify.toml`). Deploy → you get a free
   `your-name.netlify.app` URL.

3. **Enable Identity.** Site configuration → *Identity* → **Enable Identity**.

4. **Enable Git Gateway.** Identity → *Services* → **Enable Git Gateway**.
   (This is what lets the dashboard commit article changes back to the repo.)

5. **Invite the editor.** Identity → *Registration* → set **Invite only** →
   **Invite** the clinic's email. Accept the email, set a password.

6. **Publish articles.** Go to `your-site/admin/`, log in, and use the
   **养生资讯 · Articles** collection. Changes commit to
   `content/articles.json` and redeploy automatically.

### Custom domain (optional)
Netlify → *Domain management* → add e.g. `xiastcm.com` and follow the DNS
instructions. HTTPS is automatic.

---

## Editing content directly (without the CMS)

- **Clinic info** (phone, address, hours, services, conditions, practitioners):
  edit `data.jsx`. Phone number lives once in `CLINIC.phone` / `CLINIC.phoneRaw`.
- **Articles:** edit `content/articles.json` (array under `articles`). Each
  entry is bilingual; `body.zh` / `body.en` use markdown-lite — `## ` for a
  subhead, `> ` for a note box, one line per paragraph.
- **Hours:** `CLINIC.hours` in `data.jsx` (`closed: true` marks a day off —
  currently Sunday & Monday).

## Local preview

Because the site fetches `content/articles.json`, open it through a local
server (not `file://`):

```
npx serve .       # or: python3 -m http.server
```

Then visit the printed `localhost` URL. (Opening `index.html` directly still
works — it just falls back to the empty article list instead of fetching.)

---

## Content responsibility

Article content for a regulated health practitioner must be reviewed and
approved by Dr. Xia before publishing — for clinical accuracy and Ontario
advertising/claims rules. AI may draft; the practitioner has the final word.
