import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface ruleset_version_with_state {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.ruleset_version_with_state;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const actorDisplay = value.actor.type
    ? `${value.actor.type}${value.actor.id ? ` (#${value.actor.id})` : ""}`
    : value.actor.id
    ? `Actor (#${value.actor.id})`
    : "Unknown actor";
  const stateKeys = value.state && typeof value.state === "object"
    ? Object.keys(value.state)
    : [];
  const hasState = stateKeys.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md text-gray-700">
      <div className="flex items-center mb-2">
        <LucideReact.Hash className="text-gray-500" size={20} />
        <span className="ml-2 font-semibold text-lg">Version {value.version_id}</span>
      </div>
      <div className="flex items-center text-sm mb-1">
        <LucideReact.User className="text-gray-400" size={16} />
        <span className="ml-1">Actor: {actorDisplay}</span>
      </div>
      <div className="flex items-center text-sm mb-4">
        <LucideReact.Calendar className="text-gray-400" size={16} />
        <span className="ml-1">Updated: {formattedDate}</span>
      </div>
      {hasState && (
        <details className="text-sm">
          <summary className="flex items-center cursor-pointer text-gray-600">
            <LucideReact.Box className="text-gray-400" size={16} />
            <span className="ml-1">State ({stateKeys.length} properties)</span>
          </summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs max-h-40 overflow-auto">
            {JSON.stringify(value.state, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}
