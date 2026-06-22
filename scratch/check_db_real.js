import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("=== CHECKING DATABASE ===");
  
  // 1. Check profile of gleidmir10@gmail.com
  const { data: ludProfile, error: ludError } = await supabase
    .from('barber_shops')
    .select('*')
    .eq('tenant_id', 'gleidmir10@gmail.com');
  
  if (ludError) {
    console.error("Error fetching gleidmir10 profile:", ludError);
  } else {
    console.log("Profile for gleidmir10@gmail.com:", ludProfile);
  }

  // 2. Check general barber_shops rows to see structure
  const { data: allShops, error: shopsError } = await supabase
    .from('barber_shops')
    .select('*')
    .limit(5);

  if (shopsError) {
    console.error("Error fetching barber_shops:", shopsError);
  } else {
    console.log("First 5 barber shops rows:", allShops);
  }
}

check();
