/* ============================================================
   夏草堂 — Articles (养生资讯)
   CMS-ready content layer.

   Articles load at runtime from content/articles.json (the file a CMS
   like Decap edits after launch). If that fetch fails — e.g. opening the
   bundled HTML offline — the site falls back to ARTICLE_FALLBACK below.

   The fallback is intentionally EMPTY: real articles are added through the
   dashboard (see Publishing-Guide.html). When there are none, the Journal
   shows a graceful "coming soon" state.

   Each article shape (also the CMS field shape):
     slug   string                unique id, used in the URL (#article/<slug>)
     cat    {zh,en}               category label
     title  {zh,en}
     date   {zh,en}
     author {zh,en}
     read   {zh,en}               estimated read time
     ex     {zh,en}               one-line excerpt for cards
     body   {zh,en}               markdown-lite: "## " = subhead,
                                  "> " = note box, one line = one paragraph
   ============================================================ */

const ARTICLE_FALLBACK = []; // articles are added via the CMS (content/articles.json)

// ── runtime loader ────────────────────────────────────────────────────────
async function loadArticles() {
  try {
    const r = await fetch("content/articles.json", { cache: "no-store" });
    if (r.ok) {
      const j = await r.json();
      const arr = Array.isArray(j) ? j : (j && j.articles);
      if (Array.isArray(arr)) return arr;
    }
  } catch (e) { /* offline / file:// — fall back */ }
  return ARTICLE_FALLBACK;
}

const ArticlesContext = React.createContext(ARTICLE_FALLBACK);
function useArticles() { return React.useContext(ArticlesContext); }
const pick = (v, lang) => (v && typeof v === "object" ? (lang === "en" ? v.en : v.zh) : v);

// ── markdown-lite renderer ──────────────────────────────────────────────────
function ArticleBody({ text }) {
  // Parse line-by-line: "## " = subhead, "> " = note, blank = skip,
  // anything else = paragraph (one line per paragraph).
  const lines = String(text || "").split(/\n/).map(l => l.trim()).filter(Boolean);
  return (
    <div className="article-body">
      {lines.map((l, i) => {
        if (l.startsWith("## ")) return <h2 key={i} className="ab-h">{l.slice(3)}</h2>;
        if (l.startsWith("> ")) return <blockquote key={i} className="ab-note">{l.slice(2)}</blockquote>;
        return <p key={i}>{l}</p>;
      })}
    </div>
  );
}

// ── card grid (used on the Journal page) ─────────────────────────────────────
function ArticleGrid({ go }) {
  const { lang, t } = useT();
  const articles = useArticles();

  if (!articles.length) {
    return (
      <div className="blog-empty">
        <div className="be-seal">養</div>
        <h3>{t("养生资讯即将上线", "Articles coming soon")}</h3>
        <p>{t("夏草堂将陆续分享中医养生与调理心得。如有健康方面的疑问，欢迎随时来电咨询。",
              "We'll be sharing TCM wellness notes and care insights here soon. For any health question in the meantime, you're always welcome to call.")}</p>
        <a href={`tel:${CLINIC.phoneRaw}`} className="btn btn-seal"><PhoneIcon /> {CLINIC.phone}</a>
      </div>
    );
  }

  return (
    <div className="blog-grid">
      {articles.map((p) => (
        <div className="post fade" key={p.slug} onClick={() => go("article/" + p.slug)}>
          <Slot id={`cover-${p.slug}`} ph={t("配图", "article image")} />
          <div className="cat">{pick(p.cat, lang)}</div>
          <h3>{pick(p.title, lang)}</h3>
          <div className="meta">{pick(p.date, lang)}　·　{pick(p.author, lang)}</div>
          <div className="ex">{pick(p.ex, lang)}</div>
          <div className="post-more">{t("阅读全文", "Read article")} →</div>
        </div>
      ))}
    </div>
  );
}

// ── full article page ────────────────────────────────────────────────────────
function ArticlePage({ go, slug }) {
  useReveal();
  const { lang, t } = useT();
  const articles = useArticles();
  const idx = articles.findIndex(a => a.slug === slug);
  const a = articles[idx];

  if (!a) {
    return (
      <main>
        <div className="page-head"><div className="wrap">
          <div className="eyebrow">{t("养生资讯", "Journal")}</div>
          <h1>{t("文章未找到", "Article not found")}</h1>
        </div></div>
        <section className="section center"><div className="wrap">
          <a href="#" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); go("blog"); }}>← {t("返回养生资讯", "Back to Journal")}</a>
        </div></section>
      </main>
    );
  }

  const next = articles[(idx + 1) % articles.length];
  return (
    <main>
      <article>
        <div className="article-head">
          <div className="wrap">
            <a href="#" className="article-back" onClick={(e) => { e.preventDefault(); go("blog"); }}>← {t("养生资讯", "Journal")}</a>
            <div className="article-cat">{pick(a.cat, lang)}</div>
            <h1 className="article-title">{pick(a.title, lang)}</h1>
            <div className="article-meta">
              <span>{pick(a.author, lang)}</span><span className="sep">·</span>
              <span>{pick(a.date, lang)}</span><span className="sep">·</span>
              <span>{pick(a.read, lang)}</span>
            </div>
          </div>
        </div>
        <div className="wrap article-wrap">
          <div className="article-cover fade">
            <Slot id={`cover-${a.slug}`} ph={t("文章配图", "article image")} radius={16} />
          </div>
          <div className="fade">
            <ArticleBody text={pick(a.body, lang)} />
          </div>
          <div className="article-foot fade">
            <div className="rule"><span className="dot"></span></div>
            <div className="article-cta">
              <div>
                <div className="serif" style={{ fontSize: 22, fontWeight: 600 }}>{t("有相关的困扰？", "Have a related concern?")}</div>
                <p style={{ color: "var(--ink-soft)", fontSize: 15, marginTop: 6 }}>{t("欢迎来电预约，由医师为您辨证调理。", "Call to book and let the practitioner assess your pattern.")}</p>
              </div>
              <a href={`tel:${CLINIC.phoneRaw}`} className="btn btn-seal"><PhoneIcon /> {CLINIC.phone}</a>
            </div>
          </div>
          {next && next.slug !== a.slug && (
            <div className="article-next fade" onClick={() => go("article/" + next.slug)}>
              <span className="lab">{t("下一篇", "Next article")}</span>
              <span className="ttl">{pick(next.title, lang)} →</span>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}

Object.assign(window, { ARTICLE_FALLBACK, loadArticles, ArticlesContext, useArticles, ArticleGrid, ArticlePage, ArticleBody });
