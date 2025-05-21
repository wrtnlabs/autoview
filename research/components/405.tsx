import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnersLabels {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const labels = value.labels;
  const shownCount = labels.length;
  const countText =
    totalCount !== shownCount
      ? `Showing ${shownCount} of ${totalCount} labels`
      : `${totalCount} label${totalCount !== 1 ? "s" : ""}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Runner Labels</h2>
        <span className="text-sm text-gray-600">{countText}</span>
      </div>
      {labels.length > 0 ? (
        <ul className="space-y-2">
          {labels.map((label, index) => {
            const badgeText =
              label.type === "read-only"
                ? "Read-only"
                : label.type === "custom"
                ? "Custom"
                : "";
            const badgeClasses =
              label.type === "read-only"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-green-100 text-green-800";

            return (
              <li
                key={label.id ?? index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded"
              >
                <span className="text-gray-700 truncate">{label.name}</span>
                {badgeText && (
                  <span
                    className={`ml-2 px-2 py-0.5 text-xs font-medium rounded ${badgeClasses}`}
                  >
                    {badgeText}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No labels available.</p>
      )}
    </div>
  );
  // 3. Return the React element.
}
