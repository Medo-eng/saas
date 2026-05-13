import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Eye,
  EyeOff,
  Users,
  UserCheck,
  CreditCard,
  Link2,
  LogOut,
  BarChart3,
  Loader2,
  Zap,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const MASTER_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'scriptvibe-admin-2024';

export default function AdminPortal() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ visitors: 0, freeTrials: 0, conversions: 0 });
  const [recentUrls, setRecentUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === MASTER_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid master password.');
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Get total visitor count
        const { count: visitorCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Get free trial users (non-premium with usage > 0)
        const { count: freeCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_premium', false)
          .gt('usage_count', 0);

        // Get conversion count
        const { count: premiumCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_premium', true);

        setStats({
          visitors: visitorCount || 0,
          freeTrials: freeCount || 0,
          conversions: premiumCount || 0,
        });

        // Get last 20 processed urls
        const { data: urls } = await supabase
          .from('processed_urls')
          .select('*')
          .order('processed_at', { ascending: false })
          .limit(20);

        setRecentUrls(urls || []);
      } catch (err) {
        console.error('Admin fetch error:', err);
      }
      setLoading(false);
    };

    fetchData();
  }, [authenticated]);

  // ─── Login Screen ─────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 max-w-sm w-full"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald/20 to-electric/20 border border-emerald/30 mx-auto mb-6 flex items-center justify-center">
            <Lock className="w-6 h-6 text-emerald" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-center mb-1">
            Admin Portal
          </h1>
          <p className="text-sm text-text-muted text-center mb-6">
            Enter the master password to continue.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Master Password"
                className="input-glass pr-12"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/5"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-text-muted" />
                ) : (
                  <Eye className="w-4 h-4 text-text-muted" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit" className="btn-primary w-full">
              Authenticate
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ─── Dashboard ────────────────────────────────────────
  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald to-electric flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Admin Dashboard</h1>
              <p className="text-xs text-text-muted">ScriptVibe AI Analytics</p>
            </div>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="glass px-4 py-2 text-sm text-text-secondary flex items-center gap-2 hover:bg-white/5 transition-colors rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-emerald animate-spin" />
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <StatCard
                icon={<Users className="w-5 h-5 text-emerald" />}
                label="Total Visitors"
                value={stats.visitors}
                delay={0}
              />
              <StatCard
                icon={<UserCheck className="w-5 h-5 text-electric" />}
                label="Active Free Trials"
                value={stats.freeTrials}
                delay={0.1}
              />
              <StatCard
                icon={<CreditCard className="w-5 h-5 text-emerald" />}
                label="Total Conversions"
                value={stats.conversions}
                delay={0.2}
              />
            </div>

            {/* Recent URLs Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald" />
                <h2 className="text-sm font-semibold">Recent Processed URLs</h2>
                <span className="text-xs text-text-muted ml-auto">Last 20</span>
              </div>

              {recentUrls.length === 0 ? (
                <div className="px-6 py-12 text-center text-text-muted text-sm">
                  No URLs processed yet. Data will appear here once users start remixing.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5 text-text-muted text-xs uppercase tracking-wider">
                        <th className="text-left px-6 py-3 font-medium">#</th>
                        <th className="text-left px-6 py-3 font-medium">YouTube URL</th>
                        <th className="text-left px-6 py-3 font-medium">Visitor</th>
                        <th className="text-left px-6 py-3 font-medium">Processed At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUrls.map((item, i) => (
                        <tr
                          key={item.id}
                          className="border-b border-white/3 hover:bg-white/2 transition-colors"
                        >
                          <td className="px-6 py-3 text-text-muted">{i + 1}</td>
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2 max-w-md">
                              <Link2 className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                              <span className="truncate text-text-secondary">
                                {item.youtube_url}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-text-muted font-mono text-xs">
                            {item.visitor_id?.slice(0, 8)}...
                          </td>
                          <td className="px-6 py-3 text-text-muted">
                            {new Date(item.processed_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm text-text-muted">{label}</span>
      </div>
      <p className="text-3xl font-semibold tracking-tight">{value.toLocaleString()}</p>
    </motion.div>
  );
}
