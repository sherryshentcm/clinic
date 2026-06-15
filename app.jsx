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
