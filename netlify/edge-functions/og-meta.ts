import type { Context } from "@netlify/edge-functions";

const SUPABASE_URL = "https://jivbwqghmiwxgrljkmrp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_D-2zZjJok7kV7V4-cvu9Wg_azYUv1tc";
const DEFAULT_OG_IMAGE = "https://doctorcorpogo.netlify.app/og_image.png?v=5";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const tenantParam = url.searchParams.get("t") || url.searchParams.get("barberia") || url.searchParams.get("clinica");

  if (!tenantParam) {
    return context.next();
  }

  const cleanTenant = tenantParam.trim();
  let shopName = "";
  let shopLogo = "";

  try {
    const supabaseEndpoint = `${SUPABASE_URL}/rest/v1/barber_shops?select=name,logo_url,tenant_id&or=(tenant_id.eq.${encodeURIComponent(cleanTenant)},tenant_id.like.${encodeURIComponent(cleanTenant)}%40%25)&limit=1`;
    const res = await fetch(supabaseEndpoint, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        shopName = data[0].name || "";
        shopLogo = (data[0].logo_url || "").trim();
      }
    }
  } catch (e) {
    console.error("Edge function Supabase fetch error:", e);
  }

  const response = await context.next();
  if (!shopLogo && !shopName) {
    return response;
  }

  const html = await response.text();
  const finalTitle = shopName ? `${shopName} — Agendamento Online` : "Painel do Cliente - DoctorCorpo GO";
  const finalDescription = shopName ? `Agende seu horário na clínica ${shopName} online de forma rápida e prática!` : "DoctorCorpo GO — Sistema de agendamento online fácil e prático.";
  const finalImage = shopLogo || DEFAULT_OG_IMAGE;

  const modifiedHtml = html
    .replace(/<title>.*?<\/title>/i, `<title>${finalTitle}</title>`)
    .replace(/<meta property="og:title" content=".*?"\s*\/?>/gi, `<meta property="og:title" content="${finalTitle}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/?>/gi, `<meta property="og:description" content="${finalDescription}" />`)
    .replace(/<meta property="og:image" content=".*?"\s*\/?>/gi, `<meta property="og:image" content="${finalImage}" />`)
    .replace(/<meta property="og:image:secure_url" content=".*?"\s*\/?>/gi, `<meta property="og:image:secure_url" content="${finalImage}" />`)
    .replace(/<meta name="twitter:title" content=".*?"\s*\/?>/gi, `<meta name="twitter:title" content="${finalTitle}" />`)
    .replace(/<meta name="twitter:description" content=".*?"\s*\/?>/gi, `<meta name="twitter:description" content="${finalDescription}" />`)
    .replace(/<meta name="twitter:image" content=".*?"\s*\/?>/gi, `<meta name="twitter:image" content="${finalImage}" />`);

  return new Response(modifiedHtml, {
    status: response.status,
    headers: response.headers,
  });
};
