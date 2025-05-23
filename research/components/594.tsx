import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunnersLabels {
        export interface PostResponse {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunnersLabels.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  const count = total_count ?? labels.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // Handle empty state
  if (!labels || labels.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center py-8">
          <LucideReact.AlertCircle className="text-gray-400" size={48} />
          <span className="mt-2 text-gray-500">No labels available</span>
        </div>
      </div>
    );
  }

  // Main display
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <LucideReact.Tag className="text-indigo-500" size={20} />
          <h2 className="ml-2 text-lg font-semibold text-gray-800">Runner Labels</h2>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <LucideReact.ListOrdered className="mr-1" size={16} />
          <span>{count}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {labels.map((label, idx) => {
          const isReadOnly = label.type === "read-only";
          return (
            <div
              key={idx}
              className="flex items-center px-2 py-1 bg-gray-50 rounded min-w-0"
            >
              {isReadOnly ? (
                <LucideReact.Lock className="text-gray-500" size={16} />
              ) : (
                <LucideReact.Tag className="text-indigo-500" size={16} />
              )}
              <span className="ml-1 text-sm text-gray-700 truncate">
                {label.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
