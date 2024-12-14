import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { 
  GraduationCap,
  Award,
  Users,
  BookOpen,
  CheckCircle,
  Target
} from 'lucide-react';

const About = () => {
  // SEO optimization
  useEffect(() => {
    document.title = 'About Us - Calgary Academic Excellence | Professional Tutoring Services';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Learn about Calgary Academic Excellence\'s mission to provide exceptional tutoring services. ' +
        'Our experienced educators help students achieve their academic goals through personalized learning.'
      );
    }
  }, []);

  const achievements = [
    "95% of our students improve their grades by at least one letter grade",
    "Consistent improvement in Digital SAT scores with an average increase of 150+ points",
    "Successful university admissions to top institutions across North America",
    "Recognized by Alberta Education as a trusted supplementary education provider",
    "Experienced team of educators with proven track records"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with proper spacing for fixed nav */}
		<div className="relative h-[200px] overflow-hidden mt-16">
		  <img 
			src="/images/Teen-Area-12-23-Hero.jpg"
			alt="About Calgary Academic Excellence"
			className="absolute inset-0 w-full h-full object-cover"
			loading="eager"
		  />
		  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/75"></div>
		  <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
			<h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
			  About Calgary Academic Excellence
			</h1>
			<p className="text-lg md:text-xl text-white mb-6 max-w-xl">
			  Empowering students to achieve academic excellence through proven strategies.
			</p>
		  </div>
		</div>


      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
        {/* Mission & Approach Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-blue-900">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg leading-relaxed">
                At Calgary Academic Excellence, we are dedicated to providing 
                high-quality, personalized education that helps students build 
                confidence, develop strong academic foundations, and achieve their 
                educational goals. Our commitment to excellence drives everything we do.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-blue-900">
                <Users className="h-6 w-6 mr-2 text-blue-600" />
                Our Approach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg leading-relaxed">
                We combine traditional teaching methods with modern technology and 
                personalized learning strategies. Our focus on individual attention 
                ensures each student receives the support they need to excel in their 
                academic journey.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-blue-900">
              <Award className="h-6 w-6 mr-2 text-blue-600" />
              Our Achievements
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

        {/* Values Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-blue-900">
              <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
              Our Core Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-900">
                  Academic Excellence
                </h3>
                <p className="text-gray-700">
                  We maintain high standards and help students achieve their full potential 
                  through proven teaching methods and continuous support.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-900">
                  Personalized Learning
                </h3>
                <p className="text-gray-700">
                  Every student receives individualized attention and a customized 
                  learning plan tailored to their unique needs and goals.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-900">
                  Continuous Growth
                </h3>
                <p className="text-gray-700">
                  We encourage both students and educators to embrace lifelong learning 
                  and constantly strive for improvement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;