import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { generateRemixes } from '../lib/remixer';
import { getUsageCount, incrementUsage, hasReachedLimit, getRemainingUses, isPremium, getVisitorId } from '../lib/usage';
import { supabase } from '../lib/supabase';
import ShimmerCards from './ShimmerCards';
import RemixCard from './RemixCard';
import PaywallModal from './PaywallModal';

export default function RemixEngine() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [remixes, setRemixes] = useState(null);
  const [error, setError] = useState('');
  const [showPaywall, setShowPaywall] = useState(false);
  const engineRef = useRef(null);

  const isValidYouTubeUrl = (str) => {
    try {
      const u = new URL(str);
      return (
        (u.hostname.includes('youtube.com') && u.searchParams.has('v')) ||
        u.hostname.includes('youtu.be')
      );
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setRemixes(null);

    if (!url.trim()) {
      setError('Please paste a YouTube URL to get started.');
      return;
    }

    if (!isValidYouTubeUrl(url.trim())) {
      setError('Please enter a valid YouTube URL (e.g. youtube.com/watch?v=...)');
      return;
    }

    // Check paywall
    if (hasReachedLimit()) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);

    // Track in Supabase (fire-and-forget)
    try {
      const visitorId = getVisitorId();
      await supabase.from('processed_urls').insert({
        visitor_id: visitorId,
        youtube_url: url.trim(),
      });
      await supabase
        .from('profiles')
        .upsert(
          { visitor_id: visitorId, usage_count: getUsageCount() + 1 },
          { onConflict: 'visitor_id' }
        );
    } catch {
      // Silent-fail Supabase tracking
    }

    // Simulate AI processing (3 second shimmer)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const results = generateRemixes(url.trim());
    incrementUsage();
    setRemixes(results);
    setLoading(false);
  };

  const remaining = getRemainingUses();
  const premium = isPremium();

  return (
    <>
      <section ref={engineRef} id="remix-engine" className="px-6 py-20 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Remix Engine
          </h2>
          <p className="text-text-secondary mt-3 text-lg">
            Paste a link. Get 5 platform-ready content variations.
          </p>
        </motion.div>

        {/* Input Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 max-w-2xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                id="youtube-url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="input-glass pl-11"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Remix It</>
              )}
            </button>
          </div>

          {/* Usage indicator */}
          <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
            <span>
              {premium ? (
                <span className="text-emerald flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Unlimited Access
                </span>
              ) : (
                `${remaining} free remix${remaining !== 1 ? 'es' : ''} remaining`
              )}
            </span>
            {!premium && (
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i < getUsageCount() ? 'bg-emerald' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 flex items-center gap-2 text-sm text-red-400"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Shimmer Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ShimmerCards />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {remixes && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
            >
              {remixes.map((remix, i) => (
                <RemixCard key={remix.id} remix={remix} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Paywall */}
      <AnimatePresence>
        {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
      </AnimatePresence>
    </>
  );
}
