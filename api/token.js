// api/token.js
//
// This is a Vercel Serverless Function. Vercel automatically turns any file
// inside the /api folder into a live web address. This one will be reachable
// at:   https://<your-project>.vercel.app/api/token
//
// What it does:
//   1. The browser (Person B's frontend) calls this address.
//   2. This code secretly adds YOUR real AssemblyAI API key (which only
//      exists on the server, never in the browser) and asks AssemblyAI for
//      a temporary, one-time-use token.
//   3. It sends that temporary token back to the browser.
//   4. The browser uses the temporary token to start the voice conversation.
//
// Your real API key NEVER reaches the browser and NEVER goes into GitHub,
// because it lives only in a Vercel "Environment Variable" (set up in a
// later step, not in this file).

export default async function handler(req, res) {
  // Only allow GET requests.
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET requests are allowed." });
  }

  // Read the real API key from the server's secret environment variable.
  const apiKey = process.env.ASSEMBLYAI_API_KEY;

  if (!apiKey) {
    // This means the environment variable hasn't been set up on Vercel yet.
    return res.status(500).json({
      error: "Server is missing its AssemblyAI API key. Check Vercel project settings.",
    });
  }

  try {
    // Build the request to AssemblyAI, asking for a short-lived token.
    const url = new URL("https://agents.assemblyai.com/v1/token");
    url.searchParams.set("expires_in_seconds", "300"); // 5 minutes to actually connect
    url.searchParams.set("max_session_duration_seconds", "1800"); // 30 min max call length

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: "AssemblyAI rejected the token request.",
        details: errorText,
      });
    }

    const data = await response.json();

    // Send only the temporary token back to the browser. Never send apiKey.
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

