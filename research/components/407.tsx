import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnersLabels {
        export type PutResponse = {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels.PutResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  const customCount = labels.filter(label => label.type === "custom").length;
  const readOnlyCount = labels.filter(label => label.type === "read-only").length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header with title and total count */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Runner Labels</h2>
        <span className="text-sm text-gray-600">{total_count} Total</span>
      </div>

      {/* Summary badges for custom and read-only */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">
          {customCount} Custom
        </span>
        <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded">
          {readOnlyCount} Read-only
        </span>
      </div>

      {/* List of individual labels */}
      <ul className="space-y-2">
        {labels.map(label => {
          const type = label.type ?? "custom";
          const isReadOnly = type === "read-only";
          const badgeStyles = isReadOnly
            ? "bg-blue-50 text-blue-700"
            : "bg-green-50 text-green-700";
          const badgeText = isReadOnly ? "Read-only" : "Custom";
          const key = `${label.id ?? label.name}`;

          return (
            <li
              key={key}
              className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded"
            >
              <span
                className="text-gray-800 truncate"
                title={label.name}
              >
                {label.name}
              </span>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded ${badgeStyles}`}
              >
                {badgeText}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
