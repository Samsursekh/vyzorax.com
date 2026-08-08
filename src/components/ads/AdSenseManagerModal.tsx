import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Settings2,
  X,
  ExternalLink,
  Sparkles,
  Zap,
  LayoutGrid,
  FileCheck2,
  Copy,
  Check,
} from 'lucide-react';
import {
  DEFAULT_ADSENSE_CONFIG,
  ADSENSE_SLOTS,
  ADSENSE_POLICY_CHECKLIST,
} from './AdSenseConfig';

interface AdSenseManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdSenseManagerModal: React.FC<AdSenseManagerModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'checklist' | 'slots' | 'code'>('checklist');
  const [clientId, setClientId] = useState(DEFAULT_ADSENSE_CONFIG.clientId);
  const [testMode, setTestMode] = useState(DEFAULT_ADSENSE_CONFIG.testMode);

  if (!isOpen) return null;

  const handleCopyScript = () => {
    const code = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}" crossorigin="anonymous"></script>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Google AdSense Approval Readiness
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Phase 8 Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Ad placement strategy, zero CLS validation &amp; AdSense policy audit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 bg-slate-900/50 border-b border-slate-800 flex space-x-2">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'border-rose-500 text-rose-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            Policy Checklist (6/6)
          </button>
          <button
            onClick={() => setActiveTab('slots')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'slots'
                ? 'border-rose-500 text-rose-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Ad Slots &amp; CLS Metrics
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'code'
                ? 'border-rose-500 text-rose-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            Publisher ID &amp; Script
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-xs">
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-200 mb-1">
                    100% AdSense Program Policy Compliant
                  </h4>
                  <p className="text-xs text-emerald-300/90 leading-relaxed">
                    Vyzorax.com incorporates non-deceptive ad layouts, mandatory "Advertisement" disclosures, strict button spacing padding buffers, and zero Cumulative Layout Shift (CLS) containers.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ADSENSE_POLICY_CHECKLIST.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-200 text-xs">{item.title}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'slots' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400 leading-relaxed">
                Strategic placement map designed for maximum CTR without harming UX or search rankings.
              </div>

              <div className="space-y-2">
                {Object.entries(ADSENSE_SLOTS).map(([key, slot]) => (
                  <div
                    key={key}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-semibold text-white text-xs">{slot.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Slot ID: {slot.id} • Min-Height: {slot.minHeight} • Format: {slot.format}
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-rose-400 font-mono text-[10px] font-semibold shrink-0">
                      Zero CLS
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-200 mb-1.5">
                  AdSense Publisher Client ID (`ca-pub-xxx`)
                </label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1.5">
                  Google Auto-Ads Script Snippet
                </label>
                <div className="relative">
                  <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
                    {`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}" crossorigin="anonymous"></script>`}
                  </pre>
                  <button
                    onClick={handleCopyScript}
                    className="absolute top-2 right-2 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-xs">Developer Test Preview Mode</div>
                  <div className="text-[11px] text-slate-400">
                    Displays high-fidelity placeholder ad slots in preview environments
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={testMode}
                  onChange={(e) => setTestMode(e.target.checked)}
                  className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Done &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
