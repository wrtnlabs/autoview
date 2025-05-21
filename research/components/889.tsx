import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Tag protection
     *
     * @title Tag protection
    */
    export type tag_protection = {
        id?: number & tags.Type<"int32">;
        created_at?: string;
        updated_at?: string;
        enabled?: boolean;
        pattern: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.tag_protection[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Prepare the list of items (patterns)
  const items = Array.isArray(value) ? value : [];

  // 2. Render visual structure
  return (
    <div className="mx-auto p-4">
      {items.length === 0 ? (
        <div className="text-center text-gray-500">No patterns to display.</div>
      ) : (
        <ul role="list" className="space-y-4">
          {items.map((item, idx) => {
            const { pattern, enabled, created_at, updated_at } = item;

            // Derive status label and styling
            const statusLabel = enabled ? "Enabled" : "Disabled";
            const statusClasses = enabled
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800";

            // Format dates
            const createdDate = created_at
              ? new Date(created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A";
            const updatedDate = updated_at
              ? new Date(updated_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A";

            return (
              <li key={idx} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-start justify-between">
                  <code className="text-lg font-medium text-gray-900 break-words">
                    {pattern}
                  </code>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses}`}
                  >
                    {statusLabel}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500 flex flex-wrap space-x-4">
                  <span>Created: {createdDate}</span>
                  <span>Updated: {updatedDate}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
