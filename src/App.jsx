import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card';
import {
  BookOpen,
  GraduationCap,
  Calculator,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle
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
      title: "Grade 6-10 Alberta Curriculum",
      image: "/images/teacher-tutor-student-librarian-1137620335.jpg",
      description: "Comprehensive tutoring aligned with Alberta curriculum standards",
      price: "500",
      features: [
        "One-on-one personalized sessions",
        "Homework help and review",
        "Regular progress assessments"
      ],
      details: {
        subjects: [
          "Mathematics",
          "Science",
          "English Language Arts",
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
      title: "SAT Preparation",
      image: "/images/2017_11_30_Mines Tutoring at College View Middle School_JDN_5191.jpg",
      description: "Expert SAT prep with practice tests and personalized strategies",
      price: "600",
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
      price: "800",
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
    
    window.location.href = `mailto:mchandramouli@gmail.com?subject=${subject}&body=${body}`;
  };

  const ServiceModal = ({ isOpen, onClose, service }) => {
    if (!isOpen || !service) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>{service.title}</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <img 
              src={service.image}
              alt={service.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <div className="space-y-6">
              {service.details.subjects && (
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: colors.secondary }}>
                    What We Cover:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {service.details.subjects.map((subject, idx) => (
                      <li key={idx}>{subject}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <h3 className="font-bold text-lg mb-2" style={{ color: colors.secondary }}>
                  Our Approach:
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {service.details.approach.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ 
                backgroundColor: colors.light, 
                padding: '1rem',
                borderRadius: '0.5rem',
                borderLeft: `4px solid ${colors.accent}`
              }}>
                <p><strong>Schedule:</strong> {service.details.schedule}</p>
                <p><strong>Location:</strong> {service.details.location}</p>
                <p><strong>Price:</strong> Starting at ${service.price}/month</p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button 
                  onClick={onClose}
                  style={{ backgroundColor: colors.dark }}
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    onClose();
                    handleConsultationRequest(service);
                  }}
                  style={{ backgroundColor: colors.primary }}
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
    <Card 
      className="hover:shadow-xl transition-all duration-300"
      style={{ borderTop: `4px solid ${colors.secondary}` }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle style={{ color: colors.primary }}>{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{service.description}</p>
        <ul className="space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" style={{ color: colors.secondary }} />
              {feature}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-semibold" style={{ color: colors.secondary }}>
          Starting at ${service.price}/month
        </p>
      </CardContent>
      <CardFooter className="flex space-x-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => {
            setSelectedService(service);
            setIsModalOpen(true);
          }}
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          Learn More
        </Button>
        <Button 
          className="flex-1"
          onClick={() => handleConsultationRequest(service)}
          style={{ backgroundColor: colors.primary }}
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
  style={{ 
    backgroundColor: '#1B4B7C',
    backgroundImage: 'linear-gradient(to right, #1B4B7C, #264653)'
  }}
  className="py-16"
>
  <div className="container mx-auto px-4">
    <h1 className="text-white text-4xl font-bold mb-4">Calgary Academic Excellence</h1>
    <p className="text-white text-xl mb-6">Expert tutoring for Grade 4-10, SAT prep, and university admissions</p>
    <button  // Changed from Button component to regular button
      className="px-6 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 font-medium"
      onClick={() => document.getElementById('contact').scrollIntoView()}
    >
      Contact Us
    </button>
  </div>
</div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Services Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Contact Section */}
        <div id="contact" className="mt-16 max-w-2xl mx-auto">
          <Card style={{ borderTop: `4px solid ${colors.accent}` }}>
            <CardHeader>
              <CardTitle style={{ color: colors.primary }}>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" style={{ color: colors.secondary }} />
                  <a 
                    href="mailto:mchandramouli@gmail.com"
                    style={{ color: colors.primary }}
                    className="hover:underline"
                  >
                    mchandramouli@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" style={{ color: colors.secondary }} />
                  <span>(587) 718-2903</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" style={{ color: colors.secondary }} />
                  <span>Calgary, Alberta</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />

      {/* Footer */}
      <footer style={{ backgroundColor: colors.dark }} className="text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Hours</h3>
              <div className="space-y-2">
                <p>Monday - Friday: 9AM - 8PM</p>
                <p>Saturday: 10AM - 6PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <div className="space-y-2">
                <p>Email: mchandramouli@gmail.com</p>
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