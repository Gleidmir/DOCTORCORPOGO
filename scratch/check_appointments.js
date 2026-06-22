import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("=== CHECKING ALL BARBER SHOPS ===");
  const { data: shops, error: shopsErr } = await supabase.from('barber_shops').select('*');
  console.log("Shops:", shops, "Error:", shopsErr);

  console.log("=== CHECKING ALL BARBERS ===");
  const { data: barbers, error: barbersErr } = await supabase.from('barbers').select('*');
  console.log("Barbers:", barbers, "Error:", barbersErr);

  console.log("=== CHECKING ALL APPOINTMENTS ===");
  const { data: apts, error: aptsErr } = await supabase.from('appointments').select('*');
  console.log("Appointments:", apts, "Error:", aptsErr);
}

check();
