import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  Sparkles,
  Rss,
  ChevronLeft,
  ChevronRight,
  X,
  Tag,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { BlogPost } from '../../types';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../../data/blogPosts';

interface BlogListProps {
  onSelectPost: (slug: string) => void;
  onNavigateToDownloader: () => void;
}

const POSTS_PER_PAGE = 6;

export const BlogList: React.FC<BlogListProps> = ({ onSelectPost, onNavigateToDownloader }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique tags across all blog posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    BLOG_POSTS.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet);
  }, []);

  // Filter blog posts based on search, category, and selected tag
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      // Category filter
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchTag = post.tags.some((t) => t.toLowerCase().includes(q));
        const matchCategory = post.category.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt && !matchTag && !matchCategory) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  // Featured post (first featured post or first item)
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTag(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Blog Header Hero */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 pt-10 pb-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Vyzorax Knowledge Center</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Instagram Guides, Tutorials &amp; Tech Insights
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Master Instagram content downloading, 1080p video optimization, MP3 extraction, and creator rights with expert articles from Vyzorax.
          </p>

          {/* Search Bar & RSS Link */}
          <div className="pt-4 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles by topic, keyword, or tag..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-10 py-3 bg-slate-900/90 border border-slate-800 focus:border-rose-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-rose-400 text-xs font-bold transition-all"
              title="Subscribe to RSS Feed"
            >
              <Rss className="w-4 h-4 text-amber-400" />
              <span>RSS Feed</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800/80 pb-6">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 scale-105'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Popular Tags List */}
        <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
          <Tag className="w-3.5 h-3.5 text-rose-400 mr-1" />
          <span className="font-bold text-slate-300 mr-2">Filter by Tag:</span>
          {allTags.map((tag) => {
            const isTagActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  isTagActive
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 font-bold'
                    : 'bg-slate-950/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                #{tag}
              </button>
            );
          })}

          {(selectedCategory !== 'All' || selectedTag || searchQuery) && (
            <button
              onClick={clearAllFilters}
              className="ml-auto flex items-center space-x-1 text-xs text-rose-400 hover:underline font-semibold"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Featured Post Hero Banner (Only shown on Page 1 when no strict search filters active) */}
        {currentPage === 1 && selectedCategory === 'All' && !selectedTag && !searchQuery && featuredPost && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              <TrendingUp className="w-4 h-4" />
              <span>Featured Article</span>
            </div>

            <div
              onClick={() => onSelectPost(featuredPost.slug)}
              className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-rose-950/30 border border-slate-800 hover:border-rose-500/40 rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 group grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/80 text-rose-400 border border-slate-800 backdrop-blur-md">
                  {featuredPost.category}
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-rose-400 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-2">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-rose-500/40"
                      />
                      <span className="font-semibold text-slate-200">{featuredPost.author.name}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-rose-400" />
                        <span>{featuredPost.readTimeMinutes} min</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-rose-400 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span>
                {selectedCategory !== 'All' ? `${selectedCategory} Articles` : 'All Latest Articles'}
              </span>
              <span className="text-xs font-normal text-slate-400">
                ({filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'})
              </span>
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No matching articles found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                We couldn't find any articles matching your search filters. Try clearing your search query or selecting a different category.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all"
              >
                Clear Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => onSelectPost(post.slug)}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 group flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-rose-400 border border-slate-800 backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-slate-100 group-hover:text-rose-400 transition-colors text-base leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center space-x-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="truncate max-w-[100px] text-slate-300 font-medium">{post.author.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-rose-400" />
                      <span>{post.readTimeMinutes} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
