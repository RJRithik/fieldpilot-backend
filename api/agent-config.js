// api/agent-config.js
//
// This is a second small "address" your backend publishes, reachable at:
//   https://<your-project>.vercel.app/api/agent-config
//
// It hands the frontend everything needed to set up the voice agent in
// one go: the system prompt (personality/rules), the tool definitions,
// the greeting, and the reference data (procedures, parts, checklist,
// work order). Person B's frontend fetches this once when the app starts,
// instead of having the content typed twice in two different places.
//
// This endpoint does NOT touch your AssemblyAI API key at all — it's just
// serving the content files in this project as one JSON response.
//
// NOTE ON CORS: same reason as token.js — the frontend is a different
// website address, so we explicitly allow it to fetch from here.

import { SYSTEM_PROMPT } from "../lib/systemPrompt.js";
import { TOOL_SCHEMAS } from "../lib/toolSchemas.js";
import { PROCEDURES, CHECKLIST_ORDER, PARTS, WORK_ORDER, KEYTERMS } from "../lib/mockData.js";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET requests are allowed." });
  }

  return res.status(200).json({
    system_prompt: SYSTEM_PROMPT,
    greeting:
      "Morning, Marcus. You're on WO-4471, rooftop RTU-3 at Meridian Logistics. Say 'start briefing' when you're ready.",
    tools: TOOL_SCHEMAS,
    keyterms: KEYTERMS,
    data: {
      procedures: PROCEDURES,
      checklist_order: CHECKLIST_ORDER,
      parts: PARTS,
      work_order: WORK_ORDER,
    },
  });
}
