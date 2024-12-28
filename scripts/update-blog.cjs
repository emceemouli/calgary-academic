// scripts/update-blog.js
const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

async function fetchBlogPosts() {
    try {
        const response = await fetch(
            `https://www.blogger.com/feeds/7698008433679424378/posts/default?alt=json&max-results=10`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const blogPosts = data.feed.entry.map((entry) => ({
            title: entry.title.$t,
            link: entry.link?.find((l) => l.rel === 'alternate')?.href || '#',
            published: new Date(entry.published.$t).toISOString(),
            summary: entry.content?.$t.replace(/<[^>]+>/g, '').slice(0, 100) + '...',
            thumbnail: entry.content?.$t.match(/<img[^>]+src="([^">]+)"/)?.at(1)?.replace(/^http:/, 'https:') 
                      || '/images/default-blog-thumbnail.jpg'
        }));

        // Ensure the public directory exists
        const publicDir = path.join(process.cwd(), 'public');
        try {
            await fs.access(publicDir);
        } catch {
            await fs.mkdir(publicDir, { recursive: true });
        }

        // Write the blog data
        await fs.writeFile(
            path.join(publicDir, 'blog-data.json'),
            JSON.stringify({
                posts: blogPosts,
                lastUpdated: new Date().toISOString()
            }, null, 2)
        );

        console.log('Blog data updated successfully');
    } catch (error) {
        console.error('Error updating blog data:', error);
        process.exit(1);
    }
}

fetchBlogPosts();