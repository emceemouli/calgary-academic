
import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card';
import Resources from './components/Resources';
import About from './components/About';
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
  Home
} from 'lucide-react';

const App = () => {
  // State management for UI controls and navigation
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // SEO optimization with dynamic meta tags
  useEffect(() => {
    const metaTitles = {
      home: 'Calgary Academic Excellence - Expert Digital SAT & Alberta Curriculum Tutoring',
      about: 'About Us - Calgary Academic Excellence | Professional Tutoring Services',
      resources: 'Free Digital SAT Resources & Study Materials | Calgary Academic Excellence'
    };

    document.title = metaTitles[currentPage] || metaTitles.home;
  }, [currentPage]);

  // Track scroll position for navigation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation configuration
  const navigationItems = [
    { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { id: 'about', label: 'About Us', icon: <Info className="h-4 w-4" /> },
    { id: 'resources', label: 'SAT Resources', icon: <BookOpen className="h-4 w-4" /> }
  ];

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
      `- Price: $${service.price}/month\n\n` +
      `Looking forward to hearing from you.\n\n` +
      `Best regards`
    );
    
    window.location.href = `mailto:calgaryacademicexcellence@gmail.com?subject=${subject}&body=${body}`;
  };

  // Service Card Component
  const ServiceCard = ({ service }) => (
    <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-4 text-gray-800 text-lg">
          {service.description}
        </p>
        <ul className="space-y-3 mb-6">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
              <span className="text-gray-800 text-lg">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 shadow-md">
          <p className="text-sm font-bold text-blue-900 mb-2">
            {service.price}
          </p>
          <p className="text-gray-900 text-lg mb-1">
            <strong>Schedule:</strong> {service.details.schedule}
          </p>
          <p className="text-gray-900 text-lg">
            <strong>Location:</strong> {service.details.location}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto py-3 text-lg"
          onClick={() => {
            setSelectedService(service);
            setIsModalOpen(true);
          }}
        >
          Learn More
        </Button>
        <Button 
          className="w-full sm:w-auto py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg"
          onClick={() => handleConsultationRequest(service)}
        >
          Book Consultation
        </Button>
      </CardFooter>
    </Card>
  );

  // Service Modal Component
  const ServiceModal = ({ isOpen, onClose, service }) => {
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
  const Navigation = () => {
    const isScrolled = scrollPosition > 50;

    return (
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-blue-900/80'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className={`text-xl font-bold transition-colors duration-300 px-3 py-1 rounded-lg
                ${isScrolled 
                  ? 'text-blue-900 hover:text-blue-700' 
                  : 'text-white bg-blue-900/90 hover:bg-blue-800/90'
                } cursor-pointer`}
                onClick={() => setCurrentPage('home')}
              >
                Calgary Academic Excellence
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {navigationItems.map(item => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-2 ${
                    isScrolled ? '' : 'text-white hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 ${isScrolled ? '' : 'text-white'}`}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  // Content renderer
  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'resources':
        return <Resources />;
      default:
        return (
          <>
            {/* Hero Section with proper spacing */}
						<div className="relative h-[270px] overflow-hidden w-full mt-16">

			  <img 
				src="/images/Teen-Area-12-23-Hero.jpg"
				alt="Calgary Academic Excellence"
				className="absolute inset-0 w-full h-full object-cover"
				loading="eager"
				priority="true"
			  />
			  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/75"></div>
			  <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center">
				<img 
				  src="/images/Logo2.png" 
				  alt="Calgary Academic Excellence Logo" 
				  className="h-16 w-auto mb-4"
				/>
				<h1 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-2xl text-center">
				  Calgary Academic Excellence
				</h1>
				<p className="text-lg md:text-xl text-white mb-6 max-w-xl text-center">
				  Expert tutoring for Grade 4-10, Digital SAT prep, and university admissions
				</p>
				<Button
				  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
				  className="w-fit px-2 py-2 bg-blue-600 text-white rounded-md 
							 font-medium hover:bg-blue-700 transition-all duration-200 
							 shadow-md border-[0.5px] border-white/10 flex items-center gap-1 text-base"
				>
				  <span>Contact Us</span>
				  <ArrowRight className="h-4 w-4" />
				</Button>
			  </div>
			</div>


            {/* Main Content Area with Services */}
            <div className="container mx-auto px-4 py-12 overflow-hidden">

              {/* Services Section with improved spacing */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Contact Section with enhanced styling */}
				<div id="contact" className="mt-20 max-w-lg mx-auto">
				  <Card className="border-t-4 border-blue-500 shadow-lg">
					<CardHeader>
					  <CardTitle className="text-2xl font-bold text-gray-900 text-center">
						Contact Us
					  </CardTitle>
					</CardHeader>
					<CardContent>
					  <div className="space-y-4 text-gray-800">
						{/* Email */}
						<div className="flex items-center space-x-3">
						  <Mail className="h-6 w-6 text-blue-600" />
						  <a 
							href="mailto:calgaryacademicexcellence@gmail.com"
							className="text-lg text-blue-600 hover:text-blue-800 transition-colors"
						  >
							calgaryacademicexcellence@gmail.com
						  </a>
						</div>
						{/* Phone */}
						<div className="flex items-center space-x-3">
						  <Phone className="h-6 w-6 text-green-600" />
						  <span className="text-lg">(587) 718-2903</span>
						</div>
						{/* Location */}
						<div className="flex items-center space-x-3">
						  <MapPin className="h-6 w-6 text-red-600" />
						  <span className="text-lg">Calgary, Alberta</span>
						</div>
					  </div>
					</CardContent>
				  </Card>
				</div>

            </div>
          </>
        );
    }
  };

  // Main component return
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navigation />
      
      {/* Mobile Menu with improved transitions */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transform 
                     transition-transform duration-300 ${
                       isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                     }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-900">Menu</h2>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <nav className="space-y-4">
              {navigationItems.map(item => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start text-lg"
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {renderContent()}

      {/* Service Modal */}
      <ServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />

      {/* Footer with enhanced layout */}
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
                  <p className="cursor-pointer hover:text-white transition-colors"
                     onClick={() => setCurrentPage('home')}>Home</p>
                  <p className="cursor-pointer hover:text-white transition-colors"
                     onClick={() => setCurrentPage('about')}>About Us</p>
                  <p className="cursor-pointer hover:text-white transition-colors"
                     onClick={() => setCurrentPage('resources')}>SAT Resources</p>
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
  );
};

export default App;
