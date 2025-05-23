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
export type AutoViewInput = AutoViewInputSubTypes.issue_type[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Define a non-nullable issue type alias
  type IssueType = Exclude<AutoViewInputSubTypes.issue_type, null>;

  // 1. Filter out null entries and sort by name.
  const issues = React.useMemo(
    () => value.filter((it): it is IssueType => it !== null),
    [value]
  );
  const sortedIssues = React.useMemo(
    () => [...issues].sort((a, b) => a.name.localeCompare(b.name)),
    [issues]
  );

  // Helper to format ISO dates to "Jan 1, 2023"
  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // Map issue-type colors to Tailwind background/text classes
  const colorClasses: Record<Exclude<IssueType["color"], undefined | null>, string> = {
    gray: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    orange: "bg-orange-100 text-orange-800",
    red: "bg-red-100 text-red-800",
    pink: "bg-pink-100 text-pink-800",
    purple: "bg-purple-100 text-purple-800",
  };

  // 2. Show empty state if no valid issue types.
  if (sortedIssues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span>No issue types available.</span>
      </div>
    );
  }

  // 3. Render list of issue-type cards
  return (
    <div className="space-y-4">
      {sortedIssues.map((issue) => (
        <div
          key={issue.id}
          className="p-4 bg-white rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center space-x-3">
            {/* Color indicator dot */}
            {issue.color ? (
              <span className={`w-3 h-3 rounded-full ${colorClasses[issue.color]}`} />
            ) : (
              <span className="w-3 h-3 rounded-full bg-gray-200" />
            )}
            {/* Issue type name */}
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {issue.name}
            </h3>
          </div>

          {/* Description truncated to two lines */}
          {issue.description && (
            <p className="mt-2 text-gray-600 text-sm line-clamp-2 md:mt-0 md:mx-6">
              {issue.description}
            </p>
          )}

          {/* Metadata: creation date and enabled status */}
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 md:mt-0">
            {issue.created_at && (
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={16} />
                <span>{formatDate(issue.created_at)}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              {issue.is_enabled ? (
                <>
                  <LucideReact.CheckCircle size={16} className="text-green-500" />
                  <span>Enabled</span>
                </>
              ) : (
                <>
                  <LucideReact.XCircle size={16} className="text-red-500" />
                  <span>Disabled</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
