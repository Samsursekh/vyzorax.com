import { BlogPost, TocItem } from '../types';

/**
 * Calculates estimated reading time in minutes (assuming ~200 WPM)
 */
export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

/**
 * Parses markdown headings (#, ##, ###) and extracts Table of Contents items
 */
export function extractTableOfContents(markdown: string): TocItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const rawText = match[2].replace(/[*_~`]/g, '').trim();
    // Generate clean slug ID for hash linking
    const id = rawText
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({
      id,
      text: rawText,
      level,
    });
  }

  return toc;
}

/**
 * Generates RSS 2.0 XML string for the blog system
 */
export function generateRssXml(posts: BlogPost[], siteUrl: string = 'https://vyzorax.com'): string {
  const itemsXml = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.publishedAt).toUTCString();
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${post.author.name}]]></author>
      <category><![CDATA[${post.category}]]></category>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vyzorax Blog — Instagram Downloader Guides &amp; Tips</title>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Learn how to download Instagram Reels, extract MP3 audio, save Stories in 1080p, and master Instagram content creation with Vyzorax.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`.trim();
}
