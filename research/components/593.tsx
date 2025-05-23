import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunnersLabels {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            labels: AutoViewInputSubTypes.runner_label[];
        }
    }
    /**
     * A label for a self hosted runner
     *
     * @title Self hosted runner label
    */
    export interface runner_label {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunnersLabels.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const labels = value.labels ?? [];
  const hasLabels = labels.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with total count */}
      <div className="flex items-center mb-4">
        <LucideReact.ListOrdered className="text-gray-500" size={20} strokeWidth={1.5} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Labels ({totalCount})
        </h2>
      </div>

      {/* Labels list or empty state */}
      {hasLabels ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {labels.map((label, idx) => {
            const isReadOnly = label.type === "read-only";
            const Icon = isReadOnly ? LucideReact.Lock : LucideReact.Tag;
            const iconColor = isReadOnly ? "text-red-500" : "text-blue-500";
            const typeText = isReadOnly ? "Read-only" : "Custom";

            return (
              <div
                key={label.id ?? idx}
                className="flex items-center p-2 bg-gray-50 rounded-md"
              >
                <Icon className={`${iconColor}`} size={16} strokeWidth={1.5} />
                <div className="ml-2 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {label.name}
                  </p>
                  <span className="text-xs text-gray-500">{typeText}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={24} strokeWidth={1.5} />
          <span className="mt-2 text-sm">No labels available.</span>
        </div>
      )}
    </div>
  );
}
