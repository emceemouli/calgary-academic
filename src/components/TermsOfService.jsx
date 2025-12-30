import React, { useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Scale, AlertCircle } from 'lucide-react';

const TermsOfService = () => {
  useEffect(() => {
    document.title = 'Terms of Service - Calgary Academic Excellence';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Terms of Service for Calgary Academic Excellence. Read our terms and conditions for using our AI College Predictor and educational services.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-[200px]">
        <img 
          src="/images/Teen-Area-12-23-Hero.jpg" 
          alt="Terms of Service" 
          className="absolute inset-0 w-full h-full object-cover" 
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/75" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Scale className="h-10 w-10" />
            Terms of Service
          </h1>
          <p className="text-lg text-white">Last Updated: December 27, 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8 space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-gray-700 text-lg leading-relaxed">
                Welcome to Calgary Academic Excellence. By accessing or using our website and services, including our 
                AI College Admissions Predictor, you agree to be bound by these Terms of Service. Please read them carefully.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using this website and our services, you accept and agree to be bound by the terms 
                and provisions of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            {/* Description of Services */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">2. Description of Services</h2>
              <p className="text-gray-700 mb-3">Calgary Academic Excellence provides:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>AI-powered college admissions prediction tool</li>
                <li>Digital SAT tutoring and preparation services</li>
                <li>Alberta curriculum tutoring</li>
                <li>College admissions counseling</li>
                <li>Educational consulting and advisory services</li>
              </ul>
            </section>

            {/* AI College Predictor Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">3. AI College Predictor Disclaimer</h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-4 rounded">
                <p className="text-yellow-900 font-semibold flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>IMPORTANT: Our AI College Admissions Predictor is a tool designed to provide general guidance 
                  and estimates only. It is not a guarantee of admission to any college or university.</span>
                </p>
              </div>

              <p className="text-gray-700 mb-3">You understand and agree that:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Predictions are based on statistical analysis and AI algorithms, not official admissions data</li>
                <li>Actual admission decisions depend on many factors beyond GPA and test scores</li>
                <li>College admissions are competitive and unpredictable</li>
                <li>You should not rely solely on our predictions when making college application decisions</li>
                <li>We strongly recommend consulting with official college admissions offices and professional counselors</li>
              </ul>
            </section>

            {/* Use of Services */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">4. Use of Services</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">4.1 Eligibility</h3>
                  <p className="text-gray-700">
                    You must be at least 13 years of age to use our services. If you are under 18, you must have 
                    parental or guardian consent to use our services.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">4.2 Acceptable Use</h3>
                  <p className="text-gray-700 mb-3">You agree to use our services only for lawful purposes. You may not:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Use our services in any way that violates applicable laws or regulations</li>
                    <li>Attempt to gain unauthorized access to our systems or networks</li>
                    <li>Use automated systems or software to extract data from our website</li>
                    <li>Interfere with or disrupt the integrity or performance of our services</li>
                    <li>Reverse engineer, decompile, or disassemble any aspect of our services</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700">
                All content on this website, including text, graphics, logos, images, and software, is the property 
                of Calgary Academic Excellence or its content suppliers and is protected by Canadian and international 
                copyright laws. The AI College Predictor tool, including its algorithms and design, is our proprietary technology.
              </p>
            </section>

            {/* Tutoring Services */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">6. Tutoring Services</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">6.1 Service Commitment</h3>
                  <p className="text-gray-700">
                    We commit to providing high-quality tutoring and educational services. However, we cannot 
                    guarantee specific academic outcomes or test scores.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">6.2 Scheduling and Cancellation</h3>
                  <p className="text-gray-700">
                    Tutoring sessions must be scheduled in advance. Cancellations must be made at least 24 hours 
                    before the scheduled session to avoid charges.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">6.3 Payment Terms</h3>
                  <p className="text-gray-700">
                    Payment is due at the time of service unless other arrangements have been made. We accept 
                    various payment methods as communicated during service arrangement.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimer of Warranties */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-3">
                Our services are provided "as is" and "as available" without any warranties of any kind, either 
                express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Guarantees regarding the accuracy, reliability, or completeness of information</li>
                <li>Assurances that our services will be uninterrupted or error-free</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 mb-3">
                To the maximum extent permitted by law, Calgary Academic Excellence shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Lost profits or opportunities</li>
                <li>Loss of data or information</li>
                <li>College admission outcomes</li>
                <li>Academic performance results</li>
                <li>Business interruption</li>
              </ul>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">14. Governing Law</h2>
              <p className="text-gray-700">
                These Terms of Service shall be governed by and construed in accordance with the laws of the Province 
                of Alberta and the federal laws of Canada applicable therein, without regard to conflict of law principles.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">17. Contact Information</h2>
              <p className="text-gray-700 mb-4">If you have questions about these Terms of Service, please contact us:</p>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Calgary Academic Excellence</p>
                <p className="text-gray-700"><strong>Email:</strong> calgaryacademicexcellence@gmail.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> (587) 718-2903</p>
                <p className="text-gray-700"><strong>Address:</strong> Calgary, Alberta, Canada</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="pt-8 border-t-2 border-gray-200">
              <p className="text-gray-600 text-center">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these 
                Terms of Service.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
