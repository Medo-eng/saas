import { motion } from 'framer-motion';
import { ArrowRight, Play, Wand2, TrendingUp } from 'lucide-react';

export default function Hero({ onScrollToEngine }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center section-spacing text-center">
      <div className="container-custom flex flex-col items-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass px-5 py-2 mb-8 text-sm text-text-secondary flex items-center gap-2"
      >
        <TrendingUp className="w-4 h-4 text-emerald" />
        <span>Trusted by 200+ content agencies worldwide</span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight max-w-4xl leading-[1.08]"
      >
        Turn Viral YouTube Noise into{' '}
        <span className="bg-gradient-to-r from-emerald to-electric bg-clip-text text-transparent">
          Structured Social Gold
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed"
      >
        Paste any YouTube URL. Get 5 AI-powered content remixes optimized for
        TikTok, Instagram Reels, LinkedIn, and X — in seconds.
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onScrollToEngine}
        className="btn-primary mt-10 flex items-center gap-2 text-base"
      >
        <Wand2 className="w-5 h-5" />
        Start Remixing — Free
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-8 text-text-muted text-sm"
      >
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          <span>YouTube Compatible</span>
        </div>
        <div className="w-px h-4 bg-white/10 hidden sm:block" />
        <span>5 Unique Styles</span>
        <div className="w-px h-4 bg-white/10 hidden sm:block" />
        <span>4 Free Remixes</span>
        <div className="w-px h-4 bg-white/10 hidden sm:block" />
        <span>No Sign-up Required</span>
      </motion.div>

      {/* Gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="mt-20 w-full max-w-md h-px bg-gradient-to-r from-transparent via-emerald/30 to-transparent"
      />
      </div>
    </section>
  );
}
