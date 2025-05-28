import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The type of issue.
     *
     * @title Issue Type
    */
    export type issue_type = {
        /**
         * The unique identifier of the issue type.
        */
        id: number & tags.Type<"int32">;
        /**
         * The node identifier of the issue type.
        */
        node_id: string;
        /**
         * The name of the issue type.
        */
        name: string;
        /**
         * The description of the issue type.
        */
        description: string | null;
        /**
         * The color of the issue type.
        */
        color?: "gray" | "blue" | "green" | "yellow" | "orange" | "red" | "pink" | "purple" | null;
        /**
         * The time the issue type created.
        */
        created_at?: string;
        /**
         * The time the issue type last updated.
        */
        updated_at?: string;
        /**
         * The enabled state of the issue type.
        */
        is_enabled?: boolean;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.issue_type;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const hasValue = value !== null;
  // Map the issue type color to Tailwind background classes
  const colorMap: Record<string, string> = {
    gray: "bg-gray-400",
    blue: "bg-blue-400",
    green: "bg-green-400",
    yellow: "bg-yellow-400",
    orange: "bg-orange-400",
    red: "bg-red-400",
    pink: "bg-pink-400",
    purple: "bg-purple-400",
  };
  const dotColor = value?.color && colorMap[value.color] ? colorMap[value.color] : "bg-gray-300";

  // Format ISO dates into human-readable strings
  const formattedCreatedAt = value?.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const formattedUpdatedAt = value?.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasValue) {
    return (
      <div className="p-4 flex items-center justify-center bg-white rounded-lg shadow border border-gray-200">
        <LucideReact.AlertCircle size={24} className="text-gray-400 mr-2" />
        <span className="text-gray-500">No issue type available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-200 max-w-sm mx-auto">
      {/* Header: Color dot, name, enabled status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full mr-2 ${dotColor}`} />
          <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>
        </div>
        {value.is_enabled ? (
          <LucideReact.CheckCircle size={20} className="text-green-500" aria-label="Enabled" />
        ) : (
          <LucideReact.XCircle size={20} className="text-red-500" aria-label="Disabled" />
        )}
      </div>

      {/* Description */}
      <div className="mt-2">
        {value.description ? (
          <p className="text-gray-600 text-sm line-clamp-3">{value.description}</p>
        ) : (
          <p className="text-gray-400 italic text-sm">No description provided.</p>
        )}
      </div>

      {/* Footer: Created and Updated Dates */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
        {formattedCreatedAt && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
            <span>Created: {formattedCreatedAt}</span>
          </div>
        )}
        {formattedUpdatedAt && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
            <span>Updated: {formattedUpdatedAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
