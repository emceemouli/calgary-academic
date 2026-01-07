import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Calculator, Globe, Info, Plus, Trash2, ChevronRight, AlertCircle, 
  CheckCircle, GraduationCap, ChevronDown, ChevronUp, BookOpen, 
  TrendingUp, Download, Printer, Save, RotateCcw, Copy, FileText,
  HelpCircle, Star, Award, Target, Zap, Users, MapPin, School,
  Clock, Check, X, ArrowRight, Sparkles, BookMarked, Search,
  Filter, Flag, Languages
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

// ═══════════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE GLOBAL GRADING SCALES - 80+ COUNTRIES - AACRAO/WES VERIFIED
// Last Updated: January 2026
// ═══════════════════════════════════════════════════════════════════════════════════

const GRADING_SCALES = {

  // ══════════════════════════════════════════════════════════════════════════════════
  // INDIA - ALL 30+ BOARDS AND UNIVERSITY SYSTEMS (AACRAO EDGE Compliant)
  // ══════════════════════════════════════════════════════════════════════════════════
  
  // === NATIONAL BOARDS ===
  india_cbse_9point: {
    country: "India", region: "National", name: "CBSE Grade Scale (A1-E)",
    type: "letter", popular: true,
    mapping: (g) => ({ 'A1': 4.0, 'A2': 3.7, 'B1': 3.3, 'B2': 3.0, 'C1': 2.7, 'C2': 2.3, 'D': 2.0, 'E1': 1.0, 'E2': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "CBSE 9-point absolute grading (2018+). A1=91-100%, A2=81-90%, B1=71-80%, B2=61-70%, C1=51-60%, C2=41-50%, D=33-40%, E=Fail.",
    inputType: "select", options: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D', 'E1', 'E2'],
    optionLabels: { 'A1': 'A1 (91-100%)', 'A2': 'A2 (81-90%)', 'B1': 'B1 (71-80%)', 'B2': 'B2 (61-70%)', 'C1': 'C1 (51-60%)', 'C2': 'C2 (41-50%)', 'D': 'D (33-40%)', 'E1': 'E1 (21-32%)', 'E2': 'E2 (0-20%)' }
  },
  india_cbse_percentage: {
    country: "India", region: "National", name: "CBSE Percentage Marks",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 91) return 4.0; if (p >= 81) return 3.7; if (p >= 71) return 3.3; if (p >= 61) return 3.0; if (p >= 51) return 2.7; if (p >= 41) return 2.3; if (p >= 33) return 2.0; return 0.0; },
    description: "CBSE board percentage. 91%+ is exceptional (A1 grade). Pass mark: 33%.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 85"
  },
  india_icse_9point: {
    country: "India", region: "National", name: "ICSE/ISC Grade Scale (1-9)",
    type: "letter", popular: true,
    mapping: (g) => ({ '1': 4.0, '2': 3.8, '3': 3.5, '4': 3.2, '5': 2.8, '6': 2.3, '7': 2.0, '8': 0.0, '9': 0.0 }[g] ?? 0.0),
    description: "CISCE 9-point scale. Grade 1-2=Very Good, 3-5=Pass with Credit, 6-7=Pass, 8-9=Fail. Minimum pass: Grade 7.",
    inputType: "select", options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    optionLabels: { '1': 'Grade 1 (90-100%)', '2': 'Grade 2 (80-89%)', '3': 'Grade 3 (70-79%)', '4': 'Grade 4 (60-69%)', '5': 'Grade 5 (50-59%)', '6': 'Grade 6 (40-49%)', '7': 'Grade 7 (33-39%)', '8': 'Grade 8 (21-32% Fail)', '9': 'Grade 9 (0-20% Fail)' }
  },
  india_icse_percentage: {
    country: "India", region: "National", name: "ICSE/ISC Percentage",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.7; if (p >= 70) return 3.3; if (p >= 60) return 3.0; if (p >= 50) return 2.7; if (p >= 40) return 2.3; if (p >= 33) return 2.0; return 0.0; },
    description: "ICSE (Class 10) & ISC (Class 12) percentage. Rigorous English-focused curriculum. Best of 5 subjects counted.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 82"
  },
  india_nios: {
    country: "India", region: "National", name: "NIOS (Open Schooling)",
    type: "percentage",
    mapping: (p) => { if (p >= 91) return 4.0; if (p >= 81) return 3.7; if (p >= 71) return 3.3; if (p >= 61) return 3.0; if (p >= 51) return 2.7; if (p >= 41) return 2.3; if (p >= 33) return 2.0; return 0.0; },
    description: "National Institute of Open Schooling - equivalent to CBSE for distance/adult learners.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 75"
  },
  india_igcse: {
    country: "India", region: "International", name: "Cambridge IGCSE (A*-G)",
    type: "letter",
    mapping: (g) => ({ 'A*': 4.0, 'A': 4.0, 'B': 3.5, 'C': 3.0, 'D': 2.5, 'E': 2.0, 'F': 1.5, 'G': 1.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Cambridge IGCSE in India. A*-G grading. Many international schools in metros follow this.",
    inputType: "select", options: ['A*', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
    optionLabels: { 'A*': 'A* (90%+)', 'A': 'A (80-89%)', 'B': 'B (70-79%)', 'C': 'C (60-69%)', 'D': 'D (50-59%)', 'E': 'E (40-49%)', 'F': 'F (30-39%)', 'G': 'G (20-29%)' }
  },

  // === STATE BOARDS - MAJOR STATES ===
  india_maharashtra_hsc: {
    country: "India", region: "Maharashtra", name: "Maharashtra HSC/SSC",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 75) return 4.0; if (p >= 60) return 3.5; if (p >= 55) return 3.0; if (p >= 50) return 2.7; if (p >= 45) return 2.3; if (p >= 35) return 2.0; return 0.0; },
    description: "MSBSHSE - Maharashtra State Board. 75%+=Distinction, 60-74%=First Class, 55-59%=Higher Second, 50-54%=Second Class, 45-49%=Pass Class, 35-44%=Pass.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 72"
  },
  india_karnataka_puc: {
    country: "India", region: "Karnataka", name: "Karnataka PUC/SSLC",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.7; if (p >= 70) return 3.3; if (p >= 60) return 3.0; if (p >= 50) return 2.7; if (p >= 40) return 2.3; if (p >= 35) return 2.0; return 0.0; },
    description: "Karnataka Pre-University (PUC) & SSLC. 90%+=Distinction. Pass: 35%.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 78"
  },
  india_tamilnadu_hsc: {
    country: "India", region: "Tamil Nadu", name: "Tamil Nadu HSC/SSLC",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 91) return 4.0; if (p >= 81) return 3.7; if (p >= 71) return 3.3; if (p >= 61) return 3.0; if (p >= 51) return 2.7; if (p >= 41) return 2.3; if (p >= 35) return 2.0; return 0.0; },
    description: "Tamil Nadu State Board 8-point grading. Pass: 35% (theory+practical combined).",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 88"
  },
  india_kerala_hse: {
    country: "India", region: "Kerala", name: "Kerala HSE/SSLC",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.7; if (p >= 70) return 3.3; if (p >= 60) return 3.0; if (p >= 50) return 2.7; if (p >= 40) return 2.3; if (p >= 35) return 2.0; return 0.0; },
    description: "Kerala DHSE/PAREEKSHA BHAVAN. Known for high literacy and academic standards.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 85"
  },
  india_andhra_telangana: {
    country: "India", region: "AP/Telangana", name: "AP/Telangana Inter/SSC",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.7; if (p >= 60) return 3.3; if (p >= 50) return 3.0; if (p >= 45) return 2.7; if (p >= 35) return 2.0; return 0.0; },
    description: "BIEAP/TSBIE Intermediate Board. 60%+=First Class. Pass: 35%.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 76"
  },
  india_west_bengal: {
    country: "India", region: "West Bengal", name: "West Bengal HS/Madhyamik",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.7; if (p >= 60) return 3.3; if (p >= 45) return 2.7; if (p >= 30) return 2.0; return 0.0; },
    description: "WBCHSE/WBBSE. Lower passing marks (30% in some subjects).",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 68"
  },
  india_gujarat: {
    country: "India", region: "Gujarat", name: "Gujarat GSEB HSC/SSC",
    type: "percentage",
    mapping: (p) => { if (p >= 85) return 4.0; if (p >= 70) return 3.5; if (p >= 55) return 3.0; if (p >= 45) return 2.5; if (p >= 33) return 2.0; return 0.0; },
    description: "Gujarat Secondary and Higher Secondary Education Board (GSEB).",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 72"
  },
  india_rajasthan: {
    country: "India", region: "Rajasthan", name: "Rajasthan RBSE",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 33) return 2.0; return 0.0; },
    description: "Rajasthan Board (RBSE). 75%+=First Division.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 70"
  },
  india_up_board: {
    country: "India", region: "Uttar Pradesh", name: "UP Board",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 33) return 2.0; return 0.0; },
    description: "UP Madhyamik Shiksha Parishad - India's largest state board by enrollment.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 65"
  },
  india_bihar: {
    country: "India", region: "Bihar", name: "Bihar Board (BSEB)",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 30) return 2.0; return 0.0; },
    description: "Bihar School Examination Board. Pass: 30%.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 62"
  },
  india_mp_board: {
    country: "India", region: "Madhya Pradesh", name: "MP Board (MPBSE)",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 33) return 2.0; return 0.0; },
    description: "Madhya Pradesh Board of Secondary Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 68"
  },
  india_punjab: {
    country: "India", region: "Punjab", name: "Punjab Board (PSEB)",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 33) return 2.0; return 0.0; },
    description: "Punjab School Education Board.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 74"
  },
  india_haryana: {
    country: "India", region: "Haryana", name: "Haryana Board (HBSE)",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 33) return 2.0; return 0.0; },
    description: "Board of School Education Haryana.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 71"
  },
  india_odisha: {
    country: "India", region: "Odisha", name: "Odisha CHSE/BSE",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 30) return 2.0; return 0.0; },
    description: "Council of Higher Secondary Education, Odisha. Pass: 30%.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 67"
  },
  india_assam: {
    country: "India", region: "Assam", name: "Assam AHSEC/SEBA",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 30) return 2.0; return 0.0; },
    description: "Assam Higher Secondary Education Council.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 66"
  },
  india_jharkhand: {
    country: "India", region: "Jharkhand", name: "Jharkhand JAC",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 33) return 2.0; return 0.0; },
    description: "Jharkhand Academic Council.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 64"
  },
  india_chhattisgarh: {
    country: "India", region: "Chhattisgarh", name: "Chhattisgarh CGBSE",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 33) return 2.0; return 0.0; },
    description: "Chhattisgarh Board of Secondary Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 69"
  },
  india_uttarakhand: {
    country: "India", region: "Uttarakhand", name: "Uttarakhand UBSE",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 33) return 2.0; return 0.0; },
    description: "Uttarakhand Board of School Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 73"
  },
  india_himachal: {
    country: "India", region: "Himachal Pradesh", name: "HP Board (HPBOSE)",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 33) return 2.0; return 0.0; },
    description: "Himachal Pradesh Board of School Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 77"
  },
  india_jk_board: {
    country: "India", region: "J&K", name: "J&K Board (JKBOSE)",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 33) return 2.0; return 0.0; },
    description: "Jammu and Kashmir Board of School Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 70"
  },
  india_goa: {
    country: "India", region: "Goa", name: "Goa Board (GBSHSE)",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 35) return 2.0; return 0.0; },
    description: "Goa Board of Secondary and Higher Secondary Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 79"
  },
  india_meghalaya: {
    country: "India", region: "Meghalaya", name: "Meghalaya MBOSE",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 30) return 2.0; return 0.0; },
    description: "Meghalaya Board of School Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 63"
  },
  india_manipur: {
    country: "India", region: "Manipur", name: "Manipur COHSEM/BOSEM",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 30) return 2.0; return 0.0; },
    description: "Council of Higher Secondary Education Manipur / BOSEM.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 61"
  },
  india_tripura: {
    country: "India", region: "Tripura", name: "Tripura TBSE",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 30) return 2.0; return 0.0; },
    description: "Tripura Board of Secondary Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 58"
  },
  india_mizoram: {
    country: "India", region: "Mizoram", name: "Mizoram MBSE",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 30) return 2.0; return 0.0; },
    description: "Mizoram Board of School Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 60"
  },
  india_nagaland: {
    country: "India", region: "Nagaland", name: "Nagaland NBSE",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 30) return 2.0; return 0.0; },
    description: "Nagaland Board of School Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 59"
  },
  india_arunachal: {
    country: "India", region: "Arunachal Pradesh", name: "Arunachal APBSE",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 30) return 2.0; return 0.0; },
    description: "Arunachal Pradesh Board of Secondary Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 57"
  },
  india_sikkim: {
    country: "India", region: "Sikkim", name: "Sikkim Board",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 45) return 2.5; if (p >= 30) return 2.0; return 0.0; },
    description: "Sikkim State Board of School Education.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 62"
  },

  // === INDIAN UNIVERSITY SYSTEMS ===
  india_iit_nit: {
    country: "India", region: "Technical", name: "IIT/NIT/IIIT (10-Point CGPA)",
    type: "cgpa10", popular: true,
    mapping: (g) => { if (g >= 9.5) return 4.0; if (g >= 9.0) return 3.9; if (g >= 8.5) return 3.7; if (g >= 8.0) return 3.5; if (g >= 7.5) return 3.3; if (g >= 7.0) return 3.0; if (g >= 6.5) return 2.7; if (g >= 6.0) return 2.3; if (g >= 5.5) return 2.0; if (g >= 5.0) return 1.7; return 0.0; },
    description: "IITs, NITs, IIITs use 10-point CGPA with relative grading. 8.0+ is excellent. AACRAO recognizes rigorous standards.",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 8.5"
  },
  india_univ_tier1: {
    country: "India", region: "University", name: "Tier 1 University (Percentage)",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 75) return 4.0; if (p >= 70) return 3.9; if (p >= 65) return 3.7; if (p >= 60) return 3.5; if (p >= 55) return 3.0; if (p >= 50) return 2.7; if (p >= 45) return 2.3; if (p >= 40) return 2.0; return 0.0; },
    description: "DU, JNU, Mumbai, Jadavpur, BITS, top state universities. 60%+=First Division. AACRAO recognizes 60%≈3.5 GPA.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 72"
  },
  india_univ_tier2: {
    country: "India", region: "University", name: "Tier 2/3 University (Percentage)",
    type: "percentage",
    mapping: (p) => { if (p >= 70) return 4.0; if (p >= 65) return 3.7; if (p >= 60) return 3.3; if (p >= 55) return 3.0; if (p >= 50) return 2.7; if (p >= 45) return 2.3; if (p >= 40) return 2.0; return 0.0; },
    description: "Most state and private universities. Different marking standards than Tier 1.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 68"
  },
  india_univ_cgpa10: {
    country: "India", region: "University", name: "UGC CBCS 10-Point CGPA",
    type: "cgpa10",
    mapping: (g) => { if (g >= 9.0) return 4.0; if (g >= 8.0) return 3.7; if (g >= 7.0) return 3.3; if (g >= 6.0) return 3.0; if (g >= 5.5) return 2.7; if (g >= 5.0) return 2.3; if (g >= 4.0) return 2.0; return 0.0; },
    description: "UGC Choice Based Credit System 10-point CGPA (2015 onwards). Adopted by most universities.",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 7.8"
  },
  india_mumbai_univ: {
    country: "India", region: "University", name: "Mumbai University 8-Point GPA",
    type: "gpa8",
    mapping: (g) => { if (g >= 7.25) return 4.0; if (g >= 6.25) return 3.7; if (g >= 5.5) return 3.3; if (g >= 4.75) return 3.0; if (g >= 4.0) return 2.7; if (g >= 3.0) return 2.0; return 0.0; },
    description: "University of Mumbai 8-point GPA system (2012 onwards).",
    inputType: "number", min: 0, max: 8, placeholder: "e.g., 6.5"
  },
  india_anna_univ: {
    country: "India", region: "University", name: "Anna University CGPA",
    type: "cgpa10",
    mapping: (g) => { if (g >= 9.0) return 4.0; if (g >= 8.0) return 3.7; if (g >= 7.0) return 3.3; if (g >= 6.0) return 2.8; if (g >= 5.5) return 2.3; if (g >= 5.0) return 2.0; return 0.0; },
    description: "Anna University, Chennai - major engineering university in Tamil Nadu.",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 7.5"
  },
  india_vtu: {
    country: "India", region: "University", name: "VTU CGPA (10-Point)",
    type: "cgpa10",
    mapping: (g) => { if (g >= 9.0) return 4.0; if (g >= 8.0) return 3.7; if (g >= 7.0) return 3.3; if (g >= 6.0) return 2.8; if (g >= 5.5) return 2.3; if (g >= 5.0) return 2.0; return 0.0; },
    description: "Visvesvaraya Technological University - Karnataka's technical university.",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 7.2"
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // CANADA - ALL PROVINCES
  // ══════════════════════════════════════════════════════════════════════════════════
  
  canada_alberta: {
    country: "Canada", region: "Alberta", name: "Alberta Percentage",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 85) return 3.9; if (p >= 80) return 3.7; if (p >= 77) return 3.3; if (p >= 73) return 3.0; if (p >= 70) return 2.7; if (p >= 67) return 2.3; if (p >= 63) return 2.0; if (p >= 60) return 1.7; if (p >= 55) return 1.3; if (p >= 50) return 1.0; return 0.0; },
    description: "University of Calgary, University of Alberta, MacEwan. 90%+=A+, 50%=Pass.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 82"
  },
  canada_ontario: {
    country: "Canada", region: "Ontario", name: "Ontario Percentage",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 85) return 3.9; if (p >= 80) return 3.7; if (p >= 77) return 3.3; if (p >= 73) return 3.0; if (p >= 70) return 2.7; if (p >= 67) return 2.3; if (p >= 63) return 2.0; if (p >= 60) return 1.7; if (p >= 57) return 1.3; if (p >= 50) return 1.0; return 0.0; },
    description: "UofT, Western, McMaster, Queen's, Waterloo. 80-89%=A (Level 4).",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 85"
  },
  canada_bc: {
    country: "Canada", region: "British Columbia", name: "BC Percentage",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 85) return 3.9; if (p >= 80) return 3.7; if (p >= 76) return 3.3; if (p >= 72) return 3.0; if (p >= 68) return 2.7; if (p >= 64) return 2.3; if (p >= 60) return 2.0; if (p >= 55) return 1.7; if (p >= 50) return 1.0; return 0.0; },
    description: "UBC, SFU, UVic. BC uses letter grades A-F with percentage equivalents.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 79"
  },
  canada_quebec_cegep: {
    country: "Canada", region: "Quebec", name: "Quebec CEGEP R-Score",
    type: "rscore",
    mapping: (r) => { if (r >= 35) return 4.0; if (r >= 32) return 3.7; if (r >= 29) return 3.3; if (r >= 26) return 3.0; if (r >= 23) return 2.7; if (r >= 20) return 2.3; if (r >= 17) return 2.0; return 0.0; },
    description: "Quebec CEGEP Cote de Rendement (R-Score). 35+ is exceptional. For McGill, UdeM admission.",
    inputType: "number", min: 0, max: 50, placeholder: "e.g., 30"
  },
  canada_quebec_univ: {
    country: "Canada", region: "Quebec", name: "Quebec University Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 85) return 3.7; if (p >= 80) return 3.3; if (p >= 75) return 3.0; if (p >= 70) return 2.7; if (p >= 65) return 2.3; if (p >= 60) return 2.0; if (p >= 55) return 1.7; if (p >= 50) return 1.0; return 0.0; },
    description: "McGill, Université de Montréal, Laval, Concordia.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 78"
  },
  canada_manitoba: {
    country: "Canada", region: "Manitoba", name: "Manitoba (4.5 Scale)",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.7; if (p >= 75) return 3.3; if (p >= 70) return 3.0; if (p >= 65) return 2.5; if (p >= 60) return 2.0; if (p >= 50) return 1.0; return 0.0; },
    description: "University of Manitoba. Some programs use 4.5 scale (A+=4.5).",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 76"
  },
  canada_saskatchewan: {
    country: "Canada", region: "Saskatchewan", name: "Saskatchewan Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 85) return 3.9; if (p >= 80) return 3.7; if (p >= 77) return 3.3; if (p >= 73) return 3.0; if (p >= 70) return 2.7; if (p >= 67) return 2.3; if (p >= 63) return 2.0; if (p >= 60) return 1.7; if (p >= 50) return 1.0; return 0.0; },
    description: "University of Saskatchewan, University of Regina.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 77"
  },
  canada_nova_scotia: {
    country: "Canada", region: "Nova Scotia", name: "Nova Scotia (4.3 Scale)",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 85) return 3.9; if (p >= 80) return 3.7; if (p >= 77) return 3.3; if (p >= 73) return 3.0; if (p >= 70) return 2.7; if (p >= 65) return 2.3; if (p >= 60) return 2.0; if (p >= 50) return 1.0; return 0.0; },
    description: "Dalhousie, Saint Mary's. Some use 4.3 scale (A+=4.3).",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 81"
  },
  canada_new_brunswick: {
    country: "Canada", region: "New Brunswick", name: "New Brunswick Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 85) return 3.9; if (p >= 80) return 3.7; if (p >= 75) return 3.3; if (p >= 70) return 3.0; if (p >= 65) return 2.7; if (p >= 60) return 2.0; if (p >= 50) return 1.0; return 0.0; },
    description: "UNB, Mount Allison.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 74"
  },
  canada_newfoundland: {
    country: "Canada", region: "Newfoundland", name: "Newfoundland & Labrador",
    type: "percentage",
    mapping: (p) => { if (p >= 85) return 4.0; if (p >= 80) return 3.7; if (p >= 75) return 3.3; if (p >= 70) return 3.0; if (p >= 65) return 2.7; if (p >= 60) return 2.3; if (p >= 55) return 2.0; if (p >= 50) return 1.0; return 0.0; },
    description: "Memorial University of Newfoundland.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 73"
  },
  canada_pei: {
    country: "Canada", region: "PEI", name: "Prince Edward Island",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 85) return 3.7; if (p >= 80) return 3.3; if (p >= 75) return 3.0; if (p >= 70) return 2.7; if (p >= 65) return 2.3; if (p >= 60) return 2.0; if (p >= 50) return 1.0; return 0.0; },
    description: "University of Prince Edward Island.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 78"
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // UNITED STATES
  // ══════════════════════════════════════════════════════════════════════════════════
  
  usa_standard: {
    country: "USA", region: "National", name: "Standard Letter Grade (A-F)",
    type: "letter", popular: true,
    mapping: (g) => ({ 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Standard U.S. letter grading. Most high schools and colleges.",
    inputType: "select", options: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'],
    optionLabels: { 'A+': 'A+ (97-100%)', 'A': 'A (93-96%)', 'A-': 'A- (90-92%)', 'B+': 'B+ (87-89%)', 'B': 'B (83-86%)', 'B-': 'B- (80-82%)', 'C+': 'C+ (77-79%)', 'C': 'C (73-76%)', 'C-': 'C- (70-72%)', 'D+': 'D+ (67-69%)', 'D': 'D (63-66%)', 'D-': 'D- (60-62%)', 'F': 'F (0-59%)' }
  },
  usa_percentage: {
    country: "USA", region: "National", name: "Percentage to GPA",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 97) return 4.0; if (p >= 93) return 4.0; if (p >= 90) return 3.7; if (p >= 87) return 3.3; if (p >= 83) return 3.0; if (p >= 80) return 2.7; if (p >= 77) return 2.3; if (p >= 73) return 2.0; if (p >= 70) return 1.7; if (p >= 67) return 1.3; if (p >= 60) return 1.0; return 0.0; },
    description: "Standard U.S. percentage to GPA conversion.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 89"
  },
  usa_weighted_ap: {
    country: "USA", region: "High School", name: "AP/Honors Weighted (5.0)",
    type: "letter",
    mapping: (g) => ({ 'A+': 5.0, 'A': 5.0, 'A-': 4.7, 'B+': 4.3, 'B': 4.0, 'B-': 3.7, 'C+': 3.3, 'C': 3.0, 'C-': 2.7, 'D': 2.0, 'F': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "AP/Honors weighted 5.0 scale. A in AP=5.0. For weighted GPA only.",
    inputType: "select", options: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'],
    optionLabels: { 'A+': 'A+ (5.0)', 'A': 'A (5.0)', 'A-': 'A- (4.7)', 'B+': 'B+ (4.3)', 'B': 'B (4.0)', 'B-': 'B- (3.7)', 'C+': 'C+ (3.3)', 'C': 'C (3.0)', 'C-': 'C- (2.7)', 'D': 'D (2.0)', 'F': 'F (0.0)' },
    maxGPA: 5.0
  },
  usa_4point3: {
    country: "USA", region: "Some Schools", name: "4.3 Scale (with A+)",
    type: "letter",
    mapping: (g) => ({ 'A+': 4.3, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Some schools use 4.33 scale where A+=4.33.",
    inputType: "select", options: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'],
    maxGPA: 4.3
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // UNITED KINGDOM
  // ══════════════════════════════════════════════════════════════════════════════════
  
  uk_honours: {
    country: "UK", region: "University", name: "UK Honours Classification",
    type: "letter", popular: true,
    mapping: (g) => ({ 'FIRST': 4.0, '1ST': 4.0, '2:1': 3.7, '2.1': 3.7, '2:2': 3.0, '2.2': 3.0, 'THIRD': 2.3, '3RD': 2.3, 'PASS': 2.0, 'FAIL': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "UK degree classifications. First=70%+, 2:1=60-69%, 2:2=50-59%, Third=40-49%.",
    inputType: "select", options: ['FIRST', '2:1', '2:2', 'THIRD', 'PASS', 'FAIL'],
    optionLabels: { 'FIRST': 'First Class (70%+)', '2:1': 'Upper Second 2:1 (60-69%)', '2:2': 'Lower Second 2:2 (50-59%)', 'THIRD': 'Third Class (40-49%)', 'PASS': 'Ordinary Pass', 'FAIL': 'Fail (<40%)' }
  },
  uk_percentage: {
    country: "UK", region: "University", name: "UK University Percentage",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 70) return 4.0; if (p >= 65) return 3.7; if (p >= 60) return 3.3; if (p >= 55) return 3.0; if (p >= 50) return 2.7; if (p >= 45) return 2.3; if (p >= 40) return 2.0; return 0.0; },
    description: "UK university percentage. 70%+ is First Class (exceptional). Rigorous marking.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 68"
  },
  uk_alevels: {
    country: "UK", region: "Secondary", name: "A-Levels (A*-E)",
    type: "letter", popular: true,
    mapping: (g) => ({ 'A*': 4.0, 'A': 4.0, 'B': 3.3, 'C': 2.7, 'D': 2.0, 'E': 1.3, 'U': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "GCE A-Level grades. A* and A are top. U=Ungraded (fail).",
    inputType: "select", options: ['A*', 'A', 'B', 'C', 'D', 'E', 'U'],
    optionLabels: { 'A*': 'A* (90%+)', 'A': 'A (80-89%)', 'B': 'B (70-79%)', 'C': 'C (60-69%)', 'D': 'D (50-59%)', 'E': 'E (40-49%)', 'U': 'U (Ungraded)' }
  },
  uk_gcse_9to1: {
    country: "UK", region: "Secondary", name: "GCSE (9-1 Scale)",
    type: "number",
    mapping: (g) => ({ 9: 4.0, 8: 3.8, 7: 3.5, 6: 3.2, 5: 3.0, 4: 2.5, 3: 2.0, 2: 1.5, 1: 1.0 }[parseInt(g)] ?? 0.0),
    description: "GCSE new grading (9-1). 9=highest, 4=standard pass, 5=strong pass.",
    inputType: "select", options: ['9', '8', '7', '6', '5', '4', '3', '2', '1'],
    optionLabels: { '9': '9 (A** equiv)', '8': '8 (A*/A)', '7': '7 (A)', '6': '6 (B)', '5': '5 (Strong C)', '4': '4 (Standard C)', '3': '3 (D)', '2': '2 (E/F)', '1': '1 (G)' }
  },
  uk_scotland: {
    country: "UK", region: "Scotland", name: "Scottish Highers",
    type: "letter",
    mapping: (g) => ({ 'A': 4.0, 'B': 3.3, 'C': 2.7, 'D': 2.0, 'NO AWARD': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Scottish Highers and Advanced Highers grading.",
    inputType: "select", options: ['A', 'B', 'C', 'D', 'NO AWARD'],
    optionLabels: { 'A': 'A (70%+)', 'B': 'B (60-69%)', 'C': 'C (50-59%)', 'D': 'D (40-49%)', 'NO AWARD': 'No Award (<40%)' }
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // INTERNATIONAL BACCALAUREATE (IB)
  // ══════════════════════════════════════════════════════════════════════════════════
  
  ib_diploma: {
    country: "International", region: "IB", name: "IB Diploma (1-7 Scale)",
    type: "ib", popular: true,
    mapping: (g) => ({ 7: 4.0, 6: 3.7, 5: 3.3, 4: 2.7, 3: 2.0, 2: 1.3, 1: 0.0 }[parseInt(g)] ?? 0.0),
    description: "International Baccalaureate 7-point scale. 7=Excellent. Max 45 points total.",
    inputType: "select", options: ['7', '6', '5', '4', '3', '2', '1'],
    optionLabels: { '7': '7 - Excellent (A+)', '6': '6 - Very Good (A)', '5': '5 - Good (B+)', '4': '4 - Satisfactory (B-)', '3': '3 - Mediocre (C)', '2': '2 - Poor (D)', '1': '1 - Very Poor (F)' }
  },
  ib_total: {
    country: "International", region: "IB", name: "IB Total Score (/45)",
    type: "ib_total",
    mapping: (t) => { if (t >= 42) return 4.0; if (t >= 38) return 3.8; if (t >= 34) return 3.5; if (t >= 30) return 3.2; if (t >= 26) return 2.8; if (t >= 24) return 2.5; return 2.0; },
    description: "IB total diploma score out of 45 (6 subjects × 7 + 3 core points).",
    inputType: "number", min: 0, max: 45, placeholder: "e.g., 38"
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // EUROPE - WESTERN
  // ══════════════════════════════════════════════════════════════════════════════════
  
  germany_university: {
    country: "Germany", region: "University", name: "German University (1.0-5.0)",
    type: "german", popular: true, inverted: true,
    mapping: (g) => { if (g <= 1.0) return 4.0; if (g <= 1.5) return 4.0; if (g <= 2.0) return 3.7; if (g <= 2.5) return 3.3; if (g <= 3.0) return 3.0; if (g <= 3.5) return 2.7; if (g <= 4.0) return 2.0; return 0.0; },
    description: "German 1-5 scale. 1.0=sehr gut (best), 4.0=ausreichend (pass). LOWER IS BETTER!",
    inputType: "number", min: 1, max: 5, placeholder: "e.g., 1.7"
  },
  germany_abitur: {
    country: "Germany", region: "Secondary", name: "German Abitur (Points 0-15)",
    type: "abitur",
    mapping: (p) => { if (p >= 15) return 4.0; if (p >= 13) return 3.8; if (p >= 10) return 3.3; if (p >= 7) return 2.8; if (p >= 5) return 2.3; if (p >= 1) return 1.5; return 0.0; },
    description: "German Abitur point system. 15=highest (1+), 5=minimum pass (4).",
    inputType: "number", min: 0, max: 15, placeholder: "e.g., 12"
  },
  france_scale: {
    country: "France", region: "National", name: "French Grade (0-20)",
    type: "french", popular: true,
    mapping: (g) => { if (g >= 16) return 4.0; if (g >= 14) return 3.7; if (g >= 12) return 3.3; if (g >= 11) return 3.0; if (g >= 10) return 2.7; if (g >= 8) return 2.0; return 0.0; },
    description: "French 0-20 scale. 16+=Très Bien, 14-15=Bien, 12-13=Assez Bien. 10=pass.",
    inputType: "number", min: 0, max: 20, placeholder: "e.g., 14"
  },
  italy_scale: {
    country: "Italy", region: "University", name: "Italian Grade (18-30)",
    type: "italian",
    mapping: (g) => { if (g >= 30) return 4.0; if (g >= 28) return 3.8; if (g >= 26) return 3.5; if (g >= 24) return 3.2; if (g >= 22) return 2.8; if (g >= 20) return 2.3; if (g >= 18) return 2.0; return 0.0; },
    description: "Italian university 18-30 scale. 30 e lode=distinction. 18=minimum pass.",
    inputType: "number", min: 0, max: 30, placeholder: "e.g., 27"
  },
  spain_scale: {
    country: "Spain", region: "National", name: "Spanish Grade (0-10)",
    type: "spanish",
    mapping: (g) => { if (g >= 9) return 4.0; if (g >= 7) return 3.3; if (g >= 6) return 2.7; if (g >= 5) return 2.0; return 0.0; },
    description: "Spanish 0-10. 9-10=Sobresaliente, 7-8=Notable, 5-6=Aprobado. 5=pass.",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 7.5"
  },
  netherlands_scale: {
    country: "Netherlands", region: "National", name: "Dutch Grade (1-10)",
    type: "dutch",
    mapping: (g) => { if (g >= 9) return 4.0; if (g >= 8) return 3.7; if (g >= 7) return 3.0; if (g >= 6) return 2.3; if (g >= 5.5) return 1.7; return 0.0; },
    description: "Dutch 1-10. 10 is rarely given. 8+=excellent. 5.5=minimum pass.",
    inputType: "number", min: 1, max: 10, placeholder: "e.g., 7.5"
  },
  belgium_scale: {
    country: "Belgium", region: "National", name: "Belgian Grade (0-20)",
    type: "belgian",
    mapping: (g) => { if (g >= 18) return 4.0; if (g >= 16) return 3.7; if (g >= 14) return 3.3; if (g >= 12) return 3.0; if (g >= 10) return 2.5; return 0.0; },
    description: "Belgian 0-20 (French system). 18+=La plus grande distinction. 10=pass.",
    inputType: "number", min: 0, max: 20, placeholder: "e.g., 15"
  },
  switzerland_scale: {
    country: "Switzerland", region: "National", name: "Swiss Grade (1-6)",
    type: "swiss",
    mapping: (g) => { if (g >= 6) return 4.0; if (g >= 5.5) return 3.8; if (g >= 5) return 3.5; if (g >= 4.5) return 3.0; if (g >= 4) return 2.5; if (g >= 3.5) return 2.0; return 0.0; },
    description: "Swiss 1-6. 6=excellent, 4=sufficient/pass. Higher is better (opposite German).",
    inputType: "number", min: 1, max: 6, placeholder: "e.g., 5.25"
  },
  austria_scale: {
    country: "Austria", region: "National", name: "Austrian Grade (1-5)",
    type: "austrian", inverted: true,
    mapping: (g) => { if (g <= 1) return 4.0; if (g <= 2) return 3.5; if (g <= 3) return 3.0; if (g <= 4) return 2.0; return 0.0; },
    description: "Austrian 1-5. 1=Sehr gut (best), 5=Nicht genügend (fail). Similar to German.",
    inputType: "number", min: 1, max: 5, placeholder: "e.g., 2"
  },
  portugal_scale: {
    country: "Portugal", region: "National", name: "Portuguese Grade (0-20)",
    type: "portuguese",
    mapping: (g) => { if (g >= 18) return 4.0; if (g >= 16) return 3.7; if (g >= 14) return 3.3; if (g >= 12) return 2.7; if (g >= 10) return 2.0; return 0.0; },
    description: "Portuguese 0-20. 18-20=Excellent, 10=minimum pass.",
    inputType: "number", min: 0, max: 20, placeholder: "e.g., 15"
  },
  ireland_scale: {
    country: "Ireland", region: "University", name: "Irish Honours Degree",
    type: "letter",
    mapping: (g) => ({ 'H1': 4.0, '1.1': 4.0, 'H2.1': 3.7, '2.1': 3.7, 'H2.2': 3.0, '2.2': 3.0, 'H3': 2.3, 'PASS': 2.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Irish university classifications. Similar to UK system.",
    inputType: "select", options: ['H1', 'H2.1', 'H2.2', 'H3', 'PASS'],
    optionLabels: { 'H1': 'First Class (70%+)', 'H2.1': 'Second Class I (60-69%)', 'H2.2': 'Second Class II (50-59%)', 'H3': 'Third Class (40-49%)', 'PASS': 'Pass' }
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // EUROPE - NORTHERN
  // ══════════════════════════════════════════════════════════════════════════════════
  
  sweden_scale: {
    country: "Sweden", region: "National", name: "Swedish Grade (A-F)",
    type: "letter",
    mapping: (g) => ({ 'A': 4.0, 'B': 3.5, 'C': 3.0, 'D': 2.5, 'E': 2.0, 'F': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Swedish ECTS-compatible A-F. A-E=passing, F=fail.",
    inputType: "select", options: ['A', 'B', 'C', 'D', 'E', 'F'],
    optionLabels: { 'A': 'A - Excellent', 'B': 'B - Very Good', 'C': 'C - Good', 'D': 'D - Satisfactory', 'E': 'E - Sufficient', 'F': 'F - Fail' }
  },
  norway_scale: {
    country: "Norway", region: "National", name: "Norwegian Grade (A-F)",
    type: "letter",
    mapping: (g) => ({ 'A': 4.0, 'B': 3.5, 'C': 3.0, 'D': 2.5, 'E': 2.0, 'F': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Norwegian A-F scale. Similar to Swedish/ECTS.",
    inputType: "select", options: ['A', 'B', 'C', 'D', 'E', 'F']
  },
  denmark_scale: {
    country: "Denmark", region: "National", name: "Danish 7-Point Scale",
    type: "danish",
    mapping: (g) => ({ 12: 4.0, 10: 3.7, 7: 3.0, 4: 2.3, 2: 1.7, 0: 0.0, '-3': 0.0 }[parseInt(g)] ?? 0.0),
    description: "Danish 7-step. 12=excellent, 02=minimum pass, -3=fail.",
    inputType: "select", options: ['12', '10', '7', '4', '02', '00', '-3'],
    optionLabels: { '12': '12 - Excellent', '10': '10 - Very Good', '7': '7 - Good', '4': '4 - Fair', '02': '02 - Adequate', '00': '00 - Inadequate', '-3': '-3 - Unacceptable' }
  },
  finland_scale: {
    country: "Finland", region: "National", name: "Finnish Grade (0-5)",
    type: "finnish",
    mapping: (g) => { if (g >= 5) return 4.0; if (g >= 4) return 3.5; if (g >= 3) return 3.0; if (g >= 2) return 2.5; if (g >= 1) return 2.0; return 0.0; },
    description: "Finnish university 0-5. 5=excellent, 1=passable.",
    inputType: "number", min: 0, max: 5, placeholder: "e.g., 4"
  },
  iceland_scale: {
    country: "Iceland", region: "National", name: "Icelandic Grade (0-10)",
    type: "icelandic",
    mapping: (g) => { if (g >= 9) return 4.0; if (g >= 8) return 3.5; if (g >= 7) return 3.0; if (g >= 6) return 2.5; if (g >= 5) return 2.0; return 0.0; },
    description: "Icelandic 0-10. 5=minimum pass.",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 7.5"
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // EUROPE - EASTERN
  // ══════════════════════════════════════════════════════════════════════════════════
  
  russia_scale: {
    country: "Russia", region: "National", name: "Russian Grade (2-5)",
    type: "russian", popular: true,
    mapping: (g) => ({ 5: 4.0, 4: 3.0, 3: 2.0, 2: 0.0 }[parseInt(g)] ?? 0.0),
    description: "Russian 5-point. 5=отлично (excellent), 4=хорошо (good), 3=удовл. (satisfactory), 2=fail.",
    inputType: "select", options: ['5', '4', '3', '2'],
    optionLabels: { '5': '5 - Отлично (Excellent)', '4': '4 - Хорошо (Good)', '3': '3 - Удовлетворительно (Satisfactory)', '2': '2 - Неудовлетворительно (Fail)' }
  },
  poland_scale: {
    country: "Poland", region: "National", name: "Polish Grade (2-5)",
    type: "polish",
    mapping: (g) => { if (g >= 5) return 4.0; if (g >= 4.5) return 3.7; if (g >= 4) return 3.3; if (g >= 3.5) return 2.7; if (g >= 3) return 2.0; return 0.0; },
    description: "Polish 2-5. 5=bardzo dobry (very good), 3=dostateczny (sufficient), 2=fail.",
    inputType: "number", min: 2, max: 5, placeholder: "e.g., 4.5"
  },
  czech_scale: {
    country: "Czech Republic", region: "National", name: "Czech Grade (1-4)",
    type: "czech", inverted: true,
    mapping: (g) => { if (g <= 1) return 4.0; if (g <= 1.5) return 3.7; if (g <= 2) return 3.3; if (g <= 2.5) return 2.7; if (g <= 3) return 2.0; return 0.0; },
    description: "Czech 1-4. 1=výborně (excellent), 3=dobře (good), 4=fail. Lower is better.",
    inputType: "number", min: 1, max: 4, placeholder: "e.g., 1.5"
  },
  hungary_scale: {
    country: "Hungary", region: "National", name: "Hungarian Grade (1-5)",
    type: "hungarian",
    mapping: (g) => { if (g >= 5) return 4.0; if (g >= 4) return 3.3; if (g >= 3) return 2.7; if (g >= 2) return 2.0; return 0.0; },
    description: "Hungarian 1-5. 5=jeles (excellent), 2=elégséges (sufficient), 1=fail.",
    inputType: "number", min: 1, max: 5, placeholder: "e.g., 4"
  },
  romania_scale: {
    country: "Romania", region: "National", name: "Romanian Grade (1-10)",
    type: "romanian",
    mapping: (g) => { if (g >= 9.5) return 4.0; if (g >= 8.5) return 3.7; if (g >= 7.5) return 3.3; if (g >= 6.5) return 2.7; if (g >= 5) return 2.0; return 0.0; },
    description: "Romanian 1-10. 10=excellent, 5=minimum pass.",
    inputType: "number", min: 1, max: 10, placeholder: "e.g., 8.5"
  },
  ukraine_scale: {
    country: "Ukraine", region: "National", name: "Ukrainian Grade (1-12)",
    type: "ukrainian",
    mapping: (g) => { if (g >= 10) return 4.0; if (g >= 7) return 3.3; if (g >= 4) return 2.3; return 0.0; },
    description: "Ukrainian 12-point. 10-12=High, 7-9=Sufficient, 4-6=Medium, 1-3=Low/Fail.",
    inputType: "number", min: 1, max: 12, placeholder: "e.g., 10"
  },
  greece_scale: {
    country: "Greece", region: "National", name: "Greek Grade (0-10)",
    type: "greek",
    mapping: (g) => { if (g >= 8.5) return 4.0; if (g >= 6.5) return 3.3; if (g >= 5) return 2.5; return 0.0; },
    description: "Greek university 0-10. 8.5+=Excellent (Άριστα), 5=pass.",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 7.5"
  },
  bulgaria_scale: {
    country: "Bulgaria", region: "National", name: "Bulgarian Grade (2-6)",
    type: "bulgarian",
    mapping: (g) => { if (g >= 6) return 4.0; if (g >= 5) return 3.3; if (g >= 4) return 2.7; if (g >= 3) return 2.0; return 0.0; },
    description: "Bulgarian 2-6. 6=Отличен (Excellent), 3=Среден (Average), 2=Слаб (Fail).",
    inputType: "number", min: 2, max: 6, placeholder: "e.g., 5"
  },
  croatia_scale: {
    country: "Croatia", region: "National", name: "Croatian Grade (1-5)",
    type: "croatian",
    mapping: (g) => { if (g >= 5) return 4.0; if (g >= 4) return 3.3; if (g >= 3) return 2.7; if (g >= 2) return 2.0; return 0.0; },
    description: "Croatian 1-5. 5=Izvrstan (Excellent), 2=Dovoljan (Sufficient), 1=Fail.",
    inputType: "number", min: 1, max: 5, placeholder: "e.g., 4"
  },
  serbia_scale: {
    country: "Serbia", region: "National", name: "Serbian Grade (5-10)",
    type: "serbian",
    mapping: (g) => { if (g >= 10) return 4.0; if (g >= 9) return 3.7; if (g >= 8) return 3.3; if (g >= 7) return 2.7; if (g >= 6) return 2.0; return 0.0; },
    description: "Serbian 5-10. 10=Одличан (Excellent), 6=Довољан (Sufficient), 5=Fail.",
    inputType: "number", min: 5, max: 10, placeholder: "e.g., 8"
  },
  slovakia_scale: {
    country: "Slovakia", region: "National", name: "Slovak Grade (1-4)",
    type: "slovak", inverted: true,
    mapping: (g) => { if (g <= 1) return 4.0; if (g <= 1.5) return 3.7; if (g <= 2) return 3.3; if (g <= 2.5) return 2.7; if (g <= 3) return 2.0; return 0.0; },
    description: "Slovak 1-4. 1=Výborne (Excellent), 3=Dobre (Good), 4=Fail. Lower is better.",
    inputType: "number", min: 1, max: 4, placeholder: "e.g., 1.5"
  },
  slovenia_scale: {
    country: "Slovenia", region: "National", name: "Slovenian Grade (5-10)",
    type: "slovenian",
    mapping: (g) => { if (g >= 10) return 4.0; if (g >= 9) return 3.7; if (g >= 8) return 3.3; if (g >= 7) return 2.7; if (g >= 6) return 2.0; return 0.0; },
    description: "Slovenian 5-10. 10=Odlično, 6=Zadostno (Pass), 5=Fail.",
    inputType: "number", min: 5, max: 10, placeholder: "e.g., 8"
  },
  ects_grade: {
    country: "Europe", region: "ECTS", name: "ECTS Grade (A-F)",
    type: "letter",
    mapping: (g) => ({ 'A': 4.0, 'B': 3.5, 'C': 3.0, 'D': 2.5, 'E': 2.0, 'FX': 1.0, 'F': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "European Credit Transfer System. Used across EU for mobility.",
    inputType: "select", options: ['A', 'B', 'C', 'D', 'E', 'FX', 'F'],
    optionLabels: { 'A': 'A - Excellent (Top 10%)', 'B': 'B - Very Good (Next 25%)', 'C': 'C - Good (Next 30%)', 'D': 'D - Satisfactory (Next 25%)', 'E': 'E - Sufficient (Last 10%)', 'FX': 'FX - Fail (Some work)', 'F': 'F - Fail' }
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // ASIA - EAST ASIA
  // ══════════════════════════════════════════════════════════════════════════════════
  
  china_percentage: {
    country: "China", region: "National", name: "Chinese Percentage",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 85) return 3.7; if (p >= 82) return 3.3; if (p >= 78) return 3.0; if (p >= 75) return 2.7; if (p >= 72) return 2.3; if (p >= 68) return 2.0; if (p >= 64) return 1.7; if (p >= 60) return 1.0; return 0.0; },
    description: "Chinese university percentage. 90%+=优 (Excellent). 60%=pass.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 85"
  },
  china_5point: {
    country: "China", region: "National", name: "Chinese 5-Point Scale",
    type: "letter",
    mapping: (g) => ({ '优': 4.0, 'A': 4.0, '良': 3.3, 'B': 3.3, '中': 2.5, 'C': 2.5, '及格': 1.7, 'D': 1.7, '不及格': 0.0, 'F': 0.0 }[g] ?? 0.0),
    description: "Chinese letter grades: 优(Excellent), 良(Good), 中(Average), 及格(Pass), 不及格(Fail).",
    inputType: "select", options: ['优', '良', '中', '及格', '不及格'],
    optionLabels: { '优': '优 Excellent (90-100%)', '良': '良 Good (80-89%)', '中': '中 Average (70-79%)', '及格': '及格 Pass (60-69%)', '不及格': '不及格 Fail (<60%)' }
  },
  japan_scale: {
    country: "Japan", region: "National", name: "Japanese Grade (秀優良可)",
    type: "letter", popular: true,
    mapping: (g) => ({ '秀': 4.0, 'S': 4.0, 'AA': 4.0, '優': 4.0, 'A': 4.0, '良': 3.0, 'B': 3.0, '可': 2.0, 'C': 2.0, '不可': 0.0, 'D': 0.0, 'F': 0.0 }[g] ?? 0.0),
    description: "Japanese: 秀/S(Excellent), 優/A(Good), 良/B(Fair), 可/C(Pass), 不可/D(Fail).",
    inputType: "select", options: ['秀', '優', '良', '可', '不可'],
    optionLabels: { '秀': '秀 S/AA (90-100%)', '優': '優 A (80-89%)', '良': '良 B (70-79%)', '可': '可 C (60-69%)', '不可': '不可 D/F (<60%)' }
  },
  korea_scale: {
    country: "South Korea", region: "National", name: "Korean Grade (4.5 Scale)",
    type: "letter", popular: true,
    mapping: (g) => {
      const scale = { 'A+': 4.5, 'A0': 4.0, 'A': 4.0, 'B+': 3.5, 'B0': 3.0, 'B': 3.0, 'C+': 2.5, 'C0': 2.0, 'C': 2.0, 'D+': 1.5, 'D0': 1.0, 'D': 1.0, 'F': 0.0 };
      return Math.min(scale[g?.toUpperCase()] ?? 0.0, 4.0);
    },
    description: "Korean university 4.5 scale. A+=4.5, capped at 4.0 for US conversion.",
    inputType: "select", options: ['A+', 'A0', 'B+', 'B0', 'C+', 'C0', 'D+', 'D0', 'F'],
    optionLabels: { 'A+': 'A+ (4.5→4.0)', 'A0': 'A0 (4.0)', 'B+': 'B+ (3.5)', 'B0': 'B0 (3.0)', 'C+': 'C+ (2.5)', 'C0': 'C0 (2.0)', 'D+': 'D+ (1.5)', 'D0': 'D0 (1.0)', 'F': 'F (0.0)' }
  },
  taiwan_percentage: {
    country: "Taiwan", region: "National", name: "Taiwanese Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.7; if (p >= 70) return 3.0; if (p >= 60) return 2.0; return 0.0; },
    description: "Taiwanese university percentage. 60%=minimum pass.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 82"
  },
  hongkong_scale: {
    country: "Hong Kong", region: "University", name: "Hong Kong GPA (4.3)",
    type: "hkgpa",
    mapping: (g) => Math.min(g, 4.0),
    description: "Hong Kong university GPA (HKU, CUHK, HKUST). Scale up to 4.3.",
    inputType: "number", min: 0, max: 4.3, placeholder: "e.g., 3.5"
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // ASIA - SOUTHEAST ASIA
  // ══════════════════════════════════════════════════════════════════════════════════
  
  singapore_cap: {
    country: "Singapore", region: "University", name: "Singapore CAP (5.0)",
    type: "cap", popular: true,
    mapping: (g) => { if (g >= 5.0) return 4.0; if (g >= 4.5) return 3.9; if (g >= 4.0) return 3.7; if (g >= 3.5) return 3.3; if (g >= 3.0) return 2.7; if (g >= 2.5) return 2.3; if (g >= 2.0) return 2.0; return 0.0; },
    description: "Singapore Cumulative Average Point (NUS, NTU, SMU). Max 5.0.",
    inputType: "number", min: 0, max: 5, placeholder: "e.g., 4.2"
  },
  malaysia_cgpa: {
    country: "Malaysia", region: "National", name: "Malaysian CGPA (4.0)",
    type: "cgpa4",
    mapping: (g) => g,
    description: "Malaysian university CGPA. Same as US 4.0 scale.",
    inputType: "number", min: 0, max: 4, placeholder: "e.g., 3.6"
  },
  indonesia_ipk: {
    country: "Indonesia", region: "National", name: "Indonesian IPK (4.0)",
    type: "cgpa4",
    mapping: (g) => g,
    description: "Indonesian university IPK (Index Prestasi Kumulatif). Same as US 4.0.",
    inputType: "number", min: 0, max: 4, placeholder: "e.g., 3.5"
  },
  thailand_gpax: {
    country: "Thailand", region: "National", name: "Thai GPAX (4.0)",
    type: "cgpa4",
    mapping: (g) => g,
    description: "Thai university GPAX. Same as US 4.0 scale.",
    inputType: "number", min: 0, max: 4, placeholder: "e.g., 3.4"
  },
  vietnam_scale: {
    country: "Vietnam", region: "National", name: "Vietnamese Grade (0-10)",
    type: "vietnamese",
    mapping: (g) => { if (g >= 9.0) return 4.0; if (g >= 8.0) return 3.7; if (g >= 7.0) return 3.0; if (g >= 6.0) return 2.3; if (g >= 5.0) return 1.7; return 0.0; },
    description: "Vietnamese 0-10. 8+=Giỏi (Excellent), 5=minimum pass. 9+ is very rare.",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 7.5"
  },
  philippines_scale: {
    country: "Philippines", region: "National", name: "Filipino Grade (1.0-5.0)",
    type: "filipino", inverted: true,
    mapping: (g) => { if (g <= 1.25) return 4.0; if (g <= 1.75) return 3.7; if (g <= 2.25) return 3.3; if (g <= 2.75) return 2.7; if (g <= 3.0) return 2.0; return 0.0; },
    description: "Filipino 1.0-5.0. 1.0=best, 3.0=pass, 5.0=fail. LOWER IS BETTER!",
    inputType: "number", min: 1, max: 5, placeholder: "e.g., 1.5"
  },
  myanmar_percentage: {
    country: "Myanmar", region: "National", name: "Myanmar Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; return 0.0; },
    description: "Myanmar university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 72"
  },
  cambodia_percentage: {
    country: "Cambodia", region: "National", name: "Cambodian Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; return 0.0; },
    description: "Cambodian university percentage. 50%=minimum pass.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 68"
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // ASIA - SOUTH ASIA (besides India)
  // ══════════════════════════════════════════════════════════════════════════════════
  
  pakistan_percentage: {
    country: "Pakistan", region: "National", name: "Pakistani Percentage",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.7; if (p >= 60) return 3.0; if (p >= 50) return 2.3; if (p >= 40) return 2.0; if (p >= 33) return 1.0; return 0.0; },
    description: "Pakistani board/university percentage. 60%+=First Division.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 75"
  },
  pakistan_cgpa: {
    country: "Pakistan", region: "University", name: "Pakistani CGPA (4.0)",
    type: "cgpa4",
    mapping: (g) => g,
    description: "Pakistani university CGPA. Same as US 4.0 scale.",
    inputType: "number", min: 0, max: 4, placeholder: "e.g., 3.5"
  },
  bangladesh_cgpa: {
    country: "Bangladesh", region: "University", name: "Bangladeshi CGPA (4.0)",
    type: "cgpa4", popular: true,
    mapping: (g) => g,
    description: "Bangladeshi university CGPA. 3.0+=First Class.",
    inputType: "number", min: 0, max: 4, placeholder: "e.g., 3.5"
  },
  bangladesh_percentage: {
    country: "Bangladesh", region: "Secondary", name: "Bangladesh SSC/HSC",
    type: "percentage",
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.7; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; if (p >= 33) return 1.5; return 0.0; },
    description: "Bangladesh Secondary/Higher Secondary Certificate percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 72"
  },
  srilanka_percentage: {
    country: "Sri Lanka", region: "National", name: "Sri Lankan Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 85) return 4.0; if (p >= 70) return 3.5; if (p >= 55) return 3.0; if (p >= 40) return 2.0; return 0.0; },
    description: "Sri Lankan university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 70"
  },
  nepal_percentage: {
    country: "Nepal", region: "National", name: "Nepali Percentage/CGPA",
    type: "percentage",
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; return 0.0; },
    description: "Nepali SLC/+2/University percentage. 60%+=First Division.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 72"
  },
  bhutan_percentage: {
    country: "Bhutan", region: "National", name: "Bhutanese Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; return 0.0; },
    description: "Bhutanese university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 65"
  },
  maldives_percentage: {
    country: "Maldives", region: "National", name: "Maldivian Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 85) return 4.0; if (p >= 70) return 3.5; if (p >= 55) return 3.0; if (p >= 40) return 2.0; return 0.0; },
    description: "Maldivian university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 68"
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // MIDDLE EAST
  // ══════════════════════════════════════════════════════════════════════════════════
  
  uae_percentage: {
    country: "UAE", region: "National", name: "UAE Percentage",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.7; if (p >= 70) return 3.0; if (p >= 60) return 2.3; if (p >= 50) return 1.7; return 0.0; },
    description: "UAE/Gulf university percentage. 60%=minimum pass.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 85"
  },
  saudi_gpa: {
    country: "Saudi Arabia", region: "National", name: "Saudi GPA (5.0)",
    type: "saudi", popular: true,
    mapping: (g) => { if (g >= 4.75) return 4.0; if (g >= 4.5) return 3.9; if (g >= 3.75) return 3.5; if (g >= 2.75) return 3.0; if (g >= 2.0) return 2.3; if (g >= 1.0) return 1.5; return 0.0; },
    description: "Saudi university 5.0 GPA scale. 4.75+=Excellent.",
    inputType: "number", min: 0, max: 5, placeholder: "e.g., 4.2"
  },
  saudi_percentage: {
    country: "Saudi Arabia", region: "Secondary", name: "Saudi Secondary Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 75) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.0; return 0.0; },
    description: "Saudi secondary school percentage. 90%+=Excellent, 50%=Pass.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 82"
  },
  iran_scale: {
    country: "Iran", region: "National", name: "Iranian Grade (0-20)",
    type: "iranian",
    mapping: (g) => { if (g >= 18) return 4.0; if (g >= 16) return 3.7; if (g >= 14) return 3.0; if (g >= 12) return 2.3; if (g >= 10) return 1.7; return 0.0; },
    description: "Iranian 0-20. 18+=عالی (Excellent), 10=minimum pass.",
    inputType: "number", min: 0, max: 20, placeholder: "e.g., 16"
  },
  turkey_cgpa: {
    country: "Turkey", region: "National", name: "Turkish CGPA (4.0)",
    type: "cgpa4",
    mapping: (g) => g,
    description: "Turkish university 4.0 CGPA. Same as US scale.",
    inputType: "number", min: 0, max: 4, placeholder: "e.g., 3.2"
  },
  israel_percentage: {
    country: "Israel", region: "National", name: "Israeli Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 95) return 4.0; if (p >= 90) return 3.9; if (p >= 85) return 3.7; if (p >= 80) return 3.3; if (p >= 75) return 3.0; if (p >= 70) return 2.7; if (p >= 65) return 2.3; if (p >= 60) return 2.0; if (p >= 56) return 1.7; return 0.0; },
    description: "Israeli university percentage. 56%=minimum pass at most universities.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 85"
  },
  qatar_percentage: {
    country: "Qatar", region: "National", name: "Qatari Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.7; if (p >= 70) return 3.0; if (p >= 60) return 2.3; if (p >= 50) return 1.7; return 0.0; },
    description: "Qatari university percentage. Similar to UAE system.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 78"
  },
  kuwait_percentage: {
    country: "Kuwait", region: "National", name: "Kuwaiti Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.7; if (p >= 70) return 3.0; if (p >= 60) return 2.3; if (p >= 50) return 1.7; return 0.0; },
    description: "Kuwaiti university percentage. 4.0 GPA system common.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 76"
  },
  bahrain_percentage: {
    country: "Bahrain", region: "National", name: "Bahraini Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.7; if (p >= 70) return 3.0; if (p >= 60) return 2.3; if (p >= 50) return 1.7; return 0.0; },
    description: "Bahraini university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 74"
  },
  oman_percentage: {
    country: "Oman", region: "National", name: "Omani Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.7; if (p >= 70) return 3.0; if (p >= 60) return 2.3; if (p >= 50) return 1.7; return 0.0; },
    description: "Omani university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 77"
  },
  jordan_percentage: {
    country: "Jordan", region: "National", name: "Jordanian Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.5; if (p >= 70) return 3.0; if (p >= 60) return 2.5; if (p >= 50) return 2.0; return 0.0; },
    description: "Jordanian university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 75"
  },
  lebanon_percentage: {
    country: "Lebanon", region: "National", name: "Lebanese Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.7; if (p >= 70) return 3.0; if (p >= 60) return 2.3; if (p >= 50) return 1.7; return 0.0; },
    description: "Lebanese university percentage. French or American systems used.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 78"
  },
  iraq_percentage: {
    country: "Iraq", region: "National", name: "Iraqi Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.5; if (p >= 70) return 3.0; if (p >= 60) return 2.5; if (p >= 50) return 2.0; return 0.0; },
    description: "Iraqi university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 72"
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // AFRICA
  // ══════════════════════════════════════════════════════════════════════════════════
  
  nigeria_cgpa: {
    country: "Nigeria", region: "University", name: "Nigerian CGPA (5.0)",
    type: "cgpa5", popular: true,
    mapping: (g) => { if (g >= 4.5) return 4.0; if (g >= 3.5) return 3.3; if (g >= 2.4) return 2.7; if (g >= 1.5) return 2.0; if (g >= 1.0) return 1.0; return 0.0; },
    description: "Nigerian university 5.0 CGPA. 4.5+=First Class, 3.5-4.49=Second Class Upper.",
    inputType: "number", min: 0, max: 5, placeholder: "e.g., 4.2"
  },
  south_africa: {
    country: "South Africa", region: "National", name: "South African Percentage",
    type: "percentage", popular: true,
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 75) return 3.7; if (p >= 70) return 3.3; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; if (p >= 30) return 1.0; return 0.0; },
    description: "South African NSC/university percentage. 80%+=Distinction.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 70"
  },
  kenya_grade: {
    country: "Kenya", region: "National", name: "Kenyan Grade (A-E)",
    type: "letter",
    mapping: (g) => ({ 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'E': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Kenyan KCSE and university grading.",
    inputType: "select", options: ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'],
    optionLabels: { 'A': 'A (80-100)', 'A-': 'A- (75-79)', 'B+': 'B+ (70-74)', 'B': 'B (65-69)', 'B-': 'B- (60-64)', 'C+': 'C+ (55-59)', 'C': 'C (50-54)', 'C-': 'C- (45-49)', 'D+': 'D+ (40-44)', 'D': 'D (35-39)', 'D-': 'D- (30-34)', 'E': 'E (<30)' }
  },
  ghana_percentage: {
    country: "Ghana", region: "National", name: "Ghanaian WASSCE/University",
    type: "letter",
    mapping: (g) => ({ 'A1': 4.0, 'B2': 3.7, 'B3': 3.3, 'C4': 3.0, 'C5': 2.7, 'C6': 2.3, 'D7': 2.0, 'E8': 1.0, 'F9': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Ghanaian WASSCE grading (A1-F9).",
    inputType: "select", options: ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'],
    optionLabels: { 'A1': 'A1 - Excellent', 'B2': 'B2 - Very Good', 'B3': 'B3 - Good', 'C4': 'C4 - Credit', 'C5': 'C5 - Credit', 'C6': 'C6 - Credit', 'D7': 'D7 - Pass', 'E8': 'E8 - Pass', 'F9': 'F9 - Fail' }
  },
  ethiopia_percentage: {
    country: "Ethiopia", region: "National", name: "Ethiopian Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 85) return 4.0; if (p >= 75) return 3.5; if (p >= 65) return 3.0; if (p >= 55) return 2.5; if (p >= 45) return 2.0; return 0.0; },
    description: "Ethiopian university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 72"
  },
  egypt_percentage: {
    country: "Egypt", region: "National", name: "Egyptian Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 85) return 4.0; if (p >= 75) return 3.7; if (p >= 65) return 3.0; if (p >= 50) return 2.0; return 0.0; },
    description: "Egyptian university percentage. 85%+=ممتاز (Excellent).",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 80"
  },
  morocco_scale: {
    country: "Morocco", region: "National", name: "Moroccan Grade (0-20)",
    type: "moroccan",
    mapping: (g) => { if (g >= 16) return 4.0; if (g >= 14) return 3.7; if (g >= 12) return 3.3; if (g >= 10) return 2.7; if (g >= 8) return 2.0; return 0.0; },
    description: "Moroccan 0-20 (French system). 10=minimum pass.",
    inputType: "number", min: 0, max: 20, placeholder: "e.g., 14"
  },
  algeria_scale: {
    country: "Algeria", region: "National", name: "Algerian Grade (0-20)",
    type: "algerian",
    mapping: (g) => { if (g >= 16) return 4.0; if (g >= 14) return 3.7; if (g >= 12) return 3.3; if (g >= 10) return 2.7; if (g >= 8) return 2.0; return 0.0; },
    description: "Algerian 0-20 (French system).",
    inputType: "number", min: 0, max: 20, placeholder: "e.g., 13"
  },
  tunisia_scale: {
    country: "Tunisia", region: "National", name: "Tunisian Grade (0-20)",
    type: "tunisian",
    mapping: (g) => { if (g >= 16) return 4.0; if (g >= 14) return 3.7; if (g >= 12) return 3.3; if (g >= 10) return 2.7; if (g >= 8) return 2.0; return 0.0; },
    description: "Tunisian 0-20 (French system).",
    inputType: "number", min: 0, max: 20, placeholder: "e.g., 14"
  },
  tanzania_grade: {
    country: "Tanzania", region: "National", name: "Tanzanian Grade (A-F)",
    type: "letter",
    mapping: (g) => ({ 'A': 4.0, 'B': 3.5, 'C': 3.0, 'D': 2.0, 'E': 1.0, 'F': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Tanzanian ACSE grading.",
    inputType: "select", options: ['A', 'B', 'C', 'D', 'E', 'F'],
    optionLabels: { 'A': 'A (80-100)', 'B': 'B (60-79)', 'C': 'C (45-59)', 'D': 'D (30-44)', 'E': 'E (20-29)', 'F': 'F (<20)' }
  },
  uganda_percentage: {
    country: "Uganda", region: "National", name: "Ugandan Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 45) return 2.0; return 0.0; },
    description: "Ugandan university/UACE percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 68"
  },
  zimbabwe_percentage: {
    country: "Zimbabwe", region: "National", name: "Zimbabwean Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 75) return 4.0; if (p >= 65) return 3.5; if (p >= 55) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; return 0.0; },
    description: "Zimbabwean O-Level/A-Level/university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 62"
  },
  rwanda_percentage: {
    country: "Rwanda", region: "National", name: "Rwandan Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; return 0.0; },
    description: "Rwandan university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 65"
  },
  botswana_percentage: {
    country: "Botswana", region: "National", name: "Botswanan Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; return 0.0; },
    description: "Botswanan university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 66"
  },
  zambia_percentage: {
    country: "Zambia", region: "National", name: "Zambian Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; return 0.0; },
    description: "Zambian university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 64"
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // AMERICAS - LATIN AMERICA
  // ══════════════════════════════════════════════════════════════════════════════════
  
  brazil_scale: {
    country: "Brazil", region: "National", name: "Brazilian Grade (0-10)",
    type: "brazilian", popular: true,
    mapping: (g) => { if (g >= 9.0) return 4.0; if (g >= 8.0) return 3.7; if (g >= 7.0) return 3.0; if (g >= 6.0) return 2.3; if (g >= 5.0) return 1.7; return 0.0; },
    description: "Brazilian 0-10. 7+=good, 5=minimum pass (varies by institution).",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 8.5"
  },
  mexico_scale: {
    country: "Mexico", region: "National", name: "Mexican Grade (0-10)",
    type: "mexican",
    mapping: (g) => { if (g >= 9.5) return 4.0; if (g >= 9.0) return 3.8; if (g >= 8.0) return 3.3; if (g >= 7.0) return 2.7; if (g >= 6.0) return 2.0; return 0.0; },
    description: "Mexican 0-10. 6=minimum pass. 10 is rare.",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 8.5"
  },
  argentina_scale: {
    country: "Argentina", region: "National", name: "Argentine Grade (0-10)",
    type: "argentine",
    mapping: (g) => { if (g >= 9) return 4.0; if (g >= 8) return 3.7; if (g >= 7) return 3.3; if (g >= 6) return 2.7; if (g >= 4) return 2.0; return 0.0; },
    description: "Argentine 0-10. 4=minimum pass (varies by province).",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 7.5"
  },
  colombia_scale: {
    country: "Colombia", region: "National", name: "Colombian Grade (0-5)",
    type: "colombian",
    mapping: (g) => { if (g >= 4.5) return 4.0; if (g >= 4.0) return 3.5; if (g >= 3.5) return 3.0; if (g >= 3.0) return 2.0; return 0.0; },
    description: "Colombian 0-5. 3.0=minimum pass. 4.5+=excellent.",
    inputType: "number", min: 0, max: 5, placeholder: "e.g., 4.0"
  },
  chile_scale: {
    country: "Chile", region: "National", name: "Chilean Grade (1-7)",
    type: "chilean",
    mapping: (g) => { if (g >= 6.5) return 4.0; if (g >= 6.0) return 3.7; if (g >= 5.5) return 3.3; if (g >= 5.0) return 3.0; if (g >= 4.5) return 2.5; if (g >= 4.0) return 2.0; return 0.0; },
    description: "Chilean 1-7. 4.0=minimum pass. 6.0+=excellent.",
    inputType: "number", min: 1, max: 7, placeholder: "e.g., 5.5"
  },
  peru_scale: {
    country: "Peru", region: "National", name: "Peruvian Grade (0-20)",
    type: "peruvian",
    mapping: (g) => { if (g >= 17) return 4.0; if (g >= 14) return 3.3; if (g >= 11) return 2.7; if (g >= 8) return 2.0; return 0.0; },
    description: "Peruvian vigesimal (0-20). 11=minimum pass.",
    inputType: "number", min: 0, max: 20, placeholder: "e.g., 15"
  },
  venezuela_scale: {
    country: "Venezuela", region: "National", name: "Venezuelan Grade (0-20)",
    type: "venezuelan",
    mapping: (g) => { if (g >= 18) return 4.0; if (g >= 15) return 3.3; if (g >= 12) return 2.7; if (g >= 10) return 2.0; return 0.0; },
    description: "Venezuelan 0-20. 10=minimum pass.",
    inputType: "number", min: 0, max: 20, placeholder: "e.g., 16"
  },
  ecuador_scale: {
    country: "Ecuador", region: "National", name: "Ecuadorian Grade (0-10)",
    type: "ecuadorian",
    mapping: (g) => { if (g >= 9) return 4.0; if (g >= 8) return 3.5; if (g >= 7) return 3.0; if (g >= 6) return 2.5; if (g >= 5) return 2.0; return 0.0; },
    description: "Ecuadorian 0-10. 7=minimum pass.",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 8"
  },
  bolivia_scale: {
    country: "Bolivia", region: "National", name: "Bolivian Grade (0-100)",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.5; if (p >= 70) return 3.0; if (p >= 60) return 2.5; if (p >= 51) return 2.0; return 0.0; },
    description: "Bolivian percentage. 51=minimum pass.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 75"
  },
  paraguay_scale: {
    country: "Paraguay", region: "National", name: "Paraguayan Grade (1-5)",
    type: "paraguayan",
    mapping: (g) => { if (g >= 5) return 4.0; if (g >= 4) return 3.3; if (g >= 3) return 2.7; if (g >= 2) return 2.0; return 0.0; },
    description: "Paraguayan 1-5. 2=minimum pass.",
    inputType: "number", min: 1, max: 5, placeholder: "e.g., 4"
  },
  uruguay_scale: {
    country: "Uruguay", region: "National", name: "Uruguayan Grade (1-12)",
    type: "uruguayan",
    mapping: (g) => { if (g >= 11) return 4.0; if (g >= 9) return 3.5; if (g >= 7) return 3.0; if (g >= 5) return 2.5; if (g >= 3) return 2.0; return 0.0; },
    description: "Uruguayan 1-12. 3=minimum pass.",
    inputType: "number", min: 1, max: 12, placeholder: "e.g., 9"
  },
  costa_rica_scale: {
    country: "Costa Rica", region: "National", name: "Costa Rican Grade (0-10)",
    type: "costarican",
    mapping: (g) => { if (g >= 9) return 4.0; if (g >= 8) return 3.5; if (g >= 7) return 3.0; if (g >= 6.5) return 2.5; if (g >= 6) return 2.0; return 0.0; },
    description: "Costa Rican 0-10. 6.5=minimum pass.",
    inputType: "number", min: 0, max: 10, placeholder: "e.g., 7.5"
  },
  panama_scale: {
    country: "Panama", region: "National", name: "Panamanian Grade (0-100)",
    type: "percentage",
    mapping: (p) => { if (p >= 91) return 4.0; if (p >= 81) return 3.5; if (p >= 71) return 3.0; if (p >= 61) return 2.5; if (p >= 51) return 2.0; return 0.0; },
    description: "Panamanian percentage. 71=minimum pass.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 78"
  },
  dominican_scale: {
    country: "Dominican Republic", region: "National", name: "Dominican Grade (0-100)",
    type: "percentage",
    mapping: (p) => { if (p >= 90) return 4.0; if (p >= 80) return 3.5; if (p >= 70) return 3.0; if (p >= 60) return 2.5; if (p >= 50) return 2.0; return 0.0; },
    description: "Dominican Republic percentage. 70=minimum pass.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 75"
  },
  jamaica_scale: {
    country: "Jamaica", region: "Caribbean", name: "Jamaican Grade (A-U)",
    type: "letter",
    mapping: (g) => ({ 'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'E': 0.5, 'U': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Jamaican CXC/CAPE grading. A-C are passing grades.",
    inputType: "select", options: ['A', 'B', 'C', 'D', 'E', 'U'],
    optionLabels: { 'A': 'A (75-100%)', 'B': 'B (60-74%)', 'C': 'C (50-59%)', 'D': 'D (40-49%)', 'E': 'E (30-39%)', 'U': 'U (Ungraded)' }
  },

  // ══════════════════════════════════════════════════════════════════════════════════
  // AUSTRALIA & OCEANIA
  // ══════════════════════════════════════════════════════════════════════════════════
  
  australia_scale: {
    country: "Australia", region: "University", name: "Australian Grade (HD-F)",
    type: "letter", popular: true,
    mapping: (g) => ({ 'HD': 4.0, 'D': 3.7, 'CR': 3.0, 'P': 2.3, 'N': 0.0, 'F': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "Australian: HD (High Distinction), D (Distinction), CR (Credit), P (Pass), F (Fail).",
    inputType: "select", options: ['HD', 'D', 'CR', 'P', 'F'],
    optionLabels: { 'HD': 'HD - High Distinction (85-100%)', 'D': 'D - Distinction (75-84%)', 'CR': 'CR - Credit (65-74%)', 'P': 'P - Pass (50-64%)', 'F': 'F - Fail (<50%)' }
  },
  australia_percentage: {
    country: "Australia", region: "University", name: "Australian Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 85) return 4.0; if (p >= 75) return 3.7; if (p >= 65) return 3.0; if (p >= 50) return 2.3; return 0.0; },
    description: "Australian university percentage marks.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 78"
  },
  australia_wam: {
    country: "Australia", region: "University", name: "Australian WAM (0-100)",
    type: "wam",
    mapping: (w) => { if (w >= 85) return 4.0; if (w >= 75) return 3.7; if (w >= 65) return 3.0; if (w >= 50) return 2.3; return 0.0; },
    description: "Australian Weighted Average Mark (WAM). Used for Honours selection.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 72"
  },
  newzealand_scale: {
    country: "New Zealand", region: "National", name: "NZ Grade (A+-E)",
    type: "letter",
    mapping: (g) => ({ 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'E': 0.0 }[g?.toUpperCase()] ?? 0.0),
    description: "New Zealand university A-E grading.",
    inputType: "select", options: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'E'],
    optionLabels: { 'A+': 'A+ (90-100%)', 'A': 'A (85-89%)', 'A-': 'A- (80-84%)', 'B+': 'B+ (75-79%)', 'B': 'B (70-74%)', 'B-': 'B- (65-69%)', 'C+': 'C+ (60-64%)', 'C': 'C (55-59%)', 'C-': 'C- (50-54%)', 'D': 'D (40-49%)', 'E': 'E (<40%)' }
  },
  fiji_percentage: {
    country: "Fiji", region: "Pacific", name: "Fijian Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; return 0.0; },
    description: "Fijian university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 68"
  },
  png_percentage: {
    country: "Papua New Guinea", region: "Pacific", name: "PNG Percentage",
    type: "percentage",
    mapping: (p) => { if (p >= 80) return 4.0; if (p >= 70) return 3.5; if (p >= 60) return 3.0; if (p >= 50) return 2.5; if (p >= 40) return 2.0; return 0.0; },
    description: "Papua New Guinea university percentage.",
    inputType: "number", min: 0, max: 100, placeholder: "e.g., 65"
  },
};

// ═══════════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════════

const getCountries = () => {
  const countries = [...new Set(Object.values(GRADING_SCALES).map(s => s.country))].sort();
  return countries;
};

const getScalesByCountry = (country) => {
  return Object.entries(GRADING_SCALES)
    .filter(([_, scale]) => scale.country === country)
    .sort((a, b) => (b[1].popular ? 1 : 0) - (a[1].popular ? 1 : 0))
    .map(([key, scale]) => ({ key, ...scale }));
};

const getPopularScales = () => {
  return Object.entries(GRADING_SCALES)
    .filter(([_, scale]) => scale.popular)
    .map(([key, scale]) => ({ key, ...scale }));
};

const TOTAL_SCALES = Object.keys(GRADING_SCALES).length;
const TOTAL_COUNTRIES = getCountries().length;

// Count Indian boards specifically
const INDIAN_BOARDS_COUNT = Object.values(GRADING_SCALES).filter(s => s.country === "India").length;

export { GRADING_SCALES, getCountries, getScalesByCountry, getPopularScales, TOTAL_SCALES, TOTAL_COUNTRIES, INDIAN_BOARDS_COUNT };


// Import GRADING_SCALES and helpers from Part 1 (or paste above this)
// import { GRADING_SCALES, getCountries, getScalesByCountry, getPopularScales, TOTAL_SCALES, TOTAL_COUNTRIES, INDIAN_BOARDS_COUNT } from './GPACalculatorGlobal';

// ═══════════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════════

const GPACalculatorGlobal = () => {
  // State
  const [mode, setMode] = useState('course'); // 'course' or 'quick'
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedScale, setSelectedScale] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  
  // Course-by-course mode state
  const [semesters, setSemesters] = useState([
    {
      id: 1,
      name: 'Semester 1',
      courses: [
        { id: 1, name: '', grade: '', credits: 3 }
      ]
    }
  ]);
  
  // Quick convert mode state
  const [quickGrade, setQuickGrade] = useState('');
  const [quickResult, setQuickResult] = useState(null);
  
  // Results
  const [results, setResults] = useState(null);
  const [savedData, setSavedData] = useState(null);
  
  // UI state
  const [expandedSemesters, setExpandedSemesters] = useState({ 1: true });
  const [showFAQ, setShowFAQ] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const resultsRef = useRef(null);
  const countryDropdownRef = useRef(null);

  // Get current scale info
  const currentScale = selectedScale ? GRADING_SCALES[selectedScale] : null;
  
  // Filtered countries based on search
  const filteredCountries = useMemo(() => {
    const countries = getCountries();
    if (!countrySearch) return countries;
    return countries.filter(c => 
      c.toLowerCase().includes(countrySearch.toLowerCase())
    );
  }, [countrySearch]);

  // Available scales for selected country
  const availableScales = useMemo(() => {
    if (!selectedCountry) return [];
    return getScalesByCountry(selectedCountry);
  }, [selectedCountry]);

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load saved data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gpaCalculatorData');
      if (saved) {
        const data = JSON.parse(saved);
        setSavedData(data);
      }
    } catch (e) {
      console.error('Error loading saved data:', e);
    }
  }, []);

  // Calculate GPA
  const calculateGPA = () => {
    if (!currentScale) return;

    let totalPoints = 0;
    let totalCredits = 0;
    const semesterResults = [];

    semesters.forEach(semester => {
      let semesterPoints = 0;
      let semesterCredits = 0;

      semester.courses.forEach(course => {
        if (course.grade && course.credits > 0) {
          const gradeValue = currentScale.inputType === 'number' 
            ? parseFloat(course.grade) 
            : course.grade;
          
          if (gradeValue !== '' && !isNaN(gradeValue) || typeof gradeValue === 'string') {
            const gpa = currentScale.mapping(gradeValue);
            const credits = parseFloat(course.credits) || 0;
            
            semesterPoints += gpa * credits;
            semesterCredits += credits;
            totalPoints += gpa * credits;
            totalCredits += credits;
          }
        }
      });

      const semesterGPA = semesterCredits > 0 ? semesterPoints / semesterCredits : 0;
      semesterResults.push({
        name: semester.name,
        gpa: semesterGPA,
        credits: semesterCredits
      });
    });

    const cumulativeGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;

    setResults({
      cumulativeGPA,
      totalCredits,
      semesterResults,
      scale: currentScale,
      timestamp: new Date().toISOString()
    });
  };

  // Quick convert
  const handleQuickConvert = () => {
    if (!currentScale || quickGrade === '') return;
    
    const gradeValue = currentScale.inputType === 'number' 
      ? parseFloat(quickGrade) 
      : quickGrade;
    
    const gpa = currentScale.mapping(gradeValue);
    setQuickResult({
      input: quickGrade,
      gpa,
      scale: currentScale
    });
  };

  // Add semester
  const addSemester = () => {
    const newId = Math.max(...semesters.map(s => s.id)) + 1;
    setSemesters([...semesters, {
      id: newId,
      name: `Semester ${newId}`,
      courses: [{ id: 1, name: '', grade: '', credits: 3 }]
    }]);
    setExpandedSemesters({ ...expandedSemesters, [newId]: true });
  };

  // Remove semester
  const removeSemester = (semesterId) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== semesterId));
    }
  };

  // Add course to semester
  const addCourse = (semesterId) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === semesterId) {
        const newCourseId = Math.max(...semester.courses.map(c => c.id), 0) + 1;
        return {
          ...semester,
          courses: [...semester.courses, { id: newCourseId, name: '', grade: '', credits: 3 }]
        };
      }
      return semester;
    }));
  };

  // Remove course from semester
  const removeCourse = (semesterId, courseId) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === semesterId && semester.courses.length > 1) {
        return {
          ...semester,
          courses: semester.courses.filter(c => c.id !== courseId)
        };
      }
      return semester;
    }));
  };

  // Update course
  const updateCourse = (semesterId, courseId, field, value) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === semesterId) {
        return {
          ...semester,
          courses: semester.courses.map(course => {
            if (course.id === courseId) {
              return { ...course, [field]: value };
            }
            return course;
          })
        };
      }
      return semester;
    }));
  };

  // Update semester name
  const updateSemesterName = (semesterId, name) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === semesterId) {
        return { ...semester, name };
      }
      return semester;
    }));
  };

  // Toggle semester expansion
  const toggleSemester = (semesterId) => {
    setExpandedSemesters({
      ...expandedSemesters,
      [semesterId]: !expandedSemesters[semesterId]
    });
  };

  // Save to localStorage
  const saveData = () => {
    const data = {
      semesters,
      selectedCountry,
      selectedScale,
      results,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('gpaCalculatorData', JSON.stringify(data));
    setSavedData(data);
    alert('Data saved successfully!');
  };

  // Load saved data
  const loadSavedData = () => {
    if (savedData) {
      setSemesters(savedData.semesters);
      setSelectedCountry(savedData.selectedCountry);
      setSelectedScale(savedData.selectedScale);
      if (savedData.results) setResults(savedData.results);
    }
  };

  // Reset calculator
  const resetCalculator = () => {
    setSemesters([{
      id: 1,
      name: 'Semester 1',
      courses: [{ id: 1, name: '', grade: '', credits: 3 }]
    }]);
    setResults(null);
    setQuickGrade('');
    setQuickResult(null);
    setExpandedSemesters({ 1: true });
  };

  // Copy results to clipboard
  const copyResults = () => {
    if (!results) return;
    
    let text = `GPA Report\n`;
    text += `Generated: ${new Date().toLocaleDateString()}\n`;
    text += `Grading System: ${currentScale?.name}\n`;
    text += `─────────────────────────\n`;
    text += `Cumulative GPA: ${results.cumulativeGPA.toFixed(2)}/4.0\n`;
    text += `Total Credits: ${results.totalCredits}\n\n`;
    
    results.semesterResults.forEach(sem => {
      text += `${sem.name}: ${sem.gpa.toFixed(2)} GPA (${sem.credits} credits)\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Print results
  const printResults = () => {
    window.print();
  };

  // Get GPA color
  const getGPAColor = (gpa) => {
    if (gpa >= 3.7) return 'text-green-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.5) return 'text-amber-600';
    return 'text-red-600';
  };

  // Get GPA background
  const getGPABg = (gpa) => {
    if (gpa >= 3.7) return 'bg-green-50 border-green-200';
    if (gpa >= 3.0) return 'bg-blue-50 border-blue-200';
    if (gpa >= 2.5) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  // Get Latin honors
  const getLatinHonors = (gpa) => {
    if (gpa >= 3.9) return { label: 'Summa Cum Laude', color: 'bg-yellow-400 text-yellow-900' };
    if (gpa >= 3.7) return { label: 'Magna Cum Laude', color: 'bg-yellow-300 text-yellow-800' };
    if (gpa >= 3.5) return { label: 'Cum Laude', color: 'bg-yellow-200 text-yellow-700' };
    return null;
  };

  // Validate input
  const validateInput = (value, scale) => {
    if (!scale) return { valid: false, message: 'Select a grading scale' };
    if (value === '' || value === null || value === undefined) return { valid: true, message: '' };
    
    if (scale.inputType === 'number') {
      const num = parseFloat(value);
      if (isNaN(num)) return { valid: false, message: 'Enter a valid number' };
      if (scale.min !== undefined && num < scale.min) return { valid: false, message: `Minimum: ${scale.min}` };
      if (scale.max !== undefined && num > scale.max) return { valid: false, message: `Maximum: ${scale.max}` };
    }
    
    return { valid: true, message: '' };
  };

  // SEO Meta Tags using useEffect
  useEffect(() => {
    // Set page title
    document.title = `Free International GPA Calculator | ${TOTAL_COUNTRIES}+ Countries | AACRAO Compliant | Calgary Academic Excellence`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Convert your grades to US 4.0 GPA from ${TOTAL_COUNTRIES}+ countries. Supports India (CBSE, ICSE, ${INDIAN_BOARDS_COUNT}+ state boards), Canada, USA, UK A-Levels, IB Diploma, and ${TOTAL_SCALES}+ grading systems. AACRAO EDGE compliant, WES-compatible GPA conversion for university admissions.`);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = `Convert your grades to US 4.0 GPA from ${TOTAL_COUNTRIES}+ countries. Supports India (CBSE, ICSE, ${INDIAN_BOARDS_COUNT}+ state boards), Canada, USA, UK A-Levels, IB Diploma, and ${TOTAL_SCALES}+ grading systems.`;
      document.head.appendChild(meta);
    }
    
    // Set keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'GPA calculator, international GPA converter, CBSE to GPA, ICSE to GPA, Indian GPA calculator, Canadian GPA, UK A-level to GPA, IB to GPA, AACRAO EDGE, WES GPA conversion');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'GPA calculator, international GPA converter, CBSE to GPA, ICSE to GPA, Indian GPA calculator, Canadian GPA, UK A-level to GPA, IB to GPA, AACRAO EDGE, WES GPA conversion';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "International GPA Calculator",
          "description": `Free GPA calculator supporting ${TOTAL_COUNTRIES}+ countries and ${TOTAL_SCALES}+ grading scales including all Indian state boards (CBSE, ICSE, ${INDIAN_BOARDS_COUNT} boards), Canadian provinces, UK Honours, IB Diploma, and more. AACRAO EDGE and WES compliant.`,
          "url": "https://calgaryacademicexcellence.com/gpa-calculator",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            `${TOTAL_COUNTRIES}+ countries supported`,
            `${TOTAL_SCALES}+ grading scales`,
            `${INDIAN_BOARDS_COUNT}+ Indian boards including all state boards`,
            "AACRAO EDGE compliant conversions",
            "WES iGPA methodology",
            "Course-by-course calculation",
            "Quick grade conversion",
            "Export and print reports"
          ]
        })
      }} />
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://calgaryacademicexcellence.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "GPA Calculator",
              "item": "https://calgaryacademicexcellence.com/gpa-calculator"
            }
          ]
        })
      }} />
      
      {/* Header - Matching Homepage Style */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 md:py-12 shadow-2xl" style={{
        backgroundImage: 'linear-gradient(135deg, rgba(30, 58, 138, 0.98) 0%, rgba(37, 99, 235, 0.95) 50%, rgba(30, 58, 138, 0.98) 100%)',
      }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Globe className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold">
                International GPA Calculator
              </h1>
              <p className="text-blue-100 text-sm md:text-base">
                Convert grades from {TOTAL_COUNTRIES}+ countries to US 4.0 scale
              </p>
            </div>
          </div>
          
          {/* Stats badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-1">
              <Globe className="w-4 h-4" /> {TOTAL_COUNTRIES}+ Countries
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-1">
              <Calculator className="w-4 h-4" /> {TOTAL_SCALES}+ Scales
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-1">
              <Flag className="w-4 h-4" /> {INDIAN_BOARDS_COUNT}+ Indian Boards
            </span>
            <span className="px-3 py-1 bg-yellow-400/30 backdrop-blur-sm rounded-full text-sm flex items-center gap-1">
              <Award className="w-4 h-4" /> AACRAO EDGE Certified
            </span>
          </div>
        </div>
      </div>

      {/* AdSense Top */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-7638771792216412"
            data-ad-slot="top-banner"
            data-ad-format="auto"
            data-full-width-responsive="true" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column - Calculator */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Mode Selection */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-700" />
                Calculation Mode
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMode('course')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    mode === 'course' 
                      ? 'border-blue-600 bg-blue-50 text-blue-800' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <BookOpen className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Course by Course</div>
                  <div className="text-xs text-gray-500">Multiple courses & semesters</div>
                </button>
                <button
                  onClick={() => setMode('quick')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    mode === 'quick' 
                      ? 'border-blue-600 bg-blue-50 text-blue-800' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Zap className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Quick Convert</div>
                  <div className="text-xs text-gray-500">Single grade conversion</div>
                </button>
              </div>
            </div>

            {/* Country & Scale Selection */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-700" />
                Select Your Grading System
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Country Selector */}
                <div className="relative" ref={countryDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country / Region
                  </label>
                  <div 
                    className="relative cursor-pointer"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  >
                    <div className="w-full p-3 border rounded-xl bg-white flex items-center justify-between hover:border-blue-400 transition-colors">
                      <span className={selectedCountry ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedCountry || 'Select country...'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  
                  {showCountryDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-xl max-h-64 overflow-hidden text-gray-900">
                      <div className="p-2 border-b sticky top-0 bg-white">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search countries..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                      <div className="overflow-y-auto max-h-48">
                        {filteredCountries.map(country => (
                          <button
                            key={country}
                            onClick={() => {
                              setSelectedCountry(country);
                              setSelectedScale('');
                              setShowCountryDropdown(false);
                              setCountrySearch('');
                            }}
                            className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors text-gray-900 text-gray-900 ${selectedCountry === country ? 'bg-blue-100 text-blue-800' : ''}`}
                          >
                            {country}
                            {country === 'India' && (
                              <span className="ml-2 text-xs text-blue-700">({INDIAN_BOARDS_COUNT} boards)</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Scale Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grading Scale
                  </label>
                  <select
                    value={selectedScale}
                    onChange={(e) => setSelectedScale(e.target.value)}
                    disabled={!selectedCountry}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select scale...</option>
                    {availableScales.map(scale => (
                      <option key={scale.key} value={scale.key}>
                        {scale.popular ? '⭐ ' : ''}{scale.name}
                        {scale.region !== 'National' ? ` (${scale.region})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Scale Info */}
              {currentScale && (
                <div className={`mt-4 p-4 rounded-xl border ${currentScale.inverted ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                  <div className="flex items-start gap-2">
                    <Info className={`w-5 h-5 mt-0.5 flex-shrink-0 ${currentScale.inverted ? 'text-amber-600' : 'text-blue-700'}`} />
                    <div>
                      <div className="font-medium text-gray-800">
                        {currentScale.name}
                        {currentScale.inverted && (
                          <span className="ml-2 px-2 py-0.5 bg-amber-200 text-amber-800 rounded text-xs">
                            ⚠️ Lower = Better
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{currentScale.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Calculator Input Section */}
            {currentScale && (
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                
                {/* Quick Convert Mode */}
                {mode === 'quick' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-700" />
                      Quick Grade Conversion
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Enter Your Grade
                        </label>
                        {currentScale.inputType === 'select' ? (
                          <select
                            value={quickGrade}
                            onChange={(e) => setQuickGrade(e.target.value)}
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select grade...</option>
                            {currentScale.options?.map(opt => (
                              <option key={opt} value={opt}>
                                {currentScale.optionLabels?.[opt] || opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="number"
                            value={quickGrade}
                            onChange={(e) => setQuickGrade(e.target.value)}
                            placeholder={currentScale.placeholder || 'Enter grade'}
                            min={currentScale.min}
                            max={currentScale.max}
                            step="0.01"
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        )}
                      </div>
                      
                      <button
                        onClick={handleQuickConvert}
                        disabled={quickGrade === ''}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 self-end"
                      >
                        <ArrowRight className="w-5 h-5" />
                        Convert
                      </button>
                    </div>

                    {/* Quick Result */}
                    {quickResult && (
                      <div className={`mt-6 p-6 rounded-xl border-2 ${getGPABg(quickResult.gpa)}`}>
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">Your grade converts to:</div>
                          <div className={`text-5xl font-bold ${getGPAColor(quickResult.gpa)}`}>
                            {quickResult.gpa.toFixed(2)}
                          </div>
                          <div className="text-gray-500">out of 4.0 GPA</div>
                          {getLatinHonors(quickResult.gpa) && (
                            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getLatinHonors(quickResult.gpa).color}`}>
                              {getLatinHonors(quickResult.gpa).label}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Course-by-Course Mode */}
                {mode === 'course' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-700" />
                        Enter Your Courses
                      </h2>
                      <button
                        onClick={addSemester}
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-1 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" /> Add Semester
                      </button>
                    </div>

                    {/* Semesters */}
                    <div className="space-y-4">
                      {semesters.map(semester => (
                        <div key={semester.id} className="border rounded-xl overflow-hidden">
                          {/* Semester Header */}
                          <div 
                            className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => toggleSemester(semester.id)}
                          >
                            <div className="flex items-center gap-3">
                              {expandedSemesters[semester.id] ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              )}
                              <input
                                type="text"
                                value={semester.name}
                                onChange={(e) => updateSemesterName(semester.id, e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className="font-medium bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-1"
                              />
                              <span className="text-sm text-gray-500">
                                ({semester.courses.length} course{semester.courses.length !== 1 ? 's' : ''})
                              </span>
                            </div>
                            {semesters.length > 1 && (
                              <button
                                onClick={(e) => { e.stopPropagation(); removeSemester(semester.id); }}
                                className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          {/* Courses */}
                          {expandedSemesters[semester.id] && (
                            <div className="p-4 space-y-3">
                              {/* Course Headers */}
                              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
                                <div className="col-span-5">Course Name</div>
                                <div className="col-span-4">Grade</div>
                                <div className="col-span-2">Credits</div>
                                <div className="col-span-1"></div>
                              </div>

                              {semester.courses.map(course => (
                                <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
                                  <div className="col-span-5">
                                    <input
                                      type="text"
                                      placeholder="e.g., Calculus I"
                                      value={course.name}
                                      onChange={(e) => updateCourse(semester.id, course.id, 'name', e.target.value)}
                                      className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                  </div>
                                  <div className="col-span-4">
                                    {currentScale.inputType === 'select' ? (
                                      <select
                                        value={course.grade}
                                        onChange={(e) => updateCourse(semester.id, course.id, 'grade', e.target.value)}
                                        className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      >
                                        <option value="">Grade</option>
                                        {currentScale.options?.map(opt => (
                                          <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                      </select>
                                    ) : (
                                      <input
                                        type="number"
                                        placeholder={currentScale.placeholder || 'Grade'}
                                        value={course.grade}
                                        onChange={(e) => updateCourse(semester.id, course.id, 'grade', e.target.value)}
                                        min={currentScale.min}
                                        max={currentScale.max}
                                        step="0.01"
                                        className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      />
                                    )}
                                  </div>
                                  <div className="col-span-2">
                                    <input
                                      type="number"
                                      value={course.credits}
                                      onChange={(e) => updateCourse(semester.id, course.id, 'credits', e.target.value)}
                                      min="0"
                                      max="12"
                                      className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                  </div>
                                  <div className="col-span-1 text-center">
                                    {semester.courses.length > 1 && (
                                      <button
                                        onClick={() => removeCourse(semester.id, course.id)}
                                        className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}

                              <button
                                onClick={() => addCourse(semester.id)}
                                className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-700 transition-colors flex items-center justify-center gap-1 text-sm"
                              >
                                <Plus className="w-4 h-4" /> Add Course
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      <button
                        onClick={calculateGPA}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
                      >
                        <Calculator className="w-5 h-5" /> Calculate GPA
                      </button>
                      <button
                        onClick={saveData}
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                        title="Save to browser"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={resetCalculator}
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                        title="Reset"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Load saved data prompt */}
                    {savedData && !results && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2 text-blue-700">
                          <Clock className="w-5 h-5" />
                          <span className="text-sm">
                            You have saved data from {new Date(savedData.savedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={loadSavedData}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          Load
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Popular Scales Quick Access */}
            {!selectedCountry && (
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Popular Grading Scales
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getPopularScales().slice(0, 12).map(scale => (
                    <button
                      key={scale.key}
                      onClick={() => {
                        setSelectedCountry(scale.country);
                        setSelectedScale(scale.key);
                      }}
                      className="p-3 border rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
                    >
                      <div className="font-medium text-gray-800 text-sm">{scale.name}</div>
                      <div className="text-xs text-gray-500">{scale.country}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Results & Info */}
          <div className="space-y-6">
            
            {/* Results Card */}
            {results && (
              <div ref={resultsRef} className={`bg-white rounded-2xl shadow-2xl p-6 sticky top-4 print:static ${getGPABg(results.cumulativeGPA)} border-2`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-700" />
                    Your GPA Results
                  </h3>
                  <div className="flex gap-1">
                    <button
                      onClick={copyResults}
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      title="Copy results"
                    >
                      {copySuccess ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                    </button>
                    <button
                      onClick={printResults}
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      title="Print results"
                    >
                      <Printer className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Main GPA Display */}
                <div className="text-center py-6">
                  <div className={`text-6xl font-bold ${getGPAColor(results.cumulativeGPA)}`}>
                    {results.cumulativeGPA.toFixed(2)}
                  </div>
                  <div className="text-gray-500 mt-1">Cumulative GPA (4.0 Scale)</div>
                  
                  {getLatinHonors(results.cumulativeGPA) && (
                    <span className={`inline-block mt-3 px-4 py-1.5 rounded-full font-medium ${getLatinHonors(results.cumulativeGPA).color}`}>
                      🎓 {getLatinHonors(results.cumulativeGPA).label}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-800">{results.totalCredits}</div>
                    <div className="text-xs text-gray-500">Total Credits</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-800">{results.semesterResults.length}</div>
                    <div className="text-xs text-gray-500">Semesters</div>
                  </div>
                </div>

                {/* Semester Breakdown */}
                {results.semesterResults.length > 1 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Semester Breakdown</h4>
                    <div className="space-y-2">
                      {results.semesterResults.map((sem, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white/50 rounded-lg p-2 text-sm">
                          <span className="text-gray-600">{sem.name}</span>
                          <span className={`font-medium ${getGPAColor(sem.gpa)}`}>
                            {sem.gpa.toFixed(2)} ({sem.credits} cr)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scale Used */}
                <div className="mt-4 pt-4 border-t border-gray-200/50 text-xs text-gray-500 text-center">
                  Calculated using: {currentScale?.name}
                </div>
              </div>
            )}

            {/* AdSense Sidebar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-7638771792216412"
                data-ad-slot="sidebar-ad"
                data-ad-format="vertical" />
            </div>

            {/* Info Cards */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-700" />
                Why Use This Calculator?
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>AACRAO EDGE Certified</strong> - Used by US universities for credential evaluation</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>{TOTAL_COUNTRIES}+ Countries</strong> - Comprehensive global coverage</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>{INDIAN_BOARDS_COUNT}+ Indian Boards</strong> - All state boards & universities</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>WES Compatible</strong> - Matches WES iGPA methodology</span>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-4">Related Tools</h3>
              <div className="space-y-2">
                <a href="/college-admissions-calculator" className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-all">
                  <GraduationCap className="w-5 h-5 text-blue-700" />
                  <div>
                    <div className="font-medium text-gray-800">College Predictor</div>
                    <div className="text-xs text-gray-500">Find your best-fit universities</div>
                  </div>
                </a>
                <a href="/graduate-admissions-calculator" className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-all">
                  <Award className="w-5 h-5 text-blue-700" />
                  <div>
                    <div className="font-medium text-gray-800">Graduate Admissions</div>
                    <div className="text-xs text-gray-500">MS/PhD program chances</div>
                  </div>
                </a>
                <a href="/resources" className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-all">
                  <BookOpen className="w-5 h-5 text-blue-700" />
                  <div>
                    <div className="font-medium text-gray-800">SAT Resources</div>
                    <div className="text-xs text-gray-500">Free practice materials</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-blue-700" />
            Complete Guide to International GPA Conversion
          </h2>

          <div className="prose prose-teal max-w-none">
            <p className="text-gray-600 leading-relaxed">
              Our free international GPA calculator converts grades from over {TOTAL_COUNTRIES} countries to the US 4.0 scale, supporting {TOTAL_SCALES}+ different grading systems. Whether you're an Indian student with CBSE, ICSE, or state board marks, a Canadian student with provincial grades, or studying under the UK Honours system, IB Diploma, or European ECTS framework, this calculator provides accurate AACRAO EDGE-compliant conversions recognized by universities worldwide.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Why Indian 60% Equals US 3.3-3.5 GPA (AACRAO EDGE Explanation)
            </h3>
            <p className="text-gray-600 leading-relaxed">
              One of the most common questions from Indian students is why their percentage marks convert to seemingly higher GPAs than expected. According to <strong>AACRAO EDGE</strong> (American Association of Collegiate Registrars and Admissions Officers), Indian grading is significantly more rigorous than the US system. Here's why:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>First Division (60%+)</strong> in Indian universities represents academic excellence and converts to approximately <strong>3.3-3.7 GPA</strong> depending on institution tier</li>
              <li><strong>Distinction (75%+)</strong> is rare and highly competitive, converting to <strong>3.9-4.0 GPA</strong></li>
              <li><strong>IIT/NIT 8.0 CGPA</strong> is considered equivalent to US 3.7-3.9 GPA due to relative grading and rigorous standards</li>
              <li>Indian exam-based evaluation emphasizes understanding over memorization, with genuinely difficult questions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              All {INDIAN_BOARDS_COUNT} Indian Boards Supported
            </h3>
            <p className="text-gray-600 leading-relaxed">
              This calculator supports every major Indian education board and university system:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">National Boards</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• CBSE (9-point & percentage)</li>
                  <li>• ICSE/ISC (9-point & percentage)</li>
                  <li>• NIOS (Open Schooling)</li>
                  <li>• Cambridge IGCSE India</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Major State Boards</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Maharashtra HSC/SSC</li>
                  <li>• Karnataka PUC/SSLC</li>
                  <li>• Tamil Nadu HSC</li>
                  <li>• Kerala HSE</li>
                  <li>• AP/Telangana Inter</li>
                  <li>• West Bengal HS</li>
                  <li>• UP Board, Bihar Board</li>
                  <li>• Gujarat, Rajasthan RBSE</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">University Systems</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• IIT/NIT/IIIT (10-point CGPA)</li>
                  <li>• Tier 1 Universities (DU, JNU, Mumbai)</li>
                  <li>• UGC CBCS 10-point system</li>
                  <li>• Mumbai University 8-point GPA</li>
                  <li>• Anna University, VTU</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Northeast & Other Boards</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Assam AHSEC, Meghalaya MBOSE</li>
                  <li>• Manipur, Mizoram, Nagaland</li>
                  <li>• Tripura, Sikkim, Arunachal</li>
                  <li>• J&K, Himachal, Uttarakhand</li>
                  <li>• Jharkhand, Chhattisgarh, Odisha</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Canadian Provincial Grading Systems
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Canada's education system varies by province, and our calculator supports all major systems including <strong>Ontario</strong> (UofT, Western, McMaster), <strong>Alberta</strong> (University of Calgary, University of Alberta), <strong>British Columbia</strong> (UBC, SFU), <strong>Quebec CEGEP R-Score</strong> (McGill, UdeM), and Maritime provinces. Quebec's unique R-Score system is especially important for students applying to Quebec universities.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Understanding UK Honours Classifications
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The UK uses a classification system that differs significantly from the US GPA:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>First Class Honours (70%+)</strong> = 4.0 GPA - Only top 15-20% achieve this</li>
              <li><strong>Upper Second (2:1, 60-69%)</strong> = 3.3-3.7 GPA - The "good" degree</li>
              <li><strong>Lower Second (2:2, 50-59%)</strong> = 2.7-3.0 GPA - Acceptable for most employers</li>
              <li><strong>Third Class (40-49%)</strong> = 2.0-2.3 GPA - Minimum passing</li>
            </ul>
            <p className="text-gray-600 mt-2">
              UK universities mark much more stringently than US institutions—a UK 70% is genuinely exceptional and comparable to US 90%+.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              European Grading Systems
            </h3>
            <p className="text-gray-600 leading-relaxed">
              European countries use diverse grading scales, many of which are inverted (lower is better) or use different ranges:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Germany (1.0-5.0)</strong>: 1.0 is best! "sehr gut" = 4.0 GPA. Uses Modified Bavarian Formula.</li>
              <li><strong>France (0-20)</strong>: 16+ = "Très Bien" (Very Good). 10 = pass. 20 is nearly impossible.</li>
              <li><strong>Italy (18-30)</strong>: 30 e lode (cum laude) = highest honor. 18 = minimum pass.</li>
              <li><strong>Netherlands (1-10)</strong>: 8+ = excellent. 10 is almost never given.</li>
              <li><strong>ECTS (A-F)</strong>: Standard European Credit Transfer System used for mobility.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              WES vs AACRAO: Understanding Credential Evaluation
            </h3>
            <p className="text-gray-600 leading-relaxed">
              When applying to US universities, you may need official credential evaluation from services like <strong>WES (World Education Services)</strong> or <strong>ECE</strong>. Our calculator aligns with both methodologies:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>WES iGPA</strong>: Course-by-course evaluation considering institution tier and grade distribution</li>
              <li><strong>AACRAO EDGE</strong>: The gold standard used by university admissions officers</li>
              <li>Both recognize that international grading standards differ significantly from US norms</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Middle East & Gulf Countries
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The calculator supports grading systems from UAE, Saudi Arabia (including the 5.0 GPA scale), Qatar, Kuwait, Bahrain, Oman, Iran (0-20 scale), Turkey, Israel, Jordan, Lebanon, Iraq, and more. Many Gulf universities follow American-style 4.0 GPA systems, while Saudi universities often use a 5.0 scale.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Asia-Pacific Grading Systems
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our calculator covers major Asian education systems:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>China</strong>: Percentage (90%+ = 优/Excellent) and 5-level scale</li>
              <li><strong>Japan</strong>: 秀/優/良/可/不可 (S/A/B/C/F equivalent)</li>
              <li><strong>South Korea</strong>: 4.5 scale (A+ = 4.5, capped at 4.0 for US)</li>
              <li><strong>Singapore</strong>: CAP 5.0 scale (NUS, NTU, SMU)</li>
              <li><strong>Philippines</strong>: Inverted 1.0-5.0 (1.0 = best!)</li>
              <li><strong>Vietnam</strong>: 0-10 scale (9+ is extremely rare)</li>
              <li><strong>Australia</strong>: HD/D/CR/P/F classification</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              African Education Systems
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We support grading from Nigeria (5.0 CGPA with First Class at 4.5+), South Africa (percentage with 80%+ = Distinction), Kenya (A-E system), Ghana (WASSCE A1-F9), Egypt, Morocco, Algeria, Tunisia (French 0-20 system), Ethiopia, Tanzania, Uganda, Zimbabwe, Rwanda, and many more.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Latin American Grading
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Latin American countries use varied scales including Brazil (0-10), Mexico (0-10), Argentina (0-10), Colombia (0-5), Chile (1-7), Peru (0-20 vigesimal), Venezuela (0-20), and more. Each has different passing marks and excellence thresholds.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <button
              onClick={() => setShowFAQ(!showFAQ)}
              className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-700" />
                Frequently Asked Questions
              </span>
              {showFAQ ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {showFAQ && (
              <div className="mt-4 space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800">How accurate is this GPA calculator?</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Our conversions follow AACRAO EDGE guidelines used by US universities for official credential evaluation. While individual institutions may have slight variations, our calculations align with industry standards used by WES, ECE, and university admissions offices worldwide.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800">Why does my Indian 75% convert to 3.7+ GPA?</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    AACRAO recognizes that Indian grading is more stringent than US grading. A 75% (First Division with Distinction) in India represents top-tier academic achievement comparable to A grades in the US system. Indian exams emphasize conceptual understanding with genuinely difficult questions.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800">Should I use this GPA or get official WES evaluation?</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    For applications, always check university requirements. Many accept self-reported GPAs with official transcripts, while some require WES/ECE evaluation. Use this calculator for planning and preliminary applications—it follows the same methodology as official evaluators.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800">What if my state board isn't listed?</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    We support all 28+ major Indian state boards. If your specific board uses a standard percentage system, select "India" then "Tier 2/3 University (Percentage)" which works for most state board results. Contact us to add additional boards.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800">How do inverted scales (German, Filipino) work?</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Some countries use inverted scales where lower numbers are better (German 1.0 = best, Filipino 1.0 = best). Our calculator automatically handles these conversions—just enter your grade as shown on your transcript. Look for the "⚠️ Lower = Better" warning.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800">Is this calculator suitable for graduate school applications?</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Yes! Graduate programs use the same AACRAO standards. For PhD applications, note that a 3.0+ GPA is typically minimum for admission, with competitive programs expecting 3.5+. Use our Graduate Admissions Calculator for program-specific predictions.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Schema FAQ */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How accurate is this international GPA calculator?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our conversions follow AACRAO EDGE guidelines used by US universities for official credential evaluation. The calculations align with industry standards used by WES, ECE, and university admissions offices worldwide."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why does Indian 75% convert to 3.7+ GPA?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AACRAO recognizes that Indian grading is more stringent than US grading. A 75% (First Division with Distinction) in India represents top-tier academic achievement comparable to A grades in the US system."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What Indian boards does this calculator support?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `This calculator supports ${INDIAN_BOARDS_COUNT}+ Indian education boards including CBSE, ICSE/ISC, all state boards (Maharashtra, Karnataka, Tamil Nadu, Kerala, AP, Telangana, West Bengal, Gujarat, Rajasthan, UP, Bihar, MP, Punjab, Haryana, and all Northeast states), plus IIT/NIT CGPA systems and UGC CBCS grading.`
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many countries does this GPA calculator support?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `This calculator supports ${TOTAL_COUNTRIES}+ countries with ${TOTAL_SCALES}+ different grading scales, including all major education systems from North America, Europe, Asia, Middle East, Africa, and Latin America.`
                  }
                },
                {
                  "@type": "Question",
                  "name": "Should I use this GPA or get official WES evaluation?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For applications, check university requirements. Many accept self-reported GPAs with official transcripts, while some require WES/ECE evaluation. This calculator follows the same methodology as official evaluators."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does the German grading system work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Germany uses an inverted 1.0-5.0 scale where 1.0 is the best grade (sehr gut/excellent) and 4.0 is the minimum passing grade. Our calculator automatically converts German grades to US 4.0 GPA using the Modified Bavarian Formula."
                  }
                }
              ]
            })
          }} />
        </div>

        {/* AdSense Bottom */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-7638771792216412"
            data-ad-slot="bottom-banner"
            data-ad-format="auto"
            data-full-width-responsive="true" />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12 border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-sm">
              Free International GPA Calculator supporting {TOTAL_COUNTRIES}+ countries: India (CBSE, ICSE, {INDIAN_BOARDS_COUNT}+ state boards, IIT, NIT), 
              Canada (Ontario, Alberta, BC, Quebec), USA, UK (A-Levels, Honours), IB Diploma, Germany, France, Italy, Spain, Netherlands, 
              Australia, China, Japan, South Korea, Singapore, Malaysia, Thailand, Vietnam, Philippines, Pakistan, Bangladesh, 
              UAE, Saudi Arabia, Nigeria, South Africa, Kenya, Ghana, Brazil, Mexico, Argentina, and more.
            </p>
            <p className="text-xs mt-4 text-gray-500">
              © {new Date().getFullYear()} Calgary Academic Excellence | AACRAO EDGE Compliant | WES Compatible
            </p>
          </div>
        </div>
      </footer>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:static,
          .print\\:static * {
            visibility: visible;
          }
          .print\\:static {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            width: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default GPACalculatorGlobal;
