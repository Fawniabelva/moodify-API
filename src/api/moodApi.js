import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON) {
  console.warn("Supabase env not set. Set VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY in .env");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// helpers returning { data, error }
export async function fetchMoods() {
  return supabase.from('moods').select('*').order('created_at', { ascending: false });
}

export async function fetchMoodById(id) {
  return supabase.from('moods').select('*').eq('id', id).single();
}

export async function createMood(payload) {
  // payload: { user_id, mood, note, mood_score }
  return supabase.from('moods').insert([payload]);
}

export async function deleteMood(id) {
  return supabase.from('moods').delete().eq('id', id);
}

export async function removeMood(id) {
  const { error } = await supabase
    .from('moods')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}
