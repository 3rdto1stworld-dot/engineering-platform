// functions/test-strapi.js
export async function onRequest(context) {
  const { env } = context;
  // don't return secrets in production — this is only a smoke test
  const base = env.STRAPI_URL || "STRAPI_URL_NOT_SET";
  return new Response(JSON.stringify({ ok: true, STRAPI_URL: base }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
