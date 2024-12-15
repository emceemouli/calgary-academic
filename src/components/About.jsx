import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { GraduationCap, Award, Users, BookOpen, CheckCircle, Target, Quote, ChevronDown, ChevronUp } from 'lucide-react';

const About = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    document.title = 'About Us - Calgary Academic Excellence | Professional Tutoring Services';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Calgary Academic Excellence\'s proven track record of student success. Our students consistently improve grades and SAT scores through personalized tutoring in Calgary.');
    }
  }, []);

  const achievements = [
    "95% of our students improve their grades by at least one letter grade",
    "Consistent improvement in Digital SAT scores with an average increase of 150+ points",
    "Successful university admissions to top institutions across North America",
    "Recognized by Alberta Education as a trusted supplementary education provider",
    "Experienced team of educators with proven track records"
  ];

  const testimonials = [
    {
      name: "Sarah L.",
      grade: "Grade 8",
      content: "My math and science grades improved from C's to A's in just three months. The personalized attention helped me understand concepts I struggled with for years.",
      location: "Calgary",
      improvement: "Grade improvement: C to A"
    },
    {
      name: "Michael T.",
      type: "SAT Student",
      content: "With Calgary Academic Excellence's help, I increased my SAT score by 210 points. Their strategies and practice tests made all the difference.",
      location: "Calgary",
      improvement: "SAT improvement: +210 points"
    }
  ];

  const faqs = [
    {
      category: "Alberta Curriculum Tutoring",
      questions: [
        {
          q: "What grades do you support in the Alberta curriculum?",
          a: "We provide comprehensive tutoring for students in Grades 4-10, covering Mathematics, Science, and Social Studies. Our tutoring aligns perfectly with the Alberta Education curriculum requirements and learning outcomes."
        },
        {
          q: "How frequently should my child attend tutoring sessions?",
          a: "We recommend 2-3 sessions per week based on individual needs. Each one-hour session is structured to include concept review, guided practice, and independent work to ensure optimal learning progress."
        },
        {
          q: "How do you assess and track student progress?",
          a: "We conduct regular assessments aligned with the Alberta curriculum benchmarks. Parents receive monthly progress reports detailing their child's improvements, areas of focus, and next learning objectives."
        }
      ]
    },
    {
      category: "Digital SAT Preparation",
      questions: [
        {
          q: "What is your average SAT score improvement?",
          a: "Our students achieve an average improvement of 210+ points. Our comprehensive program combines test strategies, content review, and regular practice tests to ensure consistent score improvements."
        },
        {
          q: "How long is your SAT preparation program?",
          a: "Our standard program runs for 8-12 weeks, with custom schedules available based on test dates and target scores. Each week includes focused content review, practice sessions, and detailed performance analysis."
        },
        {
          q: "Do you offer practice tests?",
          a: "Yes, we provide regular full-length Digital SAT practice tests under timed conditions. Each test is followed by comprehensive review sessions to analyze mistakes and improve test-taking strategies."
        }
      ]
    },
    {
      category: "University Admissions Counseling",
      questions: [
        {
          q: "When should we start university counseling?",
          a: "We recommend starting in Grade 11 for strategic planning and Grade 12 fall semester for applications. Early preparation allows time for thorough research, strong applications, and meeting all deadlines."
        },
        {
          q: "Which universities do your students typically get accepted to?",
          a: "Our students have received acceptances to top Canadian universities including University of Toronto, UBC, and McGill, as well as prestigious U.S. institutions. Success rates are particularly high for University of Calgary and other Alberta universities."
        },
        {
          q: "What does your university counseling include?",
          a: "Our comprehensive service includes university selection strategy, application guidance, essay reviews, interview preparation, and scholarship application support. We provide detailed feedback and ongoing support throughout the entire process."
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[200px] mt-16">
        <img src="/images/Teen-Area-12-23-Hero.jpg" alt="About Calgary Academic Excellence" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/75" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About Calgary Academic Excellence</h1>
          <p className="text-lg md:text-xl text-white mb-6 max-w-xl">Empowering students to achieve academic excellence through proven strategies.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12 overflow-hidden w-full">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-blue-900">
                <Target className="h-6 w-6 mr-2 text-blue-600" />Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg leading-relaxed">
                At Calgary Academic Excellence, we are dedicated to providing high-quality, personalized education that helps students build confidence, develop strong academic foundations, and achieve their educational goals. Our commitment to excellence drives everything we do.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-blue-900">
                <Users className="h-6 w-6 mr-2 text-blue-600" />Our Approach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg leading-relaxed">
                We combine traditional teaching methods with modern technology and personalized learning strategies. Our focus on individual attention ensures each student receives the support they need to excel in their academic journey.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-blue-900">
              <Quote className="h-6 w-6 mr-2 text-blue-600" />Student Success Stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <Quote className="h-8 w-8 text-blue-400/20 mb-4" />
                  <p className="text-gray-700 text-lg mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-blue-900 font-semibold">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.grade || testimonial.type}</p>
                    <p className="text-green-600 font-medium mt-2">{testimonial.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-blue-900">
              <Award className="h-6 w-6 mr-2 text-blue-600" />Our Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 mr-3 mt-1 text-green-500 flex-shrink-0" />
                  <p className="text-gray-700 text-lg">{achievement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-blue-900">
              <BookOpen className="h-6 w-6 mr-2 text-blue-600" />Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-4">
                  <h3 className="text-xl font-semibold text-blue-900 border-b border-blue-100 pb-2">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.questions.map((faq, questionIndex) => {
                      const index = `${categoryIndex}-${questionIndex}`;
                      return (
                        <div key={questionIndex} className="border rounded-lg hover:shadow-sm transition-shadow">
                          <button
                            className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
                            onClick={() => toggleFAQ(index)}
                          >
                            <span className="font-medium text-left text-gray-900">{faq.q}</span>
                            {openFAQ === index ? (
                              <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          {openFAQ === index && (
                            <div className="px-4 py-3 border-t bg-gray-50">
                              <p className="text-gray-700 text-lg leading-relaxed">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-blue-900">
              <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />Our Core Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-900">Academic Excellence</h3>
                <p className="text-gray-700">We maintain high standards and help students achieve their full potential through proven teaching methods and continuous support.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-900">Personalized Learning</h3>
                <p className="text-gray-700">Every student receives individualized attention and a customized learning plan tailored to their unique needs and goals.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-900">Continuous Growth</h3>
                <p className="text-gray-700">We encourage both students and educators to embrace lifelong learning and constantly strive for improvement.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;