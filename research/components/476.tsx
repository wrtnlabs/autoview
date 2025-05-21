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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Handle null or missing data
  if (!value) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-gray-500 italic">
        No issue type data available.
      </div>
    );
  }

  // 2. Define data aggregation/transformation
  const {
    name,
    description,
    color,
    created_at,
    updated_at,
    is_enabled,
  } = value;

  const createdAt = created_at
    ? new Date(created_at).toLocaleString()
    : "N/A";
  const updatedAt = updated_at
    ? new Date(updated_at).toLocaleString()
    : "N/A";

  const statusText =
    is_enabled === undefined
      ? "Unknown"
      : is_enabled
      ? "Enabled"
      : "Disabled";
  const statusColor = is_enabled
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  const colorClasses: Record<string, string> = {
    gray: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    orange: "bg-orange-100 text-orange-800",
    red: "bg-red-100 text-red-800",
    pink: "bg-pink-100 text-pink-800",
    purple: "bg-purple-100 text-purple-800",
    null: "bg-gray-100 text-gray-800",
  };
  const badgeColorClass =
    colorClasses[String(color)] || colorClasses["null"];

  // 3. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {name}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${badgeColorClass}`}
        >
          {color ?? "none"}
        </span>
      </div>
      <p className="text-gray-700 text-sm mb-3 line-clamp-3">
        {description ?? "No description available."}
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${statusColor}`}
        >
          {statusText}
        </span>
      </div>
      <div className="text-gray-500 text-xs space-y-1">
        <div>Created: {createdAt}</div>
        <div>Updated: {updatedAt}</div>
      </div>
    </div>
  );
}
