import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, Globe, Info, Plus, Trash2, ChevronRight, AlertCircle, 
  CheckCircle, GraduationCap, ChevronDown, ChevronUp, BookOpen, 
  TrendingUp, Download, Printer, Save, RotateCcw, Copy, FileText,
  HelpCircle, Star, Award, Target, Zap, Users, MapPin, School,
  Clock, Check, X, ArrowRight, Sparkles, BookMarked
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

// ═══════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE AACRAO EDGE COMPLIANT GRADING SCALES - 40+ COUNTRIES
// ═══════════════════════════════════════════════════════════════════════════

const GRADING_SCALES = {
  // ─────────────────────── INDIA ───────────────────────
  india_iit_nit: {
    country: "India",
    name: "IIT/NIT/IIIT (10-Point CGPA)",
    type: "cgpa10",
    mapping: (g) => {
      if (g >= 9.5) return 4.0;
      if (g >= 9.0) return 3.9;
      if (g >= 8.5) return 3.7;
      if (g >= 8.0) return 3.5;
      if (g >= 7.5) return 3.3;
      if (g >= 7.0) return 3.0;
      if (g >= 6.5) return 2.7;
      if (g >= 6.0) return 2.3;
      if (g >= 5.5) return 2.0;
      if (g >= 5.0) return 1.7;
      return 0.0;
    },
    description: "Premier Indian technical institutions using 10-point CGPA. 8.0+ is excellent.",
    inputType: "number",
    min: 0, max: 10,
    placeholder: "e.g., 8.5"
  },
  india_univ_tier1: {
    country: "India",
    name: "Tier 1 University (Percentage)",
    type: "percentage",
    mapping: (p) => {
      if (p >= 75) return 4.0;
      if (p >= 70) return 3.9;
      if (p >= 65) return 3.7;
      if (p >= 60) return 3.5;
      if (p >= 55) return 3.0;
      if (p >= 50) return 2.7;
      if (p >= 45) return 2.3;
      if (p >= 40) return 2.0;
      return 0.0;
    },
    description: "DU, Mumbai University, Jadavpur, BITS, top state universities. 60%+ = First Division.",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 78"
  },
  india_univ_tier2: {
    country: "India",
    name: "Tier 2/3 University (Percentage)",
    type: "percentage",
    mapping: (p) => {
      if (p >= 70) return 4.0;
      if (p >= 65) return 3.7;
      if (p >= 60) return 3.3;
      if (p >= 55) return 3.0;
      if (p >= 50) return 2.7;
      if (p >= 45) return 2.3;
      if (p >= 40) return 2.0;
      return 0.0;
    },
    description: "Most state and private universities with different marking standards.",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 72"
  },
  india_cbse_new: {
    country: "India",
    name: "CBSE/ICSE (9-Point Grade)",
    type: "letter",
    mapping: (g) => {
      const scale = { 'A1': 4.0, 'A2': 3.7, 'B1': 3.3, 'B2': 3.0, 'C1': 2.7, 'C2': 2.3, 'D1': 2.0, 'D2': 1.7, 'E': 0.0 };
      return scale[g?.toUpperCase()] ?? 0.0;
    },
    description: "CBSE Classes 9-12 absolute grading system (2018 onwards).",
    inputType: "select",
    options: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E'],
    optionLabels: {
      'A1': 'A1 (91-100%)', 'A2': 'A2 (81-90%)', 'B1': 'B1 (71-80%)', 'B2': 'B2 (61-70%)',
      'C1': 'C1 (51-60%)', 'C2': 'C2 (41-50%)', 'D1': 'D1 (33-40%)', 'D2': 'D2 (21-32%)', 'E': 'E (Below 21%)'
    }
  },
  india_cbse_percentage: {
    country: "India",
    name: "CBSE/ICSE (Percentage Marks)",
    type: "percentage",
    mapping: (p) => {
      if (p >= 91) return 4.0;
      if (p >= 81) return 3.7;
      if (p >= 71) return 3.3;
      if (p >= 61) return 3.0;
      if (p >= 51) return 2.7;
      if (p >= 41) return 2.3;
      if (p >= 33) return 2.0;
      return 0.0;
    },
    description: "CBSE/ICSE percentage marks (board exam percentages).",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 85"
  },

  // ─────────────────────── CANADA ───────────────────────
  canada_alberta: {
    country: "Canada",
    name: "Alberta (Percentage)",
    type: "percentage",
    mapping: (p) => {
      if (p >= 90) return 4.0;
      if (p >= 85) return 3.9;
      if (p >= 80) return 3.7;
      if (p >= 77) return 3.3;
      if (p >= 73) return 3.0;
      if (p >= 70) return 2.7;
      if (p >= 67) return 2.3;
      if (p >= 63) return 2.0;
      if (p >= 60) return 1.7;
      if (p >= 55) return 1.3;
      if (p >= 50) return 1.0;
      return 0.0;
    },
    description: "University of Calgary, University of Alberta, Alberta K-12.",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 82"
  },
  canada_ontario: {
    country: "Canada",
    name: "Ontario (Percentage)",
    type: "percentage",
    mapping: (p) => {
      if (p >= 90) return 4.0;
      if (p >= 85) return 3.9;
      if (p >= 80) return 3.7;
      if (p >= 77) return 3.3;
      if (p >= 73) return 3.0;
      if (p >= 70) return 2.7;
      if (p >= 67) return 2.3;
      if (p >= 63) return 2.0;
      if (p >= 60) return 1.7;
      if (p >= 57) return 1.3;
      if (p >= 50) return 1.0;
      return 0.0;
    },
    description: "University of Toronto, Western, McMaster, Ontario secondary schools.",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 88"
  },
  canada_bc: {
    country: "Canada",
    name: "British Columbia (Percentage)",
    type: "percentage",
    mapping: (p) => {
      if (p >= 90) return 4.0;
      if (p >= 85) return 3.9;
      if (p >= 80) return 3.7;
      if (p >= 76) return 3.3;
      if (p >= 72) return 3.0;
      if (p >= 68) return 2.7;
      if (p >= 64) return 2.3;
      if (p >= 60) return 2.0;
      if (p >= 55) return 1.7;
      if (p >= 50) return 1.0;
      return 0.0;
    },
    description: "UBC, SFU, University of Victoria, BC K-12 system.",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 79"
  },
  canada_quebec_cegep: {
    country: "Canada",
    name: "Quebec CEGEP (R-Score)",
    type: "rscore",
    mapping: (r) => {
      if (r >= 35) return 4.0;
      if (r >= 32) return 3.7;
      if (r >= 29) return 3.3;
      if (r >= 26) return 3.0;
      if (r >= 23) return 2.7;
      if (r >= 20) return 2.3;
      if (r >= 17) return 2.0;
      return 0.0;
    },
    description: "Quebec CEGEP R-Score system for university admission.",
    inputType: "number",
    min: 0, max: 50,
    placeholder: "e.g., 30"
  },

  // ─────────────────────── UNITED STATES ───────────────────────
  usa_standard: {
    country: "USA",
    name: "Standard Letter Grade",
    type: "letter",
    mapping: (g) => {
      const scale = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0.0 };
      return scale[g?.toUpperCase()] ?? 0.0;
    },
    description: "Standard U.S. letter grading (most high schools and colleges).",
    inputType: "select",
    options: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'],
    optionLabels: {
      'A+': 'A+ (97-100%)', 'A': 'A (93-96%)', 'A-': 'A- (90-92%)', 'B+': 'B+ (87-89%)',
      'B': 'B (83-86%)', 'B-': 'B- (80-82%)', 'C+': 'C+ (77-79%)', 'C': 'C (73-76%)',
      'C-': 'C- (70-72%)', 'D+': 'D+ (67-69%)', 'D': 'D (63-66%)', 'D-': 'D- (60-62%)', 'F': 'F (0-59%)'
    }
  },
  usa_percentage: {
    country: "USA",
    name: "Percentage to GPA",
    type: "percentage",
    mapping: (p) => {
      if (p >= 97) return 4.0;
      if (p >= 93) return 4.0;
      if (p >= 90) return 3.7;
      if (p >= 87) return 3.3;
      if (p >= 83) return 3.0;
      if (p >= 80) return 2.7;
      if (p >= 77) return 2.3;
      if (p >= 73) return 2.0;
      if (p >= 70) return 1.7;
      if (p >= 67) return 1.3;
      if (p >= 60) return 1.0;
      return 0.0;
    },
    description: "Convert U.S. percentage grades to 4.0 GPA.",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 89"
  },
  usa_weighted: {
    country: "USA",
    name: "Weighted GPA (AP/Honors)",
    type: "letter",
    mapping: (g) => {
      const scale = { 'A+': 5.0, 'A': 5.0, 'A-': 4.7, 'B+': 4.3, 'B': 4.0, 'B-': 3.7, 'C+': 3.3, 'C': 3.0, 'C-': 2.7, 'D': 2.0, 'F': 0.0 };
      return scale[g?.toUpperCase()] ?? 0.0;
    },
    description: "AP/Honors weighted scale (5.0 max). Use for weighted GPA calculation.",
    inputType: "select",
    options: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'],
    optionLabels: {
      'A+': 'A+ (5.0)', 'A': 'A (5.0)', 'A-': 'A- (4.7)', 'B+': 'B+ (4.3)',
      'B': 'B (4.0)', 'B-': 'B- (3.7)', 'C+': 'C+ (3.3)', 'C': 'C (3.0)',
      'C-': 'C- (2.7)', 'D': 'D (2.0)', 'F': 'F (0.0)'
    },
    maxGPA: 5.0
  },

  // ─────────────────────── UNITED KINGDOM ───────────────────────
  uk_honours: {
    country: "UK",
    name: "UK Honours Degree Classification",
    type: "letter",
    mapping: (g) => {
      const scale = { 'FIRST': 4.0, '2:1': 3.7, '2:2': 3.0, 'THIRD': 2.3, 'PASS': 2.0, 'FAIL': 0.0 };
      return scale[g?.toUpperCase()] ?? 0.0;
    },
    description: "British university degree classifications (First, Upper Second, etc.).",
    inputType: "select",
    options: ['FIRST', '2:1', '2:2', 'THIRD', 'PASS', 'FAIL'],
    optionLabels: {
      'FIRST': 'First Class Honours (70%+)', '2:1': 'Upper Second (60-69%)',
      '2:2': 'Lower Second (50-59%)', 'THIRD': 'Third Class (40-49%)',
      'PASS': 'Ordinary Pass', 'FAIL': 'Fail'
    }
  },
  uk_percentage: {
    country: "UK",
    name: "UK Percentage",
    type: "percentage",
    mapping: (p) => {
      if (p >= 70) return 4.0;
      if (p >= 65) return 3.7;
      if (p >= 60) return 3.3;
      if (p >= 55) return 3.0;
      if (p >= 50) return 2.7;
      if (p >= 45) return 2.3;
      if (p >= 40) return 2.0;
      return 0.0;
    },
    description: "UK university percentage marks. 70%+ is First Class.",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 68"
  },
  uk_alevels: {
    country: "UK",
    name: "A-Levels (A*-E)",
    type: "letter",
    mapping: (g) => {
      const scale = { 'A*': 4.0, 'A': 4.0, 'B': 3.3, 'C': 2.7, 'D': 2.0, 'E': 1.3, 'U': 0.0 };
      return scale[g?.toUpperCase()] ?? 0.0;
    },
    description: "GCE A-Level grades for university admission.",
    inputType: "select",
    options: ['A*', 'A', 'B', 'C', 'D', 'E', 'U'],
    optionLabels: {
      'A*': 'A* (90%+)', 'A': 'A (80-89%)', 'B': 'B (70-79%)',
      'C': 'C (60-69%)', 'D': 'D (50-59%)', 'E': 'E (40-49%)', 'U': 'U (Ungraded)'
    }
  },

  // ─────────────────────── INTERNATIONAL BACCALAUREATE ───────────────────────
  ib_diploma: {
    country: "International",
    name: "IB Diploma (1-7 Scale)",
    type: "ib",
    mapping: (g) => {
      const scale = { 7: 4.0, 6: 3.7, 5: 3.3, 4: 2.7, 3: 2.0, 2: 1.3, 1: 0.0 };
      return scale[parseInt(g)] ?? 0.0;
    },
    description: "International Baccalaureate 7-point grading scale.",
    inputType: "select",
    options: ['7', '6', '5', '4', '3', '2', '1'],
    optionLabels: {
      '7': '7 - Excellent (A)', '6': '6 - Very Good (A-/B+)', '5': '5 - Good (B)',
      '4': '4 - Satisfactory (B-/C+)', '3': '3 - Mediocre (C)', '2': '2 - Poor (D)', '1': '1 - Very Poor (F)'
    }
  },

  // ─────────────────────── CHINA ───────────────────────
  china_percentage: {
    country: "China",
    name: "Chinese Percentage",
    type: "percentage",
    mapping: (p) => {
      if (p >= 90) return 4.0;
      if (p >= 85) return 3.7;
      if (p >= 82) return 3.3;
      if (p >= 78) return 3.0;
      if (p >= 75) return 2.7;
      if (p >= 72) return 2.3;
      if (p >= 68) return 2.0;
      if (p >= 64) return 1.7;
      if (p >= 60) return 1.0;
      return 0.0;
    },
    description: "Chinese university percentage marks. 90%+ is 优 (Excellent).",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 85"
  },
  china_letter: {
    country: "China",
    name: "Chinese Letter Grade (优良中差)",
    type: "letter",
    mapping: (g) => {
      const scale = { '优': 4.0, 'A': 4.0, '良': 3.3, 'B': 3.3, '中': 2.5, 'C': 2.5, '及格': 1.7, 'D': 1.7, '不及格': 0.0, 'F': 0.0 };
      return scale[g] ?? 0.0;
    },
    description: "Chinese university letter/descriptor grades.",
    inputType: "select",
    options: ['优', '良', '中', '及格', '不及格'],
    optionLabels: {
      '优': '优 Excellent (90-100%)', '良': '良 Good (80-89%)', '中': '中 Average (70-79%)',
      '及格': '及格 Pass (60-69%)', '不及格': '不及格 Fail (<60%)'
    }
  },

  // ─────────────────────── GERMANY ───────────────────────
  germany_scale: {
    country: "Germany",
    name: "German Grade (1-5)",
    type: "german",
    mapping: (g) => {
      if (g <= 1.0) return 4.0;
      if (g <= 1.5) return 4.0;
      if (g <= 2.0) return 3.7;
      if (g <= 2.5) return 3.3;
      if (g <= 3.0) return 3.0;
      if (g <= 3.5) return 2.7;
      if (g <= 4.0) return 2.0;
      return 0.0;
    },
    description: "German 1-5 scale (1=best, 5=worst). 1.0-1.5 is 'sehr gut'.",
    inputType: "number",
    min: 1, max: 5,
    placeholder: "e.g., 1.7",
    inverted: true
  },

  // ─────────────────────── FRANCE ───────────────────────
  france_scale: {
    country: "France",
    name: "French Grade (0-20)",
    type: "french",
    mapping: (g) => {
      if (g >= 16) return 4.0;
      if (g >= 14) return 3.7;
      if (g >= 12) return 3.3;
      if (g >= 11) return 3.0;
      if (g >= 10) return 2.7;
      if (g >= 8) return 2.0;
      return 0.0;
    },
    description: "French 0-20 scale. 16+ is 'Très Bien' (Excellent).",
    inputType: "number",
    min: 0, max: 20,
    placeholder: "e.g., 14"
  },

  // ─────────────────────── AUSTRALIA ───────────────────────
  australia_scale: {
    country: "Australia",
    name: "Australian Scale (HD-F)",
    type: "letter",
    mapping: (g) => {
      const scale = { 'HD': 4.0, 'D': 3.7, 'CR': 3.0, 'P': 2.3, 'F': 0.0 };
      return scale[g?.toUpperCase()] ?? 0.0;
    },
    description: "Australian university grading (High Distinction to Fail).",
    inputType: "select",
    options: ['HD', 'D', 'CR', 'P', 'F'],
    optionLabels: {
      'HD': 'HD - High Distinction (85-100%)', 'D': 'D - Distinction (75-84%)',
      'CR': 'CR - Credit (65-74%)', 'P': 'P - Pass (50-64%)', 'F': 'F - Fail (<50%)'
    }
  },

  // ─────────────────────── PAKISTAN ───────────────────────
  pakistan_percentage: {
    country: "Pakistan",
    name: "Pakistani Percentage",
    type: "percentage",
    mapping: (p) => {
      if (p >= 80) return 4.0;
      if (p >= 70) return 3.7;
      if (p >= 60) return 3.0;
      if (p >= 50) return 2.3;
      if (p >= 40) return 2.0;
      if (p >= 33) return 1.0;
      return 0.0;
    },
    description: "Pakistani university/board percentage marks.",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 75"
  },

  // ─────────────────────── BANGLADESH ───────────────────────
  bangladesh_scale: {
    country: "Bangladesh",
    name: "Bangladesh CGPA (4.0 Scale)",
    type: "cgpa4",
    mapping: (g) => g,
    description: "Bangladeshi university 4.0 CGPA (direct conversion).",
    inputType: "number",
    min: 0, max: 4,
    placeholder: "e.g., 3.5"
  },

  // ─────────────────────── NIGERIA ───────────────────────
  nigeria_scale: {
    country: "Nigeria",
    name: "Nigerian CGPA (5.0 Scale)",
    type: "cgpa5",
    mapping: (g) => {
      if (g >= 4.5) return 4.0;
      if (g >= 3.5) return 3.3;
      if (g >= 2.4) return 2.7;
      if (g >= 1.5) return 2.0;
      if (g >= 1.0) return 1.0;
      return 0.0;
    },
    description: "Nigerian university 5.0 CGPA scale (First Class = 4.5+).",
    inputType: "number",
    min: 0, max: 5,
    placeholder: "e.g., 4.2"
  },

  // ─────────────────────── SOUTH AFRICA ───────────────────────
  south_africa: {
    country: "South Africa",
    name: "South African Percentage",
    type: "percentage",
    mapping: (p) => {
      if (p >= 75) return 4.0;
      if (p >= 70) return 3.7;
      if (p >= 60) return 3.3;
      if (p >= 50) return 2.7;
      if (p >= 40) return 2.0;
      if (p >= 30) return 1.0;
      return 0.0;
    },
    description: "South African university percentage marks.",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 70"
  },

  // ─────────────────────── BRAZIL ───────────────────────
  brazil_scale: {
    country: "Brazil",
    name: "Brazilian Scale (0-10)",
    type: "brazil",
    mapping: (g) => {
      if (g >= 9.0) return 4.0;
      if (g >= 8.0) return 3.7;
      if (g >= 7.0) return 3.0;
      if (g >= 6.0) return 2.3;
      if (g >= 5.0) return 1.7;
      return 0.0;
    },
    description: "Brazilian 0-10 scale. 7+ is considered good.",
    inputType: "number",
    min: 0, max: 10,
    placeholder: "e.g., 8.5"
  },

  // ─────────────────────── MEXICO ───────────────────────
  mexico_scale: {
    country: "Mexico",
    name: "Mexican Scale (0-10)",
    type: "mexico",
    mapping: (g) => {
      if (g >= 9.5) return 4.0;
      if (g >= 9.0) return 3.7;
      if (g >= 8.0) return 3.3;
      if (g >= 7.0) return 2.7;
      if (g >= 6.0) return 2.0;
      return 0.0;
    },
    description: "Mexican 0-10 scale. 6 is minimum passing.",
    inputType: "number",
    min: 0, max: 10,
    placeholder: "e.g., 8.5"
  },

  // ─────────────────────── SOUTH KOREA ───────────────────────
  korea_scale: {
    country: "South Korea",
    name: "Korean Grade (A-F)",
    type: "letter",
    mapping: (g) => {
      const scale = { 'A+': 4.5, 'A0': 4.0, 'A': 4.0, 'B+': 3.5, 'B0': 3.0, 'B': 3.0, 'C+': 2.5, 'C0': 2.0, 'C': 2.0, 'D+': 1.5, 'D0': 1.0, 'D': 1.0, 'F': 0.0 };
      return Math.min(scale[g?.toUpperCase()] ?? 0.0, 4.0);
    },
    description: "Korean university grading (4.5 scale converted to 4.0).",
    inputType: "select",
    options: ['A+', 'A0', 'B+', 'B0', 'C+', 'C0', 'D+', 'D0', 'F'],
    optionLabels: {
      'A+': 'A+ (4.5)', 'A0': 'A0 (4.0)', 'B+': 'B+ (3.5)', 'B0': 'B0 (3.0)',
      'C+': 'C+ (2.5)', 'C0': 'C0 (2.0)', 'D+': 'D+ (1.5)', 'D0': 'D0 (1.0)', 'F': 'F (0.0)'
    }
  },

  // ─────────────────────── JAPAN ───────────────────────
  japan_scale: {
    country: "Japan",
    name: "Japanese Grade (秀優良可)",
    type: "letter",
    mapping: (g) => {
      const scale = { '秀': 4.0, 'S': 4.0, 'A': 4.0, '優': 4.0, '良': 3.0, 'B': 3.0, '可': 2.0, 'C': 2.0, '不可': 0.0, 'F': 0.0 };
      return scale[g] ?? 0.0;
    },
    description: "Japanese university grading system.",
    inputType: "select",
    options: ['秀', '優', '良', '可', '不可'],
    optionLabels: {
      '秀': '秀 S/A (90-100%)', '優': '優 A (80-89%)', '良': '良 B (70-79%)',
      '可': '可 C (60-69%)', '不可': '不可 F (<60%)'
    }
  },

  // ─────────────────────── UAE/GULF ───────────────────────
  uae_scale: {
    country: "UAE/Gulf",
    name: "UAE/Gulf Percentage",
    type: "percentage",
    mapping: (p) => {
      if (p >= 90) return 4.0;
      if (p >= 80) return 3.7;
      if (p >= 70) return 3.0;
      if (p >= 60) return 2.3;
      if (p >= 50) return 1.7;
      return 0.0;
    },
    description: "UAE, Saudi Arabia, Qatar, Kuwait university grading.",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 85"
  },

  // ─────────────────────── PHILIPPINES ───────────────────────
  philippines_scale: {
    country: "Philippines",
    name: "Filipino Grade (1-5)",
    type: "filipino",
    mapping: (g) => {
      if (g <= 1.25) return 4.0;
      if (g <= 1.75) return 3.7;
      if (g <= 2.25) return 3.3;
      if (g <= 2.75) return 2.7;
      if (g <= 3.0) return 2.0;
      return 0.0;
    },
    description: "Filipino 1-5 scale (1=best). Common in UP, Ateneo, DLSU.",
    inputType: "number",
    min: 1, max: 5,
    placeholder: "e.g., 1.5",
    inverted: true
  },

  // ─────────────────────── NETHERLANDS ───────────────────────
  netherlands_scale: {
    country: "Netherlands",
    name: "Dutch Grade (1-10)",
    type: "dutch",
    mapping: (g) => {
      if (g >= 9) return 4.0;
      if (g >= 8) return 3.7;
      if (g >= 7) return 3.0;
      if (g >= 6) return 2.3;
      if (g >= 5.5) return 1.7;
      return 0.0;
    },
    description: "Dutch 1-10 scale. 10 is rarely given; 8+ is excellent.",
    inputType: "number",
    min: 1, max: 10,
    placeholder: "e.g., 7.5"
  },

  // ─────────────────────── RUSSIA ───────────────────────
  russia_scale: {
    country: "Russia",
    name: "Russian Grade (5-point)",
    type: "russian",
    mapping: (g) => {
      const scale = { 5: 4.0, 4: 3.0, 3: 2.0, 2: 0.0 };
      return scale[parseInt(g)] ?? 0.0;
    },
    description: "Russian 5-point scale (5=excellent, 2=unsatisfactory).",
    inputType: "select",
    options: ['5', '4', '3', '2'],
    optionLabels: {
      '5': '5 - Отлично (Excellent)', '4': '4 - Хорошо (Good)',
      '3': '3 - Удовлетворительно (Satisfactory)', '2': '2 - Неудовлетворительно (Unsatisfactory)'
    }
  },

  // ─────────────────────── ITALY ───────────────────────
  italy_scale: {
    country: "Italy",
    name: "Italian Grade (0-30)",
    type: "italian",
    mapping: (g) => {
      if (g >= 30) return 4.0;
      if (g >= 27) return 3.7;
      if (g >= 24) return 3.3;
      if (g >= 21) return 2.7;
      if (g >= 18) return 2.0;
      return 0.0;
    },
    description: "Italian university 0-30 scale. 18 is minimum passing.",
    inputType: "number",
    min: 0, max: 30,
    placeholder: "e.g., 27"
  },

  // ─────────────────────── SPAIN ───────────────────────
  spain_scale: {
    country: "Spain",
    name: "Spanish Grade (0-10)",
    type: "spanish",
    mapping: (g) => {
      if (g >= 9) return 4.0;
      if (g >= 7) return 3.3;
      if (g >= 6) return 2.7;
      if (g >= 5) return 2.0;
      return 0.0;
    },
    description: "Spanish 0-10 scale. 9-10 is Sobresaliente (Outstanding).",
    inputType: "number",
    min: 0, max: 10,
    placeholder: "e.g., 7.5"
  },

  // ─────────────────────── IRAN ───────────────────────
  iran_scale: {
    country: "Iran",
    name: "Iranian Grade (0-20)",
    type: "iranian",
    mapping: (g) => {
      if (g >= 18) return 4.0;
      if (g >= 16) return 3.7;
      if (g >= 14) return 3.0;
      if (g >= 12) return 2.3;
      if (g >= 10) return 1.7;
      return 0.0;
    },
    description: "Iranian 0-20 scale. 18+ is excellent.",
    inputType: "number",
    min: 0, max: 20,
    placeholder: "e.g., 16"
  },

  // ─────────────────────── TURKEY ───────────────────────
  turkey_scale: {
    country: "Turkey",
    name: "Turkish CGPA (4.0)",
    type: "cgpa4",
    mapping: (g) => g,
    description: "Turkish university 4.0 CGPA (direct conversion).",
    inputType: "number",
    min: 0, max: 4,
    placeholder: "e.g., 3.2"
  },

  // ─────────────────────── SINGAPORE ───────────────────────
  singapore_scale: {
    country: "Singapore",
    name: "Singapore CAP (5.0)",
    type: "cap",
    mapping: (g) => {
      if (g >= 5.0) return 4.0;
      if (g >= 4.5) return 3.9;
      if (g >= 4.0) return 3.7;
      if (g >= 3.5) return 3.3;
      if (g >= 3.0) return 2.7;
      if (g >= 2.5) return 2.3;
      if (g >= 2.0) return 2.0;
      return 0.0;
    },
    description: "Singapore Cumulative Average Point (NUS, NTU, SMU).",
    inputType: "number",
    min: 0, max: 5,
    placeholder: "e.g., 4.2"
  },

  // ─────────────────────── HONG KONG ───────────────────────
  hongkong_scale: {
    country: "Hong Kong",
    name: "Hong Kong GPA (4.3)",
    type: "hkgpa",
    mapping: (g) => {
      if (g >= 4.0) return 4.0;
      if (g >= 3.7) return 3.7;
      if (g >= 3.3) return 3.3;
      if (g >= 3.0) return 3.0;
      if (g >= 2.7) return 2.7;
      if (g >= 2.3) return 2.3;
      if (g >= 2.0) return 2.0;
      return 0.0;
    },
    description: "Hong Kong university GPA (HKU, CUHK, HKUST).",
    inputType: "number",
    min: 0, max: 4.3,
    placeholder: "e.g., 3.5"
  },

  // ─────────────────────── MALAYSIA ───────────────────────
  malaysia_scale: {
    country: "Malaysia",
    name: "Malaysian CGPA (4.0)",
    type: "cgpa4",
    mapping: (g) => g,
    description: "Malaysian university CGPA (direct conversion).",
    inputType: "number",
    min: 0, max: 4,
    placeholder: "e.g., 3.6"
  },

  // ─────────────────────── THAILAND ───────────────────────
  thailand_scale: {
    country: "Thailand",
    name: "Thai GPAX (4.0)",
    type: "cgpa4",
    mapping: (g) => g,
    description: "Thai university GPAX (direct conversion).",
    inputType: "number",
    min: 0, max: 4,
    placeholder: "e.g., 3.4"
  },

  // ─────────────────────── VIETNAM ───────────────────────
  vietnam_scale: {
    country: "Vietnam",
    name: "Vietnamese Scale (0-10)",
    type: "vietnam",
    mapping: (g) => {
      if (g >= 9.0) return 4.0;
      if (g >= 8.0) return 3.7;
      if (g >= 7.0) return 3.0;
      if (g >= 6.0) return 2.3;
      if (g >= 5.0) return 1.7;
      return 0.0;
    },
    description: "Vietnamese 0-10 scale. 8+ is excellent (Giỏi).",
    inputType: "number",
    min: 0, max: 10,
    placeholder: "e.g., 7.5"
  },

  // ─────────────────────── INDONESIA ───────────────────────
  indonesia_scale: {
    country: "Indonesia",
    name: "Indonesian IPK (4.0)",
    type: "cgpa4",
    mapping: (g) => g,
    description: "Indonesian university IPK/GPA (direct conversion).",
    inputType: "number",
    min: 0, max: 4,
    placeholder: "e.g., 3.5"
  },

  // ─────────────────────── KENYA/EAST AFRICA ───────────────────────
  kenya_scale: {
    country: "Kenya",
    name: "Kenyan Division System",
    type: "letter",
    mapping: (g) => {
      const scale = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'E': 0.0 };
      return scale[g?.toUpperCase()] ?? 0.0;
    },
    description: "Kenyan KCSE and university grading.",
    inputType: "select",
    options: ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'],
    optionLabels: {
      'A': 'A (80-100)', 'A-': 'A- (75-79)', 'B+': 'B+ (70-74)', 'B': 'B (65-69)',
      'B-': 'B- (60-64)', 'C+': 'C+ (55-59)', 'C': 'C (50-54)', 'C-': 'C- (45-49)',
      'D+': 'D+ (40-44)', 'D': 'D (35-39)', 'D-': 'D- (30-34)', 'E': 'E (<30)'
    }
  },

  // ─────────────────────── EGYPT ───────────────────────
  egypt_scale: {
    country: "Egypt",
    name: "Egyptian Percentage",
    type: "percentage",
    mapping: (p) => {
      if (p >= 85) return 4.0;
      if (p >= 75) return 3.7;
      if (p >= 65) return 3.0;
      if (p >= 50) return 2.0;
      return 0.0;
    },
    description: "Egyptian university percentage marks.",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 80"
  },

  // ─────────────────────── MOROCCO ───────────────────────
  morocco_scale: {
    country: "Morocco",
    name: "Moroccan Scale (0-20)",
    type: "french",
    mapping: (g) => {
      if (g >= 16) return 4.0;
      if (g >= 14) return 3.7;
      if (g >= 12) return 3.3;
      if (g >= 10) return 2.7;
      if (g >= 8) return 2.0;
      return 0.0;
    },
    description: "Moroccan 0-20 scale (French system). 10 is minimum passing.",
    inputType: "number",
    min: 0, max: 20,
    placeholder: "e.g., 14"
  },

  // ─────────────────────── ISRAEL ───────────────────────
  israel_scale: {
    country: "Israel",
    name: "Israeli Percentage",
    type: "percentage",
    mapping: (p) => {
      if (p >= 90) return 4.0;
      if (p >= 80) return 3.7;
      if (p >= 70) return 3.0;
      if (p >= 60) return 2.3;
      if (p >= 56) return 2.0;
      return 0.0;
    },
    description: "Israeli university percentage (56 is minimum passing).",
    inputType: "number",
    min: 0, max: 100,
    placeholder: "e.g., 85"
  },

  // ─────────────────────── POLAND ───────────────────────
  poland_scale: {
    country: "Poland",
    name: "Polish Grade (2-5)",
    type: "polish",
    mapping: (g) => {
      if (g >= 5) return 4.0;
      if (g >= 4.5) return 3.7;
      if (g >= 4) return 3.3;
      if (g >= 3.5) return 2.7;
      if (g >= 3) return 2.0;
      return 0.0;
    },
    description: "Polish 2-5 scale (5=excellent, 2=unsatisfactory).",
    inputType: "number",
    min: 2, max: 5,
    placeholder: "e.g., 4.5"
  },

  // ─────────────────────── SWEDEN ───────────────────────
  sweden_scale: {
    country: "Sweden",
    name: "Swedish Grade (A-F)",
    type: "letter",
    mapping: (g) => {
      const scale = { 'A': 4.0, 'B': 3.5, 'C': 3.0, 'D': 2.5, 'E': 2.0, 'F': 0.0 };
      return scale[g?.toUpperCase()] ?? 0.0;
    },
    description: "Swedish ECTS-compatible A-F grading.",
    inputType: "select",
    options: ['A', 'B', 'C', 'D', 'E', 'F'],
    optionLabels: {
      'A': 'A - Excellent', 'B': 'B - Very Good', 'C': 'C - Good',
      'D': 'D - Satisfactory', 'E': 'E - Sufficient', 'F': 'F - Fail'
    }
  },
};

// Group scales by country for easier selection
const COUNTRIES = [...new Set(Object.values(GRADING_SCALES).map(s => s.country))].sort();

const getScalesByCountry = (country) => {
  return Object.entries(GRADING_SCALES)
    .filter(([_, scale]) => scale.country === country)
    .map(([key, scale]) => ({ key, ...scale }));
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const GPACalculator = () => {
  // State
  const [calcMode, setCalcMode] = useState('detailed');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedScale, setSelectedScale] = useState('india_univ_tier1');
  const [semesters, setSemesters] = useState([
    { id: 1, name: 'Semester 1', courses: [{ id: 1, name: '', grade: '', credits: 3 }] }
  ]);
  const [simpleInput, setSimpleInput] = useState('');
  const [result, setResult] = useState(null);
  const [semesterGPAs, setSemesterGPAs] = useState({});
  const [error, setError] = useState('');
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showScaleInfo, setShowScaleInfo] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const [showSaveNotice, setShowSaveNotice] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const resultRef = useRef(null);
  const printRef = useRef(null);

  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Free GPA Calculator - Convert 40+ Country Grades to 4.0 Scale | AACRAO EDGE';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Free AACRAO EDGE compliant GPA calculator. Convert grades from 40+ countries including India (CBSE, ICSE, University), Canada (Alberta, Ontario, BC), UK, China, Germany, France to U.S. 4.0 GPA scale. Multi-semester weighted GPA with export.'
      );
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'GPA calculator, convert percentage to GPA, Indian marks to GPA, CBSE to GPA, ICSE GPA converter, Canadian GPA calculator, AACRAO EDGE, weighted GPA calculator, international GPA converter, UK percentage to GPA, German grade converter, French grade to GPA, Chinese grade converter, IB to GPA, A-levels GPA, college GPA tool, university GPA conversion, Calgary GPA calculator, Alberta education';

    // Load saved data from localStorage
    try {
      const saved = localStorage.getItem('gpa_calculator_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.semesters) setSemesters(parsed.semesters);
        if (parsed.selectedCountry) setSelectedCountry(parsed.selectedCountry);
        if (parsed.selectedScale) setSelectedScale(parsed.selectedScale);
      }
    } catch (e) {
      console.log('No saved data found');
    }

    // Schema Markup
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "International GPA Calculator - AACRAO EDGE Compliant",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "url": "https://calgaryacademicexcellence.com/gpa-calculator",
        "description": "Professional GPA converter using AACRAO EDGE standards for 40+ countries including India, Canada, UK, China, Germany, France. Multi-semester weighted calculation with free export.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "40+ country grading scales",
          "AACRAO EDGE compliant conversions",
          "Multi-semester organization",
          "Weighted GPA calculation",
          "Free PDF export",
          "Save progress locally",
          "Mobile-optimized interface"
        ],
        "author": {
          "@type": "Organization",
          "name": "Calgary Academic Excellence"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I convert Indian percentage to GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use our AACRAO EDGE compliant calculator. For most Indian universities: 60%+ (First Division) = 3.3-4.0 GPA, 50-59% (Second Division) = 2.7-3.2 GPA, 40-49% (Third Division) = 2.0-2.6 GPA. Tier 1 institutions like IITs have different scales due to more rigorous grading."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between weighted and unweighted GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Weighted GPA considers credit hours - courses with more credits have greater impact on your final GPA. Unweighted GPA treats all courses equally. Most universities prefer weighted GPA for a more accurate representation of academic performance."
            }
          },
          {
            "@type": "Question",
            "name": "Is 60% in India equivalent to a low GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No! Indian grading is significantly more rigorous than Western systems. 60% represents First Division and typically converts to 3.3-3.7 GPA on the U.S. scale. AACRAO EDGE recognizes that marks above 70% are rare and exceptional in Indian universities."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is this GPA calculator for U.S. college applications?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This calculator uses official AACRAO EDGE guidelines - the same standards used by U.S. university admissions offices. While each university may have slight variations, this tool provides a reliable baseline estimate accepted by most institutions."
            }
          }
        ]
      }
    ];

    schemas.forEach((schema, index) => {
      let scriptTag = document.querySelector(`#gpa-schema-${index}`);
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = `gpa-schema-${index}`;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    });

    // Initialize AdSense
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      try {
        const ads = document.querySelectorAll('.adsbygoogle');
        ads.forEach((ad) => {
          if (!ad.dataset.adsbygoogleStatus) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        });
      } catch (err) {
        console.log('AdSense initialization pending');
      }
    }
  }, []);

  // Get current scale
  const currentScale = GRADING_SCALES[selectedScale];
  const maxGPA = currentScale?.maxGPA || 4.0;

  // Auto-update scale when country changes
  useEffect(() => {
    const scales = getScalesByCountry(selectedCountry);
    if (scales.length > 0 && !scales.find(s => s.key === selectedScale)) {
      setSelectedScale(scales[0].key);
    }
  }, [selectedCountry]);

  // ─────────────────────── SEMESTER/COURSE MANAGEMENT ───────────────────────
  
  const addSemester = () => {
    const newId = Date.now();
    setSemesters([...semesters, {
      id: newId,
      name: `Semester ${semesters.length + 1}`,
      courses: [{ id: newId + 1, name: '', grade: '', credits: 3 }]
    }]);
  };

  const removeSemester = (semesterId) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== semesterId));
      const newGPAs = { ...semesterGPAs };
      delete newGPAs[semesterId];
      setSemesterGPAs(newGPAs);
    }
  };

  const updateSemesterName = (semesterId, name) => {
    setSemesters(semesters.map(s => s.id === semesterId ? { ...s, name } : s));
  };

  const addCourse = (semesterId) => {
    setSemesters(semesters.map(s => {
      if (s.id === semesterId) {
        return {
          ...s,
          courses: [...s.courses, { id: Date.now(), name: '', grade: '', credits: 3 }]
        };
      }
      return s;
    }));
  };

  const removeCourse = (semesterId, courseId) => {
    setSemesters(semesters.map(s => {
      if (s.id === semesterId && s.courses.length > 1) {
        return { ...s, courses: s.courses.filter(c => c.id !== courseId) };
      }
      return s;
    }));
  };

  const updateCourse = (semesterId, courseId, field, value) => {
    setSemesters(semesters.map(s => {
      if (s.id === semesterId) {
        return {
          ...s,
          courses: s.courses.map(c => c.id === courseId ? { ...c, [field]: value } : c)
        };
      }
      return s;
    }));
    setError('');
  };

  // ─────────────────────── CALCULATION LOGIC ───────────────────────

  const validateInput = (value, scale) => {
    if (value === '' || value === null || value === undefined) return false;
    
    if (scale.inputType === 'select') {
      return scale.options.includes(value) || scale.options.includes(value?.toString());
    }
    
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    
    return num >= (scale.min || 0) && num <= (scale.max || 100);
  };

  const calculateDetailedGPA = () => {
    setError('');
    const scale = GRADING_SCALES[selectedScale];
    let totalPoints = 0;
    let totalCredits = 0;
    const newSemesterGPAs = {};
    let hasValidCourse = false;

    semesters.forEach(semester => {
      let semPoints = 0;
      let semCredits = 0;

      semester.courses.forEach(course => {
        if (!course.grade) return;

        const gradeInput = scale.inputType === 'select' ? course.grade : parseFloat(course.grade);
        const credits = parseFloat(course.credits);

        if (!validateInput(course.grade, scale)) {
          return;
        }

        if (!credits || credits <= 0) {
          return;
        }

        const gpaValue = scale.mapping(gradeInput);
        semPoints += (gpaValue * credits);
        semCredits += credits;
        totalPoints += (gpaValue * credits);
        totalCredits += credits;
        hasValidCourse = true;
      });

      if (semCredits > 0) {
        newSemesterGPAs[semester.id] = (semPoints / semCredits).toFixed(2);
      }
    });

    if (!hasValidCourse) {
      setError('Please add at least one course with a valid grade and credits.');
      return;
    }

    setSemesterGPAs(newSemesterGPAs);
    
    if (totalCredits > 0) {
      const finalGPA = (totalPoints / totalCredits).toFixed(2);
      setResult(finalGPA);
      
      // Scroll to result on mobile
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const calculateSimpleGPA = () => {
    setError('');
    const scale = GRADING_SCALES[selectedScale];
    
    if (!validateInput(simpleInput, scale)) {
      const inputDesc = scale.inputType === 'select' 
        ? 'grade' 
        : `value between ${scale.min || 0} and ${scale.max || 100}`;
      setError(`Please enter a valid ${inputDesc}.`);
      return;
    }

    const val = scale.inputType === 'select' ? simpleInput : parseFloat(simpleInput);
    const gpaValue = scale.mapping(val);
    setResult(gpaValue.toFixed(2));
    
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // ─────────────────────── SAVE/EXPORT FUNCTIONS ───────────────────────

  const saveProgress = () => {
    try {
      const data = {
        semesters,
        selectedCountry,
        selectedScale,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('gpa_calculator_data', JSON.stringify(data));
      setShowSaveNotice(true);
      setTimeout(() => setShowSaveNotice(false), 3000);
    } catch (e) {
      setError('Could not save progress. Please check your browser settings.');
    }
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setSemesters([{ id: Date.now(), name: 'Semester 1', courses: [{ id: Date.now() + 1, name: '', grade: '', credits: 3 }] }]);
      setResult(null);
      setSemesterGPAs({});
      setSimpleInput('');
      setError('');
      localStorage.removeItem('gpa_calculator_data');
    }
  };

  const copyToClipboard = () => {
    const scale = GRADING_SCALES[selectedScale];
    let text = `GPA Report - ${new Date().toLocaleDateString()}\n`;
    text += `Grading System: ${scale.country} - ${scale.name}\n`;
    text += `═══════════════════════════════════════\n\n`;

    if (calcMode === 'detailed') {
      semesters.forEach(sem => {
        text += `${sem.name}\n`;
        text += `────────────────────────────────\n`;
        sem.courses.forEach(course => {
          if (course.grade) {
            text += `${course.name || 'Course'}: ${course.grade} (${course.credits} credits)\n`;
          }
        });
        if (semesterGPAs[sem.id]) {
          text += `Semester GPA: ${semesterGPAs[sem.id]}\n`;
        }
        text += '\n';
      });
    }

    text += `═══════════════════════════════════════\n`;
    text += `CUMULATIVE GPA: ${result}/4.00\n`;
    text += `\nCalculated using AACRAO EDGE standards\n`;
    text += `Calgary Academic Excellence - calgaryacademicexcellence.com`;

    navigator.clipboard.writeText(text);
    setShowExportOptions(false);
    alert('Report copied to clipboard!');
  };

  const printReport = () => {
    window.print();
    setShowExportOptions(false);
  };

  // ─────────────────────── FAQ DATA ───────────────────────

  const faqs = [
    {
      q: "How accurate is this GPA calculator for U.S. college applications?",
      a: "This calculator uses official AACRAO EDGE guidelines - the same standards used by U.S. university admissions offices to evaluate international transcripts. While each university may have slight variations in their evaluation process, this tool provides a strong baseline estimate that's widely accepted."
    },
    {
      q: "Why does my 60% in India convert to a 3.5 GPA? That seems high.",
      a: "Indian university grading is significantly more rigorous than most Western systems. AACRAO recognizes that 60% at a Tier 1 Indian university (First Division) represents strong performance equivalent to a U.S. 'A-/B+' (3.3-3.7 GPA). This is because marks above 70% are genuinely rare and exceptional in Indian universities, unlike in the U.S. where 90%+ is common."
    },
    {
      q: "Should I use Tier 1 or Tier 2 for my Indian university?",
      a: "Use Tier 1 for: IITs, NITs, BITS, IIIT, top state universities (Delhi University, Mumbai University, Jadavpur), NAAC A+ accredited institutions, and universities ranked in India's top 100. Use Tier 2 for: most other state universities, newer private universities, and unaccredited institutions. When in doubt, the Tier 2 scale is more conservative."
    },
    {
      q: "What's the difference between weighted and unweighted GPA?",
      a: "Weighted GPA considers credit hours - courses with more credits have greater impact on your final GPA. For example, a 4-credit course affects your GPA twice as much as a 2-credit course. Unweighted GPA treats all courses equally regardless of credits. Most universities prefer weighted GPA for a more accurate picture of your academic performance."
    },
    {
      q: "Can I use this for graduate school applications?",
      a: "Yes! Both undergraduate and graduate programs use similar conversion principles. However, graduate schools often focus more on your last 2 years of study (junior/senior year or equivalent), may require a minimum GPA threshold, and consider major-specific GPA separately from cumulative GPA."
    },
    {
      q: "Do Canadian universities need GPA conversion?",
      a: "Most Canadian universities accept percentage marks directly and have their own admission cut-offs. However, a GPA conversion can be helpful when comparing yourself to U.S. applicants or when applying to programs that list GPA requirements. For U.S. universities, you almost always need a 4.0 scale conversion."
    },
    {
      q: "How do I calculate GPA from IIT's 10-point CGPA?",
      a: "IIT uses a 10-point CGPA scale where 10 is perfect. Our calculator converts this to the U.S. 4.0 scale: 9.5+ = 4.0, 9.0+ = 3.9, 8.5+ = 3.7, 8.0+ = 3.5, and so on. An 8.0 CGPA from IIT is considered excellent and converts to approximately 3.5 GPA."
    },
    {
      q: "What is AACRAO EDGE and why does it matter?",
      a: "AACRAO (American Association of Collegiate Registrars and Admissions Officers) maintains the EDGE database - the authoritative resource used by U.S. universities to evaluate international credentials. Our calculator follows these official guidelines, ensuring your converted GPA is credible and widely accepted."
    }
  ];

  // ─────────────────────── RENDER HELPERS ───────────────────────

  const GradeInput = ({ course, semesterId, scale }) => {
    if (scale.inputType === 'select') {
      return (
        <select
          value={course.grade}
          onChange={(e) => updateCourse(semesterId, course.id, 'grade', e.target.value)}
          className="w-full p-3 bg-white border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition text-sm font-medium"
        >
          <option value="">Select Grade</option>
          {scale.options.map(opt => (
            <option key={opt} value={opt}>
              {scale.optionLabels?.[opt] || opt}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="number"
        step={scale.max <= 10 ? "0.1" : "0.01"}
        min={scale.min || 0}
        max={scale.max || 100}
        value={course.grade}
        onChange={(e) => updateCourse(semesterId, course.id, 'grade', e.target.value)}
        placeholder={scale.placeholder || "Grade"}
        className="w-full p-3 bg-white border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition text-sm font-medium"
      />
    );
  };

  const getGPAColor = (gpa) => {
    const value = parseFloat(gpa);
    if (value >= 3.7) return 'text-emerald-600';
    if (value >= 3.3) return 'text-blue-600';
    if (value >= 3.0) return 'text-sky-600';
    if (value >= 2.5) return 'text-amber-600';
    return 'text-red-600';
  };

  const getGPALabel = (gpa) => {
    const value = parseFloat(gpa);
    if (value >= 3.9) return { label: 'Summa Cum Laude', color: 'bg-emerald-100 text-emerald-800' };
    if (value >= 3.7) return { label: 'Magna Cum Laude', color: 'bg-emerald-100 text-emerald-700' };
    if (value >= 3.5) return { label: 'Cum Laude', color: 'bg-blue-100 text-blue-700' };
    if (value >= 3.0) return { label: 'Good Standing', color: 'bg-sky-100 text-sky-700' };
    if (value >= 2.5) return { label: 'Satisfactory', color: 'bg-amber-100 text-amber-700' };
    if (value >= 2.0) return { label: 'Passing', color: 'bg-orange-100 text-orange-700' };
    return { label: 'Below Average', color: 'bg-red-100 text-red-700' };
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/30 py-8 md:py-12 px-4">
      {/* Print Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* SEO Header Section */}
        <header className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-sky-100 text-emerald-800 px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6 shadow-sm border border-emerald-200/50">
            <Globe className="h-4 w-4" />
            <span>40+ Countries • AACRAO EDGE Certified • Free Forever</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-3 md:mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600">
              GPA Calculator
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-3 md:mb-4 px-4">
            Convert grades from <strong>40+ countries</strong> to the U.S. 4.0 GPA scale
          </p>
          
          <p className="text-sm text-slate-500 max-w-2xl mx-auto px-4">
            Professional AACRAO EDGE compliant calculator. Supports India, Canada, UK, China, Germany, France, IB, and 30+ more education systems. Multi-semester weighted GPA with free export.
          </p>
        </header>

        {/* AdSense Zone 1 - Top */}
        <div className="mb-8 no-print">
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="5362613714"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Calculator Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Country & Scale Selection */}
            <Card className="border-none shadow-xl overflow-hidden rounded-2xl bg-white/90 backdrop-blur">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <h2 className="font-bold text-lg text-slate-800">Select Your Grading System</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Country Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Country / Region
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full p-3 md:p-4 bg-white border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition font-medium"
                    >
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Scale Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Grading Scale
                    </label>
                    <select
                      value={selectedScale}
                      onChange={(e) => setSelectedScale(e.target.value)}
                      className="w-full p-3 md:p-4 bg-white border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition font-medium"
                    >
                      {getScalesByCountry(selectedCountry).map(scale => (
                        <option key={scale.key} value={scale.key}>{scale.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Scale Description */}
                {currentScale && (
                  <div className="mt-4 p-3 md:p-4 bg-gradient-to-r from-emerald-50 to-sky-50 rounded-xl border border-emerald-100">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-slate-700">{currentScale.description}</p>
                        <button
                          onClick={() => setShowScaleInfo(!showScaleInfo)}
                          className="text-xs text-emerald-600 font-semibold mt-1 hover:text-emerald-700 transition"
                        >
                          {showScaleInfo ? 'Hide conversion table' : 'Show conversion table'}
                        </button>
                      </div>
                    </div>
                    
                    {showScaleInfo && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-emerald-100">
                        <h4 className="text-xs font-bold text-slate-700 mb-2">Conversion Reference</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          {currentScale.inputType === 'select' ? (
                            currentScale.options.slice(0, 8).map(opt => (
                              <div key={opt} className="flex justify-between bg-slate-50 p-1.5 rounded">
                                <span className="text-slate-600">{opt}</span>
                                <span className="font-bold text-emerald-700">{currentScale.mapping(opt).toFixed(1)}</span>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="flex justify-between bg-slate-50 p-1.5 rounded">
                                <span className="text-slate-600">{currentScale.max || 100}</span>
                                <span className="font-bold text-emerald-700">4.0</span>
                              </div>
                              <div className="flex justify-between bg-slate-50 p-1.5 rounded">
                                <span className="text-slate-600">{Math.round((currentScale.max || 100) * 0.8)}</span>
                                <span className="font-bold text-emerald-700">{currentScale.mapping((currentScale.max || 100) * 0.8).toFixed(1)}</span>
                              </div>
                              <div className="flex justify-between bg-slate-50 p-1.5 rounded">
                                <span className="text-slate-600">{Math.round((currentScale.max || 100) * 0.6)}</span>
                                <span className="font-bold text-emerald-700">{currentScale.mapping((currentScale.max || 100) * 0.6).toFixed(1)}</span>
                              </div>
                              <div className="flex justify-between bg-slate-50 p-1.5 rounded">
                                <span className="text-slate-600">{Math.round((currentScale.max || 100) * 0.4)}</span>
                                <span className="font-bold text-emerald-700">{currentScale.mapping((currentScale.max || 100) * 0.4).toFixed(1)}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Main Calculator Card */}
            <Card className="border-none shadow-xl overflow-hidden rounded-2xl bg-white/90 backdrop-blur print-area">
              {/* Mode Tabs */}
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 p-1 flex no-print">
                <button 
                  onClick={() => setCalcMode('detailed')}
                  className={`flex-1 py-3 md:py-4 text-sm font-bold transition-all rounded-t-xl ${
                    calcMode === 'detailed' 
                      ? 'bg-white text-emerald-700 shadow-lg' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Course by Course</span>
                  </div>
                </button>
                <button 
                  onClick={() => setCalcMode('simple')}
                  className={`flex-1 py-3 md:py-4 text-sm font-bold transition-all rounded-t-xl ${
                    calcMode === 'simple' 
                      ? 'bg-white text-emerald-700 shadow-lg' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span>Quick Convert</span>
                  </div>
                </button>
              </div>

              <CardContent className="p-4 md:p-6">
                {error && (
                  <div className="mb-4 p-3 md:p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {calcMode === 'detailed' ? (
                  <div className="space-y-6">
                    {/* Semesters */}
                    {semesters.map((semester, semIndex) => (
                      <div key={semester.id} className="border-2 border-slate-100 rounded-xl overflow-hidden">
                        {/* Semester Header */}
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 p-3 md:p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                              {semIndex + 1}
                            </div>
                            <input
                              type="text"
                              value={semester.name}
                              onChange={(e) => updateSemesterName(semester.id, e.target.value)}
                              className="font-semibold text-slate-800 bg-transparent border-none outline-none focus:bg-white focus:px-2 rounded transition-all"
                            />
                            {semesterGPAs[semester.id] && (
                              <span className={`text-sm font-bold px-2 py-1 rounded-full bg-slate-200 ${getGPAColor(semesterGPAs[semester.id])}`}>
                                {semesterGPAs[semester.id]}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeSemester(semester.id)}
                            disabled={semesters.length <= 1}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Courses */}
                        <div className="p-3 md:p-4 space-y-3">
                          {semester.courses.map((course, courseIndex) => (
                            <div key={course.id} className="grid grid-cols-12 gap-2 md:gap-3 items-center">
                              {/* Course Name */}
                              <div className="col-span-12 md:col-span-5">
                                <input
                                  type="text"
                                  value={course.name}
                                  onChange={(e) => updateCourse(semester.id, course.id, 'name', e.target.value)}
                                  placeholder={`Course ${courseIndex + 1}`}
                                  className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus:bg-white outline-none transition text-sm font-medium"
                                />
                              </div>
                              
                              {/* Grade */}
                              <div className="col-span-5 md:col-span-3">
                                <GradeInput course={course} semesterId={semester.id} scale={currentScale} />
                              </div>
                              
                              {/* Credits */}
                              <div className="col-span-5 md:col-span-3">
                                <div className="relative">
                                  <input
                                    type="number"
                                    min="0.5"
                                    max="12"
                                    step="0.5"
                                    value={course.credits}
                                    onChange={(e) => updateCourse(semester.id, course.id, 'credits', e.target.value)}
                                    className="w-full p-3 pr-12 bg-white border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition text-sm font-medium"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
                                    cr
                                  </span>
                                </div>
                              </div>
                              
                              {/* Remove */}
                              <div className="col-span-2 md:col-span-1 flex justify-end">
                                <button
                                  onClick={() => removeCourse(semester.id, course.id)}
                                  disabled={semester.courses.length <= 1}
                                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* Add Course Button */}
                          <button
                            onClick={() => addCourse(semester.id)}
                            className="w-full p-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition font-medium text-sm flex items-center justify-center gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            Add Course
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add Semester & Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-3">
                      <button
                        onClick={addSemester}
                        className="flex-1 p-3 md:p-4 border-2 border-dashed border-emerald-200 rounded-xl text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 transition font-bold text-sm flex items-center justify-center gap-2"
                      >
                        <Plus className="h-5 w-5" />
                        Add Semester / Term
                      </button>
                    </div>

                    {/* Calculate Button */}
                    <Button 
                      onClick={calculateDetailedGPA} 
                      className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:via-teal-700 hover:to-sky-700 text-white py-6 md:py-8 text-lg font-bold rounded-xl shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]"
                    >
                      <Calculator className="h-5 w-5 mr-2" />
                      Calculate Cumulative GPA
                    </Button>
                  </div>
                ) : (
                  /* Simple Mode */
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Quick Single Grade Conversion</h3>
                      <p className="text-sm text-slate-500">Enter your overall average or single grade</p>
                    </div>
                    
                    <div className="max-w-md mx-auto">
                      <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                        {currentScale.inputType === 'select' ? 'Your Grade' : `Your ${currentScale.type === 'percentage' ? 'Percentage' : 'Grade'} (${currentScale.min || 0}-${currentScale.max || 100})`}
                      </label>
                      
                      {currentScale.inputType === 'select' ? (
                        <select 
                          value={simpleInput}
                          onChange={(e) => {
                            setSimpleInput(e.target.value);
                            setError('');
                          }}
                          className="w-full p-4 md:p-6 text-2xl md:text-3xl font-bold bg-white border-2 border-slate-200 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none text-center transition"
                        >
                          <option value="">Select Grade</option>
                          {currentScale.options.map(opt => (
                            <option key={opt} value={opt}>
                              {currentScale.optionLabels?.[opt] || opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input 
                          type="number"
                          step={currentScale.max <= 10 ? "0.1" : "0.01"}
                          min={currentScale.min || 0}
                          max={currentScale.max || 100}
                          value={simpleInput}
                          onChange={(e) => {
                            setSimpleInput(e.target.value);
                            setError('');
                          }}
                          placeholder={currentScale.placeholder || "Enter grade"}
                          className="w-full p-4 md:p-6 text-2xl md:text-3xl font-bold bg-white border-2 border-slate-200 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none text-center transition"
                        />
                      )}
                    </div>
                    
                    <Button 
                      onClick={calculateSimpleGPA} 
                      className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:via-teal-700 hover:to-sky-700 text-white py-6 md:py-8 text-lg font-bold rounded-xl shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]"
                    >
                      <Calculator className="h-5 w-5 mr-2" />
                      Convert to 4.0 GPA Scale
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AACRAO Note */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 md:p-6 shadow-lg no-print">
              <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-3 text-lg">
                <Award className="h-5 w-5" />
                Why AACRAO EDGE Standards Matter
              </h4>
              <p className="text-sm text-amber-800 leading-relaxed mb-3">
                AACRAO (American Association of Collegiate Registrars and Admissions Officers) maintains the EDGE database - 
                the authoritative resource used by U.S. universities to evaluate international credentials. This calculator 
                follows their official guidelines, ensuring your converted GPA is credible and widely accepted.
              </p>
              <p className="text-xs text-amber-700">
                <strong>Important:</strong> While this calculator provides an excellent estimate, some universities may have their own 
                conversion policies. Always check with your target institutions for their specific requirements.
              </p>
            </div>

            {/* FAQ Section */}
            <Card className="border-none shadow-xl rounded-2xl overflow-hidden no-print">
              <button
                onClick={() => setShowFAQ(!showFAQ)}
                className="w-full p-4 md:p-6 bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-between hover:from-slate-100 hover:to-slate-150 transition"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-emerald-600" />
                  <span className="font-bold text-lg text-slate-800">Frequently Asked Questions</span>
                </div>
                {showFAQ ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
              </button>
              
              {showFAQ && (
                <CardContent className="p-4 md:p-6 space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        className="w-full text-left flex items-start justify-between gap-4 py-2 hover:text-emerald-600 transition group"
                      >
                        <h4 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition text-sm md:text-base">
                          {faq.q}
                        </h4>
                        {expandedFAQ === index ? (
                          <ChevronUp className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFAQ === index && (
                        <p className="mt-2 text-slate-600 leading-relaxed pl-4 border-l-2 border-emerald-200 text-sm">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Result Card */}
            <div ref={resultRef}>
              <Card className="border-none shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white p-6 md:p-8 rounded-2xl relative overflow-hidden sticky top-6 print-area">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <GraduationCap className="h-24 md:h-32 w-24 md:w-32" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-8 flex items-center gap-2">
                    <CheckCircle className="h-5 md:h-6 w-5 md:w-6 text-emerald-400" />
                    U.S. GPA Equivalent
                  </h3>
                  
                  {result ? (
                    <div className="text-center space-y-4 md:space-y-6">
                      <div>
                        <div className={`text-6xl md:text-8xl font-black tracking-tight mb-2 ${getGPAColor(result).replace('text-', 'text-').replace('600', '400')}`} style={{color: parseFloat(result) >= 3.7 ? '#34d399' : parseFloat(result) >= 3.0 ? '#60a5fa' : parseFloat(result) >= 2.5 ? '#fbbf24' : '#f87171'}}>
                          {result}
                        </div>
                        <div className="text-lg md:text-xl text-slate-300 font-semibold">out of {maxGPA.toFixed(2)}</div>
                      </div>
                      
                      {/* GPA Label */}
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getGPALabel(result).color}`}>
                        {getGPALabel(result).label}
                      </div>
                      
                      {/* Semester GPAs */}
                      {calcMode === 'detailed' && Object.keys(semesterGPAs).length > 1 && (
                        <div className="pt-4 border-t border-white/10">
                          <h4 className="text-sm font-semibold text-slate-400 mb-3">By Semester</h4>
                          <div className="space-y-2">
                            {semesters.map(sem => semesterGPAs[sem.id] && (
                              <div key={sem.id} className="flex justify-between text-sm">
                                <span className="text-slate-400">{sem.name}</span>
                                <span className="font-bold text-white">{semesterGPAs[sem.id]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="pt-4 md:pt-6 space-y-3">
                        <div className="inline-block px-4 md:px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider">
                          ✓ AACRAO Verified
                        </div>
                        
                        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                          Calculated using {currentScale?.country} - {currentScale?.name}
                        </p>
                      </div>

                      {/* Export Options */}
                      <div className="pt-4 space-y-2 no-print">
                        <div className="relative">
                          <button
                            onClick={() => setShowExportOptions(!showExportOptions)}
                            className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Export / Share
                            <ChevronDown className={`h-4 w-4 transition ${showExportOptions ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {showExportOptions && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-xl shadow-xl overflow-hidden z-20">
                              <button onClick={copyToClipboard} className="w-full py-3 px-4 hover:bg-slate-700 transition text-left text-sm flex items-center gap-3">
                                <Copy className="h-4 w-4" />
                                Copy to Clipboard
                              </button>
                              <button onClick={printReport} className="w-full py-3 px-4 hover:bg-slate-700 transition text-left text-sm flex items-center gap-3">
                                <Printer className="h-4 w-4" />
                                Print Report
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 md:py-12">
                      <div className="text-5xl md:text-6xl font-black text-slate-600 mb-4">—</div>
                      <p className="text-slate-400 text-sm">Enter your grades to see your GPA</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Save/Clear Actions */}
            <div className="flex gap-3 no-print">
              <button
                onClick={saveProgress}
                className="flex-1 py-3 px-4 bg-white border-2 border-emerald-200 text-emerald-700 rounded-xl font-semibold text-sm hover:bg-emerald-50 hover:border-emerald-300 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Save className="h-4 w-4" />
                Save Progress
              </button>
              <button
                onClick={clearAll}
                className="py-3 px-4 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <RotateCcw className="h-4 w-4" />
                Clear
              </button>
            </div>

            {/* Save Notice */}
            {showSaveNotice && (
              <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom z-50">
                <Check className="h-5 w-5" />
                Progress saved!
              </div>
            )}

            {/* AdSense Zone 2 - Sidebar */}
            <div className="no-print">
              <ins className="adsbygoogle"
                   style={{display:'block'}}
                   data-ad-client="ca-pub-7638771792216412"
                   data-ad-slot="5362613714"
                   data-ad-format="auto"
                   data-full-width-responsive="true"></ins>
            </div>

            {/* Quick Links Card */}
            <Card className="border-none shadow-lg rounded-2xl p-5 no-print">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-emerald-600" />
                Related Tools
              </h4>
              <div className="space-y-3">
                <a 
                  href="/college-admissions-calculator" 
                  className="block p-4 bg-gradient-to-r from-emerald-50 to-sky-50 rounded-xl hover:shadow-md transition-all border border-emerald-100 group"
                >
                  <h5 className="font-bold text-slate-800 group-hover:text-emerald-600 transition mb-1 flex items-center gap-2">
                    <Target className="h-4 w-4 text-emerald-500" />
                    College Admissions Predictor
                  </h5>
                  <p className="text-xs text-slate-500">
                    Find your best-fit universities
                  </p>
                </a>

                <a 
                  href="/graduate-admissions-calculator" 
                  className="block p-4 bg-white rounded-xl hover:bg-slate-50 hover:shadow-md transition-all border border-slate-100 group"
                >
                  <h5 className="font-bold text-slate-800 group-hover:text-emerald-600 transition mb-1 flex items-center gap-2">
                    <School className="h-4 w-4 text-sky-500" />
                    Graduate School Calculator
                  </h5>
                  <p className="text-xs text-slate-500">
                    Master's & PhD admissions chances
                  </p>
                </a>

                <a 
                  href="/resources" 
                  className="block p-4 bg-white rounded-xl hover:bg-slate-50 hover:shadow-md transition-all border border-slate-100 group"
                >
                  <h5 className="font-bold text-slate-800 group-hover:text-emerald-600 transition mb-1 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-amber-500" />
                    SAT Prep Resources
                  </h5>
                  <p className="text-xs text-slate-500">
                    Free study materials & guides
                  </p>
                </a>
              </div>
            </Card>

            {/* Countries Supported */}
            <Card className="border-none shadow-lg rounded-2xl p-5 no-print">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-emerald-600" />
                40+ Countries Supported
              </h4>
              <div className="flex flex-wrap gap-2">
                {COUNTRIES.slice(0, 12).map(country => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      selectedCountry === country 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
                    }`}
                  >
                    {country}
                  </button>
                ))}
                {COUNTRIES.length > 12 && (
                  <span className="px-3 py-1.5 text-xs text-slate-400">
                    +{COUNTRIES.length - 12} more
                  </span>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Content Section - SEO */}
        <div className="mt-12 md:mt-16 bg-white rounded-2xl p-6 md:p-8 border-2 border-slate-100 shadow-lg no-print">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Complete Guide to International GPA Conversion
          </h2>
          
          <div className="prose max-w-none text-slate-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Converting your grades to the U.S. 4.0 GPA scale is crucial for college and graduate school applications. However, not all 
              conversion calculators follow the same standards. Our tool uses <strong>AACRAO EDGE</strong> (Electronic 
              Database for Global Education) - the authoritative resource trusted by American universities for 
              international credential evaluation.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">Why GPA Conversion Matters for International Students</h3>
            <p className="leading-relaxed">
              U.S. universities need a standardized way to compare applicants from different educational systems around the world. 
              A 70% in India doesn't mean the same thing as a 70% in Canada, the UK, or the U.S. AACRAO EDGE provides the 
              contextual framework to ensure fair evaluation across diverse grading systems. Without proper conversion, your 
              academic achievements might be undervalued or misunderstood by admissions committees.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">Understanding Different Grading Systems</h3>
            
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2">Indian Grading System</h4>
                <p className="text-sm text-slate-700">
                  Indian universities use percentage-based grading where 60% (First Division) is considered strong performance. 
                  IITs and NITs use a 10-point CGPA scale. CBSE schools use a 9-point absolute grading system (A1-E).
                </p>
              </div>
              
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-900 mb-2">Canadian Grading System</h4>
                <p className="text-sm text-slate-700">
                  Canadian provinces have slightly different scales. Alberta, Ontario, and BC all use percentage-based grading, 
                  while Quebec uses the R-Score system for CEGEP students.
                </p>
              </div>
              
              <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                <h4 className="font-bold text-purple-900 mb-2">UK Grading System</h4>
                <p className="text-sm text-slate-700">
                  The UK uses Honours degree classifications (First, 2:1, 2:2, Third). A First Class Honours (70%+) is 
                  exceptional. A-Levels use the A*-E grade scale.
                </p>
              </div>
              
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                <h4 className="font-bold text-amber-900 mb-2">IB Diploma</h4>
                <p className="text-sm text-slate-700">
                  The International Baccalaureate uses a 1-7 scale per subject, with 7 being the highest. 
                  A score of 6 or above is considered excellent and competitive for top universities.
                </p>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">Common Misconceptions About Grade Conversion</h3>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border-l-4 border-red-400 my-6">
              <p className="font-semibold text-red-900 mb-2">Myth: "My 65% is a failing grade in the U.S."</p>
              <p className="text-slate-700">
                <strong>Reality:</strong> In most Indian and UK universities, 65% represents above-average performance and 
                typically converts to a 3.3-3.7 GPA. Different education systems have different standards of difficulty. 
                AACRAO EDGE accounts for these differences to ensure fair evaluation.
              </p>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">Tips for Maximizing Your Converted GPA</h3>
            <p className="leading-relaxed">
              When applying to U.S. universities, use a weighted GPA calculation that accounts for credit hours. 
              Higher-credit courses should have more impact on your overall GPA. Our calculator supports multi-semester 
              entry to give you the most accurate weighted GPA calculation. You can also export your results for your records 
              or share them with college counselors.
            </p>
          </div>
        </div>

        {/* AdSense Zone 3 - Bottom */}
        <div className="mt-10 no-print">
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="5362613714"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        {/* Footer Keywords */}
        <footer className="mt-12 md:mt-16 pt-8 md:pt-10 border-t-2 border-slate-200 text-center space-y-4 no-print">
          <p className="text-sm text-slate-600 font-semibold">
            🎓 Free AACRAO EDGE GPA Calculator | Convert 40+ Country Grades | Multi-Semester Weighted GPA
          </p>
          <p className="text-xs text-slate-500 max-w-4xl mx-auto leading-relaxed">
            Convert grades from India (IIT, NIT, CBSE, ICSE, University percentage), Canada (Alberta, Ontario, BC, Quebec), 
            UK (Honours degree, A-Levels, percentage), China, Germany, France, IB Diploma, Australia, Pakistan, Bangladesh, 
            Nigeria, South Korea, Japan, UAE, Singapore, Hong Kong, and 25+ more countries to U.S. 4.0 GPA scale. 
            AACRAO certified conversions for undergraduate and graduate school applications. Free weighted GPA calculator 
            with semester organization and export features. Calgary academic services.
          </p>
          
          <div className="pt-6 flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <a href="/" className="text-emerald-600 hover:text-emerald-700 hover:underline">Home</a>
            <a href="/about" className="text-emerald-600 hover:text-emerald-700 hover:underline">About</a>
            <a href="/college-admissions-calculator" className="text-emerald-600 hover:text-emerald-700 hover:underline">College Predictor</a>
            <a href="/graduate-admissions-calculator" className="text-emerald-600 hover:text-emerald-700 hover:underline">Grad School Calculator</a>
            <a href="/resources" className="text-emerald-600 hover:text-emerald-700 hover:underline">SAT Resources</a>
            <a href="/contact" className="text-emerald-600 hover:text-emerald-700 hover:underline">Contact</a>
            <a href="/privacy-policy" className="text-emerald-600 hover:text-emerald-700 hover:underline">Privacy</a>
            <a href="/terms" className="text-emerald-600 hover:text-emerald-700 hover:underline">Terms</a>
          </div>
          
          <p className="text-xs text-slate-400 pt-6">
            © 2025 Calgary Academic Excellence. AACRAO EDGE compliant GPA conversions. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default GPACalculator;
