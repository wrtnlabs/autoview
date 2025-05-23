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
  // 1. Data transformations and derived values
  const colorMap: Record<string, string> = {
    gray: "bg-gray-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    orange: "bg-orange-500",
    red: "bg-red-500",
    pink: "bg-pink-500",
    purple: "bg-purple-500",
  };

  // Handle null or missing value
  if (!value) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-400">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span>No issue type data available</span>
      </div>
    );
  }

  const createdDate = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  const updatedDate = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const badgeColor = value.color
    ? colorMap[value.color] || "bg-gray-200"
    : "bg-gray-200";

  // 2. JSX structure with Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-3">
      {/* Header: Icon, Name, Color Badge */}
      <div className="flex items-center gap-2">
        <LucideReact.Tag size={20} className="text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <span
          className={`w-3 h-3 rounded-full ${badgeColor}`}
          aria-label={value.color ?? "none"}
        />
      </div>

      {/* Description */}
      <div className="text-gray-600 text-sm">
        {value.description ? (
          <p className="line-clamp-2">{value.description}</p>
        ) : (
          <p className="italic text-gray-400">No description provided</p>
        )}
      </div>

      {/* Metadata: Created, Updated, Status */}
      <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} className="text-gray-400" />
          <span>Created: {createdDate}</span>
        </div>
        {updatedDate && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={14} className="text-gray-400" />
            <span>Updated: {updatedDate}</span>
          </div>
        )}
        <div className="flex items-center gap-1 ml-auto">
          {value.is_enabled ? (
            <>
              <LucideReact.CheckCircle
                size={14}
                className="text-green-500"
                aria-label="Enabled"
              />
              <span>Enabled</span>
            </>
          ) : (
            <>
              <LucideReact.XCircle
                size={14}
                className="text-red-500"
                aria-label="Disabled"
              />
              <span>Disabled</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
