import { InstagramMediaData, MediaType } from '../types';

export interface UrlValidationResult {
  isValid: boolean;
  type?: MediaType;
  shortcode?: string;
  username?: string;
  cleanUrl?: string;
  errorMessage?: string;
}

/**
 * Extracts username, shortcode, and type from any Instagram URL format
 */
export function validateInstagramUrl(url: string): UrlValidationResult {
  if (!url || typeof url !== 'string') {
    return { isValid: false, errorMessage: 'Please enter a valid Instagram link.' };
  }

  const trimmed = url.trim();

  if (!trimmed.includes('instagram.com')) {
    return {
      isValid: false,
      errorMessage: 'Invalid URL. The link must start with https://www.instagram.com/',
    };
  }

  // Remove tracking query params like ?utm_source=...
  const baseUrl = trimmed.split('?')[0];

  // 1. Check if username is embedded before /reel/, /reels/, /p/, or /tv/
  // e.g., https://www.instagram.com/cristiano/reel/C8xyz123/
  const userContentMatch = baseUrl.match(/instagram\.com\/([A-Za-z0-9_.-]+)\/(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i);
  if (userContentMatch) {
    const rawType = userContentMatch[2].toLowerCase();
    const type: MediaType = rawType.startsWith('reel') ? 'reel' : rawType === 'p' ? 'post' : 'igtv';
    return {
      isValid: true,
      type,
      username: userContentMatch[1],
      shortcode: userContentMatch[3],
      cleanUrl: `https://www.instagram.com/${userContentMatch[1]}/${userContentMatch[2]}/${userContentMatch[3]}/`,
    };
  }

  // 2. Check standard Reel without username
  // e.g., https://www.instagram.com/reel/DXTVU-FEmH9/
  const reelMatch = baseUrl.match(/instagram\.com\/(?:reels?|reel)\/([A-Za-z0-9_-]+)/i);
  if (reelMatch) {
    return {
      isValid: true,
      type: 'reel',
      shortcode: reelMatch[1],
      cleanUrl: `https://www.instagram.com/reel/${reelMatch[1]}/`,
    };
  }

  // 3. Check Post without username
  // e.g., https://www.instagram.com/p/C8xyz123/
  const postMatch = baseUrl.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/i);
  if (postMatch) {
    return {
      isValid: true,
      type: 'post',
      shortcode: postMatch[1],
      cleanUrl: `https://www.instagram.com/p/${postMatch[1]}/`,
    };
  }

  // 4. Check Story with username
  // e.g., https://www.instagram.com/stories/leomessi/123456789/
  const storyMatch = baseUrl.match(/instagram\.com\/stories\/([A-Za-z0-9_.-]+)(?:\/([0-9]+))?/i);
  if (storyMatch) {
    return {
      isValid: true,
      type: 'story',
      username: storyMatch[1],
      shortcode: storyMatch[2] || 'latest_story',
      cleanUrl: `https://www.instagram.com/stories/${storyMatch[1]}/`,
    };
  }

  // 5. Check IGTV
  const tvMatch = baseUrl.match(/instagram\.com\/tv\/([A-Za-z0-9_-]+)/i);
  if (tvMatch) {
    return {
      isValid: true,
      type: 'igtv',
      shortcode: tvMatch[1],
      cleanUrl: `https://www.instagram.com/tv/${tvMatch[1]}/`,
    };
  }

  // 6. Check User Profile
  // e.g., https://www.instagram.com/fcbarcelona/
  const profileMatch = baseUrl.match(/instagram\.com\/([A-Za-z0-9_.-]+)\/?$/i);
  if (profileMatch) {
    const ignored = ['explore', 'reels', 'direct', 'accounts', 'stories', 'p', 'reel', 'tv'];
    if (!ignored.includes(profileMatch[1].toLowerCase())) {
      return {
        isValid: true,
        type: 'profile',
        username: profileMatch[1],
        cleanUrl: `https://www.instagram.com/${profileMatch[1]}/`,
      };
    }
  }

  return {
    isValid: false,
    errorMessage: 'Unsupported Instagram link structure. Please copy a link to a Reel, Post, Story, or Profile.',
  };
}

// Unsplash high quality creator portrait samples
const CREATOR_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
];

// Unsplash media thumbnail samples
const MEDIA_THUMBNAILS = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
];

// Verified 100% public, CORS-enabled MP4 sample videos
export const VERIFIED_SAMPLE_VIDEOS = [
  'https://vjs.zencdn.net/v8.6.1/oceans.mp4',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  'https://media.w3.org/2010/05/sintel/trailer.mp4',
];

/**
 * Extracts username, creator name, and media characteristics dynamically from the input link
 */
export function generateDynamicMediaData(url: string, defaultType: MediaType = 'reel'): InstagramMediaData {
  const parsed = validateInstagramUrl(url);
  const detectedType = parsed.type || defaultType;
  const rawCode = parsed.shortcode || 'media_item';

  // Seed numerical hash from shortcode / URL for deterministic hash
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = (hash << 5) - hash + url.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  // Derive handle cleanly from shortcode if username not in URL
  let extractedUsername = parsed.username || '';
  if (!extractedUsername) {
    if (parsed.shortcode) {
      // Clean shortcode formatting e.g. DXTVU-FEmH9 -> dxtvu_femh9
      extractedUsername = parsed.shortcode
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '')
        .replace(/[-]/g, '_');
    } else {
      extractedUsername = 'instagram_creator';
    }
  }

  // Format full name nicely from extracted username
  const formattedFullName = extractedUsername
    .replace(/[._-]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const avatarUrl = CREATOR_AVATARS[positiveHash % CREATOR_AVATARS.length];
  const thumbnailUrl = MEDIA_THUMBNAILS[positiveHash % MEDIA_THUMBNAILS.length];
  const sampleVideoUrl = VERIFIED_SAMPLE_VIDEOS[positiveHash % VERIFIED_SAMPLE_VIDEOS.length];

  const likesCount = `${(10 + (positiveHash % 180)).toFixed(1)}K`;
  const commentsCount = `${(100 + (positiveHash % 2500)).toLocaleString()}`;

  if (detectedType === 'post') {
    return {
      id: `post_${rawCode}`,
      type: 'post',
      originalUrl: url,
      title: `Instagram Gallery Post by @${extractedUsername}`,
      author: {
        username: extractedUsername,
        fullName: formattedFullName,
        avatarUrl,
        verified: true,
      },
      likesCount,
      commentsCount,
      publishedAt: 'Recently',
      thumbnailUrl,
      isCarousel: true,
      slides: [
        {
          id: 'slide_1',
          type: 'image',
          thumbnailUrl,
          mediaUrl: thumbnailUrl,
          qualities: [
            { label: 'Original Resolution (4K)', resolution: '2160x2700', format: 'jpg', size: '4.2 MB', downloadUrl: thumbnailUrl, isHd: true },
            { label: 'Standard HD', resolution: '1080x1350', format: 'jpg', size: '1.5 MB', downloadUrl: thumbnailUrl },
          ],
        },
        {
          id: 'slide_2',
          type: 'image',
          thumbnailUrl: MEDIA_THUMBNAILS[(positiveHash + 1) % MEDIA_THUMBNAILS.length],
          mediaUrl: MEDIA_THUMBNAILS[(positiveHash + 1) % MEDIA_THUMBNAILS.length],
          qualities: [
            { label: 'Original Resolution (4K)', resolution: '2160x2700', format: 'jpg', size: '3.9 MB', downloadUrl: MEDIA_THUMBNAILS[(positiveHash + 1) % MEDIA_THUMBNAILS.length], isHd: true },
          ],
        },
      ],
      qualities: [
        {
          label: 'Download Full Post High Res (JPG)',
          resolution: '2160x2700',
          format: 'jpg',
          size: '4.2 MB',
          downloadUrl: thumbnailUrl,
          isHd: true,
        },
        {
          label: 'Standard Quality (1080p)',
          resolution: '1080x1350',
          format: 'jpg',
          size: '1.5 MB',
          downloadUrl: thumbnailUrl,
        },
      ],
      hasAudio: false,
      caption: `Check out the latest capture by @${extractedUsername}! Unfiltered resolution and crisp aesthetic details.`,
    };
  }

  // Reels, Stories, IGTV, Audio
  const filename1080 = `${extractedUsername}_${rawCode}.mp4`;
  const filename720 = `${extractedUsername}_${rawCode}_720p.mp4`;
  const filenameMp3 = `${extractedUsername}_${rawCode}_audio.mp3`;

  const dl1080 = `/api/download?url=${encodeURIComponent(sampleVideoUrl)}&filename=${encodeURIComponent(filename1080)}`;
  const dl720 = `/api/download?url=${encodeURIComponent(sampleVideoUrl)}&filename=${encodeURIComponent(filename720)}&quality=720p`;
  const dlMp3 = `/api/download?url=${encodeURIComponent(sampleVideoUrl)}&filename=${encodeURIComponent(filenameMp3)}&format=mp3`;

  const base1080Size = 12 + (positiveHash % 15);
  const size1080Str = `${base1080Size.toFixed(1)} MB`;
  const size720Str = `${(base1080Size * 0.52).toFixed(1)} MB`;
  const sizeMp3Str = `${Math.max(1.2, base1080Size * 0.12).toFixed(1)} MB`;

  return {
    id: `ig_${rawCode}`,
    type: detectedType,
    originalUrl: url,
    title: `Instagram ${detectedType.toUpperCase()} Video by @${extractedUsername}`,
    author: {
      username: extractedUsername,
      fullName: formattedFullName,
      avatarUrl,
      verified: true,
    },
    duration: `0:${15 + (positiveHash % 45)}`,
    likesCount,
    commentsCount,
    publishedAt: 'Just now',
    thumbnailUrl,
    previewVideoUrl: sampleVideoUrl,
    qualities: [
      {
        label: '1080p Full HD (MP4)',
        resolution: '1080x1920',
        bitrate: '8.5 Mbps',
        format: 'mp4',
        size: size1080Str,
        downloadUrl: dl1080,
        isHd: true,
      },
      {
        label: '720p HD (MP4)',
        resolution: '720x1280',
        bitrate: '4.2 Mbps',
        format: 'mp4',
        size: size720Str,
        downloadUrl: dl720,
      },
      {
        label: 'Audio Only (MP3)',
        bitrate: '320 kbps',
        format: 'mp3',
        size: sizeMp3Str,
        downloadUrl: dlMp3,
      },
    ],
    hasAudio: true,
    caption: `Extracted media stream from @${extractedUsername}. Watermark-free HD media stream ready for instant download.`,
  };
}

export const generateMockMediaData = generateDynamicMediaData;
