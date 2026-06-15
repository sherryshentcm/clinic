/* ============================================================
   夏草堂 — Interior pages — bilingual
   ============================================================ */

function PageHead({ eyebrow, title, sub, vert }) {
  return (
    <div className="page-head">
      {vert && <div className="vert">{vert}</div>}
      <div className="wrap">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
}

function CallBlock({ line }) {
  const { t } = useT();
  return (
    <section className="section tight center" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div className="eyebrow ctr">{t("预约", "Book")}</div>
        <h2 className="h" style={{ marginBottom: 28 }}>{line || t("就诊请先来电预约", "Please call ahead to book")}</h2>
        <a href={`tel:${CLINIC.phoneRaw}`} className="btn btn-seal" style={{ fontSize: 18, padding: "16px 32px" }}>
          <PhoneIcon size={18} /> {CLINIC.phone}
        </a>
        <p style={{ color: "var(--ink-faint)", fontSize: 14, marginTop: 18 }}>{t("仅接受电话预约 · 周二至周六应诊", "By phone appointment · Open Tue–Sat")}</p>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function AboutPage({ go }) {
  useReveal();
  const { lang, t } = useT();
  const ways = [
    { gl: "家", zh: "世医之家", en: "A lineage of physicians", dzh: "出生于数代行医的世医之家，自幼浸润于传统医道，耳濡目染、根基深厚。", den: "Born into generations of physicians, immersed in the traditional way of medicine from a young age — deeply rooted." },
    { gl: "师", zh: "道医点拨", en: "Guided by a master", dzh: "青年时期幸得道医罗青子点拨，后经多年拜师学艺历练，深悟传统医道之精微。", den: "In his youth, guided by the Taoist healer Luo Qingzi, then many years of apprenticeship refined his understanding." },
    { gl: "证", zh: "临证如神", en: "Mastery in the clinic", dzh: "诊病不用病人先开口，望闻问切尽知病在何处、病根起源，每每药到病除。", den: "He diagnoses before a word is spoken — reading pulse and complexion to find the illness and its root." },
  ];
  return (
    <main>
      <PageHead eyebrow={t("关于夏医师", "About Xia, Yang")} title={t("世医之家，传统医道", "A Lineage of Healers")} vert="醫"
        sub={t("数代行医的家学渊源，道医点拨，多年拜师历练——夏医师的医道，是时间与传承的积累。",
               "Generations of family practice, a master's guidance, and years of apprenticeship — Practitioner Xia's medicine is built on time and lineage.")} />
      <section className="section">
        <div className="wrap">
          <div className="feature">
            <div className="fade">
              <Slot id="about-portrait" src="images/xia-about.jpg" ph={t("夏医师肖像", "Practitioner Xia portrait")} />
            </div>
            <div className="fade">
              <div className="no">夏 扬　·　Xia, Yang R.TCMP/AC</div>
              <h3>{t("望闻问切，尽知病源", "Diagnosis by Pulse & Observation")}</h3>
              <div className="en">{t("Diagnosis by pulse & observation", "望闻问切，尽知病源")}</div>
              <p>{lang === "en" ? CLINIC.bio.en : CLINIC.bio.zh}</p>
              <ul>
                {CLINIC.credentials.map((c, i) => <li key={i}>{lang === "en" ? c.en : c.zh}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight" style={{ background: "var(--paper-2)" }}>
        <div className="wrap">
          <div className="center" style={{ marginBottom: 40 }}>
            <div className="eyebrow ctr">{t("行医之道", "His Path")}</div>
            <h2 className="h">{t("家学 · 师承 · 临证", "Lineage · Teaching · Practice")}</h2>
          </div>
          <div className="svc-grid">
            {ways.map((w, i) => (
              <div className="svc fade" key={i} style={{ cursor: "default" }}>
                <div className="ic serif">{w.gl}</div>
                <h3>{lang === "en" ? w.en : w.zh}</h3>
                <div className="en">{lang === "en" ? w.zh : w.en}</div>
                <p>{lang === "en" ? w.den : w.dzh}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MethodsSection />
      <CallBlock line={t("想了解夏医师能否帮到您？", "Wondering if Practitioner Xia can help you?")} />
    </main>
  );
}

/* ---------------- SERVICES ---------------- */
function ServicesPage({ go }) {
  useReveal();
  const { lang, t } = useT();
  return (
    <main>
      <PageHead eyebrow={t("诊疗服务", "Services")} title={t("辨证施治的九项专长", "Nine Areas of Expertise")} vert="診"
        sub={t("脉诊查病、中药、针灸、食疗、点穴推拿——五法合治，因人因症，量身调理。",
               "Pulse diagnosis, herbs, acupuncture, dietary therapy and Tui Na — five methods, tailored to each person and condition.")} />
      <section className="section">
        <div className="wrap">
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <div className="svc fade" key={i} style={{ cursor: "default" }}>
                <div className="no">0{i + 1}</div>
                <div className="ic">{s.gl}</div>
                <h3>{lang === "en" ? s.en : s.zh}</h3>
                <div className="en">{lang === "en" ? s.zh : s.en}</div>
                <p>{lang === "en" ? s.den : s.dzh}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cond-band tight">
        <div className="wrap center">
          <div className="eyebrow on-dark ctr">{t("诊疗手法", "Our Methods")}</div>
          <h2 className="h" style={{ color: "oklch(0.98 0.012 90)", marginBottom: 44 }}>{t("五法合治", "Five Methods")}</h2>
          <div className="cond-groups" style={{ gridTemplateColumns: "repeat(5,1fr)", gap: 24 }}>
            {METHODS.map((m, i) => (
              <div key={i} className="fade">
                <div className="serif" style={{ fontSize: 52, color: "var(--gold)" }}>{m.gl}</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 18, marginTop: 8 }}>{lang === "en" ? m.en : m.zh}</div>
                <div style={{ fontFamily: "var(--lat)", fontStyle: "italic", fontSize: 13, opacity: .6, marginTop: 4 }}>{lang === "en" ? m.zh : m.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CallBlock line={t("不确定适合哪项调理？来电详询", "Not sure which care suits you? Call us")} />
    </main>
  );
}

/* ---------------- CONDITIONS ---------------- */
function ConditionsPage({ go }) {
  useReveal();
  const { lang, t } = useT();
  return (
    <main>
      <PageHead eyebrow={t("主治病症", "What We Treat")} title={t("疑难杂症，皆可辨证", "Even the Stubborn & Complex")} vert="治"
        sub={t("从妇科生育、内科慢病到痛症损伤与情志诸疾，夏医师擅长各种久治不愈的疑难杂症调理。",
               "From women's health and chronic illness to pain, injury and emotional conditions — Practitioner Xia specialises in ailments that have long resisted treatment.")} />
      <section className="section">
        <div className="wrap">
          <div className="cond-groups" style={{ color: "var(--ink)" }}>
            {COND_GROUPS.map((g, i) => (
              <div className="fade" key={i}>
                <h4 style={{ color: "var(--pine)", borderColor: "var(--line)" }}>
                  {lang === "en" ? g.en : g.zh}<span className="en" style={{ color: "var(--ink-faint)" }}>{lang === "en" ? g.zh : g.en}</span>
                </h4>
                <div className="cond-chips" style={{ marginTop: 16 }}>
                  {g.items.map((it, j) => <span className="chip-cond" key={j}>{lang === "en" ? it[1] : it[0]}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="rule" style={{ margin: "56px 0" }}><span className="dot"></span></div>
          <p style={{ textAlign: "center", color: "var(--ink-soft)", fontSize: 17, maxWidth: "56ch", margin: "0 auto", lineHeight: 1.9 }}>
            {t(<React.Fragment>亦擅长<b style={{ color: "var(--ink)" }}>各种运动损伤、车祸损伤</b>，以及<b style={{ color: "var(--ink)" }}>亚健康及优生优育调理</b>。以上仅为常见范围，您的具体情况，欢迎来电与夏医师详谈。</React.Fragment>,
               <React.Fragment>Also experienced with <b style={{ color: "var(--ink)" }}>sports and motor-vehicle injuries</b>, and <b style={{ color: "var(--ink)" }}>sub-health and pre/post-natal care</b>. This is only a common range — for your specific case, please call to speak with Practitioner Xia.</React.Fragment>)}
          </p>
        </div>
      </section>
      <CallBlock line={t("您的病症在列吗？来电详询", "Is your condition here? Call to ask")} />
    </main>
  );
}

/* ---------------- PRICING ---------------- */
function PricingPage({ go }) {
  useReveal();
  const { lang, t } = useT();
  return (
    <main>
      <PageHead eyebrow={t("收费", "Fees")} title={t("收费与就诊说明", "Fees & Visit Information")} vert="費"
        sub={t("费用依诊疗项目与个人方案而定。具体收费欢迎来电咨询，本诊所可提供注册中医针灸师收据。",
               "Fees depend on the treatment and your individual plan. Please call to enquire — official Registered Acupuncturist receipts are available.")} />
      <section className="section">
        <div className="wrap">
          <div className="price-grid">
            {PRICING.map((p, i) => (
              <div className={`price-card fade ${p.feat ? "feat" : ""}`} key={i}>
                {p.feat && <span className="tag">{t("最常见", "Most common")}</span>}
                <h3>{lang === "en" ? p.en : p.zh}</h3>
                <div className="en">{lang === "en" ? p.zh : p.en}</div>
                <div className="amt">{lang === "en" ? p.amt.en : p.amt.zh}</div>
                <div className="desc">{lang === "en" ? p.den : p.dzh}</div>
                <ul>{p.items.map((it, j) => <li key={j}>{lang === "en" ? it[1] : it[0]}</li>)}</ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: 14, padding: "26px 30px", display: "flex", gap: 18, alignItems: "flex-start" }} className="fade">
            <SealStamp solid>收据</SealStamp>
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 600 }}>{t("关于保险与收据", "Insurance & Receipts")}</div>
              <p style={{ color: "var(--ink-soft)", fontSize: 15, marginTop: 8, lineHeight: 1.8 }}>
                {t("夏医师为安省注册中医针灸师，可开具正式收据，多数延伸医疗保险（Extended Health Benefits）涵盖注册针灸师诊疗费用，可凭收据向保险公司报销。详情请来电咨询。",
                   "Xia, Yang is a Registered TCM Practitioner & Acupuncturist in Ontario and provides official receipts. Most Extended Health Benefit plans cover registered acupuncture, so you can claim reimbursement. Call for details.")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <CallBlock line={t("想了解具体费用？来电咨询", "Want exact fees? Call to enquire")} />
    </main>
  );
}

/* ---------------- BLOG ---------------- */
function BlogPage({ go }) {
  useReveal();
  const { lang, t } = useT();
  return (
    <main>
      <PageHead eyebrow={t("养生资讯", "Journal")} title={t("养生与调理心得", "Wellness & Notes")} vert="養"
        sub={t("顺应节气、调养身心。夏医师分享中医养生之道与日常调理心得。",
               "Living in step with the seasons. Practitioner Xia shares the way of TCM wellness and everyday care.")} />
      <section className="section">
        <div className="wrap">
          <ArticleGrid go={go} />
        </div>
      </section>
      <CallBlock />
    </main>
  );
}

/* ---------------- CONTACT ---------------- */
function ContactPage({ go }) {
  useReveal();
  const { lang, t } = useT();
  const [form, setForm] = useState({ name: "", phone: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState({});
  const todayIdx = (new Date().getDay() + 6) % 7;

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 1;
    if (!/\d{6,}/.test(form.phone.replace(/\D/g, ""))) er.phone = 1;
    setErr(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  return (
    <main>
      <PageHead eyebrow={t("联系与预约", "Contact & Booking")} title={t("就诊请先来电预约", "Please Call Ahead to Book")} vert="約"
        sub={t("本诊所采用电话预约制。来电后，夏医师会为您预留充足的诊疗时间。",
               "We see patients by phone appointment. Once you call, Practitioner Xia sets aside unhurried time for your visit.")} />
      <section className="section">
        <div className="wrap">
          <div className="locate" style={{ background: "var(--pine-deep)", borderRadius: 20, padding: "48px 44px", color: "oklch(0.95 0.012 95)" }}>
            <div className="grid">
              <div>
                <div className="bigcall" style={{ marginTop: 0 }}>
                  <SealStamp>致电<br/>预约</SealStamp>
                  <a href={`tel:${CLINIC.phoneRaw}`} className="num">{CLINIC.phone}</a>
                </div>
                <div className="info-row" style={{ marginTop: 24 }}>
                  <span className="k">{t("地址", "Address")}</span>
                  <span className="v">{CLINIC.address}</span>
                </div>
                <div className="info-row">
                  <span className="k">{t("预约", "Booking")}</span>
                  <span className="v">{t("仅接受电话预约", "By phone only")}</span>
                </div>
                <table className="hours-tbl" style={{ marginTop: 14 }}>
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
              <div className="map-slot">
                <Slot id="contact-map" ph={t("地图", "map of 1675 The Chase")} style={{ aspectRatio: "1 / 1.15" }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 56, maxWidth: 640, margin: "56px auto 0" }}>
            <div className="center" style={{ marginBottom: 28 }}>
              <div className="eyebrow ctr">{t("不方便来电？", "Prefer not to call?")}</div>
              <h2 className="h" style={{ fontSize: 30 }}>{t("留下信息，我们回电给您", "Leave your details — we'll call you")}</h2>
            </div>
            {sent ? (
              <div className="center" style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: 16, padding: "48px 32px" }}>
                <SealStamp solid>已收<br/>到</SealStamp>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, marginTop: 20 }}>{t(`谢谢，${form.name}！`, `Thank you, ${form.name}!`)}</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 10, lineHeight: 1.8 }}>
                  {t("我们会尽快回电。若情况紧急，请直接致电 ", "We'll call you back soon. If it's urgent, please call ")}
                  <a href={`tel:${CLINIC.phoneRaw}`} style={{ color: "var(--seal)", fontFamily: "var(--lat)" }}>{CLINIC.phone}</a>。
                </p>
              </div>
            ) : (
              <form className="form-grid" onSubmit={submit}>
                <div className="field row2">
                  <div>
                    <label>{t("称呼", "Your name")} *</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      style={err.name ? { borderColor: "var(--seal)" } : {}} placeholder={t("您的姓名", "Name")} />
                  </div>
                  <div>
                    <label>{t("联系电话", "Phone")} *</label>
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      style={err.phone ? { borderColor: "var(--seal)" } : {}} placeholder={t("方便回电的号码", "Best number to reach you")} />
                  </div>
                </div>
                <div className="field">
                  <label>{t("想咨询的情况（选填）", "What would you like to ask? (optional)")}</label>
                  <textarea rows="4" value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} placeholder={t("简述您的症状或想了解的调理项目", "Briefly describe your symptoms or the care you're interested in")}></textarea>
                </div>
                <button type="submit" className="btn btn-seal" style={{ justifyContent: "center" }}>{t("提交，请回电给我", "Submit — please call me back")}</button>
                <p style={{ textAlign: "center", color: "var(--ink-faint)", fontSize: 13 }}>{t("提交即表示同意我们以电话与您联系。", "By submitting you agree we may contact you by phone.")}</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { PageHead, AboutPage, ServicesPage, ConditionsPage, PricingPage, BlogPage, ContactPage });
