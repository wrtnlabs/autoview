import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunnersLabels {
        export type PostResponse = {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunnersLabels.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const formattedCount = totalCount.toLocaleString();
  const labels =
    Array.isArray(value.labels) && value.labels.length > 0
      ? [...value.labels].sort((a, b) => a.name.localeCompare(b.name))
      : [];

  // Helper to format label type into a human-readable badge text
  const formatType = (type?: "read-only" | "custom"): string =>
    type === "read-only" ? "Read-only" : type === "custom" ? "Custom" : "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-900">
        Runner Labels ({formattedCount})
      </h2>
      {labels.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {labels.map((label, index) => (
            <li
              key={label.id ?? index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span className="font-medium text-gray-800 truncate">
                {label.name}
              </span>
              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  label.type === "read-only"
                    ? "bg-gray-200 text-gray-800"
                    : label.type === "custom"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {formatType(label.type)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-gray-500">No labels available.</p>
      )}
    </div>
  );
}
