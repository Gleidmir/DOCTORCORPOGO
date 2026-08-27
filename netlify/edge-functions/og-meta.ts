import type { Context } from "@netlify/edge-functions";

const SUPABASE_URL = "https://jivbwqghmiwxgrljkmrp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_D-2zZjJok7kV7V4-cvu9Wg_azYUv1tc";
const DEFAULT_OG_IMAGE = "https://doctorcorpogo.netlify.app/og_image.png?v=6";

export const config = {
  path: ["/client", "/client/*"],
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const tenantParam = url.searchParams.get("t") || url.searchParams.get("barberia") || url.searchParams.get("clinica");

  const response = await context.next();
  let html = "";
  try {
    html = await response.text();
  } catch (e) {
    return response;
  }

  if (!tenantParam || !html) {
    return response;
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
    console.error("Edge function fetch error:", e);
  }

  const finalTitle = shopName ? shopName : "Painel do Cliente - DoctorCorpo GO";
  const finalDescription = "Agendamento Online";
  const finalImage = shopLogo || DEFAULT_OG_IMAGE;
  const imageType = finalImage.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";

  // Wipe out ANY default title, og: or twitter: meta tags regardless of attribute order
  const bulletproofMetaRegex = /<meta\s+[^>]*?(?:property="og:[^"]*"|name="og:[^"]*"|name="twitter:[^"]*"|property="twitter:[^"]*"|name="description")[^>]*?\/?>/gi;
  html = html
    .replace(/<title>.*?<\/title>/gi, "")
    .replace(bulletproofMetaRegex, "");

  // Inject fresh complete Open Graph tags before </head>
  const metaTagsToInject = `
    <title>${finalTitle}</title>
    <meta property="og:title" content="${finalTitle}" />
    <meta property="og:description" content="${finalDescription}" />
    <meta property="og:image" content="${finalImage}" />
    <meta property="og:image:secure_url" content="${finalImage}" />
    <meta property="og:image:type" content="${imageType}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${finalTitle}" />
    <meta name="twitter:description" content="${finalDescription}" />
    <meta name="twitter:image" content="${finalImage}" />
  `;

  html = html.replace("</head>", `${metaTagsToInject}\n</head>`);

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
};
