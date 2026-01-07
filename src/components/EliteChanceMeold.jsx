import React, { useState, useEffect, useMemo } from 'react';
import { 
  Target, Brain, Award, Star, ShieldCheck, Zap, 
  Search, Info, ChevronRight, GraduationCap, 
  School, BookOpen, Loader, Sparkles, Activity, 
  AlertTriangle, Lightbulb, DollarSign, X, Plus
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, Legend, Tooltip as RechartsTooltip
} from 'recharts';

const EliteChanceMe = () => {
  const [step, setStep] = useState(1);
  const [db, setDb] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  
  const [profile, setProfile] = useState({
    gpaUW: '', gpaW: '', apCount: '',
    testType: 'sat', sat: '', act: '', 
    major: '', ecTier: '3', leadership: false, 
    legacy: false, firstGen: false, income: '95000'
  });

  // Dynamic CSV Loader with Rank/Type Intelligence
  useEffect(() => {
    fetch('/excel/cleaned_collegerankings.csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const data = lines.slice(1).map((line, idx) => {
          const cols = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
          const clean = (val) => val ? val.replace(/"/g, '').trim() : '';
          return {
            id: idx,
            rank: clean(cols[0]),
            name: clean(cols[1]),
            type: clean(cols[2]), // 'Research' or 'LAC'
            gpa_min: parseFloat(clean(cols[3])?.split('-')[0]) || 3.5,
            sat_max: parseInt(clean(cols[4])?.split('-')[1]) || 1400,
            act_max: parseInt(clean(cols[5])?.split('-')[1]) || 31,
            select: parseFloat(clean(cols[9])) || 0.20,
            avg_aid: parseInt(clean(cols[10])) || 40000,
            sticker: parseInt(clean(cols[15])) || 75000,
            strengths: clean(cols[14])
          };
        });
        setDb(data);
      });
  }, []);

  const radarData = useMemo(() => {
    const testScore = profile.testType === 'sat' ? (parseInt(profile.sat) / 1600) * 100 : (parseInt(profile.act) / 36) * 100;
    const gpaScore = (parseFloat(profile.gpaUW) / 4.0) * 100;
    const rigorScore = (Math.min(parseInt(profile.apCount), 12) / 12) * 100;
    const ecScore = ((5 - parseInt(profile.ecTier)) / 4) * 100;

    const base = [
      { subject: 'Academic Index', Student: gpaScore || 0 },
      { subject: 'Testing Power', Student: testScore || 0 },
      { subject: 'Course Rigor', Student: rigorScore || 0 },
      { subject: 'EC Impact', Student: ecScore || 0 },
      { subject: 'Institutional Fit', Student: profile.leadership ? 95 : 40 },
    ];

    selectedSchools.forEach(school => {
      base[0][school.name] = (school.gpa_min / 4.0) * 100;
      base[1][school.name] = (school.sat_max / 1600) * 100;
      base[2][school.name] = 90;
      base[3][school.name] = 85; 
      base[4][school.name] = 80;
    });
    return base;
  }, [selectedSchools, profile]);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY;
      const context = selectedSchools.map(s => `${s.name} (${s.type} Rank ${s.rank}, Strengths: ${s.strengths})`).join(" | ");
      const prompt = `Act as an Elite Admissions Consultant. Analyze: ${context}. Student: GPA UW ${profile.gpaUW}, W ${profile.gpaW}, APs: ${profile.apCount}, ${profile.testType.toUpperCase()}: ${profile.testType === 'sat' ? profile.sat : profile.act}. ECs: Tier ${profile.ecTier}, Major: ${profile.major}, Family Income: $${profile.income}. Output: 1. % Probability for each 2. Financial ROI advice 3. Specific narrative Spike.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      setResults(data.candidates[0].content.parts[0].text);
      setStep(3);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-16 gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 w-32 rounded-full transition-all duration-1000 ${step >= i ? 'bg-indigo-600 shadow-md' : 'bg-slate-100'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in duration-700 max-w-5xl mx-auto">
            <h1 className="text-7xl font-black text-center mb-16 tracking-tighter italic">Elite <span className="text-indigo-600">Decision</span></h1>
            <div className="relative mb-12">
               <Search className="absolute left-7 top-7 text-slate-300" size={28} />
               <input 
                className="w-full p-8 pl-18 rounded-[2.5rem] bg-slate-50 outline-none focus:ring-4 ring-indigo-50 font-black text-2xl"
                placeholder="Search Harvard, Williams, Richmond..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
               />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {db.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 12).map(school => (
                <button 
                  key={school.id}
                  onClick={() => setSelectedSchools(prev => prev.find(s => s.id === school.id) ? prev.filter(s => s.id !== school.id) : prev.length < 3 ? [...prev, school] : prev)}
                  className={`p-10 rounded-[3rem] border-4 transition-all text-left relative overflow-hidden ${selectedSchools.find(s => s.id === school.id) ? 'border-indigo-600 bg-indigo-50/30 shadow-xl' : 'border-transparent bg-white shadow-lg'}`}
                >
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded mb-4 inline-block ${school.type === 'LAC' ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>{school.type} Rank #{school.rank}</span>
                  <p className="font-black text-2xl leading-tight">{school.name}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <button onClick={() => setStep(2)} disabled={selectedSchools.length === 0} className="bg-slate-900 text-white px-20 py-7 rounded-[2.5rem] font-black flex items-center gap-4 hover:bg-indigo-600 shadow-2xl disabled:opacity-10 text-xl">
                Proceed to Strategy <ChevronRight />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-6xl mx-auto bg-white rounded-[4rem] p-20 shadow-2xl border border-slate-50 animate-in slide-in-from-bottom-10">
            <h2 className="text-5xl font-black mb-16 tracking-tight">Profile Matrix</h2>
            <div className="grid lg:grid-cols-2 gap-20">
              <div className="space-y-12">
                <section>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">Academics</label>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <input value={profile.gpaUW} onChange={e => setProfile({...profile, gpaUW: e.target.value})} className="p-6 bg-slate-50 rounded-2xl font-bold text-xl outline-none focus:ring-2 ring-indigo-500" placeholder="UW GPA (4.0)" />
                    <input value={profile.apCount} onChange={e => setProfile({...profile, apCount: e.target.value})} className="p-6 bg-slate-50 rounded-2xl font-bold text-xl outline-none focus:ring-2 ring-indigo-500" placeholder="Total APs" />
                  </div>
                  <div className="flex gap-4 p-1.5 bg-slate-50 rounded-2xl mb-6">
                    {['sat', 'act'].map(t => (
                      <button key={t} onClick={() => setProfile({...profile, testType: t})} className={`flex-1 py-5 rounded-xl font-black uppercase text-xs tracking-widest transition ${profile.testType === t ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400'}`}>{t}</button>
                    ))}
                  </div>
                  <input value={profile[profile.testType]} onChange={e => setProfile({...profile, [profile.testType]: e.target.value})} className="w-full p-6 bg-slate-50 rounded-2xl font-black text-2xl outline-none focus:ring-2 ring-indigo-500" placeholder={`${profile.testType.toUpperCase()} Composite`} />
                </section>
              </div>
              <div className="space-y-12">
                <section>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">Holistic & ROI</label>
                  <select value={profile.ecTier} onChange={e => setProfile({...profile, ecTier: e.target.value})} className="w-full p-6 bg-slate-50 rounded-2xl font-bold text-lg outline-none cursor-pointer mb-6">
                    <option value="1">Tier 1: National/Intl Honors</option>
                    <option value="2">Tier 2: Regional/State Leadership</option>
                    <option value="3">Tier 3: School Level Impact</option>
                    <option value="4">Tier 4: Passive Involvement</option>
                  </select>
                  <div className="relative">
                    <DollarSign className="absolute left-6 top-7 text-indigo-600" />
                    <input type="number" value={profile.income} onChange={e => setProfile({...profile, income: e.target.value})} className="w-full p-6 pl-14 bg-slate-50 rounded-2xl font-black text-2xl outline-none" placeholder="Annual Family Income" />
                  </div>
                </section>
                <input value={profile.major} onChange={e => setProfile({...profile, major: e.target.value})} className="w-full p-6 bg-slate-50 rounded-2xl font-bold text-lg outline-none" placeholder="Intended Major" />
              </div>
            </div>
            <button onClick={handleCalculate} disabled={loading} className="w-full mt-20 bg-slate-900 text-white font-[1000] py-9 rounded-[3rem] flex items-center justify-center gap-6 shadow-3xl hover:bg-indigo-600 transition-all text-2xl">
              {loading ? <Loader className="animate-spin" /> : <Sparkles size={32} />}
              {loading ? "Committee Deliberating..." : "Execute Simulation"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12 animate-in zoom-in-95 duration-1000">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 bg-slate-900 rounded-[4.5rem] p-20 text-white shadow-3xl">
                <div className="flex flex-col md:flex-row items-center gap-20">
                  <div className="space-y-12">
                    <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.5em]">The Verdict</p>
                    {selectedSchools.map((s, i) => (
                      <div key={i} className="group">
                        <div className="flex items-baseline gap-6">
                          <h3 className="text-8xl font-[1000] tracking-tighter group-hover:text-indigo-400 transition-colors">{results.match(/\d+%/g)?.[i] || '-%'}</h3>
                          <span className="text-indigo-200 font-black text-lg uppercase tracking-widest leading-none">{s.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: '900' }} />
                        <Radar name="You" dataKey="Student" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                        {selectedSchools.map((s, i) => (
                          <Radar key={i} name={s.name} dataKey={s.name} stroke={i === 0 ? "#10b981" : "#f59e0b"} fill="none" strokeWidth={3} />
                        ))}
                        <Legend wrapperStyle={{ paddingTop: '40px' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 bg-white rounded-[3.5rem] p-16 shadow-2xl border border-slate-50">
                <Brain className="text-indigo-600 mb-8" size={48} />
                <h4 className="text-3xl font-black mb-6 tracking-tight italic">Dean's Strategy</h4>
                <div className="text-slate-600 font-medium text-lg leading-relaxed whitespace-pre-line prose prose-slate">
                  {results}
                </div>
              </div>
            </div>
            <button onClick={() => setStep(1)} className="px-16 py-7 bg-slate-900 text-white rounded-[2.5rem] font-black hover:bg-indigo-600 shadow-3xl text-xl">New Comparison</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EliteChanceMe;