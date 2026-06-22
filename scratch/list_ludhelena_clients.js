import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .eq('tenant_id', 'ludhelena0@gmail.com');
  console.log("Clients for ludhelena0@gmail.com:", clients);
}

run();
