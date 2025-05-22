import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposActionsRunnersLabels {
    export type GetResponse = {
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
  AutoViewInputSubTypes.IApiReposActionsRunnersLabels.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Destructure and prepare derived data
  const { total_count: totalCount, labels } = value;

  // 2. Handle empty state with placeholder
  if (labels.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow text-center text-gray-500 flex flex-col items-center">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span>No runner labels found</span>
      </div>
    );
  }

  // 3. Render label list with counts and badges
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header with icon and total count */}
      <div className="flex items-center">
        <LucideReact.Tag size={20} className="text-indigo-500" />
        <h2 className="ml-2 text-lg font-semibold text-gray-700">
          Runner Labels
        </h2>
        <span className="ml-auto text-sm font-medium text-gray-500">
          {totalCount}
        </span>
      </div>

      {/* Labels grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {labels.map((label) => (
          <div
            key={label.id ?? label.name}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            {/* Label name with icon */}
            <div className="flex items-center truncate">
              <LucideReact.Hash size={16} className="text-gray-400" />
              <span className="ml-2 text-sm text-gray-600 truncate">
                {label.name}
              </span>
            </div>

            {/* Type badge */}
            <span
              className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                label.type === "read-only"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-blue-200 text-blue-800"
              }`}
            >
              {label.type === "read-only" ? (
                <>
                  <LucideReact.Lock size={12} className="mr-1" />
                  Read-only
                </>
              ) : (
                <>
                  <LucideReact.Plus size={12} className="mr-1" />
                  Custom
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
