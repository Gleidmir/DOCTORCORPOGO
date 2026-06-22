import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: apts } = await supabase.from('appointments').select('*').limit(1);
  console.log("Appointment row keys:", apts && apts[0] ? Object.keys(apts[0]) : "No rows");
  console.log("Appointment row sample:", apts && apts[0]);

  const { data: clients } = await supabase.from('clients').select('*').limit(1);
  console.log("Client row keys:", clients && clients[0] ? Object.keys(clients[0]) : "No rows");
  console.log("Client row sample:", clients && clients[0]);
}

run();
