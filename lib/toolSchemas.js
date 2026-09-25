// lib/toolSchemas.js
//
// FIX: AssemblyAI requires each tool to include "type": "function" as a
// field alongside name/description/parameters. Our earlier version was
// missing that field on every tool, which is what caused the "Invalid
// session configuration" error — AssemblyAI couldn't recognize the tools
// array as valid without it.
//
// This describes the SHAPE of each tool (its name and what arguments it
// takes) in the exact format AssemblyAI's Voice Agent expects.

import { CHECKLIST_ORDER } from "./mockData.js";

export const TOOL_SCHEMAS = [
  {
    type: "function",
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
    type: "function",
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
    type: "function",
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
    type: "function",
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
