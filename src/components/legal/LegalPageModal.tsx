import React, { useState } from 'react';
import {
  Shield,
  FileText,
  AlertTriangle,
  Cookie,
  Copyright,
  Mail,
  Info,
  Phone,
  Send,
  CheckCircle2,
  X,
  ExternalLink,
  MapPin,
  Clock,
  Globe,
  HelpCircle,
  Activity,
  Zap,
  CheckCircle
} from 'lucide-react';
import { LegalPageType, LEGAL_PAGES_META, CONTACT_DETAILS } from './legalContent';

interface LegalPageModalProps {
  isOpen: boolean;
  initialPage?: LegalPageType;
  onClose: () => void;
}

export const LegalPageModal: React.FC<LegalPageModalProps> = ({
  isOpen,
  initialPage = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalPageType>(initialPage);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
    website_hp: '', // Honeypot field for spam bot trap
  });

  if (!isOpen) return null;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSubmitting(true);
    setContactError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const json = await res.json();

      if (json.success) {
        setSubmittedEmail(contactForm.email);
        setContactSubmitted(true);
        setContactForm({ name: '', email: '', subject: 'General Inquiry', message: '', website_hp: '' });
      } else {
        setContactError(json.error?.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setContactError('Network error while sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] max-h-[750px]">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-slate-950/90 border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-row md:flex-col justify-between shrink-0 overflow-x-auto md:overflow-y-auto">
          <div>
            <div className="hidden md:flex items-center space-x-2.5 mb-6 px-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">Vyzorax Legal</span>
                <p className="text-[10px] text-slate-500">Trust &amp; Transparency</p>
              </div>
            </div>

            <nav className="flex md:flex-col space-x-1 md:space-x-0 md:space-y-1 w-full">
              <button
                onClick={() => setActiveTab('help')}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'help'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Help &amp; Guides</span>
              </button>

              <button
                onClick={() => setActiveTab('faq')}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'faq'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>FAQ</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'about'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Info className="w-4 h-4 shrink-0" />
                <span>About Us</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'contact'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Contact Us</span>
              </button>

              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'privacy'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Shield className="w-4 h-4 shrink-0" />
                <span>Privacy Policy</span>
              </button>

              <button
                onClick={() => setActiveTab('terms')}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'terms'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>Terms &amp; Conditions</span>
              </button>

              <button
                onClick={() => setActiveTab('dmca')}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'dmca'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Copyright className="w-4 h-4 shrink-0" />
                <span>DMCA Policy</span>
              </button>

              <button
                onClick={() => setActiveTab('cookies')}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'cookies'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Cookie className="w-4 h-4 shrink-0" />
                <span>Cookie Policy</span>
              </button>

              <button
                onClick={() => setActiveTab('disclaimer')}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'disclaimer'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Disclaimer</span>
              </button>

              <button
                onClick={() => setActiveTab('status')}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'status'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Activity className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>System Status</span>
              </button>
            </nav>
          </div>

          <div className="hidden md:block pt-6 border-t border-slate-800/80 px-2 text-[11px] text-slate-500 space-y-1">
            <p>Vyzorax.com Digital</p>
            <p className="text-emerald-400/90 font-medium">AdSense Compliant</p>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-hidden">
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/95">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                {LEGAL_PAGES_META[activeTab].title}
              </h2>
              <p className="text-[11px] text-slate-400">
                Effective &amp; Last Updated: {LEGAL_PAGES_META[activeTab].lastUpdated}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Page Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-slate-300 text-xs leading-relaxed">
            {/* PRIVACY POLICY */}
            {activeTab === 'privacy' && (
              <article className="space-y-4">
                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    1. Introduction &amp; Commitment to Privacy
                  </h3>
                  <p>
                    Welcome to <strong>Vyzorax.com</strong> ("we", "our", or "us"). We operate as a premier, free online <strong>Instagram reels downloader</strong> and media saving utility. We treat user privacy with absolute seriousness. This Privacy Policy details how we handle user interactions, browser data, and advertising compliance in accord with Google AdSense Policies, the General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA).
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    2. Ephemeral Data Processing &amp; No Log Policy
                  </h3>
                  <p>
                    Vyzorax.com operates on a strict <strong>Zero-Logging Ephemeral Architecture</strong>. When you paste an Instagram link (Reel, Video, Photo, Story, or Audio) to extract media:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    <li>We do <strong>NOT</strong> require account registration, usernames, or passwords.</li>
                    <li>We do <strong>NOT</strong> store target Instagram URLs, video binaries, or media files on our web servers.</li>
                    <li>We do <strong>NOT</strong> log or track user IP addresses, browser fingerprints, or download history.</li>
                    <li>All extraction calls occur transiently in server RAM and are purged immediately upon delivery.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    3. Advertising &amp; Third-Party Cookies (Google AdSense)
                  </h3>
                  <p>
                    Vyzorax.com uses Google AdSense to serve non-intrusive advertisements to support our free infrastructure.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    <li>Third-party vendors, including Google, use cookies to serve ads based on prior web visits.</li>
                    <li>Google’s use of advertising cookies enables it and its partners to serve ads based on your visit to Vyzorax.com and/or other sites on the Internet.</li>
                    <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-rose-400 underline">Google Ads Settings</a>.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    4. Contacting Us Regarding Your Data
                  </h3>
                  <p>
                    If you have questions regarding this Privacy Policy, feel free to email us at <strong className="text-white">{CONTACT_DETAILS.email}</strong> or call <strong className="text-white">{CONTACT_DETAILS.phone}</strong>.
                  </p>
                </section>
              </article>
            )}

            {/* TERMS & CONDITIONS */}
            {activeTab === 'terms' && (
              <article className="space-y-4">
                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    1. Acceptance of Terms
                  </h3>
                  <p>
                    By accessing and using <strong>Vyzorax.com</strong>, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must discontinue using our services immediately.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    2. Permitted Personal &amp; Fair Use Policy
                  </h3>
                  <p>
                    Vyzorax.com provides a web utility intended strictly for <strong>personal, non-commercial, offline educational viewing</strong> of publicly available media content:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    <li>You agree NOT to download, redistribute, or monetize copyrighted media without explicit permission from the original copyright holder.</li>
                    <li>You are solely responsible for ensuring that your downloading actions comply with applicable local intellectual property laws.</li>
                    <li>Vyzorax.com does not encourage or condone copyright infringement.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    3. Limitation of Liability
                  </h3>
                  <p>
                    Vyzorax.com is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind. Under no circumstances shall Vyzorax.com, its developers, or affiliates be liable for direct, indirect, incidental, or consequential damages resulting from the use or inability to use the site.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    4. Modifications to Service
                  </h3>
                  <p>
                    We reserve the right to modify, suspend, or terminate any aspect of the service at any time without prior notice.
                  </p>
                </section>
              </article>
            )}

            {/* DISCLAIMER */}
            {activeTab === 'disclaimer' && (
              <article className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-amber-200 mb-1">
                      Independent Third-Party Service Disclaimer
                    </h4>
                    <p className="text-xs text-amber-300/90 leading-relaxed">
                      Vyzorax.com is an independent utility software and is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with Instagram™, Meta Platforms, Inc., or Facebook™.
                    </p>
                  </div>
                </div>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    1. Trademark Notice
                  </h3>
                  <p>
                    The names <em>Instagram</em>, <em>Reels</em>, <em>IGTV</em>, <em>Meta</em>, as well as related names, marks, emblems, and images are registered trademarks of Meta Platforms, Inc. Use of these names on Vyzorax.com is purely for descriptive, nominative, and identification purposes under Fair Use guidelines.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    2. Content Ownership &amp; Hosting Disclosure
                  </h3>
                  <p>
                    Vyzorax.com does NOT host, store, archive, or re-transmit any media files on its servers. All videos, images, and audio files rendered through our service originate directly from the content delivery networks (CDNs) of Instagram and public third-party servers.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    3. Accuracy &amp; Availability
                  </h3>
                  <p>
                    While we endeavor to keep Vyzorax.com operational 24/7, Instagram periodically updates its API structures, which may lead to temporary service interruptions.
                  </p>
                </section>
              </article>
            )}

            {/* COOKIE POLICY */}
            {activeTab === 'cookies' && (
              <article className="space-y-4">
                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    1. What Are Cookies?
                  </h3>
                  <p>
                    Cookies are small text files stored in your web browser when you visit a website. They help customize your user experience and deliver non-disruptive advertisements.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    2. Types of Cookies We Use
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <strong className="text-white">Essential Preference Cookies:</strong> Used to remember your local preferences (e.g. Dark Theme, recent quality selections). These contain no personally identifiable info.
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <strong className="text-white">Google AdSense Advertising Cookies:</strong> Placed by Google to deliver personalized or non-personalized ads.
                    </div>
                  </div>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    3. Managing &amp; Disabling Cookies
                  </h3>
                  <p>
                    You can manage or disable cookies directly through your browser settings. Visit <a href="https://aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-rose-400 underline">AboutCookies.org</a> for step-by-step guides for Chrome, Firefox, Safari, and Edge.
                  </p>
                </section>
              </article>
            )}

            {/* DMCA POLICY */}
            {activeTab === 'dmca' && (
              <article className="space-y-4">
                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    Digital Millennium Copyright Act ("DMCA") Notice Policy
                  </h3>
                  <p>
                    Vyzorax.com respects the intellectual property rights of others and complies strictly with the Digital Millennium Copyright Act (17 U.S.C. § 512). As an automated technical service provider, we do not host media on our infrastructure.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    Submitting a Copyright Takedown Notice
                  </h3>
                  <p>
                    If you are a copyright owner or authorized representative and believe that a link processed through Vyzorax.com infringes your copyright, please send an official notice to our Designated Copyright Agent:
                  </p>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 font-mono text-xs">
                    <div><strong className="text-slate-400">Designated Agent:</strong> Vyzorax DMCA Compliance Office</div>
                    <div><strong className="text-slate-400">Email:</strong> <a href={`mailto:${CONTACT_DETAILS.dmcaEmail}`} className="text-rose-400 underline">{CONTACT_DETAILS.dmcaEmail}</a></div>
                    <div><strong className="text-slate-400">Phone:</strong> {CONTACT_DETAILS.phone}</div>
                    <div><strong className="text-slate-400">Response Time:</strong> Within 24-48 Hours</div>
                  </div>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    Required Information in DMCA Notice
                  </h3>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-400">
                    <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
                    <li>Identification of the copyrighted work claimed to have been infringed.</li>
                    <li>The exact URL on Instagram or Vyzorax.com.</li>
                    <li>Your contact info (Address, Telephone Number, Email).</li>
                    <li>A statement of good faith belief that the use is unauthorized.</li>
                  </ol>
                </section>
              </article>
            )}

            {/* CONTACT US */}
            {activeTab === 'contact' && (
              <article className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contact Info Cards */}
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase">Official Phone</div>
                        <a href={`tel:${CONTACT_DETAILS.phone}`} className="text-sm font-bold text-white hover:text-rose-400 transition-colors">
                          {CONTACT_DETAILS.phone}
                        </a>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase">Support Email</div>
                        <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-sm font-bold text-white hover:text-rose-400 transition-colors">
                          {CONTACT_DETAILS.email}
                        </a>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase">SLA &amp; Hours</div>
                        <div className="text-xs font-bold text-white">
                          24/7 Monitoring • Response {CONTACT_DETAILS.responseSLA}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Contact Form */}
                  <form onSubmit={handleContactSubmit} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <h4 className="font-bold text-white text-sm flex items-center justify-between">
                      <span>Send Direct Inquiry</span>
                      <span className="text-[10px] text-slate-500 font-normal">Secure Dispatch</span>
                    </h4>

                    {contactError && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{contactError}</span>
                      </div>
                    )}

                    {contactSubmitted ? (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-2 text-xs">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <strong className="text-white">Inquiry Sent Successfully!</strong>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          Your message has been delivered to <strong>contact@vyzorax.com</strong>.
                        </p>
                        <p className="text-emerald-400 font-medium bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                          📩 A confirmation notification email with the message <strong>"We will get back to you"</strong> has been dispatched to <strong>{submittedEmail}</strong>.
                        </p>
                        <button
                          type="button"
                          onClick={() => setContactSubmitted(false)}
                          className="mt-2 text-[11px] text-slate-400 hover:text-white underline"
                        >
                          Send another message
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Hidden Honeypot Field for Spam Protection */}
                        <div className="hidden" aria-hidden="true">
                          <input
                            type="text"
                            name="website_hp"
                            tabIndex={-1}
                            autoComplete="off"
                            value={contactForm.website_hp}
                            onChange={(e) => setContactForm({ ...contactForm, website_hp: e.target.value })}
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            required
                            placeholder="Your Email (e.g. contact@vyzorax.com)"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Subject (Optional)"
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                          />
                        </div>
                        <div>
                          <textarea
                            required
                            rows={3}
                            placeholder="Your message or feedback regarding Vyzorax.com..."
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 resize-none transition-colors"
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-90 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-rose-500/25 transition-all"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Sending Inquiry...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Submit Message</span>
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </article>
            )}

            {/* HELP & TROUBLESHOOTING */}
            {activeTab === 'help' && (
              <article className="space-y-4">
                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    Help Center &amp; Quick Start Guide
                  </h3>
                  <p>
                    Follow these simple steps to download Instagram Reels, Stories, Photos, Carousel posts, and Audio tracks in 1080p Full HD:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-slate-300">
                    <li><strong>Copy Link:</strong> Open the Instagram app or website, tap the share icon on any Reel or Post, and select <em>Copy Link</em>.</li>
                    <li><strong>Paste in Vyzorax:</strong> Navigate to Vyzorax.com, paste the link into the search bar, and tap the <strong>Download</strong> button.</li>
                    <li><strong>Save File:</strong> Choose your preferred resolution (1080p, 720p, 480p or 320kbps MP3) and click Download to save the file to your device.</li>
                  </ol>
                </section>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    Common Issues &amp; Fixes
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                      <div className="font-bold text-rose-400 text-xs">Why does it say "Private Account Content"?</div>
                      <p className="text-slate-400 text-[11px]">Vyzorax strictly respects Instagram privacy parameters. We only extract media from public profiles. Private account media cannot be parsed without explicit authorization.</p>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                      <div className="font-bold text-rose-400 text-xs">Download opens in player instead of saving on iPhone?</div>
                      <p className="text-slate-400 text-[11px]">On iOS Safari, long-press the Download button and select <em>"Download Linked File"</em> to save directly to Safari Downloads / Files app.</p>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                      <div className="font-bold text-rose-400 text-xs">Video audio is muted or silent?</div>
                      <p className="text-slate-400 text-[11px]">Make sure to download the MP4 format or use our dedicated <strong>Audio Extraction</strong> option to download pure 320kbps MP3.</p>
                    </div>
                  </div>
                </section>
              </article>
            )}

            {/* FAQ */}
            {activeTab === 'faq' && (
              <article className="space-y-4">
                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                      <div className="font-bold text-white text-xs">Is Vyzorax completely free to use?</div>
                      <p className="text-slate-400 text-[11px]">Yes! Vyzorax is 100% free with unlimited downloads, no daily limits, and no paid subscriptions required.</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                      <div className="font-bold text-white text-xs">Do I need an account or software installation?</div>
                      <p className="text-slate-400 text-[11px]">No account registration or browser extension is needed. Vyzorax runs entirely in your web browser.</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                      <div className="font-bold text-white text-xs">Are downloaded videos saved in 1080p HD quality?</div>
                      <p className="text-slate-400 text-[11px]">Yes, Vyzorax extracts media in its original maximum resolution up to 1080p Full HD without watermarks.</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                      <div className="font-bold text-white text-xs">Can I download Instagram Stories anonymously?</div>
                      <p className="text-slate-400 text-[11px]">Yes, downloading Stories via Vyzorax is completely anonymous and does not alert the story owner.</p>
                    </div>
                  </div>
                </section>
              </article>
            )}

            {/* SYSTEM STATUS */}
            {activeTab === 'status' && (
              <article className="space-y-4">
                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1 flex items-center justify-between">
                    <span>System Operational Status</span>
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>All Systems Normal</span>
                    </span>
                  </h3>
                  <p className="text-slate-400 text-[11px]">
                    Live node latencies, GraphQL parser health, and regional proxy cluster status updated in real-time.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Reel Downloader Engine</div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">GraphQL Proxy Nodes</span>
                      <span className="text-emerald-400 font-mono text-xs font-bold">110ms • Operational</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Story &amp; Photo Saver</div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">CDNs &amp; Static Edge</span>
                      <span className="text-emerald-400 font-mono text-xs font-bold">95ms • Operational</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">MP3 Audio Converter</div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">FFmpeg Stream Nodes</span>
                      <span className="text-emerald-400 font-mono text-xs font-bold">145ms • Operational</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Overall System Uptime</div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">30-Day Availability</span>
                      <span className="text-emerald-400 font-mono text-xs font-bold">99.98%</span>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* ABOUT US */}
            {activeTab === 'about' && (
              <article className="space-y-4">
                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    About Vyzorax.com — The Next-Gen Instagram Media Downloader
                  </h3>
                  <p>
                    <strong>Vyzorax.com</strong> was engineered with a clear mission: to offer content creators, social media managers, and digital enthusiasts the fastest, cleanest, and most reliable <strong>free online Instagram reels downloader</strong> on the web.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-1">
                    <div className="text-lg font-black text-rose-400">1080p HD</div>
                    <div className="text-xs font-bold text-white">Full Quality</div>
                    <p className="text-[10px] text-slate-500">Zero compression loss on downloaded reels.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-1">
                    <div className="text-lg font-black text-emerald-400">&lt; 1 Sec</div>
                    <div className="text-xs font-bold text-white">Instant Engine</div>
                    <p className="text-[10px] text-slate-500">Lightning fast GraphQL parsing engine.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-1">
                    <div className="text-lg font-black text-purple-400">100% Free</div>
                    <div className="text-xs font-bold text-white">No Signup</div>
                    <p className="text-[10px] text-slate-500">No software installation or account required.</p>
                  </div>
                </div>

                <section className="space-y-2">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1">
                    Our Core Values
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    <li><strong className="text-slate-200">User Privacy First:</strong> Zero tracking, cookieless default, ephemeral processing.</li>
                    <li><strong className="text-slate-200">High-Performance UX:</strong> Clean layout built with React &amp; Tailwind CSS with zero layout shift.</li>
                    <li><strong className="text-slate-200">AdSense Integrity:</strong> Fully transparent advertising compliant with Google Webmaster Standards.</li>
                  </ul>
                </section>
              </article>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>© {new Date().getFullYear()} Vyzorax.com Digital</span>
            <div className="flex items-center space-x-3">
              <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-rose-400 transition-colors">
                {CONTACT_DETAILS.email}
              </a>
              <span>•</span>
              <a href={`tel:${CONTACT_DETAILS.phone}`} className="hover:text-rose-400 transition-colors">
                {CONTACT_DETAILS.phone}
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
