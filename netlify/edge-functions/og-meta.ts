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

  let html = "";
  try {
    const indexUrl = new URL("/index.html", request.url);
    const indexRes = await fetch(indexUrl);
    html = await indexRes.text();
  } catch (e) {
    const res = await context.next();
    return res;
  }

  if (!tenantParam) {
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
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

  // Replace or inject meta tags
  if (/<\/title>/i.test(html)) {
    html = html.replace(/<title>.*?<\/title>/i, `<title>${finalTitle}</title>`);
  }

  const setMetaProp = (prop: string, val: string) => {
    const reg = new RegExp(`<meta\\s+property="${prop}"\\s+content="[^"]*"\\s*\\/?>`, "gi");
    if (reg.test(html)) {
      html = html.replace(reg, `<meta property="${prop}" content="${val}" />`);
    } else {
      html = html.replace("</head>", `<meta property="${prop}" content="${val}" />\n</head>`);
    }
  };

  const setMetaName = (name: string, val: string) => {
    const reg = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*\\/?>`, "gi");
    if (reg.test(html)) {
      html = html.replace(reg, `<meta name="${name}" content="${val}" />`);
    } else {
      html = html.replace("</head>", `<meta name="${name}" content="${val}" />\n</head>`);
    }
  };

  setMetaProp("og:title", finalTitle);
  setMetaProp("og:description", finalDescription);
  setMetaProp("og:image", finalImage);
  setMetaProp("og:image:secure_url", finalImage);

  setMetaName("twitter:title", finalTitle);
  setMetaName("twitter:description", finalDescription);
  setMetaName("twitter:image", finalImage);

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
};
