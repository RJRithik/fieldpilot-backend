// lib/mockData.js
//
// This file holds all the "content" for FieldPilot: the procedures the
// agent can read out loud, the parts it can order, and the current job
// (work order) it's helping with. Edit the TEXT in here freely — this is
// the safest file in the whole project to change, since it's just data,
// not logic.

// ---------------------------------------------------------------------
// PROCEDURES
// Each one is a short list of spoken-style steps. Keep steps short —
// they get read aloud, so a technician should be able to do one step,
// then say "next" or "done" without losing track.
// ---------------------------------------------------------------------
export const PROCEDURES = {
  "replace contactor": {
    title: "Replace the contactor",
    steps: [
      "Confirm lockout/tagout is applied and power is off at the disconnect.",
      "Remove the access panel and locate the contactor, usually near the compressor wiring.",
      "Take a photo or note the wire positions before disconnecting anything.",
      "Disconnect the wires from the old contactor and unscrew it from its mount.",
      "Mount the new contactor and reconnect the wires exactly as noted.",
      "Reinstall the access panel, then restore power and test the unit.",
    ],
  },
  "replace txv valve": {
    title: "Replace the TXV (expansion) valve",
    steps: [
      "Confirm lockout/tagout and recover the refrigerant charge before opening the line.",
      "Locate the TXV near the evaporator coil inlet.",
      "Unbraze or unbolt the old valve, depending on the connection type.",
      "Install the new TXV, matching the flow direction arrow on the valve body.",
      "Braze or bolt the connections and pressure-test with nitrogen before charging.",
      "Pull a vacuum, then recharge the system to the nameplate specification.",
    ],
  },
  "check refrigerant charge": {
    title: "Check the refrigerant charge",
    steps: [
      "Confirm lockout/tagout is not required for this check if the unit is running normally.",
      "Connect manifold gauges to the high and low side service ports.",
      "Record the suction and discharge pressures with the unit running.",
      "Compare readings to the target superheat and subcooling for this unit and refrigerant type.",
      "If low, check for leaks before adding refrigerant.",
    ],
  },
  "replace filter drier": {
    title: "Replace the filter drier",
    steps: [
      "Confirm lockout/tagout is applied and recover the refrigerant charge.",
      "Locate the filter drier in the liquid line, usually after the condenser.",
      "Cut it out of the line and note the flow direction arrow.",
      "Braze in the new filter drier in the same orientation.",
      "Pressure-test with nitrogen, then pull a vacuum before recharging.",
    ],
  },
};

// ---------------------------------------------------------------------
// SAFETY CHECKLIST
// This list defines the REQUIRED ORDER. The frontend's safety gate
// (already built and tested) rejects any item confirmed out of order.
// If you add/remove/reorder items here, tell Person B — they'll need to
// update the matching list in the frontend so both sides agree.
// ---------------------------------------------------------------------
export const CHECKLIST_ORDER = [
  { id: "ppe", label: "PPE donned (gloves, safety glasses)" },
  { id: "roof_access", label: "Roof access secured and flagged" },
  { id: "lockout_tagout", label: "Lockout/tagout applied" },
  { id: "disconnect", label: "Disconnect opened and locked" },
  { id: "gauges", label: "Manifold gauges connected" },
  { id: "refrigerant", label: "Refrigerant recovered" },
  { id: "final_leak_check", label: "Final leak check completed" },
];

// ---------------------------------------------------------------------
// PARTS CATALOG
// ---------------------------------------------------------------------
export const PARTS = {
  p1: { id: "p1", name: "R-410A refrigerant (25 lb cylinder)", stock: 4 },
  p2: { id: "p2", name: "TXV valve kit (Carrier 48TC)", stock: 1 },
  p3: { id: "p3", name: "Filter drier (liquid line)", stock: 0 }, // out of stock, on purpose
  p4: { id: "p4", name: "Contactor, 40A 24V coil", stock: 6 },
  p5: { id: "p5", name: "Capacitor, 45/5 MFD dual run", stock: 2 },
  p6: { id: "p6", name: "Nitrogen cylinder (for pressure testing)", stock: 3 },
};

// ---------------------------------------------------------------------
// KEYTERMS
// These are trade words that are easy for speech recognition to mishear,
// since they're uncommon in everyday speech. Giving AssemblyAI this list
// in advance helps it recognize them correctly when the technician says
// them out loud. This does NOT restrict what can be said — it just
// improves accuracy on the words that matter most for this job.
// ---------------------------------------------------------------------
export const KEYTERMS = [
  "TXV",
  "contactor",
  "R-410A",
  "lockout tagout",
  "Carrier 48TC",
  "manifold gauges",
  "superheat",
  "subcooling",
  "filter drier",
  "capacitor",
  "RTU-3",
  "rooftop unit",
];

// ---------------------------------------------------------------------
// CURRENT WORK ORDER
// This matches the one already shown in Person B's frontend demo, so
// the two sides tell a consistent story.
// ---------------------------------------------------------------------
export const WORK_ORDER = {
  id: "WO-4471",
  equipment: "Carrier 48TC rooftop unit — RTU-3 (15-ton)",
  location: "Meridian Logistics — Warehouse B, Dock 12",
  technician: "Marcus Reyes",
  issue: "Supply air temperature drifting to 68°F. Warehouse east dock reporting warm complaints. Possible low refrigerant charge or restricted TXV.",
  status: "In Progress",
};
