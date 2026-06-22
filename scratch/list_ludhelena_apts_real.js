import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: apts, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('tenant_id', 'ludhelena0@gmail.com')
    .order('created_at', { ascending: false });
  console.log("Appointments for ludhelena0@gmail.com:", apts);
}

run();
