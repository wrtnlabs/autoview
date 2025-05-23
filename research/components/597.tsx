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
  const remainingCount = value.total_count;
  const labels = value.labels;
  const customCount = labels.filter((l) => l.type === "custom").length;
  const readOnlyCount = labels.filter((l) => l.type === "read-only").length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-4 text-gray-700">
        <LucideReact.Tag size={20} className="mr-2" aria-hidden="true" />
        <h2 className="text-lg font-semibold">Labels ({remainingCount})</h2>
      </div>

      {/* Empty state */}
      {labels.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={48} className="mb-2" aria-hidden="true" />
          <span className="text-sm">No labels available.</span>
        </div>
      ) : (
        /* Label list */
        <ul className="space-y-2">
          {labels.map((label, idx) => (
            <li
              key={label.id ?? idx}
              className="flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded transition"
            >
              <div className="flex items-center space-x-2">
                <LucideReact.Tag size={16} className="text-blue-500" aria-hidden="true" />
                <span className="text-gray-800 truncate">{label.name}</span>
              </div>
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  label.type === "read-only"
                    ? "bg-gray-100 text-gray-500"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {label.type === "read-only" ? "Read-only" : "Custom"}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Summary of types */}
      {labels.length > 0 && (
        <div className="mt-4 flex space-x-4 text-sm text-gray-600">
          {customCount > 0 && <span>Custom: {customCount}</span>}
          {readOnlyCount > 0 && <span>Read-only: {readOnlyCount}</span>}
        </div>
      )}
    </div>
  );
}
