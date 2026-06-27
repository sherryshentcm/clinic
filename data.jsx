/* ============================================================
   夏草堂 — Content data (bilingual zh / en) + language context
   Chinese clinic facts from the client; English translations added.
   ============================================================ */

// ---- language context (created here, used by all babel files via window) ----
const LangContext = React.createContext({ lang: "zh", setLang: () => {}, t: (zh) => zh });
function useT() { return React.useContext(LangContext); }

const CLINIC = {
  cn: "夏草堂",
  en: "Xia's TCM",
  doctor: { zh: "夏 扬", en: "Xia, Yang R.TCMP/AC" },
  phone: "416-825-0982",
  phoneRaw: "4168250982",
  address: "1675 The Chase #24b, Mississauga, ON L5M 5Y7",
  bio: {
    zh: "夏医师出生于世医之家，青年时期幸得道医罗青子点拨，后经多年拜师学艺历练，深悟传统医道。临床诊病，未待病人详述，望闻问切尽知病在何处，病根起源，每每药到病除，屡起沉疴。您若有久治不愈的病症，或许将有幸从此解除痛苦。",
    en: "Practitioner Xia was born into a family of physicians spanning generations. In his youth he was guided by the Taoist healer Luo Qingzi, and through many years of apprenticeship came to deeply understand the traditional way of medicine. In the clinic he diagnoses before the patient speaks a word — reading the pulse and complexion to know where the illness lies and where its root begins. Time and again the remedy meets the illness, and long-standing afflictions are lifted. If an ailment has long resisted treatment, here you may finally find relief.",
  },
  credentials: [
    { zh: "安省注册中医针灸师", en: "Registered TCM Acupuncturist, Ontario" },
    { zh: "亚健康调理专家", en: "Sub-health & Wellness Specialist" },
    { zh: "全加中医药针灸学会会员", en: "Member · Chinese Medicine & Acupuncture Assoc. of Canada" },
    { zh: "中国民间中医医药研究开发协会会员", en: "Member · China Folk TCM Research & Development Assoc." },
  ],
  hours: [
    { d: "周一", e: "Mon", h: { zh: "休息", en: "Closed" }, closed: true },
    { d: "周二", e: "Tue", h: "11:00 — 19:00" },
    { d: "周三", e: "Wed", h: "11:00 — 19:00" },
    { d: "周四", e: "Thu", h: "11:00 — 19:00" },
    { d: "周五", e: "Fri", h: "11:00 — 19:00" },
    { d: "周六", e: "Sat", h: "11:00 — 17:00" },
    { d: "周日", e: "Sun", h: { zh: "休息", en: "Closed" }, closed: true },
  ],
};

const METHODS = [
  { gl: "脉", zh: "脉诊查病", en: "Pulse Diagnosis" },
  { gl: "药", zh: "中药调理", en: "Herbal Medicine" },
  { gl: "针", zh: "针灸", en: "Acupuncture" },
  { gl: "食", zh: "食疗", en: "Dietary Therapy" },
  { gl: "推", zh: "点穴推拿", en: "Tui Na · Acupressure" },
];

const SERVICES = [
  { gl: "针", zh: "针灸", en: "Acupuncture",
    dzh: "循经取穴，疏通经络、调和气血，广泛用于痛症、内科及神志诸疾。",
    den: "Points selected along the meridians to free the channels and harmonise qi and blood — for pain, internal and emotional conditions." },
  { gl: "药", zh: "中药调理", en: "Herbal Medicine",
    dzh: "辨证施治，量身配方，由内而外固本培元，标本兼治。",
    den: "Treatment by pattern differentiation, with formulas tailored to you — restoring the body from within, treating symptom and cause." },
  { gl: "孕", zh: "不孕不育 · 妇科", en: "Fertility & Women's Health",
    dzh: "调经助孕、更年期及各类妇科病症的中医调理。",
    den: "TCM care for menstrual regulation, conception support, menopause and a range of gynaecological conditions." },
  { gl: "痛", zh: "疼痛调理", en: "Pain Management",
    dzh: "肩颈腰腿、椎间盘突出、运动与车祸损伤的针药并治。",
    den: "Combined acupuncture and herbs for neck, shoulder, back and leg pain, disc problems, sports and accident injuries." },
  { gl: "育", zh: "优生优育", en: "Pre & Post-Natal Care",
    dzh: "孕前体质调养与产后调理，为新生命打下健康根基。",
    den: "Pre-conception conditioning and post-natal recovery — a healthy foundation for new life." },
  { gl: "儿", zh: "儿科", en: "Pediatrics",
    dzh: "小儿外感、脾胃、过敏等常见病的温和中医调治。",
    den: "Gentle TCM care for children's common complaints — colds, digestion, allergies and more." },
  { gl: "学", zh: "学习障碍", en: "Learning Difficulties",
    dzh: "从脏腑与神志入手，辅助改善专注力与学习状态。",
    den: "Working through the organs and spirit to help improve focus and learning." },
  { gl: "郁", zh: "抑郁 · 情志", en: "Depression & Mood",
    dzh: "疏肝解郁、安神定志，调理焦虑、抑郁与顽固性失眠。",
    den: "Soothing the liver and calming the spirit to ease anxiety, depression and stubborn insomnia." },
  { gl: "美", zh: "中医美容", en: "Cosmetic TCM",
    dzh: "以针药调理气血，由内养颜，改善气色与肤质。",
    den: "Nourishing beauty from within by regulating qi and blood — improving complexion and skin." },
];

const COND_GROUPS = [
  { zh: "妇科与生育", en: "Women & Fertility",
    items: [["不孕不育", "Infertility"], ["妇科病", "Gynaecological conditions"], ["更年期综合症", "Menopause syndrome"], ["优生优育调理", "Pre / post-natal care"]] },
  { zh: "内科与慢病", en: "Internal & Chronic",
    items: [["心脑血管病", "Cardiovascular disease"], ["胃肠病", "Digestive disorders"], ["糖尿病", "Diabetes"], ["肾病综合症", "Nephrotic syndrome"], ["风湿病", "Rheumatism"], ["便秘", "Constipation"]] },
  { zh: "呼吸与五官", en: "Respiratory & ENT",
    items: [["鼻敏感", "Nasal allergies"], ["咳嗽", "Cough"], ["肺炎", "Pneumonia"], ["哮喘", "Asthma"], ["新冠后遗症", "Long COVID"], ["喉痛", "Sore throat"], ["五官疾病", "ENT conditions"]] },
  { zh: "痛症与损伤", en: "Pain & Injury",
    items: [["头痛", "Headache"], ["肩颈腰腿痛", "Neck, shoulder & back pain"], ["肌痛综合症", "Myalgia syndrome"], ["椎间盘突出症", "Herniated disc"], ["偏瘫", "Hemiplegia"], ["运动损伤", "Sports injuries"], ["车祸损伤", "Accident injuries"]] },
  { zh: "神志与情志", en: "Mind & Emotion",
    items: [["顽固性失眠", "Chronic insomnia"], ["焦虑症", "Anxiety"], ["抑郁症", "Depression"], ["厌食症", "Anorexia"]] },
  { zh: "其他疑难杂症", en: "Other Conditions",
    items: [["前列腺病", "Prostate conditions"], ["皮肤病", "Skin conditions"], ["寒热症", "Cold / heat disorders"], ["肿瘤癌症", "Tumours & cancer"], ["学习障碍", "Learning difficulties"], ["亚健康调理", "Sub-health care"]] },
];

const PRICING = [
  { zh: "初诊", en: "Initial Consultation",
    amt: { zh: "来电咨询", en: "Call to enquire" },
    dzh: "含脉诊辨证、体质评估与个人化调理方案。",
    den: "Includes pulse diagnosis, constitutional assessment and a personalised treatment plan.",
    items: [["详细问诊与脉诊", "Detailed intake & pulse reading"], ["体质与病因辨证", "Pattern & cause differentiation"], ["制定调理方案", "Personalised treatment plan"]] },
  { zh: "针灸 / 复诊", en: "Acupuncture / Follow-up", feat: true,
    amt: { zh: "来电咨询", en: "Call to enquire" },
    dzh: "依疗程方案进行针灸及相关调理。",
    den: "Acupuncture and related care following your treatment plan.",
    items: [["针灸施治", "Acupuncture treatment"], ["点穴推拿（按需）", "Tui Na / acupressure (as needed)"], ["疗程跟进调整", "Plan review & adjustment"]] },
  { zh: "中药调理", en: "Herbal Medicine",
    amt: { zh: "来电咨询", en: "Call to enquire" },
    dzh: "按方配药，费用依药材而定。",
    den: "Herbs dispensed per formula; cost depends on the herbs used.",
    items: [["个人化配方", "Personalised formula"], ["代煎 / 颗粒可选", "Decoction / granules available"], ["用药指导", "Guidance on use"]] },
];

const POSTS = [
  { cat: { zh: "节气养生", en: "Seasonal Wellness" },
    title: { zh: "夏季养心：暑天里的起居与饮食", en: "Nourishing the Heart in Summer" },
    date: { zh: "2026 · 立夏", en: "2026 · Early Summer" },
    ex: { zh: "夏属火、通于心，本文谈谈暑热时节如何护养心神、清养脾胃。",
          en: "Summer belongs to fire and connects to the heart — how to protect the spirit and nourish digestion through the hot season." } },
  { cat: { zh: "调理心得", en: "Clinical Notes" },
    title: { zh: "顽固性失眠，中医如何由内调起", en: "Stubborn Insomnia, Treated from Within" },
    date: { zh: "2026 · 春", en: "2026 · Spring" },
    ex: { zh: "失眠常非单一病因。从肝、心、脾着手，辨证而治方能安眠。",
          en: "Insomnia rarely has a single cause. Working through the liver, heart and spleen, pattern-based treatment restores rest." } },
  { cat: { zh: "妇科 · 生育", en: "Women & Fertility" },
    title: { zh: "备孕调养：孕前三个月的身体准备", en: "Preparing to Conceive: the three months before" },
    date: { zh: "2025 · 冬", en: "2025 · Winter" },
    ex: { zh: "优生优育，始于孕前。谈谈如何以中医调养为新生命打基础。",
          en: "Good parenting begins before conception. How TCM conditioning lays a healthy foundation for new life." } },
];

// Second practitioner — 沈宏, disciple of Practitioner Xia
const SHEN = {
  name: { zh: "沈 宏", en: "Shen, Hong R.TCMP" },
  role: { zh: "安省注册中医针灸师· 夏扬医师亲传弟子",
          en: "Registered TCM Practitioner (R.TCMP) · Disciple of Practitioner Xia" },
  phrase: { zh: "辨证求因，整体调理", en: "Seek the cause; treat the whole." },
  photo: "images/shen-hong.jpg",
  bio: {
    zh: [
      "沈宏，夏扬医师亲传弟子，安省注册中医针灸师。于夏草堂跟随夏扬医师沉浸式学习四年，系统研习中医经典理论、辨证思维、脉诊技巧及临床诊疗经验，并长期参与临床实践，深得其学术思想与诊疗精髓。学成后持续于夏草堂坐诊，在长期临床工作中不断积累经验，精进医术。",
      "秉承中医「辨证求因、整体调理」的理念，注重四诊合参，强调从病机入手，因人制宜制定个体化诊疗与调理方案。擅长运用针灸、中药及传统中医方法调理体质，帮助患者改善健康状态，促进机体平衡与康复。",
    ],
    en: [
      "Shen Hong is a personally-trained disciple of Practitioner Xia Yang and a Registered TCM Practitioner in Ontario (R.TCMP). Over four years of immersive study at Xia's TCM, she systematically studied the classical theory of Chinese medicine, pattern-based diagnostic thinking, pulse-diagnosis technique and clinical practice under Practitioner Xia — taking deeply to heart both his scholarly thought and the essence of his clinical method. Since completing her training she has continued to practise at the clinic, steadily deepening her experience and refining her skill through years of clinical work.",
      "Guided by the TCM principle of \u201cseek the cause through pattern differentiation, and treat the body as a whole,\u201d she draws on all four diagnostic methods, works from the underlying disease mechanism, and tailors an individual treatment and care plan to each person. She specialises in using acupuncture, Chinese herbs and traditional methods to rebalance the constitution — helping patients improve their health and supporting the body's balance and recovery.",
    ],
  },
};

Object.assign(window, { LangContext, useT, CLINIC, METHODS, SERVICES, COND_GROUPS, PRICING, POSTS, SHEN });
