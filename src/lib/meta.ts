import type { BarberShopProfile } from "./db";

export const DEFAULT_OG_IMAGE = "https://doctorcorpogo.netlify.app/og_image.png?v=5";
export const DEFAULT_SITE_TITLE = "DOCTORCORPO GO";
export const DEFAULT_DESCRIPTION =
  "DoctorCorpo GO — Seu horário, seu procedimento, você no controle. Sistema de agendamento online fácil e prático para clínicas de estética e odontologia.";

export const updatePageMeta = (profile: BarberShopProfile | null) => {
  if (typeof document === "undefined") return;

  const title = profile?.name
    ? `${profile.name} — Agendamento Online`
    : DEFAULT_SITE_TITLE;
  const description = profile?.name
    ? `Agende seu horário na clínica ${profile.name} online de forma rápida, fácil e sem filas.`
    : DEFAULT_DESCRIPTION;
  const logoUrl = profile?.logoUrl?.trim() || DEFAULT_OG_IMAGE;

  document.title = title;

  const setMeta = (attr: "name" | "property", attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  const setLink = (rel: string, href: string) => {
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