import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { ArrowRight, CheckCircle, Mail, Phone, MapPin, Calculator, GraduationCap, Award, Star, BookOpen, Target, Sparkles, Clock, Users } from 'lucide-react';

const ServiceCard = ({ service, setSelectedService, setIsModalOpen, handleConsultationRequest }) => (
  <Card className="hover:shadow-xl transition-all duration-300 h-full flex flex-col border-0 shadow-lg">
    <div className="h-48 overflow-hidden rounded-t-xl">
      <img 
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
    <CardHeader>
      <CardTitle className="text-xl font-bold text-gray-900">
        {service.title}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="mb-4 text-gray-700 text-base leading-relaxed">
        {service.description}
      </p>
      <ul className="space-y-2 mb-6">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm font-bold text-blue-900 mb-2">
          {service.price}
        </p>
        <p className="text-gray-800 text-sm mb-1">
          <strong>Schedule:</strong> {service.details.schedule}
        </p>
        <p className="text-gray-800 text-sm">
          <strong>Location:</strong> {service.details.location}
        </p>
      </div>
    </CardContent>
    <CardFooter className="flex flex-col gap-2 pt-0">
      <Button 
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md"
        onClick={() => handleConsultationRequest(service)}
      >
        Book Consultation
      </Button>
      <Button 
        variant="outline" 
        className="w-full py-3 border-2 border-gray-300 hover:bg-gray-50"
        onClick={() => {
          setSelectedService(service);
          setIsModalOpen(true);
        }}
      >
        Learn More
      </Button>
    </CardFooter>
  </Card>
);

const Home = ({ services, setSelectedService, setIsModalOpen, handleConsultationRequest }) => {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Calgary Academic Excellence - SAT/ACT Prep & Tutoring | Calgary, Alberta';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = 'Calgary Academic Excellence offers expert SAT/ACT test preparation and tutoring for Grades 4-12 in Calgary, Alberta. Personalized instruction, proven results. Free college admissions calculators available.';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'Calgary tutoring, SAT prep Calgary, ACT prep Calgary, Digital SAT Calgary, high school tutoring Calgary, college admissions counseling Calgary, test preparation Alberta, Calgary Academic Excellence, Alberta tutoring services, Calgary test prep, math tutoring Calgary, science tutoring Calgary';

    // Schema markup
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Calgary Academic Excellence",
        "description": "Expert SAT/ACT test preparation and tutoring for Grades 4-12 in Calgary, Alberta",
        "url": "https://calgaryacademicexcellence.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Calgary",
          "addressRegion": "AB",
          "addressCountry": "CA"
        },
        "areaServed": {
          "@type": "City",
          "name": "Calgary"
        },
        "foundingDate": "2020",
        "email": "calgaryacademicexcellence@gmail.com",
        "telephone": "+1-587-718-2903"
      },
      {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "EducationalOrganization",
          "name": "Calgary Academic Excellence"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Anonymous Student"
        },
        "reviewBody": "Calgary Academic Excellence helped me improve my SAT score by 200 points to 1490. I got into University of Richmond for my premed track."
      }
    ];

    schemas.forEach((schema, index) => {
      let scriptTag = document.querySelector(`#home-schema-${index}`);
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = `home-schema-${index}`;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    });

    // Initialize AdSense
    const adsenseScript = document.querySelector('script[src*="adsbygoogle.js"]');
    if (!adsenseScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7638771792216412';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* Hero Section - Using your existing deployed design */}
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

      <div className="container mx-auto px-4 py-20">
        
        {/* Success Metrics - Honest & Modern */}
        <div className="mb-24">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                200+
              </div>
              <div className="text-gray-600 font-medium">Average SAT Point Improvement</div>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-gray-600 font-medium">Personalized Attention</div>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                5+
              </div>
              <div className="text-gray-600 font-medium">Years Serving Calgary</div>
            </div>
          </div>
        </div>

        {/* About Section - Focused & Honest */}
        <div className="mb-24 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Partner in Academic Success
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Calgary Academic Excellence specializes in SAT/ACT test preparation and comprehensive academic tutoring 
              for Calgary students in Grades 4-10. Since 2020, we've been helping students achieve their academic goals 
              through personalized instruction and proven teaching methods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Card 1 - SAT/ACT Prep */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">SAT/ACT Preparation</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Digital SAT & traditional ACT test prep with proven strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Personalized study plans tailored to each student's strengths</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Full-length practice tests with detailed score analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Average improvement of 200+ points on SAT scores</span>
                </li>
              </ul>
            </div>

            {/* Card 2 - Academic Tutoring */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Academic Tutoring</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Grades 4-10 Math, Science, and English tutoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Alberta Education curriculum aligned instruction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>One-on-one sessions customized to student's learning style</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Focus on building strong foundational understanding</span>
                </li>
              </ul>
            </div>

            {/* Card 3 - College Counseling */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">College Admissions</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Guidance for USA and Canadian university applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Strategic college list building and application planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Essay coaching and application review support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Help maximizing financial aid and scholarship opportunities</span>
                </li>
              </ul>
            </div>

            {/* Card 4 - Why Choose Us */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Why Choose Us</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Local Calgary-based service with personalized attention</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Experienced instructors passionate about student success</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Flexible scheduling for in-person or online sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Proven results with satisfied Calgary students and families</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Context */}
          <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Approach to Student Success</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Calgary Academic Excellence, we understand that every student learns differently. That's why we take a 
              personalized approach to tutoring and test preparation. Our one-on-one sessions are tailored to each student's 
              unique learning style, academic goals, and timeline. Whether you're a Grade 5 student building foundational 
              skills or a high school student preparing for the Digital SAT, we provide the expert guidance and support you need 
              to achieve your best results.
            </p>
            <p className="text-gray-700 leading-relaxed">
              As a Calgary-based service, we're familiar with Alberta Education curriculum requirements and understand the unique 
              challenges Calgary students face when applying to competitive universities in the United States and Canada. We combine 
              local expertise with comprehensive knowledge of college admissions to help our students stand out in the application process.
            </p>
          </div>
        </div>

        {/* Student Success Story */}
        <div className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Results from Calgary Students
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
          </div>

          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-2">
              <div className="bg-white rounded-xl p-8">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Star className="h-7 w-7 text-yellow-500 fill-yellow-500" />
                  <Star className="h-7 w-7 text-yellow-500 fill-yellow-500" />
                  <Star className="h-7 w-7 text-yellow-500 fill-yellow-500" />
                  <Star className="h-7 w-7 text-yellow-500 fill-yellow-500" />
                  <Star className="h-7 w-7 text-yellow-500 fill-yellow-500" />
                </div>
                <blockquote className="text-gray-800 text-xl italic text-center leading-relaxed mb-8 font-medium">
                  "Calgary Academic Excellence helped me improve my SAT score by 200 points to 1490! Their personalized 
                  approach and practice tests made all the difference. I got into University of Richmond for my premed track!"
                </blockquote>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-lg mb-3">— Anonymous Student, Calgary</p>
                  <div className="inline-flex flex-wrap items-center justify-center gap-4 text-sm bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-4 rounded-full border-2 border-blue-200">
                    <span className="font-bold text-blue-700">1490 SAT</span>
                    <span className="text-gray-400">•</span>
                    <span className="font-bold text-green-700">200-Point Improvement</span>
                    <span className="text-gray-400">•</span>
                    <span className="font-bold text-purple-700">University of Richmond</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* AdSense Zone 1 */}
        <div className="my-20">
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="5362613714"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        {/* Services Section */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive educational support for Calgary students from Grade 4 through university admissions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service}
                setSelectedService={setSelectedService}
                setIsModalOpen={setIsModalOpen}
                handleConsultationRequest={handleConsultationRequest}
              />
            ))}
          </div>
        </div>

        {/* AdSense Zone 2 */}
        <div className="my-20">
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="5362613714"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        {/* Free AI Tools */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                🎓 Free AI-Powered Admissions Calculators
              </h2>
              <p className="text-gray-600 text-lg">
                Use our advanced AI tools to find your perfect college match - completely free, no registration required
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* GPA Calculator */}
              <a 
                href="/gpa-calculator"
                className="block p-6 bg-white rounded-xl hover:shadow-xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 group"
              >
                <Calculator className="h-10 w-10 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  GPA Calculator
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Convert international grades to U.S. 4.0 scale using AACRAO EDGE standards. Supports Indian, Canadian, UK, and IB systems.
                </p>
                <div className="mt-4 text-blue-600 font-semibold flex items-center justify-center gap-2 text-sm">
                  Convert Now <ArrowRight className="h-4 w-4" />
                </div>
              </a>
              
              {/* Undergraduate Calculator */}
              <a 
                href="/college-admissions-calculator"
                className="block p-6 bg-white rounded-xl hover:shadow-xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-400 group"
              >
                <GraduationCap className="h-10 w-10 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  Undergraduate Admissions
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Find Bachelor's programs using SAT/ACT scores, GPA, and intended major. Get 24 AI-powered reach, target, and safety recommendations.
                </p>
                <div className="mt-4 text-purple-600 font-semibold flex items-center justify-center gap-2 text-sm">
                  Find Colleges <ArrowRight className="h-4 w-4" />
                </div>
              </a>

              {/* Graduate Calculator */}
              <a 
                href="/graduate-admissions-calculator"
                className="block p-6 bg-white rounded-xl hover:shadow-xl transition-all duration-300 border-2 border-green-200 hover:border-green-400 group relative overflow-hidden"
              >
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </div>
                <Award className="h-10 w-10 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  Graduate Admissions
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Find Master's & PhD programs using test scores, research experience, and specialization. Covers USA and Canadian universities.
                </p>
                <div className="mt-4 text-green-600 font-semibold flex items-center justify-center gap-2 text-sm">
                  Find Programs <ArrowRight className="h-4 w-4" />
                </div>
              </a>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                ✨ 100% free • Powered by Google AI (Gemini) • No registration required • Instant results
              </p>
            </div>
          </div>
        </div>

        {/* AdSense Zone 3 */}
        <div className="my-20">
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="5362613714"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
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

        {/* SEO Footer */}
        <footer className="mt-16 pt-10 border-t-2 border-slate-200 text-center space-y-4">
          <p className="text-sm text-slate-600 font-semibold">
            🎓 Calgary Academic Excellence - SAT/ACT Prep & Tutoring in Calgary, Alberta
          </p>
          <p className="text-xs text-slate-500 max-w-4xl mx-auto leading-relaxed">
            Digital SAT preparation, ACT test prep, Grades 4-10 academic tutoring (Math, Science, English), 
            college admissions counseling for USA and Canadian universities. 
            Serving Calgary, Alberta students since 2020. Personalized instruction with proven results.
          </p>
          
          <div className="pt-6 flex flex-wrap justify-center gap-6 text-sm">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <a href="/about" className="text-blue-600 hover:underline">About</a>
            <a href="/college-admissions-calculator" className="text-blue-600 hover:underline">College Predictor</a>
            <a href="/graduate-admissions-calculator" className="text-blue-600 hover:underline">Graduate Calculator</a>
            <a href="/gpa-calculator" className="text-blue-600 hover:underline">GPA Calculator</a>
            <a href="/resources" className="text-blue-600 hover:underline">Resources</a>
            <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy</a>
          </div>
          
          <p className="text-xs text-slate-400 pt-6">
            © 2025 Calgary Academic Excellence. Expert tutoring and test preparation in Calgary, Alberta.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
