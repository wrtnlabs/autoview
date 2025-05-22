import * as LucideReact from "lucide-react";
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
  const totalCount = value.total_count;
  const labels = value.labels;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-800">
          <LucideReact.Tag size={20} className="mr-2 text-blue-500" />
          Runner Labels
        </h2>
        <div className="flex items-center text-gray-600">
          <LucideReact.List size={18} className="mr-1" />
          <span className="font-medium">{totalCount}</span>
        </div>
      </div>

      {/* Labels List or Empty State */}
      {labels.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {labels.map((label, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <span className="text-gray-800 truncate">{label.name}</span>
              {label.type === "read-only" ? (
                <div className="flex items-center text-indigo-600 text-sm font-medium">
                  <LucideReact.Lock
                    size={16}
                    className="mr-1"
                    aria-label="Read-only"
                  />
                  Read-only
                </div>
              ) : (
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <LucideReact.Tag
                    size={16}
                    className="mr-1"
                    aria-label="Custom"
                  />
                  Custom
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} aria-label="No labels" />
          <span className="mt-2 text-sm">No labels available</span>
        </div>
      )}
    </div>
  );
}
