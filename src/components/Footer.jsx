import { Zap, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald to-electric flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-text-secondary">
            ScriptVibe AI
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} ScriptVibe</span>
          <a href="#" className="hover:text-text-secondary transition-colors">Privacy</a>
          <a href="#" className="hover:text-text-secondary transition-colors">Terms</a>
        </div>

        {/* Social */}
        <div className="flex items-center gap-3">
          <a href="#" className="p-2 rounded-lg hover:bg-white/5 transition-colors text-text-muted hover:text-text-secondary">
            <Share2 className="w-4 h-4" />
          </a>
          <a href="#" className="p-2 rounded-lg hover:bg-white/5 transition-colors text-text-muted hover:text-text-secondary">
            <Globe className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
