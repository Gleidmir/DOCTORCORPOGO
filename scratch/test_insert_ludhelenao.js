import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const newApt = {
    id: `apt_test_${Date.now()}`,
    client_id: 'c_62911223344',
    client_name: 'SEBASTIÃO',
    client_phone: '62911223344',
    service_id: 's9_1781918151709_abj21',
    service_name: 'Barba',
    price: 35,
    barber_id: 'b1_1781918151698_7g4j9',
    barber_name: 'PASTOR',
    date: '2026-06-20',
    time: '08:00',
    status: 'pending',
    created_at: new Date().toISOString(),
    tenant_id: 'ludhelenao@gmail.com'
  };

  const { data, error } = await supabase.from('appointments').insert(newApt);
  console.log("Insert result:", { data, error });
}

testInsert();
