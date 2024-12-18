import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  ArrowRight, 
  Loader, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink 
} from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const POSTS_PER_PAGE = 6;
const BLOG_URL = 'https://calgaryacademicexcellence.blogspot.com';
const DEFAULT_THUMBNAIL = '/images/default-blog-thumbnail.jpg';

// Error Message Component
const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

// Pagination Controls Component
const PaginationControls = ({ currentPage, totalPages, handlePageChange }) => (
  <div className="flex justify-center items-center space-x-4 mt-8">
    <Button
      variant="outline"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="flex items-center"
    >
      <ChevronLeft className="h-4 w-4 mr-2" />
      Previous
    </Button>
    <span className="text-gray-700">
      Page {currentPage} of {totalPages}
    </span>
    <Button
      variant="outline"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="flex items-center"
    >
      Next
      <ChevronRight className="h-4 w-4 ml-2" />
    </Button>
  </div>
);

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            'https://www.blogger.com/feeds/7698008433679424378/posts/default?alt=json&max-results=500'
          )}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const data = JSON.parse(result.contents);

        if (!data.feed || !data.feed.entry) {
          throw new Error('Invalid blog data format');
        }

        const blogPosts = data.feed.entry.map((entry) => {
          const alternateLink = entry.link?.find(l => l.rel === 'alternate')?.href || '#';
          const content = entry.content?.$t || entry.summary?.$t || '';
          
          // Extract the first image from the content
          let thumbnail = DEFAULT_THUMBNAIL;
          const imgRegex = /<img[^>]+src="([^">]+)"/;
          const imgMatch = content.match(imgRegex);
          if (imgMatch && imgMatch[1]) {
            // Ensure HTTPS for image URLs
            thumbnail = imgMatch[1].replace(/^http:/, 'https:');
            // Handle relative URLs
            if (thumbnail.startsWith('//')) {
              thumbnail = 'https:' + thumbnail;
            }
          }
          
          // Create a temporary div to strip HTML tags for summary
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = content;
          const textContent = tempDiv.textContent || tempDiv.innerText;
          const summary = textContent.slice(0, 200) + '...';

          return {
            title: entry.title.$t,
            link: alternateLink,
            published: new Date(entry.published.$t).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            summary: summary,
            thumbnail: thumbnail
          };
        });

        setPosts(blogPosts);
        setTotalPosts(blogPosts.length);
        setError(null);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoadingBlogs(false);
      }
    };

    const fetchNewsUpdates = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vRD83yCtLxltpsjkqZFjwk_4z1zJ9NSj8N9fAGMPPtgKopCS0lqsSEAdokPTsLbxq00B3yLRX1uKr5C/pub?gid=0&single=true&output=csv'
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.text();
        const rows = data.split('\n').slice(1);
        const news = rows.map((row) => {
          const [date, title, link] = row.split(',');
          return { 
            date: new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }), 
            title, 
            link: link?.trim() || '#' 
          };
        });

        setNewsUpdates(news);
      } catch (error) {
        console.error('Error fetching news updates:', error);
        setError('Failed to load news updates. Please try again later.');
      } finally {
        setLoadingNews(false);
      }
    };

    fetchBlogPosts();
    fetchNewsUpdates();
  }, []);

  const handleReadMore = (link) => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  // Calculate pagination values
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  // Pagination handler
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <Helmet>
        <title>Educational Blog & News | Calgary Academic Excellence</title>
        <meta name="title" content="Educational Blog & News | Calgary Academic Excellence" />
        <meta 
          name="description" 
          content="Stay updated with the latest educational insights, SAT prep strategies, and academic news. Expert advice for students in Calgary and beyond." 
        />
        <meta 
          name="keywords" 
          content="education blog, SAT prep, Calgary tutoring, academic news, study tips, university admissions, Alberta curriculum" 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://calgaryacademic.com/blog" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://calgaryacademic.com/blog" />
        <meta property="og:title" content="Educational Blog & News | Calgary Academic Excellence" />
        <meta 
          property="og:description" 
          content="Stay updated with the latest educational insights, SAT prep strategies, and academic news. Expert advice for students in Calgary and beyond." 
        />
        <meta property="og:image" content="/images/Teen-Area-12-23-Hero.jpg" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://calgaryacademic.com/blog" />
        <meta property="twitter:title" content="Educational Blog & News | Calgary Academic Excellence" />
        <meta 
          property="twitter:description" 
          content="Stay updated with the latest educational insights, SAT prep strategies, and academic news. Expert advice for students in Calgary and beyond." 
        />
        <meta property="twitter:image" content="/images/Teen-Area-12-23-Hero.jpg" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <header className="relative h-[250px] w-full overflow-hidden pt-16">
          <img
            src="/images/Teen-Area-12-23-Hero.jpg"
            alt="Educational Blog"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/75" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center relative z-10 px-4 py-2 bg-blue-900/60 rounded-lg shadow-lg">
              Educational Blog & Updates
            </h1>
            <p className="text-lg text-white text-center max-w-2xl relative z-10 px-4 py-2 bg-blue-900/60 rounded-lg">
              Explore insights, news, and study strategies for academic success.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {error && <ErrorMessage message={error} />}
          
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 relative z-10 p-2 bg-white/90 rounded-lg shadow-sm">
                Latest Blog Posts
              </h2>
              {BLOG_URL && (
                <Button
                  onClick={() => window.open(BLOG_URL, '_blank', 'noopener,noreferrer')}
                  className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                >
                  View All Posts
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>

            {loadingBlogs ? (
              <div className="flex justify-center items-center p-8">
                <Loader className="animate-spin h-8 w-8 text-blue-600" />
                <span className="ml-2 text-gray-600">Loading Blog Posts...</span>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPosts.map((post, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow bg-white flex flex-col">
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = DEFAULT_THUMBNAIL;
                          }}
                        />
                      </div>
                      <CardHeader>
                        <div className="text-sm text-gray-600 mb-2">{post.published}</div>
                        <CardTitle className="text-xl text-gray-900 line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-gray-700 mb-4 line-clamp-3">{post.summary}</p>
                        <div onClick={() => handleReadMore(post.link)} className="mt-auto">
                          <Button className="flex items-center bg-blue-600 text-white hover:bg-blue-700 w-full justify-center">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {totalPages > 1 && (
                  <PaginationControls 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                  />
                )}
              </>
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
    </>
  );
};

export default Blog;