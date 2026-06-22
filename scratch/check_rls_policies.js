import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // We can query pg_policies indirectly using RPC or by running an inline query if we have postgres access,
  // but wait! Since we are using the anon key, does PostgREST allow us to query pg_policies?
  // Let's check!
  const { data, error } = await supabase.from('pg_policies').select('*');
  console.log("Policies:", data, "Error:", error);
}

run();
