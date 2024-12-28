import React, { useEffect, useState, useMemo, Suspense, lazy } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Loader, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet';

const POSTS_PER_PAGE = 3;
const MAX_POSTS = 9;
const BLOG_URL = 'https://calgaryacademicexcellence.blogspot.com';
const DEFAULT_THUMBNAIL = '/images/default-blog-thumbnail.jpg';
const CACHE_DURATION = 3600000; // 1 hour in milliseconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Error Message Component
const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 text-red-700 rounded">
    {message}
  </div>
);

// Pagination Controls Component
const PaginationControls = ({ currentPage, totalPages, handlePageChange }) => (
  <div className="flex justify-between items-center mt-6">
    <div className="flex space-x-4">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-sm px-4 py-2"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <span className="text-gray-600 text-sm flex items-center">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-sm px-4 py-2"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
    <Button
      onClick={() => window.open(BLOG_URL, '_blank')}
      className="bg-blue-700 text-white hover:bg-blue-800 text-sm px-4 py-2"
    >
      View More on Blogger <ExternalLink className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

// Loading Skeleton Component
const BlogSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse">
        <div className="bg-gray-200 h-32 w-full rounded-t"></div>
        <div className="p-3 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Update document title
  useEffect(() => {
    document.title = 'Educational Blog & News Updates';
  }, []);

  const fetchWithRetry = async (url, options = {}, retries = MAX_RETRIES) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  };

  const checkCacheValidity = () => {
    const cacheExpiry = localStorage.getItem('cacheExpiry');
    return cacheExpiry && new Date().getTime() < parseInt(cacheExpiry);
  };

  const fetchBlogPosts = async () => {
    setLoadingBlogs(true);
    try {
      // Check cache first
      const cachedBlogs = JSON.parse(localStorage.getItem('cachedBlogs'));
      if (cachedBlogs && checkCacheValidity()) {
        setPosts(cachedBlogs);
        setLoadingBlogs(false);
        return;
      }

      const result = await fetchWithRetry(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          'https://www.blogger.com/feeds/7698008433679424378/posts/default?alt=json&max-results=10'
        )}`
      );

      const data = JSON.parse(result.contents);
      const blogPosts = data.feed.entry.map((entry) => ({
        title: entry.title.$t,
        link: entry.link?.find((l) => l.rel === 'alternate')?.href || '#',
        published: new Date(entry.published.$t).toLocaleDateString(),
        summary: entry.content?.$t.replace(/<[^>]+>/g, '').slice(0, 100) + '...',
        thumbnail: entry.content?.$t.match(/<img[^>]+src="([^">]+)"/)?.at(1)?.replace(/^http:/, 'https:') || DEFAULT_THUMBNAIL
      }));

      const limitedPosts = blogPosts.slice(0, MAX_POSTS);
      
      // Update cache
      localStorage.setItem('cachedBlogs', JSON.stringify(limitedPosts));
      localStorage.setItem('cacheExpiry', new Date().getTime() + CACHE_DURATION);
      
      setPosts(limitedPosts);
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
      console.error('Blog fetch error:', err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const fetchNewsUpdates = async () => {
    setLoadingNews(true);
    try {
      const cachedNews = JSON.parse(localStorage.getItem('cachedNews'));
      if (cachedNews && checkCacheValidity()) {
        setNewsUpdates(cachedNews);
        setLoadingNews(false);
        return;
      }

      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vRD83yCtLxltpsjkqZFjwk_4z1zJ9NSj8N9fAGMPPtgKopCS0lqsSEAdokPTsLbxq00B3yLRX1uKr5C/pub?gid=0&single=true&output=csv'
      );
      
      if (!response.ok) throw new Error('Failed to fetch news updates.');

      const data = await response.text();
      const rows = data.split('\n').slice(1);
      const news = rows.map((row) => {
        const [date, title, link] = row.split(',');
        return {
          date: new Date(date).toLocaleDateString(),
          title: title.trim(),
          link: link?.trim() || '#',
        };
      });

      localStorage.setItem('cachedNews', JSON.stringify(news));
      setNewsUpdates(news);
    } catch (err) {
      setError('Failed to load news updates. Please try again later.');
      console.error('News fetch error:', err);
    } finally {
      setLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
    fetchNewsUpdates();

    // Cleanup function
    return () => {
      setLoadingBlogs(false);
      setLoadingNews(false);
    };
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, currentPage]);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section with optimized image loading */}
      <header className="relative h-[250px] pt-16 mb-8">
        <img
          src="/images/Teen-Area-12-23-Hero.jpg"
          alt="Educational Blog Hero"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/75" />
        <div className="relative flex justify-center items-center h-full text-white">
          <h1 className="text-4xl font-bold">Educational Blog & Updates</h1>
        </div>
      </header>

      {/* Blog Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Latest Blog Posts</h2>
        
        {error && <ErrorMessage message={error} />}
        
        {loadingBlogs ? (
          <BlogSkeleton />
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPosts.map((post, idx) => (
                <Card key={idx} className="shadow hover:shadow-md transition">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-32 object-cover rounded-t"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = DEFAULT_THUMBNAIL;
                    }}
                  />
                  <CardHeader className="p-3">
                    <div className="text-xs text-gray-500 mb-1">{post.published}</div>
                    <CardTitle className="text-sm font-semibold line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <p className="text-xs text-gray-700 line-clamp-3 mb-2">{post.summary}</p>
                    <Button
                      onClick={() => window.open(post.link, '_blank')}
                      className="text-xs bg-blue-600 text-white w-full py-2 hover:bg-blue-700"
                    >
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={setCurrentPage}
            />
          </>
        )}
      </section>

      {/* News Updates Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-900">News Updates</h2>
        {loadingNews ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse border-l-4 border-blue-500 bg-gray-50 p-4 rounded-lg">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-4">
            {newsUpdates.map((update, idx) => (
              <li key={idx} className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-lg">
                <span className="block text-gray-600 font-bold">{update.date}</span>
                <a
                  href={update.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {update.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Blog;