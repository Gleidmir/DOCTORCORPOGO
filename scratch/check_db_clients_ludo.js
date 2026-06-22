import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .eq('phone', '62911223344');
  console.log("Clients matching phone:", clients);
  
  const { data: clientsTenant } = await supabase
    .from('clients')
    .select('*')
    .eq('tenant_id', 'ludhelenao@gmail.com');
  console.log("Clients for ludhelenao@gmail.com:", clientsTenant);
}

run();
