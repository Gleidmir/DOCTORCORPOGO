import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testDefaultStatus() {
  const testEmail = `test_integration_${Date.now()}@example.com`;
  console.log(`=== TESTING WITH EMAIL: ${testEmail} ===`);
  
  // 1. Insert a barber shop profile directly (simulating what the default values should do)
  // We do NOT supply subscription_status or subscription_plan
  const { data: newShop, error: insertError } = await supabase
    .from('barber_shops')
    .insert({
      tenant_id: testEmail,
      name: 'TEST BARBER SHOP'
    })
    .select('*')
    .single();

  if (insertError) {
    console.error("Error inserting shop:", insertError);
  } else {
    console.log("Newly created shop default values:", newShop);
    
    // Clean up test shop
    await supabase.from('barber_shops').delete().eq('tenant_id', testEmail);
  }
}

testDefaultStatus();
