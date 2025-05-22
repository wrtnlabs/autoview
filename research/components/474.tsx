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
export type AutoViewInput = AutoViewInputSubTypes.issue_type[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items = value.filter(
    (item): item is Exclude<AutoViewInputSubTypes.issue_type, null> => item !== null
  );

  const formatDate = (dateString?: string | null): string =>
    dateString
      ? new Date(dateString).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const colorClasses: Record<string, string> = {
    gray: "bg-gray-200",
    blue: "bg-blue-200",
    green: "bg-green-200",
    yellow: "bg-yellow-200",
    orange: "bg-orange-200",
    red: "bg-red-200",
    pink: "bg-pink-200",
    purple: "bg-purple-200",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No issue types available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const badgeColor = item.color ?? "gray";
        const created = formatDate(item.created_at);
        const updated = formatDate(item.updated_at);
        const statusClass = item.is_enabled
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800";
        const statusLabel = item.is_enabled ? "Enabled" : "Disabled";

        return (
          <div
            key={item.id}
            className="p-4 bg-white rounded-lg shadow border border-gray-100 flex flex-col sm:flex-row sm:items-start"
          >
            {/* Name & Color */}
            <div className="flex items-center">
              <span
                className={`w-3 h-3 rounded-full mr-2 ${
                  colorClasses[badgeColor] || colorClasses.gray
                }`}
                aria-hidden="true"
              />
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {item.name}
              </h3>
            </div>

            {/* Description */}
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {item.description ?? "No description"}
            </p>

            {/* Footer: Status & Dates */}
            <div className="mt-4 flex flex-wrap items-center space-x-2 text-sm text-gray-500">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${statusClass}`}
              >
                {statusLabel}
              </span>
              <time dateTime={item.created_at ?? ""}>Created: {created}</time>
              {item.updated_at && (
                <time dateTime={item.updated_at}>
                  Updated: {updated}
                </time>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
  // 3. Return the React element.
}
