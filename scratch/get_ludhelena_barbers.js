import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: barbers } = await supabase.from('barbers').select('*').eq('tenant_id', 'ludhelena0@gmail.com');
  console.log("Barbers for ludhelena0@gmail.com:", barbers);

  const { data: services } = await supabase.from('services').select('*').eq('tenant_id', 'ludhelena0@gmail.com');
  console.log("Services for ludhelena0@gmail.com:", services);
}

run();
