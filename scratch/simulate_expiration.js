import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-'; // Let's check if we need service role key or if publishable is enough to update. 
// Wait, if RLS is enabled, publishable key might not be enough to update. Let's see if we can do it.
const supabase = createClient(supabaseUrl, supabaseKey);

async function simulate() {
  console.log("=== SIMULATING EXPIRATION FOR ludhelena0@gmail.com ===");
  
  // Set created_at to 31 days ago
  const thirtyOneDaysAgo = new Date();
  thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31);
  
  const { data, error } = await supabase
    .from('barber_shops')
    .update({ 
      created_at: thirtyOneDaysAgo.toISOString(),
      subscription_status: 'trial'
    })
    .eq('tenant_id', 'ludhelena0@gmail.com')
    .select();
    
  if (error) {
    console.error("Error updating profile:", error);
  } else {
    console.log("Updated profile:", data);
  }
}

simulate();
