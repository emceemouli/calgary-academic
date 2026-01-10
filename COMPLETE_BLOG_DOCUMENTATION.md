# 📝 Complete Guide: Creating & Deploying Blog Posts

## Table of Contents
1. [Writing a New Blog Post](#step-1-write-your-blog-post)
2. [Adding to Blog Listing](#step-2-add-to-blog-listing)
3. [Testing Locally](#step-3-test-locally)
4. [Deploying to Production](#step-4-deploy-to-production)
5. [SEO Submission](#step-5-submit-to-google)
6. [Best Practices](#best-practices)
7. [Quick Reference](#quick-reference)

---

## STEP 1: Write Your Blog Post

### 1.1 Create New Markdown File

**Location:** `C:\calgary-academic\public\blog-posts\`

**Filename format:** `your-article-slug.md`
- Use lowercase letters
- Use hyphens (not spaces or underscores)
- Keep it short and descriptive

**Examples:**
- ✅ `harvard-admission-guide.md`
- ✅ `mit-vs-stanford.md`
- ✅ `sat-prep-tips-2025.md`
- ❌ `My New Blog Post.md` (has spaces)
- ❌ `blog_post_1.md` (uses underscores)

### 1.2 Add Frontmatter (Metadata)

At the **very top** of your `.md` file, add this:

```markdown
---
title: "Your Article Title Here"
description: "Brief description for SEO (max 155 characters)"
date: "January 11, 2025"
author: "Calgary Academic Excellence"
image: "/images/your-image.jpg"
keywords: "keyword1, keyword2, keyword3, keyword4"
---
```

**Important:**
- Title must be in quotes
- Description should be 150-155 characters (Google truncates after 155)
- Date format: "Month Day, Year"
- Keywords: 5-10 relevant keywords separated by commas

**Example:**
```markdown
---
title: "Harvard Admission Requirements: Complete Guide for International Students (2025)"
description: "Everything international students need to know about Harvard admissions. GPA requirements, SAT scores, essays, extracurriculars, and financial aid for 2025."
date: "January 11, 2025"
author: "Calgary Academic Excellence"
image: "/images/Teen-Area-12-23-Hero.jpg"
keywords: "Harvard admissions, Harvard requirements, international students Harvard, Harvard SAT scores, Harvard GPA, Harvard application"
---
```

### 1.3 Write Your Content

After the frontmatter, write your content in markdown:

```markdown
---
[frontmatter here]
---

## Introduction

Your opening paragraph goes here. Keep it engaging and tell readers what they'll learn.

## Main Section 1

### Subsection A

Content with **bold text** and *italic text*.

**Key points:**
- Bullet point 1
- Bullet point 2
- Bullet point 3

### Subsection B

More content here.

## Main Section 2

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data     | Data     | Data     |
| Row 2    | Info     | Details  |

## Frequently Asked Questions

### Question 1?
Answer to question 1.

### Question 2?
Answer to question 2.

## Conclusion

Wrap up your article and include calls-to-action.

> **Try Our Calculator:** Use our [Elite ChanceMe Calculator](/elite-chance-me) to check your chances!
```

---

## STEP 2: Add to Blog Listing

### 2.1 Open Blog.jsx

**Location:** `C:\calgary-academic\src\components\Blog.jsx`

### 2.2 Add Your Post to the Array

Find the `blogPosts` array (around line 8) and add your new post:

```javascript
const blogPosts = [
  // Existing posts...
  {
    title: "How to Convert CBSE Percentage to GPA for US Universities (2025 Guide)",
    slug: "cbse-to-gpa-conversion",
    date: "January 9, 2025",
    excerpt: "Complete guide for Indian students...",
    image: "/images/Teen-Area-12-23-Hero.jpg",
    readTime: "12 min read",
    category: "International Students"
  },
  
  // ADD YOUR NEW POST HERE:
  {
    title: "Harvard Admission Requirements: Complete Guide for International Students (2025)",
    slug: "harvard-admission-guide",  // Must match your .md filename (without .md)
    date: "January 11, 2025",
    excerpt: "Everything international students need to know about Harvard admissions. GPA requirements, SAT scores, essays, and financial aid.",
    image: "/images/Teen-Area-12-23-Hero.jpg",
    readTime: "18 min read",
    category: "Elite Universities"
  },
];
```

**CRITICAL:** The `slug` must match your markdown filename exactly (without the `.md` extension).

**If your file is:** `harvard-admission-guide.md`  
**Then slug must be:** `"harvard-admission-guide"`

### 2.3 Calculate Read Time

Estimate reading time: **word count ÷ 200 = minutes**

Example:
- 2,000 words = 10 min read
- 3,000 words = 15 min read
- 4,000 words = 20 min read

---

## STEP 3: Test Locally

### 3.1 Start Development Server

Open terminal in project folder:

```bash
cd C:\calgary-academic
npm run dev
```

### 3.2 Test Blog Listing Page

Visit: `http://localhost:5173/blog`

**Check:**
- ✅ Your new post appears in the grid
- ✅ Title displays correctly
- ✅ Image shows
- ✅ Date and read time are correct

### 3.3 Test Individual Post Page

Click on your new post or visit directly:
`http://localhost:5173/blog/harvard-admission-guide`

**Check:**
- ✅ Title renders correctly
- ✅ Date, author, read time show
- ✅ Image displays
- ✅ Content formats properly
- ✅ Headers have blue underlines
- ✅ Lists show bullet points
- ✅ Tables look professional
- ✅ Links work (test all calculator links)
- ✅ CTA buttons work

### 3.4 Test on Mobile

In browser:
1. Press **F12** (open DevTools)
2. Click **Toggle Device Toolbar** (phone icon)
3. Select "iPhone 12 Pro" or "Pixel 5"
4. Test the entire page

**Check:**
- ✅ Responsive layout
- ✅ Images fit screen
- ✅ Text is readable
- ✅ Buttons are clickable
- ✅ No horizontal scroll

### 3.5 Fix Any Issues

Common issues:
- **Image not showing**: Check path is `/images/filename.jpg`
- **Formatting broken**: Check markdown syntax
- **Link doesn't work**: Verify link format `[text](/path)`
- **Table not rendering**: Check pipe alignment `|`

---

## STEP 4: Deploy to Production

### 4.1 Build for Production

In terminal:

```bash
npm run build
```

This creates optimized files in the `/dist` folder.

**Check for errors:**
- If build succeeds: ✅ Continue
- If build fails: ❌ Fix errors shown in terminal

### 4.2 Test Production Build Locally

```bash
npm run preview
```

Visit: `http://localhost:4173/blog/harvard-admission-guide`

Test everything again in production mode.

### 4.3 Deploy to Your Hosting

**If using Vercel:**
```bash
# Install Vercel CLI (first time only)
npm install -g vercel

# Deploy
vercel --prod
```

**If using Netlify:**
```bash
# Install Netlify CLI (first time only)
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**If using manual upload:**
1. Upload entire `/dist` folder to your server
2. Replace existing files
3. Clear CDN cache if applicable

### 4.4 Verify Live Site

Visit: `https://calgaryacademicexcellence.com/blog/harvard-admission-guide`

**Final checks:**
- ✅ Page loads
- ✅ All content displays
- ✅ Images load
- ✅ Links work
- ✅ Mobile responsive

---

## STEP 5: Submit to Google

### 5.1 Update Sitemap

**Location:** `/public/sitemap.xml` or `/api/sitemap.xml.js`

Add your new post:

```xml
<url>
  <loc>https://calgaryacademicexcellence.com/blog/harvard-admission-guide</loc>
  <lastmod>2025-01-11</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.85</priority>
</url>
```

**Then redeploy** (repeat Step 4.1-4.3)

### 5.2 Submit to Google Search Console

1. Go to: https://search.google.com/search-console
2. Select your property: `calgaryacademicexcellence.com`
3. Click **URL Inspection** (top bar)
4. Enter: `https://calgaryacademicexcellence.com/blog/harvard-admission-guide`
5. Click **Test Live URL**
6. Click **Request Indexing**

**Timeline:**
- Google crawls: 24-48 hours
- Appears in search: 1-2 weeks
- Rankings improve: 4-8 weeks

### 5.3 Submit Sitemap (First Time Only)

If you haven't submitted your sitemap yet:

1. In Google Search Console
2. Click **Sitemaps** (left sidebar)
3. Enter: `sitemap.xml`
4. Click **Submit**

---

## STEP 6: Promote Your Post

### 6.1 Social Media

**Share on:**
- LinkedIn (professional audience)
- Twitter/X (education community)
- Facebook groups (college admissions)
- Instagram story (with link in bio)
- Reddit (r/ApplyingToCollege, r/IntltoUSA)

### 6.2 Internal Linking

Update older blog posts to link to your new post:
```markdown
For more details, check our [Harvard Admission Guide](/blog/harvard-admission-guide).
```

### 6.3 Email Newsletter

If you have an email list, send an announcement:
- Subject: "New Guide: Harvard Admission Requirements for International Students"
- Include excerpt and link

---

## Best Practices

### Content Quality

✅ **DO:**
- Write 2,000+ words (Google favors long-form)
- Use clear, simple language
- Break into short paragraphs (3-4 sentences)
- Add lots of headers (H2, H3)
- Include examples and stories
- Add FAQ section
- Link to your calculators 3-5 times
- Use tables for data/comparisons
- Include blockquotes for CTAs

❌ **DON'T:**
- Plagiarize or copy from other sites
- Stuff keywords unnaturally
- Write walls of text
- Use complicated jargon
- Forget to proofread
- Ignore mobile formatting

### SEO Optimization

**Target One Main Keyword:**
Example: "Harvard admission requirements"

**Use keyword in:**
1. Title (frontmatter)
2. First paragraph
3. At least 3 H2/H3 headers
4. Throughout content (naturally)
5. Image alt text
6. Meta description

**Keyword Density:** 1-2% (if 2,000 words, use keyword 20-40 times)

### Internal Linking

**Link to your tools 3-5 times per article:**
```markdown
Use our [Elite ChanceMe Calculator](/elite-chance-me) to check your chances.

Convert your grades with our [GPA Calculator](/gpa-calculator).

For graduate programs, try our [Graduate Admissions Calculator](/graduate-admissions-calculator).
```

**Link to other blog posts:**
```markdown
Also read: [CBSE to GPA Conversion Guide](/blog/cbse-to-gpa-conversion)
```

### Image Optimization

**Before uploading images:**
1. Resize to max 1920px wide
2. Compress (use TinyPNG.com)
3. Save as JPG (not PNG for photos)
4. Name descriptively: `harvard-campus-photo.jpg`

---

## Quick Reference

### Markdown Cheat Sheet

```markdown
# H1 (Don't use - only one H1 per page from title)
## H2 Main Section
### H3 Subsection
#### H4 Minor Point

**Bold text**
*Italic text*
***Bold and Italic***

[Link text](/path)
[External link](https://example.com)

![Image description](/images/photo.jpg)

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

> Blockquote (for CTAs)

| Column 1 | Column 2 |
|----------|----------|
| Data     | Data     |

---
Horizontal line

`Inline code`

```
Code block
```
```

### File Naming Convention

**Blog posts:** `topic-keyword-year.md`
- ✅ `harvard-admission-guide-2025.md`
- ✅ `sat-prep-tips.md`
- ✅ `mit-vs-stanford-comparison.md`

### Publishing Checklist

Before deploying, check:
- [ ] Frontmatter complete (title, description, date, keywords)
- [ ] Slug matches filename
- [ ] Added to Blog.jsx array
- [ ] Content is 2,000+ words
- [ ] 5+ H2 headers with keywords
- [ ] 3-5 internal links to calculators
- [ ] FAQ section included
- [ ] Images compressed and working
- [ ] No spelling/grammar errors
- [ ] Tested locally
- [ ] Mobile-friendly
- [ ] Build succeeds
- [ ] Deployed to production
- [ ] Submitted to Google Search Console
- [ ] Sitemap updated
- [ ] Shared on social media

---

## Troubleshooting

### Post Not Showing on Blog Page

**Check:**
1. Did you add it to `blogPosts` array in Blog.jsx?
2. Is the slug correct?
3. Did you save Blog.jsx?
4. Did you restart dev server?

### Post Shows "Not Found" Error

**Check:**
1. Is markdown file in `/public/blog-posts/` folder?
2. Does filename match slug exactly?
3. Is file extension `.md` (not `.txt` or `.md.txt`)?
4. Did you restart dev server?

### Formatting Broken

**Check:**
1. Is frontmatter properly formatted with `---` at start and end?
2. Are all quotes matching (" or ')?
3. Is there a blank line after frontmatter?
4. Are table pipes aligned?

### Images Not Loading

**Check:**
1. Is image in `/public/images/` folder?
2. Is path `/images/filename.jpg` (starts with `/`)?
3. Is filename correct (case-sensitive)?
4. Is image format supported (jpg, png, webp)?

---

## Example: Complete Blog Post

**File:** `public/blog-posts/sat-tips-2025.md`

```markdown
---
title: "10 SAT Preparation Tips That Actually Work (2025 Guide)"
description: "Proven SAT study strategies used by students who scored 1500+. Practice tests, time management, and section-specific tips for Reading, Writing, and Math."
date: "January 12, 2025"
author: "Calgary Academic Excellence"
image: "/images/Teen-Area-12-23-Hero.jpg"
keywords: "SAT preparation, SAT tips, SAT study guide, how to study for SAT, SAT 1500, SAT prep 2025"
---

The SAT is one of the most important tests for college admissions. A high score can open doors to elite universities and scholarship opportunities. In this guide, I'll share 10 proven strategies that helped my students achieve scores of 1500 and above.

## Why SAT Scores Matter

Elite universities like Harvard, MIT, and Stanford expect SAT scores in the 1500-1600 range. Here's what you need to know:

- **Harvard**: Average SAT 1520
- **MIT**: Average SAT 1540
- **Stanford**: Average SAT 1495

> **Calculate Your Chances:** Use our [Elite ChanceMe Calculator](/elite-chance-me) to see how your SAT score affects admission probability.

## Tip 1: Start Early

Begin preparing at least 3-6 months before your test date. This gives you time to:
- Take multiple practice tests
- Identify weak areas
- Improve gradually
- Reduce test anxiety

[Continue with 9 more tips...]

## Frequently Asked Questions

### How long should I study for the SAT?
Most students need 3-6 months of consistent preparation...

### Can I get into Harvard with a 1400 SAT?
While possible, a 1400 is below Harvard's average...

[More FAQs...]

## Conclusion

Following these 10 tips can significantly improve your SAT score. Remember:
- Start early
- Practice consistently
- Focus on weak areas
- Learn from mistakes

Ready to plan your college applications? Try our [GPA Calculator](/gpa-calculator) to convert your grades to US standards.

Good luck on your SAT!
```

---

## Summary: Quick Steps

1. ✅ Create `/public/blog-posts/your-slug.md`
2. ✅ Add frontmatter with metadata
3. ✅ Write 2,000+ words of quality content
4. ✅ Add to `blogPosts` array in Blog.jsx
5. ✅ Test locally: `npm run dev`
6. ✅ Build: `npm run build`
7. ✅ Deploy to production
8. ✅ Update sitemap.xml
9. ✅ Submit to Google Search Console
10. ✅ Share on social media

**Time per post:** 4-6 hours (writing) + 30 min (deployment)

**Goal:** Publish 2-3 posts per week for fastest SEO growth!

---

## Need Help?

If you get stuck:
1. Check this documentation
2. Review existing blog posts as examples
3. Test in incognito window (clears cache)
4. Check browser console for errors (F12)
5. Verify all files saved
6. Restart dev server

Your blog system is fully set up and ready to scale! 🚀
