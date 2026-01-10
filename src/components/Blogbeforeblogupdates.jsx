import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const POSTS_PER_PAGE = 3;
const BLOG_URL = 'https://calgaryacademicexcellence.blogspot.com';
const DEFAULT_THUMBNAIL = '/images/default-blog-thumbnail.jpg';

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

// Blog Post Card Component
const BlogPostCard = ({ post }) => (
  <Card className="shadow hover:shadow-md transition">
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
      <div className="text-xs text-gray-500 mb-1">
        {new Date(post.published).toLocaleDateString()}
      </div>
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
);

// Loading Skeleton
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

  useEffect(() => {
    document.title = 'Educational Blog & News Updates';
    
    // Fetch static blog data
    const fetchBlogData = async () => {
      try {
        const response = await fetch('/blog-data.json');
        if (!response.ok) throw new Error('Failed to load blog posts');
        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        console.error('Error loading blog data:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoadingBlogs(false);
      }
    };

    // Fetch news updates
    const fetchNewsUpdates = async () => {
      try {
        const cachedNews = localStorage.getItem('newsUpdates');
        const cacheExpiry = localStorage.getItem('newsUpdatesExpiry');
        
        // Check if we have valid cached news
        if (cachedNews && cacheExpiry && Date.now() < Number(cacheExpiry)) {
          setNewsUpdates(JSON.parse(cachedNews));
          setLoadingNews(false);
          return;
        }

        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vRD83yCtLxltpsjkqZFjwk_4z1zJ9NSj8N9fAGMPPtgKopCS0lqsSEAdokPTsLbxq00B3yLRX1uKr5C/pub?gid=0&single=true&output=csv'
        );
        
        if (!response.ok) throw new Error('Failed to fetch news updates');

        const text = await response.text();
        const rows = text.split('\n').slice(1);
        const news = rows.map((row) => {
          const [date, title, link] = row.split(',');
          return {
            date: new Date(date).toLocaleDateString(),
            title: title.trim(),
            link: link?.trim() || '#',
          };
        });

        // Cache the news updates for 1 hour
        localStorage.setItem('newsUpdates', JSON.stringify(news));
        localStorage.setItem('newsUpdatesExpiry', String(Date.now() + 3600000));
        
        setNewsUpdates(news);
      } catch (err) {
        console.error('Error loading news:', err);
        setError('Failed to load news updates');
      } finally {
        setLoadingNews(false);
      }
    };

    fetchBlogData();
    fetchNewsUpdates();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, currentPage]);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
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
        
        {error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 text-red-700 rounded">
            {error}
          </div>
        ) : loadingBlogs ? (
          <BlogSkeleton />
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPosts.map((post, idx) => (
                <BlogPostCard key={idx} post={post} />
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