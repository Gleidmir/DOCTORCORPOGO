import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('tenant_id', 'ludhelena0@gmail.com');
  console.log("Services:", services ? services.map(s => ({ id: s.id, name: s.name })) : [], "Error:", error);
}

run();
