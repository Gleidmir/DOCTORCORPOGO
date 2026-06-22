
const supabaseUrl = 'https://eladkkxaymjtrwevqskf.supabase.co';
const supabaseKey = 'sb_publishable_oFdf4UUacXcX4TJeiMnHvQ_NsgwAgk-';

async function run() {
  const response = await fetch(`${supabaseUrl}/rest/v1/`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });
  
  if (!response.ok) {
    console.error("Failed to fetch schema:", response.statusText);
    return;
  }
  
  const schema = await response.json();
  
  console.log("=== APPOINTMENTS COLUMNS ===");
  const appointmentsDef = schema.definitions.appointments;
  if (appointmentsDef) {
    console.log(appointmentsDef.properties);
  } else {
    console.log("appointments table not found in OpenAPI spec");
  }

  console.log("=== CLIENTS COLUMNS ===");
  const clientsDef = schema.definitions.clients;
  if (clientsDef) {
    console.log(clientsDef.properties);
  } else {
    console.log("clients table not found in OpenAPI spec");
  }
}

run();
