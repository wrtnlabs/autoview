import { tags } from "typia";
import React from "react";
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
        created_at?: string & tags.Format<"date-time">;
        /**
         * The time the issue type last updated.
        */
        updated_at?: string & tags.Format<"date-time">;
        /**
         * The enabled state of the issue type.
        */
        is_enabled?: boolean;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.issue_type;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Handle null or missing data
  if (!value) {
    return (
      <div className="p-4 text-center text-gray-500 italic">
        No issue type data available.
      </div>
    );
  }

  // Destructure relevant fields
  const { name, description, color, created_at, updated_at, is_enabled } = value;

  // Format dates into a human-readable form
  const formattedCreated = created_at
    ? new Date(created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const formattedUpdated = updated_at
    ? new Date(updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // Map the schema's color to Tailwind CSS utility classes
  const colorClasses: Record<string, string> = {
    gray: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    orange: "bg-orange-100 text-orange-800",
    red: "bg-red-100 text-red-800",
    pink: "bg-pink-100 text-pink-800",
    purple: "bg-purple-100 text-purple-800",
  };

  // Prepare status badge styling
  const statusBadge = is_enabled
    ? { label: "Enabled", classes: "bg-green-100 text-green-800" }
    : { label: "Disabled", classes: "bg-red-100 text-red-800" };

  // Compose and return the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {name}
        </h2>
        {color && (
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${
              colorClasses[color] ?? ""
            }`}
          >
            {color}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-gray-700 overflow-hidden line-clamp-3">
          {description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
        {formattedCreated && <span>Created: {formattedCreated}</span>}
        {formattedUpdated && <span>Updated: {formattedUpdated}</span>}
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusBadge.classes}`}>
          {statusBadge.label}
        </span>
      </div>
    </div>
  );
}
