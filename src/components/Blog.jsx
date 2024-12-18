import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Loader, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet';

const POSTS_PER_PAGE = 3; // 5 posts per page
const MAX_POSTS = 9; // Maximum 10 posts
const BLOG_URL = 'https://calgaryacademicexcellence.blogspot.com';
const DEFAULT_THUMBNAIL = '/images/default-blog-thumbnail.jpg';

const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 text-red-700 rounded">
    {message}
  </div>
);

const PaginationControls = ({ currentPage, totalPages, handlePageChange }) => (
  <div className="flex justify-center items-center space-x-4 mt-6">
    <Button
      variant="outline"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="text-sm px-4 py-2"
    >
      <ChevronLeft className="h-4 w-4 mr-2" />
      Previous
    </Button>
    <span className="text-gray-600 text-sm">Page {currentPage} of {totalPages}</span>
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
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoadingBlogs(true);
      try {
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            'https://www.blogger.com/feeds/7698008433679424378/posts/default?alt=json&max-results=10'
          )}`
        );
        if (!response.ok) throw new Error('Failed to fetch blog posts.');

        const result = await response.json();
        const data = JSON.parse(result.contents);

        const blogPosts = data.feed.entry.map((entry) => {
          const link = entry.link?.find((l) => l.rel === 'alternate')?.href || '#';
          const content = entry.content?.$t || '';
          let thumbnail = DEFAULT_THUMBNAIL;

          const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch?.[1]) thumbnail = imgMatch[1].replace(/^http:/, 'https:');

          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = content;
          const summary = tempDiv.textContent.slice(0, 100) + '...';

          return {
            title: entry.title.$t,
            link,
            published: new Date(entry.published.$t).toLocaleDateString(),
            summary,
            thumbnail,
          };
        });

        setPosts(blogPosts.slice(0, MAX_POSTS));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingBlogs(false);
      }
    };

    const fetchNewsUpdates = async () => {
      setLoadingNews(true);
      try {
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

        setNewsUpdates(news);
      } catch (err) {
        setError('Failed to fetch news updates.');
      } finally {
        setLoadingNews(false);
      }
    };

    fetchBlogPosts();
    fetchNewsUpdates();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, currentPage]);

  return (
    <div className="container mx-auto py-8 px-4">
      <Helmet>
        <title>Educational Blog & News Updates</title>
      </Helmet>

      {/* Blog Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Latest Blog Posts</h2>
        {error && <ErrorMessage message={error} />}
        {loadingBlogs ? (
          <div className="flex justify-center py-8">
            <Loader className="animate-spin h-8 w-8 text-blue-600" />
          </div>
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
            <div className="text-center mt-6">
              <Button
                onClick={() => window.open(BLOG_URL, '_blank')}
                className="bg-blue-700 text-white hover:bg-blue-800 text-sm px-4 py-2"
              >
                View More on Blogger <ExternalLink className="ml-2" />
              </Button>
            </div>
          </>
        )}
      </section>

      {/* News Updates Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-900">News Updates</h2>
        {loadingNews ? (
          <div className="text-center py-4">Loading News...</div>
        ) : (
          <ul className="space-y-4">
            {newsUpdates.map((update, idx) => (
              <li key={idx} className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-lg">
                <span className="block text-gray-600 font-bold">{update.date}</span>
                <a href={update.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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
