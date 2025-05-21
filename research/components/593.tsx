import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunnersLabels.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation: count label types
  const { total_count, labels } = value;
  const readOnlyCount: number = labels.filter(l => l.type === "read-only").length;
  const customCount: number = labels.filter(l => l.type === "custom").length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Title and Total */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Runner Labels</h2>
        <span className="text-sm font-medium text-gray-600">
          {total_count} Label{total_count !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Summary counts */}
      <div className="flex space-x-4 text-sm text-gray-600 mb-4">
        <div>
          <span className="font-medium text-gray-800">{readOnlyCount}</span>{" "}
          Read-only
        </div>
        <div>
          <span className="font-medium text-gray-800">{customCount}</span>{" "}
          Custom
        </div>
      </div>

      {/* Labels grid or empty state */}
      {labels.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {labels.map((label, idx) => {
            const key = label.id ?? label.name ?? idx;
            const badgeClasses =
              label.type === "custom"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800";
            return (
              <span
                key={key}
                className={`px-3 py-1 text-sm font-medium rounded-full ${badgeClasses}`}
              >
                {label.name}
              </span>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No labels available.</p>
      )}
    </div>
  );
}
