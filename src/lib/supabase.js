import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ──────────────────────────────────────────────
   Supabase SQL to create the profiles table:

   CREATE TABLE profiles (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     visitor_id TEXT UNIQUE NOT NULL,
     usage_count INT DEFAULT 0,
     is_premium BOOLEAN DEFAULT false,
     created_at TIMESTAMPTZ DEFAULT now(),
     updated_at TIMESTAMPTZ DEFAULT now()
   );

   CREATE TABLE processed_urls (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     visitor_id TEXT NOT NULL,
     youtube_url TEXT NOT NULL,
     processed_at TIMESTAMPTZ DEFAULT now()
   );

   CREATE INDEX idx_profiles_visitor ON profiles(visitor_id);
   CREATE INDEX idx_urls_processed ON processed_urls(processed_at DESC);
────────────────────────────────────────────── */
