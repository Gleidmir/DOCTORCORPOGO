import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const tenantId = 'ludhelena0@gmail.com';
  
  // Let's first query the actual barbers and services for this tenant
  const { data: barbers } = await supabase.from("barbers").select("*").eq("tenant_id", tenantId);
  const { data: services } = await supabase.from("services").select("*").eq("tenant_id", tenantId);
  
  console.log("Barbers count:", barbers ? barbers.length : 0);
  console.log("Services count:", services ? services.length : 0);

  if (!barbers || barbers.length === 0 || !services || services.length === 0) {
    console.log("Empty barbers/services");
    return;
  }

  const barber = barbers[0];
  const service = services[0];

  const appointment = {
    clientId: 'c_62995555522',
    clientName: 'Estevao',
    clientPhone: '62995555522',
    serviceId: service.id,
    serviceName: service.name,
    price: service.price,
    barberId: barber.id,
    barberName: barber.name,
    date: '2026-06-20',
    time: '17:00'
  };

  const newApt = {
    ...appointment,
    id: `apt_${Date.now()}`,
    status: "pending",
    created_at: new Date().toISOString(),
    tenant_id: tenantId,
  };

  console.log("Inserting real appointment:", newApt);
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
