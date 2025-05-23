import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnersLabels {
        export interface PostResponse {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  const readOnlyLabels = labels.filter((label) => label.type === "read-only");
  const customLabels = labels.filter((label) => label.type !== "read-only");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const element = (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex items-center text-lg font-semibold text-gray-800">
        <LucideReact.Tag className="mr-2 text-blue-500" size={20} />
        <span>Runner Labels</span>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-gray-900">
          {total_count.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500">total</span>
      </div>
      <div className="space-y-3">
        {customLabels.length > 0 && (
          <div>
            <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <LucideReact.Tag size={16} className="mr-1 text-blue-500" />
              <span>Custom Labels</span>
              <span className="ml-1 text-gray-500">({customLabels.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {customLabels.map((label) => (
                <span
                  key={label.id ?? label.name}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                >
                  {label.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {readOnlyLabels.length > 0 && (
          <div>
            <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <LucideReact.Lock size={16} className="mr-1 text-gray-500" />
              <span>Read-only Labels</span>
              <span className="ml-1 text-gray-500">({readOnlyLabels.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {readOnlyLabels.map((label) => (
                <span
                  key={label.id ?? label.name}
                  className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded"
                >
                  {label.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {labels.length === 0 && (
          <div className="flex items-center text-gray-400">
            <LucideReact.AlertCircle size={24} className="mr-2" />
            <span>No runner labels available</span>
          </div>
        )}
      </div>
    </div>
  );

  // 3. Return the React element.
  return element;
}
