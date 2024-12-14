import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Loader } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            'https://www.blogger.com/feeds/7698008433679424378/posts/default?alt=json'
          )}`
        );

        const result = await response.json();
        const data = JSON.parse(result.contents);

        const blogPosts = data.feed.entry.map((entry) => {
          const alternateLink =
            entry.link && entry.link.length
              ? entry.link.filter((l) => l.rel === 'alternate')[0]?.href || '#'
              : '#';

          return {
            title: entry.title.$t,
            link: alternateLink,
            published: new Date(entry.published.$t).toDateString(),
            summary: entry.summary?.$t || 'Click to read the full content.',
          };
        });

        setPosts(blogPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    const fetchNewsUpdates = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vRD83yCtLxltpsjkqZFjwk_4z1zJ9NSj8N9fAGMPPtgKopCS0lqsSEAdokPTsLbxq00B3yLRX1uKr5C/pub?gid=0&single=true&output=csv'
        );
        const data = await response.text();

        const rows = data.split('\n').slice(1);
        const news = rows.map((row) => {
          const [date, title, link] = row.split(',');
          return { date, title, link: link?.trim() || '#' };
        });

        setNewsUpdates(news);
      } catch (error) {
        console.error('Error fetching news updates:', error);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchBlogPosts();
    fetchNewsUpdates();
  }, []);

  const handleReadMore = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        <title>Educational Blog & News | Calgary Academic Excellence</title>
        <meta name="title" content="Educational Blog & News | Calgary Academic Excellence" />
        <meta name="description" content="Stay updated with the latest educational insights, SAT prep strategies, and academic news. Expert advice for students in Calgary and beyond." />
        <meta name="keywords" content="education blog, SAT prep, Calgary tutoring, academic news, study tips, university admissions, Alberta curriculum" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://calgaryacademic.com/blog" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://calgaryacademic.com/blog" />
        <meta property="og:title" content="Educational Blog & News | Calgary Academic Excellence" />
        <meta property="og:description" content="Stay updated with the latest educational insights, SAT prep strategies, and academic news. Expert advice for students in Calgary and beyond." />
        <meta property="og:image" content="/images/Teen-Area-12-23-Hero.jpg" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://calgaryacademic.com/blog" />
        <meta property="twitter:title" content="Educational Blog & News | Calgary Academic Excellence" />
        <meta property="twitter:description" content="Stay updated with the latest educational insights, SAT prep strategies, and academic news. Expert advice for students in Calgary and beyond." />
        <meta property="twitter:image" content="/images/Teen-Area-12-23-Hero.jpg" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <header className="relative h-[250px] w-full overflow-hidden mt-16">
          <img
            src="/images/Teen-Area-12-23-Hero.jpg"
            alt="Educational Blog"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/75" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center">
            {/* Mobile-optimized text with better contrast and visibility */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center relative z-10 px-4 py-2 bg-blue-900/60 rounded-lg shadow-lg">
              Educational Blog & Updates
            </h1>
            <p className="text-lg text-white text-center max-w-2xl relative z-10 px-4 py-2 bg-blue-900/60 rounded-lg">
              Explore insights, news, and study strategies for academic success.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 relative z-10 p-2 bg-white/90 rounded-lg shadow-sm">
              Latest Blog Posts
            </h2>
            {loadingBlogs ? (
              <div className="flex justify-center items-center p-8">
                <Loader className="animate-spin h-8 w-8 text-blue-600" />
                <span className="ml-2 text-gray-600">Loading Blog Posts...</span>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
                    <CardHeader>
                      <div className="text-sm text-gray-600 mb-2">{post.published}</div>
                      <CardTitle className="text-xl text-gray-900">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 line-clamp-3">{post.summary}</p>
                      <div onClick={() => handleReadMore(post.link)}>
                        <Button className="flex items-center bg-blue-600 text-white hover:bg-blue-700">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 relative z-10 p-2 bg-white/90 rounded-lg shadow-sm">
              News Updates
            </h2>
            {loadingNews ? (
              <div className="flex justify-center items-center p-8">
                <Loader className="animate-spin h-8 w-8 text-blue-600" />
                <span className="ml-2 text-gray-600">Loading News Updates...</span>
              </div>
            ) : (
              <ul className="space-y-4">
                {newsUpdates.map((update, index) => (
                  <li
                    key={index}
                    className="border-l-4 border-blue-500 bg-white p-4 shadow rounded-lg"
                  >
                    <span className="block text-gray-700 font-semibold">{update.date}</span>
                    <div 
                      onClick={() => handleReadMore(update.link)}
                      className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    >
                      {update.title}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>

      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Calgary Academic Excellence Blog",
          "description": "Educational insights, SAT prep strategies, and academic news",
          "publisher": {
            "@type": "Organization",
            "name": "Calgary Academic Excellence",
            "logo": {
              "@type": "ImageObject",
              "url": "/images/Logo2.png"
            }
          },
          "url": "https://calgaryacademic.com/blog",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://calgaryacademic.com/blog"
          }
        })}
      </script>
    </>
  );
};

export default Blog;