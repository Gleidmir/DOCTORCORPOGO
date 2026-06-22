import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

// Mock implementation of the logic in db.ts
async function addClient(name, phone, tenantId) {
  const newClient = {
    id: `c_${Date.now()}`,
    name,
    phone,
    email: undefined,
    registered_at: new Date().toISOString(),
    tenant_id: tenantId,
  };

  try {
    const { data: existing, error: findError } = await supabase
      .from("clients")
      .select("*")
      .eq("tenant_id", tenantId)
      .eq("phone", phone)
      .maybeSingle();

    if (findError) throw findError;
    if (existing) {
      console.log("Client already exists:", existing);
      return existing;
    }

    const { error: upsertError } = await supabase.from("clients").upsert({
      id: newClient.id,
      name: newClient.name,
      phone: newClient.phone,
      email: newClient.email,
      registered_at: newClient.registered_at,
      tenant_id: tenantId,
    }, {
      onConflict: 'tenant_id,phone'
    });

    if (upsertError) throw upsertError;
    console.log("Upserted client:", newClient);
    return newClient;
  } catch (e) {
    console.error("Erro ao cadastrar cliente no Supabase:", e);
    throw e; // We rethrow to see if it causes a crash
  }
}

async function addAppointment(appointment, tenantId) {
  try {
    // 1. Check duplicate
    // (Skipping for now to test insert directly)
    
    // 2. Add client
    await addClient(appointment.clientName, appointment.clientPhone, tenantId);

    const newApt = {
      ...appointment,
      id: `apt_${Date.now()}`,
      status: "pending",
      created_at: new Date().toISOString(),
      tenant_id: tenantId,
    };

    console.log("Inserting appointment:", newApt);
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

    if (error) {
      console.error("Insert error returned from Supabase:", error);
      throw error;
    }
    console.log("Appointment successfully inserted!");
    return newApt;
  } catch (e) {
    console.error("Erro ao adicionar agendamento no Supabase:", e);
    throw e;
  }
}

async function run() {
  const tenantId = 'ludhelenao@gmail.com';
  const appointment = {
    clientId: 'c_62995555522',
    clientName: 'Estevao',
    clientPhone: '62995555522',
    serviceId: 's9_1781918151709_abj21',
    serviceName: 'Barba',
    price: 35,
    barberId: 'b1_1781918151698_7g4j9',
    barberName: 'PASTOR',
    date: '2026-06-20',
    time: '12:00'
  };

  try {
    await addAppointment(appointment, tenantId);
  } catch (error) {
    console.error("run caught error:", error);
  }
}

run();
