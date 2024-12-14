import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Loader } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    document.title = 'Education Blog & Updates | Calgary Academic Excellence';

    // Fetch Blogger blog posts
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
          // Extract the alternate link safely
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
        console.log('Fetched Blog Posts:', blogPosts); // Debugging
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    // Fetch news updates from Google Sheets CSV
    const fetchNewsUpdates = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vRD83yCtLxltpsjkqZFjwk_4z1zJ9NSj8N9fAGMPPtgKopCS0lqsSEAdokPTsLbxq00B3yLRX1uKr5C/pub?gid=0&single=true&output=csv'
        );
        const data = await response.text();

        const rows = data.split('\n').slice(1); // Skip header row
        const news = rows.map((row) => {
          const [date, title, link] = row.split(',');
          return { date, title, link: link?.trim() || '#' };
        });

        setNewsUpdates(news);
        console.log('Fetched News Updates:', news); // Debugging
      } catch (error) {
        console.error('Error fetching news updates:', error);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchBlogPosts();
    fetchNewsUpdates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[250px] w-full overflow-hidden mt-16">
        <img
          src="/images/Teen-Area-12-23-Hero.jpg"
          alt="Educational Blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/75" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            Educational Blog & Updates
          </h1>
          <p className="text-lg text-white text-center max-w-2xl">
            Explore insights, news, and study strategies for academic success.
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">Latest Blog Posts</h2>
        {loadingBlogs ? (
          <div className="flex justify-center items-center">
            <Loader className="animate-spin h-8 w-8 text-blue-600" />
            <span className="ml-2 text-gray-600">Loading Blog Posts...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-sm text-gray-600 mb-2">{post.published}</div>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.summary}</p>
                  <Button
                    as="a"
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* News Updates */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">News Updates</h2>
        {loadingNews ? (
          <div className="flex justify-center items-center">
            <Loader className="animate-spin h-8 w-8 text-blue-600" />
            <span className="ml-2 text-gray-600">Loading News Updates...</span>
          </div>
        ) : (
          <ul className="space-y-4">
            {newsUpdates.map((update, index) => (
              <li
                key={index}
                className="border-l-4 border-blue-500 bg-blue-50 p-4 shadow rounded-lg"
              >
                <span className="block text-gray-700 font-semibold">{update.date}</span>
                <a
                  href={update.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {update.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Blog;
