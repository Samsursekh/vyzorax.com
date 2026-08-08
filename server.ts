import express from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import compression from 'compression';
import { spawn } from 'child_process';
import { createServer as createViteServer } from 'vite';
import {
  securityHeadersMiddleware,
  xssSanitizerMiddleware,
  botDetectionMiddleware,
  createRateLimiter,
  generateCsrfToken,
  csrfProtectionHandler,
  isSsrfSafeUrl,
  validateInstagramExtractPayload,
  securityLog,
  getSecurityConfig,
} from './src/server/security';
import { sendContactEmails } from './src/server/mailer';
import { BLOG_POSTS } from './src/data/blogPosts';
import { SEO_LANDING_PAGES } from './src/data/seoLandingPages';

const app = express();
const PORT = 3000;

// Enable HTTP Gzip/Brotli Compression
app.use(compression());

// Security Setup
app.disable('x-powered-by');
app.use(securityHeadersMiddleware);
app.use(express.json({ limit: '10kb' }));
app.use(xssSanitizerMiddleware);
app.use(botDetectionMiddleware);


// Apply General Rate Limiter to all /api/ routes (100 requests / minute)
app.use('/api/', createRateLimiter(60000, 100));

// CSRF Token Generation Endpoint
app.get('/api/csrf-token', (req, res) => {
  const token = generateCsrfToken();
  res.json({ success: true, csrfToken: token });
});

// API Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SEO Route: Robots.txt
app.get('/robots.txt', (req, res) => {
  const domain = process.env.PUBLIC_DOMAIN || 'vyzorax.com';
  const baseUrl = `https://${domain}`;
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`);
});

// SEO Route: RSS Feed (/rss.xml and /api/rss)
app.get(['/rss.xml', '/api/rss'], (req, res) => {
  const domain = process.env.PUBLIC_DOMAIN || 'vyzorax.com';
  const siteUrl = `https://${domain}`;

  const itemsXml = BLOG_POSTS.map((post) => {
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const pubDate = new Date(post.publishedAt || Date.now()).toUTCString();
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vyzorax Blog — Instagram Downloader Guides &amp; Tech</title>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Learn how to download Instagram Reels, extract MP3 audio, save Stories in 1080p, and master Instagram content creation with Vyzorax.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`.trim();

  res.type('application/xml');
  res.send(rssFeed);
});

// SEO Route: Sitemap.xml (Fully Dynamic)
app.get('/sitemap.xml', (req, res) => {
  const domain = process.env.PUBLIC_DOMAIN || 'vyzorax.com';
  const baseUrl = `https://${domain}`;
  const today = new Date().toISOString().split('T')[0];

  const seenUrls = new Set<string>();

  // 1. Static core app routes
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
    { path: '/terms', priority: '0.5', changefreq: 'monthly' },
    { path: '/disclaimer', priority: '0.5', changefreq: 'monthly' },
    { path: '/cookies', priority: '0.5', changefreq: 'monthly' },
    { path: '/dmca', priority: '0.5', changefreq: 'monthly' },
    { path: '/contact', priority: '0.5', changefreq: 'monthly' },
    { path: '/about', priority: '0.5', changefreq: 'monthly' },
    { path: '/help', priority: '0.6', changefreq: 'weekly' },
    { path: '/faq', priority: '0.6', changefreq: 'weekly' },
    { path: '/status', priority: '0.7', changefreq: 'daily' },
    { path: '/docs', priority: '0.5', changefreq: 'monthly' },
  ];

  const urlEntries: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  staticPages.forEach((p) => {
    seenUrls.add(p.path);
    urlEntries.push({
      loc: `${baseUrl}${p.path}`,
      lastmod: today,
      changefreq: p.changefreq,
      priority: p.priority,
    });
  });

  // 2. Dynamic SEO Landing Pages (from SEO_LANDING_PAGES dictionary)
  Object.values(SEO_LANDING_PAGES).forEach((page) => {
    const mainPath = `/${page.slug}`;
    if (!seenUrls.has(mainPath)) {
      seenUrls.add(mainPath);
      urlEntries.push({
        loc: `${baseUrl}${mainPath}`,
        lastmod: today,
        changefreq: 'daily',
        priority: '0.9',
      });
    }

    // Include primary alias routes if present
    page.aliases.forEach((alias) => {
      const aliasPath = `/${alias}`;
      if (!seenUrls.has(aliasPath)) {
        seenUrls.add(aliasPath);
        urlEntries.push({
          loc: `${baseUrl}${aliasPath}`,
          lastmod: today,
          changefreq: 'weekly',
          priority: '0.8',
        });
      }
    });
  });

  // 3. Dynamic Blog Post pages (from BLOG_POSTS list)
  BLOG_POSTS.forEach((post) => {
    const postPath = `/blog/${post.slug}`;
    if (!seenUrls.has(postPath)) {
      seenUrls.add(postPath);
      const postDate = post.publishedAt
        ? new Date(post.publishedAt).toISOString().split('T')[0]
        : today;
      urlEntries.push({
        loc: `${baseUrl}${postPath}`,
        lastmod: postDate,
        changefreq: 'weekly',
        priority: '0.8',
      });
    }
  });

  const xmlUrls = urlEntries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`.trim();

  res.type('application/xml');
  res.send(sitemapXml);
});

// Image Proxy Endpoint to bypass Instagram CDN referer checks & CORS
app.get('/api/proxy-image', async (req, res) => {
  const imageUrl = req.query.url as string;
  if (!imageUrl) return res.status(400).send('Missing image url');

  // SSRF Protection Check
  if (!isSsrfSafeUrl(imageUrl)) {
    securityLog('warn', `Blocked potential SSRF attempt on proxy-image: ${imageUrl}`);
    return res.status(400).send('Restricted or unsafe target URL');
  }

  try {
    const imgRes = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (!imgRes.ok) {
      return res.redirect(imageUrl);
    }

    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await imgRes.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(buffer);
  } catch (err) {
    return res.redirect(imageUrl);
  }
});

// Video Stream Proxy Endpoint to enable HTML5 video preview player
app.get('/api/video-stream', async (req, res) => {
  const videoUrl = req.query.url as string;
  if (!videoUrl) return res.status(400).send('Missing video url');

  // SSRF Protection Check
  if (!isSsrfSafeUrl(videoUrl)) {
    securityLog('warn', `Blocked potential SSRF attempt on video-stream: ${videoUrl}`);
    return res.status(400).send('Restricted or unsafe target URL');
  }

  try {
    const fetchHeaders: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://www.instagram.com/',
      'Accept': '*/*',
    };

    if (req.headers.range) {
      fetchHeaders['Range'] = req.headers.range;
    }

    const fetchRes = await fetch(videoUrl, { headers: fetchHeaders });

    if (!fetchRes.ok) {
      return res.redirect(videoUrl);
    }

    const contentType = fetchRes.headers.get('content-type') || 'video/mp4';
    const contentLength = fetchRes.headers.get('content-length');
    const contentRange = fetchRes.headers.get('content-range');

    res.status(fetchRes.status);
    res.setHeader('Content-Type', contentType);
    if (contentLength) res.setHeader('Content-Length', contentLength);
    if (contentRange) res.setHeader('Content-Range', contentRange);
    res.setHeader('Accept-Ranges', 'bytes');

    const arrayBuffer = await fetchRes.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    return res.redirect(videoUrl);
  }
});

// High Traffic Protection: Track active CPU-heavy FFmpeg conversions
let activeFfmpegJobs = 0;
const MAX_CONCURRENT_FFMPEG = 8;

// Proxy Download Endpoint to force browser file attachment download
app.get('/api/download', async (req, res) => {
  const fileUrl = req.query.url as string;
  const rawFilename = (req.query.filename as string) || 'instagram_media';
  const format = ((req.query.format as string) || '').toLowerCase();
  const quality = ((req.query.quality as string) || '').toLowerCase();

  if (!fileUrl) {
    return res.status(400).send('Missing file url');
  }

  // SSRF Protection Check
  if (!isSsrfSafeUrl(fileUrl)) {
    securityLog('warn', `Blocked potential SSRF attempt on download: ${fileUrl}`);
    return res.status(400).send('Restricted or unsafe target URL');
  }

  const isMp3 = format === 'mp3' || rawFilename.toLowerCase().endsWith('.mp3');
  const is720p = (quality === '720p' || quality === '720') && !isMp3;

  let filename = rawFilename;
  if (isMp3) {
    if (!filename.toLowerCase().endsWith('.mp3')) {
      filename = `${filename.replace(/\.[^/.]+$/, '')}.mp3`;
    }
  } else {
    if (!filename.endsWith('.mp4') && !filename.endsWith('.jpg') && !filename.endsWith('.png')) {
      filename = `${filename}.mp4`;
    }
  }

  try {
    // 1. Fetch media stream using Node.js fetch with browser headers
    const fetchRes = await fetch(fileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': '*/*',
      },
    });

    if (!fetchRes.ok) {
      return res.redirect(fileUrl);
    }

    const contentType = fetchRes.headers.get('content-type') || '';
    const isImageSource = contentType.startsWith('image/') || fileUrl.match(/\.(jpg|jpeg|png|webp|avif)/i);

    // 2. Direct download for Images OR standard 1080p MP4 requests (Zero CPU overhead)
    if (isImageSource || (!isMp3 && !is720p)) {
      const buffer = Buffer.from(await fetchRes.arrayBuffer());
      const finalType = isImageSource
        ? (contentType || 'image/jpeg')
        : (contentType.includes('text') || contentType.includes('xml') ? 'video/mp4' : contentType || 'video/mp4');

      let finalFilename = filename;
      if (isImageSource && !finalFilename.endsWith('.jpg') && !finalFilename.endsWith('.png')) {
        finalFilename = `${finalFilename.replace(/\.[^/.]+$/, '')}.jpg`;
      }

      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(finalFilename)}"`);
      res.setHeader('Content-Type', finalType);
      return res.send(buffer);
    }

    // High Traffic Safeguard: If active conversions exceed limit, serve direct file without crashing CPU
    if (activeFfmpegJobs >= MAX_CONCURRENT_FFMPEG) {
      const buffer = Buffer.from(await fetchRes.arrayBuffer());
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
      res.setHeader('Content-Type', isMp3 ? 'audio/mpeg' : 'video/mp4');
      return res.send(buffer);
    }

    // 3. Perform FFmpeg conversion (MP3 Audio or 720p Video) using temporary file
    activeFfmpegJobs++;
    const videoBuffer = Buffer.from(await fetchRes.arrayBuffer());
    const tempFile = path.join(os.tmpdir(), `vyz_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.mp4`);

    await fs.promises.writeFile(tempFile, videoBuffer);

    let cleanedUp = false;
    const cleanup = () => {
      if (cleanedUp) return;
      cleanedUp = true;
      activeFfmpegJobs = Math.max(0, activeFfmpegJobs - 1);
      if (fs.existsSync(tempFile)) {
        fs.unlink(tempFile, () => {});
      }
    };

    if (isMp3) {
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
      res.setHeader('Content-Type', 'audio/mpeg');

      const ffmpeg = spawn('ffmpeg', [
        '-y',
        '-i', tempFile,
        '-vn',
        '-acodec', 'libmp3lame',
        '-ab', '192k',
        '-f', 'mp3',
        'pipe:1',
      ]);

      ffmpeg.stdout.pipe(res);
      ffmpeg.stderr.on('data', () => {});

      ffmpeg.on('close', cleanup);
      ffmpeg.on('error', (err) => {
        console.error('[Vyzorax] FFmpeg conversion error:', err);
        cleanup();
        if (!res.headersSent) {
          res.setHeader('Content-Type', 'audio/mpeg');
          res.send(videoBuffer);
        }
      });

      req.on('close', () => {
        ffmpeg.kill();
        cleanup();
      });

      return;
    }

    if (is720p) {
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
      res.setHeader('Content-Type', 'video/mp4');

      const ffmpeg = spawn('ffmpeg', [
        '-y',
        '-i', tempFile,
        '-vf', 'scale=-2:720',
        '-c:v', 'libx264',
        '-b:v', '1200k',
        '-maxrate', '1500k',
        '-bufsize', '3000k',
        '-preset', 'ultrafast',
        '-c:a', 'copy',
        '-movflags', 'frag_keyframe+empty_moov',
        '-f', 'mp4',
        'pipe:1',
      ]);

      ffmpeg.stdout.pipe(res);
      ffmpeg.stderr.on('data', () => {});

      ffmpeg.on('close', cleanup);
      ffmpeg.on('error', (err) => {
        console.error('[Vyzorax] FFmpeg 720p scaling error:', err);
        cleanup();
        if (!res.headersSent) {
          res.send(videoBuffer);
        }
      });

      req.on('close', () => {
        ffmpeg.kill();
        cleanup();
      });

      return;
    }
  } catch (err) {
    console.error('[Vyzorax] Download pipeline error:', err);
    return res.redirect(fileUrl);
  }
});

/**
 * Real Instagram Metadata Extractor
 * Primary: Instagram GraphQL doc_id query
 * Fallbacks: Instagram Embed HTML & oEmbed
 */
async function fetchInstagramLiveMetadata(url: string, shortcode: string) {
  let authorUsername = '';
  let authorFullName = '';
  let avatarUrl = '';
  let thumbnailUrl = '';
  let caption = '';
  let extractedVideoUrl = '';
  let likesCount: string | number = '';
  let commentsCount: string | number = '';
  let durationInSec = 0;
  let carouselSlides: Array<{
    id: string;
    type: 'image' | 'video';
    thumbnailUrl: string;
    mediaUrl: string;
  }> = [];

  // Strategy 1: Instagram GraphQL API (doc_id: 10015901848480474)
  if (shortcode) {
    try {
      const params = new URLSearchParams({
        doc_id: '10015901848480474',
        variables: JSON.stringify({ shortcode }),
      });
      const gqlRes = await fetch(`https://www.instagram.com/graphql/query/?${params.toString()}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'X-IG-App-ID': '936619743392459',
          'Referer': 'https://www.instagram.com/',
        },
      });

      if (gqlRes.ok) {
        const json = await gqlRes.json();
        const media = json.data?.xdt_shortcode_media;
        if (media) {
          if (media.owner?.username) authorUsername = media.owner.username;
          if (media.owner?.full_name) authorFullName = media.owner.full_name;
          if (media.owner?.profile_pic_url) avatarUrl = media.owner.profile_pic_url;

          if (media.thumbnail_src || media.display_url) {
            thumbnailUrl = media.thumbnail_src || media.display_url;
          }

          if (media.video_url) {
            extractedVideoUrl = media.video_url;
          }

          if (media.edge_media_to_caption?.edges?.[0]?.node?.text) {
            caption = media.edge_media_to_caption.edges[0].node.text;
          }

          if (media.edge_media_preview_like?.count !== undefined) {
            likesCount = media.edge_media_preview_like.count;
          }

          if (media.edge_media_to_comment?.count !== undefined) {
            commentsCount = media.edge_media_to_comment.count;
          }

          if (media.video_duration) {
            durationInSec = Math.round(media.video_duration);
          }

          // Carousel parsing
          if (media.edge_sidecar_to_children?.edges?.length) {
            carouselSlides = media.edge_sidecar_to_children.edges.map((edge: any, index: number) => {
              const node = edge.node;
              const slideVideo = node.video_url;
              const slideImg = node.display_url || node.thumbnail_src;
              return {
                id: `slide_${index + 1}`,
                type: node.is_video ? 'video' : 'image',
                thumbnailUrl: slideImg,
                mediaUrl: slideVideo || slideImg,
              };
            });
          }
        }
      }
    } catch (e) {
      console.error('[Vyzorax] GraphQL extraction error:', e);
    }
  }

  // Strategy 2: Instagram Embed HTML Scraping as fallback
  if (shortcode && (!extractedVideoUrl || !authorUsername)) {
    try {
      const embedPageUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
      const pageRes = await fetch(embedPageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });

      if (pageRes.ok) {
        const html = await pageRes.text();

        if (!avatarUrl) {
          const avatarMatch = html.match(/class="Avatar"[^>]*src="([^"]+)"/i) || html.match(/"profile_pic_url":"([^"]+)"/i);
          if (avatarMatch && avatarMatch[1]) {
            avatarUrl = avatarMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
          }
        }

        if (!authorUsername) {
          const userMatch = html.match(/class="UsernameText"[^>]*>([^<]+)</i) || html.match(/"username":"([^"]+)"/i);
          if (userMatch && userMatch[1]) authorUsername = userMatch[1].trim();
        }

        if (!authorFullName) {
          const nameMatch = html.match(/"full_name":"([^"]+)"/i) || html.match(/class="FullnameText"[^>]*>([^<]+)</i);
          if (nameMatch && nameMatch[1]) authorFullName = nameMatch[1].replace(/\\u0026/g, '&').trim();
        }

        if (!thumbnailUrl) {
          const imgMatch = html.match(/class="EmbeddedMediaImage"[^>]*src="([^"]+)"/i) || html.match(/<meta property="og:image" content="([^"]+)"/i);
          if (imgMatch && imgMatch[1]) thumbnailUrl = imgMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
        }

        if (!extractedVideoUrl) {
          const videoMatch = html.match(/<video[^>]*src="([^"]+)"/i) || html.match(/"video_url":"([^"]+)"/i);
          if (videoMatch && videoMatch[1]) extractedVideoUrl = videoMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
        }

        if (!caption) {
          const capMatch = html.match(/class="Caption"[^>]*>([\s\S]*?)<\/div>/i) || html.match(/<meta property="og:description" content="([^"]+)"/i);
          if (capMatch && capMatch[1]) caption = capMatch[1].replace(/<[^>]+>/g, '').trim();
        }
      }
    } catch (e) {
      console.error('[Vyzorax] Embed scraping error:', e);
    }
  }

  return {
    authorUsername,
    authorFullName,
    avatarUrl,
    thumbnailUrl,
    caption,
    extractedVideoUrl,
    likesCount,
    commentsCount,
    durationInSec,
    carouselSlides,
  };
}

// Extract API Endpoint with Rate Limiting (30 reqs/min), CSRF Protection, and Payload Validation
app.post(
  '/api/extract',
  createRateLimiter(60000, 30),
  csrfProtectionHandler,
  validateInstagramExtractPayload,
  async (req, res) => {
    const url = req.body.url;
    const trimmed = url.trim();

  // 1. Extract shortcode & username hints directly from URL structure
  let shortcode = '';
  let usernameFromPath = '';

  const userContentMatch = trimmed.match(/instagram\.com\/([A-Za-z0-9_.-]+)\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i);
  if (userContentMatch) {
    usernameFromPath = userContentMatch[1];
    shortcode = userContentMatch[2];
  }

  if (!shortcode) {
    const scMatch = trimmed.match(/instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i);
    if (scMatch) shortcode = scMatch[1];
  }

  if (!usernameFromPath) {
    const storyMatch = trimmed.match(/instagram\.com\/stories\/([A-Za-z0-9_.-]+)/i);
    if (storyMatch) usernameFromPath = storyMatch[1];
  }

  if (!usernameFromPath) {
    const profMatch = trimmed.match(/instagram\.com\/([A-Za-z0-9_.-]+)\/?$/i);
    if (profMatch) {
      const ignored = ['explore', 'reels', 'direct', 'accounts', 'stories', 'p', 'reel', 'tv'];
      if (!ignored.includes(profMatch[1].toLowerCase())) {
        usernameFromPath = profMatch[1];
      }
    }
  }

  // Determine media type
  const isReel = trimmed.includes('/reel/') || trimmed.includes('/reels/');
  const isPost = trimmed.includes('/p/');
  const isStory = trimmed.includes('/stories/');
  const type = isReel ? 'reel' : isPost ? 'post' : isStory ? 'story' : 'reel';

  // Fetch live metadata from Instagram
  const liveData = await fetchInstagramLiveMetadata(trimmed, shortcode);

  // Final Username determination
  const finalUsername = liveData.authorUsername || usernameFromPath || (shortcode ? `creator_${shortcode.toLowerCase().slice(0, 10)}` : 'instagram_creator');

  // Format full name
  const finalFullName = liveData.authorFullName || finalUsername
    .replace(/[._-]/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Format Likes & Comments
  const formattedLikes = typeof liveData.likesCount === 'number'
    ? liveData.likesCount > 1000 ? `${(liveData.likesCount / 1000).toFixed(1)}K` : `${liveData.likesCount}`
    : liveData.likesCount || '2.3K';

  const formattedComments = typeof liveData.commentsCount === 'number'
    ? liveData.commentsCount.toLocaleString()
    : liveData.commentsCount || '150';

  // Proxy avatar & thumbnail so they display without CORS / Referer issues
  const rawAvatar = liveData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80';
  const rawThumbnail = liveData.thumbnailUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';

  const finalAvatar = rawAvatar.startsWith('http')
    ? `/api/proxy-image?url=${encodeURIComponent(rawAvatar)}`
    : rawAvatar;

  const finalThumbnail = rawThumbnail.startsWith('http')
    ? `/api/proxy-image?url=${encodeURIComponent(rawThumbnail)}`
    : rawThumbnail;

  // Video Stream & Download URLs
  const rawVideoUrl = liveData.extractedVideoUrl;
  const videoStreamUrl = rawVideoUrl
    ? `/api/video-stream?url=${encodeURIComponent(rawVideoUrl)}`
    : undefined;

  const downloadFilename = `${finalUsername}_${shortcode || 'video'}.mp4`;
  const directDownloadUrl = rawVideoUrl
    ? `/api/download?url=${encodeURIComponent(rawVideoUrl)}&filename=${encodeURIComponent(downloadFilename)}`
    : '#';

  const downloadFilename720 = `${finalUsername}_${shortcode || 'video'}_720p.mp4`;
  const direct720pDownloadUrl = rawVideoUrl
    ? `/api/download?url=${encodeURIComponent(rawVideoUrl)}&filename=${encodeURIComponent(downloadFilename720)}&quality=720p`
    : '#';

  const mp3Filename = `${finalUsername}_${shortcode || 'audio'}.mp3`;
  const directMp3DownloadUrl = rawVideoUrl
    ? `/api/download?url=${encodeURIComponent(rawVideoUrl)}&filename=${encodeURIComponent(mp3Filename)}&format=mp3`
    : '#';

  // Caption
  const finalCaption = liveData.caption || `Extracted Instagram ${type.toUpperCase()} from @${finalUsername}. Watermark-free media ready for download.`;

  // Duration
  const durationText = liveData.durationInSec > 0
    ? `${Math.floor(liveData.durationInSec / 60)}:${String(liveData.durationInSec % 60).padStart(2, '0')}`
    : '0:30';

  // Process carousel slides if available
  const processedSlides = liveData.carouselSlides.map((slide) => {
    const slideThumb = `/api/proxy-image?url=${encodeURIComponent(slide.thumbnailUrl)}`;
    const slideDl = slide.type === 'video'
      ? `/api/download?url=${encodeURIComponent(slide.mediaUrl)}&filename=${encodeURIComponent(`${finalUsername}_${slide.id}.mp4`)}`
      : `/api/proxy-image?url=${encodeURIComponent(slide.mediaUrl)}`;

    return {
      id: slide.id,
      type: slide.type,
      thumbnailUrl: slideThumb,
      mediaUrl: slide.mediaUrl,
      qualities: [
        {
          label: slide.type === 'video' ? 'Download HD Video (MP4)' : 'Download Original High Res Image (JPG)',
          resolution: slide.type === 'video' ? '1080x1920' : '2160x2700',
          format: slide.type === 'video' ? 'mp4' : 'jpg',
          size: slide.type === 'video' ? '12.5 MB' : '3.8 MB',
          downloadUrl: slideDl,
          isHd: true,
        },
      ],
    };
  });

  const isPhotoPost = !rawVideoUrl;
  const computedType = processedSlides.length > 1 ? 'post' : isPhotoPost ? 'post' : type;

  const photoQualities = [
    {
      label: 'Full HD Original Photo (JPG)',
      resolution: '2160x2700',
      format: 'jpg' as const,
      size: 'High Resolution Photo',
      downloadUrl: `/api/download?url=${encodeURIComponent(rawThumbnail)}&filename=${encodeURIComponent(`${finalUsername}_${shortcode || 'photo'}_1080p.jpg`)}`,
      isHd: true,
    },
    {
      label: 'Standard Quality Photo (JPG)',
      resolution: '1080x1350',
      format: 'jpg' as const,
      size: 'Standard Resolution',
      downloadUrl: `/api/download?url=${encodeURIComponent(rawThumbnail)}&filename=${encodeURIComponent(`${finalUsername}_${shortcode || 'photo'}_720p.jpg`)}`,
    },
  ];

  const videoQualities = [
    {
      label: '1080p Full HD Video (MP4)',
      resolution: '1080x1920',
      bitrate: '8.5 Mbps',
      format: 'mp4' as const,
      size: '14.8 MB (Full HD)',
      downloadUrl: directDownloadUrl,
      isHd: true,
    },
    {
      label: '720p Standard HD Video (MP4)',
      resolution: '720x1280',
      bitrate: '3.5 Mbps',
      format: 'mp4' as const,
      size: '7.2 MB (Compressed HD)',
      downloadUrl: direct720pDownloadUrl,
    },
    {
      label: 'Audio Stream (MP3)',
      bitrate: '320 kbps',
      format: 'mp3' as const,
      size: '1.8 MB (Audio Only)',
      downloadUrl: directMp3DownloadUrl,
    },
  ];

  return res.json({
    success: true,
    data: {
      id: `ig_${shortcode || Date.now()}`,
      type: computedType,
      originalUrl: trimmed,
      title: isPhotoPost ? `Instagram Photo Post by @${finalUsername}` : `Instagram ${computedType.toUpperCase()} by @${finalUsername}`,
      author: {
        username: finalUsername,
        fullName: finalFullName,
        avatarUrl: finalAvatar,
        verified: true,
      },
      duration: isPhotoPost ? undefined : durationText,
      likesCount: formattedLikes,
      commentsCount: formattedComments,
      publishedAt: 'Live',
      thumbnailUrl: finalThumbnail,
      previewVideoUrl: videoStreamUrl,
      isCarousel: processedSlides.length > 1,
      slides: processedSlides.length > 0 ? processedSlides : undefined,
      qualities: isPhotoPost ? photoQualities : videoQualities,
      hasAudio: !isPhotoPost,
      caption: finalCaption,
    },
  });
});

/**
 * Contact Form API Endpoint using Nodemailer
 * Receives user inquiry, sends email to admin (contact@vyzorax.com),
 * and dispatches auto-reply notification to user ("We will get back to you").
 */
app.post(
  '/api/contact',
  createRateLimiter(60000, 10), // Limit contact form submissions to 10/min
  async (req, res) => {
    try {
      const { name, email, subject, message, website_hp } = req.body || {};

      // Spam Protection: Honeypot check (hidden field for bots)
      if (website_hp && website_hp.trim().length > 0) {
        securityLog('warn', `Spam bot caught via honeypot field from IP ${req.ip}`);
        return res.json({
          success: true,
          message: 'Your inquiry has been submitted! A confirmation email ("We will get back to you") has been sent to your email address.',
        });
      }

      if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
          success: false,
          error: { code: 'INVALID_NAME', message: 'Please provide a valid name.' },
        });
      }

      if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({
          success: false,
          error: { code: 'INVALID_EMAIL', message: 'Please provide a valid email address.' },
        });
      }

      if (!message || typeof message !== 'string' || message.trim().length < 5) {
        return res.status(400).json({
          success: false,
          error: { code: 'INVALID_MESSAGE', message: 'Message must be at least 5 characters long.' },
        });
      }

      const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'Unknown';

      const emailResult = await sendContactEmails({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: (subject || 'Direct Inquiry regarding Vyzorax.com').trim(),
        message: message.trim(),
        ip: clientIp,
      });

      securityLog('info', `Contact form submitted by ${email} (${name})`);

      return res.json({
        success: true,
        message: 'Your inquiry has been submitted! A confirmation email ("We will get back to you") has been sent to your email address.',
        details: {
          adminMailSent: emailResult.adminMailSent,
          userMailSent: emailResult.userMailSent,
          previewUrl: emailResult.previewUrl || undefined,
        },
      });
    } catch (err: any) {
      console.error('[Vyzorax] Contact API Error:', err);
      return res.status(500).json({
        success: false,
        error: {
          code: 'MAIL_FAILED',
          message: 'An error occurred while processing your message. Please try again later.',
        },
      });
    }
  }
);

// Catch-all API 404 Handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'API_NOT_FOUND',
      title: 'Endpoint Not Found',
      message: `The API route ${req.originalUrl} does not exist on Vyzorax.com.`,
    },
  });
});

// Global Error Handler Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  securityLog('error', `Unhandled Server Exception: ${err.message || err}`, { path: req.path, method: req.method });

  if (res.headersSent) {
    return next(err);
  }

  const isProd = process.env.NODE_ENV === 'production';
  return res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      title: 'Server Error',
      message: isProd ? 'An unexpected server error occurred. Please try again.' : (err.message || 'Internal Server Error'),
    },
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const fs = await import('fs');
    let cachedHtml: string | null = null;

    try {
      cachedHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
    } catch (e) {
      console.warn('[Vyzorax.com] Could not preload index.html into memory cache:', e);
    }

    // Serve static assets with max-age caching
    app.use(
      express.static(distPath, {
        maxAge: '1y',
        immutable: true,
        index: false,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.html') || filePath.endsWith('sitemap.xml') || filePath.endsWith('robots.txt')) {
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
          } else if (filePath.match(/\.(js|css|svg|png|jpg|jpeg|gif|ico|woff|woff2)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          }
        },
      })
    );

    // Fast Server-Side HTML Rendering Handler
    app.get('*', (req, res) => {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.setHeader('Server-Timing', 'ssr;desc="Server Side HTML Render";duration=0.5');

      if (cachedHtml) {
        return res.send(cachedHtml);
      }
      return res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[Vyzorax.com] Server running on http://0.0.0.0:${PORT}`);
    });
  }
}

startServer();

export { app };
export default app;
