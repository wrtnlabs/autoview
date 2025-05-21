import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunnersLabels {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunnersLabels.PutResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  const customCount = labels.filter(label => label.type === 'custom').length;
  const readOnlyCount = labels.filter(label => label.type === 'read-only').length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">
        Runner Labels
        <span className="ml-2 text-sm font-normal text-gray-500">
          ({total_count})
        </span>
      </h2>

      <div className="mt-2 flex flex-wrap text-sm text-gray-600 space-x-4">
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>{customCount} custom</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-gray-400" />
          <span>{readOnlyCount} read-only</span>
        </span>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {labels.map((label, idx) => {
          const isCustom = label.type === 'custom';
          const bgClass = isCustom ? 'bg-blue-100' : 'bg-gray-100';
          const textClass = isCustom ? 'text-blue-800' : 'text-gray-800';
          const key = label.id != null ? label.id : idx;
          return (
            <li key={key}>
              <span
                className={`${bgClass} ${textClass} px-2 py-1 text-xs font-medium rounded-full truncate block max-w-xs`}
                title={label.name}
              >
                {label.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
