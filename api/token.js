// api/token.js
// (Person A's file — replace the whole thing with this version)
//
// FIX: added CORS headers. Without these, browsers refuse to let the
// frontend website read the response from this backend, even though the
// backend technically worked — the browser blocks it as a safety measure
// unless we explicitly say "it's okay for other websites to call this."

export default async function handler(req, res) {
  // Allow the browser to call this from any origin. Fine for a hackathon
  // project; a production app would list only its real frontend domain.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Browsers sometimes send a quick "pre-check" request (OPTIONS) before
  // the real one, just to ask permission. Answer it immediately.
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET requests are allowed." });
  }

  const apiKey = process.env.ASSEMBLYAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Server is missing its AssemblyAI API key. Check Vercel project settings.",
    });
  }

  try {
    const url = new URL("https://agents.assemblyai.com/v1/token");
    url.searchParams.set("expires_in_seconds", "300");
    url.searchParams.set("max_session_duration_seconds", "1800");

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: "AssemblyAI rejected the token request.",
        details: errorText,
      });
    }

    const data = await response.json();

    return res.status(200).json({
      token: data.token,
      expires_in_seconds: data.expires_in_seconds,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Unexpected server error while requesting the token.",
      details: String(err),
    });
  }
}
