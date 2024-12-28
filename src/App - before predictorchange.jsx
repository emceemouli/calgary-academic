import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card';
import Resources from './components/Resources';
import About from './components/About';
import Blog from './components/Blog';
import Home from './components/Home';
import {
  BookOpen,
  GraduationCap,
  Calculator,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  X,
  Menu,
  Info,
  Home as HomeIcon
} from 'lucide-react';

// Service Modal Component
const ServiceModal = ({ isOpen, onClose, service, handleConsultationRequest }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {service.title}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          
          <img 
            src={service.image}
            alt={service.title}
            className="w-full h-48 sm:h-64 object-cover rounded-lg mb-6"
          />

          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-md">
              <p className="text-sm font-bold text-blue-900 mb-4">
                {service.price}
              </p>
              <p className="text-gray-900 text-lg mb-2">
                <strong>Schedule:</strong> {service.details.schedule}
              </p>
              <p className="text-gray-900 text-lg">
                <strong>Location:</strong> {service.details.location}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                What We Cover:
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {service.details.subjects.map((subject, idx) => (
                  <li key={idx} className="text-gray-800 text-lg">{subject}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Our Approach:
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {service.details.approach.map((item, idx) => (
                  <li key={idx} className="text-gray-800 text-lg">{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
              <Button 
                onClick={onClose}
                className="w-full sm:w-auto py-3 bg-gray-600 hover:bg-gray-700 text-white text-lg"
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  onClose();
                  handleConsultationRequest(service);
                }}
                className="w-full sm:w-auto py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg"
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Navigation Component
const Navigation = ({ isScrolled, setIsMenuOpen }) => {
  const location = useLocation();
  
  const navigationItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="h-4 w-4" />, path: '/' },
    { id: 'about', label: 'About Us', icon: <Info className="h-4 w-4" />, path: '/about' },
    { id: 'resources', label: 'SAT Resources', icon: <BookOpen className="h-4 w-4" />, path: '/resources' },
    { id: 'blog', label: 'Blog', icon: <BookOpen className="h-4 w-4" />, path: '/blog' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-blue-900/80'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className={`text-xl font-bold transition-colors duration-300 px-4 py-2 rounded-xl
                ${isScrolled 
                  ? 'text-blue-900 hover:text-blue-700' 
                  : 'text-white bg-blue-900/90 hover:bg-blue-800/90'
                }`}
            >
              Calgary Academic Excellence
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navigationItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={`px-6 py-2 rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-2
                  ${location.pathname === item.path
                    ? `${isScrolled ? 'bg-blue-600 text-white shadow-md' : 'bg-white/20 text-white'}`
                    : `${isScrolled 
                        ? 'text-gray-700 hover:bg-blue-50' 
                        : 'text-white hover:bg-white/10'}`
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(true)}
              className={`p-2 rounded-xl ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Mobile Menu Component
const MobileMenu = ({ isOpen, setIsOpen, navigationItems }) => {
  const location = useLocation();
  
  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setIsOpen(false)}
    >
      <div 
        className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transform 
                   transition-transform duration-300 rounded-l-2xl ${
                     isOpen ? 'translate-x-0' : 'translate-x-full'
                   }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-blue-50 rounded-xl transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <nav className="space-y-3">
            {navigationItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center w-full p-3 rounded-xl transition-all duration-200
                  ${location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hours of Operation</h3>
            <div className="space-y-2 text-gray-300">
              <p>Monday - Friday: 9AM - 8PM</p>
              <p>Saturday: 10AM - 6PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: calgaryacademicexcellence@gmail.com</p>
              <p>Phone: (587) 718-2903</p>
              <p>Location: Calgary, Alberta</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-gray-300">
                <Link to="/" className="block hover:text-white transition-colors">Home</Link>
                <Link to="/about" className="block hover:text-white transition-colors">About Us</Link>
                <Link to="/resources" className="block hover:text-white transition-colors">SAT Resources</Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Our Services</h3>
              <div className="space-y-2 text-gray-300">
                <p>Alberta Curriculum Tutoring</p>
                <p>Digital SAT Preparation</p>
                <p>University Admissions Counselling</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Important Information</h3>
              <div className="space-y-2 text-gray-300">
                <p>Online and In-Person Sessions</p>
                <p>Flexible Scheduling</p>
                <p>Personalized Learning Plans</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p className="text-sm">
            © {new Date().getFullYear()} Calgary Academic Excellence. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Providing exceptional educational services in Calgary and the surrounding areas, with online availability for students everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position for navigation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Services data
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
        subjects: [
          "Mathematics",
          "Science",
          "Social Studies"
        ],
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

  // Handle consultation requests
  const handleConsultationRequest = (service) => {
    const subject = encodeURIComponent(`Consultation Request for ${service.title}`);
    const body = encodeURIComponent(
      `Hello,\n\nI am interested in learning more about your ${service.title} service.\n\n` +
      `Please contact me to schedule a consultation.\n\n` +
      `Service Details:\n` +
      `- Service: ${service.title}\n` +
      `- Price: ${service.price}\n\n` +
      `Looking forward to hearing from you.\n\n` +
      `Best regards`
    );
    
    window.location.href = `mailto:calgaryacademicexcellence@gmail.com?subject=${subject}&body=${body}`;
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="h-4 w-4" />, path: '/' },
    { id: 'about', label: 'About Us', icon: <Info className="h-4 w-4" />, path: '/about' },
    { id: 'resources', label: 'SAT Resources', icon: <BookOpen className="h-4 w-4" />, path: '/resources' },
    { id: 'blog', label: 'Blog', icon: <BookOpen className="h-4 w-4" />, path: '/blog' }
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Navigation 
          isScrolled={scrollPosition > 50} 
          setIsMenuOpen={setIsMenuOpen} 
        />
        
        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          navigationItems={navigationItems}
        />

        {/* Routes */}
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                services={services}
                setSelectedService={setSelectedService}
                setIsModalOpen={setIsModalOpen}
                handleConsultationRequest={handleConsultationRequest}
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>

        {/* Service Modal */}
        <ServiceModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService}
          handleConsultationRequest={handleConsultationRequest}
        />

        <Footer />

        {/* Scroll to Top Button */}
        {scrollPosition > 300 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg 
                     hover:bg-blue-700 transition-colors duration-200 z-30"
            aria-label="Scroll to top"
          >
            <ArrowRight className="h-6 w-6 transform -rotate-90" />
          </button>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;