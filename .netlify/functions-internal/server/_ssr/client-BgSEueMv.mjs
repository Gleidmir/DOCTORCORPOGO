import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as BarberGoLogo } from "./logo-Cy3MS0-l.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getBarberShopProfile, u as updatePageMeta, d as checkSubscriptionStatus, b as getCurrentUser, D as DEFAULT_ADMIN_PHONE, l as logout, e as getServices, f as getBarbers, h as getAppointments, j as addAppointment, a as setCurrentUser, k as deleteClientAppointments, m as updateAppointmentStatus } from "./router-DBqFSJ_k.mjs";
import { X, b as LogOut, T as TriangleAlert, C as Clock, c as ChevronRight, d as ChevronLeft, e as CircleCheck, f as Trash2, g as CalendarCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function WhatsAppIcon({
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) });
}
function ClientDashboard() {
  const navigate = useNavigate();
  const handleClearSessionAndGoHome = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("mbg_client_tenant");
      window.localStorage.removeItem("mbg_session");
    }
    navigate({
      to: "/"
    });
  };
  const [session, setSession] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("book");
  const [shopProfile, setShopProfile] = reactExports.useState(null);
  const [subCheck, setSubCheck] = reactExports.useState(null);
  const [profileLoaded, setProfileLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let tenant2 = "";
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      tenant2 = params.get("t") || params.get("barberia") || "";
      if (tenant2) {
        window.localStorage.setItem("mbg_client_tenant", tenant2);
      } else {
        tenant2 = window.localStorage.getItem("mbg_client_tenant") || "";
      }
    }
    if (tenant2) {
      getBarberShopProfile(tenant2).then((prof) => {
        setShopProfile(prof);
        updatePageMeta(prof);
        const check = checkSubscriptionStatus();
        setSubCheck(check);
        setProfileLoaded(true);
      }).catch(() => {
        setProfileLoaded(true);
      });
    } else {
      setProfileLoaded(true);
    }
    const user = getCurrentUser();
    if (!user) {
      navigate({
        to: tenant2 ? `/login?t=${tenant2}` : "/login"
      });
    } else if (user.role === "admin") {
      setSession({
        role: "client",
        name: `${user.name} (Visualização)`,
        phone: "5562993299120"
      });
    } else if (user.role !== "client") {
      navigate({
        to: tenant2 ? `/login?t=${tenant2}` : "/login"
      });
    } else {
      setSession(user);
    }
  }, [navigate]);
  const handleLogout = () => {
    const user = getCurrentUser();
    if (user && user.role === "admin") {
      navigate({
        to: "/admin"
      });
      return;
    }
    const tenant2 = typeof window !== "undefined" ? window.localStorage.getItem("mbg_client_tenant") : "";
    logout();
    navigate({
      to: tenant2 ? `/login?t=${tenant2}` : "/login"
    });
  };
  const getTenantParam = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("t") || params.get("barberia") || window.localStorage.getItem("mbg_client_tenant") || "";
    }
    return "";
  };
  const tenant = getTenantParam();
  if (!profileLoaded || !session && tenant) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-zinc-950 flex items-center justify-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderComponent, {}) });
  }
  if (profileLoaded && !shopProfile && tenant) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-zinc-950 text-white antialiased flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-zinc-900/60 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 pt-[calc(28px+env(safe-area-inset-top,0px))] sm:pt-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-lg px-4 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BarberGoLogo, { className: "w-8 h-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-extrabold tracking-tight", children: "DoctorCorpo GO" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 mx-auto w-full max-w-lg px-4 py-12 flex flex-col justify-center items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-8 w-8 text-red-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-extrabold text-white tracking-tight", children: "Estabelecimento Não Encontrado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-400 text-xs mt-3 max-w-xs leading-relaxed", children: "Esta clínica não foi encontrada em nossa base de dados ou foi desativada pelo administrador." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClearSessionAndGoHome, className: "mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#39ff14] hover:bg-[#2ee610] text-zinc-950 px-6 py-3.5 text-xs font-black transition-all cursor-pointer active:scale-95 shadow-lg shadow-[#39ff14]/20 uppercase animate-pulse", children: "Voltar para o Início" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-4 text-center text-[10px] text-zinc-600 border-t border-zinc-900 bg-zinc-950", children: "Desenvolvido para DoctorCorpo GO — Todos os direitos reservados." })
    ] });
  }
  if (subCheck?.status === "expired") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-zinc-950 text-white antialiased flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-zinc-900/60 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 pt-[calc(28px+env(safe-area-inset-top,0px))] sm:pt-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-lg flex items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          shopProfile?.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: shopProfile.logoUrl, alt: shopProfile.name, className: "w-8 h-8 rounded-full object-cover border border-amber-500/50 shadow-sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BarberGoLogo, { className: "w-8 h-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-extrabold tracking-tight", children: shopProfile ? shopProfile.name : "DoctorCorpo GO" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-zinc-400 font-medium flex flex-col items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Olá, ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-black", children: session.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-amber-300/80 font-mono tracking-tight mt-0.5", children: session.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "p-1.5 rounded-lg bg-red-950/30 border border-red-500/50 hover:bg-red-650 hover:border-red-500 text-red-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-md active:scale-95", title: "Sair", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 mx-auto w-full max-w-lg px-4 py-12 flex flex-col justify-center items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-6 animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-extrabold text-white tracking-tight", children: "Agendamento Indisponível" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-400 text-xs mt-3 max-w-xs leading-relaxed", children: "Esta clínica está temporariamente indisponível para novos agendamentos online. Por favor, entre em contato diretamente com o estabelecimento para mais informações." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${DEFAULT_ADMIN_PHONE}`, target: "_blank", rel: "noopener noreferrer", className: "mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-emerald-600/10 active:scale-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppIcon, { className: "h-4 w-4 fill-current shrink-0" }),
          " Falar com o Estabelecimento"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-4 text-center text-[10px] text-zinc-600 border-t border-zinc-900 bg-zinc-950", children: "Desenvolvido para DoctorCorpo GO — Todos os direitos reservados." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-zinc-950 text-white antialiased flex flex-col justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-zinc-900/60 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 pt-[calc(28px+env(safe-area-inset-top,0px))] sm:pt-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-lg flex items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        shopProfile?.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: shopProfile.logoUrl, alt: shopProfile.name, className: "w-8 h-8 rounded-full object-cover border border-amber-500/50 shadow-sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BarberGoLogo, { className: "w-8 h-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-extrabold tracking-tight", children: shopProfile ? shopProfile.name : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "DoctorCorpo ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500", children: "GO" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-zinc-400 font-medium flex flex-col items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Olá, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-black", children: session.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-amber-300/80 font-mono tracking-tight mt-0.5", children: session.phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "p-1.5 rounded-lg bg-red-950/30 border border-red-500/50 hover:bg-red-650 hover:border-red-500 text-red-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-md active:scale-95", title: "Sair", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-zinc-950 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-lg px-4 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("book"), className: `flex-1 rounded-xl py-2.5 text-xs font-bold transition-all border ${activeTab === "book" ? "bg-amber-500 text-zinc-950 border-amber-500 glow-emerald shadow-lg shadow-amber-500/10" : "bg-zinc-900/60 text-amber-400/80 border-amber-500/15 shadow-[0_0_10px_rgba(20,184,166,0.06)] hover:text-white hover:bg-zinc-800/60 hover:border-amber-500/30"}`, children: "Agendar Horário" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("my-appointments"), className: `flex-1 rounded-xl py-2.5 text-xs font-bold transition-all border ${activeTab === "my-appointments" ? "bg-amber-500 text-zinc-950 border-amber-500 glow-emerald shadow-lg shadow-amber-500/10" : "bg-zinc-900/60 text-amber-400/80 border-amber-500/15 shadow-[0_0_10px_rgba(20,184,166,0.06)] hover:text-white hover:bg-zinc-800/60 hover:border-amber-500/30"}`, children: "Meus Agendamentos" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 mx-auto w-full max-w-lg px-4 py-4", children: activeTab === "book" ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookingFlow, { clientPhone: session.phone, clientName: session.name, shopProfile, onSessionUpdate: setSession, onLogout: handleLogout }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MyAppointments, { clientPhone: session.phone, shopProfile }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-4 text-center text-[10px] text-zinc-600 border-t border-zinc-900 bg-zinc-950", children: "Desenvolvido para DoctorCorpo GO — Todos os direitos reservados." })
  ] });
}
function ShopCircleLogo({
  profile,
  className = "w-12 h-12"
}) {
  if (profile?.logoUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative flex items-center justify-center shrink-0 ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.logoUrl, alt: profile.name, className: "w-full h-full rounded-full object-cover border-2 border-amber-500 shadow-lg" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BarberGoLogo, { className, animate: false });
}
function LoaderComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-zinc-500", children: "Carregando..." })
  ] });
}
function BookingFlow({
  clientPhone,
  clientName,
  shopProfile,
  onSessionUpdate,
  onLogout
}) {
  const [step, setStep] = reactExports.useState("service");
  const [services, setServices] = reactExports.useState([]);
  const [barbers, setBarbers] = reactExports.useState([]);
  const [appointments, setAppointments] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [selectedService, setSelectedService] = reactExports.useState(null);
  const [selectedBarber, setSelectedBarber] = reactExports.useState(null);
  const [selectedDate, setSelectedDate] = reactExports.useState("");
  const [selectedTime, setSelectedTime] = reactExports.useState("");
  const [days, setDays] = reactExports.useState([]);
  const [currentMonthYear, setCurrentMonthYear] = reactExports.useState("");
  const [monthOffset, setMonthOffset] = reactExports.useState(0);
  const [customClientName, setCustomClientName] = reactExports.useState(clientName);
  const [customClientPhone, setCustomClientPhone] = reactExports.useState(clientPhone);
  reactExports.useEffect(() => {
    setCustomClientName(clientName);
    setCustomClientPhone(clientPhone);
  }, [clientName, clientPhone]);
  reactExports.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const svcs = await getServices();
        setServices(svcs.filter((s) => s.isActive !== false));
        const barbs = await getBarbers();
        setBarbers(barbs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  reactExports.useEffect(() => {
    if (step === "datetime") {
      const loadApts = async () => {
        try {
          const all = await getAppointments();
          setAppointments(all);
        } catch (e) {
          console.error(e);
        }
      };
      loadApts();
    }
  }, [step, selectedDate, selectedBarber]);
  reactExports.useEffect(() => {
    const today = /* @__PURE__ */ new Date();
    const list = [];
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const baseDate = /* @__PURE__ */ new Date();
    baseDate.setMonth(today.getMonth() + monthOffset);
    setCurrentMonthYear(`${months[baseDate.getMonth()]} | ${baseDate.getFullYear()}`);
    const startDate = monthOffset === 0 ? /* @__PURE__ */ new Date() : new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    for (let i = 0; i < 15; i++) {
      const d = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1e3);
      if (d.getMonth() !== baseDate.getMonth() && monthOffset !== 0) continue;
      const dayName = dayNames[d.getDay()];
      const dayNum = String(d.getDate()).padStart(2, "0");
      const monthNum = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      const dayOfWeek = d.getDay();
      const worksThisWeekday = selectedBarber?.workDays ? selectedBarber.workDays.includes(dayOfWeek) : [1, 2, 3, 4, 5, 6].includes(dayOfWeek);
      const isBlocked = selectedBarber?.blockedDates ? selectedBarber.blockedDates.includes(dateStr) : false;
      const isAvailable = worksThisWeekday && !isBlocked;
      list.push({
        label: dayName,
        dayNum: `${dayNum}/${monthNum}`,
        dateStr,
        isAvailable
      });
    }
    setDays(list);
    const firstAvailableDay = list.find((d) => d.isAvailable);
    if (firstAvailableDay && (!selectedDate || !list.find((d) => d.dateStr === selectedDate)?.isAvailable)) {
      setSelectedDate(firstAvailableDay.dateStr);
    }
  }, [monthOffset, selectedDate, selectedBarber]);
  const formatDuration = (mins) => {
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      const rem = mins % 60;
      return `${String(hrs).padStart(2, "0")}:${String(rem).padStart(2, "0")} h`;
    }
    return `${mins}min`;
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(price);
  };
  const allTimeSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
  const getOcupiedSlots = () => {
    if (!selectedDate || !selectedBarber) return [];
    return appointments.filter((a) => a.date === selectedDate && a.barberId === selectedBarber.id && a.status !== "cancelled").map((a) => a.time);
  };
  const occupiedSlots = getOcupiedSlots();
  const getBarberWhatsAppLink = () => {
    if (!selectedBarber || !selectedService) return "";
    let rawPhone = selectedBarber.phone || DEFAULT_ADMIN_PHONE;
    let cleanPhone = rawPhone.replace(/\D/g, "");
    if (cleanPhone.length >= 10 && cleanPhone.length <= 11 && !cleanPhone.startsWith("55")) {
      cleanPhone = "55" + cleanPhone;
    } else if (cleanPhone.length === 0) {
      cleanPhone = DEFAULT_ADMIN_PHONE;
    }
    const dateStr = (/* @__PURE__ */ new Date(selectedDate + "T12:00:00")).toLocaleDateString("pt-BR");
    const shopName = shopProfile?.name ? shopProfile.name.toUpperCase() : "NOSSA CLÍNICA";
    const message = `Olá, ${selectedBarber.name}! Acabei de realizar um agendamento na clínica *${shopName}*:

👤 *Cliente:* ${customClientName}
📞 *Telefone:* ${customClientPhone}
💇 *Procedimento:* ${selectedService.name}
💰 *Valor:* R$ ${selectedService.price.toFixed(2)}
📅 *Data:* ${dateStr}
⏰ *Horário:* ${selectedTime}

Por favor, confirme se está tudo certo! Obrigado.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };
  const handleFinishBooking = async () => {
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) return;
    if (!customClientName.trim() || customClientPhone.replace(/\D/g, "").length < 10) {
      toast.error("Por favor, preencha o nome e um telefone válido.");
      return;
    }
    setLoading(true);
    try {
      const cleanPhone = customClientPhone.replace(/\D/g, "");
      await addAppointment({
        clientId: `c_${cleanPhone}`,
        clientName: customClientName,
        clientPhone: cleanPhone,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        price: selectedService.price,
        barberId: selectedBarber.id,
        barberName: selectedBarber.name,
        date: selectedDate,
        time: selectedTime
      });
      const newSession = {
        role: "client",
        name: customClientName,
        phone: cleanPhone
      };
      setCurrentUser(newSession);
      onSessionUpdate(newSession);
      setStep("success");
    } catch (e) {
      console.error(e);
      toast.error(e?.message || "Erro ao salvar o agendamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate("");
    setSelectedTime("");
    setMonthOffset(0);
    setStep("service");
  };
  const renderStepsHeader = () => {
    const stepsList = ["Serviço", "Profissional", "Data e horário", "Confirmação"];
    const stepIndexes = {
      service: 0,
      barber: 1,
      datetime: 2,
      confirm: 3,
      success: 4
    };
    const currentIndex = stepIndexes[step];
    if (step === "success") return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[10px] uppercase tracking-wider text-zinc-500 font-bold", children: "Passos para agendar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mt-3 px-2", children: stepsList.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center flex-1 relative", children: [
        idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute right-[50%] top-2 -translate-y-1/2 h-[2px] w-full -z-10 ${idx <= currentIndex ? "bg-amber-500" : "bg-zinc-800"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-4 w-4 rounded-full border-2 flex items-center justify-center ${idx <= currentIndex ? "bg-amber-500 border-amber-500 text-zinc-950" : "bg-zinc-950 border-zinc-800"}`, children: idx < currentIndex && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-zinc-950" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] mt-1.5 font-bold transition-all ${idx === currentIndex ? "text-amber-400" : "text-zinc-500"}`, children: s })
      ] }, s)) })
    ] });
  };
  if (loading && step === "service") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderComponent, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-950 py-2", children: [
    renderStepsHeader(),
    step === "service" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-right-4 duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-zinc-300 mb-3 px-1 uppercase tracking-wider", children: "Serviços" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 max-h-[60vh] overflow-y-auto pr-1", children: [
        services.map((svc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setSelectedService(svc);
          setStep("barber");
        }, className: "w-full flex items-center justify-between bg-zinc-900/40 hover:bg-zinc-900/70 border border-zinc-800/60 hover:border-amber-500/30 rounded-2xl p-4 text-left transition-all group active:scale-[0.99] hover:scale-[1.01] hover:shadow-lg hover:shadow-amber-500/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShopCircleLogo, { profile: shopProfile }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-white group-hover:text-amber-400 transition-colors leading-tight", children: svc.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[11px] text-zinc-500 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDuration(svc.duration) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-extrabold text-sky-400 mt-1", children: formatPrice(svc.price) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-zinc-600 group-hover:text-amber-400 transition-colors" })
        ] }, svc.id)),
        services.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-zinc-600 py-8", children: "Nenhum serviço cadastrado." })
      ] })
    ] }),
    step === "barber" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-right-4 duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wider", children: "Escolha o Especialista" }),
      selectedService && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 bg-zinc-900/30 border border-zinc-800/40 rounded-xl p-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShopCircleLogo, { profile: shopProfile }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-wider text-amber-400 font-extrabold", children: "Procedimento Selecionado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-white", children: selectedService.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-sky-400 font-bold", children: formatPrice(selectedService.price) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: barbers.map((barber) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setSelectedBarber(barber);
        setStep("datetime");
      }, className: `rounded-2xl p-4 text-center border transition-all active:scale-95 hover:scale-[1.02] flex flex-col items-center ${selectedBarber?.id === barber.id ? "bg-amber-500 text-zinc-950 border-amber-400 glow-emerald" : "bg-zinc-900/40 text-white border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: barber.avatar, alt: barber.name, className: "w-14 h-14 rounded-full object-cover mb-2 border-2 border-zinc-800 shadow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-black tracking-wider uppercase ${selectedBarber?.id === barber.id ? "text-zinc-950" : "text-amber-400"}`, children: barber.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-65 mt-1 font-bold", children: "Especialista" })
      ] }, barber.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep("service"), className: "flex-1 rounded-xl bg-amber-600 text-zinc-950 hover:bg-amber-500 transition-all py-3.5 text-xs font-black active:scale-95 shadow-md shadow-amber-500/10 cursor-pointer", children: "Voltar" }) })
    ] }),
    step === "datetime" && selectedService && selectedBarber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-right-4 duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-3 flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShopCircleLogo, { profile: shopProfile }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold text-white", children: selectedService.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] text-zinc-500 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDuration(selectedService.duration) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "com ",
              selectedBarber.name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-extrabold text-sky-400 mt-0.5", children: formatPrice(selectedService.price) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 px-1 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-zinc-300 uppercase tracking-wide", children: currentMonthYear }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMonthOffset((prev) => Math.max(0, prev - 1)), disabled: monthOffset === 0, className: "p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 disabled:opacity-40 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMonthOffset((prev) => prev + 1), className: "p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-zinc-800 select-none", children: days.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: !d.isAvailable, onClick: () => {
        setSelectedDate(d.dateStr);
        setSelectedTime("");
      }, className: `flex-col items-center justify-center p-3 rounded-2xl min-w-[70px] text-center transition-all border shrink-0 hover:scale-[1.02] ${!d.isAvailable ? "bg-zinc-950/20 text-zinc-700 border-zinc-950/10 cursor-not-allowed opacity-30" : selectedDate === d.dateStr ? "bg-amber-500 text-zinc-950 border-amber-400 glow-emerald shadow-md" : "bg-zinc-900/40 text-white border-zinc-800 hover:border-zinc-700"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold opacity-60 uppercase", children: d.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black mt-1", children: d.dayNum })
      ] }, d.dateStr)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5", children: "Escolha um horário" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-5 gap-1.5 max-h-[220px] overflow-y-auto pr-1", children: (() => {
          const todayStr = (() => {
            const d = /* @__PURE__ */ new Date();
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          })();
          const nowTimeStr = (() => {
            const d = /* @__PURE__ */ new Date();
            const hours = String(d.getHours()).padStart(2, "0");
            const minutes = String(d.getMinutes()).padStart(2, "0");
            return `${hours}:${minutes}`;
          })();
          const barberHours = selectedBarber?.workHours && selectedBarber.workHours.length > 0 ? selectedBarber.workHours : allTimeSlots;
          const activeSlots = barberHours.filter((time) => {
            const barberStart = selectedBarber?.startTime || "08:00";
            const barberEnd = selectedBarber?.endTime || "19:00";
            const isWithinShift = time >= barberStart && time <= barberEnd;
            if (selectedDate === todayStr) {
              return isWithinShift && time > nowTimeStr;
            }
            return isWithinShift;
          });
          if (activeSlots.length === 0) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-zinc-500 col-span-5 py-4 font-semibold", children: "Sem horários disponíveis para o turno deste profissional neste dia." });
          }
          return activeSlots.map((time) => {
            const isOccupied = occupiedSlots.includes(time);
            return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: isOccupied, onClick: () => setSelectedTime(time), className: `py-2 text-center text-[10px] font-black rounded-lg transition-all border hover:scale-[1.02] ${selectedTime === time ? "bg-amber-500 text-zinc-950 border-amber-400 glow-emerald shadow-md" : isOccupied ? "bg-zinc-900/20 text-zinc-700 line-through border-zinc-900/10 cursor-not-allowed" : "bg-zinc-900/40 text-white border-zinc-800 hover:border-zinc-700"}`, children: time }, time);
          });
        })() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep("barber"), className: "flex-1 rounded-xl bg-amber-600 text-zinc-950 hover:bg-amber-500 transition-all py-3.5 text-xs font-black active:scale-95 shadow-md shadow-amber-500/10 cursor-pointer", children: "Voltar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          if (!selectedTime) {
            toast.error("Por favor, selecione um horário!");
            return;
          }
          setStep("confirm");
        }, disabled: !selectedTime, className: "flex-1 rounded-xl bg-amber-500 py-3.5 text-xs font-bold text-zinc-950 hover:bg-amber-400 disabled:opacity-50 transition-colors", children: "Continuar" })
      ] })
    ] }),
    step === "confirm" && selectedService && selectedBarber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-zinc-300 uppercase tracking-wider", children: "Confirme seu Agendamento" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 space-y-4 shadow-xl shadow-black/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pb-3 border-b border-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShopCircleLogo, { profile: shopProfile }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-zinc-500 font-bold", children: "Procedimento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-white", children: selectedService.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-sky-400 font-bold", children: formatPrice(selectedService.price) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-zinc-500 font-bold", children: "Especialista" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-white mt-0.5", children: selectedBarber.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-zinc-500 font-bold", children: "Duração" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-amber-400 mt-0.5", children: formatDuration(selectedService.duration) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-zinc-500 font-bold", children: "Data" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-white mt-0.5", children: (/* @__PURE__ */ new Date(selectedDate + "T12:00:00")).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-zinc-500 font-bold", children: "Horário" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-amber-400 mt-0.5", children: selectedTime })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-zinc-800 text-xs space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-zinc-500 font-bold", children: "Nome do Cliente" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-amber-400 uppercase", children: customClientName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-zinc-500 font-bold", children: "WhatsApp (com DDD)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-amber-400", children: customClientPhone })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: loading, onClick: () => setStep("datetime"), className: "flex-1 rounded-xl bg-amber-600 text-zinc-950 hover:bg-amber-500 transition-all py-3.5 text-xs font-black active:scale-95 shadow-md shadow-amber-500/10 cursor-pointer", children: "Voltar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: loading, onClick: handleFinishBooking, className: "flex-1 rounded-xl bg-amber-500 py-3.5 text-xs font-bold text-zinc-950 hover:bg-amber-400 disabled:opacity-50 transition-colors shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2", children: loading ? "Processando..." : "Confirmar Agendamento" })
      ] })
    ] }),
    step === "success" && selectedService && selectedBarber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6 animate-in zoom-in-95 duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-2 ring-emerald-500/20 mb-4 animate-bounce", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-extrabold text-white", children: "Agendamento Confirmado!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-400 text-xs mt-1.5 px-4", children: "Seu horário foi agendado e enviado para a clínica. Te esperamos lá!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-900/60 border border-amber-500/20 rounded-3xl p-5 my-6 text-left relative overflow-hidden holo-card glow-emerald shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-12 -top-12 w-24 h-24 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-12 -bottom-12 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-zinc-950 border-r border-zinc-900" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-zinc-950 border-l border-zinc-900" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-5 border-b border-dashed border-zinc-800/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-amber-400 uppercase tracking-widest font-black flex items-center justify-center gap-1.5 animate-pulse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-400" }),
            "Comprovante de Reserva VIP",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-mono text-white font-extrabold mt-2 tracking-wide glow-emerald-sm", children: selectedTime }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400 font-medium", children: (/* @__PURE__ */ new Date(selectedDate + "T12:00:00")).toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-5 text-xs font-mono text-zinc-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-black tracking-wider uppercase shrink-0", children: "ESTABELECIMENTO:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-extrabold uppercase text-right", children: shopProfile?.name || "DoctorCorpo GO" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-black tracking-wider uppercase shrink-0", children: "PROCEDIMENTO:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-extrabold uppercase text-right", children: selectedService.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-black tracking-wider uppercase shrink-0", children: "VALOR:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-extrabold uppercase text-right", children: formatPrice(selectedService.price) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-black tracking-wider uppercase shrink-0", children: "PROFISSIONAL:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-extrabold uppercase text-right", children: selectedBarber.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-black tracking-wider uppercase shrink-0", children: "CLIENTE:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-extrabold uppercase text-right", children: customClientName })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: getBarberWhatsAppLink(), target: "_blank", rel: "noopener noreferrer", className: "w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 mb-3 active:scale-[0.98]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppIcon, { className: "w-5 h-5" }),
        "Notificar Especialista no WhatsApp"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleReset, className: "w-full rounded-xl bg-blue-900 border border-blue-800 hover:bg-blue-800 py-3.5 text-xs font-bold text-white transition-colors active:scale-[0.98] mb-3", children: "Fazer Novo Agendamento" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onLogout, className: "w-full rounded-xl bg-red-600 hover:bg-red-500 py-3.5 text-xs font-bold text-white transition-colors active:scale-[0.98]", children: "Sair" })
    ] })
  ] });
}
function MyAppointments({
  clientPhone,
  shopProfile
}) {
  const [apts, setApts] = reactExports.useState([]);
  const [barbers, setBarbers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const loadAppointments = async () => {
    setLoading(true);
    try {
      const [allApts, allBarbers] = await Promise.all([getAppointments(), getBarbers()]);
      const dismissedStr = window.localStorage.getItem(`mbg_dismissed_apts_${clientPhone}`);
      const dismissedIds = dismissedStr ? JSON.parse(dismissedStr) : [];
      const clientApts = allApts.filter((a) => a.clientPhone === clientPhone && !dismissedIds.includes(a.id)).sort((a, b) => {
        const getStatusPriority = (status) => {
          if (status === "pending") return 1;
          if (status === "completed") return 2;
          if (status === "cancelled") return 3;
          return 4;
        };
        const priorityA = getStatusPriority(a.status);
        const priorityB = getStatusPriority(b.status);
        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }
        if (a.status === "pending") {
          const dateCompare = a.date.localeCompare(b.date);
          if (dateCompare !== 0) return dateCompare;
          return a.time.localeCompare(b.time);
        } else {
          const dateCompare = b.date.localeCompare(a.date);
          if (dateCompare !== 0) return dateCompare;
          return b.time.localeCompare(a.time);
        }
      });
      setApts(clientApts);
      setBarbers(allBarbers);
    } catch (e) {
      console.error(e);
      toast.error("Erro ao carregar seus agendamentos.");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    loadAppointments();
  }, [clientPhone]);
  const handleCancel = async (id) => {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      setLoading(true);
      try {
        await updateAppointmentStatus(id, "cancelled");
        await loadAppointments();
      } catch (e) {
        console.error(e);
        toast.error("Erro ao cancelar agendamento.");
        setLoading(false);
      }
    }
  };
  const handleClearHistory = async () => {
    if (confirm("Deseja realmente limpar todo o histórico de agendamentos?")) {
      setLoading(true);
      try {
        const completedIds = apts.filter((a) => a.status === "completed").map((a) => a.id);
        const key = `mbg_dismissed_apts_${clientPhone}`;
        const dismissedStr = window.localStorage.getItem(key);
        const dismissedIds = dismissedStr ? JSON.parse(dismissedStr) : [];
        const updatedDismissed = Array.from(/* @__PURE__ */ new Set([...dismissedIds, ...completedIds]));
        window.localStorage.setItem(key, JSON.stringify(updatedDismissed));
        await deleteClientAppointments(clientPhone);
        await loadAppointments();
      } catch (e) {
        console.error("Erro ao limpar histórico no banco, aplicando limpeza local...", e);
        const currentIds = apts.map((a) => a.id);
        const key = `mbg_dismissed_apts_${clientPhone}`;
        const dismissedStr = window.localStorage.getItem(key);
        const dismissedIds = dismissedStr ? JSON.parse(dismissedStr) : [];
        const updated = Array.from(/* @__PURE__ */ new Set([...dismissedIds, ...currentIds]));
        window.localStorage.setItem(key, JSON.stringify(updated));
        toast.success("Histórico limpo localmente!");
        await loadAppointments();
      }
    }
  };
  const getBarberWhatsAppLink = (apt) => {
    const barber = barbers.find((b) => b.id === apt.barberId);
    let rawPhone = barber?.phone || DEFAULT_ADMIN_PHONE;
    let cleanPhone = rawPhone.replace(/\D/g, "");
    if (cleanPhone.length >= 10 && cleanPhone.length <= 11 && !cleanPhone.startsWith("55")) {
      cleanPhone = "55" + cleanPhone;
    } else if (cleanPhone.length === 0) {
      cleanPhone = DEFAULT_ADMIN_PHONE;
    }
    const dateStr = (/* @__PURE__ */ new Date(apt.date + "T12:00:00")).toLocaleDateString("pt-BR");
    const shopName = shopProfile?.name ? shopProfile.name.toUpperCase() : "NOSSA CLÍNICA";
    const message = `Olá, ${apt.barberName}! Sou o cliente ${apt.clientName} e estou enviando esta mensagem para confirmar meu agendamento na clínica *${shopName}*:

💇 *Procedimento:* ${apt.serviceName}
📅 *Data:* ${dateStr}
⏰ *Horário:* ${apt.time}

Está tudo confirmado? Obrigado!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };
  if (loading && apts.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderComponent, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-zinc-300 uppercase tracking-wider", children: "Histórico de Agendamentos" }),
      apts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleClearHistory, className: "inline-flex items-center gap-1.5 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3.5 py-2 text-[10px] font-bold border border-red-500/20 hover:border-transparent transition-all cursor-pointer active:scale-95 shrink-0", title: "Limpar Histórico de Agendamentos", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
        " Limpar Página"
      ] })
    ] }),
    apts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "h-10 w-10 text-zinc-600 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-zinc-400", children: "Nenhum agendamento encontrado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-zinc-500 font-mono mt-2 bg-zinc-950/60 border border-zinc-800/50 py-1.5 px-3 rounded-lg inline-block", children: [
        "Celular: ",
        clientPhone
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-zinc-600 mt-3 leading-relaxed", children: [
        "Se este não for o seu número de cadastro, ou se agendou usando outro celular, clique no botão de ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Sair" }),
        " (porta com seta) no topo direito e acesse com o número correto."
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: apts.map((apt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-900/60 ring-1 ring-zinc-800 rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold text-white", children: apt.serviceName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-zinc-500 font-bold", children: [
            "com ",
            apt.barberName
          ] })
        ] }),
        apt.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400", children: "Realizado" }),
        apt.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[9px] font-bold text-amber-400", children: "Agendado" }),
        apt.status === "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-[9px] font-bold text-red-400", children: "Cancelado" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end border-t border-zinc-800/60 pt-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-zinc-500 uppercase tracking-wider font-bold", children: "Data & Hora" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-white mt-0.5", children: [
            (/* @__PURE__ */ new Date(apt.date + "T12:00:00")).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit"
            }),
            " ",
            "às ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400", children: apt.time })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-zinc-500 uppercase tracking-wider font-bold", children: "Valor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-extrabold text-sky-400 mt-0.5", children: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(apt.price) })
        ] })
      ] }),
      apt.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: getBarberWhatsAppLink(apt), target: "_blank", rel: "noopener noreferrer", className: "flex-1 text-center py-2 rounded-xl bg-green-600 hover:bg-green-500 text-[10px] font-bold text-white transition-colors flex items-center justify-center gap-1 cursor-pointer active:scale-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppIcon, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Confirmar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleCancel(apt.id), className: "flex-1 text-center py-2 rounded-xl border border-red-500/20 text-[10px] font-bold text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer", children: "Cancelar" })
      ] })
    ] }, apt.id)) })
  ] });
}
export {
  ClientDashboard as component
};
