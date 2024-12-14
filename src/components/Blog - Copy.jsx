import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, GraduationCap, Calculator, Mail, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [email, setEmail] = useState('');

  useEffect(() => {
    document.title = 'Education Blog & Newsletter | Calgary Academic Excellence';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stay updated with the latest educational insights, SAT prep tips, and university admission strategies. Subscribe to our newsletter for exclusive content.');
    }
  }, []);

  const categories = [
    { id: 'all', label: 'All Posts', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'alberta', label: 'Alberta Curriculum', icon: <Calculator className="h-5 w-5" /> },
    { id: 'sat', label: 'Digital SAT', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'university', label: 'University Admissions', icon: <GraduationCap className="h-5 w-5" /> }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Understanding the New Digital SAT Format",
      category: "sat",
      date: "March 15, 2024",
      excerpt: "A comprehensive guide to the Digital SAT's adaptive testing, new question types, and scoring system.",
      readTime: "5 min read",
      thumbnail: "/images/digital-sat.jpg"
    },
    {
      id: 2,
      title: "Mastering Grade 9 Math in Alberta",
      category: "alberta",
      date: "March 10, 2024",
      excerpt: "Key strategies for success in Grade 9 Mathematics PAT, including practice tips and common pitfalls to avoid.",
      readTime: "4 min read",
      thumbnail: "/images/math-study.jpg"
    },
    {
      id: 3,
      title: "Top Canadian Universities Admission Guide 2024",
      category: "university",
      date: "March 5, 2024",
      excerpt: "Essential information about admission requirements, deadlines, and application strategies for leading Canadian universities.",
      readTime: "6 min read",
      thumbnail: "/images/university.jpg"
    }
    // Add more blog posts as needed
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter signup logic here
    alert('Thank you for subscribing! You will receive our latest updates soon.');
    setEmail('');
  };

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[200px] mt-16">
        <img 
          src="/images/Teen-Area-12-23-Hero.jpg" 
          alt="Educational Blog and Newsletter" 
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/75" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Educational Insights & Updates
          </h1>
          <p className="text-lg md:text-xl text-white mb-6 max-w-xl">
            Stay informed with the latest in education, test prep, and university admissions.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-blue-900">
                Subscribe to Our Newsletter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center mb-6">
                Get exclusive educational content, study tips, and admission updates delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 border rounded-md"
                  required
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Blog Section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Category Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.icon}
              <span>{category.label}</span>
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <img 
                src={post.thumbnail} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="text-xl text-blue-900">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Button variant="outline" className="w-full">
                  Read More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;