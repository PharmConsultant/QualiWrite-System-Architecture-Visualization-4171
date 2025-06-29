import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vqwkfvongfjffcwfnvoq.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxd2tmdm9uZ2ZqZmZjd2Zudm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTUxMzIsImV4cCI6MjA2NTkzMTEzMn0.eX9ARWc8ON2MujkWAID7doENzVCUa4N3jIln50Gi88M'

if(SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

export default supabase