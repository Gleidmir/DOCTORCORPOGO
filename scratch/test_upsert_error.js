import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const tenantId = 'ludhelenao@gmail.com';
  const phone = '62995555522';
  const name = 'Estevao';

  console.log("1. Simulating clients upsert (as anon)...");
  const newClientId = `c_${Date.now()}`;
  const clientData = {
    id: newClientId,
    name: name,
    phone: phone,
    email: undefined,
    registered_at: new Date().toISOString(),
    tenant_id: tenantId,
  };

  const { data, error: upsertError } = await supabase.from("clients").upsert(clientData, {
    onConflict: 'tenant_id,phone'
  });
  console.log("Upsert result:", data);
  console.log("Upsert error:", upsertError);

  console.log("\n2. Simulating clients insert instead of upsert (as anon)...");
  const { data: insData, error: insError } = await supabase.from("clients").insert({
    id: `c_ins_${Date.now()}`,
    name: 'Estevao Ins',
    phone: '62995555523',
    tenant_id: tenantId,
    registered_at: new Date().toISOString(),
  });
  console.log("Insert result:", insData);
  console.log("Insert error:", insError);
}

run();
