import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsRunnersLabels {
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
  AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels._DeleteResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  const displayCount = total_count;
  const hasLabels = labels && labels.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {/* Header with count */}
      <div className="flex items-center mb-3">
        <LucideReact.Tag size={20} className="text-gray-600" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Runner Labels ({displayCount})
        </h2>
      </div>

      {/* No-data state */}
      {!hasLabels && (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No labels available</span>
        </div>
      )}

      {/* Labels list */}
      {hasLabels && (
        <ul className="flex flex-wrap gap-2">
          {labels.map((label) => {
            const key = label.id != null ? label.id : label.name;
            const isReadOnly = label.type === "read-only";
            const iconColor = isReadOnly ? "text-blue-500" : "text-green-500";
            return (
              <li
                key={key}
                className="flex items-center px-2 py-1 bg-gray-100 rounded text-gray-800 text-sm"
              >
                <LucideReact.Tag size={16} className={`mr-1 ${iconColor}`} />
                <span className="truncate max-w-[8rem]">{label.name}</span>
                {isReadOnly && (
                  <LucideReact.Lock
                    size={12}
                    className="ml-1 text-gray-400"
                    aria-label="Read-only label"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
