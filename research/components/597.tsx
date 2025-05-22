import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposActionsRunnersLabels {
    export type _DeleteResponse = {
      total_count: number & tags.Type<"int32">;
      labels: AutoViewInputSubTypes.runner_label[];
    };
  }
  /**
   * A label for a self hosted runner
   *
   * @title Self hosted runner label
   */
  export type runner_label = {
    /**
     * Unique identifier of the label.
     */
    id?: number & tags.Type<"int32">;
    /**
     * Name of the label.
     */
    name: string;
    /**
     * The type of label. Read-only labels are applied automatically when the runner is configured.
     */
    type?: "read-only" | "custom";
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposActionsRunnersLabels._DeleteResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Format total_count, e.g., 1.2K for large numbers
  const formattedCount =
    value.total_count >= 1000
      ? `${(value.total_count / 1000).toFixed(1)}K`
      : value.total_count.toString();

  // Sort labels alphabetically by name
  const sortedLabels = [...value.labels].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Runner Labels</h2>
        <div className="flex items-center text-gray-600">
          <LucideReact.Tag size={16} className="mr-1" />
          <span className="text-sm">{formattedCount}</span>
        </div>
      </div>

      {/* Empty State */}
      {sortedLabels.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2 text-sm">No labels found</p>
        </div>
      ) : (
        <ul role="list" className="space-y-3">
          {sortedLabels.map((label, idx) => {
            const isReadOnly = label.type === "read-only";
            return (
              <li
                key={idx}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <div className="flex items-center gap-2">
                  {isReadOnly ? (
                    <LucideReact.Lock
                      size={16}
                      className="text-amber-500"
                      aria-label="Read-only label"
                    />
                  ) : (
                    <LucideReact.Tag
                      size={16}
                      className="text-blue-500"
                      aria-label="Custom label"
                    />
                  )}
                  <span className="text-gray-800 truncate">{label.name}</span>
                </div>
                {isReadOnly && (
                  <span className="px-2 py-0.5 text-xs text-amber-700 bg-amber-100 rounded">
                    Read-Only
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
