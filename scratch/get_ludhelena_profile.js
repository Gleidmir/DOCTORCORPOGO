import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: shops } = await supabase.from('barber_shops').select('*').eq('tenant_id', 'ludhelena0@gmail.com');
  console.log("ludhelena0 profile:", shops);
}

run();
