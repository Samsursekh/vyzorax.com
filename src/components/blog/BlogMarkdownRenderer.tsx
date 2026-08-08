import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, ExternalLink } from 'lucide-react';

interface BlogMarkdownRendererProps {
  content: string;
}

export const BlogMarkdownRenderer: React.FC<BlogMarkdownRendererProps> = ({ content }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  let codeBlockCounter = 0;

  return (
    <div className="blog-content prose prose-invert prose-rose max-w-none text-slate-300 leading-relaxed space-y-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Heading 1 with ID generation for Table of Contents
          h1: ({ children }) => {
            const textStr = String(children);
            const id = textStr
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-');
            return (
              <h1
                id={id}
                className="scroll-mt-24 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-8 mb-4 border-b border-slate-800 pb-3"
              >
                {children}
              </h1>
            );
          },
          // Heading 2
          h2: ({ children }) => {
            const textStr = String(children);
            const id = textStr
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-');
            return (
              <h2
                id={id}
                className="scroll-mt-24 text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mt-8 mb-3 flex items-center gap-2 group"
              >
                <span className="text-rose-500 font-mono text-lg select-none">#</span>
                <span>{children}</span>
              </h2>
            );
          },
          // Heading 3
          h3: ({ children }) => {
            const textStr = String(children);
            const id = textStr
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-');
            return (
              <h3
                id={id}
                className="scroll-mt-24 text-lg font-semibold text-slate-200 mt-6 mb-2"
              >
                {children}
              </h3>
            );
          },
          // Pre wrapper override to prevent nested pre/p hydration issues
          pre: ({ children }) => <>{children}</>,
          // Paragraph
          p: ({ children }) => <p className="text-slate-300 text-base leading-7 my-4">{children}</p>,
          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-rose-500 bg-slate-900/80 p-4 rounded-r-xl text-slate-200 italic shadow-inner">
              {children}
            </blockquote>
          ),
          // Code Block & Inline Code
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            const isBlock = inline === false || Boolean(match) || (codeString.includes('\n') && inline !== true);

            if (isBlock) {
              const currentCodeIndex = ++codeBlockCounter;
              const isCopied = copiedCodeIndex === currentCodeIndex;

              return (
                <div className="relative my-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl group">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs text-slate-400 font-mono">
                    <span className="uppercase tracking-wider font-semibold text-rose-400">
                      {match ? match[1] : 'code'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(codeString, currentCodeIndex)}
                      className="flex items-center space-x-1.5 text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 transition-colors"
                      title="Copy snippet"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-sans font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="font-sans font-medium">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm font-mono text-emerald-300 leading-relaxed selection:bg-rose-500/30">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            }

            return (
              <code
                className="px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 text-sm font-mono border border-slate-700/60"
                {...props}
              >
                {children}
              </code>
            );
          },
          // Lists
          ul: ({ children }) => <ul className="list-disc list-inside space-y-2 my-4 text-slate-300">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 my-4 text-slate-300">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-rose-400 hover:text-rose-300 underline underline-offset-4 font-medium transition-colors"
            >
              <span>{children}</span>
              <ExternalLink className="w-3 h-3 inline" />
            </a>
          ),
          // Table
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-slate-800 shadow-md">
              <table className="w-full text-left text-sm text-slate-300 border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-slate-900 border-b border-slate-800 text-slate-100 font-semibold">{children}</thead>,
          tbody: ({ children }) => <tbody className="divide-y divide-slate-800 bg-slate-950/50">{children}</tbody>,
          tr: ({ children }) => <tr className="hover:bg-slate-900/50 transition-colors">{children}</tr>,
          th: ({ children }) => <th className="p-3 font-semibold text-rose-400">{children}</th>,
          td: ({ children }) => <td className="p-3">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
