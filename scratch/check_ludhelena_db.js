import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("=== ALL BARBER SHOPS ===");
  const { data: shops } = await supabase.from('barber_shops').select('*');
  console.log(shops);

  console.log("=== ALL BARBERS ===");
  const { data: barbers } = await supabase.from('barbers').select('*');
  console.log(barbers);

  console.log("=== ALL SERVICES ===");
  const { data: services } = await supabase.from('services').select('*');
  console.log(services);
}

run();
