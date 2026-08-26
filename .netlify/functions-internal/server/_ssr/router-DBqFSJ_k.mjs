import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const supabaseUrl = "https://jivbwqghmiwxgrljkmrp.supabase.co";
const supabaseAnonKey = "sb_publishable_D-2zZjJok7kV7V4-cvu9Wg_azYUv1tc";
const isSupabaseConfigured = Boolean(supabaseAnonKey);
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
const DEFAULT_WORK_HOURS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00"
];
const isServer = typeof window === "undefined";
const getCurrentTenantId = () => {
  if (isServer) return "default";
  const isClientRoute = typeof window !== "undefined" && window.location.pathname.includes("/client");
  if (isClientRoute) {
    const clientTenant2 = window.localStorage.getItem("mbg_client_tenant");
    if (clientTenant2) return clientTenant2;
  }
  const sessionItem = window.localStorage.getItem("mbg_session");
  if (sessionItem) {
    try {
      const session = JSON.parse(sessionItem);
      if (session && session.role === "admin" && session.email) {
        return session.email;
      }
    } catch (e) {
      console.error("Erro ao ler sessão:", e);
    }
  }
  const clientTenant = window.localStorage.getItem("mbg_client_tenant");
  return clientTenant || "default";
};
const getTenantKey = (key) => {
  if (key === "mbg_session" || key === "mbg_client_tenant") {
    return key;
  }
  const tenantId = getCurrentTenantId();
  return `${key}_${tenantId}`;
};
const getStorageItem = (key, defaultValue) => {
  if (isServer) return defaultValue;
  try {
    const tenantKey = getTenantKey(key);
    const item = window.localStorage.getItem(tenantKey);
    if (item === null || item === "null" || item === "undefined") {
      return defaultValue;
    }
    const parsed = JSON.parse(item);
    if (parsed === null || parsed === void 0) {
      return defaultValue;
    }
    if (Array.isArray(defaultValue) && !Array.isArray(parsed)) {
      return defaultValue;
    }
    return parsed;
  } catch (error) {
    console.error("Erro ao ler localStorage:", key, error);
    return defaultValue;
  }
};
const setStorageItem = (key, value) => {
  if (isServer) return;
  try {
    const tenantKey = getTenantKey(key);
    window.localStorage.setItem(tenantKey, JSON.stringify(value));
  } catch (error) {
    console.error("Erro ao gravar localStorage:", key, error);
  }
};
const mapServiceFromDB = (s) => ({
  id: s.id,
  name: s.name,
  price: Number(s.price),
  duration: s.duration,
  isActive: s.is_active !== false
});
const mapAppointmentFromDB = (a) => ({
  id: a.id,
  clientId: a.client_id,
  clientName: a.client_name,
  clientPhone: a.client_phone,
  serviceId: a.service_id,
  serviceName: a.service_name,
  price: Number(a.price),
  barberId: a.barber_id,
  barberName: a.barber_name,
  date: a.date,
  time: a.time,
  status: a.status,
  createdAt: a.created_at
});
const mapClientFromDB = (c) => ({
  id: c.id,
  name: c.name,
  phone: c.phone,
  email: c.email || void 0,
  registeredAt: c.registered_at
});
const mapBarberFromDB = (b) => {
  let workDays = [1, 2, 3, 4, 5, 6];
  if (b.work_days) {
    try {
      workDays = typeof b.work_days === "string" ? JSON.parse(b.work_days) : b.work_days;
    } catch (e) {
      if (typeof b.work_days === "string") {
        workDays = b.work_days.split(",").map(Number).filter((n) => !isNaN(n));
      }
    }
  }
  let blockedDates = [];
  if (b.blocked_dates) {
    try {
      blockedDates = typeof b.blocked_dates === "string" ? JSON.parse(b.blocked_dates) : b.blocked_dates;
    } catch (e) {
      if (typeof b.blocked_dates === "string") {
        blockedDates = b.blocked_dates.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
  }
  let workHours = DEFAULT_WORK_HOURS;
  if (b.work_hours) {
    try {
      workHours = typeof b.work_hours === "string" ? JSON.parse(b.work_hours) : b.work_hours;
    } catch (e) {
      if (typeof b.work_hours === "string") {
        workHours = b.work_hours.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
  }
  return {
    id: b.id,
    name: b.name,
    avatar: b.avatar,
    phone: b.phone || void 0,
    workDays: Array.isArray(workDays) ? workDays : [1, 2, 3, 4, 5, 6],
    startTime: b.start_time || "08:00",
    endTime: b.end_time || "19:00",
    blockedDates: Array.isArray(blockedDates) ? blockedDates : [],
    workHours: Array.isArray(workHours) ? workHours : DEFAULT_WORK_HOURS
  };
};
const defaultBarbers = [
  { id: "b1", name: "DRA. MARIANA SILVA", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face", phone: "5562993299120", workDays: [1, 2, 3, 4, 5, 6], startTime: "08:00", endTime: "19:00", blockedDates: [], workHours: DEFAULT_WORK_HOURS },
  { id: "b2", name: "DRA. BEATRIZ SANTOS", avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=150&h=150&fit=crop&crop=face", phone: "5562993299120", workDays: [1, 2, 3, 4, 5, 6], startTime: "08:00", endTime: "19:00", blockedDates: [], workHours: DEFAULT_WORK_HOURS },
  { id: "b3", name: "DR. CARLOS OLIVEIRA", avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face", phone: "5562993299120", workDays: [1, 2, 3, 4, 5, 6], startTime: "08:00", endTime: "19:00", blockedDates: [], workHours: DEFAULT_WORK_HOURS },
  { id: "b4", name: "DRA. ANA COSTA", avatar: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&h=150&fit=crop&crop=face", phone: "5562993299120", workDays: [1, 2, 3, 4, 5, 6], startTime: "08:00", endTime: "19:00", blockedDates: [], workHours: DEFAULT_WORK_HOURS }
];
const defaultServices = [
  { id: "s1", name: "Limpeza Dentária (Profilaxia)", price: 150, duration: 30, isActive: true },
  { id: "s2", name: "Clareamento Dental", price: 400, duration: 60, isActive: true },
  { id: "s3", name: "Aplicação de Botox (1 Área)", price: 600, duration: 30, isActive: true },
  { id: "s4", name: "Preenchimento Labial", price: 1200, duration: 45, isActive: true },
  { id: "s5", name: "Harmonização Facial", price: 2500, duration: 60, isActive: true },
  { id: "s6", name: "Lente de Contato Dental (Unidade)", price: 1800, duration: 60, isActive: true },
  { id: "s7", name: "Consulta de Avaliação", price: 100, duration: 30, isActive: true },
  { id: "s8", name: "Bichectomia", price: 1800, duration: 60, isActive: true }
];
const defaultClients = [];
const DEFAULT_ADMIN_PHONE = "5562993299120";
const initDB = () => {
  if (isServer) return;
  const tenantId = getCurrentTenantId();
  if (!window.localStorage.getItem(`mbg_barbers_${tenantId}`)) {
    window.localStorage.setItem(`mbg_barbers_${tenantId}`, JSON.stringify(defaultBarbers));
  }
  if (!window.localStorage.getItem(`mbg_services_${tenantId}`)) {
    window.localStorage.setItem(`mbg_services_${tenantId}`, JSON.stringify(defaultServices));
  }
  if (!window.localStorage.getItem(`mbg_clients_${tenantId}`)) {
    window.localStorage.setItem(`mbg_clients_${tenantId}`, JSON.stringify([]));
  }
  if (!window.localStorage.getItem(`mbg_appointments_${tenantId}`)) {
    window.localStorage.setItem(`mbg_appointments_${tenantId}`, JSON.stringify([]));
  }
};
let isSeedingServices = null;
const getServices = async () => {
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { data, error } = await supabase.from("services").select("*").eq("tenant_id", tenantId).order("name", { ascending: true });
      if (error) throw error;
      if (data && data.length === 0) {
        if (isSeedingServices) {
          await isSeedingServices;
          const { data: refetchedData } = await supabase.from("services").select("*").eq("tenant_id", tenantId).order("name", { ascending: true });
          return (refetchedData || []).map(mapServiceFromDB);
        }
        isSeedingServices = (async () => {
          const servicesToInsert = defaultServices.map((s) => ({
            id: `${s.id}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            name: s.name,
            price: s.price,
            duration: s.duration,
            is_active: s.isActive,
            tenant_id: tenantId
          }));
          const { error: insertError } = await supabase.from("services").insert(servicesToInsert);
          if (insertError) throw insertError;
          return servicesToInsert;
        })();
        try {
          const inserted = await isSeedingServices;
          return inserted.map(mapServiceFromDB);
        } finally {
          isSeedingServices = null;
        }
      }
      return (data || []).map(mapServiceFromDB);
    } catch (e) {
      console.warn("Erro ao buscar serviços no Supabase, usando localStorage:", e);
    }
  }
  initDB();
  return getStorageItem("mbg_services", defaultServices);
};
const addService = async (service) => {
  const newService = {
    ...service,
    id: `s_${Date.now()}`,
    isActive: true
  };
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { error } = await supabase.from("services").insert({
        id: newService.id,
        name: newService.name,
        price: newService.price,
        duration: newService.duration,
        is_active: newService.isActive,
        tenant_id: tenantId
      });
      if (error) throw error;
      toast.success("Serviço adicionado ao Supabase!");
      return newService;
    } catch (e) {
      console.error("Erro ao adicionar serviço no Supabase:", e);
      toast.error("Erro ao salvar no banco online, salvando local...");
    }
  }
  const services = await getServices();
  services.push(newService);
  setStorageItem("mbg_services", services);
  toast.success("Serviço adicionado localmente!");
  return newService;
};
const updateService = async (updatedService) => {
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { error } = await supabase.from("services").update({
        name: updatedService.name,
        price: updatedService.price,
        duration: updatedService.duration,
        is_active: updatedService.isActive
      }).eq("id", updatedService.id).eq("tenant_id", tenantId);
      if (error) throw error;
      toast.success("Serviço atualizado no Supabase!");
      return;
    } catch (e) {
      console.error("Erro ao atualizar serviço no Supabase:", e);
    }
  }
  const services = await getServices();
  const index = services.findIndex((s) => s.id === updatedService.id);
  if (index !== -1) {
    services[index] = updatedService;
    setStorageItem("mbg_services", services);
    toast.success("Serviço atualizado localmente!");
  }
};
const deleteService = async (id) => {
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { error } = await supabase.from("services").delete().eq("id", id).eq("tenant_id", tenantId);
      if (error) throw error;
      toast.success("Serviço removido do Supabase!");
      return;
    } catch (e) {
      console.error("Erro ao excluir serviço no Supabase:", e);
    }
  }
  const services = await getServices();
  const filtered = services.filter((s) => s.id !== id);
  setStorageItem("mbg_services", filtered);
  toast.success("Serviço removido localmente!");
};
let isSeedingBarbers = null;
const getBarbers = async () => {
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { data, error } = await supabase.from("barbers").select("*").eq("tenant_id", tenantId);
      if (error) throw error;
      if (data && data.length === 0) {
        if (isSeedingBarbers) {
          await isSeedingBarbers;
          const { data: refetchedData } = await supabase.from("barbers").select("*").eq("tenant_id", tenantId);
          return (refetchedData || []).map(mapBarberFromDB);
        }
        isSeedingBarbers = (async () => {
          const barbersToInsert = defaultBarbers.map((b) => ({
            id: `${b.id}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            name: b.name,
            avatar: b.avatar,
            phone: b.phone,
            work_days: JSON.stringify(b.workDays),
            start_time: b.startTime,
            end_time: b.endTime,
            blocked_dates: JSON.stringify(b.blockedDates),
            tenant_id: tenantId
          }));
          const { error: insertError } = await supabase.from("barbers").insert(barbersToInsert);
          if (insertError) throw insertError;
          return barbersToInsert;
        })();
        try {
          const inserted = await isSeedingBarbers;
          return inserted.map(mapBarberFromDB);
        } finally {
          isSeedingBarbers = null;
        }
      }
      if (data && data.length > 0) {
        return data.map(mapBarberFromDB);
      }
    } catch (e) {
      console.warn("Erro ao buscar barbeiros no Supabase, usando localStorage:", e);
    }
  }
  initDB();
  return getStorageItem("mbg_barbers", defaultBarbers);
};
const addBarber = async (barber) => {
  const currentBarbers = await getBarbers();
  if (currentBarbers.length >= 5) {
    toast.error("Limite máximo de 5 barbeiros atingido.");
    throw new Error("Limite de 5 barbeiros atingido.");
  }
  const newBarber = {
    ...barber,
    id: `b_${Date.now()}`,
    workHours: barber.workHours || DEFAULT_WORK_HOURS
  };
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { error } = await supabase.from("barbers").insert({
        id: newBarber.id,
        name: newBarber.name,
        avatar: newBarber.avatar,
        phone: newBarber.phone,
        work_days: JSON.stringify(newBarber.workDays || [1, 2, 3, 4, 5, 6]),
        start_time: newBarber.startTime || "08:00",
        end_time: newBarber.endTime || "19:00",
        blocked_dates: JSON.stringify(newBarber.blockedDates || []),
        work_hours: JSON.stringify(newBarber.workHours || DEFAULT_WORK_HOURS),
        tenant_id: tenantId
      });
      if (error) {
        if (error.message?.includes("work_hours") || error.code === "P0002" || error.code === "42703") {
          console.warn("work_hours column not found. Inserting without it...");
          const { error: fallbackError } = await supabase.from("barbers").insert({
            id: newBarber.id,
            name: newBarber.name,
            avatar: newBarber.avatar,
            phone: newBarber.phone,
            work_days: JSON.stringify(newBarber.workDays || [1, 2, 3, 4, 5, 6]),
            start_time: newBarber.startTime || "08:00",
            end_time: newBarber.endTime || "19:00",
            blocked_dates: JSON.stringify(newBarber.blockedDates || []),
            tenant_id: tenantId
          });
          if (fallbackError) throw fallbackError;
        } else {
          throw error;
        }
      }
      toast.success("Profissional adicionado ao Supabase!");
      return newBarber;
    } catch (e) {
      console.error("Erro ao adicionar profissional no Supabase:", e);
      toast.error("Erro ao salvar no banco online, salvando local...");
    }
  }
  const barbers = await getBarbers();
  barbers.push(newBarber);
  setStorageItem("mbg_barbers", barbers);
  toast.success("Profissional adicionado localmente!");
  return newBarber;
};
const updateBarber = async (updatedBarber) => {
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { error } = await supabase.from("barbers").update({
        name: updatedBarber.name,
        avatar: updatedBarber.avatar,
        phone: updatedBarber.phone,
        work_days: JSON.stringify(updatedBarber.workDays || [1, 2, 3, 4, 5, 6]),
        start_time: updatedBarber.startTime || "08:00",
        end_time: updatedBarber.endTime || "19:00",
        blocked_dates: JSON.stringify(updatedBarber.blockedDates || []),
        work_hours: JSON.stringify(updatedBarber.workHours || DEFAULT_WORK_HOURS)
      }).eq("id", updatedBarber.id).eq("tenant_id", tenantId);
      if (error) {
        if (error.message?.includes("work_hours") || error.code === "P0002" || error.code === "42703") {
          console.warn("work_hours column not found. Updating without it...");
          const { error: fallbackError } = await supabase.from("barbers").update({
            name: updatedBarber.name,
            avatar: updatedBarber.avatar,
            phone: updatedBarber.phone,
            work_days: JSON.stringify(updatedBarber.workDays || [1, 2, 3, 4, 5, 6]),
            start_time: updatedBarber.startTime || "08:00",
            end_time: updatedBarber.endTime || "19:00",
            blocked_dates: JSON.stringify(updatedBarber.blockedDates || [])
          }).eq("id", updatedBarber.id).eq("tenant_id", tenantId);
          if (fallbackError) throw fallbackError;
        } else {
          throw error;
        }
      }
      toast.success("Profissional atualizado no Supabase!");
      return;
    } catch (e) {
      console.error("Erro ao atualizar profissional no Supabase:", e);
    }
  }
  const barbers = await getBarbers();
  const index = barbers.findIndex((b) => b.id === updatedBarber.id);
  if (index !== -1) {
    barbers[index] = updatedBarber;
    setStorageItem("mbg_barbers", barbers);
    toast.success("Profissional atualizado localmente!");
  }
};
const deleteBarber = async (id) => {
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { error } = await supabase.from("barbers").delete().eq("id", id).eq("tenant_id", tenantId);
      if (error) throw error;
      toast.success("Profissional removido do Supabase!");
      return;
    } catch (e) {
      console.error("Erro ao excluir profissional no Supabase:", e);
    }
  }
  const barbers = await getBarbers();
  const filtered = barbers.filter((b) => b.id !== id);
  setStorageItem("mbg_barbers", filtered);
  toast.success("Profissional removido localmente!");
};
const getClients = async () => {
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { data, error } = await supabase.from("clients").select("*").eq("tenant_id", tenantId);
      if (error) throw error;
      return (data || []).map(mapClientFromDB);
    } catch (e) {
      console.warn("Erro ao buscar clientes no Supabase:", e);
    }
  }
  initDB();
  return getStorageItem("mbg_clients", defaultClients);
};
const addClient = async (name, phone, email) => {
  const tenantId = getCurrentTenantId();
  const newClient = {
    id: `c_${Date.now()}`,
    name,
    phone,
    email,
    registeredAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (isSupabaseConfigured) {
    try {
      const { data: existing2 } = await supabase.from("clients").select("*").eq("tenant_id", tenantId).eq("phone", phone).maybeSingle();
      if (existing2) {
        return mapClientFromDB(existing2);
      }
      const { error } = await supabase.from("clients").upsert({
        id: newClient.id,
        name: newClient.name,
        phone: newClient.phone,
        email: newClient.email,
        registered_at: newClient.registeredAt,
        tenant_id: tenantId
      }, {
        onConflict: "tenant_id,phone"
      });
      if (error) throw error;
      return newClient;
    } catch (e) {
      console.error("Erro ao cadastrar cliente no Supabase:", e);
    }
  }
  const clients = await getClients();
  const existing = clients.find((c) => c.phone === phone);
  if (existing) return existing;
  clients.push(newClient);
  setStorageItem("mbg_clients", clients);
  return newClient;
};
const updateClient = async (updatedClient) => {
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { error } = await supabase.from("clients").update({
        name: updatedClient.name,
        phone: updatedClient.phone,
        email: updatedClient.email
      }).eq("id", updatedClient.id).eq("tenant_id", tenantId);
      if (error) throw error;
      toast.success("Cliente atualizado no servidor!");
      return;
    } catch (e) {
      console.error("Erro ao atualizar cliente no Supabase:", e);
    }
  }
  const clients = await getClients();
  const index = clients.findIndex((c) => c.id === updatedClient.id);
  if (index !== -1) {
    clients[index] = updatedClient;
    setStorageItem("mbg_clients", clients);
    toast.success("Cliente atualizado localmente!");
  }
};
const deleteClient = async (id) => {
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { error } = await supabase.from("clients").delete().eq("id", id).eq("tenant_id", tenantId);
      if (error) throw error;
      toast.success("Cliente excluído no servidor!");
      return;
    } catch (e) {
      console.error("Erro ao excluir cliente no Supabase:", e);
    }
  }
  const clients = await getClients();
  const filtered = clients.filter((c) => c.id !== id);
  setStorageItem("mbg_clients", filtered);
  toast.success("Cliente excluído localmente!");
};
const getAppointments = async () => {
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { data, error } = await supabase.from("appointments").select("*").eq("tenant_id", tenantId).order("date", { ascending: false }).order("time", { ascending: false });
      if (error) throw error;
      return (data || []).map(mapAppointmentFromDB);
    } catch (e) {
      console.warn("Erro ao buscar agendamentos no Supabase:", e);
    }
  }
  initDB();
  return getStorageItem("mbg_appointments", []);
};
const addAppointment = async (appointment) => {
  const appointments = await getAppointments();
  const duplicate = appointments.find(
    (a) => a.clientPhone === appointment.clientPhone && a.date === appointment.date && a.time === appointment.time && a.status === "pending"
  );
  if (duplicate) {
    throw new Error("Você já possui um agendamento pendente neste mesmo dia e horário!");
  }
  await addClient(appointment.clientName, appointment.clientPhone);
  const newApt = {
    ...appointment,
    id: `apt_${Date.now()}`,
    status: "pending",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
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
        created_at: newApt.createdAt,
        tenant_id: tenantId
      });
      if (error) throw error;
      toast.success("Agendamento efetuado no Supabase!");
      triggerWhatsAppNotification(newApt);
      return newApt;
    } catch (e) {
      console.warn("Erro ao adicionar agendamento no Supabase, salvando localmente:", e);
    }
  }
  const apts = await getAppointments();
  apts.unshift(newApt);
  setStorageItem("mbg_appointments", apts);
  toast.success("Agendamento efetuado localmente!");
  triggerWhatsAppNotification();
  return newApt;
};
const triggerWhatsAppNotification = async (appointment) => {
};
const updateAppointmentStatus = async (id, status) => {
  if (isSupabaseConfigured) {
    try {
      const tenantId = getCurrentTenantId();
      const { error } = await supabase.from("appointments").update({ status }).eq("id", id).eq("tenant_id", tenantId);
      if (error) throw error;
      if (status === "completed") {
        toast.success("Agendamento concluído no Supabase!");
      } else if (status === "cancelled") {
        toast.error("Agendamento cancelado no Supabase.");
      }
      return;
    } catch (e) {
      console.error("Erro ao atualizar agendamento no Supabase:", e);
      throw e;
    }
  }
  const apts = await getAppointments();
  const index = apts.findIndex((a) => a.id === id);
  if (index !== -1) {
    apts[index].status = status;
    setStorageItem("mbg_appointments", apts);
    if (status === "completed") {
      toast.success("Agendamento concluído localmente!");
    } else if (status === "cancelled") {
      toast.error("Agendamento cancelado localmente.");
    }
  }
};
const getCurrentUser = () => {
  return getStorageItem("mbg_session", null);
};
const setCurrentUser = (session) => {
  setStorageItem("mbg_session", session);
};
const logout = () => {
  if (isServer) return;
  window.localStorage.removeItem("mbg_session");
  toast.info("Sessão encerrada.");
};
const resetLocalDB = async () => {
  if (isServer) return;
  const tenantId = getCurrentTenantId();
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from("appointments").delete().eq("tenant_id", tenantId);
      if (error) throw error;
    } catch (e) {
      console.error("Erro ao limpar todos os agendamentos no Supabase no reset:", e);
      toast.error("Erro ao sincronizar reset com o servidor.");
      return;
    }
  }
  const appointmentsKey = `mbg_appointments_${tenantId}`;
  window.localStorage.setItem(appointmentsKey, JSON.stringify([]));
  toast.success("Histórico de atendimentos e faturamento zerados com sucesso!");
};
const deleteClientAppointments = async (clientPhone) => {
  if (isSupabaseConfigured) {
    try {
      const tenantId2 = getCurrentTenantId();
      const { error } = await supabase.from("appointments").delete().eq("tenant_id", tenantId2).eq("client_phone", clientPhone).neq("status", "completed");
      if (error) throw error;
      toast.success("Histórico limpo no Supabase!");
      return;
    } catch (e) {
      console.error("Erro ao limpar histórico no Supabase:", e);
      throw e;
    }
  }
  const tenantId = getCurrentTenantId();
  const appointmentsKey = `mbg_appointments_${tenantId}`;
  const appointmentsStr = window.localStorage.getItem(appointmentsKey);
  if (appointmentsStr) {
    try {
      const appointments = JSON.parse(appointmentsStr);
      const filtered = appointments.filter((a) => a.clientPhone !== clientPhone || a.status === "completed");
      window.localStorage.setItem(appointmentsKey, JSON.stringify(filtered));
      toast.success("Histórico limpo localmente!");
    } catch (e) {
      console.error("Erro ao limpar histórico local:", e);
    }
  }
};
const getTenantConfig = () => {
  if (isServer) {
    return { registeredAt: (/* @__PURE__ */ new Date()).toISOString(), subscriptionStatus: "expired" };
  }
  const tenantId = getCurrentTenantId();
  const key = `mbg_tenant_config_${tenantId}`;
  const stored = window.localStorage.getItem(key);
  let config = null;
  if (stored) {
    try {
      config = JSON.parse(stored);
    } catch (e) {
      console.error("Erro ao parsear TenantConfig:", e);
    }
  }
  const profileKey = `mbg_profile_${tenantId}`;
  const profileStored = window.localStorage.getItem(profileKey);
  let dbRegisteredAt = null;
  if (profileStored) {
    try {
      const prof = JSON.parse(profileStored);
      if (prof && prof.createdAt) {
        dbRegisteredAt = prof.createdAt;
      }
    } catch (e) {
      console.error("Erro ao ler data de registro do perfil:", e);
    }
  }
  const finalRegisteredAt = dbRegisteredAt || (config ? config.registeredAt : null) || (/* @__PURE__ */ new Date()).toISOString();
  const finalConfig = {
    registeredAt: finalRegisteredAt,
    subscriptionStatus: config ? config.subscriptionStatus : "expired",
    subscriptionPlan: config ? config.subscriptionPlan : void 0,
    subscriptionExpiresAt: config ? config.subscriptionExpiresAt : void 0
  };
  window.localStorage.setItem(key, JSON.stringify(finalConfig));
  return finalConfig;
};
const updateTenantConfig = (config) => {
  if (isServer) return;
  const tenantId = getCurrentTenantId();
  const key = `mbg_tenant_config_${tenantId}`;
  window.localStorage.setItem(key, JSON.stringify(config));
};
const checkSubscriptionStatus = () => {
  const config = getTenantConfig();
  const now = /* @__PURE__ */ new Date();
  if (config.subscriptionStatus === "active" && config.subscriptionPlan === "master") {
    return { status: "active", daysLeft: 9999, plan: "master" };
  }
  if (config.subscriptionStatus === "active" && config.subscriptionExpiresAt) {
    const expiresAt = new Date(config.subscriptionExpiresAt);
    if (now > expiresAt) {
      const expiredConfig = {
        ...config,
        subscriptionStatus: "expired"
      };
      updateTenantConfig(expiredConfig);
      return { status: "expired", daysLeft: 0, plan: config.subscriptionPlan };
    } else {
      const diffTime = Math.abs(expiresAt.getTime() - now.getTime());
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return { status: "active", daysLeft: diffDays, plan: config.subscriptionPlan };
    }
  }
  if (config.subscriptionStatus === "trial") {
    const regDate = new Date(config.registeredAt);
    const trialEndDate = new Date(regDate.getTime() + 30 * 24 * 60 * 60 * 1e3);
    if (now > trialEndDate) {
      const expiredConfig = {
        ...config,
        subscriptionStatus: "expired"
      };
      updateTenantConfig(expiredConfig);
      return { status: "expired", daysLeft: 0, plan: config.subscriptionPlan };
    } else {
      const diffTime = Math.abs(trialEndDate.getTime() - now.getTime());
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return { status: "trial", daysLeft: diffDays, plan: config.subscriptionPlan };
    }
  }
  return { status: config.subscriptionStatus, daysLeft: 0, plan: config.subscriptionPlan };
};
const getDashboardStats = async (preFetchedAppointments, preFetchedClients, preFetchedBarbers) => {
  const appointments = preFetchedAppointments || await getAppointments();
  const clients = preFetchedClients || await getClients();
  const barbers = preFetchedBarbers || await getBarbers();
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;
  let dailyEarnings = 0;
  let weeklyEarnings = 0;
  let monthlyEarnings = 0;
  let yearlyEarnings = 0;
  let completedServices = 0;
  const oneWeekAgo = /* @__PURE__ */ new Date();
  oneWeekAgo.setDate(now.getDate() - 7);
  oneWeekAgo.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const monthlySums = {};
  const barberSums = {};
  const servicePopularity = {};
  const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().substring(2)}`;
    monthlySums[key] = 0;
  }
  barbers.forEach((b) => {
    barberSums[b.name] = { value: 0, count: 0 };
  });
  appointments.forEach((apt) => {
    if (apt.status !== "completed") return;
    completedServices++;
    const aptPrice = apt.price || 0;
    const aptDateStr = apt.date;
    const aptDate = /* @__PURE__ */ new Date(aptDateStr + "T12:00:00");
    if (aptDateStr === todayStr) {
      dailyEarnings += aptPrice;
    }
    if (aptDate >= oneWeekAgo && aptDateStr <= todayStr) {
      weeklyEarnings += aptPrice;
    }
    if (aptDate >= startOfMonth && aptDate.getFullYear() === now.getFullYear() && aptDate.getMonth() === now.getMonth()) {
      monthlyEarnings += aptPrice;
    }
    if (aptDate >= startOfYear && aptDate.getFullYear() === now.getFullYear()) {
      yearlyEarnings += aptPrice;
    }
    const mKey = `${monthNames[aptDate.getMonth()]} ${aptDate.getFullYear().toString().substring(2)}`;
    if (mKey in monthlySums) {
      monthlySums[mKey] += aptPrice;
    }
    const bName = apt.barberName;
    if (barberSums[bName]) {
      barberSums[bName].value += aptPrice;
      barberSums[bName].count += 1;
    } else {
      barberSums[bName] = { value: aptPrice, count: 1 };
    }
    const sName = apt.serviceName;
    servicePopularity[sName] = (servicePopularity[sName] || 0) + 1;
  });
  const monthlyHistory = Object.entries(monthlySums).map(([name, faturamento]) => ({
    name,
    faturamento
  }));
  const barberPerformance = Object.entries(barberSums).map(([name, stats]) => ({
    name,
    faturamento: stats.value,
    atendimentos: stats.count
  }));
  const popularServices = Object.entries(servicePopularity).map(([name, valor]) => ({ name, valor })).sort((a, b) => b.valor - a.valor).slice(0, 5);
  return {
    dailyEarnings,
    weeklyEarnings,
    monthlyEarnings,
    yearlyEarnings,
    registeredClients: clients.length,
    completedServices,
    monthlyHistory,
    barberPerformance,
    servicePopularity: popularServices
  };
};
const getBarberShopProfile = async (tenantId) => {
  const targetTenantId = !tenantId || tenantId === "default" ? getCurrentTenantId() : tenantId;
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from("barber_shops").select("*").eq("tenant_id", targetTenantId).maybeSingle();
      if (error) throw error;
      if (data) {
        const prof = {
          tenantId: data.tenant_id,
          name: data.name,
          logoUrl: data.logo_url?.trim() || void 0,
          createdAt: data.created_at,
          subscriptionPlan: data.subscription_plan || "mensal",
          subscriptionStatus: data.subscription_status || "expired",
          subscriptionExpiresAt: data.subscription_expires_at || void 0
        };
        if (!isServer) {
          const configKey = `mbg_tenant_config_${targetTenantId}`;
          const currentConfigStr = window.localStorage.getItem(configKey);
          let isRecreated = false;
          if (currentConfigStr) {
            try {
              const currentConfig = JSON.parse(currentConfigStr);
              if (currentConfig.registeredAt && data.created_at) {
                const localRegTime = new Date(currentConfig.registeredAt).getTime();
                const dbRegTime = new Date(data.created_at).getTime();
                if (Math.abs(dbRegTime - localRegTime) > 5e3) {
                  isRecreated = true;
                }
              }
            } catch (e) {
            }
          }
          if (isRecreated) {
            console.log("Tenant foi recriado no servidor. Limpando cache local antigo...");
            window.localStorage.removeItem(`mbg_profile_${targetTenantId}`);
            window.localStorage.removeItem(`mbg_tenant_config_${targetTenantId}`);
            window.localStorage.removeItem(`mbg_barbers_${targetTenantId}`);
            window.localStorage.removeItem(`mbg_services_${targetTenantId}`);
            window.localStorage.removeItem(`mbg_clients_${targetTenantId}`);
            window.localStorage.removeItem(`mbg_appointments_${targetTenantId}`);
            const localSessionStr = window.localStorage.getItem("mbg_session");
            if (localSessionStr) {
              try {
                const localSession = JSON.parse(localSessionStr);
                if (localSession && localSession.role === "client") {
                  window.localStorage.removeItem("mbg_session");
                }
              } catch (e) {
              }
            }
          }
          window.localStorage.setItem(`mbg_profile_${targetTenantId}`, JSON.stringify(prof));
          const updatedConfig = {
            registeredAt: data.created_at || (/* @__PURE__ */ new Date()).toISOString(),
            subscriptionPlan: data.subscription_plan || void 0,
            subscriptionStatus: data.subscription_status || "expired",
            subscriptionExpiresAt: data.subscription_expires_at || void 0
          };
          window.localStorage.setItem(configKey, JSON.stringify(updatedConfig));
        }
        return prof;
      } else {
        if (!isServer) {
          window.localStorage.removeItem(`mbg_profile_${targetTenantId}`);
          window.localStorage.removeItem(`mbg_tenant_config_${targetTenantId}`);
          window.localStorage.removeItem(`mbg_barbers_${targetTenantId}`);
          window.localStorage.removeItem(`mbg_services_${targetTenantId}`);
          window.localStorage.removeItem(`mbg_clients_${targetTenantId}`);
          window.localStorage.removeItem(`mbg_appointments_${targetTenantId}`);
        }
      }
      return null;
    } catch (e) {
      console.warn("Erro ao buscar perfil da clínica no Supabase:", e);
    }
  }
  if (!isServer) {
    const stored = window.localStorage.getItem(`mbg_profile_${targetTenantId}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Erro ao ler perfil local:", e);
      }
    }
  }
  return null;
};
const updateBarberShopProfile = async (profile) => {
  const targetTenantId = !profile.tenantId || profile.tenantId === "default" ? getCurrentTenantId() : profile.tenantId;
  const cleanLogoUrl = profile.logoUrl?.trim() || void 0;
  const cleanProfile = {
    ...profile,
    tenantId: targetTenantId,
    name: profile.name.trim(),
    logoUrl: cleanLogoUrl
  };
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from("barber_shops").upsert({
        tenant_id: targetTenantId,
        name: cleanProfile.name,
        logo_url: cleanLogoUrl || null
      });
      if (error) throw error;
      toast.success("Perfil da clínica atualizado no servidor!");
    } catch (e) {
      console.error("Erro ao salvar perfil no Supabase:", e);
      toast.error("Erro ao salvar no servidor, atualizando localmente...");
    }
  }
  if (!isServer) {
    window.localStorage.setItem(`mbg_profile_${targetTenantId}`, JSON.stringify(cleanProfile));
    toast.success("Perfil da clínica atualizado com sucesso!");
  }
};
const getAllBarberShops = async () => {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from("barber_shops").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).map((d) => ({
        tenantId: d.tenant_id,
        name: d.name,
        logoUrl: d.logo_url || void 0,
        createdAt: d.created_at,
        subscriptionPlan: d.subscription_plan || "mensal",
        subscriptionStatus: d.subscription_status || "expired",
        subscriptionExpiresAt: d.subscription_expires_at || void 0
      }));
    } catch (e) {
      console.error("Erro ao buscar todas as barbearias:", e);
      return [];
    }
  }
  return [];
};
const updateBarberShopSubscription = async (tenantId, plan, status, expiresAt) => {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from("barber_shops").update({
        subscription_plan: plan,
        subscription_status: status,
        subscription_expires_at: expiresAt
      }).eq("tenant_id", tenantId);
      if (error) throw error;
      toast.success("Assinatura da barbearia atualizada com sucesso!");
      return true;
    } catch (e) {
      console.error("Erro ao atualizar assinatura no Supabase:", e);
      toast.error("Erro ao salvar alterações no banco online.");
      return false;
    }
  }
  return false;
};
const deleteBarberShop = async (tenantId) => {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.rpc("delete_barber_shop_cascade", {
        target_tenant_id: tenantId
      });
      if (error) throw error;
      toast.success("Barbearia e todos os dados associados foram excluídos com sucesso!");
      return true;
    } catch (e) {
      console.error("Erro ao excluir barbearia:", e);
      toast.error("Erro ao excluir barbearia no servidor.");
      return false;
    }
  }
  return false;
};
const appCss = "/assets/styles-DZLW2v3z.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$4 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" },
      { title: "DOCTORCORPO GO" },
      { name: "description", content: "DoctorCorpo GO — Seu horário, seu procedimento, você no controle. Sistema de agendamento online fácil e prático para clínicas de estética e odontologia." },
      { name: "author", content: "DoctorCorpo GO" },
      { property: "og:title", content: "DOCTORCORPO GO" },
      { property: "og:description", content: "DoctorCorpo GO — Seu horário, seu procedimento, você no controle. Sistema de agendamento online fácil e prático para clínicas de estética e odontologia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@doctorcorpogo" },
      { name: "twitter:title", content: "DOCTORCORPO GO" },
      { name: "twitter:description", content: "DoctorCorpo GO — Seu horário, seu procedimento, você no controle. Sistema de agendamento online fácil e prático para clínicas de estética e odontologia." },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "DoctorCorpo GO" },
      { name: "theme-color", content: "#09090b" },
      { name: "keywords", content: "dentista, clinica de estetica, harmonização facial, preenchimento labial, botox, odontologia, clareamento dental, doctorcorpogo, doctorcorpo, agendamento de consulta, estetica goiás" },
      { name: "robots", content: "index, follow" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "manifest",
        href: "/manifest.json"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/og_image.png?v=5"
      },
      {
        rel: "apple-touch-icon",
        href: "https://doctorcorpogo.netlify.app/og_image.png?v=5"
      },
      {
        rel: "canonical",
        href: "https://doctorcorpogo.netlify.app"
      }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          "name": "DoctorCorpo GO",
          "image": "https://doctorcorpogo.netlify.app/og_image.png?v=5",
          "url": "https://doctorcorpogo.netlify.app",
          "telephone": "+5562993299120",
          "priceRange": "$$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Goiânia",
            "addressRegion": "GO",
            "addressCountry": "BR"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:00",
            "closes": "19:00"
          }
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$4.useRouteContext();
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tenant = params.get("t") || params.get("barberia");
      if (tenant) {
        window.localStorage.setItem("mbg_client_tenant", tenant);
      }
    }
    initDB();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] });
}
const DEFAULT_OG_IMAGE = "https://doctorcorpogo.netlify.app/og_image.png?v=5";
const DEFAULT_SITE_TITLE = "DOCTORCORPO GO";
const DEFAULT_DESCRIPTION = "DoctorCorpo GO — Seu horário, seu procedimento, você no controle. Sistema de agendamento online fácil e prático para clínicas de estética e odontologia.";
const updatePageMeta = (profile) => {
  if (typeof document === "undefined") return;
  const title = profile?.name ? `${profile.name} — Agendamento Online` : DEFAULT_SITE_TITLE;
  const description = profile?.name ? `Agende seu horário na clínica ${profile.name} online de forma rápida, fácil e sem filas.` : DEFAULT_DESCRIPTION;
  const logoUrl = profile?.logoUrl?.trim() || DEFAULT_OG_IMAGE;
  document.title = title;
  const setMeta = (attr, attrVal, content) => {
    let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };
  const setLink = (rel, href) => {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  };
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:image", logoUrl);
  setMeta("property", "og:image:secure_url", logoUrl);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", logoUrl);
  if (profile?.logoUrl) {
    setLink("icon", logoUrl);
    setLink("apple-touch-icon", logoUrl);
  }
};
const $$splitComponentImporter$3 = () => import("./login-SRkxTaNB.mjs");
const Route$3 = createFileRoute("/login")({
  loader: async ({
    location
  }) => {
    const search = location.search;
    const tenant = search?.t || search?.barberia || search?.clinica || "";
    if (tenant) {
      const profile = await getBarberShopProfile(tenant);
      return {
        profile
      };
    }
    return {
      profile: null
    };
  },
  head: ({
    loaderData
  }) => {
    const profile = loaderData?.profile;
    const title = profile?.name ? `${profile.name} — Agendamento Online` : "Entrar - DoctorCorpo GO";
    const description = profile?.name ? `Agende sua consulta ou procedimento na clínica ${profile.name} online.` : "Acesse sua conta para agendar consultas ou gerenciar atendimentos na clínica.";
    const logoUrl = profile?.logoUrl?.trim() || DEFAULT_OG_IMAGE;
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: description
      }, {
        property: "og:image",
        content: logoUrl
      }, {
        property: "og:image:secure_url",
        content: logoUrl
      }, {
        property: "og:type",
        content: "website"
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: title
      }, {
        name: "twitter:description",
        content: description
      }, {
        name: "twitter:image",
        content: logoUrl
      }, {
        name: "robots",
        content: "index, follow"
      }],
      links: [{
        rel: "canonical",
        href: "https://doctorcorpogo.netlify.app/login"
      }, ...profile?.logoUrl ? [{
        rel: "icon",
        href: logoUrl
      }, {
        rel: "apple-touch-icon",
        href: logoUrl
      }] : []]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./client-BgSEueMv.mjs");
const Route$2 = createFileRoute("/client")({
  loader: async ({
    location
  }) => {
    const search = location.search;
    const tenant = search?.t || search?.barberia || search?.clinica || "";
    if (tenant) {
      const profile = await getBarberShopProfile(tenant);
      return {
        profile
      };
    }
    return {
      profile: null
    };
  },
  head: ({
    loaderData
  }) => {
    const profile = loaderData?.profile;
    const title = profile?.name ? `${profile.name} — Agendamento Online` : "Painel do Cliente - DoctorCorpo GO";
    const description = profile?.name ? `Agende seu horário na clínica ${profile.name} online de forma rápida e prática!` : "DoctorCorpo GO — Sistema de agendamento online fácil e prático.";
    const logoUrl = profile?.logoUrl?.trim() || DEFAULT_OG_IMAGE;
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: description
      }, {
        property: "og:image",
        content: logoUrl
      }, {
        property: "og:image:secure_url",
        content: logoUrl
      }, {
        property: "og:type",
        content: "website"
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: title
      }, {
        name: "twitter:description",
        content: description
      }, {
        name: "twitter:image",
        content: logoUrl
      }],
      links: profile?.logoUrl ? [{
        rel: "icon",
        href: logoUrl
      }, {
        rel: "apple-touch-icon",
        href: logoUrl
      }] : []
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin-bqAtmioS.mjs");
const Route$1 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Painel da Clínica - DoctorCorpo GO"
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BViqY9f0.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "DoctorCorpo GO — Clínica de Estética & Odontologia"
    }, {
      name: "description",
      content: "Agende sua consulta ou procedimento de estética online em poucos cliques. Simples, rápido e no seu controle."
    }, {
      property: "og:title",
      content: "DoctorCorpo GO — Clínica de Estética & Odontologia"
    }, {
      property: "og:description",
      content: "Elimine a espera. Agende seus procedimentos de harmonização facial, odontologia e estética em tempo real."
    }, {
      property: "og:type",
      content: "website"
    }, {
      property: "og:image",
      content: "https://doctorcorpogo.netlify.app/og_image.png?v=5"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }, {
      name: "twitter:image",
      content: "https://doctorcorpogo.netlify.app/og_image.png?v=5"
    }, {
      name: "keywords",
      content: "dentista, clinica de estetica, harmonização facial, preenchimento labial, botox, odontologia, clareamento dental, doctorcorpogo, doctorcorpo, agendamento de consulta, estetica goiás"
    }, {
      name: "robots",
      content: "index, follow"
    }],
    links: [{
      rel: "canonical",
      href: "https://doctorcorpogo.netlify.app/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const LoginRoute = Route$3.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$4
});
const ClientRoute = Route$2.update({
  id: "/client",
  path: "/client",
  getParentRoute: () => Route$4
});
const AdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$4
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  ClientRoute,
  LoginRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  addService as A,
  deleteService as B,
  updateBarber as C,
  DEFAULT_ADMIN_PHONE as D,
  addBarber as E,
  deleteBarber as F,
  router as G,
  setCurrentUser as a,
  getCurrentUser as b,
  addClient as c,
  checkSubscriptionStatus as d,
  getServices as e,
  getBarbers as f,
  getBarberShopProfile as g,
  getAppointments as h,
  isSupabaseConfigured as i,
  addAppointment as j,
  deleteClientAppointments as k,
  logout as l,
  updateAppointmentStatus as m,
  getAllBarberShops as n,
  updateBarberShopSubscription as o,
  deleteBarberShop as p,
  DEFAULT_WORK_HOURS as q,
  getClients as r,
  supabase as s,
  getDashboardStats as t,
  updatePageMeta as u,
  updateBarberShopProfile as v,
  resetLocalDB as w,
  updateClient as x,
  deleteClient as y,
  updateService as z
};
