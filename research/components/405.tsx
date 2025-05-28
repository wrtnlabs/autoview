import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnersLabels {
        export interface GetResponse {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  const readOnlyLabels = labels.filter((label) => label.type === "read-only");
  const customLabels = labels.filter((label) => label.type === "custom");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Tag size={20} className="text-gray-600" aria-hidden="true" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">Runner Labels</h2>
        <span className="ml-auto text-sm text-gray-500">{total_count} total</span>
      </div>

      {/* Breakdown */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        {readOnlyLabels.length > 0 && (
          <div className="flex items-center text-gray-700">
            <LucideReact.Lock size={16} className="text-gray-500" aria-hidden="true" />
            <span className="ml-1">Read-only ({readOnlyLabels.length})</span>
          </div>
        )}
        {customLabels.length > 0 && (
          <div className="flex items-center text-gray-700">
            <LucideReact.Tag size={16} className="text-gray-500" aria-hidden="true" />
            <span className="ml-1">Custom ({customLabels.length})</span>
          </div>
        )}
      </div>

      {/* Labels List */}
      {labels.length === 0 ? (
        <div className="flex justify-center items-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={24} className="mr-2" aria-hidden="true" />
          <span>No labels available</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {labels.map((label) => {
            const isReadOnly = label.type === "read-only";
            const Icon = isReadOnly ? LucideReact.Lock : LucideReact.Tag;
            return (
              <div
                key={label.id ?? label.name}
                className="flex items-center px-2 py-1 bg-gray-50 rounded-md text-sm text-gray-700 truncate"
              >
                <Icon size={14} className="text-gray-500" aria-hidden="true" />
                <span className="ml-1 truncate">{label.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
