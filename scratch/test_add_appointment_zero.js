import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const tenantId = 'ludhelena0@gmail.com';
  const appointment = {
    clientId: 'c_62995555522',
    clientName: 'Estevao',
    clientPhone: '62995555522',
    serviceId: 's9',
    serviceName: 'Barba',
    price: 35,
    barberId: 'b1',
    barberName: 'PASTOR',
    date: '2026-06-20',
    time: '14:00'
  };

  const newApt = {
    ...appointment,
    id: `apt_${Date.now()}`,
    status: "pending",
    created_at: new Date().toISOString(),
    tenant_id: tenantId,
  };

  console.log("Inserting appointment for tenant ludhelena0@gmail.com:", newApt);
  const { error } = await supabase.from("appointments").insert({
    id: newApt.id,
    client_id: newApt.clientId,
    client_name: newApt.clientName,
    client_phone: newApt.clientPhone,
    service_id: newApt.serviceId,
    service_name: newApt.serviceName,
    price: newApt.price,
    barber_id: newApt.barberId,
    barber_name: newApt.barberName,
    date: newApt.date,
    time: newApt.time,
    status: newApt.status,
    created_at: newApt.created_at,
    tenant_id: tenantId,
  });

  console.log("Error:", error);
}

run();
