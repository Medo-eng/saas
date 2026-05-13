import { motion } from 'framer-motion';
import {
  Wand2,
  Copy,
  BarChart3,
  Globe2,
  Layers,
  ShieldCheck,
} from 'lucide-react';

const features = [
  {
    icon: <Wand2 className="w-5 h-5" />,
    title: '5 Unique Remix Styles',
    desc: 'Aggressor, Storyteller, Educator, Mystery, Comedian — each engineered for maximum engagement.',
  },
  {
    icon: <Copy className="w-5 h-5" />,
    title: 'One-Click Copy',
    desc: 'Copy hooks, captions, CTAs, and hashtags individually or as a complete remix.',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Agency Analytics',
    desc: 'Track usage, conversions, and processed URLs from a private admin dashboard.',
  },
  {
    icon: <Globe2 className="w-5 h-5" />,
    title: 'Built for Global Agencies',
    desc: 'Designed for international content teams scaling across TikTok, Reels, LinkedIn, and X.',
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: 'Multi-Platform Output',
    desc: 'Each remix is structured for the optimal format of every major social platform.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Secure & Compliant',
    desc: 'Paddle handles VAT, sales tax, and compliance as Merchant of Record.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Why Agencies Choose{' '}
          <span className="bg-gradient-to-r from-emerald to-electric bg-clip-text text-transparent">
            ScriptVibe
          </span>
        </h2>
        <p className="text-text-secondary mt-3 text-lg max-w-xl mx-auto">
          Everything you need to transform viral content into a structured
          social media playbook.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="glass glass-hover rounded-2xl p-6 cursor-default transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center text-emerald mb-4">
              {f.icon}
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-1.5">
              {f.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
