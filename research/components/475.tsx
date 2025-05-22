import LucideReact from "lucide-react";
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
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm">
        <LucideReact.AlertCircle className="text-gray-400 mb-2" size={48} />
        <span className="text-gray-500">No issue type available</span>
      </div>
    );
  }

  // 1. Data aggregation/transformation
  const { name, description, color, created_at, updated_at, is_enabled } =
    value;

  const formattedCreatedAt = created_at
    ? new Date(created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const formattedUpdatedAt = updated_at
    ? new Date(updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const displayDescription = description
    ? description.length > 140
      ? description.slice(0, 140) + "…"
      : description
    : "No description available.";

  const statusIcon = is_enabled ? (
    <LucideReact.CheckCircle
      className="text-green-500"
      size={16}
      aria-label="Enabled"
    />
  ) : (
    <LucideReact.XCircle
      className="text-red-500"
      size={16}
      aria-label="Disabled"
    />
  );

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
  const badgeClass = color && colorMap[color] ? colorMap[color] : "bg-gray-300";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm w-full max-w-sm">
      {/* Header: Name & Color Badge */}
      <div className="flex items-center justify-between">
        <h3
          className="text-lg font-semibold text-gray-800 truncate"
          title={name}
        >
          {name}
        </h3>
        {color !== null && (
          <span
            className={`w-3 h-3 rounded-full ${badgeClass}`}
            aria-label={`Color: ${color}`}
          />
        )}
      </div>

      {/* Description */}
      <p className="mt-2 text-gray-600 text-sm line-clamp-3">
        {displayDescription}
      </p>

      {/* Meta: Status, Created, Updated */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-500 text-xs">
        <div className="flex items-center gap-1">
          {statusIcon}
          <span>{is_enabled ? "Enabled" : "Disabled"}</span>
        </div>
        {formattedCreatedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={14} />
            <span>Created: {formattedCreatedAt}</span>
          </div>
        )}
        {formattedUpdatedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={14} />
            <span>Updated: {formattedUpdatedAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
