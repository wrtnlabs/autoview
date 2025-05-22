import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type ruleset_version_with_state = {
    /**
     * The ID of the previous version of the ruleset
     */
    version_id: number & tags.Type<"int32">;
    /**
     * The actor who updated the ruleset
     */
    actor: {
      id?: number & tags.Type<"int32">;
      type?: string;
    };
    updated_at: string & tags.Format<"date-time">;
    /**
     * The state of the ruleset version
     */
    state: {};
  };
}
export type AutoViewInput = AutoViewInputSubTypes.ruleset_version_with_state;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const formattedDate = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const actorDisplay = value.actor?.type
    ? `${value.actor.type}${value.actor.id ? ` (#${value.actor.id})` : ""}`
    : value.actor?.id
      ? `Actor #${value.actor.id}`
      : "Unknown actor";
  const stateKeys = Object.keys(value.state);
  const hasState = stateKeys.length > 0;
  const rawState = hasState ? JSON.stringify(value.state, null, 2) : "";
  const statePreview =
    rawState.length > 100 ? `${rawState.slice(0, 100)}...` : rawState;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4 text-gray-800 text-sm">
      <div className="flex items-center">
        <LucideReact.Hash
          className="text-gray-500"
          size={16}
          aria-hidden="true"
        />
        <span className="ml-2 font-medium">Version:</span>
        <span className="ml-1">{value.version_id}</span>
      </div>

      <div className="flex items-center">
        <LucideReact.User
          className="text-gray-500"
          size={16}
          aria-hidden="true"
        />
        <span className="ml-2 font-medium">Updated by:</span>
        <span className="ml-1">{actorDisplay}</span>
      </div>

      <div className="flex items-center">
        <LucideReact.Calendar
          className="text-gray-500"
          size={16}
          aria-hidden="true"
        />
        <span className="ml-2 font-medium">Updated at:</span>
        <span className="ml-1">{formattedDate}</span>
      </div>

      <div>
        <div className="flex items-center mb-1">
          <LucideReact.FileText
            className="text-gray-500"
            size={16}
            aria-hidden="true"
          />
          <span className="ml-2 font-medium">State:</span>
        </div>
        {hasState ? (
          <pre className="bg-gray-50 p-2 rounded max-h-40 overflow-auto text-xs font-mono whitespace-pre-wrap break-words">
            {statePreview}
          </pre>
        ) : (
          <span className="ml-6 italic text-gray-500">No state details</span>
        )}
      </div>
    </div>
  );
}
