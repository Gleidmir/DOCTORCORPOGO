import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const tenants = ['ludhelena0@gmail.com', 'ludhelenao@gmail.com', 'gleidmir10@gmail.com'];
  
  for (const t of tenants) {
    console.log(`\n================== TENANT: ${t} ==================`);
    const { data: shop } = await supabase.from('barber_shops').select('*').eq('tenant_id', t);
    console.log("Barber Shop:", shop);
    
    const { data: barbers } = await supabase.from('barbers').select('*').eq('tenant_id', t);
    console.log("Barbers:", barbers);

    const { data: services } = await supabase.from('services').select('*').eq('tenant_id', t);
    console.log("Services count:", services ? services.length : 0);
    
    const { data: apts } = await supabase.from('appointments').select('*').eq('tenant_id', t);
    console.log("Appointments count:", apts ? apts.length : 0);
    if (apts && apts.length > 0) {
      console.log("Appointments sample:", apts.map(a => ({
        id: a.id,
        client_name: a.client_name,
        client_phone: a.client_phone,
        date: a.date,
        time: a.time,
        barber_id: a.barber_id,
        barber_name: a.barber_name,
        status: a.status
      })));
    }
  }
}

run();
