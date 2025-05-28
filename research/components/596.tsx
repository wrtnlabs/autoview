import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunnersLabels {
        export interface _DeleteResponse {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunnersLabels._DeleteResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  const readonlyCount = labels.filter((l) => l.type === "read-only").length;
  const customCount = labels.filter((l) => l.type === "custom").length;

  // 2. Handle empty state when there are no labels
  if (labels.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
        <LucideReact.AlertCircle size={48} className="text-gray-300" aria-hidden="true" />
        <span className="mt-4 text-gray-500 text-lg font-medium">No labels to display</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header with total count and type breakdown */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-800 text-xl font-semibold">
          <LucideReact.Tag size={24} className="text-indigo-500 mr-2" aria-hidden="true" />
          <span>Labels Deleted</span>
          <span className="ml-2 text-indigo-600">{total_count}</span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <LucideReact.Lock
              size={18}
              className="text-gray-500 mr-1"
              aria-label="Read-only labels count"
            />
            <span>{readonlyCount} read-only</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Tag
              size={18}
              className="text-blue-500 mr-1"
              aria-label="Custom labels count"
            />
            <span>{customCount} custom</span>
          </div>
        </div>
      </header>

      {/* Label list */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {labels.map((label, idx) => (
          <li
            key={label.id ?? idx}
            className="flex items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-100"
          >
            {label.type === "read-only" ? (
              <LucideReact.Lock
                size={16}
                className="text-gray-500 mr-2"
                aria-label="Read-only label"
              />
            ) : (
              <LucideReact.Tag
                size={16}
                className="text-blue-500 mr-2"
                aria-label="Custom label"
              />
            )}
            <span className="text-gray-800 font-medium truncate">{label.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
