import React from 'react';
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
  const achievements = [
    "95% of our students improve their grades by at least one letter grade",
    "Average SAT score improvement of 150+ points",
    "Successfully helped students gain admission to top universities",
    "Certified by Alberta Education as a supplementary education provider",
    "Experienced tutors with proven track records"
  ];

  const values = [
    {
      title: "Personalized Learning",
      description: "We tailor our teaching methods to each student's unique learning style and needs."
    },
    {
      title: "Academic Excellence",
      description: "We maintain high standards and help students achieve their full potential."
    },
    {
      title: "Continuous Support",
      description: "Our tutors provide ongoing guidance and encouragement throughout the learning journey."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-blue-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            About Calgary Academic Excellence
          </h1>
          <p className="text-xl text-white max-w-2xl">
            Empowering students to achieve their academic goals through personalized education
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700">
                At Calgary Academic Excellence, we are dedicated to providing 
                high-quality, personalized education that helps students build 
                confidence, develop strong academic foundations, and achieve their 
                educational goals.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Users className="h-6 w-6 mr-2 text-blue-600" />
                Our Approach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700">
                We combine traditional teaching methods with modern technology and 
                personalized learning strategies. Our focus on individual attention 
                ensures each student receives the support they need to excel.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Award className="h-6 w-6 mr-2 text-blue-600" />
              Our Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Core Values */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;