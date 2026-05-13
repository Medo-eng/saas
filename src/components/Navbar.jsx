import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald to-electric flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-text-primary">
            ScriptVibe
            <span className="text-emerald ml-1 text-sm font-medium">AI</span>
          </span>
        </div>

        {/* Status Badge */}
        <div className="glass px-4 py-2 flex items-center gap-2 text-sm text-text-secondary">
          <div className="pulse-dot" />
          <span>Live</span>
          <span className="hidden sm:inline text-text-muted">•</span>
          <span className="hidden sm:inline">Powered by AI</span>
          <Sparkles className="w-3.5 h-3.5 text-emerald hidden sm:block" />
        </div>
      </div>
    </motion.nav>
  );
}
