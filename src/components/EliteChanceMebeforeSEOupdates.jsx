
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
 *
 * ✅ Chance for ONE school only
 * ✅ AI explanation for that ONE school only
 * ✅ AI response is requested as STRICT JSON and rendered with normal JSX
 * ✅ No react-markdown / remark-gfm required
 * ✅ CSV path: public/excel/cleaned_collegerankings.csv
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
  if (fitScore >= 0.7) reasons.push("Intended major aligns with the school’s notable strengths.");
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
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, '"')
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

// ----------- SEO & JSON-LD Helpers (no external packages) -----------
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
function setSEOTags({ title, description, url, image, locale = "en_US" }) {
  // Title
  document.title = title;

  // Basic meta
  upsertMetaTag("name", "description", description);
  upsertMetaTag("name", "robots", "index,follow");

  // Canonical
  upsertLinkTag("canonical", url);

  // Open Graph
  upsertMetaTag("property", "og:title", title);
  upsertMetaTag("property", "og:description", description);
  upsertMetaTag("property", "og:type", "website");
  upsertMetaTag("property", "og:url", url);
  upsertMetaTag("property", "og:image", image);
  upsertMetaTag("property", "og:locale", locale);

  // Twitter
  upsertMetaTag("name", "twitter:card", "summary_large_image");
  upsertMetaTag("name", "twitter:title", title);
  upsertMetaTag("name", "twitter:description", description);
  upsertMetaTag("name", "twitter:image", image);

  // WebPage JSON-LD
  const webPageLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: url,
    description: description,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "Calgary Academic Excellence",
      url: "https://calgaryacademicexcellence.com/",
    },
  };
  upsertScript("__elite_webpage_ld__", "application/ld+json", JSON.stringify(webPageLD));
}

// ------------------------ FAQ content ------------------------
const FAQ_ITEMS = [
  {
    q: "How do I use this page?",
    a:
      "1) Select a school using the search bar. " +
      "2) Adjust your profile (GPA, SAT/ACT, AP/IB count, EC tier, leadership/first-gen/legacy, intended major, family income in USD). " +
      "3) Review the Estimated Chance and Net Price (USD). " +
      "4) Click 'Get AI Explanation' for school-specific tips.",
  },
  {
    q: "What does 'Estimated chance' mean?",
    a:
      "It is a model-derived probability based on historical data points (admit rate, GPA/test typical ranges, course rigor, EC tier, major fit) using your inputs. It is informative, not a guarantee.",
  },
  {
    q: "What is shown under 'Estimated net price (USD)'?",
    a:
      "This approximates the annual out-of-pocket cost: Sticker Price (placeholder in this build) minus average aid scaled by your family income. Lower income typically increases need-based aid; higher income reduces it.",
  },
  {
    q: "What are EC tiers (1–4)?",
    a:
      "Tier 1: Rare, national/international impact. Tier 2: Strong regional leadership or awards. Tier 3: Consistent participation with some leadership. Tier 4: General involvement.",
  },
  {
    q: "What do 'Early Decision' and 'Early Action' mean?",
    a:
      "Early Decision (ED) is binding if admitted; Early Action (EA) is non-binding. Applying early can affect odds or timing, depending on the school.",
  },
  {
    q: "What does 'Need-blind' mean?",
    a:
      "Need-blind admissions do not consider your ability to pay in the decision process. Financial aid decisions are separate.",
  },
  {
    q: "What does 'Merit aid' mean?",
    a:
      "Merit-based scholarships awarded for achievements (academics, arts, leadership) independent of financial need.",
  },
  {
    q: "What is 'Sticker Price' and 'Average Aid'?",
    a:
      "Sticker Price is the published tuition+fees+estimated living costs. Average Aid is typical grants/scholarships the school awards; your net price depends on your family income and eligibility.",
  },
];

function FAQSection() {
  return (
    <div className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors">
      <div className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
        Frequently Asked Questions
      </div>
      <div className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs">
        Key terms and how to get the most out of this tool.
      </div>
      <div className="mt-5 space-y-3">
        {FAQ_ITEMS.map((item, idx) => (
          <details
            key={idx}
            className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-3.5"
          >
            <summary className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm cursor-pointer">
              {item.q}
            </summary>
            <div className="mt-2 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
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

  // Inject FAQPage JSON-LD (SEO)
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
  }, []);

  // Dynamic SEO tags when school/computed change
  useEffect(() => {
    if (!school || !computed) return;
    const url = "https://calgaryacademicexcellence.com/elite-chance-me";
    const title = `Chance Me: ${school.name} — Elite Admissions Estimator`;
    const description =
      `Adjust GPA, SAT/ACT, AP/IB, EC Tier, leadership, and family income (USD) to see your ` +
      `estimated chance and net price for ${school.name}. AI explanation included.`;
    const image = "https://calgaryacademicexcellence.com/assets/og-elite-chance-me.png"; // replace with your actual OG image path
    setSEOTags({ title, description, url, image, locale: "en_US" });
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
You are a former elite admissions officer.
Return ONLY valid JSON (no markdown, no backticks, no extra commentary).
Schema:
{
  "headline": string,
  "summary": string,
  "reasons": [string],
  "improvements": [string],
  "spikeIdeas": [string]
}
Rules:
- Do NOT mention any other universities.
- 4-6 reasons, 3 improvements, 2 spikeIdeas.
- Keep it specific to this school.
- Do not HTML-escape characters (use & not &amp;).
SCHOOL:
- Name: ${school.name}
- Type/Rank: ${school.type} Rank #${school.rank}
- Acceptance rate: ${(school.acceptanceRate * 100).toFixed(1)}%
- GPA range: ${school.gpaLow ?? "?"}-${school.gpaHigh ?? "?"}
- SAT range: ${school.satLow ?? "?"}-${school.satHigh ?? "?"}
- ACT range: ${school.actLow ?? "?"}-${school.actHigh ?? "?"}
- Strengths: ${school.strengths || "N/A"}
STUDENT:
- Unweighted GPA: ${profile.gpaUW}
- ${profile.testType.toUpperCase()}: ${profile.testType === "sat" ? profile.sat : profile.act}
- AP/IB count: ${profile.apCount}
- EC tier: ${profile.ecTier}
- Leadership: ${profile.leadership ? "Yes" : "No"}
- First-gen: ${profile.firstGen ? "Yes" : "No"}
- Legacy: ${profile.legacy ? "Yes" : "No"}
- Intended major: ${profile.major || "Not specified"}
MODEL OUTPUT (already computed):
- Estimated probability: ${(computed.p * 100).toFixed(1)}% (${computed.label})
`.trim();

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      const data = await response.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const decoded = decodeEntities(raw);
      setAiRaw(decoded);
      const obj = extractJsonObject(decoded);
      if (!obj) {
        setAiError("AI did not return valid JSON. Showing raw output below.");
        setAiData(null);
      } else {
        setAiData({
          headline: obj.headline || "AI Explanation",
          summary: obj.summary || "",
          reasons: Array.isArray(obj.reasons) ? obj.reasons : [],
          improvements: Array.isArray(obj.improvements) ? obj.improvements : [],
          spikeIdeas: Array.isArray(obj.spikeIdeas) ? obj.spikeIdeas : [],
        });
      }
    } catch (e) {
      console.error(e);
      setAiError("AI explanation failed to load. Check API key / network.");
    } finally {
      setAiLoading(false);
    }
  }

  if (loadingDb) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow">
              <GraduationCap size={20} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Elite ChanceMe
              </h1>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                Loading schools…
              </p>
            </div>
          </div>
          <div className="mt-10 rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-6 flex items-center gap-4">
            <div className="h-3 w-3 rounded-full bg-indigo-600 animate-pulse" />
            <div className="font-black text-sm text-slate-700 dark:text-slate-300">
              Reading CSV database...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (dbError) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow">
              <GraduationCap />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Elite ChanceMe
              </h1>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Error</p>
            </div>
          </div>
          <div className="mt-10 rounded-3xl border border-red-100 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-6 flex items-start gap-4">
            <AlertTriangle className="text-red-600 dark:text-red-400 mt-1" />
            <div className="text-sm">
              <div className="font-black text-red-900 dark:text-red-200">Could not load CSV</div>
              <div className="text-red-700 dark:text-red-300 mt-1">{dbError}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!school || !computed) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-16 sm:pt-24 transition-colors">
      {/* Sticky school selector */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <School className="text-indigo-600 dark:text-indigo-400 shrink-0" size={16} />
            <span className="font-black text-xs sm:text-base uppercase tracking-tight text-slate-700 dark:text-slate-200">
              Select School
            </span>
          </div>
          <div className="md:ml-auto w-full md:w-[500px] relative">
            <Search className="absolute left-3.5 top-2.5 sm:top-3.5 text-slate-400 dark:text-slate-500" size={16} />
            <input
              list="school-list"
              value={selectedName}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedName(val);
                const found = db.find((s) => s.name.toLowerCase() === val.toLowerCase());
                if (found) setSchool(found);
              }}
              className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base font-black text-slate-900 dark:text-white outline-none focus:ring-4 ring-indigo-50 dark:ring-indigo-900/20 transition-colors"
              placeholder="Type school name..."
            />
            <datalist id="school-list">
              {db.map((s) => (
                <option key={s.id} value={s.name} />
              ))}
            </datalist>
          </div>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-center sm:text-left">
            {school.type} #{school.rank} • {(school.acceptanceRate * 100).toFixed(1)}% admit
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Title Section */}
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow shrink-0">
            <GraduationCap size={20} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
              Chance Me: {school.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium mt-1 text-xs sm:text-base">
              Probability based on historical data and AI analysis.
            </p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Inputs Panel */}
          <div className="lg:col-span-5 rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm h-fit transition-colors">
            <div className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">Your profile</div>
            <div className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs sm:text-sm">
              Adjust parameters below.
            </div>

            {/* GPA Slider */}
            <div className="mt-6">
              <div className="flex justify-between items-end">
                <label className="text-[10px] sm:text-xs font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                  Unweighted GPA
                </label>
                <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                  {Number(profile.gpaUW).toFixed(2)}
                </div>
              </div>
              <input
                type="range"
                min="2.0"
                max="4.0"
                step="0.01"
                value={profile.gpaUW}
                onChange={(e) => setProfile((p) => ({ ...p, gpaUW: Number(e.target.value) }))}
                className="w-full mt-3 accent-indigo-600"
              />
            </div>

            {/* Test Type Selectors */}
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setProfile((p) => ({ ...p, testType: "sat" }))}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-full font-black text-[10px] sm:text-xs tracking-widest transition ${
                    profile.testType === "sat"
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  SAT
                </button>
                <button
                  onClick={() => setProfile((p) => ({ ...p, testType: "act" }))}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-full font-black text-[10px] sm:text-xs tracking-widest transition ${
                    profile.testType === "act"
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  ACT
                </button>
              </div>
              {profile.testType === "sat" ? (
                <div className="mt-5">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] sm:text-xs font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                      SAT total score
                    </label>
                    <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                      {profile.sat}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="800"
                    max="1600"
                    step="10"
                    value={profile.sat}
                    onChange={(e) => setProfile((p) => ({ ...p, sat: Number(e.target.value) }))}
                    className="w-full mt-3 accent-indigo-600"
                  />
                </div>
              ) : (
                <div className="mt-5">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] sm:text-xs font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                      ACT composite score
                    </label>
                    <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                      {profile.act}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="36"
                    step="1"
                    value={profile.act}
                    onChange={(e) => setProfile((p) => ({ ...p, act: Number(e.target.value) }))}
                    className="w-full mt-3 accent-indigo-600"
                  />
                </div>
              )}
            </div>

            {/* Holistic Data */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] sm:text-xs font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                  AP/IB count
                </label>
                <input
                  type="number"
                  value={profile.apCount}
                  onChange={(e) => setProfile((p) => ({ ...p, apCount: Number(e.target.value) }))}
                  className="mt-2 w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 font-black text-slate-900 dark:text-white outline-none text-sm transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] sm:text-xs font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                  EC Tier
                </label>
                {/* Inline EC Tier help (no logic changes) */}
                <details className="mt-1 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                  <summary className="cursor-pointer inline text-indigo-600 dark:text-indigo-400 font-bold">
                    What are EC tiers?
                  </summary>
                  <div className="mt-2 leading-relaxed">
                    <strong>Tier 1 (Rare):</strong> National/International-level impact, highly selective awards, founder of widely adopted initiative.<br />
                    <strong>Tier 2:</strong> Significant leadership or awards at state/provincial or regional level, impactful roles (e.g., captain, chair).<br />
                    <strong>Tier 3:</strong> Solid participation with some leadership (club officer, organizer, consistent volunteering).<br />
                    <strong>Tier 4:</strong> General involvement, membership, occasional participation.
                  </div>
                </details>
                <select
                  value={profile.ecTier}
                  onChange={(e) => setProfile((p) => ({ ...p, ecTier: e.target.value }))}
                  className="mt-2 w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 font-black text-slate-900 dark:text-white outline-none text-sm transition-colors"
                >
                  <option value="1">Tier 1 (Rare)</option>
                  <option value="2">Tier 2</option>
                  <option value="3">Tier 3</option>
                  <option value="4">Tier 4</option>
                </select>
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { k: "leadership", label: "Leadership" },
                { k: "firstGen", label: "First-gen" },
                { k: "legacy", label: "Legacy" },
              ].map((x) => (
                <button
                  key={x.k}
                  onClick={() => setProfile((p) => ({ ...p, [x.k]: !p[x.k] }))}
                  className={`rounded-xl border py-2.5 font-black text-[10px] sm:text-xs transition-all ${
                    profile[x.k]
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>

            {/* Major & Income */}
            <div className="mt-6">
              <label className="text-[10px] sm:text-xs font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                Intended major
              </label>
              <input
                value={profile.major}
                onChange={(e) => setProfile((p) => ({ ...p, major: e.target.value }))}
                className="mt-2 w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 font-black text-slate-900 dark:text-white outline-none text-sm transition-colors"
                placeholder="e.g., Biology, CS..."
              />
            </div>
            <div className="mt-6">
              <label className="text-[10px] sm:text-xs font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                Family income (USD)
              </label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-4 top-2.5 text-indigo-600 dark:text-indigo-400" size={16} />
                <input
                  type="number"
                  value={profile.income}
                  onChange={(e) => setProfile((p) => ({ ...p, income: Number(e.target.value) }))}
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-4 py-2.5 font-black text-slate-900 dark:text-white outline-none text-sm transition-colors"
                />
              </div>
            </div>

            <button
              onClick={generateAIExplanation}
              disabled={aiLoading}
              className="mt-6 w-full rounded-xl bg-slate-900 dark:bg-indigo-600 text-white py-3.5 font-black text-sm sm:text-base hover:bg-indigo-700 dark:hover:bg-indigo-500 transition flex items-center justify-center gap-2 shadow-sm"
            >
              {aiLoading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              {aiLoading ? "Consulting Admissions Officer..." : "Get AI Explanation"}
            </button>
            {aiError && (
              <div className="mt-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/20 p-4 text-amber-900 dark:text-amber-200 text-[11px] font-bold leading-relaxed">
                {aiError}
              </div>
            )}
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Probability Card */}
            <div className="rounded-3xl md:rounded-[2.5rem] bg-slate-900 text-white p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="text-[10px] sm:text-xs font-black tracking-widest text-indigo-300 uppercase">
                    Estimated chance
                  </div>
                  <div className="mt-2 text-5xl sm:text-6xl font-black">{formatPct(computed.p)}</div>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 font-black text-[11px] sm:text-sm">
                    <ShieldCheck size={16} className="text-indigo-300" />
                    {computed.label}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 w-full md:w-[260px] text-center md:text-left">
                  <div className="text-[10px] sm:text-xs font-black tracking-widest text-indigo-300 uppercase">
                    Estimated net price (USD)
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">Sticker – Aid (income-adjusted)</div>
                  <div className="mt-2 text-2xl font-black">{formatMoney(computed.roi)}</div>
                  <div className="text-[9px] text-slate-400 mt-2 uppercase tracking-tighter">
                    Sticker Placeholder: {STICKER_PLACEHOLDER}
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm transition-colors">
              <div className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">Metric comparison</div>
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
              <div className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">Key Factors</div>
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
                <div className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">AI analysis</div>
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
                      <div className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                        {aiData.headline}
                      </div>
                      {aiData.summary && (
                        <div className="mt-2 text-slate-700 dark:text-slate-300 font-medium text-[13px] sm:text-base leading-relaxed">
                          {aiData.summary}
                        </div>
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
                        Narrative spike ideas
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
              <div className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">Explore similar</div>
              <div className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs">
                Schools with comparable admissions profiles.
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

            {/* FAQ Section (added, no logic changes elsewhere) */}
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
}
