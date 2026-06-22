import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // Let's try to query information_schema or pg_policies via RPC or views
  const { data, error } = await supabase.rpc('get_triggers'); // Let's check if this RPC exists
  console.log("get_triggers RPC result:", data, error);
  
  // Let's query information_schema.columns for barber_shops
  const { data: columns, error: colError } = await supabase
    .from('information_schema.columns')
    .select('*')
    .eq('table_name', 'barber_shops');
  console.log("information_schema columns:", columns, colError);
}

run();
