import React, { useState, useEffect } from 'react';
import { Download, Play, Check, Copy, ExternalLink, ShieldCheck, Film, Music, Image as ImageIcon, Edit2, Info, AlertCircle } from 'lucide-react';
import { InstagramMediaData, QualityOption } from '../types';

interface MediaResultCardProps {
  media: InstagramMediaData;
  onDownload: (quality: QualityOption) => void;
}

export const MediaResultCard: React.FC<MediaResultCardProps> = ({ media, onDownload }) => {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Editable Profile Handle state so user can customize handle dynamically
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [customUsername, setCustomUsername] = useState(media.author.username);
  const [customFullName, setCustomFullName] = useState(media.author.fullName);

  useEffect(() => {
    setCustomUsername(media.author.username);
    setCustomFullName(media.author.fullName);
  }, [media]);

  const currentSlide = media.isCarousel && media.slides ? media.slides[selectedSlideIndex] : null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(media.originalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleTriggerDownload = (quality: QualityOption, id: string) => {
    setDownloadingId(id);
    onDownload(quality);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden transition-all animate-fade-in">
      {/* Header Bar with Profile Info */}
      <div className="p-4 sm:p-6 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Creator Info */}
        <div className="flex items-center space-x-3">
          <img
            src={media.author.avatarUrl}
            alt={customUsername}
            className="w-12 h-12 rounded-full object-cover border-2 border-rose-500/50 p-0.5 shadow-md"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80';
            }}
          />
          <div>
            {isEditingProfile ? (
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-semibold text-sm">@</span>
                  <input
                    type="text"
                    value={customUsername}
                    onChange={(e) => setCustomUsername(e.target.value)}
                    className="bg-slate-800 text-white font-bold text-sm px-2 py-0.5 rounded border border-slate-700 focus:outline-none focus:border-rose-500"
                    placeholder="username"
                  />
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded font-semibold hover:bg-rose-600"
                  >
                    Save
                  </button>
                </div>
                <input
                  type="text"
                  value={customFullName}
                  onChange={(e) => setCustomFullName(e.target.value)}
                  className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded border border-slate-700 focus:outline-none focus:border-rose-500"
                  placeholder="Full Name"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-white text-base">@{customUsername}</span>
                    {media.author.verified && (
                      <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold" title="Verified Creator">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{customFullName} • {media.publishedAt}</p>
                </div>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-1"
                  title="Customize profile handle"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Tags */}
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold uppercase tracking-wider flex items-center space-x-1">
            {media.type === 'reel' && <Film className="w-3.5 h-3.5 mr-1" />}
            {media.type === 'post' && <ImageIcon className="w-3.5 h-3.5 mr-1" />}
            {media.type === 'audio' && <Music className="w-3.5 h-3.5 mr-1" />}
            <span>{media.type}</span>
          </span>

          <button
            onClick={handleCopyLink}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Copy original post link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Notice Banner explaining Instagram CDN protection */}
      <div className="px-4 py-2.5 bg-indigo-950/40 border-b border-indigo-900/40 text-xs text-indigo-300 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Instagram Media Extraction:</strong> Extracted profile handle <strong>@{customUsername}</strong> from link shortcode.
          </span>
        </div>
        <button
          onClick={() => setIsEditingProfile(true)}
          className="text-rose-400 hover:text-rose-300 underline font-semibold shrink-0 ml-2 text-[11px]"
        >
          Edit Profile
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Media Preview Column */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full aspect-[4/5] max-w-sm rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group shadow-lg">
            {/* Display Image, Video Player, or Thumbnail */}
            {isPlaying && media.previewVideoUrl ? (
              <video
                src={media.previewVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <img
                  src={currentSlide ? currentSlide.thumbnailUrl : media.thumbnailUrl}
                  alt={media.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Video overlay controls if media has video preview */}
                {media.previewVideoUrl && (
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/30 transition-all">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                      title="Play inline video"
                    >
                      <Play className="w-6 h-6 ml-1 fill-white" />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Duration / Carousel Counter badge */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur text-white text-xs font-semibold flex items-center space-x-1">
              {media.isCarousel ? (
                <span>{selectedSlideIndex + 1} / {media.slides?.length}</span>
              ) : (
                <span>{media.duration || 'HD'}</span>
              )}
            </div>
          </div>

          {/* Carousel thumbnails selector if carousel */}
          {media.isCarousel && media.slides && (
            <div className="flex items-center space-x-2 mt-3 overflow-x-auto max-w-full py-1">
              {media.slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setSelectedSlideIndex(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    selectedSlideIndex === idx
                      ? 'border-rose-500 scale-105 shadow-md shadow-rose-500/30'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={slide.thumbnailUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Download Options Column */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2">
              Instagram {media.type.toUpperCase()} Media by @{customUsername}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-3 leading-relaxed">
              {media.caption}
            </p>

            {/* Stats row */}
            <div className="flex items-center space-x-4 mt-3 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <span className="text-rose-500 font-bold">♥</span>
                <span>{media.likesCount} Likes</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-indigo-400 font-bold">💬</span>
                <span>{media.commentsCount} Comments</span>
              </span>
            </div>
          </div>

          {/* Photo Post Notice Banner if media has no video */}
          {(!media.previewVideoUrl || media.type === 'post') && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-200">Instagram Photo Post</p>
                <p className="text-[11px] text-amber-300/80 mt-0.5">
                  This post contains photo image(s). Video or MP3 audio format extraction is not applicable for static photos. High-resolution JPG photo download options are provided below.
                </p>
              </div>
            </div>
          )}

          {/* Download Quality Options Box */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Select Download Format & Quality
              </span>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Virus Free</span>
              </span>
            </div>

            <div className="space-y-2">
              {(currentSlide ? currentSlide.qualities : media.qualities).map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-200 text-sm">{q.label}</span>
                      {q.isHd && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                          FULL HD
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Format: <span className="uppercase font-medium text-slate-400">{q.format}</span>
                      {q.resolution && ` • ${q.resolution}`}
                      {q.size && ` • ~${q.size}`}
                    </p>
                  </div>

                  <button
                    onClick={() => handleTriggerDownload(q, `${idx}`)}
                    disabled={downloadingId === `${idx}`}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-rose-500/20 transition-all hover:scale-105"
                  >
                    {downloadingId === `${idx}`}
                    {downloadingId === `${idx}` ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Starting...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Download Note */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Fast direct CDN extraction • No login required</span>
            <a
              href={media.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:underline inline-flex items-center space-x-1 font-medium"
            >
              <span>View on Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
