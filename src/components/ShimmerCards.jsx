import { motion } from 'framer-motion';

export default function ShimmerCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="glass rounded-2xl p-6 space-y-4"
        >
          {/* Title shimmer */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl shimmer" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-32 rounded-lg shimmer" />
              <div className="h-3 w-48 rounded-lg shimmer" />
            </div>
          </div>
          {/* Hook shimmer */}
          <div className="space-y-2 pt-2">
            <div className="h-3 w-full rounded-lg shimmer" />
            <div className="h-3 w-5/6 rounded-lg shimmer" />
          </div>
          {/* Caption shimmer */}
          <div className="space-y-2 pt-2">
            <div className="h-3 w-full rounded-lg shimmer" />
            <div className="h-3 w-full rounded-lg shimmer" />
            <div className="h-3 w-4/6 rounded-lg shimmer" />
          </div>
          {/* Bottom shimmer */}
          <div className="flex gap-2 pt-2">
            <div className="h-8 w-20 rounded-lg shimmer" />
            <div className="h-8 w-20 rounded-lg shimmer" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
