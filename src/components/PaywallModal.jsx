import { motion } from 'framer-motion';
import { X, Lock, CreditCard, Sparkles, Shield, Zap } from 'lucide-react';

export default function PaywallModal({ onClose }) {
  const handleCheckout = () => {
    // Paddle.js integration
    if (window.Paddle) {
      window.Paddle.Checkout.open({
        product: import.meta.env.VITE_PADDLE_PRODUCT_ID || 'pri_demo',
        successCallback: () => {
          // After successful payment, update local storage
          localStorage.setItem('scriptvibe_premium', 'true');
          onClose();
          window.location.reload();
        },
      });
    } else {
      // Fallback: open Paddle in new tab or show message
      alert('Payment system loading... Please try again in a moment.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative glass rounded-2xl p-8 max-w-md w-full text-center glow-emerald"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5 text-text-muted" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald/20 to-electric/20 border border-emerald/30 mx-auto mb-6 flex items-center justify-center">
          <Lock className="w-7 h-7 text-emerald" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-semibold tracking-tight mb-2">
          Unlock Unlimited Access
        </h3>
        <p className="text-text-secondary text-sm mb-6">
          You've used all 4 free remixes. Upgrade to ScriptVibe Pro
          and remix unlimited content — forever.
        </p>

        {/* Price */}
        <div className="glass rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-text-primary">$29</span>
            <span className="text-text-muted text-sm">/month</span>
          </div>
          <p className="text-text-muted text-xs mt-1">Cancel anytime. No questions asked.</p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6 text-sm text-left">
          <Feature icon={<Sparkles className="w-4 h-4 text-emerald" />} text="Unlimited content remixes" />
          <Feature icon={<Zap className="w-4 h-4 text-emerald" />} text="Priority AI processing" />
          <Feature icon={<Shield className="w-4 h-4 text-emerald" />} text="Early access to new remix styles" />
          <Feature icon={<CreditCard className="w-4 h-4 text-emerald" />} text="Secure checkout via Paddle" />
        </div>

        {/* CTA */}
        <button
          id="paywall-unlock-btn"
          onClick={handleCheckout}
          className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          Unlock Now — $29/mo
        </button>

        <p className="text-text-muted text-xs mt-4">
          Powered by Paddle • Merchant of Record • VAT included
        </p>
      </motion.div>
    </motion.div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3 px-2">
      {icon}
      <span className="text-text-secondary">{text}</span>
    </div>
  );
}
