import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const ContactUs = () => {
  useEffect(() => {
    document.title = 'Contact Us - Calgary Academic Excellence';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Contact Calgary Academic Excellence for SAT tutoring, college admissions counseling, or inquiries about our AI college predictor tool.'
      );
    }
  }, []);

  const contactMethods = [
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: "Email",
      content: "calgaryacademicexcellence@gmail.com",
      link: "mailto:calgaryacademicexcellence@gmail.com",
      subtext: "We respond within 24 hours"
    },
    {
      icon: <Phone className="h-8 w-8 text-green-600" />,
      title: "Phone",
      content: "(587) 718-2903",
      link: "tel:+15877182903",
      subtext: "Call during business hours"
    },
    {
      icon: <MapPin className="h-8 w-8 text-red-600" />,
      title: "Location",
      content: "Calgary, Alberta, Canada",
      link: null,
      subtext: "In-person & online sessions available"
    }
  ];

  const businessHours = [
    { day: "Monday", time: "9:00 AM - 8:00 PM" },
    { day: "Tuesday", time: "9:00 AM - 8:00 PM" },
    { day: "Wednesday", time: "9:00 AM - 8:00 PM" },
    { day: "Thursday", time: "9:00 AM - 8:00 PM" },
    { day: "Friday", time: "9:00 AM - 8:00 PM" },
    { day: "Saturday", time: "10:00 AM - 6:00 PM" },
    { day: "Sunday", time: "Closed", isClosed: true }
  ];

  const services = [
    {
      icon: "📚",
      title: "Tutoring Services",
      description: "Digital SAT preparation, Alberta curriculum tutoring, and subject-specific help."
    },
    {
      icon: "🎓",
      title: "Admissions Counseling",
      description: "College application strategy, essay editing, and interview preparation."
    },
    {
      icon: "🤖",
      title: "AI Tool Support",
      description: "Questions about our AI College Predictor or technical assistance."
    },
    {
      icon: "💼",
      title: "General Inquiries",
      description: "Pricing, scheduling, services, or partnership opportunities."
    }
  ];

  const faqs = [
    {
      q: "How do I schedule a tutoring session?",
      a: "Contact us via email or phone, and we'll work with you to find a convenient time. We offer flexible scheduling including evenings and weekends."
    },
    {
      q: "Do you offer online sessions?",
      a: "Yes! We provide both in-person sessions in Calgary and online sessions worldwide through video conferencing."
    },
    {
      q: "How does the AI College Predictor work?",
      a: "Our AI tool uses Google's advanced AI technology to analyze your academic profile (GPA, SAT, major, location, budget) and recommend colleges that match your credentials and preferences."
    },
    {
      q: "Is the College Predictor free?",
      a: "Yes! Our AI College Predictor is completely free to use. We provide this tool as a service to help students make informed decisions about their college applications."
    },
    {
      q: "What are your tutoring rates?",
      a: "Our rates vary depending on the subject, level, and session format (individual vs. group). Contact us for a personalized quote based on your needs."
    },
    {
      q: "Do you offer a free consultation?",
      a: "Yes! We offer a free initial consultation to discuss your goals, assess your needs, and explain how we can help. Contact us to schedule yours today."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-[200px]">
        <img 
          src="/images/Teen-Area-12-23-Hero.jpg" 
          alt="Contact Us" 
          className="absolute inset-0 w-full h-full object-cover" 
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/75" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <MessageCircle className="h-10 w-10" />
            Contact Us
          </h1>
          <p className="text-lg text-white max-w-2xl">
            We'd love to hear from you! Whether you have questions about our services, need help with the 
            AI College Predictor, or want to schedule a tutoring session, we're here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                {method.link ? (
                  <a 
                    href={method.link}
                    className="text-blue-600 hover:underline font-medium text-lg block mb-2"
                  >
                    {method.content}
                  </a>
                ) : (
                  <p className="text-gray-900 font-medium text-lg mb-2">{method.content}</p>
                )}
                <p className="text-gray-600 text-sm">{method.subtext}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Business Hours */}
        <Card className="mb-12 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
            <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
              <Clock className="h-6 w-6 text-blue-600" />
              Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {businessHours.map((schedule, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 ${
                    schedule.isClosed ? 'opacity-60' : ''
                  }`}
                >
                  <span className="font-semibold text-gray-900">{schedule.day}</span>
                  <span className={`${schedule.isClosed ? 'text-gray-500' : 'text-gray-700'}`}>
                    {schedule.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What We Can Help With */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">What We Can Help With</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{service.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-700">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mb-12 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
            <CardTitle className="text-2xl text-blue-900">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map Section */}
        <Card className="mb-12 shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Location</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-12 rounded-lg border-2 border-blue-100">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-blue-600" />
              <p className="text-xl text-blue-900 font-semibold">
                📍 Serving Calgary, Alberta and Students Worldwide via Online Sessions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-6">Contact us today to schedule your free consultation!</p>
            <div className="space-y-3">
              <p className="text-lg">
                <strong>Email:</strong>{' '}
                <a href="mailto:calgaryacademicexcellence@gmail.com" className="underline hover:text-blue-200">
                  calgaryacademicexcellence@gmail.com
                </a>
              </p>
              <p className="text-lg">
                <strong>Phone:</strong>{' '}
                <a href="tel:+15877182903" className="underline hover:text-blue-200">
                  (587) 718-2903
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            We look forward to helping you achieve your academic goals!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
