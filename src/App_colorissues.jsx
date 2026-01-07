// App.jsx (updated: match production header gradient, hide mobile menu on desktop, keep ALL features)
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card';
import { HelmetProvider } from 'react-helmet-async';

// Pages
import Resources from './components/Resources';
import About from './components/About';
import Blog from './components/Blog';
import Home from './components/Home';
import CollegePredictor from './components/CollegePredictor';
import GPACalculator from './components/GPACalculator';
import GraduateAdmissions from './components/GraduateAdmissions';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';
import EliteChanceMe from './components/EliteChanceMe'; // NEW

// Icons
import {
  BookOpen, GraduationCap, Calculator, ArrowRight,
  X, Menu, Info, Home as HomeIcon, Award, Star
} from 'lucide-react';

// ------------------------
// Service Modal Component (unchanged)
// ------------------------
const ServiceModal = ({ isOpen, onClose, service, handleConsultationRequest }) => {
  if (!isOpen || !service) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" aria-modal="true" role="dialog">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-2xl font-bold">{service.title}</h3>
          <button className="p-2 rounded-xl hover:bg-gray-100" onClick={onClose} aria-label="Close modal">
            <X />
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-lg font-semibold">{service.price}</p>
          <p><span className="font-semibold">Schedule:</span> {service.details.schedule}</p>
          <p><span className="font-semibold">Location:</span> {service.details.location}</p>
          <div>
            <h4 className="text-lg font-semibold mb-2">What We Cover:</h4>
            <ul className="list-disc ml-6 space-y-1">
              {service.details.subjects.map((subject, idx) => (<li key={idx}>{subject}</li>))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Our Approach:</h4>
            <ul className="list-disc ml-6 space-y-1">
              {service.details.approach.map((item, idx) => (<li key={idx}>{item}</li>))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => { onClose(); handleConsultationRequest(service); }}>
            Book Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

// ------------------------
// Navigation Component (production header look: gradient + white text; hamburger hidden on desktop)
// ------------------------
const Navigation = ({ setIsMenuOpen }) => {
  const location = useLocation();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon size={16} />, path: '/' },
    { id: 'about', label: 'About Us', icon: <Info size={16} />, path: '/about' },
    { id: 'resources', label: 'SAT Resources', icon: <BookOpen size={16} />, path: '/resources' },
    { id: 'blog', label: 'Blog', icon: <Award size={16} />, path: '/blog' },
    { id: 'undergrad', label: 'Undergraduate', icon: <GraduationCap size={16} />, path: '/college-admissions-calculator' },
    { id: 'graduate', label: 'Graduate', icon: <GraduationCap size={16} />, path: '/graduate-admissions-calculator' },
    { id: 'gpa', label: 'GPA Calc', icon: <Calculator size={16} />, path: '/gpa-calculator' },
    { id: 'elite', label: 'Elite ChanceMe', icon: <Star size={16} />, path: '/elite-chance-me' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      {/* Gradient tuned closer to production: bright azure  deep indigo */}
      <div className="bg-gradient-to-r from-[#2b6df3] via-[#2b56c5] to-[#4b2fb5]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-extrabold text-xl tracking-tight text-white" aria-label="Calgary Academic Excellence Home">
            Calgary Academic Excellence
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-white/95 hover:bg-white/10 transition-colors ${
                  location.pathname === item.path ? 'bg-white/15' : ''
                }`}
              >
                {item.icon}
                <span className="text-sm font-semibold">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button - only on mobile */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-xl text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
};

// ------------------------
// Mobile Menu Component (hidden on desktop)
// ------------------------
const MobileMenu = ({ isOpen, setIsOpen, navigationItems }) => {
  const location = useLocation();
  const legalPages = [
    { id: 'privacy', label: 'Privacy Policy', path: '/privacy-policy' },
    { id: 'terms', label: 'Terms of Service', path: '/terms-of-service' },
    { id: 'contact', label: 'Contact Us', path: '/contact-us' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsOpen(false)}>
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <aside
        className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Menu</h3>
          <button className="p-2 rounded-xl hover:bg-blue-50" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-700' : 'hover:bg-blue-50'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Legal Pages */}
        <div className="mt-6">
          <h4 className="text-sm font-bold text-gray-700 mb-2">Information</h4>
          <div className="space-y-1">
            {legalPages.map((item) => (
              <Link key={item.id} to={item.path} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-xl hover:bg-blue-50">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 text-sm">
          <p className="text-gray-600">calgaryacademicexcellence@gmail.com</p>
          <p className="text-gray-600">(587) 718-2903</p>
        </div>
      </aside>
    </div>
  );
};

// ------------------------
// Footer Component (unchanged)
// ------------------------
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-24">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        {/* Hours of Operation */}
        <div>
          <h4 className="font-bold text-lg mb-3">Hours of Operation</h4>
          <p>Monday - Friday: 9AM - 8PM</p>
          <p>Saturday: 10AM - 6PM</p>
          <p>Sunday: Closed</p>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="font-bold text-lg mb-3">Contact Information</h4>
          <p>calgaryacademicexcellence@gmail.com</p>
          <p>(587) 718-2903</p>
          <p>Calgary, Alberta</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-3">Quick Links</h4>
          <div className="flex flex-col gap-1">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/resources">SAT Resources</Link>
            <Link to="/college-admissions-calculator">Undergraduate Admissions</Link>
            <Link to="/graduate-admissions-calculator">Graduate Admissions</Link>
            <Link to="/gpa-calculator">GPA Calculator</Link>
          </div>
        </div>

        {/* Our Services */}
        <div>
          <h4 className="font-bold text-lg mb-3">Our Services</h4>
          <p>Alberta Curriculum Tutoring</p>
          <p>Digital SAT Preparation</p>
          <p>University Admissions Counselling</p>

          <h5 className="font-bold text-lg mt-4 mb-2">Important Information</h5>
          <p>Online and In-Person Sessions</p>
          <p>Flexible Scheduling</p>
          <p>Personalized Learning Plans</p>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} Calgary Academic Excellence. All rights reserved.
          <span className="block mt-1">
            Providing exceptional educational services in Calgary and the surrounding areas, with online availability for students everywhere.
          </span>
        </div>
      </div>
    </footer>
  );
};

// ------------------------
// Main App (unchanged logic; adds EliteChanceMe route)
// ------------------------
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position for navigation effects
  useEffect(() => {
    const handleScroll = () => { setScrollPosition(window.pageYOffset); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Services data (unchanged)
  const services = [
    {
      id: 1,
      title: "Grade 4-10 Alberta Curriculum",
      image: "/images/teacher-tutor-student-librarian-1137620335.jpg",
      description: "Comprehensive tutoring aligned with Alberta curriculum standards",
      price: "Please Contact for Price",
      features: [
        "One-on-one personalized sessions",
        "Homework help and review",
        "Regular progress assessments"
      ],
      details: {
        subjects: ["Mathematics", "Science", "Social Studies"],
        approach: [
          "Personalized learning plans",
          "Regular homework support",
          "Practice tests and assessments",
          "Progress tracking",
          "Parent-teacher communication"
        ],
        schedule: "Flexible scheduling available",
        location: "In-person (Calgary) or online"
      }
    },
    {
      id: 2,
      title: "Digital SAT Preparation",
      image: "/images/2017_11_30_Mines Tutoring at College View Middle School_JDN_5191.jpg",
      description: "Expert Digital SAT prep with practice tests and personalized strategies",
      price: "Please contact for price",
      features: [
        "Full-length practice tests",
        "Personalized study plans",
        "Score improvement tracking"
      ],
      details: {
        subjects: [
          "Math (Algebra, Geometry, Advanced Math)",
          "Evidence-Based Reading",
          "Writing & Language",
          "Optional Essay Writing"
        ],
        approach: [
          "Initial diagnostic assessment",
          "Customized study plan",
          "Weekly practice tests",
          "Test-taking strategies",
          "Time management skills",
          "Score prediction and tracking"
        ],
        schedule: "Flexible scheduling available",
        location: "In-person or online sessions"
      }
    },
    {
      id: 3,
      title: "University Counselling",
      image: "/images/admission-counseling-banner.png",
      description: "Comprehensive US and Canadian university application guidance",
      price: "Please Contact for Price",
      features: [
        "Application strategy",
        "Essay review & feedback",
        "Interview preparation"
      ],
      details: {
        subjects: [
          "University Selection Strategy",
          "Application Process",
          "Essay Writing",
          "Interview Skills"
        ],
        approach: [
          "Personalized university shortlist",
          "Common App and OUAC guidance",
          "Letter of recommendation strategy",
          "Application tracking system",
          "Scholarship search and applications",
          "Visa and documentation support"
        ],
        schedule: "Customized guidance program",
        location: "In-person or virtual meetings"
      }
    }
  ];

  // Handle consultation requests (unchanged)
  const handleConsultationRequest = (service) => {
    const subject = encodeURIComponent(`Consultation Request for ${service.title}`);
    const body = encodeURIComponent(
      `Hello,\n\nI am interested in learning more about your ${service.title} service.\n\n` +
      `Please contact me to schedule a consultation.\n\n` +
      `Service Details:\n` +
      `- Service: ${service.title}\n` +
      `- Price: ${service.price}\n\n` +
      `Looking forward to hearing from you.\n\nBest regards`
    );
    window.location.href = `mailto:calgaryacademicexcellence@gmail.com?subject=${subject}&body=${body}`;
  };

  // Shared navigation items for MobileMenu (unchanged + Elite ChanceMe)
  const navigationItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon size={16} />, path: '/' },
    { id: 'about', label: 'About Us', icon: <Info size={16} />, path: '/about' },
    { id: 'resources', label: 'SAT Resources', icon: <BookOpen size={16} />, path: '/resources' },
    { id: 'blog', label: 'Blog', icon: <Award size={16} />, path: '/blog' },
    { id: 'college-predictor', label: 'Undergraduate', icon: <GraduationCap size={16} />, path: '/college-admissions-calculator' },
    { id: 'graduate-predictor', label: 'Graduate', icon: <GraduationCap size={16} />, path: '/graduate-admissions-calculator' },
    { id: 'gpa-calculator', label: 'GPA Calculator', icon: <Calculator size={16} />, path: '/gpa-calculator' },
    { id: 'elite', label: 'Elite ChanceMe', icon: <Star size={16} />, path: '/elite-chance-me' },
  ];

  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* Top Navigation */}
        <Navigation setIsMenuOpen={setIsMenuOpen} />

        {/* Mobile Menu (md:hidden) */}
        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} navigationItems={navigationItems} />

        {/* Page Content */}
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home services={services} onOpenService={(s) => { setSelectedService(s); setIsModalOpen(true); }} />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/blog" element={<Blog />} />

            {/* Calculators */}
            <Route path="/college-admissions-calculator" element={<CollegePredictor />} />
            <Route path="/graduate-admissions-calculator" element={<GraduateAdmissions />} />
            <Route path="/gpa-calculator" element={<GPACalculator />} />

            {/* Legal & Contact */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact-us" element={<ContactUs />} />

            {/* NEW: Elite ChanceMe page */}
            <Route path="/elite-chance-me" element={<EliteChanceMe />} />
          </Routes>
        </main>

        {/* Service Modal */}
        <ServiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService}
          handleConsultationRequest={handleConsultationRequest}
        />

        {/* Scroll to Top Button */}
        {scrollPosition > 300 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 z-30"
            aria-label="Scroll to top"
          >
            <ArrowRight className="-rotate-90" />
          </button>
        )}

        {/* Footer */}
        <Footer />

        {/* Ensure route changes scroll to top */}
        <ScrollToTop />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
