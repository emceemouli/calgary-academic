import React, { useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Shield, AlertCircle, Info } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy - Calgary Academic Excellence';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Privacy Policy for Calgary Academic Excellence. Learn how we collect, use, and protect your personal information.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-[200px]">
        <img 
          src="/images/Teen-Area-12-23-Hero.jpg" 
          alt="Privacy Policy" 
          className="absolute inset-0 w-full h-full object-cover" 
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/75" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Shield className="h-10 w-10" />
            Privacy Policy
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
                Calgary Academic Excellence ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you use our AI College Admissions Predictor and related services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Info className="h-6 w-6 text-blue-600" />
                1. Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1.1 Information You Provide</h3>
                  <p className="text-gray-700 mb-3">When you use our College Predictor tool, we collect the following information that you voluntarily provide:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Academic Information:</strong> GPA, SAT scores, intended major</li>
                    <li><strong>Preferences:</strong> Preferred location, budget range</li>
                    <li><strong>Contact Information:</strong> If you contact us via email or phone (optional)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1.2 Automatically Collected Information</h3>
                  <p className="text-gray-700 mb-3">We automatically collect certain information when you visit our website:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Log Data:</strong> IP address, browser type, operating system, referring URLs, pages viewed, and timestamps</li>
                    <li><strong>Device Information:</strong> Device type, screen resolution, and unique device identifiers</li>
                    <li><strong>Usage Data:</strong> How you interact with our services, features used, and time spent on pages</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1.3 Cookies and Tracking Technologies</h3>
                  <p className="text-gray-700 mb-3">We use cookies and similar tracking technologies to enhance your experience:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                    <li><strong>Advertising Cookies:</strong> Used to serve relevant advertisements through Google AdSense</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-blue-900 font-semibold flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Important: By using our website, you consent to our use of cookies as described in this policy. 
                    You can control cookies through your browser settings.</span>
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-3">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Service Delivery:</strong> To provide AI-powered college recommendations based on your profile</li>
                <li><strong>Service Improvement:</strong> To analyze usage patterns and enhance our algorithms and user experience</li>
                <li><strong>Communication:</strong> To respond to your inquiries and provide customer support</li>
                <li><strong>Analytics:</strong> To understand how our services are used and improve performance</li>
                <li><strong>Advertising:</strong> To display personalized advertisements through Google AdSense</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </section>

            {/* Google AdSense */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">3. Google AdSense and Advertising</h2>
              <p className="text-gray-700 mb-4">
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and 
                web beacons to serve ads based on your prior visits to our website and other websites on the Internet.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">3.1 Third-Party Advertising</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Google and its partners use cookies to serve ads based on your browsing activity</li>
                    <li>You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a></li>
                    <li>You can also opt out through the <a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NAI opt-out page</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">3.2 DoubleClick Cookie</h3>
                  <p className="text-gray-700">
                    Google's use of the DoubleClick cookie enables it and its partners to serve ads to you based on 
                    your visit to our site and/or other sites on the Internet. You may opt out of the use of the 
                    DoubleClick cookie by visiting the <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ad and Content Network Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">We do not sell your personal information to third parties. We may share your information in the following circumstances:</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">4.1 Service Providers</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Google AI/Gemini:</strong> We use Google's AI services to generate college recommendations. Your academic data is sent to Google's servers for processing.</li>
                    <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                    <li><strong>Hosting Providers:</strong> To host our website and store data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">4.2 Legal Requirements</h3>
                  <p className="text-gray-700">
                    We may disclose your information if required to do so by law or in response to valid requests 
                    by public authorities (e.g., a court or government agency).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">4.3 Business Transfers</h3>
                  <p className="text-gray-700">
                    If we are involved in a merger, acquisition, or asset sale, your information may be transferred. 
                    We will provide notice before your information is transferred and becomes subject to a different Privacy Policy.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-700">
                We retain your information only for as long as necessary to fulfill the purposes outlined in this 
                Privacy Policy, unless a longer retention period is required or permitted by law. Academic profile 
                data entered into our predictor tool is not permanently stored and is only used for the duration of your session.
              </p>
            </section>

            {/* Your Privacy Rights */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">7. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-3">Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Objection:</strong> Object to our processing of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing your personal information</li>
                <li><strong>Data Portability:</strong> Request transfer of your information to another party</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent where we rely on consent to process your information</li>
              </ul>
              
              <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-900 font-semibold">
                  GDPR Rights (EU Users): If you are in the European Economic Area (EEA), you have specific rights 
                  under the General Data Protection Regulation (GDPR), including the rights listed above.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not directed to children under the age of 13 (or 16 in the EEA). We do not knowingly 
                collect personal information from children. If you are a parent or guardian and believe your child has 
                provided us with personal information, please contact us, and we will delete such information.
              </p>
            </section>

            {/* International Data Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and maintained on computers located outside of your state, province, 
                country, or other governmental jurisdiction where the data protection laws may differ from those of your 
                jurisdiction. By using our services, you consent to the transfer of information to Canada and/or other locations.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this 
                Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">If you have any questions about this Privacy Policy or our privacy practices, please contact us:</p>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Calgary Academic Excellence</p>
                <p className="text-gray-700"><strong>Email:</strong> calgaryacademicexcellence@gmail.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> (587) 718-2903</p>
                <p className="text-gray-700"><strong>Address:</strong> Calgary, Alberta, Canada</p>
                <p className="text-gray-700"><strong>Hours:</strong> Monday-Friday: 9AM-8PM, Saturday: 10AM-6PM, Sunday: Closed</p>
              </div>
            </section>

            {/* Effective Date */}
            <section className="pt-8 border-t-2 border-gray-200">
              <p className="text-gray-600 text-center">
                This Privacy Policy is effective as of December 27, 2025. Your continued use of our services after 
                any modifications to this Privacy Policy will constitute your acknowledgment of the modifications and 
                your consent to abide and be bound by the updated Privacy Policy.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
