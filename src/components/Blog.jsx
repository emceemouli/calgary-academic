import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Calendar, Clock, Calculator, GraduationCap, TrendingUp } from 'lucide-react';

// List all your markdown blog posts here
const blogPosts = [
  {
    title: "How to Convert CBSE Percentage to GPA for US Universities (2025 Guide)",
    slug: "cbse-to-gpa-conversion",
    date: "January 9, 2025",
    excerpt: "Complete guide for Indian students to convert CBSE percentage to US 4.0 GPA scale. Includes AACRAO EDGE conversion tables, step-by-step process, and admission tips for Harvard, MIT, Stanford.",
    image: "/images/Teen-Area-12-23-Hero.jpg",
    readTime: "12 min read",
    category: "International Students"
  },
  {
    title: "Canadian Students Guide to US College Applications: Everything You Need to Know",
    slug: "canadian-students-us-colleges",
    date: "January 10, 2025",
    excerpt: "Complete guide for Canadian high school students applying to US universities. Alberta, Ontario, BC grade conversions, SAT requirements, financial aid, and step-by-step application process.",
    image: "/images/UScollegeapplications.jpg",
    readTime: "15 min read",
    category: "International Students"
  },
  {
  title: "Cracking the Code: Understanding Admissions to Ivy League and Top-Tier Universities (2026 Guide)",
  slug: "cracking-ivy-league-admissions",  // Must match markdown filename
  date: "January 10, 2025",
  excerpt: "Complete guide to Ivy League admissions for US, Canadian, and international students. Learn requirements, strategies, and insider tips for Harvard, Yale, Princeton, MIT, and Stanford.",
  image: "/images/stanford.jpg",
  readTime: "22 min read",  // ~4,400 words ÷ 200 = 22 minutes
  category: "Elite Universities"
},

{
  title: "Step-by-Step Guide: How to Fill Out FAFSA and CSS Profile for Maximum Financial Aid (2025-26)",
  slug: "how-to-fill-fafsa-css-profile-guide",  // Must match markdown filename
  date: "January 12, 2025",
  excerpt: "Complete guide to filling out FAFSA and CSS Profile applications. Learn what documents you need, common mistakes to avoid, and tips to maximize your financial aid for college.",
  image: "/images/FafsaCSS.jpg",
  readTime: "28 min read",  // ~5,600 words ÷ 200 = 28 minutes
  category: "Financial Aid"
},

{
  title: "Complete Guide to Financial Aid & Scholarships for International Students at US Universities",
  slug: "financial-aid-scholarships-international-students",  // Must match markdown filename
  date: "January 11, 2026",
  excerpt: "Everything international students need to know about affording US universities. Need-blind schools, scholarships, financial aid application process, and strategies for students from India, Canada, and worldwide.",
  image: "/images/financialaid.jpg",
  readTime: "26 min read",  // ~5,200 words ÷ 200 = 26 minutes
  category: "Financial Aid"
},
  // Add more blog posts here as you write them
];

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Matching Your Site Colors */}
      <header className="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            College Admissions Blog
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Expert guidance for international students applying to elite US universities
          </p>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post, index) => (
            <Card key={index} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
              {/* Post Image */}
              <Link to={`/blog/${post.slug}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </Link>

              <CardHeader className="flex-grow">
                {/* Category Badge */}
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Post Title */}
                <Link to={`/blog/${post.slug}`}>
                  <CardTitle className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-3 mb-3">
                    {post.title}
                  </CardTitle>
                </Link>

                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Excerpt */}
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <Link to={`/blog/${post.slug}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-2"
            >
              Previous
            </Button>
            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-2"
            >
              Next
            </Button>
          </div>
        )}

        {/* CTA Section - All Calculators with Proper Visibility */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 md:p-12 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Calculate Your Admission Chances
            </h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Use our FREE AI-powered calculators to evaluate your profile and find your perfect university match
            </p>
          </div>

          {/* Calculator Buttons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Elite ChanceMe Calculator */}
            <Link to="/elite-chance-me" className="block">
              <div className="bg-white text-gray-900 p-6 rounded-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 h-full">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Elite ChanceMe</h3>
                <p className="text-sm text-gray-600 text-center">
                  Harvard, MIT, Stanford & 300+ elite universities
                </p>
              </div>
            </Link>

            {/* College Admissions Calculator */}
            <Link to="/college-admissions-calculator" className="block">
              <div className="bg-white text-gray-900 p-6 rounded-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 h-full">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-center mb-2">College Predictor</h3>
                <p className="text-sm text-gray-600 text-center">
                  Find your reach, target, and safety schools
                </p>
              </div>
            </Link>

            {/* Graduate Admissions Calculator */}
            <Link to="/graduate-admissions-calculator" className="block">
              <div className="bg-white text-gray-900 p-6 rounded-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 h-full">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 mx-auto">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-center mb-2">Graduate School</h3>
                <p className="text-sm text-gray-600 text-center">
                  Masters & PhD admission chances
                </p>
              </div>
            </Link>

            {/* GPA Calculator */}
            <Link to="/gpa-calculator" className="block">
              <div className="bg-white text-gray-900 p-6 rounded-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 h-full">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 mx-auto">
                  <Calculator className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-center mb-2">GPA Calculator</h3>
                <p className="text-sm text-gray-600 text-center">
                  Convert international grades to US 4.0 GPA
                </p>
              </div>
            </Link>
          </div>

          {/* Additional CTA Text */}
          <div className="text-center mt-8">
            <p className="text-blue-100 text-sm">
              🎓 100% Free • No Registration Required • Instant Results
            </p>
          </div>
        </div>
      </main>

      {/* Footer SEO Section */}
      <footer className="bg-gray-100 py-8 mt-12 border-t-2 border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            🎓 Expert College Admissions Guidance | International Students | Calgary Academic Excellence
          </p>
          <p className="text-xs text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Get expert guidance on US college admissions for international students from India, Canada, UK, and worldwide. 
            Free calculators, comprehensive guides, and personalized counseling for Harvard, MIT, Stanford, and 300+ elite universities.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
