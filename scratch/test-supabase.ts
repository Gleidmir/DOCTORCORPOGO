import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env manually
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let val = match[2] || '';
    if (val.length > 0 && val.startsWith('"') && val.endsWith('"')) {
      val = val.substring(1, val.length - 1);
    }
    env[key] = val;
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erro: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não definidos no .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log("Conectando ao Supabase:", supabaseUrl);
  
  // 1. Buscar todos os barbeiros
  const { data: barbers, error: bError } = await supabase
    .from('barbers')
    .select('*')
    .eq('tenant_id', 'ludhelena0@gmail.com');
    
  if (bError) {
    console.error("Erro ao buscar barbeiros:", bError);
  } else {
    console.log("Barbeiros (ludhelena0@gmail.com):", JSON.stringify(barbers, null, 2));
  }
}

run();
