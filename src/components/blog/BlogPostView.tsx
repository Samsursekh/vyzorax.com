import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Eye,
  Share2,
  Copy,
  Check,
  ThumbsUp,
  MessageSquare,
  BookOpen,
  Tag,
  List,
  Sparkles,
  Download,
} from 'lucide-react';
import { BlogPost } from '../../types';
import { extractTableOfContents } from '../../utils/blogUtils';
import { BlogMarkdownRenderer } from './BlogMarkdownRenderer';
import { getRelatedPosts } from '../../data/blogPosts';

interface BlogPostViewProps {
  post: BlogPost;
  onBackToBlog: () => void;
  onSelectPost: (slug: string) => void;
  onNavigateToDownloader: () => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({
  post,
  onBackToBlog,
  onSelectPost,
  onNavigateToDownloader,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [likesCount, setLikesCount] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  const toc = extractTableOfContents(post.content);
  const relatedPosts = getRelatedPosts(post.slug, 3);

  // Scroll spy for Table of Contents highlight
  useEffect(() => {
    const handleScroll = () => {
      const headings = toc.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 120;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveHeadingId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleToggleLike = () => {
    if (hasLiked) {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const scrollToHeading = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-slate-900/60 border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBackToBlog}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-300 hover:text-rose-400 transition-colors bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700/60"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span
              onClick={onBackToBlog}
              className="hover:text-slate-200 cursor-pointer transition-colors"
            >
              Blog
            </span>
            <span>/</span>
            <span className="text-rose-400 font-medium">{post.category}</span>
            <span>/</span>
            <span className="truncate max-w-[200px] text-slate-300">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-6 text-center">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-4">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author & Article Meta Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-b border-slate-800/80 py-4">
          {/* Author */}
          <div className="flex items-center space-x-3 text-left">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/30"
            />
            <div>
              <div className="font-bold text-slate-100 text-sm">{post.author.name}</div>
              <div className="text-slate-400 text-xs">{post.author.role}</div>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

          {/* Date & Reading Time */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>{post.readTimeMinutes} min read</span>
            </div>
            {post.views && (
              <div className="flex items-center space-x-1.5">
                <Eye className="w-4 h-4 text-slate-400" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Cover Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-video max-h-[420px] w-full">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>
      </div>

      {/* Main Body Grid: Content + Sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-xl">
              <BlogMarkdownRenderer content={post.content} />
            </div>

            {/* Tags Section */}
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/60 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-rose-400 mr-2" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700/50 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Interactive Feedback / Like Bar */}
            <div className="bg-gradient-to-r from-rose-950/30 via-slate-900 to-indigo-950/30 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white text-base">Was this article helpful?</h4>
                <p className="text-xs text-slate-400">Feedback helps us refine our downloader guides and tutorials.</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleToggleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    hasLiked
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                  <span>{likesCount} Likes</span>
                </button>

                <button
                  onClick={handleCopyShareLink}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-rose-400" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents Box */}
            {toc.length > 0 && (
              <div className="sticky top-24 bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-3">
                  <List className="w-4 h-4" />
                  <span>Table of Contents</span>
                </div>

                <nav className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToHeading(item.id)}
                      className={`block w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-all ${
                        activeHeadingId === item.id
                          ? 'bg-rose-500/20 text-rose-300 font-bold border-l-2 border-rose-500'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      } ${item.level === 3 ? 'ml-3 text-[11px]' : ''}`}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Downloader CTA Sidebar Box */}
            <div className="bg-gradient-to-br from-rose-900/40 via-slate-900 to-slate-900 p-6 rounded-2xl border border-rose-500/30 text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              
              <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 text-rose-400">
                <Download className="w-6 h-6 animate-pulse" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">Ready to Download Reels?</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Save Instagram Reels, Photos, Stories, and Audio MP3 instantly in 1080p Full HD with Vyzorax.
              </p>

              <button
                onClick={onNavigateToDownloader}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all"
              >
                Go to Free Downloader
              </button>
            </div>

            {/* Author Info Card */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">About the Author</div>
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-700"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{post.author.name}</h4>
                  <p className="text-xs text-rose-400">{post.author.role}</p>
                </div>
              </div>
              {post.author.bio && (
                <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                  {post.author.bio}
                </p>
              )}
            </div>
          </aside>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-rose-500" />
                <span>Related Articles</span>
              </h2>

              <button
                onClick={onBackToBlog}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
              >
                View all articles →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <div
                  key={relPost.id}
                  onClick={() => onSelectPost(relPost.slug)}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 group flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={relPost.coverImage}
                      alt={relPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-rose-400 border border-slate-800 backdrop-blur-md">
                      {relPost.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-100 group-hover:text-rose-400 transition-colors line-clamp-2 text-sm mb-2">
                        {relPost.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                        {relPost.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-3">
                      <span>{relPost.readTimeMinutes} min read</span>
                      <span>{new Date(relPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
