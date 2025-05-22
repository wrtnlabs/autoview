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
  // 1. Define data aggregation/transformation.
  const formattedDate = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const actorLabel = value.actor.type
    ? `${value.actor.type}${value.actor.id ? ` (#${value.actor.id})` : ""}`
    : value.actor.id
      ? `#${value.actor.id}`
      : "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full text-gray-700">
      <div className="flex items-center space-x-2 mb-3">
        <LucideReact.Hash className="text-gray-500" size={20} />
        <span className="text-lg font-semibold">
          Version {value.version_id}
        </span>
      </div>
      <div className="flex items-center text-sm space-x-1 mb-1">
        <LucideReact.Calendar className="text-gray-500" size={16} />
        <span>{formattedDate}</span>
      </div>
      <div className="flex items-center text-sm space-x-1">
        <LucideReact.User className="text-gray-500" size={16} />
        <span>{actorLabel}</span>
      </div>
    </div>
  );
}
