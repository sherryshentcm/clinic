/* ============================================================
   夏草堂 — App / router + language provider
   ============================================================ */
const PAGES = {
  home: HomePage,
  about: AboutPage,
  services: ServicesPage,
  conditions: ConditionsPage,
  pricing: PricingPage,
  blog: BlogPage,
  contact: ContactPage,
};

const SEO_BASE_URL = "https://xiastcm.com/";
const SEO_DEFAULT = {
  title: "夏草堂 Xia's TCM · 世医传承 · 安省注册中医针灸",
  description: "夏草堂 Xia's TCM is a bilingual Traditional Chinese Medicine and acupuncture clinic in Mississauga, Ontario, offering acupuncture, herbal medicine, pulse diagnosis, pain care, fertility and wellness support.",
};
const SEO = {
  home: SEO_DEFAULT,
  about: {
    title: "关于夏扬医师 · 夏草堂 Xia's TCM",
    description: "Meet Xia Yang, Registered TCM Practitioner and Acupuncturist in Ontario, serving Mississauga with Traditional Chinese Medicine, pulse diagnosis, acupuncture and herbal care.",
  },
  services: {
    title: "诊疗服务 · 针灸 中药 脉诊 · 夏草堂 Xia's TCM",
    description: "Explore Xia's TCM services: acupuncture, herbal medicine, pulse diagnosis, Tui Na, dietary therapy, fertility support, pain care and wellness treatment.",
  },
  conditions: {
    title: "主治病症 · 夏草堂 Xia's TCM Mississauga",
    description: "Traditional Chinese Medicine care for pain, women's health, fertility, chronic conditions, respiratory concerns, mood, sleep and sub-health in Mississauga.",
  },
  pricing: {
    title: "收费与就诊说明 · 夏草堂 Xia's TCM",
    description: "Visit and fee information for Xia's TCM, a registered Traditional Chinese Medicine and acupuncture clinic in Mississauga, Ontario.",
  },
  blog: {
    title: "养生资讯 · 夏草堂 Xia's TCM",
    description: "Traditional Chinese Medicine wellness notes, seasonal health guidance and clinic care insights from Xia's TCM.",
  },
  contact: {
    title: "联系预约 · 夏草堂 Xia's TCM Mississauga",
    description: "Call Xia's TCM to book an appointment. Located at 1675 The Chase #24b, Mississauga, Ontario. Open Tuesday to Saturday.",
  },
};

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

function setSeo(route, lang, articles) {
  const isArticle = route.startsWith("article/");
  let meta = SEO[route] || SEO_DEFAULT;
  if (isArticle) {
    const slug = route.slice("article/".length);
    const article = articles.find((a) => a.slug === slug);
    if (article) {
      meta = {
        title: `${pick(article.title, lang)} · ${lang === "en" ? "Xia's TCM Journal" : "夏草堂养生资讯"}`,
        description: pick(article.ex, lang) || SEO.blog.description,
      };
    } else {
      meta = SEO.blog;
    }
  }
  document.title = meta.title;
  upsertMeta('meta[name="description"]', { name: "description", content: meta.description });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: meta.title });
  upsertMeta('meta[property="og:description"]', { property: "og:description", content: meta.description });
  upsertMeta('meta[property="og:url"]', {
    property: "og:url",
    content: isArticle ? `${SEO_BASE_URL}articles/${route.slice("article/".length)}/` : SEO_BASE_URL + (route === "home" ? "" : "#" + route),
  });
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.title });
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: meta.description });
}

function App() {
  const [route, setRoute] = useState(() => (location.hash || "#home").slice(1));
  const [articles, setArticles] = useState(ARTICLE_FALLBACK);

  // Pull articles from content/articles.json (the file a CMS edits after
  // launch); falls back to the bundled defaults offline.
  useEffect(() => { loadArticles().then(setArticles); }, []);
  const [lang, setLangState] = useState(() => {
    // 1. respect a previously chosen language on this device
    const saved = localStorage.getItem("xtc-lang");
    if (saved === "zh" || saved === "en") return saved;
    // 2. otherwise auto-detect from the browser/device language
    const langs = navigator.languages || [navigator.language || ""];
    const prefersChinese = langs.some(l => (l || "").toLowerCase().startsWith("zh"));
    return prefersChinese ? "zh" : "en";
  });

  const setLang = (l) => { setLangState(l); localStorage.setItem("xtc-lang", l); };
  const t = (zh, en) => (lang === "en" ? (en !== undefined ? en : zh) : zh);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.body.classList.toggle("lang-en", lang === "en");
  }, [lang]);

  useEffect(() => {
    setSeo(route, lang, articles);
  }, [route, lang, articles]);

  const go = (id) => {
    setRoute(id);
    history.replaceState(null, "", "#" + id);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    const onHash = () => setRoute((location.hash || "#home").slice(1));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Article routes look like "article/<slug>"; everything else is a page.
  const isArticle = route.startsWith("article/");
  const navRoute = isArticle ? "blog" : route;
  const Page = PAGES[route] || HomePage;
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <ArticlesContext.Provider value={articles}>
        <Header route={navRoute} go={go} />
        <div key={route + lang}>
          {isArticle
            ? <ArticlePage go={go} slug={route.slice("article/".length)} />
            : <Page go={go} />}
        </div>
        <Footer go={go} />
        <FloatCall />
      </ArticlesContext.Provider>
    </LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
