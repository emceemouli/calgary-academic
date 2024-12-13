import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card';
import Advertisement from './components/Advertisement';
import {
  BookOpen,
  GraduationCap,
  Calculator,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  X
} from 'lucide-react';

// Calgary-inspired color scheme
const colors = {
  primary: '#1B4B7C',    // Deep blue like Bow River
  secondary: '#2A9D8F',  // Mountain lake green
  accent: '#E9C46A',     // Prairie gold
  dark: '#264653',       // Mountain shadow
  light: '#F8F9FA',      // Snow white
};

const TutoringWebsite = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      id: 1,
      title: "Grade 4-10 Alberta Curriculum",
      image: "/images/teacher-tutor-student-librarian-1137620335.jpg",
      description: "Comprehensive tutoring aligned with Alberta curriculum standards",
      price: "200",
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
      price: "200",
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
        schedule: "12-week preparation program",
        location: "In-person or online sessions"
      }
    },
    {
      id: 3,
      title: "University Counselling",
      image: "/images/admission-counseling-banner.png",
      description: "Comprehensive US and Canadian university application guidance",
      price: "200",
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
        schedule: "6-month guidance program",
        location: "In-person or virtual meetings"
      }
    }
  ];

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
              {/* Updated pricing and schedule box for better visibility */}
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-md">
                <p className="text-2xl font-bold text-blue-900 mb-4">
                  ${service.price}/month
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

  const ServiceCard = ({ service }) => (
    <Card className="hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
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
        {/* Updated pricing section for better visibility */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 shadow-md">
          <p className="text-2xl font-bold text-blue-900 mb-2">
            ${service.price}/month
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative py-16 sm:py-24"
        style={{ 
          backgroundColor: colors.primary,
          backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.dark})` 
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Calgary Academic Excellence
          </h1>
          <p className="text-xl text-white mb-6">
            Expert tutoring for Grade 4-10, Digital SAT prep, and university admissions
          </p>
          <button
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold 
                     hover:bg-blue-50 transition-colors text-lg shadow-lg"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Us
          </button>
        </div>
      </div>

      <Advertisement slot="hero-ad-slot" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div id="contact" className="mt-16 max-w-2xl mx-auto">
          <Card className="border-t-4 border-blue-500">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <a 
                  href="mailto:calgaryacademicexcellence@gmail.com"
                  className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 
                           p-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Mail className="h-6 w-6 flex-shrink-0" />
                  <span className="text-lg">calgaryacademicexcellence@gmail.com</span>
                </a>
                <div className="flex items-center space-x-3 p-3">
                  <Phone className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg text-gray-700">(587) 718-2903</span>
                </div>
                <div className="flex items-center space-x-3 p-3">
                  <MapPin className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Calgary, Alberta</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />

      <Advertisement slot="footer-ad-slot" />

      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hours</h3>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday: 9AM - 8PM</p>
                <p>Saturday: 10AM - 6PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: calgaryacademicexcellence@gmail.com</p>
                <p>Phone: (587) 718-2903</p>
                <p>Location: Calgary, Alberta</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TutoringWebsite;