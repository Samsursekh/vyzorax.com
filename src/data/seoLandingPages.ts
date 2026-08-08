import { MediaType } from '../types';

export interface SeoLandingPageData {
  id: string;
  slug: string;
  aliases: string[];
  mediaType: MediaType;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  badge: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroStats: { label: string; value: string }[];
  overviewHeading: string;
  overviewParagraphs: string[];
  keyFeatures: { title: string; description: string; icon: string }[];
  stepByStepGuide: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  schemaJson: object;
}

export const SEO_LANDING_PAGES: Record<string, SeoLandingPageData> = {
  reels: {
    id: 'reels',
    slug: 'instagram-reel-downloader',
    aliases: ['reels', 'reel', 'instagram-reel-downloader', 'reels-downloader'],
    mediaType: 'reel',
    title: 'Instagram Reel Downloader — Save Reels in 1080p HD Watermark-Free',
    metaDescription: 'Free online Instagram Reel Downloader. Save any trending Instagram Reel video in 1080p Full HD MP4 format with zero watermarks and no login required.',
    h1: 'Instagram Reel Downloader',
    subtitle: 'Download trending Instagram Reels in 1080p Full HD without watermarks, compression, or account registration.',
    badge: '100% Watermark-Free • 1080p HD',
    primaryKeyword: 'Instagram Reel Downloader',
    secondaryKeywords: ['Save Instagram Reels 1080p', 'Download Reels Online', 'Watermark-Free Reels Downloader', 'Instagram Reel to MP4'],
    heroStats: [
      { label: 'Max Quality', value: '1080p HD' },
      { label: 'Watermark', value: 'Zero' },
      { label: 'Speed', value: '< 2 Secs' },
    ],
    overviewHeading: 'The Fast & Free Way to Download Instagram Reels',
    overviewParagraphs: [
      'Instagram Reels have transformed digital content, featuring short-form entertainment, creative tutorials, fitness routines, and viral trends. However, Instagram does not provide an official button to save Reels directly to your device offline without branding overlays.',
      'Our online Instagram Reel Downloader bypasses these limitations. By fetching video streams straight from Instagram Content Delivery Networks (CDNs), Vyzorax extracts high-frame-rate MP4 files in 1080p Full HD resolution, completely clean of watermarks or app logos.',
      'Whether you need to archive your own content, curate reels for video editing, or watch videos without internet connectivity, Vyzorax works instantly on iPhone, Android, Windows, and Mac without requiring account credentials.'
    ],
    keyFeatures: [
      {
        title: 'Original 1080p Full HD Output',
        description: 'Preserves maximum bitrate, color fidelity, and 60fps smoothness directly from Instagram CDN servers.',
        icon: 'Video'
      },
      {
        title: 'Clean Watermark-Free Files',
        description: 'Removes username overlays, audio icons, and app logos so your saved video remains pristine.',
        icon: 'Sparkles'
      },
      {
        title: 'Instant MP3 Audio Extraction',
        description: 'Optionally convert any Reel background audio into a high-bitrate 320kbps MP3 sound file.',
        icon: 'Music'
      },
      {
        title: 'Zero Registration & Full Privacy',
        description: 'No login, password, or browser extensions needed. Download completely anonymously.',
        icon: 'ShieldCheck'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Copy the Reel URL',
        description: 'Open Instagram, find the Reel you want to save, tap the Share icon, and select "Copy Link".'
      },
      {
        step: 2,
        title: 'Paste into Vyzorax Reel Downloader',
        description: 'Paste the link into the input field above and click the "Extract Reel" button.'
      },
      {
        step: 3,
        title: 'Download MP4 or MP3',
        description: 'Preview the Reel and click "Download 1080p MP4" to save it directly to your device.'
      }
    ],
    faqs: [
      {
        question: 'Is this Instagram Reel Downloader free to use?',
        answer: 'Yes! Vyzorax Reel Downloader is 100% free with unlimited downloads and no hidden trial periods or sign-ups.'
      },
      {
        question: 'Are downloaded Reels saved with a watermark?',
        answer: 'No. Unlike basic screen recordings, our tool extracts the raw source MP4 file without any watermarks or overlays.'
      },
      {
        question: 'Can I download Reels on iPhone or iPad?',
        answer: 'Yes. Simply copy the Reel link, paste it into Safari browser on iOS 13 or later, and save the MP4 directly to your Files app or Camera Roll.'
      },
      {
        question: 'Can I extract just the background music from a Reel?',
        answer: 'Yes. Vyzorax provides a dedicated MP3 audio extraction button alongside every extracted Reel video result.'
      }
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Vyzorax Instagram Reel Downloader',
      'operatingSystem': 'All (Web, iOS, Android, Windows, macOS)',
      'applicationCategory': 'MultimediaApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'ratingCount': '14280'
      }
    }
  },

  stories: {
    id: 'stories',
    slug: 'instagram-story-downloader',
    aliases: ['stories', 'story', 'instagram-story-downloader', 'story-saver'],
    mediaType: 'story',
    title: 'Instagram Story Downloader — Save Stories & Highlights Anonymously',
    metaDescription: 'Download Instagram Stories and Highlights anonymously before they expire in 24 hours. Save high-resolution story videos and photos in MP4/JPG formats.',
    h1: 'Instagram Story Downloader',
    subtitle: 'Save 24-hour Instagram Stories and permanent Highlights anonymously in full quality before they disappear.',
    badge: '100% Anonymous • High-Res Archiver',
    primaryKeyword: 'Instagram Story Downloader',
    secondaryKeywords: ['Save Instagram Stories Anonymously', 'Download Instagram Highlights', 'Story Saver for Instagram', 'Anonymous Story Viewer'],
    heroStats: [
      { label: 'Anonymity', value: '100% Private' },
      { label: 'Expiry Protection', value: 'Instant' },
      { label: 'Format', value: 'MP4 / JPG' },
    ],
    overviewHeading: 'Save Stories & Highlights Before 24-Hour Expiration',
    overviewParagraphs: [
      'Instagram Stories disappear after 24 hours, taking valuable moments, product announcements, and creative content with them. Unless saved manually, these ephemeral posts are lost forever.',
      'Our online Instagram Story Downloader empowers users to archive stories and story highlights in original video and image formats. Browsing and downloading through Vyzorax is completely anonymous—the account owner will never know you viewed or saved their story.',
      'Works seamlessly across iOS Safari, Android Chrome, and desktop browsers without installing third-party apps or giving access to your Instagram account credentials.'
    ],
    keyFeatures: [
      {
        title: 'Complete Viewer Anonymity',
        description: 'View and save story videos and photos without appearing on the account holder\'s viewer list.',
        icon: 'EyeOff'
      },
      {
        title: 'Story Video & Photo Support',
        description: 'Handles both short video clips (MP4) and high-resolution photo slides (JPG) effortlessly.',
        icon: 'Video'
      },
      {
        title: 'Archive Permanent Highlights',
        description: 'Extract multi-episode story highlights from public profile archives in full HD quality.',
        icon: 'History'
      },
      {
        title: 'Fast Cloud Media Extraction',
        description: 'Powered by high-speed proxy engines to bypass regional throttling and deliver instant files.',
        icon: 'Zap'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Copy Story or Profile Link',
        description: 'Open the Story or Highlight on Instagram, tap the share icon, and select "Copy Link".'
      },
      {
        step: 2,
        title: 'Paste into Story Downloader',
        description: 'Paste the URL into the input bar above and click "Fetch Story".'
      },
      {
        step: 3,
        title: 'Save to Camera Roll',
        description: 'Choose your desired story slide and click "Download Story" to save it permanently.'
      }
    ],
    faqs: [
      {
        question: 'Will the account owner know I downloaded their Story?',
        answer: 'No. Vyzorax downloads story media via secure server requests, meaning your profile is never logged or shown in the viewer list.'
      },
      {
        question: 'Can I download Instagram Stories after 24 hours?',
        answer: 'Only if the account owner saved those stories into a public "Highlights" section on their profile.'
      },
      {
        question: 'Can I download stories from private Instagram accounts?',
        answer: 'For privacy and security reasons, Vyzorax only supports downloading content from public Instagram accounts.'
      },
      {
        question: 'Does this tool work on mobile phones?',
        answer: 'Yes! It is fully responsive and compatible with both Android smartphones and iPhones running iOS 13+.'
      }
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Vyzorax Instagram Story Downloader',
      'operatingSystem': 'All (Web, iOS, Android, Windows, macOS)',
      'applicationCategory': 'MultimediaApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.85',
        'ratingCount': '11340'
      }
    }
  },

  photos: {
    id: 'photos',
    slug: 'instagram-photo-downloader',
    aliases: ['photos', 'photo', 'post', 'instagram-photo-downloader', 'image-downloader'],
    mediaType: 'post',
    title: 'Instagram Photo Downloader — Save HD Instagram Pictures & Images',
    metaDescription: 'Free online Instagram Photo Downloader. Download high-resolution Instagram images and pictures in original JPG format without compression or quality loss.',
    h1: 'Instagram Photo Downloader',
    subtitle: 'Save original ultra-HD Instagram photos, artwork, and infographics in crisp JPG format with zero quality loss.',
    badge: 'Original HD Quality • Ultra Fast',
    primaryKeyword: 'Instagram Photo Downloader',
    secondaryKeywords: ['Download Instagram HD Photos', 'Save Instagram Images', 'Instagram Picture Downloader', 'IG Image Saver'],
    heroStats: [
      { label: 'Max Resolution', value: '1080p / 4K' },
      { label: 'Format', value: 'Original JPG' },
      { label: 'Compression', value: '0%' },
    ],
    overviewHeading: 'Save Full-Resolution Instagram Images in Original JPG',
    overviewParagraphs: [
      'Instagram is home to millions of breathtaking photography pieces, digital artwork, infographics, and travel photos. Taking a mobile screenshot lowers resolution, crops borders, and degrades image crispness.',
      'Our Instagram Photo Downloader extracts the exact full-resolution JPG image file stored on Instagram CDN servers. You receive the uncompressed picture in its full dimensions (up to 1080x1350px or higher) with vibrant colors and rich details.',
      'Designed for photographers, digital marketers, content creators, and casual fans who need high-quality images for wallpapers, design mood boards, or offline viewing.'
    ],
    keyFeatures: [
      {
        title: 'Uncompressed Original JPG',
        description: 'Downloads the exact image source without screenshot artifacts or web compression.',
        icon: 'Image'
      },
      {
        title: 'Preserves EXIF & Color Profiles',
        description: 'Maintains authentic color gradients and crisp clarity for professional viewing.',
        icon: 'Sparkles'
      },
      {
        title: 'Single & Multi-Photo Support',
        description: 'Handles single post photos as well as multi-image galleries seamlessly.',
        icon: 'Layers'
      },
      {
        title: 'Direct Browser Downloads',
        description: 'One-click direct file downloading on all desktop and mobile web browsers.',
        icon: 'Download'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Copy Photo Link',
        description: 'Navigate to the Instagram photo post, tap the three dots or share menu, and select "Copy Link".'
      },
      {
        step: 2,
        title: 'Paste URL in Downloader',
        description: 'Insert the link into our photo downloader input field and click "Get Image".'
      },
      {
        step: 3,
        title: 'Save Full-Res Image',
        description: 'Click "Download High-Res JPG" to save the original file directly to your photo gallery.'
      }
    ],
    faqs: [
      {
        question: 'Does downloading lower the quality of the photo?',
        answer: 'No! Vyzorax fetches the original source file uploaded to Instagram servers without applying any extra compression.'
      },
      {
        question: 'How do I download multiple photos from a carousel post?',
        answer: 'When you paste a carousel link, Vyzorax automatically displays all photos in the post with individual download buttons.'
      },
      {
        question: 'Is it legal to download Instagram photos?',
        answer: 'Downloading photos for personal offline viewing or inspirational boards is generally allowed, but you must respect copyright and credit the original creator when sharing.'
      },
      {
        question: 'Can I download photos on my phone?',
        answer: 'Yes! Vyzorax works smoothly on all iOS Safari, Chrome, Firefox, and Edge mobile browsers.'
      }
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Vyzorax Instagram Photo Downloader',
      'operatingSystem': 'All (Web, iOS, Android, Windows, macOS)',
      'applicationCategory': 'MultimediaApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.92',
        'ratingCount': '9850'
      }
    }
  },

  carousel: {
    id: 'carousel',
    slug: 'instagram-carousel-downloader',
    aliases: ['carousel', 'carousels', 'instagram-carousel-downloader', 'gallery-downloader'],
    mediaType: 'post',
    title: 'Instagram Carousel Downloader — Download All Photos & Videos in One Post',
    metaDescription: 'Download all photos, videos, and slides from multi-post Instagram Carousels. Save entire Instagram galleries with individual high-quality download links.',
    h1: 'Instagram Carousel Downloader',
    subtitle: 'Extract every photo, video, and slide from multi-image Instagram carousel posts in full quality.',
    badge: 'Multi-Slide Extractor • All-in-One',
    primaryKeyword: 'Instagram Carousel Downloader',
    secondaryKeywords: ['Download Instagram Multi-Post', 'Save Instagram Carousel Slides', 'Instagram Gallery Downloader', 'Download Multiple IG Photos'],
    heroStats: [
      { label: 'Slide Capacity', value: 'Up to 20 Items' },
      { label: 'Formats', value: 'MP4 & JPG' },
      { label: 'Selection', value: 'Individual / All' },
    ],
    overviewHeading: 'Extract Every Slide from Multi-Post Instagram Galleries',
    overviewParagraphs: [
      'Instagram Carousel posts allow creators to share up to 20 photos and videos in a single swipeable album. Standard web tools often fail by extracting only the very first slide.',
      'Our advanced Instagram Carousel Downloader parses the full metadata payload of carousel posts. It breaks down the album into individual cards, enabling you to preview and download every single image slide or video clip separately.',
      'Save educational carousel slide decks, photo series, product showcases, and multi-clip video recups with maximum efficiency.'
    ],
    keyFeatures: [
      {
        title: 'Full Album Decomposition',
        description: 'Detects and displays every individual picture and video slide in the carousel sequence.',
        icon: 'Layers'
      },
      {
        title: 'Mixed Media Support (Photos + Videos)',
        description: 'Handles carousels containing both high-resolution JPG images and 1080p MP4 videos.',
        icon: 'Video'
      },
      {
        title: 'Individual Download Buttons',
        description: 'Choose to download specific slides or grab all media items one by one.',
        icon: 'Download'
      },
      {
        title: 'No App Installation Required',
        description: '100% web-based downloader working instantly across mobile, tablet, and PC.',
        icon: 'Globe'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Copy Carousel Post Link',
        description: 'Copy the URL of the multi-slide Instagram post from the mobile app or desktop browser.'
      },
      {
        step: 2,
        title: 'Paste URL in Carousel Downloader',
        description: 'Paste the link above and click "Extract Album".'
      },
      {
        step: 3,
        title: 'Download Desired Slides',
        description: 'Scroll through the parsed slides and download photos (JPG) or videos (MP4) individually.'
      }
    ],
    faqs: [
      {
        question: 'Does this tool download all slides in a carousel post?',
        answer: 'Yes! Vyzorax extracts every single slide (up to 20 items) from carousel albums, including both images and videos.'
      },
      {
        question: 'Can I pick which specific slide to download?',
        answer: 'Absolutely. Each extracted slide displays its own preview thumbnail and dedicated download button.'
      },
      {
        question: 'What format are carousel videos saved in?',
        answer: 'Carousel video slides are extracted in high-definition MP4 format, while photo slides are saved in JPG format.'
      },
      {
        question: 'Is there a limit on how many carousels I can download?',
        answer: 'No, there are no limits or download quotas. You can use Vyzorax as much as you need for free.'
      }
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Vyzorax Instagram Carousel Downloader',
      'operatingSystem': 'All (Web, iOS, Android, Windows, macOS)',
      'applicationCategory': 'MultimediaApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.88',
        'ratingCount': '8720'
      }
    }
  },

  dp: {
    id: 'dp',
    slug: 'instagram-dp-downloader',
    aliases: ['dp', 'profile', 'instagram-dp-downloader', 'profile-picture-downloader'],
    mediaType: 'profile',
    title: 'Instagram DP Downloader — Save Profile Pictures in Full HD Resolution',
    metaDescription: 'Free Instagram DP Downloader. View and download any Instagram profile picture in full size HD quality. Zoom in and save high-resolution profile photos.',
    h1: 'Instagram DP Downloader',
    subtitle: 'View, zoom in, and download full-size Instagram profile pictures (DP) in high definition.',
    badge: 'Full Size HD • Zoom Profile Photo',
    primaryKeyword: 'Instagram DP Downloader',
    secondaryKeywords: ['Instagram Profile Picture Downloader', 'Download Full Size Instagram DP', 'View Instagram Profile Photo HD', 'IG DP Viewer'],
    heroStats: [
      { label: 'Resolution', value: 'Original Full Size' },
      { label: 'Zoom Capability', value: '100% HD' },
      { label: 'Anonymity', value: '100% Private' },
    ],
    overviewHeading: 'Download Full Size Instagram Profile Pictures (DP) in HD',
    overviewParagraphs: [
      'Instagram displays profile pictures in tiny circular thumbnails, making it nearly impossible to see fine details or download full-size avatars natively within the app.',
      'Our Instagram DP Downloader allows you to search any public profile username or profile link to fetch and view the original full-resolution profile photo in HD.',
      'Whether you want to verify a contact, view high-res avatar artwork, or save profile photos, Vyzorax delivers crisp, uncropped profile pictures in high quality.'
    ],
    keyFeatures: [
      {
        title: 'Full-Size Uncropped Avatar',
        description: 'Extracts the original full-dimension image file instead of compressed 150x150 circular thumbnails.',
        icon: 'User'
      },
      {
        title: 'HD Image Clarity',
        description: 'Maintains maximum pixel crispness for profile pictures, brand logos, and digital avatars.',
        icon: 'Sparkles'
      },
      {
        title: 'Username or Link Search',
        description: 'Simply type a username (e.g. @username) or paste the full profile URL.',
        icon: 'Search'
      },
      {
        title: '100% Private & Safe',
        description: 'Profile photo requests are anonymous and do not notify the account user.',
        icon: 'ShieldCheck'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Copy Profile Link or Username',
        description: 'Copy the target Instagram profile URL or take note of the exact @username.'
      },
      {
        step: 2,
        title: 'Paste into DP Downloader',
        description: 'Paste the link or username into the DP input box above and click "Get Full DP".'
      },
      {
        step: 3,
        title: 'Download Full HD Picture',
        description: 'View the zoomed high-resolution profile photo and click "Download Full HD DP" to save.'
      }
    ],
    faqs: [
      {
        question: 'Can I view and download full-size profile pictures for private accounts?',
        answer: 'Profile pictures on Instagram are public by default. In most cases, Vyzorax can fetch full-resolution profile photos even if the account posts are set to private.'
      },
      {
        question: 'Will the user be notified when I download their DP?',
        answer: 'No. Profile picture downloads are 100% anonymous and leave no notification or log.'
      },
      {
        question: 'What format is the profile picture downloaded in?',
        answer: 'The profile picture is saved in high-quality JPG or PNG format.'
      },
      {
        question: 'Can I search by username without copying a URL?',
        answer: 'Yes! Simply paste the full profile link or enter a profile URL into the search bar.'
      }
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Vyzorax Instagram DP Downloader',
      'operatingSystem': 'All (Web, iOS, Android, Windows, macOS)',
      'applicationCategory': 'MultimediaApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.89',
        'ratingCount': '7650'
      }
    }
  },

  audio: {
    id: 'audio',
    slug: 'instagram-audio-downloader',
    aliases: ['audio', 'mp3', 'instagram-audio-downloader', 'reels-audio-extractor'],
    mediaType: 'audio',
    title: 'Instagram Audio Downloader — Extract & Download MP3 from Reels',
    metaDescription: 'Extract and download high-quality MP3 audio from Instagram Reels and videos. Save background music and voiceovers in 320kbps MP3 sound files.',
    h1: 'Instagram Audio Downloader',
    subtitle: 'Convert and extract crystal-clear 320kbps MP3 audio tracks from any Instagram Reel or video clip.',
    badge: '320kbps High Quality • MP3 Converter',
    primaryKeyword: 'Instagram Audio Downloader',
    secondaryKeywords: ['Extract MP3 from Instagram Reels', 'Download Instagram Audio Track', 'Reels to MP3 Converter', 'Save Instagram Background Music'],
    heroStats: [
      { label: 'Audio Bitrate', value: '320 kbps' },
      { label: 'Format', value: 'Universal MP3' },
      { label: 'Conversion', value: 'Instant' },
    ],
    overviewHeading: 'Extract High-Quality MP3 Audio from Instagram Reels & Videos',
    overviewParagraphs: [
      'Instagram Reels often feature viral music remixes, trending songs, motivational speeches, or unique podcast snippets that you want to save purely as audio for offline listening.',
      'Our Instagram Audio Downloader parses the original video container, extracts the exact audio stream, and encodes it into a standard, high-bitrate 320kbps MP3 sound file.',
      'Enjoy your favorite viral sounds, music clips, and voiceovers on your phone, car media player, or editing software without wasting bandwidth on video playback.'
    ],
    keyFeatures: [
      {
        title: '320kbps High-Bitrate MP3',
        description: 'Delivers crystal-clear sound quality with deep bass and clear vocal reproduction.',
        icon: 'Music'
      },
      {
        title: 'Compatible with All Audio Players',
        description: 'Universal MP3 files play seamlessly on iOS Music, Android media players, and DAWs.',
        icon: 'Smartphone'
      },
      {
        title: 'Instant Online Audio Rip',
        description: 'Converts audio server-side in under 2 seconds without requiring client-side encoding plugins.',
        icon: 'Zap'
      },
      {
        title: 'Unlimited Downloads',
        description: 'Extract background sound and audio clips from unlimited Reels and video posts for free.',
        icon: 'Download'
      }
    ],
    stepByStepGuide: [
      {
        step: 1,
        title: 'Copy Video or Reel Link',
        description: 'Copy the link of the Instagram Reel or video containing the audio you wish to save.'
      },
      {
        step: 2,
        title: 'Paste into Audio Extractor',
        description: 'Paste the URL into our Instagram audio downloader box above and click "Extract MP3".'
      },
      {
        step: 3,
        title: 'Save MP3 File',
        description: 'Click "Download 320kbps MP3" to save the audio file directly to your device.'
      }
    ],
    faqs: [
      {
        question: 'Can I extract audio from any Instagram Reel?',
        answer: 'Yes! You can extract MP3 audio from any public Instagram Reel, IGTV video, or standard video post.'
      },
      {
        question: 'What audio format is provided?',
        answer: 'The audio is encoded in universal MP3 format at 320kbps bitrate for maximum compatibility.'
      },
      {
        question: 'Is it free to convert Instagram Reels to MP3?',
        answer: 'Yes, Vyzorax Audio Downloader is completely free with no restrictions or registration requirements.'
      },
      {
        question: 'Can I use downloaded audio in my own video edits?',
        answer: 'Yes, as long as you respect music copyright regulations and give appropriate credit to original audio creators when required.'
      }
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Vyzorax Instagram Audio Downloader',
      'operatingSystem': 'All (Web, iOS, Android, Windows, macOS)',
      'applicationCategory': 'MultimediaApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.91',
        'ratingCount': '10510'
      }
    }
  }
};

export function getSeoPageBySlug(slug: string): SeoLandingPageData | undefined {
  const normalized = slug.toLowerCase().replace(/^\//, '');
  for (const key of Object.keys(SEO_LANDING_PAGES)) {
    const page = SEO_LANDING_PAGES[key];
    if (page.id === normalized || page.slug === normalized || page.aliases.includes(normalized)) {
      return page;
    }
  }
  return undefined;
}
