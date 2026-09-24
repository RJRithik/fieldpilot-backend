// lib/toolSchemas.js
//
// This describes the SHAPE of each tool (its name and what arguments it
// takes) in a format the AssemblyAI Voice Agent understands. Think of it
// like a form the agent fills out when it wants to use a tool — this file
// defines what fields are on that form. The frontend already knows HOW to
// actually run each tool (that logic is already built and tested); this
// file just describes WHAT the tools are called and what they need.
//
// You shouldn't need to edit this file unless a tool's name or arguments
// change — if that happens, tell Person B, since their code matches these
// exact names.

import { CHECKLIST_ORDER } from "./mockData.js";

export const TOOL_SCHEMAS = [
  {
    name: "get_procedure",
    description: "Look up the step-by-step procedure for a named repair task.",
    parameters: {
      type: "object",
      properties: {
        procedure: {
          type: "string",
          description:
            "The name of the procedure, e.g. 'replace contactor', 'replace txv valve', 'check refrigerant charge', 'replace filter drier'.",
        },
      },
      required: ["procedure"],
    },
  },
  {
    name: "confirm_checklist_item",
    description:
      "Mark one safety checklist item as confirmed. Items must be confirmed in a fixed order; confirming out of order is rejected.",
    parameters: {
      type: "object",
      properties: {
        item_id: {
          type: "string",
          description: "Which checklist item to confirm.",
          enum: CHECKLIST_ORDER.map((item) => item.id),
        },
      },
      required: ["item_id"],
    },
  },
  {
    name: "update_work_order",
    description: "Update the current work order with an action taken, the issue description, or its status.",
    parameters: {
      type: "object",
      properties: {
        field: {
          type: "string",
          enum: ["actions_taken", "issue", "status"],
          description: "Which part of the work order to update.",
        },
        value: {
          type: "string",
          description: "The new text to record for that field.",
        },
      },
      required: ["field", "value"],
    },
  },
  {
    name: "order_part",
    description: "Check stock for a part and order it if available.",
    parameters: {
      type: "object",
      properties: {
        part_id: {
          type: "string",
          description: "The catalog id of the part, e.g. 'p1', 'p2'.",
        },
        quantity: {
          type: "integer",
          description: "How many units to order.",
          minimum: 1,
        },
      },
      required: ["part_id", "quantity"],
    },
  },
];
