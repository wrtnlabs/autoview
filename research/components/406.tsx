import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnersLabels {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  const readOnlyLabels = labels.filter((lbl) => lbl.type === "read-only");
  const customLabels = labels.filter((lbl) => lbl.type !== "read-only");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Labels</h2>
        <span className="text-sm text-gray-600">{total_count}</span>
      </div>

      {labels.length === 0 ? (
        <p className="text-sm text-gray-500">No labels available.</p>
      ) : (
        <div className="space-y-4">
          {readOnlyLabels.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-800 mb-2">Read-only</h3>
              <div className="flex flex-wrap gap-2">
                {readOnlyLabels.map((lbl) => (
                  <span
                    key={lbl.id ?? lbl.name}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded"
                  >
                    {lbl.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {customLabels.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-800 mb-2">Custom</h3>
              <div className="flex flex-wrap gap-2">
                {customLabels.map((lbl) => (
                  <span
                    key={lbl.id ?? lbl.name}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded"
                  >
                    {lbl.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
