import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Hash, MessageCircle, MousePointerClick } from 'lucide-react';

export default function RemixCard({ remix, index }) {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const { result } = remix;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 hover:border-white/15 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ backgroundColor: `${remix.color}15`, border: `1px solid ${remix.color}30` }}
        >
          {remix.emoji}
        </div>
        <div>
          <h3 className="text-base font-semibold text-text-primary">{remix.name}</h3>
          <p className="text-xs text-text-muted">{remix.description}</p>
        </div>
      </div>

      {/* Hook */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <MousePointerClick className="w-3.5 h-3.5 text-text-muted" />
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Hook</span>
          <CopyButton
            onClick={() => handleCopy(result.hook, `hook-${index}`)}
            copied={copiedField === `hook-${index}`}
          />
        </div>
        <p className="text-sm text-text-primary leading-relaxed pl-5">
          {result.hook}
        </p>
      </div>

      {/* Caption */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <MessageCircle className="w-3.5 h-3.5 text-text-muted" />
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Caption</span>
          <CopyButton
            onClick={() => handleCopy(result.caption, `caption-${index}`)}
            copied={copiedField === `caption-${index}`}
          />
        </div>
        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line pl-5">
          {result.caption}
        </p>
      </div>

      {/* CTA */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider pl-5">CTA</span>
        </div>
        <p className="text-sm text-emerald font-medium pl-5">{result.cta}</p>
      </div>

      {/* Hashtags */}
      <div className="flex items-center gap-2 flex-wrap">
        <Hash className="w-3.5 h-3.5 text-text-muted" />
        {result.hashtags.split(' ').map((tag, i) => (
          <span
            key={i}
            className="text-xs px-2.5 py-1 rounded-full text-text-secondary"
            style={{ backgroundColor: `${remix.color}10`, border: `1px solid ${remix.color}20` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Copy All */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <button
          onClick={() => handleCopy(
            `🎣 HOOK:\n${result.hook}\n\n📝 CAPTION:\n${result.caption}\n\n💡 CTA:\n${result.cta}\n\n${result.hashtags}`,
            `all-${index}`
          )}
          className="w-full py-2.5 rounded-xl text-sm font-medium text-text-secondary
                     bg-white/3 border border-white/5 hover:bg-white/6 hover:border-white/10 
                     transition-all duration-200 flex items-center justify-center gap-2"
        >
          {copiedField === `all-${index}` ? (
            <><Check className="w-4 h-4 text-emerald" /> Copied!</>
          ) : (
            <><Copy className="w-4 h-4" /> Copy Full Remix</>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function CopyButton({ onClick, copied }) {
  return (
    <button
      onClick={onClick}
      className="ml-auto p-1 rounded-md hover:bg-white/5 transition-colors"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-text-muted hover:text-text-secondary" />
      )}
    </button>
  );
}
