/* ============================================================
   夏草堂 — Home page (Direction A) — bilingual
   ============================================================ */

function Hero({ go }) {
  const { t } = useT();
  return (
    <section className="hero">
      <div className="bg">
        <Slot id="hero-room" ph={t("诊室 / 药柜照片", "clinic & herb cabinet")} radius={0} />
      </div>
      <div className="scrim"></div>
      <div className="vert">望闻问切　·　屡起沉疴</div>
      <div className="stamp"><SealStamp lg>夏氏<br/>世医</SealStamp></div>
      <div className="wrap">
        <div className="hero-eyebrow">{t("世医之家 · 传统医道 · 安省注册中医针灸", "A lineage of healers · Registered Acupuncture · Ontario")}</div>
        <h1>{t("世医传承", "A Tradition")}<br/>{t("辩证施治", "of Healing")}</h1>
        <p className="lede">{t("夏医师出生于世医之家，望闻问切尽知病在何处、病根起源。久治不愈的病症，或许将从此解除痛苦。",
          "Born into generations of physicians, Practitioner Xia reads the pulse and complexion to find where an illness lies and where it begins. Ailments that long resisted treatment may finally find relief.")}</p>
        <div className="actions">
          <a href={`tel:${CLINIC.phoneRaw}`} className="btn btn-seal"><PhoneIcon /> {t("致电预约", "Call to book")} {CLINIC.phone}</a>
          <a href="#" className="btn btn-light" onClick={(e) => { e.preventDefault(); go("about"); }}>{t("认识夏医师", "Meet Practitioner Xia")}</a>
          <span className="micro">{t("接受电话预约 · 周二至周六应诊", "By phone appointment · Open Tue–Sat")}</span>
        </div>
      </div>
    </section>
  );
}

function CredStrip() {
  const { lang } = useT();
  return (
    <div className="creds">
      <div className="wrap">
        {CLINIC.credentials.map((c, i) => (
          <span className="ci" key={i}><span className="gd"></span>{lang === "en" ? c.en : c.zh}</span>
        ))}
      </div>
    </div>
  );
}

function StorySection({ go }) {
  const { lang, t } = useT();
  return (
    <section className="section story paper-grain">
      <div className="wrap">
        <div className="grid">
          <div className="portrait fade">
            <Slot id="home-portrait" src="images/xia-yang.jpg" ph={t("夏医师肖像", "Practitioner Xia portrait")} />
            <div className="badge"><SealStamp solid>脉诊<br/>查病</SealStamp></div>
          </div>
          <div className="fade">
            <div className="eyebrow">{t("关于夏医师", "About Xia, Yang")}</div>
            <h2 className="h">{t(" 望闻问切，细察病机，寻本溯源。", "He reads the pulse — and knows, before you speak.")}</h2>
            <div className="qmark">“</div>
            <p className="bio">{lang === "en" ? CLINIC.bio.en : CLINIC.bio.zh}</p>
            <div className="sig">
              <span className="name">夏 扬</span>
              <span className="role">{t("安省注册中医针灸师 · 亚健康调理专家", "Registered TCM Acupuncturist · Wellness Specialist")}</span>
            </div>
            <div style={{ marginTop: 30 }}>
              <a href="#" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); go("about"); }}>{t("阅读完整经历", "Read his full story")} →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodsSection() {
  const { lang, t } = useT();
  return (
    <section className="section tight">
      <div className="wrap">
        <div className="center" style={{ marginBottom: 44 }}>
          <div className="eyebrow ctr">{t("诊疗手法", "Our Methods")}</div>
          <h2 className="h">{t("五法合治，标本兼顾", "Five methods, one whole treatment")}</h2>
        </div>
        <div className="methods fade">
          {METHODS.map((m, i) => (
            <div className="method" key={i}>
              <div className="gl serif">{m.gl}</div>
              <div className="nm">{lang === "en" ? m.en : m.zh}</div>
              <div className="en">{lang === "en" ? m.zh : m.en}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview({ go }) {
  const { lang, t } = useT();
  return (
    <section className="section" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
          <div>
            <div className="eyebrow">{t("诊疗服务", "Services")}</div>
            <h2 className="h">{t("辨证施治的九项专长", "Nine areas of expertise")}</h2>
          </div>
          <a href="#" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); go("services"); }}>{t("查看全部服务", "All services")} →</a>
        </div>
        <div className="svc-grid">
          {SERVICES.slice(0, 6).map((s, i) => (
            <div className="svc fade" key={i} onClick={() => go("services")}>
              <div className="no">0{i + 1}</div>
              <div className="ic">{s.gl}</div>
              <h3>{lang === "en" ? s.en : s.zh}</h3>
              <div className="en">{lang === "en" ? s.zh : s.en}</div>
              <p>{lang === "en" ? s.den : s.dzh}</p>
              <div className="arrow">{t("了解更多", "Learn more")} →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConditionsBand({ go }) {
  const { lang, t } = useT();
  return (
    <section className="section cond-band">
      <div className="wrap">
        <div className="center" style={{ marginBottom: 50 }}>
          <div className="eyebrow on-dark ctr">{t("主治病症", "What We Treat")}</div>
          <h2 className="h" style={{ color: "oklch(0.98 0.012 90)" }}>{t("从痛症到疑难杂症，皆可辨证调理", "From everyday pain to stubborn, complex conditions")}</h2>
        </div>
        <div className="cond-groups">
          {COND_GROUPS.map((g, i) => (
            <div className="cond-grp fade" key={i}>
              <h4>{lang === "en" ? g.en : g.zh}<span className="en">{lang === "en" ? g.zh : g.en}</span></h4>
              <ul>{g.items.map((it, j) => <li key={j}>{lang === "en" ? it[1] : it[0]}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="center" style={{ marginTop: 50 }}>
          <a href={`tel:${CLINIC.phoneRaw}`} className="btn btn-cream"><PhoneIcon /> {t("您的情况，欢迎来电详询", "Call us about your condition")}</a>
        </div>
      </div>
    </section>
  );
}

function PullQuote() {
  const { t } = useT();
  return (
    <section className="section pull paper-grain">
      <div className="wrap">
        <div className="rule" style={{ maxWidth: 120, margin: "0 auto 40px" }}><span className="dot"></span></div>
        <p className="q">{t(
          <React.Fragment>每每<span className="hl">药到病除</span>，屡起沉疴。<br/>您若有久治不愈的病症，<br/>或许将从此解除痛苦。</React.Fragment>,
          <React.Fragment>Again and again, the <span className="hl">remedy meets the illness</span>.<br/>If an ailment has long resisted treatment,<br/>here you may finally find relief.</React.Fragment>
        )}</p>
        <div className="rule" style={{ maxWidth: 120, margin: "40px auto 0" }}><span className="dot"></span></div>
      </div>
    </section>
  );
}

function LocateCTA() {
  const { lang, t } = useT();
  const todayIdx = (new Date().getDay() + 6) % 7;
  return (
    <section className="section locate" id="locate">
      <div className="wrap">
        <div className="grid">
          <div className="fade">
            <div className="eyebrow on-dark">{t("联系与预约", "Visit & Book")}</div>
            <h2 className="h">{t("就诊请先来电预约", "Please call ahead to book")}</h2>
            <p style={{ color: "oklch(0.93 0.012 95 / .85)", fontSize: 17, marginTop: 16, maxWidth: "40ch", lineHeight: 1.8 }}>
              {t("本诊所采用电话预约制，以便夏医师为每位患者预留充足的诊疗时间。",
                 "We see patients by phone appointment, so Practitioner Xia can set aside unhurried time for each visit.")}
            </p>
            <div className="bigcall">
              <SealStamp>致电<br/>预约</SealStamp>
              <a href={`tel:${CLINIC.phoneRaw}`} className="num">{CLINIC.phone}</a>
            </div>
            <div className="info-row" style={{ marginTop: 26 }}>
              <span className="k">{t("地址", "Address")}</span>
              <span className="v">{CLINIC.address}</span>
            </div>
          </div>
          <div className="fade">
            <div className="map-slot" style={{ marginBottom: 22 }}>
              <Slot id="home-map" ph={t("地图 / 门店外观", "map or storefront")} />
            </div>
            <table className="hours-tbl">
              <tbody>
                {CLINIC.hours.map((h, i) => (
                  <tr key={i} className={`${h.closed ? "closed" : ""} ${i === todayIdx ? "today" : ""}`}>
                    <td>{lang === "en" ? h.e : h.d}　<span style={{ fontFamily: "var(--lat)", fontStyle: "italic", opacity: .6 }}>{lang === "en" ? "" : h.e}</span></td>
                    <td>{typeof h.h === "string" ? h.h : (lang === "en" ? h.h.en : h.h.zh)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscipleSection({ go }) {
  const { lang, t } = useT();
  const bio = lang === "en" ? SHEN.bio.en : SHEN.bio.zh;
  return (
    <section className="section pract">
      <div className="wrap">
        <div className="grid">
          <div className="fade">
            <div className="eyebrow">{t("亲传弟子", "Lineage Disciple")}</div>
            <h2 className="h">{t(SHEN.phrase.zh, SHEN.phrase.en)}</h2>
            <div className="qmark">“</div>
            <div className="bio">{bio.map((p, i) => <p key={i}>{p}</p>)}</div>
            <div className="sig">
              <span className="name">{SHEN.name.zh}</span>
              <span className="role">{lang === "en" ? SHEN.role.en : SHEN.role.zh}</span>
            </div>
          </div>
          <div className="portrait fade">
            <Slot id="home-shen" src={SHEN.photo} ph={t("沈宏医师", "Practitioner Shen")} />
            <div className="badge"><SealStamp solid>亲传<br/>弟子</SealStamp></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ go }) {
  useReveal();
  return (
    <main>
      <Hero go={go} />
      <CredStrip />
      <StorySection go={go} />
      <DiscipleSection go={go} />
      <MethodsSection />
      <ServicesPreview go={go} />
      <ConditionsBand go={go} />
      <PullQuote />
      <LocateCTA />
    </main>
  );
}

Object.assign(window, { HomePage, CredStrip, LocateCTA, MethodsSection, DiscipleSection });
