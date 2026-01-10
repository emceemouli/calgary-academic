import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

// Simple frontmatter parser
const parseFrontmatter = (text) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = text.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: text };
  }
  
  const frontmatterText = match[1];
  const content = match[2];
  const data = {};
  const lines = frontmatterText.split('\n');
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });
  
  return { data, content };
};

const BlogPostRenderer = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    fetch(`/blog-posts/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.text();
      })
      .then(text => {
        const { data, content } = parseFrontmatter(text);
        setPost({ ...data, content });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#f3f4f6', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#fee', borderLeft: '4px solid #f00', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Post Not Found</h2>
          <p style={{ marginBottom: '15px' }}>Sorry, we couldn't find this blog post.</p>
          <Link to="/blog" style={{ color: '#2563eb', fontWeight: '600' }}>← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <article style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Back Link */}
      <Link 
        to="/blog" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          color: '#2563eb', 
          fontWeight: '600',
          marginBottom: '30px',
          textDecoration: 'none'
        }}
      >
        <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
        Back to Blog
      </Link>

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '42px', 
          fontWeight: 'bold', 
          color: '#111', 
          lineHeight: '1.2',
          marginBottom: '20px'
        }}>
          {post.title}
        </h1>
        
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#666', marginBottom: '20px', flexWrap: 'wrap' }}>
          {post.date && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar style={{ width: '16px', height: '16px' }} />
              <span>{post.date}</span>
            </div>
          )}
          {post.author && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User style={{ width: '16px', height: '16px' }} />
              <span>{post.author}</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock style={{ width: '16px', height: '16px' }} />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* Image */}
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title}
          style={{ 
            width: '100%', 
            height: '400px', 
            objectFit: 'cover', 
            borderRadius: '12px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}
        />
      )}

      {/* Content with inline styles for guaranteed formatting */}
      <div className="blog-content">
        <style>{`
          .blog-content {
            font-size: 18px;
            line-height: 1.8;
            color: #374151;
          }
          
          .blog-content h2 {
            font-size: 32px;
            font-weight: bold;
            color: #111;
            margin-top: 48px;
            margin-bottom: 24px;
            padding-bottom: 12px;
            border-bottom: 3px solid #2563eb;
          }
          
          .blog-content h3 {
            font-size: 24px;
            font-weight: bold;
            color: #1e40af;
            margin-top: 36px;
            margin-bottom: 16px;
          }
          
          .blog-content h4 {
            font-size: 20px;
            font-weight: 600;
            color: #111;
            margin-top: 28px;
            margin-bottom: 12px;
          }
          
          .blog-content p {
            margin-bottom: 20px;
            line-height: 1.8;
          }
          
          .blog-content strong {
            font-weight: 700;
            color: #111;
          }
          
          .blog-content a {
            color: #2563eb;
            font-weight: 600;
            text-decoration: none;
          }
          
          .blog-content a:hover {
            text-decoration: underline;
          }
          
          .blog-content ul, .blog-content ol {
            margin: 24px 0;
            padding-left: 30px;
          }
          
          .blog-content li {
            margin-bottom: 12px;
            line-height: 1.8;
          }
          
          .blog-content ul li {
            list-style-type: disc;
            color: #2563eb;
          }
          
          .blog-content ul li::marker {
            color: #2563eb;
            font-size: 20px;
          }
          
          .blog-content ol li {
            list-style-type: decimal;
          }
          
          .blog-content blockquote {
            border-left: 4px solid #2563eb;
            background: #eff6ff;
            padding: 20px 24px;
            margin: 28px 0;
            border-radius: 0 8px 8px 0;
            font-style: normal;
          }
          
          .blog-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 32px 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          
          .blog-content thead {
            background: #2563eb;
            color: white;
          }
          
          .blog-content th {
            padding: 16px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .blog-content td {
            padding: 16px;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .blog-content tbody tr:hover {
            background: #f9fafb;
          }
          
          .blog-content tbody tr:last-child td {
            border-bottom: none;
          }
          
          .blog-content code {
            background: #f3f4f6;
            color: #2563eb;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 15px;
            font-family: 'Courier New', monospace;
          }
          
          .blog-content pre {
            background: #1f2937;
            color: #f3f4f6;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 24px 0;
          }
          
          .blog-content pre code {
            background: none;
            color: inherit;
            padding: 0;
          }
          
          .blog-content hr {
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 48px 0;
          }
          
          .blog-content img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin: 32px 0;
          }
        `}</style>
        
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* CTA Section */}
      <div style={{ 
        background: 'linear-gradient(to right, #2563eb, #1e40af)',
        color: 'white',
        padding: '40px',
        borderRadius: '12px',
        marginTop: '60px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
      }}>
        <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
          Ready to Calculate Your Admission Chances?
        </h3>
        <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
          Use our Elite ChanceMe calculator to see your chances at Harvard, MIT, Stanford and 300+ elite universities.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to="/elite-chance-me"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#2563eb',
              padding: '16px 32px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '18px',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            Elite ChanceMe Calculator →
          </Link>
          <Link 
            to="/gpa-calculator"
            style={{
              display: 'inline-block',
              background: '#1e40af',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '18px',
              textDecoration: 'none',
              border: '2px solid white'
            }}
          >
            GPA Calculator →
          </Link>
        </div>
      </div>

      {/* Author Bio */}
      <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '2px solid #e5e7eb' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #2563eb, #1e40af)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '28px',
            fontWeight: 'bold',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}>
            CAE
          </div>
          <div>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
              Calgary Academic Excellence
            </p>
            <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '12px' }}>
              Expert tutoring and college admissions counseling serving students in Calgary and internationally. 
              Helping students achieve their dreams of attending elite universities since 2020.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link to="/about" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
                About Us →
              </Link>
              <Link to="/contact-us" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '2px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
          Related Articles
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <Link 
            to="/blog/cbse-to-gpa-conversion" 
            style={{
              display: 'block',
              padding: '24px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              textDecoration: 'none',
              background: 'white',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#2563eb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <h4 style={{ fontWeight: 'bold', color: '#111', marginBottom: '8px', fontSize: '18px' }}>
              CBSE to GPA Conversion
            </h4>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
              Complete guide for Indian students to convert CBSE percentage to US GPA...
            </p>
          </Link>
          
          <Link 
            to="/elite-chance-me" 
            style={{
              display: 'block',
              padding: '24px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              textDecoration: 'none',
              background: 'white'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#2563eb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <h4 style={{ fontWeight: 'bold', color: '#111', marginBottom: '8px', fontSize: '18px' }}>
              Elite ChanceMe Calculator
            </h4>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
              Calculate your admission chances at 300+ elite universities...
            </p>
          </Link>
          
          <Link 
            to="/gpa-calculator" 
            style={{
              display: 'block',
              padding: '24px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              textDecoration: 'none',
              background: 'white'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#2563eb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <h4 style={{ fontWeight: 'bold', color: '#111', marginBottom: '8px', fontSize: '18px' }}>
              GPA Calculator
            </h4>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
              Convert international grades to US 4.0 GPA scale...
            </p>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostRenderer;
