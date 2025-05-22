import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunnersLabels._DeleteResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  const formattedTotal = total_count.toLocaleString();
  const readOnlyCount = labels.filter((l) => l.type === "read-only").length;
  const customCount = labels.filter((l) => l.type === "custom").length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Runner Labels Deleted</h2>
        <p className="text-sm text-gray-600">Total count: {formattedTotal}</p>
      </header>

      <div className="flex space-x-2 text-sm">
        <div className="flex-1 bg-blue-50 text-blue-800 px-2 py-1 rounded text-center">
          Read-Only: {readOnlyCount}
        </div>
        <div className="flex-1 bg-green-50 text-green-800 px-2 py-1 rounded text-center">
          Custom: {customCount}
        </div>
      </div>

      {labels.length > 0 ? (
        <ul className="mt-4 divide-y divide-gray-200">
          {labels.map((label, idx) => {
            const badgeColor =
              label.type === "read-only"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800";
            const displayType =
              label.type === "read-only" ? "Read-Only" : "Custom";
            return (
              <li
                key={idx}
                className="flex justify-between items-center py-2"
              >
                <span
                  className="text-gray-700 truncate"
                  title={label.name}
                >
                  {label.name}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${badgeColor}`}
                >
                  {displayType}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-4 text-center text-gray-500 text-sm">
          No labels to display.
        </p>
      )}
    </div>
  );
}
