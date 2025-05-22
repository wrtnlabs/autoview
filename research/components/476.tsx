import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    color?:
      | "gray"
      | "blue"
      | "green"
      | "yellow"
      | "orange"
      | "red"
      | "pink"
      | "purple"
      | null;
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
  // Handle null or missing data
  if (value === null) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span>No issue type available</span>
      </div>
    );
  }

  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { name, description, color, created_at, updated_at, is_enabled } =
    value;

  // Map the issue-type color to Tailwind background/text classes
  const colorKey = color || "gray";
  const colorClassMap: Record<string, { bg: string; text: string }> = {
    gray: { bg: "bg-gray-100", text: "text-gray-800" },
    blue: { bg: "bg-blue-100", text: "text-blue-800" },
    green: { bg: "bg-green-100", text: "text-green-800" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-800" },
    orange: { bg: "bg-orange-100", text: "text-orange-800" },
    red: { bg: "bg-red-100", text: "text-red-800" },
    pink: { bg: "bg-pink-100", text: "text-pink-800" },
    purple: { bg: "bg-purple-100", text: "text-purple-800" },
  };
  const { bg: badgeBg, text: badgeText } =
    colorClassMap[colorKey] || colorClassMap.gray;

  // Format dates for display
  const formattedCreated = created_at
    ? new Date(created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";
  const formattedUpdated = updated_at
    ? new Date(updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow sm:p-6">
      {/* Header: Name and Color Badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${badgeBg} ${badgeText}`}
        >
          {colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
        </span>
      </div>

      {/* Description (truncated for long text) */}
      {description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
      )}

      {/* Metadata: Created, Updated, Status */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span className="text-gray-700">Created: {formattedCreated}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span className="text-gray-700">Updated: {formattedUpdated}</span>
        </div>
        <div className="flex items-center col-span-2 text-gray-500">
          {is_enabled ? (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500 mr-1"
            />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500 mr-1" />
          )}
          <span className="text-gray-700">
            {is_enabled ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>
    </div>
  );
}
