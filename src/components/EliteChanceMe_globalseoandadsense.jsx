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
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/**
 * Elite ChanceMe — Single School Only (Global SEO + AdSense Auto Ads)
 *
 * ✅ Globally-focused SEO (not location-specific)
 * ✅ AdSense AUTO ADS (no manual ad slots in code)
 * ✅ FAQ (EC tiers) placed BELOW the form
 * ✅ AI explanation formatted (strict JSON rendered as cards)
 *
 * CSV path: public/excel/cleaned_collegerankings.csv
 */

const CSV_PATH = "/excel/cleaned_collegerankings.csv";
const INCOME_REFERENCE = 120000;
const STICKER_PLACEHOLDER = 80000;
const ADSENSE_CLIENT = "ca-pub-7638771792216412";

// ---------------- utils ----------------
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
const toNum = (v, fallback = 0) => {
  const n = Number(String(v ?? "").replace(/[^\d.-]/g, ""));
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
    if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; continue; }
    if (ch === '"') { inQ = !inQ; continue; }
    if (ch === "," && !inQ) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function parseCSV(text) {
  const lines = String(text).split(/\r?\n/).filter((l) => l.trim().length > 0);
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
  const m = String(str).match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
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
  const st = String(strengths || "").toLowerCase().split(/[^a-z]+/).filter(Boolean);
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
  const testScore = testType === "act" ? toNum(profile.act, NaN) : toNum(profile.sat, NaN);

  const gpaMid = school.gpaLow && school.gpaHigh ? (school.gpaLow + school.gpaHigh) / 2 : 3.85;
  const satMid = school.satLow && school.satHigh ? (school.satLow + school.satHigh) / 2 : 1450;
  const actMid = school.actLow && school.actHigh ? (school.actLow + school.actHigh) / 2 : 33;

  const gpaDelta = Number.isFinite(gpaUW) ? (gpaUW - gpaMid) / 0.15 : 0;
  const testDelta = Number.isFinite(testScore)
    ? (testType === "act" ? (testScore - actMid) / 2.0 : (testScore - satMid) / 80.0)
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
  const adjustedLogit = logit(base) + 2.15 * (overall - 0.5) + leadershipBoost + firstGenBoost + legacyBoost;
  const p = clamp(sigmoid(adjustedLogit), 0.01, 0.95);
  const label = p < 0.12 ? "Reach" : p < 0.35 ? "Match" : "Likely";

  return { p, label, gpaMid, satMid, actMid };
}

function formatPct(p) {
  return `${(p * 100).toFixed(1)}%`;
}

function formatMoney(n) {
  try {
    return new Intl.NumberFormat("en", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  } catch {
    return `$${Math.round(n).toLocaleString()}`;
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
  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) return null;
  try {
    return JSON.parse(s.slice(first, last + 1));
  } catch {
    return null;
  }
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

  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [aiRaw, setAiRaw] = useState("");
  const [aiError, setAiError] = useState("");

  const faqItems = useMemo(() => ([
    { q: "What are EC tiers?", a: "EC tiers (Extracurricular tiers) rate impact: Tier 1 = national/international recognition; Tier 2 = regional/state leadership; Tier 3 = school/community impact; Tier 4 = participation. Choose the tier for your single strongest activity (your spike)." },
    { q: "How do I choose my EC tier accurately?", a: "Use evidence: selectivity, awards, leadership scope, and measurable outcomes (people reached, funds raised, wins, publications). When uncertain, choose the lower tier—overrating does not improve outcomes." },
    { q: "Tier 1 examples", a: "International Olympiad medalist/qualifier, national science fair winner, research with major recognition, nationally ranked athlete, major national arts/music award." },
    { q: "Tier 2 examples", a: "State/provincial finalist, regional champion, president of a large org with measurable outcomes, varsity captain with major wins, selective summer research with strong outcomes." },
    { q: "Tier 3 examples", a: "School club officer with meaningful initiatives, sustained volunteering with clear responsibilities, community project with measurable results, research assistant role without publications." },
    { q: "Tier 4 examples", a: "Member without leadership, occasional volunteering, short-term activities without sustained commitment, minimal outcomes or recognition." },
    { q: "How can I improve my EC tier over time?", a: "Go deeper, not wider. Pick 1–2 activities and increase responsibility + measurable outcomes: lead a project, scale impact, win a competitive award, publish/present research, or build something adopted by others." },
    { q: "Does this tool work internationally?", a: "Yes. The calculator is not region-locked. It estimates probability based on your stats vs each school’s typical ranges and selectivity. Results are informational and not a guarantee." },
    { q: "Do you guarantee admission?", a: "No. Admissions are holistic and vary by year. Essays, recommendations, course context, institutional priorities, and the applicant pool matter." },
    { q: "How does ROI (net price estimate) work?", a: "Projected Net Price = Sticker Price − (Average Aid × (120,000 / Income)). Sticker price uses a placeholder unless you add it to your CSV." },
  ]), []);

  // Load CSV
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
    return { ...c, roi };
  }, [school, profile]);

  // Reset AI when switching schools
  useEffect(() => {
    setAiData(null);
    setAiRaw("");
    setAiError("");
  }, [school?.id]);

  // AdSense Auto Ads (one snippet). Enable Auto ads in AdSense UI.
  useEffect(() => {
    const existing = document.querySelector('script[src*="adsbygoogle.js"]');
    if (!existing) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      s.crossOrigin = 'anonymous';
      document.head.appendChild(s);
    }
  }, []);

  // Global SEO meta + JSON-LD
  useEffect(() => {
    const schoolName = school?.name || 'Top Universities';
    const title = `Global Chance Me Calculator for ${schoolName} | Elite ChanceMe`;
    document.title = title;

    const description = `Estimate admission chances for ${schoolName} using GPA, SAT/ACT, AP/IB rigor, and extracurricular (EC) tiers. Includes ROI estimate and optional AI explanation. Worldwide admissions tool.`;

    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', `chance me calculator, global college admissions calculator, international admissions predictor, ${schoolName} chance me, EC tiers, extracurricular tiers, SAT ACT admissions, GPA admissions, AP IB rigor, admissions probability, net price estimate, financial aid estimate`);
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1');

    // OpenGraph / Twitter
    const setPropMeta = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setPropMeta('og:title', title);
    setPropMeta('og:description', description);
    setPropMeta('og:type', 'website');
    setPropMeta('og:url', 'https://calgaryacademicexcellence.com/elite-chance-me');

    const setTwitter = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setTwitter('twitter:card', 'summary');
    setTwitter('twitter:title', title);
    setTwitter('twitter:description', description);

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', 'https://calgaryacademicexcellence.com/elite-chance-me');

    // JSON-LD schemas
    const faqEntities = faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }));

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Elite ChanceMe College Admissions Probability Calculator (Worldwide)",
        applicationCategory: "EducationalApplication",
        description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "Single-school admission probability, EC tiers, AP/IB rigor impact, SAT/ACT benchmarking, ROI estimate, AI explanation",
        operatingSystem: "Web Browser",
        creator: { "@type": "Organization", name: "Calgary Academic Excellence", url: "https://calgaryacademicexcellence.com" }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqEntities
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://calgaryacademicexcellence.com/" },
          { "@type": "ListItem", position: 2, name: "Elite ChanceMe", item: "https://calgaryacademicexcellence.com/elite-chance-me" }
        ]
      }
    ];

    schemas.forEach((schema, index) => {
      const id = `elite-global-schema-${index}`;
      let scriptTag = document.getElementById(id);
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = id;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    });
  }, [school, faqItems]);

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
- UW GPA: ${profile.gpaUW}
- ${profile.testType.toUpperCase()}: ${profile.testType === "sat" ? profile.sat : profile.act}
- AP/IB count: ${profile.apCount}
- EC tier: ${profile.ecTier}
- Leadership: ${profile.leadership ? "Yes" : "No"}
- First-gen: ${profile.firstGen ? "Yes" : "No"}
- Legacy: ${profile.legacy ? "Yes" : "No"}
- Intended major: ${profile.major || "Not specified"}

MODEL OUTPUT:
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
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow">
              <GraduationCap />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Elite ChanceMe</h1>
              <p className="text-slate-600 font-medium">Loading schools…</p>
            </div>
          </div>
          <div className="mt-10 rounded-3xl border border-slate-100 bg-slate-50 p-8 flex items-center gap-4">
            <div className="h-3 w-3 rounded-full bg-indigo-600 animate-pulse" />
            <div className="font-black">Reading {CSV_PATH}</div>
          </div>
        </div>
      </div>
    );
  }

  if (dbError) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow">
              <GraduationCap />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Elite ChanceMe</h1>
              <p className="text-slate-600 font-medium">Error</p>
            </div>
          </div>
          <div className="mt-10 rounded-3xl border border-red-100 bg-red-50 p-8 flex items-start gap-4">
            <AlertTriangle className="text-red-600 mt-1" />
            <div>
              <div className="font-black text-red-900">Could not load CSV</div>
              <div className="text-red-700 mt-1">{dbError}</div>
              <div className="text-red-700 mt-2 text-sm">Confirm your CSV is at <span className="font-black">public/excel/cleaned_collegerankings.csv</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!school || !computed) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2">
            <School className="text-indigo-600" />
            <span className="font-black">Select School</span>
          </div>

          <div className="md:ml-auto w-full md:w-[560px] relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              list="school-list"
              value={selectedName}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedName(val);
                const found = db.find((s) => s.name.toLowerCase() === val.toLowerCase());
                if (found) setSchool(found);
              }}
              className="w-full rounded-2xl bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 font-black outline-none focus:ring-4 ring-indigo-50"
              placeholder="Type to search (e.g., Princeton, Harvard, Oxford)…"
            />
            <datalist id="school-list">
              {db.map((s) => (
                <option key={s.id} value={s.name} />
              ))}
            </datalist>
          </div>

          <div className="text-xs text-slate-500 font-semibold">{school.type} #{school.rank} • {(school.acceptanceRate * 100).toFixed(1)}% admit</div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow">
            <GraduationCap />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Chance Me: {school.name}</h1>
            <p className="text-slate-600 font-medium mt-1">Single-school admissions estimate + explanation. Built for global users.</p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-8">
          {/* LEFT: Form + FAQ below it */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
              <div className="font-black text-xl">Your profile</div>
              <div className="text-slate-600 font-medium mt-1">Adjust sliders and options.</div>

              <div className="mt-6">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-black tracking-widest text-slate-500 uppercase">UW GPA</label>
                  <div className="font-black">{Number(profile.gpaUW).toFixed(2)}</div>
                </div>
                <input type="range" min="2.0" max="4.0" step="0.01" value={profile.gpaUW}
                  onChange={(e) => setProfile((p) => ({ ...p, gpaUW: Number(e.target.value) }))}
                  className="w-full mt-2 accent-indigo-600" />
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <button onClick={() => setProfile((p) => ({ ...p, testType: "sat" }))}
                    className={`px-4 py-2 rounded-full font-black text-xs tracking-widest ${profile.testType === "sat" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>SAT</button>
                  <button onClick={() => setProfile((p) => ({ ...p, testType: "act" }))}
                    className={`px-4 py-2 rounded-full font-black text-xs tracking-widest ${profile.testType === "act" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>ACT</button>
                </div>

                {profile.testType === "sat" ? (
                  <div className="mt-4">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-black tracking-widest text-slate-500 uppercase">SAT Total</label>
                      <div className="font-black">{profile.sat}</div>
                    </div>
                    <input type="range" min="800" max="1600" step="10" value={profile.sat}
                      onChange={(e) => setProfile((p) => ({ ...p, sat: Number(e.target.value) }))}
                      className="w-full mt-2 accent-indigo-600" />
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-black tracking-widest text-slate-500 uppercase">ACT Composite</label>
                      <div className="font-black">{profile.act}</div>
                    </div>
                    <input type="range" min="1" max="36" step="1" value={profile.act}
                      onChange={(e) => setProfile((p) => ({ ...p, act: Number(e.target.value) }))}
                      className="w-full mt-2 accent-indigo-600" />
                  </div>
                )}
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black tracking-widest text-slate-500 uppercase">AP/IB Count</label>
                  <input type="number" value={profile.apCount}
                    onChange={(e) => setProfile((p) => ({ ...p, apCount: Number(e.target.value) }))}
                    className="mt-2 w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 font-black outline-none" />
                </div>
                <div>
                  <label className="text-xs font-black tracking-widest text-slate-500 uppercase">EC Tier</label>
                  <select value={profile.ecTier}
                    onChange={(e) => setProfile((p) => ({ ...p, ecTier: e.target.value }))}
                    className="mt-2 w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 font-black outline-none" >
                    <option value="1">Tier 1 (national/international)</option>
                    <option value="2">Tier 2 (state/regional leadership)</option>
                    <option value="3">Tier 3 (school/community impact)</option>
                    <option value="4">Tier 4 (participation)</option>
                  </select>
                  <div className="mt-2 text-xs text-slate-500">Not sure? See the FAQ below for examples.</div>
                </div>
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {[{ k: "leadership", label: "Leadership" }, { k: "firstGen", label: "First-gen" }, { k: "legacy", label: "Legacy" }].map((x) => (
                  <button key={x.k}
                    onClick={() => setProfile((p) => ({ ...p, [x.k]: !p[x.k] }))}
                    className={`rounded-2xl border px-4 py-3 font-black transition ${profile[x.k] ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <label className="text-xs font-black tracking-widest text-slate-500 uppercase">Intended major (optional)</label>
                <input value={profile.major}
                  onChange={(e) => setProfile((p) => ({ ...p, major: e.target.value }))}
                  className="mt-2 w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 font-black outline-none"
                  placeholder="e.g., Computer Science, Economics…" />
              </div>

              <div className="mt-6">
                <label className="text-xs font-black tracking-widest text-slate-500 uppercase">Family income</label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-4 top-3.5 text-indigo-600" size={18} />
                  <input type="number" value={profile.income}
                    onChange={(e) => setProfile((p) => ({ ...p, income: Number(e.target.value) }))}
                    className="w-full rounded-2xl bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 font-black outline-none" />
                </div>
              </div>

              <button onClick={generateAIExplanation}
                className="mt-6 w-full rounded-2xl bg-slate-900 text-white py-4 font-black text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-3">
                {aiLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                {aiLoading ? "Generating…" : "AI Explanation (this school only)"}
              </button>

              {aiError && (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-sm font-bold">{aiError}</div>
              )}

              <div className="mt-4 text-xs text-slate-500 leading-relaxed">
                <Info className="inline-block mr-1 -mt-1" size={14} />
                AdSense uses Auto ads (configured in AdSense). AI requires <span className="font-black">VITE_GOOGLE_AI_KEY</span>.
              </div>
            </div>

            {/* FAQ BELOW FORM */}
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-black tracking-tight">Frequently Asked Questions (EC tiers)</h2>
              <p className="text-slate-600 font-medium mt-1">Helpful guidance for choosing EC tiers and understanding results.</p>
              <div className="mt-6 space-y-4">
                {faqItems.map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <button onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                      className="w-full text-left flex items-center justify-between gap-4">
                      <div className="font-black text-slate-900">{item.q}</div>
                      {expandedFAQ === idx ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {expandedFAQ === idx && (
                      <div className="mt-3 text-slate-700 font-medium leading-relaxed">{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-[2.5rem] bg-slate-900 text-white p-8 shadow-lg">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs font-black tracking-widest text-indigo-200 uppercase">Estimated chance</div>
                  <div className="mt-2 text-6xl font-black">{formatPct(computed.p)}</div>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 font-black text-sm">
                    <ShieldCheck size={18} className="text-indigo-300" />
                    {computed.label}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 w-[280px]">
                  <div className="text-xs font-black tracking-widest text-indigo-200 uppercase">ROI estimate</div>
                  <div className="text-sm text-slate-200 mt-1">Avg Aid + income formula</div>
                  <div className="mt-2 text-2xl font-black">{formatMoney(computed.roi)}</div>
                  <div className="text-[11px] text-slate-300 mt-2">Sticker uses placeholder {STICKER_PLACEHOLDER}.</div>
                </div>
              </div>
            </div>

            {(aiLoading || aiData || aiRaw) && (
              <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
                <div className="font-black text-xl">AI explanation (formatted)</div>
                <div className="text-slate-600 font-medium mt-1">Generated specifically for {school.name}.</div>

                {aiLoading ? (
                  <div className="mt-5 text-slate-700 font-medium">Generating…</div>
                ) : aiData ? (
                  <div className="mt-6 space-y-8">
                    <div>
                      <div className="text-2xl font-black text-slate-900">{aiData.headline}</div>
                      {aiData.summary && <div className="mt-2 text-slate-700 font-medium">{aiData.summary}</div>}
                    </div>
                    <div>
                      <div className="text-xs font-black tracking-widest text-slate-500 uppercase">Why</div>
                      <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-700 font-medium">
                        {aiData.reasons.map((x, i) => <li key={i}>{x}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-black tracking-widest text-slate-500 uppercase">Improvements</div>
                      <ol className="mt-3 space-y-2 list-decimal pl-5 text-slate-700 font-medium">
                        {aiData.improvements.map((x, i) => <li key={i}>{x}</li>)}
                      </ol>
                    </div>
                    <div>
                      <div className="text-xs font-black tracking-widest text-slate-500 uppercase">Narrative spike ideas</div>
                      <div className="mt-3 grid md:grid-cols-2 gap-3">
                        {aiData.spikeIdeas.map((x, i) => (
                          <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 font-semibold text-slate-800">{x}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <pre className="mt-5 whitespace-pre-wrap text-slate-700 font-medium leading-relaxed">{aiRaw}</pre>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
