import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jivbwqghmiwxgrljkmrp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_D-2zZjJok7kV7V4-cvu9Wg_azYUv1tc";

const supabaseUrl =
  (typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL) ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  SUPABASE_URL;

const supabaseAnonKey =
  (typeof process !== "undefined" && process.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any);

