import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const tables = ['barber_shops', 'barbers', 'services', 'clients', 'appointments'];
  
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('tenant_id');
    if (error) {
      console.error(`Error querying ${table}:`, error);
      continue;
    }
    const tenants = [...new Set(data.map(d => d.tenant_id))];
    console.log(`Distinct tenant_ids in ${table}:`, tenants);
  }
}

run();
