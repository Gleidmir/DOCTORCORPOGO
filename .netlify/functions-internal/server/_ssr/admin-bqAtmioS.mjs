import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as BarberGoLogo } from "./logo-Cy3MS0-l.mjs";
import { q as DEFAULT_WORK_HOURS, b as getCurrentUser, i as isSupabaseConfigured, s as supabase, h as getAppointments, r as getClients, e as getServices, f as getBarbers, g as getBarberShopProfile, t as getDashboardStats, u as updatePageMeta, v as updateBarberShopProfile, a as setCurrentUser, d as checkSubscriptionStatus, l as logout, w as resetLocalDB, m as updateAppointmentStatus, x as updateClient, c as addClient, y as deleteClient, z as updateService, A as addService, B as deleteService, C as updateBarber, E as addBarber, F as deleteBarber, n as getAllBarberShops, o as updateBarberShopSubscription, p as deleteBarberShop } from "./router-DBqFSJ_k.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as LogOut, a as Lock, R as RefreshCw, h as RotateCcw, S as SlidersVertical, i as Calendar, j as Users, k as Layers, l as Store, m as UserCheck, n as Copy, D as DollarSign, o as TrendingUp, g as CalendarCheck, X, p as Check, q as Plus, r as Search, s as Pen, f as Trash2, C as Clock, t as Sparkles, u as ChevronUp, v as ChevronDown, E as ExternalLink } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Area, B as BarChart, b as Bar } from "../_libs/recharts.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function MasterAdminPanel() {
  const [shops, setShops] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [expandedShop, setExpandedShop] = reactExports.useState(null);
  const [showCodes, setShowCodes] = reactExports.useState(false);
  const loadShops = async () => {
    setLoading(true);
    try {
      const data = await getAllBarberShops();
      setShops(data);
    } catch (e) {
      console.error(e);
      toast.error("Erro ao carregar clínicas do servidor.");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    loadShops();
  }, []);
  const handleExtendSubscription = async (shop, days, planName) => {
    const now = /* @__PURE__ */ new Date();
    let baseDate = now;
    if (shop.subscriptionStatus === "active" && shop.subscriptionExpiresAt && new Date(shop.subscriptionExpiresAt) > now) {
      baseDate = new Date(shop.subscriptionExpiresAt);
    } else if (shop.subscriptionStatus === "trial" && shop.createdAt) {
      const regDate = new Date(shop.createdAt);
      const trialEndDate = new Date(regDate.getTime() + 30 * 24 * 60 * 60 * 1e3);
      if (trialEndDate > now) {
        baseDate = trialEndDate;
      }
    }
    const newExpiry = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1e3);
    const success = await updateBarberShopSubscription(
      shop.tenantId,
      planName,
      "active",
      newExpiry.toISOString()
    );
    if (success) {
      loadShops();
    }
  };
  const handleSetVIP = async (shop) => {
    if (confirm(`Deseja definir a clínica "${shop.name}" como VIP / Vitalícia?`)) {
      const success = await updateBarberShopSubscription(
        shop.tenantId,
        "master",
        "active",
        null
      );
      if (success) {
        loadShops();
      }
    }
  };
  const handleExpireSubscription = async (shop) => {
    if (confirm(`Deseja desativar a licença da clínica "${shop.name}" imediatamente?`)) {
      const success = await updateBarberShopSubscription(
        shop.tenantId,
        shop.subscriptionPlan || "mensal",
        "expired",
        (/* @__PURE__ */ new Date()).toISOString()
      );
      if (success) {
        loadShops();
      }
    }
  };
  const handleSetTrial = async (shop) => {
    if (confirm(`Deseja redefinir a clínica "${shop.name}" para o modo Teste Grátis (Trial)?`)) {
      const success = await updateBarberShopSubscription(
        shop.tenantId,
        "mensal",
        "trial",
        null
      );
      if (success) {
        loadShops();
      }
    }
  };
  const handleDeleteShop = async (shop) => {
    const confirm1 = confirm(
      `ATENÇÃO: Você está prestes a excluir permanentemente a clínica "${shop.name}" (${shop.tenantId}).

Isso apagará TODOS os dados no Supabase (Especialistas, Procedimentos, Clientes, Agendamentos e Perfil) bem como o Usuário de Login correspondente.

Deseja continuar?`
    );
    if (!confirm1) return;
    const confirm2 = confirm(
      `CONFIRMAÇÃO FINAL:

Esta ação é IRREVERSÍVEL. Você realmente deseja apagar tudo relacionado à clínica "${shop.name}" de forma definitiva?`
    );
    if (confirm2) {
      setLoading(true);
      try {
        const success = await deleteBarberShop(shop.tenantId);
        if (success) {
          loadShops();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };
  const copyWhatsAppMessage = (shop) => {
    const isMaster = shop.subscriptionPlan === "master";
    const isTrial = shop.subscriptionStatus === "trial";
    const planLabel = isMaster ? "VIP / Vitalício" : isTrial ? "Teste Grátis (Trial)" : shop.subscriptionPlan || "Mensal";
    const expiryStr = isMaster ? "Permanente" : shop.subscriptionExpiresAt ? new Date(shop.subscriptionExpiresAt).toLocaleDateString("pt-BR") : isTrial && shop.createdAt ? new Date(new Date(shop.createdAt).getTime() + 30 * 24 * 60 * 60 * 1e3).toLocaleDateString("pt-BR") : "N/A";
    const message = `Olá! Passando para informar que sua licença do *DoctorCorpo GO* foi ativada com sucesso! 🎉

🏥 *Clínica:* ${shop.name}
📦 *Plano:* ${planLabel.charAt(0).toUpperCase() + planLabel.slice(1)}
📅 *Validade:* ${expiryStr}

Obrigado pela parceria e excelente trabalho! 🏥✨`;
    navigator.clipboard.writeText(message);
    toast.success("Mensagem de ativação copiada para área de transferência!");
  };
  const copyActivationLink = (shop, code) => {
    const url = `${window.location.origin}/admin?activate_code=${code}`;
    navigator.clipboard.writeText(url);
    toast.success("Link de ativação automática copiado!");
  };
  const filteredShops = shops.filter(
    (shop) => shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || shop.tenantId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getStatusBadge = (shop) => {
    const status = shop.subscriptionStatus || "expired";
    const plan = shop.subscriptionPlan || "mensal";
    if (plan === "master") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-black text-purple-400 ring-1 ring-purple-500/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
        " VIP / Vitalício"
      ] });
    }
    if (status === "active") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-black text-emerald-400 ring-1 ring-emerald-500/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
        " Ativo"
      ] });
    }
    if (status === "expired") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[10px] font-black text-red-400 ring-1 ring-red-500/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
        " Inativa"
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-black text-amber-400 ring-1 ring-amber-500/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
      " Teste Grátis"
    ] });
  };
  const getDaysLeft = (shop) => {
    if (shop.subscriptionPlan === "master") return "Permanente";
    const now = /* @__PURE__ */ new Date();
    if (shop.subscriptionStatus === "active" && shop.subscriptionExpiresAt) {
      const expiresAt = new Date(shop.subscriptionExpiresAt);
      if (now > expiresAt) return "Inativa";
      const diffTime = Math.abs(expiresAt.getTime() - now.getTime());
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return `${diffDays} ${diffDays === 1 ? "dia" : "dias"}`;
    }
    if (shop.subscriptionStatus === "trial" && shop.createdAt) {
      const regDate = new Date(shop.createdAt);
      const trialEndDate = new Date(regDate.getTime() + 30 * 24 * 60 * 60 * 1e3);
      if (now > trialEndDate) return "Inativa";
      const diffTime = Math.abs(trialEndDate.getTime() - now.getTime());
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return `${diffDays} ${diffDays === 1 ? "dia" : "dias"} (Teste)`;
    }
    return "Inativa";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/40 ring-1 ring-zinc-800 rounded-3xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-black tracking-tight text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-amber-500" }),
          "Painel do Administrador Master"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400", children: "Gerencie todas as clínicas cadastradas no sistema, controle licenças e envie notificações." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: loadShops,
          disabled: loading,
          className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white px-4 py-2.5 text-xs font-bold border border-zinc-800 transition-colors cursor-pointer disabled:opacity-50 shrink-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-3.5 w-3.5 ${loading ? "animate-spin" : ""}` }),
            " Sincronizar"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-900/40 ring-1 ring-zinc-800 rounded-3xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowCodes(!showCodes),
          className: "w-full flex items-center justify-between text-left focus:outline-none",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black tracking-tight text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-amber-500" }),
              "CÓDIGOS DE REATIVAÇÃO"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-zinc-500 hover:text-white transition-colors", children: showCodes ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-5 w-5" }) })
          ]
        }
      ),
      showCodes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6 animate-in fade-in slide-in-from-top-2 duration-200", children: [
        { label: "MENSAL", code: "ATIVA_MEN_MBG", days: "30 DIAS" },
        { label: "TRIMESTRAL", code: "ATIVA_TRI_MBG", days: "90 DIAS" },
        { label: "SEMESTRAL", code: "ATIVA_SEM_MBG", days: "180 DIAS" },
        { label: "ANUAL", code: "ATIVA_ANU_MBG", days: "365 DIAS" },
        { label: "VIP VITALÍCIO", code: "MASTER_MBG_VIP", days: "PERMANENTE" }
      ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-950 ring-1 ring-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider", children: [
            item.label,
            " (",
            item.days,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-amber-500 mt-1 select-all font-bold", children: item.code })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                navigator.clipboard.writeText(item.code);
                toast.success("Código copiado!");
              },
              className: "flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-zinc-300 py-1.5 text-[10px] font-bold transition-all cursor-pointer border border-zinc-800",
              title: "Copiar Código",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }),
                " CÓDIGO"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => copyActivationLink(null, item.code),
              className: "flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-zinc-300 py-1.5 text-[10px] font-bold transition-all cursor-pointer border border-zinc-800",
              title: "Copiar Link de Ativação Direta",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }),
                " LINK"
              ]
            }
          )
        ] })
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-900/40 ring-1 ring-zinc-800 rounded-3xl p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              placeholder: "Buscar por nome ou e-mail...",
              className: "w-full rounded-xl bg-zinc-950/90 pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-600 ring-1 ring-zinc-800 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider", children: [
          "Total: ",
          filteredShops.length,
          " Clínicas"
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 flex flex-col items-center justify-center gap-3 text-zinc-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Buscando do Supabase..." })
      ] }) : filteredShops.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-zinc-500 text-xs border-2 border-dashed border-zinc-800 rounded-2xl", children: "Nenhuma clínica cadastrada encontrada." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: filteredShops.map((shop) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-zinc-950 ring-1 ring-zinc-800/80 rounded-2xl overflow-hidden transition-all duration-300",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => setExpandedShop(expandedShop === shop.tenantId ? null : shop.tenantId),
                className: "px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/40 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0", children: shop.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: shop.logoUrl, alt: shop.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "h-5 w-5 text-zinc-600" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-extrabold text-sm text-white truncate", children: shop.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-zinc-500 font-mono truncate", children: shop.tenantId })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right hidden sm:block", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider block", children: "Restam" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-zinc-300 font-bold block", children: getDaysLeft(shop) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: getStatusBadge(shop) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-zinc-500 hover:text-white transition-colors", children: expandedShop === shop.tenantId ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }) })
                  ] })
                ]
              }
            ),
            expandedShop === shop.tenantId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 pt-3 border-t border-zinc-900 bg-zinc-900/10 space-y-4 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider block", children: "Data de Cadastro" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-300 font-bold mt-1 block", children: shop.createdAt ? new Date(shop.createdAt).toLocaleDateString("pt-BR") : "N/A" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider block", children: "Plano Atual" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-300 font-bold mt-1 block capitalize", children: shop.subscriptionStatus === "trial" ? "Teste Grátis (Trial)" : shop.subscriptionPlan || "N/A" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider block", children: "Data de Vencimento" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-300 font-bold mt-1 block", children: shop.subscriptionExpiresAt ? new Date(shop.subscriptionExpiresAt).toLocaleDateString("pt-BR") + " às " + new Date(shop.subscriptionExpiresAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : shop.subscriptionPlan === "master" ? "Permanente" : shop.subscriptionStatus === "trial" && shop.createdAt ? new Date(new Date(shop.createdAt).getTime() + 30 * 24 * 60 * 60 * 1e3).toLocaleDateString("pt-BR") + " (Fim do Teste)" : "N/A" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-zinc-900" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider block", children: "MODIFICAR LICENÇA (SALVA DIRETO NA NUVEM)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleExtendSubscription(shop, 30, "mensal"),
                        className: "w-full rounded-xl bg-[#39ff14] hover:bg-[#2ee610] text-zinc-950 py-3 text-xs font-black transition-all cursor-pointer active:scale-95 text-center shadow-lg shadow-[#39ff14]/20 uppercase",
                        children: "+30 DIAS"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleExtendSubscription(shop, 90, "trimestral"),
                        className: "w-full rounded-xl bg-[#39ff14] hover:bg-[#2ee610] text-zinc-950 py-3 text-xs font-black transition-all cursor-pointer active:scale-95 text-center shadow-lg shadow-[#39ff14]/20 uppercase",
                        children: "+90 DIAS"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleExtendSubscription(shop, 180, "semestral"),
                        className: "w-full rounded-xl bg-[#ff6700] hover:bg-[#e65c00] text-zinc-950 py-3 text-xs font-black transition-all cursor-pointer active:scale-95 text-center shadow-lg shadow-[#ff6700]/20 uppercase",
                        children: "+180 DIAS"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleExtendSubscription(shop, 365, "anual"),
                        className: "w-full rounded-xl bg-[#ff6700] hover:bg-[#e65c00] text-zinc-950 py-3 text-xs font-black transition-all cursor-pointer active:scale-95 text-center shadow-lg shadow-[#ff6700]/20 uppercase",
                        children: "+365 DIAS"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 w-full max-w-md mx-auto pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => handleSetVIP(shop),
                      className: "w-full rounded-xl bg-purple-600 hover:bg-purple-500 text-white py-3 text-xs font-black transition-all cursor-pointer active:scale-95 text-center shadow-lg shadow-purple-600/10 uppercase",
                      children: "TORNAR VIP / VITALÍCIO"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => handleSetTrial(shop),
                      className: "w-full rounded-xl bg-yellow-400 hover:bg-yellow-300 text-zinc-950 py-3 text-xs font-black transition-all cursor-pointer active:scale-95 text-center shadow-lg shadow-yellow-400/20 uppercase",
                      children: "REDEFINIR PARA TESTE GRÁTIS"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => handleExpireSubscription(shop),
                      className: "w-full rounded-xl bg-blue-900 hover:bg-blue-800 text-white py-3 text-xs font-black transition-all cursor-pointer active:scale-95 text-center shadow-lg shadow-blue-900/10 uppercase",
                      children: "DESATIVAR LICENÇA (INATIVA)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => handleDeleteShop(shop),
                      className: "w-full rounded-xl bg-red-600 hover:bg-red-500 text-white py-3 text-xs font-black transition-all cursor-pointer active:scale-95 text-center uppercase flex items-center justify-center gap-1.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 shrink-0" }),
                        " EXCLUIR CLÍNICA"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => copyWhatsAppMessage(shop),
                      className: "w-full rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white py-3 text-xs font-black transition-all cursor-pointer active:scale-95 text-center uppercase",
                      children: "COPIAR MENSAGEM WHATSAPP"
                    }
                  )
                ] })
              ] })
            ] })
          ]
        },
        shop.tenantId
      )) })
    ] })
  ] });
}
const weekdaysList = [{
  label: "Dom",
  value: 0
}, {
  label: "Seg",
  value: 1
}, {
  label: "Ter",
  value: 2
}, {
  label: "Qua",
  value: 3
}, {
  label: "Qui",
  value: 4
}, {
  label: "Sex",
  value: 5
}, {
  label: "Sáb",
  value: 6
}];
const hourOptions = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
function WhatsAppIcon({
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) });
}
function AdminDashboard() {
  const navigate = useNavigate();
  const [session, setSession] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("dashboard");
  const [mounted, setMounted] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [subCheck, setSubCheck] = reactExports.useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = reactExports.useState(false);
  const [selectedPlan, setSelectedPlan] = reactExports.useState("mensal");
  const refreshSubscriptionStatus = () => {
    const check = checkSubscriptionStatus();
    setSubCheck(check);
  };
  const handleCopyPixKey = () => {
    try {
      navigator.clipboard.writeText("62993299120");
      toast.success("Chave Pix (Celular) copiada para a área de transferência!");
    } catch (e) {
      toast.error("Erro ao copiar. A chave é: 62993299120");
    }
  };
  const [stats, setStats] = reactExports.useState(null);
  const [appointments, setAppointments] = reactExports.useState([]);
  const [clients, setClients] = reactExports.useState([]);
  const [services, setServices] = reactExports.useState([]);
  const [barbers, setBarbers] = reactExports.useState([]);
  const [shopProfile, setShopProfile] = reactExports.useState(null);
  const [shopName, setShopName] = reactExports.useState("");
  const [shopLogoUrl, setShopLogoUrl] = reactExports.useState("");
  const [savingProfile, setSavingProfile] = reactExports.useState(false);
  const [clientSearch, setClientSearch] = reactExports.useState("");
  const [agendaFilter, setAgendaFilter] = reactExports.useState("all");
  const [showServiceForm, setShowServiceForm] = reactExports.useState(false);
  const [editingService, setEditingService] = reactExports.useState(null);
  const [serviceName, setServiceName] = reactExports.useState("");
  const [servicePrice, setServicePrice] = reactExports.useState("");
  const [serviceDuration, setServiceDuration] = reactExports.useState("");
  const [showBarberForm, setShowBarberForm] = reactExports.useState(false);
  const [editingBarber, setEditingBarber] = reactExports.useState(null);
  const [barberName, setBarberName] = reactExports.useState("");
  const [barberAvatar, setBarberAvatar] = reactExports.useState("");
  const [barberPhone, setBarberPhone] = reactExports.useState("");
  const [barberWorkDays, setBarberWorkDays] = reactExports.useState([1, 2, 3, 4, 5, 6]);
  const [barberStartTime, setBarberStartTime] = reactExports.useState("08:00");
  const [barberEndTime, setBarberEndTime] = reactExports.useState("19:00");
  const [barberWorkHours, setBarberWorkHours] = reactExports.useState(DEFAULT_WORK_HOURS);
  const [barberBlockedDates, setBarberBlockedDates] = reactExports.useState("");
  const [showClientForm, setShowClientForm] = reactExports.useState(false);
  const [editingClient, setEditingClient] = reactExports.useState(null);
  const [clientName, setClientName] = reactExports.useState("");
  const [clientPhone, setClientPhone] = reactExports.useState("");
  const [clientEmail, setClientEmail] = reactExports.useState("");
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      if (isSupabaseConfigured) {
        const {
          data: {
            session: session2
          }
        } = await supabase.auth.getSession();
        if (!session2) {
          navigate({
            to: "/login"
          });
          return;
        }
        setCurrentUser({
          role: "admin",
          name: session2.user?.user_metadata?.name || "Administrador da Clínica",
          email: session2.user?.email || ""
        });
        setSession(session2.user);
      } else {
        const user = getCurrentUser();
        if (!user || user.role !== "admin") {
          navigate({
            to: "/login"
          });
          return;
        }
        setSession(user);
      }
      await loadAllData();
      const check = checkSubscriptionStatus();
      setSubCheck(check);
      setMounted(true);
    };
    checkAuth();
  }, [navigate]);
  reactExports.useEffect(() => {
    if (mounted) {
      const interval = setInterval(() => {
        loadAllData(true);
        refreshSubscriptionStatus();
      }, 1e4);
      return () => clearInterval(interval);
    }
  }, [mounted]);
  const loadAllData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const localUser = getCurrentUser();
      const sessionUser = isSupabaseConfigured ? (await supabase.auth.getSession()).data.session?.user?.email : null;
      const tenantEmail = sessionUser || localUser?.email || "default";
      const [a, c, svcs, barbs, prof] = await Promise.all([getAppointments(), getClients(), getServices(), getBarbers(), getBarberShopProfile(tenantEmail)]);
      const s = await getDashboardStats(a, c, barbs);
      setStats(s);
      setAppointments(a);
      setClients(c);
      setServices(svcs);
      setBarbers(barbs);
      if (prof) {
        setShopProfile(prof);
        updatePageMeta(prof);
        if (!isSilent) {
          setShopName(prof.name);
          setShopLogoUrl(prof.logoUrl || "");
        }
      }
      refreshSubscriptionStatus();
      if (!isSilent) {
        toast.success("Dados atualizados com sucesso!");
      }
    } catch (e) {
      console.error("Erro ao carregar dados no admin:", e);
      if (!isSilent) toast.error("Erro ao sincronizar dados do servidor.");
    } finally {
      if (!isSilent) setLoading(false);
    }
  };
  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    logout();
    navigate({
      to: "/"
    });
  };
  const handleResetData = async () => {
    if (confirm("ATENÇÃO: Isso irá apagar TODOS os agendamentos (pendentes, finalizados e cancelados) e o faturamento acumulado. Os especialistas, clientes cadastrados e procedimentos serão preservados. Deseja continuar?")) {
      await resetLocalDB();
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };
  const handleCompleteApt = async (id) => {
    setLoading(true);
    try {
      await updateAppointmentStatus(id, "completed");
      await loadAllData();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  const handleCancelApt = async (id) => {
    if (confirm("Deseja realmente cancelar este agendamento?")) {
      setLoading(true);
      try {
        await updateAppointmentStatus(id, "cancelled");
        await loadAllData();
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
  };
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    if (!serviceName.trim() || !servicePrice || !serviceDuration) {
      toast.error("Por favor, preencha todos os campos do serviço.");
      return;
    }
    const priceNum = Number(servicePrice);
    const durationNum = Number(serviceDuration);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("O preço deve ser um número positivo.");
      return;
    }
    if (isNaN(durationNum) || durationNum <= 0) {
      toast.error("A duração deve ser um número positivo de minutos.");
      return;
    }
    setLoading(true);
    try {
      if (editingService) {
        await updateService({
          ...editingService,
          name: serviceName,
          price: priceNum,
          duration: durationNum
        });
        setEditingService(null);
      } else {
        await addService({
          name: serviceName,
          price: priceNum,
          duration: durationNum
        });
      }
      setServiceName("");
      setServicePrice("");
      setServiceDuration("");
      setShowServiceForm(false);
      await loadAllData();
    } catch (e2) {
      console.error(e2);
      setLoading(false);
    }
  };
  const handleEditServiceClick = (svc) => {
    setEditingService(svc);
    setServiceName(svc.name);
    setServicePrice(svc.price);
    setServiceDuration(svc.duration);
    setShowServiceForm(true);
  };
  const handleDeleteServiceClick = async (id) => {
    if (confirm("Tem certeza que deseja excluir este serviço? Ele não aparecerá mais para agendamento.")) {
      setLoading(true);
      try {
        await deleteService(id);
        await loadAllData();
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
  };
  const handleBarberSubmit = async (e) => {
    e.preventDefault();
    if (!barberName.trim()) {
      toast.error("Por favor, preencha o nome do especialista.");
      return;
    }
    const defaultAvatar = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face";
    const avatarUrl = barberAvatar.trim() || defaultAvatar;
    const cleanPhone = barberPhone.replace(/\D/g, "");
    const parsedBlocked = barberBlockedDates.split(",").map((d) => d.trim()).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d));
    if (editingBarber) {
      const originalHours = editingBarber.workHours || DEFAULT_WORK_HOURS;
      const deselectedHours = originalHours.filter((h) => !barberWorkHours.includes(h));
      if (deselectedHours.length > 0) {
        const todayStr2 = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const conflictingApts = appointments.filter((apt) => apt.barberId === editingBarber.id && apt.status !== "cancelled" && apt.date >= todayStr2 && deselectedHours.includes(apt.time));
        if (conflictingApts.length > 0) {
          const aptDetails = conflictingApts.map((apt) => {
            const formattedDate = (/* @__PURE__ */ new Date(apt.date + "T12:00:00")).toLocaleDateString("pt-BR");
            return `- ${apt.clientName} no dia ${formattedDate} às ${apt.time}`;
          }).slice(0, 5).join("\n");
          const confirmMsg = `Atenção! Você está desativando horários que já possuem agendamentos ativos:

${aptDetails}${conflictingApts.length > 5 ? `
...e mais ${conflictingApts.length - 5} agendamento(s)` : ""}

Deseja salvar as alterações mesmo assim? Lembre-se de avisar os clientes ou gerenciar os agendamentos na aba Agenda.`;
          if (!window.confirm(confirmMsg)) {
            return;
          }
        }
      }
    }
    setLoading(true);
    try {
      if (editingBarber) {
        await updateBarber({
          ...editingBarber,
          name: barberName,
          avatar: avatarUrl,
          phone: cleanPhone || void 0,
          workDays: barberWorkDays,
          startTime: barberStartTime,
          endTime: barberEndTime,
          blockedDates: parsedBlocked,
          workHours: barberWorkHours
        });
        setEditingBarber(null);
      } else {
        if (barbers.length >= 5) {
          toast.error("Limite máximo de 5 profissionais atingido! Se precisar de mais, entre em contato com o suporte.");
          setLoading(false);
          return;
        }
        await addBarber({
          name: barberName,
          avatar: avatarUrl,
          phone: cleanPhone || void 0,
          workDays: barberWorkDays,
          startTime: barberStartTime,
          endTime: barberEndTime,
          blockedDates: parsedBlocked,
          workHours: barberWorkHours
        });
      }
      setBarberName("");
      setBarberAvatar("");
      setBarberPhone("");
      setBarberWorkDays([1, 2, 3, 4, 5, 6]);
      setBarberStartTime("08:00");
      setBarberEndTime("19:00");
      setBarberWorkHours(DEFAULT_WORK_HOURS);
      setBarberBlockedDates("");
      setShowBarberForm(false);
      await loadAllData();
    } catch (e2) {
      console.error(e2);
      setLoading(false);
    }
  };
  const handleEditBarberClick = (barber) => {
    setEditingBarber(barber);
    setBarberName(barber.name);
    setBarberAvatar(barber.avatar);
    setBarberPhone(barber.phone || "");
    setBarberWorkDays(barber.workDays || [1, 2, 3, 4, 5, 6]);
    setBarberStartTime(barber.startTime || "08:00");
    setBarberEndTime(barber.endTime || "19:00");
    setBarberWorkHours(barber.workHours || DEFAULT_WORK_HOURS);
    setBarberBlockedDates((barber.blockedDates || []).join(", "));
    setShowBarberForm(true);
  };
  const handleDeleteBarberClick = async (id) => {
    if (confirm("Tem certeza que deseja remover este profissional?")) {
      setLoading(true);
      try {
        await deleteBarber(id);
        await loadAllData();
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
  };
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      toast.error("Por favor, preencha o nome e o celular do cliente.");
      return;
    }
    const cleanPhone = clientPhone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      toast.error("Por favor, preencha um número de celular válido com DDD.");
      return;
    }
    setLoading(true);
    try {
      if (editingClient) {
        await updateClient({
          ...editingClient,
          name: clientName,
          phone: cleanPhone,
          email: clientEmail.trim() || void 0
        });
        setEditingClient(null);
      } else {
        await addClient(clientName, cleanPhone, clientEmail.trim() || void 0);
      }
      setClientName("");
      setClientPhone("");
      setClientEmail("");
      setShowClientForm(false);
      await loadAllData();
    } catch (e2) {
      console.error(e2);
      setLoading(false);
    }
  };
  const handleEditClientClick = (cli) => {
    setEditingClient(cli);
    setClientName(cli.name);
    setClientPhone(cli.phone);
    setClientEmail(cli.email || "");
    setShowClientForm(true);
  };
  const handleDeleteClientClick = async (id) => {
    if (confirm("Tem certeza que deseja excluir este cliente do cadastro?")) {
      setLoading(true);
      try {
        await deleteClient(id);
        await loadAllData();
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
  };
  const handleToggleServiceActive = async (svc) => {
    setLoading(true);
    try {
      const updated = {
        ...svc,
        isActive: svc.isActive === false ? true : false
      };
      await updateService(updated);
      await loadAllData();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(price);
  };
  const getClientReminderLink = (apt) => {
    let cleanPhone = apt.clientPhone.replace(/\D/g, "");
    if (cleanPhone.length >= 10 && cleanPhone.length <= 11 && !cleanPhone.startsWith("55")) {
      cleanPhone = "55" + cleanPhone;
    }
    const dateStr = (/* @__PURE__ */ new Date(apt.date + "T12:00:00")).toLocaleDateString("pt-BR");
    const nameToUse = shopName ? shopName.toUpperCase() : "NOSSA CLÍNICA";
    const message = `Olá, ${apt.clientName}! Passando para lembrar do seu agendamento na clínica *${nameToUse}*:

💇 *Procedimento:* ${apt.serviceName}
📅 *Data:* ${dateStr}
⏰ *Horário:* ${apt.time}
⚕️ *Profissional:* ${apt.barberName}

Confirmado? Te esperamos lá!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };
  const formatDuration = (mins) => {
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      const rem = mins % 60;
      return `${String(hrs).padStart(2, "0")}:${String(rem).padStart(2, "0")} h`;
    }
    return `${mins} min`;
  };
  const filteredClients = clients.filter((c) => c.name.toLowerCase().includes(clientSearch.toLowerCase()) || c.phone.includes(clientSearch));
  const getLocalTodayStr = () => {
    const d = /* @__PURE__ */ new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const todayStr = mounted ? getLocalTodayStr() : "";
  const filteredAppointments = appointments.filter((apt) => {
    if (agendaFilter === "all") return true;
    return apt.status === agendaFilter;
  }).sort((a, b) => {
    if (agendaFilter === "pending") {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    } else if (agendaFilter === "completed" || agendaFilter === "cancelled") {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return b.time.localeCompare(a.time);
    } else {
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
    }
  });
  appointments.filter((apt) => apt.date === todayStr && apt.status === "pending");
  const totalPendingAppointments = appointments.filter((apt) => apt.status === "pending");
  if (!session || !stats) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-zinc-950 flex items-center justify-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" }) });
  }
  const isMasterAdmin = session?.email === "gleidmircristino@hotmail.com";
  if (subCheck?.status === "expired" && !isMasterAdmin) {
    const planType = !subCheck?.plan || subCheck.plan === "gratuito" ? "gratuito" : subCheck.plan === "mensal" ? "mensal" : subCheck.plan === "trimestral" ? "trimestral" : subCheck.plan === "semestral" ? "semestral" : subCheck.plan === "anual" ? "anual" : subCheck.plan;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-zinc-950 text-white antialiased flex flex-col justify-between relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-zinc-900 bg-zinc-950 sticky top-0 z-40 pt-[calc(28px+env(safe-area-inset-top,0px))] sm:pt-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BarberGoLogo, { className: "w-10 h-10 shrink-0 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-extrabold tracking-tight block truncate", children: [
              "DoctorCorpo ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#39ff14]", children: "GO" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block truncate", children: "Conta Inativa" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 sm:gap-4 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 px-3 sm:px-4 py-2 text-xs font-bold border border-zinc-800 transition-colors cursor-pointer", title: "Sair", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 shrink-0" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sair" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 mx-auto w-full max-w-4xl px-4 py-8 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-8 animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#39ff14]/10 text-[#39ff14] border border-[#39ff14]/20 mb-4 animate-bounce", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-8 w-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-black uppercase", children: "Plano Encerrado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-zinc-300 text-sm mt-3 leading-relaxed max-w-md mx-auto font-medium", children: [
            "Seu plano ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-[#39ff14] uppercase", children: planType }),
            " encerrou, entre em contato com o ADM do aplicativo e regularise um novo plano."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/5562993299120?text=${encodeURIComponent(`Olá Gleidmir! Meu plano *${planType?.toUpperCase()}* no DoctorCorpo GO encerrou e gostaria de regularizar meu acesso.`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 text-xs font-black transition-all shadow-lg shadow-emerald-600/15 cursor-pointer active:scale-95 uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppIcon, { className: "h-4 w-4 fill-current shrink-0" }),
            " Falar com o ADM (62) 99329-9120"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionSection, { selectedPlan, setSelectedPlan, handleCopyPixKey, shopName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-4 text-center text-[10px] text-zinc-600 border-t border-zinc-900 bg-zinc-950", children: "Painel de Gerenciamento DoctorCorpo GO — Todos os direitos reservados." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-zinc-950 text-white antialiased flex flex-col justify-between relative", children: [
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-zinc-950/40 backdrop-blur-[1px] flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-900 ring-1 ring-zinc-800 rounded-2xl p-4 flex items-center gap-3 shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-amber-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-zinc-300 font-semibold", children: "Atualizando..." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-zinc-900 bg-zinc-950 sticky top-0 z-40 pt-[calc(28px+env(safe-area-inset-top,0px))] sm:pt-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BarberGoLogo, { className: "w-10 h-10 shrink-0 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-extrabold tracking-tight block truncate", children: [
            "DoctorCorpo ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500", children: "GO" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block truncate", children: "Painel da Clínica" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-4 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 ring-1 ring-emerald-500/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-emerald-300", children: "Caixa Aberto" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => loadAllData(false), disabled: loading, className: "inline-flex items-center justify-center gap-2 rounded-xl bg-amber-950/40 border border-amber-500/50 hover:bg-amber-600 hover:border-amber-400 text-amber-400 hover:text-white px-3 sm:px-4 py-2 text-xs font-black transition-all cursor-pointer shadow-lg shadow-amber-500/5 hover:shadow-amber-500/20 active:scale-95 disabled:opacity-50", title: "Atualizar Dados", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-4 w-4 shrink-0 ${loading ? "animate-spin" : ""}` }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Atualizar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleResetData, className: "inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 sm:px-4 py-2 text-xs font-bold border border-red-500/20 hover:border-transparent transition-all cursor-pointer", title: "Resetar Banco de Dados Local", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4 shrink-0" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Resetar Dados" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "inline-flex items-center justify-center gap-2 rounded-xl bg-red-950/30 border border-red-500/50 hover:bg-red-650 hover:border-red-500 text-red-400 hover:text-white px-3 sm:px-4 py-2 text-xs font-black transition-all cursor-pointer shadow-lg shadow-red-500/5 hover:shadow-red-500/20 active:scale-95", title: "Sair", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 shrink-0" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sair" })
        ] })
      ] })
    ] }) }),
    subCheck && (subCheck.status === "trial" || subCheck.status === "active") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `border-b py-2.5 px-4 text-center animate-in slide-in-from-top duration-300 ${subCheck.status === "trial" ? "bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border-amber-500/30" : "bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-emerald-500/20 border-emerald-500/30"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-semibold ${subCheck.status === "trial" ? "text-amber-300" : "text-emerald-300"}`, children: subCheck.status === "trial" ? `Você está no período de teste grátis (restam ${subCheck.daysLeft} ${subCheck.daysLeft === 1 ? "dia" : "dias"}).` : subCheck.plan === "master" ? "Seu plano é VIP / Vitalício (Acesso permanente)." : `Seu plano é ${subCheck.plan ? subCheck.plan.charAt(0).toUpperCase() + subCheck.plan.slice(1) : ""} (restam ${subCheck.daysLeft} ${subCheck.daysLeft === 1 ? "dia" : "dias"}).` }),
      subCheck.status === "trial" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowSubscriptionModal(true), className: "rounded-full bg-amber-500 text-zinc-950 px-4 py-1 font-extrabold text-[10px] hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-amber-500/15", children: "Assinar um Plano" }),
      subCheck.status === "active" && subCheck.plan !== "master" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowSubscriptionModal(true), className: "rounded-full bg-emerald-500 text-zinc-950 px-4 py-1 font-extrabold text-[10px] hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-emerald-500/15", children: "Renovar / Alterar Plano" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 mx-auto w-full max-w-7xl px-6 py-6 grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:col-span-1 space-y-2", children: [{
        id: "dashboard",
        label: "Dashboard",
        icon: SlidersVertical
      }, {
        id: "agenda",
        label: "Agenda / Agendamentos",
        icon: Calendar,
        badge: totalPendingAppointments.length
      }, {
        id: "clientes",
        label: "Clientes Cadastrados",
        icon: Users
      }, {
        id: "servicos",
        label: "Gerenciar Procedimentos",
        icon: Layers
      }, {
        id: "barbeiros",
        label: "Gerenciar Especialistas",
        icon: Users
      }, {
        id: "perfil",
        label: "Minha Clínica",
        icon: Store
      }, ...session?.email === "gleidmircristino@hotmail.com" ? [{
        id: "master",
        label: "Adm Master",
        icon: UserCheck
      }] : []].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab(tab.id), className: `w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition-all border ${activeTab === tab.id ? "bg-emerald-gradient text-zinc-950 border-transparent shadow-lg glow-emerald-sm font-black" : "bg-zinc-900/40 text-zinc-400 border-amber-500/15 shadow-[0_0_10px_rgba(20,184,166,0.06)] hover:text-white hover:bg-zinc-800/60 hover:border-amber-500/30 hover:shadow-[0_0_12px_rgba(20,184,166,0.12)]"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.label })
        ] }),
        tab.badge && tab.badge > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] font-black ${activeTab === tab.id ? "bg-zinc-950 text-amber-500" : "bg-amber-500/20 text-amber-400"}`, children: tab.badge }) : null
      ] }, tab.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "lg:col-span-4 space-y-6", children: [
        activeTab === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-zinc-900 border border-amber-500/20 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-amber-500", children: "Seu Link de Agendamento Online" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-300", children: "Compartilhe este link com seus clientes nas redes sociais ou WhatsApp para que eles agendem sozinhos:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-zinc-500 mt-1 select-all break-all", children: typeof window !== "undefined" ? `${window.location.origin}/client?t=${session?.email || "default"}` : "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full md:w-auto shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                const url = `${window.location.origin}/client?t=${session?.email || "default"}`;
                navigator.clipboard.writeText(url);
                toast.success("Link de agendamento copiado com sucesso!");
              }, className: "flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 px-4 py-2.5 text-xs font-bold transition-all shadow shadow-amber-500/10 cursor-pointer active:scale-95", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
                " Copiar Link"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/?text=${encodeURIComponent(shopName ? `Olá! Agende sua avaliação na clínica: *${shopName.toUpperCase()}* online pelo link: ${typeof window !== "undefined" ? window.location.origin : ""}/client?t=${session?.email || "default"}` : `Olá! Agende sua avaliação na nossa clínica online pelo link: ${typeof window !== "undefined" ? window.location.origin : ""}/client?t=${session?.email || "default"}`)}`, target: "_blank", rel: "noopener noreferrer", className: "flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 text-xs font-bold transition-all shadow shadow-green-500/10 cursor-pointer active:scale-95", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppIcon, { className: "h-4 w-4 shrink-0" }),
                " Divulgar"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: [{
            label: "Faturamento Hoje",
            value: formatPrice(stats.dailyEarnings),
            icon: DollarSign,
            trend: "Diário",
            color: "text-emerald-400"
          }, {
            label: "Faturamento Semanal",
            value: formatPrice(stats.weeklyEarnings),
            icon: TrendingUp,
            trend: "Últimos 7 dias",
            color: "text-amber-400"
          }, {
            label: "Faturamento Mensal",
            value: formatPrice(stats.monthlyEarnings),
            icon: DollarSign,
            trend: "Mês Corrente",
            color: "text-sky-400"
          }, {
            label: "Faturamento Anual",
            value: formatPrice(stats.yearlyEarnings),
            icon: TrendingUp,
            trend: "Ano Corrente",
            color: "text-indigo-400"
          }, {
            label: "Clientes Cadastrados",
            value: stats.registeredClients,
            icon: Users,
            trend: "Total histórico",
            color: "text-purple-400"
          }, {
            label: "Serviços Realizados",
            value: stats.completedServices,
            icon: CalendarCheck,
            trend: "Finalizados",
            color: "text-pink-400"
          }].map((kpi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5 hover:scale-[1.02] hover:glow-emerald-sm transition-all duration-300 flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-zinc-500 uppercase tracking-wider", children: kpi.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(kpi.icon, { className: `h-4 w-4 ${kpi.color}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-extrabold text-white tracking-tight", children: kpi.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-zinc-500 font-semibold mt-1 uppercase", children: kpi.trend })
            ] })
          ] }, kpi.label)) }),
          mounted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5 min-w-0 overflow-hidden hover:glow-emerald-sm transition-all duration-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4", children: "Evolução do Faturamento (Histórico 12 Meses)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 min-w-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: stats.monthlyHistory, margin: {
                top: 10,
                right: 10,
                left: -10,
                bottom: 0
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "colorFaturamento", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#f59e0b", stopOpacity: 0.2 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#f59e0b", stopOpacity: 0 })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#27272a", vertical: false }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", stroke: "#71717a", fontSize: 10, tickLine: false }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#71717a", fontSize: 10, tickLine: false, axisLine: false }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
                  backgroundColor: "#18181b",
                  borderColor: "#27272a",
                  borderRadius: "12px",
                  fontSize: "11px"
                }, labelClassName: "font-bold text-white" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "faturamento", stroke: "#f59e0b", strokeWidth: 2, fillOpacity: 1, fill: "url(#colorFaturamento)", name: "Faturamento (R$)" })
              ] }) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5 min-w-0 overflow-hidden hover:glow-emerald-sm transition-all duration-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4", children: "Desempenho por Especialista (Faturamento)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 min-w-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: stats.barberPerformance, margin: {
                top: 10,
                right: 10,
                left: -10,
                bottom: 0
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#27272a", vertical: false }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", stroke: "#71717a", fontSize: 9, tickLine: false, interval: 0 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#71717a", fontSize: 10, tickLine: false, axisLine: false }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
                  backgroundColor: "#18181b",
                  borderColor: "#27272a",
                  borderRadius: "12px",
                  fontSize: "11px"
                }, labelClassName: "font-bold text-white" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "faturamento", fill: "#f59e0b", radius: [4, 4, 0, 0], name: "Faturamento (R$)" })
              ] }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5 hover:glow-emerald-sm transition-all duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4", children: "Serviços Mais Procurados (Top 5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              stats.servicePopularity.map((svc, idx) => {
                const maxVal = stats.servicePopularity[0]?.valor || 1;
                const pct = svc.valor / maxVal * 100;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-semibold", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white", children: [
                      idx + 1,
                      ". ",
                      svc.name
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400", children: [
                      svc.valor,
                      " atendimentos"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-zinc-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all", style: {
                    width: `${pct}%`
                  } }) })
                ] }, svc.name);
              }),
              stats.servicePopularity.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-zinc-600", children: "Nenhum atendimento realizado ainda." })
            ] })
          ] })
        ] }),
        activeTab === "agenda" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 glass-card rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-zinc-300 uppercase tracking-wider", children: "Controle de Horários" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-zinc-500 mt-0.5", children: "Gerencie os atendimentos agendados pelos clientes." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 rounded-lg bg-zinc-950 p-1 ring-1 ring-zinc-800 self-start sm:self-center", children: [{
              id: "all",
              label: "Todos"
            }, {
              id: "pending",
              label: "Agendados"
            }, {
              id: "completed",
              label: "Realizados"
            }, {
              id: "cancelled",
              label: "Cancelados"
            }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setAgendaFilter(f.id), className: `rounded px-2.5 py-1.5 text-[10px] font-black transition-all ${agendaFilter === f.id ? "bg-emerald-gradient text-zinc-950 font-bold shadow-md glow-emerald-sm" : "text-zinc-400 hover:text-white"}`, children: f.label }, f.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filteredAppointments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 rounded-2xl bg-zinc-900/40 border border-zinc-900 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-600", children: "Nenhum agendamento correspondente encontrado." }) }) : filteredAppointments.slice(0, 100).map((apt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card hover:scale-[1.01] hover:glow-emerald-sm rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 border border-zinc-800 text-amber-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black text-white", children: apt.clientName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/55${apt.clientPhone}`, target: "_blank", rel: "noopener noreferrer", className: "text-[10px] text-zinc-500 hover:text-green-400 transition-colors font-mono", children: [
                    "(",
                    apt.clientPhone,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-zinc-300 font-semibold mt-1", children: [
                  apt.serviceName,
                  " • ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-zinc-500", children: [
                    "com ",
                    apt.barberName
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-zinc-500 font-bold mt-1", children: [
                  "Data: ",
                  (/* @__PURE__ */ new Date(apt.date + "T12:00:00")).toLocaleDateString("pt-BR"),
                  " às",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-black", children: apt.time })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between md:justify-end gap-3 border-t md:border-0 border-zinc-800 pt-3 md:pt-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left md:text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-zinc-500 uppercase font-bold block", children: "Valor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black text-sky-400 block", children: formatPrice(apt.price) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                apt.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[9px] font-black text-emerald-400", children: "Realizado" }),
                apt.status === "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-red-500/10 border border-red-500/20 px-2.5 py-1 text-[9px] font-black text-red-400", children: "Cancelado" }),
                apt.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleCancelApt(apt.id), className: "p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center cursor-pointer", title: "Cancelar Agendamento", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: getClientReminderLink(apt), target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 rounded-xl bg-green-600 hover:bg-green-500 text-white px-3.5 py-2 text-xs font-bold transition-all shadow shadow-green-500/10 active:scale-95", title: "Enviar Lembrete via WhatsApp", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppIcon, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Lembrete" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleCompleteApt(apt.id), className: "inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-2 text-xs font-bold transition-all shadow shadow-emerald-500/10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }),
                    " Concluir"
                  ] })
                ] })
              ] })
            ] })
          ] }, apt.id)) })
        ] }),
        activeTab === "clientes" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 glass-card rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-zinc-300 uppercase tracking-wider", children: "Clientes Cadastrados" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-zinc-500 mt-0.5", children: "Veja a lista de clientes cadastrados no sistema." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto", children: [
              !showClientForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                setEditingClient(null);
                setClientName("");
                setClientPhone("");
                setClientEmail("");
                setShowClientForm(true);
              }, className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 px-4 py-2.5 text-xs font-bold transition-all shadow shadow-amber-500/10 cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                " Novo Cliente"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: clientSearch, onChange: (e) => setClientSearch(e.target.value), placeholder: "Pesquisar por nome ou celular", className: "w-full rounded-xl bg-zinc-800/90 pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-400 border border-zinc-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all" })
              ] })
            ] })
          ] }),
          showClientForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleClientSubmit, className: "glass-card border border-amber-500/20 shadow-lg shadow-amber-500/5 rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
              editingClient ? "Editar Cliente" : "Cadastrar Novo Cliente"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "Nome do Cliente" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: clientName, onChange: (e) => setClientName(e.target.value), placeholder: "Ex: João da Silva", className: "w-full rounded-xl bg-zinc-950 mt-1.5 px-4 py-3 text-xs text-amber-300 placeholder:text-zinc-600 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.15)] focus:ring-amber-400 focus:outline-none transition-all" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "Celular (WhatsApp - com DDD)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: clientPhone, onChange: (e) => setClientPhone(e.target.value), placeholder: "Ex: (62) 99329-9120", className: "w-full rounded-xl bg-zinc-950 mt-1.5 px-4 py-3 text-xs text-amber-300 placeholder:text-zinc-600 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.15)] focus:ring-amber-400 focus:outline-none transition-all" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "E-mail (Opcional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: clientEmail, onChange: (e) => setClientEmail(e.target.value), placeholder: "Ex: joao@gmail.com", className: "w-full rounded-xl bg-zinc-950 mt-1.5 px-4 py-3 text-xs text-amber-300 placeholder:text-zinc-600 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.15)] focus:ring-amber-400 focus:outline-none transition-all" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                setShowClientForm(false);
                setEditingClient(null);
                setClientName("");
                setClientPhone("");
                setClientEmail("");
              }, className: "rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer", children: "Cancelar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 px-6 py-2.5 text-xs font-black transition-all shadow shadow-amber-500/10 cursor-pointer active:scale-95", children: editingClient ? "Salvar Alterações" : "Adicionar Cliente" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs border-collapse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-zinc-800 bg-zinc-900/40 text-zinc-500 uppercase tracking-wider font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Cliente" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Celular (WhatsApp)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Cadastrado em" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-right", children: "Ações" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-zinc-800", children: [
              filteredClients.map((client) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-zinc-900/40 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 font-bold text-white flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-[10px]", children: client.name.substring(0, 2).toUpperCase() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: client.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-mono text-zinc-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/55${client.phone}`, target: "_blank", rel: "noopener noreferrer", className: "hover:text-green-400 transition-colors", children: client.phone }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-zinc-500", children: new Date(client.registeredAt).toLocaleDateString("pt-BR") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/55${client.phone}?text=${encodeURIComponent(`Olá ${client.name}! Tudo bem? Entramos em contato pela Clínica${shopName ? ` *${shopName.toUpperCase()}*` : ""}.`)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 rounded-lg border border-green-500/30 bg-zinc-950 px-2.5 py-1.5 text-[10px] font-bold text-green-500 hover:text-green-400 hover:border-green-500/50 transition-all cursor-pointer", children: "Mensagem" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEditClientClick(client), className: "p-1.5 rounded-lg bg-zinc-950 border border-yellow-500/30 text-yellow-500 hover:text-yellow-400 hover:border-yellow-500/50 transition-colors cursor-pointer", title: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDeleteClientClick(client.id), className: "p-1.5 rounded-lg bg-zinc-950 border border-red-500/30 text-red-500 hover:text-red-400 hover:border-red-500/50 transition-colors cursor-pointer", title: "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
                ] }) })
              ] }, client.id)),
              filteredClients.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-8 text-center text-zinc-600", children: "Nenhum cliente correspondente encontrado." }) })
            ] })
          ] }) }) })
        ] }),
        activeTab === "servicos" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center glass-card rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-zinc-300 uppercase tracking-wider", children: "Gerenciador de Serviços" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-zinc-500 mt-0.5", children: "Configure os serviços disponíveis para agendamento dos clientes." })
            ] }),
            !showServiceForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              setEditingService(null);
              setServiceName("");
              setServicePrice("");
              setServiceDuration("");
              setShowServiceForm(true);
            }, className: "inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 px-4 py-2.5 text-xs font-bold transition-all shadow shadow-amber-500/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              " Novo Serviço"
            ] })
          ] }),
          showServiceForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleServiceSubmit, className: "glass-card border border-amber-500/20 shadow-lg shadow-amber-500/5 rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
              editingService ? "Editar Serviço" : "Cadastrar Novo Serviço"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "Nome do Serviço" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: serviceName, onChange: (e) => setServiceName(e.target.value), placeholder: "Ex: Limpeza de Pele", className: "w-full rounded-xl bg-zinc-950 mt-1.5 px-4 py-3 text-xs text-amber-300 placeholder:text-zinc-600 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.15)] focus:ring-amber-400 focus:outline-none transition-all" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "Valor (R$)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", required: true, step: "0.01", value: servicePrice, onChange: (e) => setServicePrice(e.target.value), placeholder: "Ex: 120.00", className: "w-full rounded-xl bg-zinc-950 mt-1.5 px-4 py-3 text-xs text-amber-300 placeholder:text-zinc-600 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.15)] focus:ring-amber-400 focus:outline-none transition-all" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "Duração (Minutos)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", required: true, value: serviceDuration, onChange: (e) => setServiceDuration(e.target.value), placeholder: "Ex: 30", className: "w-full rounded-xl bg-zinc-950 mt-1.5 px-4 py-3 text-xs text-amber-300 placeholder:text-zinc-600 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.15)] focus:ring-amber-400 focus:outline-none transition-all" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                setShowServiceForm(false);
                setEditingService(null);
              }, className: "rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer", children: "Cancelar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 px-6 py-2.5 text-xs font-black transition-all shadow shadow-amber-500/10 cursor-pointer active:scale-95", children: editingService ? "Salvar Alterações" : "Adicionar Serviço" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: services.map((svc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `glass-card rounded-2xl p-4 flex justify-between items-start transition-all duration-300 ${svc.isActive === false ? "opacity-50" : "hover:scale-[1.01] hover:glow-emerald-sm"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black text-white", children: svc.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] text-zinc-500 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDuration(svc.duration) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black text-sky-400 mt-2", children: formatPrice(svc.price) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleToggleServiceActive(svc), className: `rounded px-2 py-1 text-[9px] font-black transition-all ${svc.isActive === false ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`, title: svc.isActive === false ? "Clique para ativar" : "Clique para desativar", children: svc.isActive === false ? "Desativo" : "Ativo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEditServiceClick(svc), className: "p-2 rounded-lg bg-zinc-950 border border-yellow-500/30 text-yellow-500 hover:text-yellow-400 hover:border-yellow-500/50 transition-colors", title: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDeleteServiceClick(svc.id), className: "p-2 rounded-lg bg-zinc-950 border border-red-500/30 text-red-500 hover:text-red-400 hover:border-red-500/50 transition-colors", title: "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }, svc.id)) })
        ] }),
        activeTab === "barbeiros" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center glass-card rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-zinc-300 uppercase tracking-wider", children: "Gerenciador de Especialistas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-zinc-500 mt-0.5", children: "Adicione, edite ou remova profissionais da sua clínica." })
            ] }),
            !showBarberForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              setEditingBarber(null);
              setBarberName("");
              setBarberAvatar("");
              setBarberPhone("");
              setBarberWorkDays([1, 2, 3, 4, 5, 6]);
              setBarberStartTime("08:00");
              setBarberEndTime("19:00");
              setBarberWorkHours(DEFAULT_WORK_HOURS);
              setBarberBlockedDates("");
              setShowBarberForm(true);
            }, className: "inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 px-4 py-2.5 text-xs font-bold transition-all shadow shadow-amber-500/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              " Novo Especialista"
            ] })
          ] }),
          showBarberForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleBarberSubmit, className: "glass-card border border-amber-500/20 shadow-lg shadow-amber-500/5 rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
              editingBarber ? "Editar Especialista" : "Cadastrar Novo Especialista"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "Nome do Especialista" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: barberName, onChange: (e) => setBarberName(e.target.value), placeholder: "Ex: Rafael Silva", className: "w-full rounded-xl bg-zinc-950 mt-1.5 px-4 py-3 text-xs text-amber-300 placeholder:text-zinc-650 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.25)] focus:ring-amber-400 focus:outline-none transition-all" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "Celular (WhatsApp - com DDD)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: barberPhone, onChange: (e) => setBarberPhone(e.target.value), placeholder: "Ex: (62) 99329-9120", className: "w-full rounded-xl bg-zinc-950 mt-1.5 px-4 py-3 text-xs text-amber-300 placeholder:text-zinc-655 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.25)] focus:ring-amber-400 focus:outline-none transition-all" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "Foto (URL da Imagem - Opcional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", value: barberAvatar, onChange: (e) => setBarberAvatar(e.target.value), placeholder: "Deixe em branco para usar foto padrão", className: "w-full rounded-xl bg-zinc-950 mt-1.5 px-4 py-3 text-xs text-amber-300 placeholder:text-zinc-655 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.25)] focus:ring-amber-400 focus:outline-none transition-all" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-2", children: "Dias de Atendimento" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: weekdaysList.map((day) => {
                  const isChecked = barberWorkDays.includes(day.value);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                    if (isChecked) {
                      if (barberWorkDays.length > 1) {
                        setBarberWorkDays(barberWorkDays.filter((d) => d !== day.value));
                      }
                    } else {
                      setBarberWorkDays([...barberWorkDays, day.value].sort());
                    }
                  }, className: `px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${isChecked ? "bg-amber-500 text-zinc-950 border-amber-500 shadow-md shadow-amber-500/10" : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-900/60"}`, children: day.label }, day.value);
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1.5", children: "Horário do Turno" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: barberStartTime, onChange: (e) => {
                    const newStart = e.target.value;
                    setBarberStartTime(newStart);
                    const updated = DEFAULT_WORK_HOURS.filter((h) => h >= newStart && h <= barberEndTime);
                    setBarberWorkHours(updated);
                  }, className: "flex-1 rounded-xl bg-zinc-950 px-3 py-2.5 text-xs text-white ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.15)] focus:ring-2 focus:ring-amber-400 focus:outline-none", children: hourOptions.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: h, children: h }, h)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-zinc-600 font-bold", children: "até" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: barberEndTime, onChange: (e) => {
                    const newEnd = e.target.value;
                    setBarberEndTime(newEnd);
                    const updated = DEFAULT_WORK_HOURS.filter((h) => h >= barberStartTime && h <= newEnd);
                    setBarberWorkHours(updated);
                  }, className: "flex-1 rounded-xl bg-zinc-950 px-3 py-2.5 text-xs text-white ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.15)] focus:ring-2 focus:ring-amber-400 focus:outline-none", children: hourOptions.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: h, children: h }, h)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-2", children: "Horários de Atendimento Individuais (Selecione para Ativar/Desativar)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2", children: DEFAULT_WORK_HOURS.map((hour) => {
                const isChecked = barberWorkHours.includes(hour);
                return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                  if (isChecked) {
                    setBarberWorkHours(barberWorkHours.filter((h) => h !== hour));
                  } else {
                    setBarberWorkHours([...barberWorkHours, hour].sort());
                  }
                }, className: `px-2 py-1.5 text-center text-xs font-bold rounded-xl border transition-all cursor-pointer ${isChecked ? "bg-amber-500 text-zinc-950 border-amber-500 shadow-md shadow-amber-500/10" : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-900/60"}`, children: hour }, hour);
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400 block", children: "Datas de Folga Específicas / Bloqueios (Formato: AAAA-MM-DD, separados por vírgula)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: barberBlockedDates, onChange: (e) => setBarberBlockedDates(e.target.value), placeholder: "Ex: 2026-06-12, 2026-06-25 (deixe em branco se nenhuma)", className: "w-full rounded-xl bg-zinc-950 mt-1.5 px-4 py-3 text-xs text-amber-300 placeholder:text-zinc-655 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.25)] focus:ring-amber-400 focus:outline-none transition-all" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                setShowBarberForm(false);
                setEditingBarber(null);
                setBarberName("");
                setBarberAvatar("");
                setBarberPhone("");
                setBarberWorkDays([1, 2, 3, 4, 5, 6]);
                setBarberStartTime("08:00");
                setBarberEndTime("19:00");
                setBarberWorkHours(DEFAULT_WORK_HOURS);
                setBarberBlockedDates("");
              }, className: "rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer", children: "Cancelar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 px-6 py-2.5 text-xs font-black transition-all shadow shadow-amber-500/10 cursor-pointer active:scale-95", children: editingBarber ? "Salvar Alterações" : "Adicionar Especialista" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: barbers.map((barber) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card hover:scale-[1.01] hover:glow-emerald-sm rounded-2xl p-4 flex justify-between items-center transition-all duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: barber.avatar, alt: barber.name, className: "w-12 h-12 rounded-full object-cover border-2 border-zinc-800 shadow" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black text-white uppercase tracking-wider", children: barber.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-zinc-500 font-bold", children: "Profissional" }),
                  barber.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-zinc-600", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-zinc-400 font-mono font-bold", children: barber.phone.length === 13 ? `+${barber.phone.substring(0, 2)} (${barber.phone.substring(2, 4)}) ${barber.phone.substring(4, 9)}-${barber.phone.substring(9)}` : barber.phone })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-zinc-500 mt-1.5 space-y-0.5 font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "🕒 Turno: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-500 font-semibold", children: [
                      barber.startTime || "08:00",
                      " - ",
                      barber.endTime || "19:00"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "📅 Dias: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-300 font-semibold", children: barber.workDays && barber.workDays.length > 0 ? barber.workDays.map((d) => weekdaysList.find((w) => w.value === d)?.label).join(", ") : "Nenhum dia cadastrado" })
                  ] }),
                  barber.blockedDates && barber.blockedDates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    "🚫 Folgas: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400 font-semibold", children: barber.blockedDates.join(", ") })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEditBarberClick(barber), className: "p-2 rounded-lg bg-zinc-950 border border-yellow-500/30 text-yellow-500 hover:text-yellow-400 hover:border-yellow-500/50 transition-colors", title: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDeleteBarberClick(barber.id), className: "p-2 rounded-lg bg-zinc-950 border border-red-500/30 text-red-500 hover:text-red-400 hover:border-red-500/50 transition-colors", title: "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }, barber.id)) })
        ] }),
        activeTab === "perfil" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-extrabold text-white", children: "Minha Clínica" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400", children: "Personalize as informações de visualização da sua clínica para seus clientes." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2 glass-card border border-amber-500/20 shadow-lg shadow-amber-500/5 rounded-3xl p-6 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: async (e) => {
              e.preventDefault();
              if (!shopName.trim()) {
                toast.error("Por favor, preencha o nome da clínica.");
                return;
              }
              setSavingProfile(true);
              try {
                const localUser = getCurrentUser();
                const sessionUser = isSupabaseConfigured ? (await supabase.auth.getSession()).data.session?.user?.email : null;
                const tenantEmail = sessionUser || localUser?.email || "default";
                await updateBarberShopProfile({
                  tenantId: tenantEmail,
                  name: shopName,
                  logoUrl: shopLogoUrl.trim() || void 0
                });
                await loadAllData(false);
              } catch (error) {
                console.error(error);
              } finally {
                setSavingProfile(false);
              }
            }, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "Nome da Clínica" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: shopName, onChange: (e) => setShopName(e.target.value), placeholder: "Ex: DoctorCorpo Clínica", className: "w-full rounded-xl bg-zinc-950/90 px-4 py-3.5 text-sm text-amber-300 placeholder:text-zinc-655 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.25)] focus:ring-amber-400 focus:outline-none transition-all mt-1.5" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "Link da Foto / Logotipo da Clínica" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: shopLogoUrl, onChange: (e) => setShopLogoUrl(e.target.value), placeholder: "Cole o link da foto (ex: https://i.postimg.cc/...)", className: "w-full rounded-xl bg-zinc-950 mt-1.5 px-4 py-3 text-xs text-amber-300 placeholder:text-zinc-600 ring-2 ring-amber-500/50 shadow-[0_0_10px_rgba(20,184,166,0.15)] focus:ring-amber-400 focus:outline-none transition-all" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-zinc-500 leading-relaxed font-semibold mt-1.5", children: "Cole o link direto da imagem (ex: Postimages, Imgur ou Supabase) para que a foto da clínica apareça no topo do app e na prévia do WhatsApp quando o link de agendamento for enviado!" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: savingProfile, className: "w-full rounded-xl bg-amber-500 py-3.5 text-xs font-black tracking-wide text-zinc-950 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 mt-2 cursor-pointer", children: savingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Salvando..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SALVAR CONFIGURAÇÕES" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4 glow-emerald-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-zinc-500", children: "Visualização do Cliente" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[240px] glass-card rounded-2xl p-5 shadow-xl glow-emerald-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 flex items-center justify-center bg-zinc-900/50 shadow-inner shrink-0", children: shopLogoUrl.trim() ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: shopLogoUrl, alt: "Logo Clínica", className: "w-full h-full object-cover", onError: (e) => {
                  e.target.src = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=100&h=100&fit=crop";
                } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BarberGoLogo, { className: "w-16 h-16 scale-110", animate: false }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-black text-white truncate max-w-full", children: shopName.trim() || "Minha Clínica" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-zinc-500 font-semibold uppercase tracking-wider mt-0.5 block", children: "DoctorCorpo GO" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-zinc-500 leading-relaxed max-w-[200px]", children: "Este é o cabeçalho que seus clientes verão ao abrir o aplicativo pelo celular para agendar serviços." })
            ] })
          ] })
        ] }),
        activeTab === "master" && session?.email === "gleidmircristino@hotmail.com" && /* @__PURE__ */ jsxRuntimeExports.jsx(MasterAdminPanel, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-4 text-center text-[10px] text-zinc-600 border-t border-zinc-900 bg-zinc-950", children: "Painel de Gerenciamento DoctorCorpo GO — Todos os direitos reservados." }),
    showSubscriptionModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-900 border border-zinc-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowSubscriptionModal(false), className: "absolute top-4 right-4 p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl sm:text-2xl font-extrabold tracking-tight text-white", children: "Planos de Assinatura" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-400 text-xs mt-1", children: "Selecione um plano e realize o pagamento para prolongar o acesso da sua clínica." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionSection, { selectedPlan, setSelectedPlan, handleCopyPixKey, shopName })
    ] }) })
  ] });
}
function SubscriptionSection({
  selectedPlan,
  setSelectedPlan,
  handleCopyPixKey,
  shopName
}) {
  const plans = [{
    id: "mensal",
    name: "Mensal",
    price: "R$ 29,90",
    rawPrice: 29.9,
    desc: "Acesso por 30 dias",
    detail: "R$ 29,90 / mês"
  }, {
    id: "trimestral",
    name: "Trimestral",
    price: "R$ 74,90",
    rawPrice: 74.9,
    desc: "Acesso por 90 dias",
    detail: "R$ 24,96 / mês",
    popular: true
  }, {
    id: "semestral",
    name: "Semestral",
    price: "R$ 139,90",
    rawPrice: 139.9,
    desc: "Acesso por 180 dias",
    detail: "R$ 23,31 / mês"
  }, {
    id: "anual",
    name: "Anual",
    price: "R$ 239,90",
    rawPrice: 239.9,
    desc: "Acesso por 365 dias",
    detail: "R$ 19,99 / mês",
    bestDeal: true
  }];
  const currentPlan = plans.find((p) => p.id === selectedPlan);
  const getWhatsAppLink = () => {
    const clinicaName = shopName ? ` para a minha Clínica *${shopName.toUpperCase()}*` : "";
    const message = `Olá Gleidmir! Gostaria de adquirir o plano *${currentPlan.name.toUpperCase()}*${clinicaName}, no aplicativo *DoctorCorpo GO*.`;
    return `https://wa.me/5562993299120?text=${encodeURIComponent(message)}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-left", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: plans.map((p) => {
      const isSelected = selectedPlan === p.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedPlan(p.id), className: `relative flex flex-col justify-between p-5 rounded-2xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${isSelected ? "bg-[#39ff14]/5 border-[#39ff14] ring-2 ring-[#39ff14]/30" : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800"}`, children: [
        p.popular && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2.5 left-4 rounded-full bg-[#39ff14] text-zinc-950 font-black text-[9px] px-2.5 py-0.5 uppercase tracking-wide", children: "Mais Popular" }),
        p.bestDeal && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2.5 left-4 rounded-full bg-[#39ff14] text-zinc-950 font-black text-[9px] px-2.5 py-0.5 uppercase tracking-wide", children: "Melhor Preço" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-white uppercase tracking-wider", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-extrabold text-white mt-2", children: p.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-zinc-500 mt-1", children: p.detail })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-3 border-t border-zinc-900/60 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-zinc-300 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#39ff14]" }),
          p.desc
        ] }) })
      ] }, p.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-900/60 border border-zinc-900 rounded-3xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-emerald-400" }),
        "PAGAMENTO DO PLANO ",
        currentPlan.name.toUpperCase()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400", children: "Realize o pagamento utilizando a chave Pix celular abaixo:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-zinc-950 p-4 border border-zinc-800 flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-zinc-500 uppercase font-black block", children: "Chave Pix (Celular)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono font-bold text-white truncate block", children: "(62) 99329-9120" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleCopyPixKey, className: "inline-flex items-center gap-1.5 rounded-xl bg-[#39ff14] hover:bg-[#2ee610] text-zinc-950 px-3.5 py-2 text-xs font-black transition-all shrink-0 active:scale-95 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Copiar" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-[10px] bg-zinc-950/40 p-3 rounded-xl border border-zinc-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-500 uppercase font-bold block", children: "Favorecido" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-300 font-semibold block", children: "Gleidmir Cristino Dos Santos" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-500 uppercase font-bold block", children: "Banco" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-300 font-semibold block", children: "Neon Pagamentos S.A." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: getWhatsAppLink(), target: "_blank", rel: "noopener noreferrer", className: "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-500 text-white py-3.5 text-xs font-bold transition-all shadow-lg shadow-green-600/15 active:scale-[0.99] uppercase", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppIcon, { className: "h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Enviar Comprovante pelo WhatsApp" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminDashboard as component
};
