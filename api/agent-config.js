// api/agent-config.js
// (Person A's file — replace the whole thing with this version)
//
// FIX: the whole response is now wrapped in a try/catch that ALWAYS sets
// the CORS headers first and ALWAYS returns valid JSON, even if something
// inside goes wrong. Before, if any import or data problem happened, the
// server could return an error page with no CORS headers, which the
// browser reports confusingly as "CORS blocked" instead of the real error.

import { SYSTEM_PROMPT } from "../lib/systemPrompt.js";
import { TOOL_SCHEMAS } from "../lib/toolSchemas.js";
import { PROCEDURES, CHECKLIST_ORDER, PARTS, WORK_ORDER, KEYTERMS } from "../lib/mockData.js";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default function handler(req, res) {
  // Set CORS headers FIRST, before anything else can possibly fail.
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET requests are allowed." });
  }

  try {
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
  } catch (err) {
    // Even on failure, this response still has the CORS headers set above,
    // so the frontend will see a real, readable error instead of a
    // confusing "CORS blocked" message.
    return res.status(500).json({
      error: "Unexpected server error while building agent config.",
      details: String(err),
    });
  }
}
