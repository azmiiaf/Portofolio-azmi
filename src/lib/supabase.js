import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
// Jika tersedia SUPABASE_SERVICE_ROLE_KEY (khusus server), pakai untuk bypass RLS
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || anon

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-anon-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
)
