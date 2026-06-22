import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const tenantId = 'ludhelena0@gmail.com';
  const phone = '62995555522';
  const name = 'Estevao';

  console.log("1. Checking if client already exists...");
  const { data: existing, error: findError } = await supabase
    .from("clients")
    .select("*")
    .eq("tenant_id", tenantId)
    .eq("phone", phone)
    .maybeSingle();

  console.log("Existing client:", existing, "Find error:", findError);

  console.log("\n2. Simulating addClient (upsert)...");
  const newClientId = `c_${Date.now()}`;
  const clientData = {
    id: existing ? existing.id : newClientId,
    name: name,
    phone: phone,
    email: undefined,
    registered_at: new Date().toISOString(),
    tenant_id: tenantId,
  };

  console.log("Upserting client:", clientData);
  const { error: upsertError } = await supabase.from("clients").upsert(clientData, {
    onConflict: 'tenant_id,phone'
  });
  console.log("Upsert error:", upsertError);

  console.log("\n3. Simulating appointment insert...");
  // Let's first query a barber and a service for this tenant so we can use realistic IDs
  const { data: barbers } = await supabase.from("barbers").select("*").eq("tenant_id", tenantId);
  const { data: services } = await supabase.from("services").select("*").eq("tenant_id", tenantId);
  console.log("Barbers for tenant:", barbers);
  console.log("Services for tenant:", services);

  if (!barbers || barbers.length === 0 || !services || services.length === 0) {
    console.log("Cannot proceed with appointment insert test because barbers/services are empty for this tenant.");
    return;
  }

  const barber = barbers[0];
  const service = services[0];

  const aptData = {
    id: `apt_test_${Date.now()}`,
    client_id: `c_${phone}`, // hardcoded like client.tsx does
    client_name: name,
    client_phone: phone,
    service_id: service.id,
    service_name: service.name,
    price: service.price,
    barber_id: barber.id,
    barber_name: barber.name,
    date: '2026-06-20',
    time: '10:00',
    status: 'pending',
    created_at: new Date().toISOString(),
    tenant_id: tenantId,
  };

  console.log("Inserting appointment with hardcoded client_id:", aptData);
  const { error: aptError } = await supabase.from("appointments").insert(aptData);
  console.log("Appointment insert error:", aptError);
}

run();
