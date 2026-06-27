/* ============================================================
   夏草堂 — Shared components (bilingual)
   ============================================================ */
const { useState, useEffect, useRef } = React;

const NAV = [
{ id: "home", zh: "首页", en: "Home" },
{ id: "about", zh: "关于夏医师", en: "About" },
{ id: "services", zh: "诊疗服务", en: "Services" },
{ id: "conditions", zh: "主治病症", en: "Conditions" },
{ id: "pricing", zh: "收费", en: "Fees" },
{ id: "blog", zh: "养生资讯", en: "Journal" },
{ id: "contact", zh: "联系与预约", en: "Contact" }];


function PhoneIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>);

}

function SealStamp({ children, solid, lg, className = "" }) {
  return (
    <div className={`seal-stamp ${solid ? "solid" : ""} ${lg ? "lg" : ""} ${className}`}>
      <span>{children}</span>
    </div>);

}

function Slot({ id, ph, shape = "rounded", radius = 14, style, src }) {
  return (
    <image-slot id={id} placeholder={ph} shape={shape} radius={String(radius)} src={src} style={style}></image-slot>);

}

function LangToggle({ compact }) {
  const { lang, setLang } = useT();
  return (
    <div className={`lang-toggle ${compact ? "compact" : ""}`} role="group" aria-label="language">
      <button className={lang === "zh" ? "on" : ""} onClick={() => setLang("zh")}>中</button>
      <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
    </div>);

}

function Header({ route, go }) {
  const { lang, t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {setOpen(false);}, [route]);

  const click = (id) => (e) => {e.preventDefault();go(id);};
  const label = (n) => lang === "en" ? n.en : n.zh;

  return (
    <header className={`site-head ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap bar">
        <a href="#" className="brand" onClick={click("home")}>
          <span className="seal">夏</span>
          <span className="nm">
            <span className="cn">夏草堂</span>
            <span className="en">Xia's TCM · GTA</span>
          </span>
        </a>
        <nav className="nav">
          {NAV.slice(1, 6).map((n) =>
          <a key={n.id} href="#" className={route === n.id ? "active" : ""} onClick={click(n.id)}>{label(n)}</a>
          )}
        </nav>
        <div className="head-cta">
          <LangToggle />
          <a href={`tel:${CLINIC.phoneRaw}`} className="phone-btn">
            <PhoneIcon /><span className="num">{CLINIC.phone}</span>
          </a>
          <button className="menu-toggle" onClick={() => setOpen((o) => !o)} aria-label="menu">≡</button>
        </div>
      </div>
      <div className={`m-drawer ${open ? "open" : ""}`}>
        {NAV.map((n) =>
        <a key={n.id} href="#" className={route === n.id ? "active" : ""} onClick={click(n.id)}>{label(n)}</a>
        )}
        <div style={{ paddingTop: 16 }}><LangToggle /></div>
      </div>
    </header>);

}

function Footer({ go }) {
  const { lang, t } = useT();
  const click = (id) => (e) => {e.preventDefault();go(id);window.scrollTo(0, 0);};
  const label = (id) => {const n = NAV.find((x) => x.id === id);return lang === "en" ? n.en : n.zh;};
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="top">
          <div style={{ maxWidth: 340 }}>
            <div className="brand" style={{ marginBottom: 16 }}>
              <span className="seal">夏</span>
              <span className="nm"><span className="cn">夏草堂</span><span className="en">Xia's TCM</span></span>
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.8 }}>
              {t("世医传承，望闻问切，药到病除。以传统医道，调理沉疴顽疾与亚健康。",
              "A lineage of healers. Diagnosis by pulse and observation; the remedy meets the illness. Traditional medicine for stubborn ailments and sub-health.")}
            </p>
          </div>
          <div className="cols">
            <div className="col">
              <h5>{t("诊疗", "Care")}</h5>
              <a href="#" onClick={click("services")}>{label("services")}</a>
              <a href="#" onClick={click("conditions")}>{label("conditions")}</a>
              <a href="#" onClick={click("pricing")}>{label("pricing")}</a>
              <a href="#" onClick={click("blog")}>{label("blog")}</a>
            </div>
            <div className="col">
              <h5>{t("诊所", "Clinic")}</h5>
              <a href="#" onClick={click("about")}>{label("about")}</a>
              <a href="#" onClick={click("contact")}>{label("contact")}</a>
              <a href={`tel:${CLINIC.phoneRaw}`}>{CLINIC.phone}</a>
              <a href="tel:9058481552">905-848-1552</a>
            </div>
            <div className="col">
              <h5>{t("到访", "Visit")}</h5>
              <a href="#" onClick={click("contact")} style={{ maxWidth: 210, whiteSpace: "normal", lineHeight: 1.6 }}>{CLINIC.address}</a>
              <a href="#" onClick={click("contact")}>{t("周二至周六应诊", "Open Tue – Sat")}</a>
            </div>
          </div>
        </div>
        <div className="btm">
          <span>© 2026 夏草堂 Xia's TCM. {t("版权所有。", "All rights reserved.")}</span>
          <span>{t("安省注册中医针灸师", "Registered Acupuncturist · Ontario")}</span>
        </div>
      </div>
    </footer>);

}

function FloatCall() {
  return (
    <a href={`tel:${CLINIC.phoneRaw}`} className="float-call" aria-label="call">
      <PhoneIcon size={24} />
    </a>);

}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade:not(.in)");
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {if (e.isIntersecting) {e.target.classList.add("in");io.unobserve(e.target);}});
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

Object.assign(window, { NAV, PhoneIcon, SealStamp, Slot, LangToggle, Header, Footer, FloatCall, useReveal });