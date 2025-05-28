import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnersLabels {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels._DeleteResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const labels = value.labels ?? [];
  
  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Tag className="text-gray-700 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">Runner Labels</h2>
      </div>

      {/* Total count */}
      <div className="flex items-center text-gray-600 mb-3">
        <LucideReact.Users className="text-gray-500 mr-2" size={16} />
        <span className="font-medium">{totalCount} total</span>
      </div>

      {/* Label list or empty state */}
      {labels.length > 0 ? (
        <ul className="space-y-2">
          {labels.map((label, idx) => {
            const isReadOnly = label.type === "read-only";
            return (
              <li
                key={label.id ?? idx}
                className="flex items-center bg-gray-50 p-2 rounded-md"
              >
                {isReadOnly ? (
                  <LucideReact.Lock
                    className="text-gray-500 mr-2"
                    size={16}
                    aria-label="Read-only label"
                  />
                ) : (
                  <LucideReact.Tag
                    className="text-blue-500 mr-2"
                    size={16}
                    aria-label="Custom label"
                  />
                )}
                <span className="text-gray-700 truncate">{label.name}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center text-gray-400">
          <LucideReact.AlertCircle className="mr-2" size={20} />
          <span>No labels available</span>
        </div>
      )}
    </div>
  );
}
