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
export type AutoViewInput = AutoViewInputSubTypes.issue_type[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Filter out null entries and count enabled/disabled issue types.
  const issues = value.filter(
    (item): item is NonNullable<AutoViewInputSubTypes.issue_type> =>
      item !== null,
  );
  const totalCount = issues.length;
  const enabledCount = issues.filter((issue) => issue.is_enabled).length;

  //    Map GitHub-style color names to Tailwind CSS background utilities.
  const colorClasses: Record<string, string> = {
    gray: "bg-gray-200",
    blue: "bg-blue-200",
    green: "bg-green-200",
    yellow: "bg-yellow-200",
    orange: "bg-orange-200",
    red: "bg-red-200",
    pink: "bg-pink-200",
    purple: "bg-purple-200",
    undefined: "bg-gray-200",
    null: "bg-gray-200",
  };

  //    Format ISO date strings into a concise human‐readable form.
  const formatDate = (iso?: string): string => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Issue Types ({totalCount})
          </h2>
          <p className="text-sm text-gray-500">
            {enabledCount} enabled
            {totalCount - enabledCount > 0
              ? `, ${totalCount - enabledCount} disabled`
              : ""}
          </p>
        </div>
      </div>

      {/* Issue List */}
      <ul className="space-y-2">
        {issues.map((issue) => (
          <li
            key={issue.id}
            className="p-4 bg-white rounded-lg shadow flex space-x-4"
          >
            {/* Color Badge */}
            <span
              className={`w-3 h-3 mt-1 rounded-full ${
                colorClasses[String(issue.color)]
              }`}
              aria-label={issue.color ?? "gray"}
            />

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-md font-medium text-gray-900">
                  {issue.name}
                </span>
                {issue.is_enabled ? (
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
                )}
              </div>

              {/* Description (truncated) */}
              {issue.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {issue.description}
                </p>
              )}

              {/* Created Date */}
              {issue.created_at && (
                <div className="mt-2 flex items-center text-xs text-gray-400">
                  <LucideReact.Calendar size={12} />
                  <span className="ml-1">
                    Created: {formatDate(issue.created_at)}
                  </span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
