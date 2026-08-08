export type MediaType = 'reel' | 'post' | 'story' | 'igtv' | 'audio' | 'profile';

export type DownloadErrorCode = 
  | 'INVALID_URL' 
  | 'PRIVATE_ACCOUNT' 
  | 'RATE_LIMIT_EXCEEDED' 
  | 'NETWORK_ERROR' 
  | 'MEDIA_NOT_FOUND' 
  | 'UNKNOWN';

export interface DownloadError {
  code: DownloadErrorCode;
  title: string;
  message: string;
  helpHint?: string;
}

export interface QualityOption {
  label: string;
  resolution?: string;
  bitrate?: string;
  format: 'mp4' | 'mp3' | 'jpg' | 'png';
  size: string;
  downloadUrl: string;
  isHd?: boolean;
}

export interface CarouselSlide {
  id: string;
  type: 'image' | 'video';
  thumbnailUrl: string;
  mediaUrl: string;
  qualities: QualityOption[];
}

export interface InstagramMediaData {
  id: string;
  type: MediaType;
  originalUrl: string;
  title: string;
  author: {
    username: string;
    fullName: string;
    avatarUrl: string;
    verified: boolean;
  };
  duration?: string;
  likesCount: string;
  commentsCount: string;
  publishedAt: string;
  thumbnailUrl: string;
  previewVideoUrl?: string;
  isCarousel?: boolean;
  slides?: CarouselSlide[];
  qualities: QualityOption[];
  hasAudio: boolean;
  caption: string;
}

export interface ExtractApiResponse {
  success: boolean;
  data?: InstagramMediaData;
  error?: DownloadError;
}

export interface DownloadHistoryItem {
  id: string;
  title: string;
  username: string;
  type: MediaType;
  timestamp: number;
  thumbnailUrl: string;
  format: string;
  quality: string;
}

export type SupportedFormatType = {
  id: MediaType;
  title: string;
  iconName: string;
  description: string;
  badge: string;
};

export interface BlogAuthor {
  name: string;
  avatar: string;
  role: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown formatted
  coverImage: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  featured?: boolean;
  views?: number;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}


