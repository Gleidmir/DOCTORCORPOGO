import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as BarberGoLogo } from "./logo-Cy3MS0-l.mjs";
import { b as getCurrentUser, i as isSupabaseConfigured, s as supabase, a as setCurrentUser } from "./router-BmcCHDYy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as Clock, w as ShieldCheck, p as Check, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
function WhatsAppIcon({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) });
}
function SignupCard() {
  const [email, setEmail] = reactExports.useState("");
  const [pass, setPass] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passValid = pass.length >= 6;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValid || !passValid) {
      toast.error("Por favor, preencha um e-mail válido e uma senha com no mínimo 6 caracteres.");
      return;
    }
    setLoading(true);
    if (typeof window !== "undefined") {
      const configKey = `mbg_tenant_config_${email}`;
      if (!window.localStorage.getItem(configKey)) {
        window.localStorage.setItem(configKey, JSON.stringify({
          registeredAt: (/* @__PURE__ */ new Date()).toISOString(),
          subscriptionStatus: "expired"
        }));
      }
    }
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: {
            data: {
              role: "admin",
              name: "Administrador da Clínica"
            }
          }
        });
        if (error) throw error;
        toast.success("Cadastro efetuado! Faça login e solicite a liberação de seus 30 dias grátis.");
        navigate({ to: "/login", search: { admin: "true" } });
      } catch (error) {
        console.error("Erro no cadastro:", error);
        toast.error(error.message || "Erro ao efetuar cadastro. Tente novamente.");
      } finally {
        setLoading(false);
      }
    } else {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(`mbg_local_password_${email}`, pass);
      }
      setCurrentUser({
        role: "admin",
        name: "Administrador da Clínica",
        email
      });
      toast.success("Cadastro de teste efetuado e conectado com sucesso!");
      navigate({ to: "/admin" });
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "rounded-2xl bg-zinc-900/80 p-6 ring-1 ring-zinc-800 backdrop-blur-sm shadow-2xl",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-amber-400", children: "Acesso Antecipado" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg font-bold text-white", children: "Cadastre sua clínica" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] font-semibold uppercase tracking-wider text-zinc-400", children: "E-mail" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  placeholder: "voce@suaclinica.com",
                  className: "w-full rounded-lg bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 ring-1 ring-zinc-800 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                }
              ),
              emailValid && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] font-semibold uppercase tracking-wider text-zinc-400", children: "Senha" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "password",
                  value: pass,
                  onChange: (e) => setPass(e.target.value),
                  placeholder: "Crie uma senha segura",
                  className: "w-full rounded-lg bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 ring-1 ring-zinc-800 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                }
              ),
              passValid && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "mt-5 w-full rounded-lg bg-amber-500 px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-bold tracking-wide text-zinc-950 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "CRIAR MINHA CONTA →"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-xs text-zinc-500", children: "✓ Teste grátis de 30 dias mediante solicitação de liberação." })
      ]
    }
  );
}
function LandingPage() {
  const navigate = useNavigate();
  const [showPlans, setShowPlans] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      const isPWA = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
      const savedTenant = window.localStorage.getItem("mbg_client_tenant");
      const user = getCurrentUser();
      if (isPWA) {
        if (user) {
          if (user.role === "admin") {
            navigate({ to: "/admin" });
          } else {
            navigate({ to: `/client?t=${savedTenant || "default"}` });
          }
        } else if (savedTenant) {
          navigate({ to: `/client?t=${savedTenant}` });
        }
      }
    }
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-zinc-950 text-white antialiased", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-zinc-900 bg-zinc-950 sticky top-0 z-40 pt-[calc(28px+env(safe-area-inset-top,0px))] sm:pt-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => setShowPlans(false),
          className: "flex items-center gap-1.5 sm:gap-2.5 min-w-0 cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BarberGoLogo, { className: "w-6 h-6 sm:w-8 h-8 shrink-0 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] xs:text-xs sm:text-base md:text-lg font-extrabold tracking-tight whitespace-nowrap truncate", children: [
              "DoctorCorpo ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500", children: "GO" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 sm:gap-3 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/login?admin=true",
            className: "rounded-lg border border-emerald-500 bg-zinc-950 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm font-bold text-emerald-400 hover:text-zinc-950 hover:bg-emerald-500 transition-all whitespace-nowrap",
            children: "ENTRAR"
          }
        ),
        !showPlans ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowPlans(true),
            className: "rounded-lg bg-amber-500 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm font-bold text-zinc-950 hover:bg-amber-400 transition-all whitespace-nowrap cursor-pointer",
            children: "PLANOS"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowPlans(false),
            className: "rounded-lg bg-gold-gradient px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm font-bold transition-all whitespace-nowrap cursor-pointer hover:opacity-90 shadow-md glow-gold-sm",
            children: "VOLTAR"
          }
        )
      ] })
    ] }) }),
    !showPlans ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "hero", className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(245,158,11,0.08),transparent_50%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-2.5 rounded-full bg-zinc-950/40 ring-1 ring-zinc-800/80 shadow-2xl drop-shadow-[0_0_25px_rgba(20,184,166,0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BarberGoLogo, { className: "w-32 h-32 md:w-36 md:h-36", animate: false }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400", children: "DOCTORCORPO GO" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-amber-400 mb-8", children: "Sua Clínica no Piloto Automático" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignupCard, {}) })
      ] }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "pricing-section", className: "py-20 border-t border-zinc-900 bg-zinc-950/40 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold text-amber-500 uppercase tracking-widest", children: "Planos de Assinatura" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl", children: "Escolha o melhor plano para a sua clínica" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base text-zinc-400", children: "Todas as assinaturas iniciam com o período de 30 dias de teste grátis automático a partir do seu cadastro na página inicial." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        { name: "Mensal", price: "R$ 49,90", rawPrice: 49.9, desc: "Acesso total por 30 dias", detail: "R$ 49,90 / mês" },
        { name: "Trimestral", price: "R$ 124,90", rawPrice: 124.9, desc: "Acesso total por 90 dias", detail: "R$ 41,63 / mês", popular: true },
        { name: "Semestral", price: "R$ 224,90", rawPrice: 224.9, desc: "Acesso total por 180 dias", detail: "R$ 37,48 / mês" },
        { name: "Anual", price: "R$ 399,90", rawPrice: 399.9, desc: "Acesso total por 365 dias", detail: "R$ 33,32 / mês", bestDeal: true }
      ].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `relative flex flex-col justify-between p-6 rounded-2xl border text-left bg-zinc-900/60 transition-all ${p.popular || p.bestDeal ? "border-[#fbbf24] ring-2 ring-[#fbbf24]/20" : "border-zinc-800"}`,
          children: [
            p.popular && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-4 rounded-full bg-[#fbbf24] text-zinc-950 font-black text-[9px] px-2 py-0.5 uppercase tracking-wider", children: "Mais Popular" }),
            p.bestDeal && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-4 rounded-full bg-[#fbbf24] text-zinc-950 font-black text-[9px] px-2 py-0.5 uppercase tracking-wider", children: "Melhor Preço" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-extrabold text-white tracking-wide", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black text-white mt-3", children: p.price }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-zinc-500 font-bold mt-1 uppercase tracking-wider", children: p.detail })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-zinc-800 w-full space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-zinc-300 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${p.popular || p.bestDeal ? "bg-[#fbbf24]" : "bg-amber-500"}` }),
                p.desc
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-zinc-500 leading-relaxed", children: "A ativação do plano é realizada enviando o comprovante via WhatsApp." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://wa.me/5562993299120?text=${encodeURIComponent(`Olá Gleidmir! Gostaria de adquirir o plano *${p.name.toUpperCase()}* para a minha Clínica *CLINICA CRISTINO'S*, no aplicativo *DoctorCorpo GO*.`)}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: `w-full inline-flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold transition-all cursor-pointer text-center ${p.popular || p.bestDeal ? "bg-[#fbbf24] hover:bg-[#e0a800] text-zinc-950 shadow shadow-[#fbbf24]/10" : "bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow shadow-amber-500/10"}`,
                  children: "Adquirir Plano"
                }
              )
            ] })
          ]
        },
        p.name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 text-center max-w-xl mx-auto bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 text-xs text-zinc-400", children: [
        "💡 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Quer testar antes?" }),
        " Basta criar sua conta no formulário no topo da página e solicitar a ativação dos seus ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "30 dias de teste grátis" }),
        " com o administrador."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setShowPlans(false),
          className: "rounded-xl bg-gold-gradient hover:opacity-90 px-6 py-3.5 text-sm font-bold tracking-wide transition-all cursor-pointer shadow-lg glow-gold",
          children: "VOLTAR PARA A PÁGINA INICIAL"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-zinc-900 bg-zinc-950", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BarberGoLogo, { className: "w-6 h-6 sm:w-8 h-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold tracking-tight text-xs sm:text-base whitespace-nowrap", children: [
          "DoctorCorpo ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500", children: "GO" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-3 hidden sm:inline text-xs text-zinc-500", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " — Todos os direitos reservados"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-6 text-xs text-zinc-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Termos de Uso" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Privacidade" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "hover:text-white transition-colors flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
          " Suporte"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "https://wa.me/5562993299120",
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Falar no WhatsApp",
        className: "fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1 rounded-2xl bg-green-600 px-3 py-2 text-white shadow-2xl shadow-green-600/40 ring-4 ring-green-600/20 hover:bg-green-500 hover:scale-105 transition-all",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-10 w-10 items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppIcon, { className: "h-7 w-7" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider", children: "SUPORTE" })
        ]
      }
    )
  ] });
}
const SplitComponent = LandingPage;
export {
  SplitComponent as component
};
