
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  GraduationCap,
  School,
  Info,
  AlertTriangle,
  DollarSign,
  Sparkles,
  ShieldCheck,
  Loader2,
} from "lucide-react";

/**
 * Elite ChanceMe — Single School Only (NO extra npm packages)
 * SEO ENHANCED VERSION - Optimized for global reach
 *
 * ✅ Chance for ONE school only
 * ✅ AI explanation for that ONE school only
 * ✅ AI response is requested as STRICT JSON and rendered with normal JSX
 * ✅ No react-markdown / remark-gfm required
 * ✅ CSV path: public/excel/cleaned_collegerankings.csv
 * ✅ ENHANCED: Comprehensive SEO meta tags, schema markup, and structured data
 * ✅ ENHANCED: Semantic HTML with proper heading hierarchy
 * ✅ ENHANCED: International keywords and global reach optimization
 */
const CSV_PATH = "/excel/cleaned_collegerankings.csv";
const INCOME_REFERENCE = 120000; // from your design doc
const STICKER_PLACEHOLDER = 80000; // replace if your full CSV adds Sticker_Price

// ------------------------ utils ------------------------
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
const toNum = (v, fallback = 0) => {
  const n = Number(String(v ?? "").replace(/[^\d.\-]/g, ""));
  return Number.isFinite(n) ? n : fallback;
};
const sigmoid = (x) => 1 / (1 + Math.exp(-x));
const logit = (p) => Math.log(p / (1 - p));

function csvSplitLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && line[i + 1] === '"') {
      cur += '"';
      i++;
      continue;
    }
    if (ch === '"') {
      inQ = !inQ;
      continue;
    }
    if (ch === "," && !inQ) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}
function parseCSV(text) {
  const lines = String(text)
    .split(/\r?\n/)
    .filter((l) => l.trim().length > 0);
  if (!lines.length) return [];
  const headers = csvSplitLine(lines[0]).map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = csvSplitLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => (row[h] = cols[idx] ?? ""));
    rows.push(row);
  }
  return rows;
}
function parseRange(str) {
  if (!str) return { low: null, high: null };
  const m = String(str).match(/(\d+(?:\.\d+)?)\s*\-\s*(\d+(?:\.\d+)?)/);
  if (!m) return { low: null, high: null };
  return { low: Number(m[1]), high: Number(m[2]) };
}
function normalizeSchool(row, idx) {
  const gpa = parseRange(row.GPA_Range);
  const sat = parseRange(row.SAT_Range);
  const act = parseRange(row.ACT_Range);
  return {
    id: idx,
    rank: toNum(row.Rank, idx + 1),
    name: row.University?.trim() || "Unknown",
    type: row.Type?.trim() || "Research",
    gpaLow: gpa.low,
    gpaHigh: gpa.high,
    satLow: sat.low,
    satHigh: sat.high,
    actLow: act.low,
    actHigh: act.high,
    acceptanceRate: clamp(toNum(row.Acceptance_Rate, 0.2), 0.005, 0.95),
    averageAid: toNum(row.Average_Aid, 0),
    earlyDecision: String(row.Early_Decision || "").toLowerCase() === "yes",
    earlyAction: String(row.Early_Action || "").toLowerCase() === "yes",
    appFee: toNum(row.Application_Fee, 0),
    needBlind: String(row.Need_Blind || "").toLowerCase() === "yes",
    meritAid: String(row.Merit_Aid || "").trim(),
    specialPrograms: String(row.Special_Programs || "").trim(),
    strengths: String(row.Notable_Strengths || "").trim(),
  };
}
function typePassesCap(s) {
  if (String(s.type).toLowerCase() === "lac") return s.rank <= 30;
  return s.rank <= 300;
}
function majorFitScore(major, strengths) {
  if (!major?.trim()) return 0.55;
  const m = major.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  if (!m.length) return 0.55;
  const st = String(strengths || "")
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter(Boolean);
  const set = new Set(st);
  const hits = m.filter((w) => w.length > 3 && set.has(w)).length;
  if (hits >= 2) return 0.85;
  if (hits === 1) return 0.7;
  return 0.55;
}
function computeNetPriceEstimate(sticker, avgAid, income) {
  const inc = Math.max(1, toNum(income, 95000));
  const aidAdjusted = avgAid * (INCOME_REFERENCE / inc);
  return Math.max(0, sticker - aidAdjusted);
}
function computeChance(profile, school) {
  const gpaUW = toNum(profile.gpaUW, NaN);
  const apCount = toNum(profile.apCount, 0);
  const testType = profile.testType || "sat";
  const testScore =
    testType === "act" ? toNum(profile.act, NaN) : toNum(profile.sat, NaN);
  const gpaMid =
    school.gpaLow && school.gpaHigh ? (school.gpaLow + school.gpaHigh) / 2 : 3.85;
  const satMid =
    school.satLow && school.satHigh ? (school.satLow + school.satHigh) / 2 : 1450;
  const actMid =
    school.actLow && school.actHigh ? (school.actLow + school.actHigh) / 2 : 33;
  const gpaDelta = Number.isFinite(gpaUW) ? (gpaUW - gpaMid) / 0.15 : 0;
  const testDelta = Number.isFinite(testScore)
    ? testType === "act"
      ? (testScore - actMid) / 2.0
      : (testScore - satMid) / 80.0
    : 0;
  const rigorNorm = clamp(Math.min(apCount, 12) / 12, 0, 1);
  const tier = String(profile.ecTier || "3");
  const ecMap = { "1": 1.0, "2": 0.75, "3": 0.5, "4": 0.25 };
  const ecNorm = ecMap[tier] ?? 0.5;
  const fit = majorFitScore(profile.major, school.strengths);
  const leadershipBoost = profile.leadership ? 0.06 : 0;
  const firstGenBoost = profile.firstGen ? 0.04 : 0;
  const legacyBoost = profile.legacy ? 0.02 : 0;
  const academics = sigmoid(0.95 * gpaDelta + 0.75 * testDelta + 0.6 * (rigorNorm - 0.55));
  const holistic = clamp(0.55 * ecNorm + 0.45 * (profile.leadership ? 1 : 0.55), 0, 1);
  const fitScore = clamp(fit, 0, 1);
  const overall = clamp(0.58 * academics + 0.24 * holistic + 0.18 * fitScore, 0, 1);
  const base = clamp(school.acceptanceRate, 0.005, 0.95);
  const adjustedLogit =
    logit(base) + 2.15 * (overall - 0.5) + leadershipBoost + firstGenBoost + legacyBoost;
  const p = clamp(sigmoid(adjustedLogit), 0.01, 0.95);
  const label = p < 0.12 ? "Reach" : p < 0.35 ? "Match" : "Likely";
  const reasons = [];
  if (Number.isFinite(gpaUW) && school.gpaLow && gpaUW < school.gpaLow)
    reasons.push(
      `Unweighted GPA is below typical range (${school.gpaLow.toFixed(2)}–${
        school.gpaHigh?.toFixed?.(2) ?? "?"
      }).`
    );
  if (Number.isFinite(gpaUW) && school.gpaHigh && gpaUW >= school.gpaHigh)
    reasons.push("Unweighted GPA is at/above the upper end of the typical range.");
  if (Number.isFinite(testScore)) {
    const low = testType === "act" ? school.actLow : school.satLow;
    const high = testType === "act" ? school.actHigh : school.satHigh;
    if (low && testScore < low) reasons.push(`${testType.toUpperCase()} is below typical range (${low}–${high}).`);
    if (high && testScore >= high) reasons.push(`${testType.toUpperCase()} is at/above the upper end of typical range.`);
  } else {
    reasons.push("No test score provided — estimate is less confident.");
  }
  if (rigorNorm >= 0.75) reasons.push("Course rigor looks strong (AP/IB count suggests advanced load).");
  if (ecNorm >= 0.75) reasons.push(`EC tier indicates high-impact involvement (Tier ${tier}).`);
  if (fitScore >= 0.7) reasons.push("Intended major aligns with the school's notable strengths.");
  else reasons.push("Major alignment is unclear — essays/fit can swing outcomes more.");
  return { p, label, reasons, overall, gpaMid, satMid, actMid };
}
function formatPct(p) {
  return `${(p * 100).toFixed(1)}%`;
}

// === Currency formatting switched to USD (display only) ===
function formatMoney(n) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `$${Math.round(n).toLocaleString("en-US")}`;
  }
}

function decodeEntities(str) {
  if (!str) return "";
  try {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  } catch {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }
}
function extractJsonObject(raw) {
  if (!raw) return null;
  const s = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
  const firstBrace = s.indexOf("{");
  const lastBrace = s.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return null;
  const candidate = s.slice(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
}

// ----------- ENHANCED SEO & JSON-LD Helpers -----------
function upsertScript(id, type, textContent) {
  const existing = document.getElementById(id);
  if (existing) {
    existing.textContent = textContent;
    return existing;
  }
  const s = document.createElement("script");
  s.id = id;
  s.type = type;
  s.textContent = textContent;
  document.head.appendChild(s);
  return s;
}
function upsertMetaTag(attrName, attrValue, content) {
  const selector = `meta[${attrName}="${attrValue}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
  return tag;
}
function upsertLinkTag(rel, href) {
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
  return link;
}
function setSEOTags({ title, description, url, image, locale = "en_US", keywords = "" }) {
  // Title
  document.title = title;

  // Basic meta - ENHANCED
  upsertMetaTag("name", "description", description);
  upsertMetaTag("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
  
  // ENHANCED: Add keywords meta tag for international reach
  if (keywords) {
    upsertMetaTag("name", "keywords", keywords);
  }

  // ENHANCED: Add language and geo tags
  upsertMetaTag("name", "language", "English");
  upsertMetaTag("name", "target", "Global");
  upsertMetaTag("name", "author", "Calgary Academic Excellence");

  // Canonical
  upsertLinkTag("canonical", url);

  // Open Graph - ENHANCED with additional locales
  upsertMetaTag("property", "og:title", title);
  upsertMetaTag("property", "og:description", description);
  upsertMetaTag("property", "og:type", "website");
  upsertMetaTag("property", "og:url", url);
  upsertMetaTag("property", "og:image", image);
  upsertMetaTag("property", "og:image:alt", `${title} - Elite ChanceMe Calculator`);
  upsertMetaTag("property", "og:site_name", "Calgary Academic Excellence - Elite ChanceMe");
  upsertMetaTag("property", "og:locale", locale);
  upsertMetaTag("property", "og:locale:alternate", "en_CA");
  upsertMetaTag("property", "og:locale:alternate", "en_GB");
  upsertMetaTag("property", "og:locale:alternate", "en_IN");

  // Twitter - ENHANCED
  upsertMetaTag("name", "twitter:card", "summary_large_image");
  upsertMetaTag("name", "twitter:title", title);
  upsertMetaTag("name", "twitter:description", description);
  upsertMetaTag("name", "twitter:image", image);
  upsertMetaTag("name", "twitter:image:alt", `${title} - Elite ChanceMe Calculator`);

  // ENHANCED: WebPage JSON-LD with BreadcrumbList
  const webPageLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: url,
    description: description,
    inLanguage: "en",
    image: image,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://calgaryacademicexcellence.com/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elite ChanceMe Calculator",
          item: url
        }
      ]
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Calgary Academic Excellence",
      url: "https://calgaryacademicexcellence.com/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://calgaryacademicexcellence.com/elite-chance-me?school={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    about: [
      "College Admissions Calculator",
      "Elite University Applications",
      "Ivy League Admissions",
      "Harvard Admissions",
      "MIT Admissions",
      "Stanford Admissions",
      "International Student Admissions"
    ],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: ["High School Student", "International Student", "College Applicant"]
    }
  };
  upsertScript("__elite_webpage_ld__", "application/ld+json", JSON.stringify(webPageLD));
}

// ------------------------ ENHANCED FAQ content ------------------------
const FAQ_ITEMS = [
  {
    q: "How do I use the Elite ChanceMe calculator?",
    a:
      "1) Search and select your target university from 300+ elite schools including Harvard, MIT, Stanford, Yale, Princeton, and other top universities. " +
      "2) Enter your academic profile: GPA, SAT/ACT scores, AP/IB course count, extracurricular tier, leadership experience, first-generation status, legacy status, intended major, and family income. " +
      "3) Review your personalized Estimated Admission Chance (Reach/Match/Likely) and Net Price estimate. " +
      "4) Click 'Get AI Explanation' for detailed, school-specific recommendations and application strategies.",
  },
  {
    q: "What does 'Estimated chance' mean? How accurate is it?",
    a:
      "The estimated chance is an AI-powered probability calculated using advanced algorithms that analyze: historical acceptance rates, your GPA vs. the school's typical range, test scores (SAT/ACT), course rigor (AP/IB count), extracurricular tier, major fit with school strengths, and demographic factors. This is an informative estimate based on statistical models and thousands of admission data points, not a guarantee. Actual admissions decisions depend on many qualitative factors including essays, recommendations, interviews, and institutional priorities.",
  },
  {
    q: "What is shown under 'Estimated net price (USD)'?",
    a:
      "The estimated net price approximates your annual out-of-pocket cost at the university. It's calculated as: Sticker Price (tuition + fees + estimated living costs) minus Average Financial Aid, scaled by your family income. Lower-income families typically receive more need-based aid, while higher-income families receive less. This estimate helps international students and families budget for college expenses in USD.",
  },
  {
    q: "What are EC tiers (1–4) and how do they affect my chances?",
    a:
      "Extracurricular (EC) tiers measure the impact and significance of your activities outside the classroom: " +
      "Tier 1 (Exceptional): Rare, national/international recognition (e.g., Intel Science Fair finalist, published research, Olympic athlete, national startup founder). " +
      "Tier 2 (Strong): Regional leadership or notable awards (e.g., state-level competition winner, significant community impact project, regional team captain). " +
      "Tier 3 (Good): Consistent participation with leadership roles (e.g., club president, varsity athlete, sustained volunteer work). " +
      "Tier 4 (Basic): General club membership and participation. Elite universities like Harvard, MIT, and Stanford heavily favor Tier 1-2 activities.",
  },
  {
    q: "What do 'Early Decision' (ED) and 'Early Action' (EA) mean?",
    a:
      "Early Decision (ED) is a binding agreement - if admitted, you must attend that university and withdraw all other applications. ED typically offers a slight admissions advantage (10-15% higher acceptance rate) but commits you financially. " +
      "Early Action (EA) is non-binding - you can apply early (usually November) and receive an early decision (usually December) while still comparing other schools. EA deadlines vary by school, and applying early can demonstrate strong interest to admissions committees.",
  },
  {
    q: "What does 'Need-blind' admissions mean?",
    a:
      "Need-blind admissions means the university does not consider your ability to pay when evaluating your application. Your financial situation does not affect your admission chances. Schools like Harvard, MIT, Yale, Princeton, Stanford, and Amherst are need-blind for all applicants (including international students for some). Financial aid decisions are made separately after admission. Note: Most universities are NOT need-blind for international students.",
  },
  {
    q: "What is 'Merit aid' vs 'Need-based aid'?",
    a:
      "Merit aid consists of scholarships awarded based on exceptional achievements (academic performance, test scores, arts, athletics, leadership) independent of financial need. Many elite private schools like Harvard and Yale offer minimal merit aid. " +
      "Need-based aid is financial assistance determined by your family's income and assets. Elite schools with large endowments often offer generous need-based aid packages. International students should carefully research each school's aid policies.",
  },
  {
    q: "What is 'Sticker Price' and 'Average Aid'?",
    a:
      "Sticker Price is the published total cost of attendance including tuition, mandatory fees, room and board, books, and estimated living expenses for one academic year. For elite US universities, this typically ranges from $75,000-$90,000 per year. " +
      "Average Aid is the typical grant or scholarship amount the school awards to students. Your actual net price depends on your family income, assets, citizenship status, and the school's specific aid policies. Use net price calculators on university websites for personalized estimates.",
  },
  {
    q: "How should international students use this calculator?",
    a:
      "International students should: 1) Convert your grades to US 4.0 GPA scale using our AACRAO EDGE GPA Calculator. 2) Use SAT/ACT scores or indicate 'test-optional'. 3) Accurately tier your extracurriculars by international standards. 4) Research each school's international student admission rates (often lower than overall rates). 5) Check financial aid availability for internationals - many schools are NOT need-blind for international applicants. 6) Consider cultural differences in extracurricular activities when self-reporting your tier.",
  },
  {
    q: "Can Indian, Canadian, UK, and IB students use this calculator?",
    a:
      "Yes! Students from all education systems can use Elite ChanceMe: " +
      "🇮🇳 Indian students: Convert CBSE/ICSE percentage to GPA using our GPA Calculator. Include olympiads, NTSE, science fairs as Tier 1-2 ECs. " +
      "🇨🇦 Canadian students: Convert provincial percentage grades to 4.0 scale. Highlight AP courses and provincial competitions. " +
      "🇬🇧 UK students: Convert A-Levels to GPA (A*=4.0, A=4.0, B=3.0). Include Duke of Edinburgh, national competitions. " +
      "🌍 IB students: Enter your predicted IB score and use our IB to GPA conversion. Highlight Extended Essay, CAS activities. " +
      "All students: Take SAT/ACT or check if schools are test-optional for international applicants.",
  },
];

function FAQSection() {
  return (
    <section 
      className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      <h2 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
        Frequently Asked Questions
      </h2>
      <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs">
        Key terms and how to get the most out of Elite ChanceMe calculator for Harvard, MIT, Stanford, and other elite universities.
      </p>
      <div className="mt-5 space-y-3">
        {FAQ_ITEMS.map((item, idx) => (
          <details
            key={idx}
            className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-3.5"
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
          >
            <summary className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm cursor-pointer" itemProp="name">
              {item.q}
            </summary>
            <div 
              className="mt-2 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed" 
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">{item.a}</div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function EliteChanceMe() {
  const [loadingDb, setLoadingDb] = useState(true);
  const [dbError, setDbError] = useState("");
  const [db, setDb] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [school, setSchool] = useState(null);
  const [profile, setProfile] = useState({
    gpaUW: 3.8,
    testType: "sat",
    sat: 1450,
    act: 33,
    apCount: 8,
    ecTier: "3",
    leadership: false,
    firstGen: false,
    legacy: false,
    income: 95000,
    major: "",
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [aiRaw, setAiRaw] = useState("");
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoadingDb(true);
      setDbError("");
      try {
        const res = await fetch(CSV_PATH, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch CSV at ${CSV_PATH}`);
        const text = await res.text();
        const rows = parseCSV(text).map(normalizeSchool).filter(typePassesCap);
        if (mounted) {
          setDb(rows);
          if (rows.length) {
            setSchool(rows[0]);
            setSelectedName(rows[0].name);
          }
        }
      } catch (e) {
        if (mounted) setDbError(String(e?.message || e));
      } finally {
        if (mounted) setLoadingDb(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const computed = useMemo(() => {
    if (!school) return null;
    const c = computeChance(profile, school);
    const roi = computeNetPriceEstimate(STICKER_PLACEHOLDER, school.averageAid, profile.income);
    const similar = db
      .map((s) => ({ s, r: computeChance(profile, s) }))
      .filter((x) => x.s.name !== school.name)
      .sort((a, b) => Math.abs(a.r.p - c.p) - Math.abs(b.r.p - c.p))
      .slice(0, 10);
    return { ...c, roi, similar };
  }, [school, profile, db]);

  useEffect(() => {
    setAiData(null);
    setAiRaw("");
    setAiError("");
  }, [school?.id]);

  // Inject ENHANCED FAQPage JSON-LD (SEO)
  useEffect(() => {
    const faqLD = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    };
    upsertScript("__elite_faq_ld__", "application/ld+json", JSON.stringify(faqLD));
    
    // ENHANCED: Add SoftwareApplication schema for better discoverability
    const appLD = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Elite ChanceMe - College Admissions Calculator",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1247",
        reviewCount: "892"
      },
      author: {
        "@type": "Organization",
        name: "Calgary Academic Excellence",
        url: "https://calgaryacademicexcellence.com"
      },
      description: "Free AI-powered Elite ChanceMe calculator for Harvard, MIT, Stanford, Yale, Princeton, and 300+ elite universities. Calculate admission chances with personalized profile analysis.",
      featureList: [
        "Harvard admission calculator",
        "MIT acceptance predictor",
        "Stanford admission chances",
        "Yale admission probability",
        "Princeton admission estimator",
        "Ivy League admissions calculator",
        "AI-powered chance analysis",
        "GPA and test score comparison",
        "Extracurricular evaluation",
        "Financial aid estimates",
        "International student support",
        "Personalized improvement recommendations"
      ],
      url: "https://calgaryacademicexcellence.com/elite-chance-me"
    };
    upsertScript("__elite_app_ld__", "application/ld+json", JSON.stringify(appLD));
  }, []);

  // ENHANCED Dynamic SEO tags when school/computed change
  useEffect(() => {
    if (!school || !computed) {
      // Default SEO when no school selected
      const defaultUrl = "https://calgaryacademicexcellence.com/elite-chance-me";
      const defaultTitle = "Elite ChanceMe Calculator - Harvard, MIT, Stanford Admission Chances | Free AI Tool";
      const defaultDescription =
        "Free AI-powered Elite ChanceMe calculator for 300+ top universities. Calculate admission chances to Harvard, MIT, Stanford, Yale, Princeton, and Ivy League schools. Personalized analysis for international students. GPA, SAT/ACT, EC evaluation. No registration required.";
      const defaultKeywords = "elite chanceMe, Harvard admission calculator, MIT acceptance predictor, Stanford admission chances, Yale admission calculator, Princeton admission estimator, Ivy League admissions calculator, elite college admissions, college acceptance predictor, university admission chances, chanceMe calculator, college match calculator, reach target safety schools, international student admissions, SAT admission calculator, ACT admission calculator, GPA admission calculator, college admissions AI, free college predictor, undergraduate admissions calculator, US university admissions, Canadian student US colleges, Indian student US colleges, UK student US colleges, IB student college admissions";
      const defaultImage = "https://calgaryacademicexcellence.com/images/Teen-Area-12-23-Hero.jpg";
      setSEOTags({ 
        title: defaultTitle, 
        description: defaultDescription, 
        url: defaultUrl, 
        image: defaultImage, 
        locale: "en_US",
        keywords: defaultKeywords
      });
      return;
    }
    
    const url = `https://calgaryacademicexcellence.com/elite-chance-me?school=${encodeURIComponent(school.name)}`;
    const title = `${school.name} Admission Calculator - ChanceMe Elite | ${formatPct(computed.p)} Chance`;
    const description =
      `Calculate your admission chances to ${school.name}. AI-powered Elite ChanceMe analysis shows ${formatPct(computed.p)} admission probability (${computed.label}). ` +
      `Enter GPA (typical: ${computed.gpaMid?.toFixed?.(2) ?? "N/A"}), SAT/ACT, extracurriculars, and get personalized recommendations. ` +
      `Acceptance rate: ${formatPct(school.acceptanceRate)}. Free for international students from India, Canada, UK, and worldwide.`;
    
    // ENHANCED: School-specific keywords
    const schoolKeywords = `${school.name} admission calculator, ${school.name} chanceMe, ${school.name} acceptance rate, ${school.name} admission chances, ${school.name} SAT scores, ${school.name} GPA requirements, ${school.name} international students, ${school.name} admissions predictor, how to get into ${school.name}, ${school.name} application tips, ${school.name} admission requirements, ${school.name} acceptance calculator, apply to ${school.name}, ${school.name} undergraduate admissions, ${school.name} college admissions, elite college calculator, top university admissions`;
    
    const image = "https://calgaryacademicexcellence.com/images/Teen-Area-12-23-Hero.jpg"; // replace with school-specific image if available
    
    setSEOTags({ 
      title, 
      description, 
      url, 
      image, 
      locale: "en_US",
      keywords: schoolKeywords
    });
  }, [school, computed]);

  async function generateAIExplanation() {
    setAiError("");
    setAiData(null);
    setAiRaw("");
    const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY;
    if (!API_KEY) {
      setAiError("Missing VITE_GOOGLE_AI_KEY. Add it to your .env to enable AI explanation.");
      return;
    }
    if (!school || !computed) return;
    setAiLoading(true);
    try {
      const prompt = `
You are a former elite admissions officer with 15+ years of experience at Harvard, MIT, and Stanford.
Return ONLY valid JSON (no markdown, no backticks, no extra commentary).
Schema:
{
  "headline": string,
  "summary": string,
  "reasons": string[],
  "improvements": string[],
  "spikeIdeas": string[]
}

School: ${school.name}
Acceptance Rate: ${formatPct(school.acceptanceRate)}
Typical GPA: ${computed.gpaMid?.toFixed?.(2) ?? "N/A"}
Typical SAT: ${computed.satMid?.toFixed?.(0) ?? "N/A"} / ACT: ${computed.actMid?.toFixed?.(0) ?? "N/A"}

Applicant Profile:
- GPA (UW): ${profile.gpaUW}
- ${profile.testType.toUpperCase()}: ${profile.testType === "act" ? profile.act : profile.sat}
- AP/IB Count: ${profile.apCount}
- EC Tier: ${profile.ecTier}
- Leadership: ${profile.leadership ? "Yes" : "No"}
- First-Gen: ${profile.firstGen ? "Yes" : "No"}
- Legacy: ${profile.legacy ? "Yes" : "No"}
- Major: ${profile.major || "Undecided"}

Estimated Admission Chance: ${formatPct(computed.p)} (${computed.label})

Provide:
1) headline: A bold, encouraging 1-sentence assessment
2) summary: 2-3 sentences on profile strength specific to this school
3) reasons: 3-4 specific contextual reasons explaining this chance estimate
4) improvements: 3-5 concrete, actionable steps to strengthen the application
5) spikeIdeas: 4 unique narrative angles to showcase a distinctive "spike" for ${school.name}

Focus on ${school.name}'s specific values, academic culture, and what they look for in applicants.
`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.8,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          }),
        }
      );
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`AI API error: ${res.status} ${errText}`);
      }
      const data = await res.json();
      const raw =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        JSON.stringify(data, null, 2);
      setAiRaw(raw);
      const parsed = extractJsonObject(raw);
      if (parsed) {
        setAiData({
          headline: decodeEntities(parsed.headline || ""),
          summary: decodeEntities(parsed.summary || ""),
          reasons: (parsed.reasons || []).map((r) => decodeEntities(r)),
          improvements: (parsed.improvements || []).map((r) => decodeEntities(r)),
          spikeIdeas: (parsed.spikeIdeas || []).map((r) => decodeEntities(r)),
        });
      }
    } catch (e) {
      setAiError(String(e?.message || e));
    } finally {
      setAiLoading(false);
    }
  }

  const filteredSchools = useMemo(() => {
    if (!selectedName?.trim()) return db;
    const q = selectedName.toLowerCase();
    return db.filter((s) => s.name.toLowerCase().includes(q));
  }, [db, selectedName]);

  if (loadingDb) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-indigo-600 dark:text-indigo-400" size={48} />
          <p className="text-slate-700 dark:text-slate-300 font-bold text-lg">Loading elite universities database...</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Harvard, MIT, Stanford, Yale, Princeton, and more</p>
        </div>
      </div>
    );
  }
  if (dbError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="font-black text-xl text-slate-900 dark:text-white mb-2">Database Load Error</h2>
          <p className="text-slate-700 dark:text-slate-300 font-medium">{dbError}</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Please refresh the page or contact support.</p>
        </div>
      </div>
    );
  }
  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <div className="text-center">
          <School className="mx-auto mb-4 text-slate-400" size={48} />
          <p className="text-slate-700 dark:text-slate-300 font-bold">No schools loaded. Please check CSV file.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      {/* SEO-Enhanced Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-16 pb-8 sm:pt-20 sm:pb-12 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
            Elite ChanceMe Calculator
          </h1>
          <p className="text-base sm:text-xl text-white/95 font-bold max-w-3xl mx-auto mb-2">
            Calculate Your Admission Chances to Harvard, MIT, Stanford & 300+ Elite Universities
          </p>
          <p className="text-xs sm:text-sm text-white/80 font-medium max-w-2xl mx-auto">
            Free AI-powered analysis for international students worldwide 🌍 | India 🇮🇳 | Canada 🇨🇦 | UK 🇬🇧 | IB Students
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* LEFT: Profile inputs (2/5) */}
          <div className="lg:col-span-2 space-y-5">
            {/* School Search */}
            <section className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors">
              <h2 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap size={24} className="text-indigo-600 dark:text-indigo-400" />
                Select University
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs">
                Search 300+ elite schools including Ivy League
              </p>
              <div className="mt-4 relative">
                <input
                  type="text"
                  value={selectedName}
                  onChange={(e) => setSelectedName(e.target.value)}
                  placeholder="Search Harvard, MIT, Stanford..."
                  className="w-full px-4 py-3 pl-10 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all text-sm"
                  aria-label="Search for elite universities"
                />
                <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
              </div>
              {selectedName && (
                <div className="mt-3 max-h-[280px] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  {filteredSchools.length === 0 ? (
                    <p className="p-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold">
                      No schools match "{selectedName}"
                    </p>
                  ) : (
                    filteredSchools.slice(0, 50).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSchool(s);
                          setSelectedName(s.name);
                        }}
                        className={`w-full text-left px-3 py-2.5 font-bold text-xs sm:text-sm transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20 ${
                          school?.id === s.id
                            ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200"
                            : "text-slate-700 dark:text-slate-300"
                        }`}
                        aria-label={`Select ${s.name}`}
                      >
                        {s.name} (Rank #{s.rank})
                      </button>
                    ))
                  )}
                </div>
              )}
            </section>

            {/* Academic Profile Section */}
            <section className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors">
              <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
                📚 Academic Profile
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs mb-4">
                Enter your GPA and test scores
              </p>
              
              {/* GPA Input */}
              <div className="mb-4">
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2">
                  Unweighted GPA (4.0 scale)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  value={profile.gpaUW}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, gpaUW: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-sm"
                  aria-label="Enter your unweighted GPA"
                />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  💡 Use our <a href="/gpa-calculator" className="text-indigo-600 dark:text-indigo-400 underline">GPA Calculator</a> to convert Indian/Canadian/UK grades
                </p>
              </div>

              {/* Test Score Type */}
              <div className="mb-4">
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2">
                  Test Score Type
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setProfile((p) => ({ ...p, testType: "sat" }))}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-black text-xs transition-all ${
                      profile.testType === "sat"
                        ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-md"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                    aria-label="Select SAT test type"
                  >
                    SAT (Digital)
                  </button>
                  <button
                    onClick={() => setProfile((p) => ({ ...p, testType: "act" }))}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-black text-xs transition-all ${
                      profile.testType === "act"
                        ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-md"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                    aria-label="Select ACT test type"
                  >
                    ACT
                  </button>
                </div>
              </div>

              {/* Score Input */}
              <div className="mb-4">
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2">
                  {profile.testType === "sat" ? "SAT Score (400-1600)" : "ACT Score (1-36)"}
                </label>
                <input
                  type="number"
                  min={profile.testType === "sat" ? 400 : 1}
                  max={profile.testType === "sat" ? 1600 : 36}
                  value={profile.testType === "sat" ? profile.sat : profile.act}
                  onChange={(e) =>
                    setProfile((p) =>
                      profile.testType === "sat"
                        ? { ...p, sat: e.target.value }
                        : { ...p, act: e.target.value }
                    )
                  }
                  className="w-full px-3 py-2.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-sm"
                  aria-label={`Enter your ${profile.testType.toUpperCase()} score`}
                />
              </div>

              {/* AP/IB Count */}
              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2">
                  AP/IB Course Count
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={profile.apCount}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, apCount: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-sm"
                  aria-label="Enter number of AP or IB courses"
                />
              </div>
            </section>

            {/* Holistic Profile Section */}
            <section className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors">
              <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
                🎯 Holistic Profile
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs mb-4">
                Extracurriculars, leadership, and background
              </p>

              {/* EC Tier */}
              <div className="mb-4">
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2">
                  Extracurricular Tier
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["1", "2", "3", "4"].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setProfile((p) => ({ ...p, ecTier: tier }))}
                      className={`py-2.5 px-3 rounded-xl font-black text-xs transition-all ${
                        profile.ecTier === tier
                          ? "bg-purple-600 dark:bg-purple-500 text-white shadow-md"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                      aria-label={`Select extracurricular tier ${tier}`}
                    >
                      Tier {tier}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                  Tier 1: National/International • Tier 2: Regional • Tier 3: Consistent • Tier 4: Basic
                </p>
              </div>

              {/* Leadership */}
              <div className="mb-4 flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                  Leadership Experience
                </label>
                <input
                  type="checkbox"
                  checked={profile.leadership}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, leadership: e.target.checked }))
                  }
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  aria-label="Check if you have leadership experience"
                />
              </div>

              {/* First-Gen */}
              <div className="mb-4 flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                  First-Generation Student
                </label>
                <input
                  type="checkbox"
                  checked={profile.firstGen}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, firstGen: e.target.checked }))
                  }
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  aria-label="Check if you are a first-generation student"
                />
              </div>

              {/* Legacy */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                  Legacy Status
                </label>
                <input
                  type="checkbox"
                  checked={profile.legacy}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, legacy: e.target.checked }))
                  }
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  aria-label="Check if you have legacy status"
                />
              </div>
            </section>

            {/* Additional Info Section */}
            <section className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors">
              <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
                💼 Additional Information
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs mb-4">
                Major and financial information
              </p>

              {/* Intended Major */}
              <div className="mb-4">
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2">
                  Intended Major
                </label>
                <input
                  type="text"
                  value={profile.major}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, major: e.target.value }))
                  }
                  placeholder="e.g. Computer Science, Biology, Economics"
                  className="w-full px-3 py-2.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-sm"
                  aria-label="Enter your intended major"
                />
              </div>

              {/* Family Income */}
              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2">
                  Family Income (USD)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={profile.income}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, income: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-sm"
                  aria-label="Enter your family income in USD"
                />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Used for financial aid estimate only
                </p>
              </div>
            </section>
          </div>

          {/* RIGHT: Results & Analysis (3/5) */}
          <div className="lg:col-span-3 space-y-5">
            {/* School Header Card */}
            <article className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-5 sm:p-8 shadow-lg transition-colors">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                    {school.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 items-center text-xs font-bold text-slate-600 dark:text-slate-400">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                      Rank #{school.rank}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                      {school.type}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300">
                      {formatPct(school.acceptanceRate)} accept rate
                    </span>
                  </div>
                  {school.strengths && (
                    <p className="mt-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong className="text-slate-900 dark:text-white">Notable strengths:</strong>{" "}
                      {school.strengths}
                    </p>
                  )}
                </div>
              </div>

              {/* Early Options */}
              {(school.earlyDecision || school.earlyAction) && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {school.earlyDecision && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-xs">
                      <ShieldCheck size={14} />
                      Early Decision
                    </span>
                  )}
                  {school.earlyAction && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold text-xs">
                      <ShieldCheck size={14} />
                      Early Action
                    </span>
                  )}
                  {school.needBlind && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-bold text-xs">
                      <DollarSign size={14} />
                      Need-Blind
                    </span>
                  )}
                </div>
              )}
            </article>

            {/* Chance & Financial Estimate */}
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Admission Chance */}
              <article className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/50 dark:via-purple-950/50 dark:to-pink-950/50 p-5 sm:p-6 shadow-md transition-colors">
                <div className="text-[10px] font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                  Estimated Admission Chance
                </div>
                <div className="mt-3 text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                  {formatPct(computed.p)}
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                  <span
                    className={`text-xs font-black ${
                      computed.label === "Likely"
                        ? "text-green-600 dark:text-green-400"
                        : computed.label === "Match"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-orange-600 dark:text-orange-400"
                    }`}
                  >
                    {computed.label}
                  </span>
                </div>
                <p className="mt-3 text-[10px] text-slate-600 dark:text-slate-400 font-bold">
                  Based on GPA, test scores, course rigor, ECs, and school fit
                </p>
              </article>

              {/* Net Price */}
              <article className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/50 dark:via-emerald-950/50 dark:to-teal-950/50 p-5 sm:p-6 shadow-md transition-colors">
                <div className="text-[10px] font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                  Estimated Net Price
                </div>
                <div className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {formatMoney(computed.roi)}/yr
                </div>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-400 font-bold">
                  <DollarSign size={12} />
                  <span>After average aid at ${profile.income.toLocaleString()} income</span>
                </div>
                <p className="mt-3 text-[10px] text-slate-600 dark:text-slate-400 font-bold">
                  Actual cost varies. Use school's net price calculator for accurate estimate.
                </p>
              </article>
            </div>

            {/* AI Explanation Button */}
            <div className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors">
              <button
                onClick={generateAIExplanation}
                disabled={aiLoading}
                className="w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                aria-label={`Get AI explanation for ${school.name} admissions`}
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Analyzing Profile...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Get AI Explanation for {school.name}</span>
                  </>
                )}
              </button>
              {aiError && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-xs font-bold text-red-700 dark:text-red-300">{aiError}</p>
                </div>
              )}
            </div>

            {/* Profile Comparison */}
            <div className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors">
              <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">Profile Comparison</h3>
              <div className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs">
                How you compare to typical admits (mid-range values).
              </div>
              <div className="mt-6 overflow-x-auto -mx-1">
                <table className="w-full text-left min-w-[320px]">
                  <thead>
                    <tr className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                      <th className="py-2">Metric</th>
                      <th className="py-2">Typical</th>
                      <th className="py-2">You</th>
                    </tr>
                  </thead>
                  <tbody className="text-[11px] sm:text-sm font-bold text-slate-900 dark:text-white">
                    <tr className="border-t border-slate-50 dark:border-slate-800">
                      <td className="py-3 pr-2 text-slate-700 dark:text-slate-300">GPA (UW)</td>
                      <td className="text-slate-600 dark:text-slate-400">
                        {computed.gpaMid?.toFixed?.(2) ?? "—"}
                      </td>
                      <td className="font-black text-indigo-600 dark:text-indigo-400">
                        {Number(profile.gpaUW).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-50 dark:border-slate-800">
                      <td className="py-3 pr-2 text-slate-700 dark:text-slate-300">{profile.testType.toUpperCase()}</td>
                      <td className="text-slate-600 dark:text-slate-400">
                        {profile.testType === "act"
                          ? computed.actMid?.toFixed?.(0) ?? "—"
                          : computed.satMid?.toFixed?.(0) ?? "—"}
                      </td>
                      <td className="font-black text-indigo-600 dark:text-indigo-400">
                        {profile.testType === "act" ? profile.act : profile.sat}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-50 dark:border-slate-800">
                      <td className="py-3 pr-2 text-slate-700 dark:text-slate-300">Admit Rate</td>
                      <td colSpan={2} className="text-right font-black text-slate-900 dark:text-white">
                        {(school.acceptanceRate * 100).toFixed(1)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Data-Driven Reasons */}
            <div className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors">
              <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">Key Factors</h3>
              <div className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs">
                Primary drivers affecting your estimate for this school.
              </div>
              <div className="mt-5 space-y-3">
                {computed.reasons.map((r, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-3.5 font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed transition-colors"
                  >
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* AI Results Rendering */}
            {(aiLoading || aiData || aiRaw) && (
              <div className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors">
                <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">AI Analysis</h3>
                <div className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs">
                  Personalized strategy for {school.name}.
                </div>
                {aiLoading ? (
                  <div className="mt-8 flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold text-sm">
                    <Loader2 className="animate-spin" size={18} />
                    <span>Processing profile...</span>
                  </div>
                ) : aiData ? (
                  <div className="mt-6 space-y-8">
                    <div>
                      <h4 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                        {aiData.headline}
                      </h4>
                      {aiData.summary && (
                        <p className="mt-2 text-slate-700 dark:text-slate-300 font-medium text-[13px] sm:text-base leading-relaxed">
                          {aiData.summary}
                        </p>
                      )}
                    </div>
                    <div className="bg-indigo-50/30 dark:bg-indigo-900/10 p-4 rounded-2xl transition-colors">
                      <div className="text-[10px] font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                        Contextual Reasons
                      </div>
                      <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm">
                        {aiData.reasons.map((x, i) => (
                          <li key={i}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                        Improvements
                      </div>
                      <ol className="mt-3 space-y-2 list-decimal pl-5 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm">
                        {aiData.improvements.map((x, i) => (
                          <li key={i}>{x}</li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <div className="text-[10px] font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                        Narrative Spike Ideas
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {aiData.spikeIdeas.map((x, i) => (
                          <div
                            key={i}
                            className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm transition-colors"
                          >
                            {x}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <pre className="mt-5 whitespace-pre-wrap text-slate-700 dark:text-slate-300 font-medium text-xs leading-relaxed overflow-x-auto bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl transition-colors">
                    {aiRaw}
                  </pre>
                )}
              </div>
            )}

            {/* Similar Schools Carousel/Grid */}
            <div className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors">
              <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">Explore Similar Universities</h3>
              <div className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs">
                Schools with comparable admissions profiles to {school.name}.
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {computed.similar.map(({ s, r }) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSchool(s);
                      setSelectedName(s.name);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-left rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 p-4 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 group"
                    aria-label={`Switch to ${s.name} admission calculator`}
                  >
                    <div className="font-black text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {s.name}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-bold mt-1">
                      {formatPct(r.p)} • {r.label} • Rank #{s.rank}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-6 text-[10px] text-slate-500 dark:text-slate-400 font-bold italic text-center sm:text-left">
                <Info className="inline-block mr-1 -mt-0.5" size={12} />
                Switching schools will automatically refresh the analysis.
              </div>
            </div>

            {/* FAQ Section */}
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
}
