import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, Layers, Shield, Zap, Search, Server, Cpu, Globe, Lock, ArrowUpRight } from 'lucide-react';

interface ArchitectureDocViewerProps {
  onClose: () => void;
}

export const ArchitectureDocViewer: React.FC<ArchitectureDocViewerProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<'all' | 'folder' | 'components' | 'api' | 'data' | 'security' | 'seo' | 'performance' | 'scalability'>('all');
  const [copied, setCopied] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  const sections = [
    { id: 'folder', title: '1. Modular Directory Structure', icon: <Layers className="w-4 h-4 text-rose-400" /> },
    { id: 'components', title: '2. Component Architecture', icon: <Cpu className="w-4 h-4 text-amber-400" /> },
    { id: 'api', title: '3. API & Proxy Architecture', icon: <Server className="w-4 h-4 text-indigo-400" /> },
    { id: 'data', title: '4. End-to-End Data Flow', icon: <Globe className="w-4 h-4 text-emerald-400" /> },
    { id: 'security', title: '5. Security & Rate Limiting Plan', icon: <Shield className="w-4 h-4 text-purple-400" /> },
    { id: 'seo', title: '6. Technical SEO & AdSense Strategy', icon: <BookOpen className="w-4 h-4 text-blue-400" /> },
    { id: 'performance', title: '7. Performance Optimization Strategy', icon: <Zap className="w-4 h-4 text-pink-400" /> },
    { id: 'scalability', title: '8. Future Scalability & Infrastructure', icon: <Lock className="w-4 h-4 text-cyan-400" /> },
  ];

  const fullDocMarkdown = `# Vyzorax.com — Production Software Architecture Document

**Architectural Blueprint & Technical Specification**
**Tech Stack:** Node.js High-Performance Core, Express Pipeline, TypeScript, Tailwind CSS, React 19, Stream Proxy Engine

---

## 1. Directory & Modular Structure

\`\`\`
vyzorax-downloader/
├── server.ts                     # Production Express Server & FFmpeg Stream Proxy Pipeline
├── index.html                    # Single-page shell entrypoint
├── src/
│   ├── App.tsx                   # Main React Application Router & Layout
│   ├── main.tsx                  # Client Hydration Entrypoint
│   ├── components/               # Production UI Components
│   │   ├── Header.tsx            # Navigation & Brand Header
│   │   ├── HeroDownloader.tsx    # URL Input form with clipboard paste
│   │   ├── MediaResultCard.tsx   # Video/Photo preview & format options
│   │   ├── FeatureGrid.tsx       # Core Features & USPs
│   │   ├── FaqSection.tsx        # SEO Accordion with JSON-LD Schema
│   │   └── SeoFooter.tsx         # Keyword matrix & Legal Modals
│   ├── server/
│   │   ├── security.ts           # Rate Limiter, CSRF & Bot Defense Middleware
│   │   └── mailer.ts             # Contact Form Mailer Service
│   └── utils/
│       └── instagramParser.ts    # Instagram GraphQL & API Extraction Engine
├── public/                       # Favicon & Brand Logos
└── package.json                  # Dependencies & Production Build Scripts
\`\`\`

---

## 2. Component Architecture & Hierarchy

\`\`\`
RootApp (src/App.tsx)
 ├── GoogleAdSenseScript (Async defer)
 ├── Header (Sticky Navbar + Format Tabs)
 ├── HeroSection (Client Component - URL Input)
 ├── AdSenseUnit (Header Banner Slot)
 ├── MediaResultCard (Conditional render on URL extraction)
 │    ├── VideoPreviewPlayer (HTML5 Video)
 │    ├── CarouselViewer (Image slider)
 │    └── QualityDownloadSelector (1080p, 720p, MP3)
 ├── FeatureGrid (USPs: Speed, 1080p, Safe)
 ├── HowToDownload (3-step visual guide)
 ├── FaqSection (SEO Accordion + Schema.org FAQ)
 └── SeoFooter (Keyword links + Privacy / Terms / DMCA)
\`\`\`

---

## 3. API & Proxy Architecture

### **API Endpoint 1: \`POST /api/extract\`**
- **Runtime:** High-Performance Express Engine
- **Purpose:** Receives Instagram URL, parses shortcode, queries Instagram GraphQL/Embed endpoint via server-side stealth proxies, and returns structured media JSON.
- **Request Body:**
\`\`\`json
{ "url": "https://www.instagram.com/reel/CX9aB02_xYz/" }
\`\`\`
- **Response Structure:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "reel_CX9aB02_xYz",
    "type": "reel",
    "title": "Instagram Video",
    "author": { "username": "creator", "fullName": "Creator Name" },
    "qualities": [
      { "label": "1080p Full HD Video (MP4)", "format": "mp4", "downloadUrl": "/api/download?url=..." }
    ]
  }
}
\`\`\`

### **API Endpoint 2: \`GET /api/download\`**
- **Purpose:** Proxies video/audio streams directly from Instagram CDN with \`Content-Disposition: attachment; filename="reel_1080p.mp4"\` to force browser download dialog instead of playing in-browser.

---

## 4. End-to-End Data Flow Sequence

\`\`\`
User Browser              Vyzorax Stream Proxy           Instagram GraphQL / CDN
    │                             │                              │
    ├─── 1. Paste IG URL ────────>│                              │
    │                             ├── 2. Validate URL RegEx      │
    │                             ├── 3. Check Token Rate Limit │
    │                             ├── 4. Request Media Metadata >│
    │                             │<── 5. Return JSON Raw GraphQL ┤
    │                             ├── 6. Extract Direct CDN URLs │
    │<── 7. Render Result Card ───┤                              │
    │                             │                              │
    ├─── 8. Click "Download 1080p"─>│                              │
    │                             ├── 9. Stream media chunk ────>│
    │<── 10. Force File Save ─────┼<── 11. Return raw bytes ─────┤
\`\`\`

---

## 5. Security & Rate Limiting Plan

1. **Bot & Abuse Mitigation:**
   - **In-Memory Token Bucket Rate Limiting:** 15 extraction requests per IP per minute via Express Middleware.
   - **Concurrency Safety:** FFmpeg task limiter preventing CPU overload during peak traffic.
2. **HTTP Security Headers:**
   - \`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload\`
   - \`X-Content-Type-Options: nosniff\`
   - \`X-Frame-Options: DENY\`
   - \`Content-Security-Policy\` configured for Google AdSense and video CDN domains.
3. **SSRF & Input Sanitization:**
   - Strict RegEx whitelisting enforcing \`https://www.instagram.com/*\` domain origin only before making server requests.

---

## 6. Technical SEO & AdSense Strategy

1. **Dynamic OpenGraph & Metadata:** Custom dynamic OG images and title tags for \`/reel\`, \`/photo\`, \`/story\`, and \`/audio\`.
2. **Structured Data (Schema.org):**
   - \`WebApplication\` schema
   - \`HowTo\` schema for the 3-step download process
   - \`FAQPage\` schema for the accordion questions
3. **Google AdSense Policy Compliance:**
   - CLS (Cumulative Layout Shift) = 0 by reserving explicit width/height containers for ad slots.
   - Content-to-Ad ratio strictly maintained at 70:30.
   - Zero misleading download buttons or fake ad overlays.

---

## 7. Performance & Optimization

1. **Optimized Client Bundle:** Fast static shell pre-rendering for sub-100ms First Contentful Paint (FCP).
2. **Lazy Media Streaming:** Direct stream piping without storing files on disk.
3. **Asset Caching:** \`Cache-Control: public, max-age=86400\` for dynamic media thumbnails.

---

## 8. Future Scalability Plan

1. **Multi-Region Scale Deployment:** Containerized Node.js cluster deployed across high-speed edge regions.
2. **Fallback Proxy Cluster:** Automated rotative proxy pool for high-volume Instagram API request distribution.
3. **Redis Caching Layer:** Caching parsed Instagram shortcode responses for 1 hour to reduce upstream requests by 65%.
\`;(FCP).
2. **Dynamic Imports:** Lazy loading heavy video player and carousel modules.
3. **Asset Caching:** \`Cache-Control: public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400\` for dynamic media thumbnails.

---

## 8. Future Scalability Plan

1. **Multi-Region Scale Deployment:** Containerized cluster deployed across high-speed edge regions.
2. **Fallback Scraping Cluster:** Automated rotative proxy pool (BrightData / Oxylabs) for high-volume Instagram API bypass if rate-limited.
3. **Redis Caching Layer:** Caching parsed Instagram shortcode responses for 1 hour to reduce upstream requests by 65%.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullDocMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-hidden">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in">
        {/* Doc Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Software Architecture Specification
              </h2>
              <p className="text-xs text-slate-400">
                Production High-Performance Architecture & Security Plan
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex items-center space-x-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1.5 rounded-lg shrink-0 font-medium transition-all ${
              activeSection === 'all'
                ? 'bg-rose-500 text-white'
                : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            Full Architecture
          </button>
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg shrink-0 font-medium transition-all ${
                activeSection === sec.id
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {sec.icon}
              <span>{sec.title}</span>
            </button>
          ))}
        </div>

        {/* Document Content Scroll View */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 font-mono text-xs sm:text-sm text-slate-300 space-y-8 leading-relaxed">
          {/* Section 1: Folder Structure */}
          {(activeSection === 'all' || activeSection === 'folder') && (
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-base">
                <Layers className="w-5 h-5" />
                <span>1. Modular Directory Structure</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 text-slate-300 overflow-x-auto text-xs">
{`vyzorax-downloader/
├── server.ts                     # Express Server & Security Middleware
├── index.html                    # SPA HTML Shell
├── src/
│   ├── App.tsx                   # React Application Root
│   ├── components/               # Production UI Components
│   ├── server/                   # Mailer & Security Helper Modules
│   └── utils/                    # Instagram Parsing & Extraction Utilities
└── package.json                  # App Configuration & Dependencies`}
              </pre>
            </div>
          )}

          {/* Section 2: Component Architecture */}
          {(activeSection === 'all' || activeSection === 'components') && (
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-base">
                <Cpu className="w-5 h-5" />
                <span>2. Component Architecture & State Management</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-white mb-2 text-sm">Main Layout & Shell</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li><strong className="text-slate-200">App.tsx:</strong> View routing & global layout container</li>
                    <li><strong className="text-slate-200">FaqSection:</strong> Pre-rendered FAQ accordion with Schema.org script</li>
                    <li><strong className="text-slate-200">SeoFooter:</strong> Internal linking matrix & legal modal triggers</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-white mb-2 text-sm">Interactive Client Controls</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li><strong className="text-slate-200">HeroDownloader:</strong> Clipboard paste listener & URL validation</li>
                    <li><strong className="text-slate-200">MediaResultCard:</strong> Interactive video preview player & format selector</li>
                    <li><strong className="text-slate-200">AdSenseUnit:</strong> Dynamic ad hydration wrapper</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: API Architecture */}
          {(activeSection === 'all' || activeSection === 'api') && (
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-base">
                <Server className="w-5 h-5" />
                <span>3. API Architecture & Stream Proxying</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 text-slate-300 overflow-x-auto text-xs">
{`// Vyzorax Express Extract Route Endpoint: /api/extract
import { Request, Response } from 'express';

export async function handleExtract(req: Request, res: Response) {
  const { url } = req.body;
  
  // 1. Validate Instagram Domain
  if (!url || !url.includes('instagram.com')) {
    return res.status(400).json({ error: 'Invalid origin URL' });
  }

  // 2. Extract Media Metadata via Server Proxy
  const mediaData = await extractInstagramMedia(url);
  
  return res.json({ success: true, data: mediaData });
}`}
              </pre>
            </div>
          )}

          {/* Section 5: Security */}
          {(activeSection === 'all' || activeSection === 'security') && (
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-base">
                <Shield className="w-5 h-5" />
                <span>5. Security & Anti-Abuse Plan</span>
              </div>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                To guarantee production readiness and prevent server burnout from automated bots or scraping loops:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs font-sans text-slate-400">
                <li><strong className="text-white">Token Bucket Rate Limiting:</strong> Hard cap at 15 extraction requests per IP per minute.</li>
                <li><strong className="text-white">Content Security Policy (CSP):</strong> Explicit header limits allowed script sources to Google AdSense and verified CDN domains only.</li>
                <li><strong className="text-white">Zero Persistence Privacy:</strong> No URLs or downloadable files are written to disk. Streams are piped directly in-memory from CDN to browser.</li>
              </ul>
            </div>
          )}

          {/* Section 6: SEO Strategy */}
          {(activeSection === 'all' || activeSection === 'seo') && (
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-base">
                <BookOpen className="w-5 h-5" />
                <span>6. SEO & Google AdSense Optimization</span>
              </div>
              <div className="font-sans text-xs space-y-2 text-slate-300">
                <p><strong>Google AdSense Compliance:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>No overlapping elements or misleading "Download Now" ad units.</li>
                  <li>Reserved aspect ratio containers eliminate Cumulative Layout Shift (CLS = 0).</li>
                  <li>Full compliance with Google Publisher Policies (High quality context text around tool).</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Target Platform: Enterprise Cloud Container Cluster</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
