// functions/test-strapi.js
export async function onRequest(context) {
  const { env } = context;
  const STRAPI_URL = (env.STRAPI_URL || "").trim();
  const STRAPI_TOKEN = env.STRAPI_TOKEN;

  try {
    const res = await fetch(`${STRAPI_URL}/api/products?populate=*`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(
        JSON.stringify({ ok: false, status: res.status, message: text }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await res.json();
    return new Response(JSON.stringify({ ok: true, data }, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, error: error.message }, null, 2),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
