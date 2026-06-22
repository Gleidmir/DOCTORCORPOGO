import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .in('phone', ['62995555522', '62995555523']);
  console.log("Found clients:", clients);
}

run();
