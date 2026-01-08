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
  // Requirement: Top 300 Research + Top 30 LAC
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

// ROI formula from your design doc:
// Projected_Net_Price = Sticker - (Avg_Aid * (120,000 / Income))
function computeNetPriceEstimate(sticker, avgAid, income) {
  const inc = Math.max(1, toNum(income, 95000));
  const aidAdjusted = avgAid * (INCOME_REFERENCE / inc);
  return Math.max(0, sticker - aidAdjusted);
}

// Deterministic, transparent chance model (works without AI)
function computeChance(profile, school) {
  const gpaUW = toNum(profile.gpaUW, NaN);
  const apCount = toNum(profile.apCount, 0);
  const testType = profile.testType || "sat";
  const testScore = testType === "act" ? toNum(profile.act, NaN) : toNum(profile.sat, NaN);

  const gpaMid = school.gpaLow && school.gpaHigh ? (school.gpaLow + school.gpaHigh) / 2 : 3.85;
  const satMid = school.satLow && school.satHigh ? (school.satLow + school.satHigh) / 2 : 1450;
  const actMid = school.actLow && school.actHigh ? (school.actLow + school.actHigh) / 2 : 33;

  // relative to mid-range
  const gpaDelta = Number.isFinite(gpaUW) ? (gpaUW - gpaMid) / 0.15 : 0;
  const testDelta =
    Number.isFinite(testScore)
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

  // anchor to acceptance rate
  const base = clamp(school.acceptanceRate, 0.005, 0.95);
  const adjustedLogit = logit(base) + 2.15 * (overall - 0.5) + leadershipBoost + firstGenBoost + legacyBoost;
  const p = clamp(sigmoid(adjustedLogit), 0.01, 0.95);

  const label = p < 0.12 ? "Reach" : p < 0.35 ? "Match" : "Likely";

  const reasons = [];
  if (Number.isFinite(gpaUW) && school.gpaLow && gpaUW < school.gpaLow)
    reasons.push(`UW GPA is below typical range (${school.gpaLow.toFixed(2)}–${school.gpaHigh?.toFixed?.(2) ?? "?"}).`);
  if (Number.isFinite(gpaUW) && school.gpaHigh && gpaUW >= school.gpaHigh)
    reasons.push("UW GPA is at/above the upper end of the typical range.");

  if (Number.isFinite(testScore)) {
    const low = testType === "act" ? school.actLow : school.satLow;
    const high = testType === "act" ? school.actHigh : school.satHigh;
    if (low && testScore < low) reasons.push(`${testType.toUpperCase()} is below typical range (${low}–${high}).`);
    if (high && testScore >= high) reasons.push(`${testType.toUpperCase()} is at/above the upper end of typical range.`);
  } else {
    reasons.push("No test score provided — estimate is less confident.");
  }

  if (rigorNorm >= 0.75) reasons.push("Course rigor looks strong (AP/IB count suggests advanced load)." );
  if (ecNorm >= 0.75) reasons.push(`EC tier indicates high-impact involvement (Tier ${tier}).`);

  if (fitScore >= 0.7) reasons.push("Intended major aligns with the school’s notable strengths.");
  else reasons.push("Major alignment is unclear — essays/fit can swing outcomes more.");

  return { p, label, reasons, overall, gpaMid, satMid, actMid };
}

function formatPct(p) {
  return `${(p * 100).toFixed(1)}%`;
}

function formatMoney(n) {
  try {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `$${Math.round(n).toLocaleString()}`;
  }
}

// Decode common HTML entities in model output (e.g., &amp; -> &)
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

// Extract the first JSON object from a string (robust to extra text/backticks)
function extractJsonObject(raw) {
  if (!raw) return null;
  const s = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

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

export default function EliteChanceMe() {
  const [loadingDb, setLoadingDb] = useState(true);
  const [dbError, setDbError] = useState("");
  const [db, setDb] = useState([]);

  // dropdown selection
  const [selectedName, setSelectedName] = useState("");
  const [school, setSchool] = useState(null);

  // inputs
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

  // AI explanation (structured)
  const [aiLoading, setAiLoading] = useState(false);
  const [aiData, setAiData] = useState(null); // structured JSON
  const [aiRaw, setAiRaw] = useState("");   // fallback text
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

  // clear AI when switching schools
  useEffect(() => {
    setAiData(null);
    setAiRaw("");
    setAiError("");
  }, [school?.id]);

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
        // normalize missing fields
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
      <div className="min-h-screen bg-white pt-24">
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
      <div className="min-h-screen bg-white pt-24">
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
              <div className="text-red-700 mt-2 text-sm">
                Confirm your CSV is at <span className="font-black">public/excel/cleaned_collegerankings.csv</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!school || !computed) return null;

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Sticky school selector */}
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
              placeholder="Type to search (e.g., UC Berkeley, Harvard, Williams)…"
            />
            <datalist id="school-list">
              {db.map((s) => (
                <option key={s.id} value={s.name} />
              ))}
            </datalist>
          </div>

          <div className="text-xs text-slate-500 font-semibold">
            {school.type} #{school.rank} • {(school.acceptanceRate * 100).toFixed(1)}% admit
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Title */}
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow">
            <GraduationCap />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Chance Me: {school.name}</h1>
            <p className="text-slate-600 font-medium mt-1">One-school probability + reasons. AI rendered as structured cards.</p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-5 rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
            <div className="font-black text-xl">Your profile</div>
            <div className="text-slate-600 font-medium mt-1">Adjust sliders and options.</div>

            {/* GPA */}
            <div className="mt-6">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black tracking-widest text-slate-500 uppercase">UW GPA</label>
                <div className="font-black">{Number(profile.gpaUW).toFixed(2)}</div>
              </div>
              <input type="range" min="2.0" max="4.0" step="0.01" value={profile.gpaUW}
                onChange={(e) => setProfile((p) => ({ ...p, gpaUW: Number(e.target.value) }))}
                className="w-full mt-2 accent-indigo-600" />
            </div>

            {/* Test */}
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

            {/* Holistic */}
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
                  <option value="1">Tier 1 (best)</option>
                  <option value="2">Tier 2</option>
                  <option value="3">Tier 3</option>
                  <option value="4">Tier 4</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              {[
                { k: "leadership", label: "Leadership" },
                { k: "firstGen", label: "First-gen" },
                { k: "legacy", label: "Legacy" },
              ].map((x) => (
                <button key={x.k}
                  onClick={() => setProfile((p) => ({ ...p, [x.k]: !p[x.k] }))}
                  className={`rounded-2xl border px-4 py-3 font-black transition ${profile[x.k] ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                >{x.label}</button>
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
              {aiLoading ? "Generating…" : "AI Explanation (formatted, 1 school)"}
            </button>

            {aiError && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-sm font-bold">
                {aiError}
              </div>
            )}

            <div className="mt-4 text-xs text-slate-500 leading-relaxed">
              <Info className="inline-block mr-1 -mt-1" size={14} />
              No extra npm installs. AI requires <span className="font-black">VITE_GOOGLE_AI_KEY</span>.
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 space-y-8">
            {/* Big chance */}
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

            {/* Percentile table */}
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
              <div className="font-black text-xl">How you compare</div>
              <div className="text-slate-600 font-medium mt-1">25th / Typical(mid) / 75th from CSV ranges.</div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-black uppercase tracking-widest text-slate-500">
                      <th className="py-2">Metric</th>
                      <th className="py-2">25th</th>
                      <th className="py-2">Typical</th>
                      <th className="py-2">75th</th>
                      <th className="py-2">You</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold">
                    <tr className="border-t border-slate-100">
                      <td className="py-3">UW GPA</td>
                      <td>{school.gpaLow?.toFixed?.(2) ?? "—"}</td>
                      <td>{computed.gpaMid?.toFixed?.(2) ?? "—"}</td>
                      <td>{school.gpaHigh?.toFixed?.(2) ?? "—"}</td>
                      <td className="font-black">{Number(profile.gpaUW).toFixed(2)}</td>
                    </tr>
                    <tr className="border-t border-slate-100">
                      <td className="py-3">{profile.testType.toUpperCase()}</td>
                      <td>{profile.testType === "act" ? (school.actLow ?? "—") : (school.satLow ?? "—")}</td>
                      <td>{profile.testType === "act" ? (computed.actMid?.toFixed?.(0) ?? "—") : (computed.satMid?.toFixed?.(0) ?? "—")}</td>
                      <td>{profile.testType === "act" ? (school.actHigh ?? "—") : (school.satHigh ?? "—")}</td>
                      <td className="font-black">{profile.testType === "act" ? profile.act : profile.sat}</td>
                    </tr>
                    <tr className="border-t border-slate-100">
                      <td className="py-3">Acceptance rate</td>
                      <td colSpan={3} className="text-slate-600 font-semibold">School baseline</td>
                      <td className="font-black">{(school.acceptanceRate * 100).toFixed(1)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reasons */}
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
              <div className="font-black text-xl">Why (data-driven)</div>
              <div className="text-slate-600 font-medium mt-1">Transparent reasons tied to this school only.</div>
              <div className="mt-5 space-y-3">
                {computed.reasons.map((r, idx) => (
                  <div key={idx} className="rounded-2xl bg-slate-50 border border-slate-100 p-4 font-semibold text-slate-700">
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* AI formatted */}
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
                      {aiData.summary && (
                        <div className="mt-2 text-slate-700 font-medium">{aiData.summary}</div>
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-black tracking-widest text-slate-500 uppercase">Why</div>
                      <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-700 font-medium">
                        {aiData.reasons.map((x, i) => (
                          <li key={i}>{x}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-xs font-black tracking-widest text-slate-500 uppercase">Improvements</div>
                      <ol className="mt-3 space-y-2 list-decimal pl-5 text-slate-700 font-medium">
                        {aiData.improvements.map((x, i) => (
                          <li key={i}>{x}</li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <div className="text-xs font-black tracking-widest text-slate-500 uppercase">Narrative spike ideas</div>
                      <div className="mt-3 grid md:grid-cols-2 gap-3">
                        {aiData.spikeIdeas.map((x, i) => (
                          <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 font-semibold text-slate-800">
                            {x}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <pre className="mt-5 whitespace-pre-wrap text-slate-700 font-medium leading-relaxed">{aiRaw}</pre>
                )}
              </div>
            )}

            {/* Similar schools */}
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
              <div className="font-black text-xl">Similar schools</div>
              <div className="text-slate-600 font-medium mt-1">Closest predicted chances from your dataset.</div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                {computed.similar.map(({ s, r }) => (
                  <button key={s.id}
                    onClick={() => { setSchool(s); setSelectedName(s.name); }}
                    className="text-left rounded-2xl bg-slate-50 border border-slate-100 p-4 hover:shadow-sm transition">
                    <div className="font-black">{s.name}</div>
                    <div className="text-sm text-slate-600 font-semibold">{formatPct(r.p)} • {r.label} • {s.type} #{s.rank}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-xs text-slate-500">
                <Info className="inline-block mr-1 -mt-1" size={14} />
                Use the selector at the top to switch schools quickly.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-slate-500">CSV source: <span className="font-black">{CSV_PATH}</span></div>
      </div>
    </div>
  );
}
