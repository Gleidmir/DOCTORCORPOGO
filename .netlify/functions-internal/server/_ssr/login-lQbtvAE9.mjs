import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as BarberGoLogo } from "./logo-Cy3MS0-l.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getBarberShopProfile, u as updatePageMeta, i as isSupabaseConfigured, s as supabase, a as setCurrentUser, b as getCurrentUser, l as logout, c as addClient } from "./router-BmcCHDYy.mjs";
import { U as User, P as Phone, L as LoaderCircle, M as Mail, a as Lock } from "../_libs/lucide-react.mjs";
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
function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("admin");
  const [loading, setLoading] = reactExports.useState(false);
  const [isClientOnly, setIsClientOnly] = reactExports.useState(false);
  const [shopProfile, setShopProfile] = reactExports.useState(null);
  const [isAdminOverride, setIsAdminOverride] = reactExports.useState(false);
  const [clientName, setClientName] = reactExports.useState("");
  const [clientPhone, setClientPhone] = reactExports.useState("");
  const [adminEmail, setAdminEmail] = reactExports.useState("");
  const [adminPassword, setAdminPassword] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      const params2 = new URLSearchParams(window.location.search);
      const isOverride = params2.get("admin") === "true" || params2.get("role") === "admin";
      setIsAdminOverride(isOverride);
      if (isOverride) {
        setIsClientOnly(false);
        setActiveTab("admin");
        window.localStorage.removeItem("mbg_client_tenant");
      } else {
        const tenant = params2.get("t") || params2.get("clinica") || params2.get("barberia");
        if (tenant) {
          window.localStorage.setItem("mbg_client_tenant", tenant);
          setIsClientOnly(true);
          setActiveTab("client");
          getBarberShopProfile(tenant).then((prof) => {
            setShopProfile(prof);
            updatePageMeta(prof);
          });
        } else {
          setIsClientOnly(false);
          setActiveTab("admin");
          const storedTenant = window.localStorage.getItem("mbg_client_tenant");
          if (storedTenant) {
            getBarberShopProfile(storedTenant).then((prof) => {
              setShopProfile(prof);
              updatePageMeta(prof);
            });
          }
        }
      }
    }
    const checkSession = async () => {
      if (isSupabaseConfigured) {
        const {
          data: {
            session
          }
        } = await supabase.auth.getSession();
        const isClientLink = params.get("t") || params.get("clinica") || params.get("barberia");
        if (session && !isClientLink) {
          setCurrentUser({
            role: "admin",
            name: session.user?.user_metadata?.name || "Profissional Administrador",
            email: session.user?.email || ""
          });
          navigate({
            to: "/admin"
          });
        } else {
          const localSession = getCurrentUser();
          if (localSession && localSession.role === "admin") {
            logout();
          } else if (localSession && localSession.role === "client") {
            const isOverride = params.get("admin") === "true" || params.get("role") === "admin";
            if (!isOverride) {
              navigate({
                to: "/client"
              });
            }
          }
        }
      } else {
        const session = getCurrentUser();
        if (session) {
          if (session.role === "admin") {
            navigate({
              to: "/admin"
            });
          } else {
            const params2 = new URLSearchParams(window.location.search);
            const isOverride = params2.get("admin") === "true" || params2.get("role") === "admin";
            if (!isOverride) {
              navigate({
                to: "/client"
              });
            }
          }
        }
      }
    };
    checkSession();
  }, [navigate]);
  const handleClientSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || clientPhone.length < 10) {
      toast.error("Por favor, preencha o nome e um telefone válido.");
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      const client = await addClient(clientName, clientPhone);
      setCurrentUser({
        role: "client",
        name: client.name,
        phone: client.phone
      });
      toast.success(`Bem-vindo, ${client.name}! Redirecionando para o agendamento...`);
      navigate({
        to: "/client"
      });
      setLoading(false);
    }, 800);
  };
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);
    if (isSupabaseConfigured) {
      try {
        const {
          data,
          error
        } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword
        });
        if (error) throw error;
        setCurrentUser({
          role: "admin",
          name: data.user?.user_metadata?.name || "Profissional Administrador",
          email: adminEmail
        });
        toast.success("Login administrativo efetuado com sucesso!");
        navigate({
          to: "/admin"
        });
      } catch (error) {
        console.error("Erro no login ADM:", error);
        toast.error(error.message || "E-mail ou senha incorretos.");
      } finally {
        setLoading(false);
      }
    } else {
      const storedPassword = typeof window !== "undefined" ? window.localStorage.getItem(`mbg_local_password_${adminEmail}`) : null;
      const expectedPassword = storedPassword || "123456";
      if (adminPassword === expectedPassword) {
        setCurrentUser({
          role: "admin",
          name: adminEmail.split("@")[0].toUpperCase(),
          email: adminEmail
        });
        toast.success("Login efetuado com sucesso!");
        navigate({
          to: "/admin"
        });
      } else {
        toast.error("Senha incorreta.");
      }
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-zinc-950 text-white flex flex-col justify-between antialiased", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "px-6 py-4 flex items-center min-h-[52px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex items-center justify-center px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md glass-card rounded-3xl p-8 shadow-2xl transition-all duration-500 glow-emerald", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
        shopProfile?.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 mb-3 flex items-center justify-center bg-zinc-900 shadow-xl shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: shopProfile.logoUrl, alt: shopProfile.name, className: "w-full h-full object-cover" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BarberGoLogo, { className: "w-16 h-16 mb-3 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold tracking-tight", children: shopProfile ? shopProfile.name : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "DoctorCorpo ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500", children: "GO" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-xs mt-1 text-center", children: activeTab === "admin" ? "Acesse sua conta para gerenciar a clínica" : "Identifique-se para agendar sua consulta" })
      ] }),
      activeTab === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-xl bg-amber-500 text-zinc-950 px-8 py-2.5 text-xs font-black uppercase shadow-md glow-emerald-sm tracking-wider select-none", children: "PROFISSIONAL / ADM" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-xl bg-amber-500 text-zinc-950 px-8 py-2.5 text-xs font-black uppercase shadow-md glow-emerald-sm tracking-wider select-none", children: "CLIENTE" }) }),
      activeTab === "client" ? (
        /* CLIENT FORM */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleClientSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-extrabold uppercase tracking-wider text-amber-400", children: "Seu Nome" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: clientName, onChange: (e) => setClientName(e.target.value), placeholder: "Ex: João da Silva", className: "w-full rounded-xl bg-zinc-950/90 pl-11 pr-4 py-3.5 text-sm text-amber-300 placeholder:text-zinc-600 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.25)] focus:ring-amber-400 focus:outline-none transition-all" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-extrabold uppercase tracking-wider text-amber-400", children: "Celular (WhatsApp)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", required: true, value: clientPhone, onChange: (e) => setClientPhone(e.target.value.replace(/\D/g, "")), placeholder: "Ex: 62999998888", className: "w-full rounded-xl bg-zinc-950/90 pl-11 pr-4 py-3.5 text-sm text-amber-300 placeholder:text-zinc-650 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.25)] focus:ring-amber-400 focus:outline-none transition-all" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-zinc-400 mt-1 font-semibold", children: "Apenas números com DDD" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full rounded-xl bg-amber-500 py-3.5 text-sm font-black tracking-wide text-zinc-950 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 mt-2 cursor-pointer", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-zinc-950" }) : "AGENDAR MEU HORÁRIO →" })
        ] })
      ) : (
        /* ADMIN FORM */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAdminSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "E-mail Administrativo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: adminEmail, onChange: (e) => setAdminEmail(e.target.value), placeholder: "admin@doctorcorpo.com", className: "w-full rounded-xl bg-zinc-950/90 pl-11 pr-4 py-3.5 text-sm text-amber-300 placeholder:text-zinc-600 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.25)] focus:ring-amber-400 focus:outline-none transition-all" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-extrabold uppercase tracking-wider text-amber-400", children: "Senha" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, value: adminPassword, onChange: (e) => setAdminPassword(e.target.value), placeholder: "••••••", className: "w-full rounded-xl bg-zinc-950/90 pl-11 pr-4 py-3.5 text-sm text-amber-300 placeholder:text-zinc-650 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.25)] focus:ring-amber-400 focus:outline-none transition-all" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full rounded-xl bg-amber-500 py-3.5 text-sm font-black tracking-wide text-zinc-950 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 mt-2 cursor-pointer", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-zinc-950" }) : "ENTRAR NO PAINEL →" })
        ] })
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "py-6 text-center text-xs text-zinc-600 border-t border-zinc-900/60", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " DoctorCorpo GO — Todos os direitos reservados."
    ] })
  ] });
}
export {
  LoginPage as component
};
