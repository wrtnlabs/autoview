import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnersLabels {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels._DeleteResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  const customLabels = labels.filter(label => label.type === "custom");
  const readOnlyLabels = labels.filter(label => label.type === "read-only");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <section className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Labels Deletion Summary
        </h2>
        <p className="text-sm text-gray-600">
          Total Labels Deleted: <span className="font-medium">{total_count}</span>
        </p>
        <div className="mt-2 flex space-x-4 text-sm">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1" />
            <span className="text-gray-800">
              Custom: {customLabels.length}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-gray-500 rounded-full mr-1" />
            <span className="text-gray-800">
              Read-only: {readOnlyLabels.length}
            </span>
          </div>
        </div>
      </header>
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Deleted Labels
        </h3>
        {labels.length > 0 ? (
          <ul className="space-y-2">
            {labels.map((label, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <span className="text-gray-900 truncate">{label.name}</span>
                <span
                  className={
                    "ml-2 px-2 py-0.5 text-xs font-medium rounded-full " +
                    (label.type === "custom"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800")
                  }
                >
                  {label.type === "custom" ? "Custom" : "Read-only"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No labels to display.</p>
        )}
      </div>
    </section>
  );
}
