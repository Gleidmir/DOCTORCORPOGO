import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testFilter() {
  const tenantId = 'ludhelena0@gmail.com';
  const clientPhone = '6299566332200';
  
  // 1. Fetch appointments
  const { data: allApts, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("tenant_id", tenantId);
    
  console.log("Error:", error);
  console.log("All appointments count:", allApts ? allApts.length : 0);
  
  if (allApts) {
    const clientApts = allApts.filter((a) => {
      console.log(`Comparing DB phone '${a.client_phone}' (type ${typeof a.client_phone}) with filter phone '${clientPhone}' (type ${typeof clientPhone})`);
      return a.client_phone === clientPhone;
    });
    console.log("Filtered client appointments:", clientApts);
  }
}

testFilter();
