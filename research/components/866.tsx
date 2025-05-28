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
  const formattedDate = new Date(value.updated_at).toLocaleString();
  const actorDisplay = value.actor?.type
    ? value.actor.id != null
      ? `${value.actor.type} (ID: ${value.actor.id})`
      : value.actor.type
    : "Unknown actor";
  const stateKeys = Object.keys(value.state || {});
  const hasStateData = stateKeys.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-4 mx-auto">
      <div className="flex items-center mb-3">
        <LucideReact.GitCommit className="text-gray-600 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          Version {value.version_id}
        </h2>
      </div>
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <LucideReact.Calendar className="mr-1" size={16} />
        <span>{formattedDate}</span>
      </div>
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <LucideReact.User className="mr-1" size={16} />
        <span>{actorDisplay}</span>
      </div>
      {hasStateData ? (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            State Details
          </h3>
          <pre className="text-xs text-gray-600 bg-gray-100 p-2 rounded overflow-auto max-h-32">
            {JSON.stringify(value.state, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="flex items-center text-gray-400 text-sm">
          <LucideReact.AlertCircle className="mr-1" size={16} />
          <span>No state information</span>
        </div>
      )}
    </div>
  );
}
