import React from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { ArrowRight, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

const ServiceCard = ({ service, setSelectedService, setIsModalOpen }) => (
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

const Home = ({ services, setSelectedService, setIsModalOpen, handleConsultationRequest }) => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[270px] pt-16">
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

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12">
        {/* Services Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service}
              setSelectedService={setSelectedService}
              setIsModalOpen={setIsModalOpen}
            />
          ))}
        </div>

        {/* Contact Section */}
        <div id="contact" className="mt-20 max-w-lg mx-auto">
          <Card className="border-t-4 border-blue-500 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-800">
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <a 
                    href="mailto:calgaryacademicexcellence@gmail.com"
                    className="text-lg text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    calgaryacademicexcellence@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-green-600" />
                  <span className="text-lg">(587) 718-2903</span>
                </div>
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
};

export default Home;