import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnersLabels {
        export interface PutResponse {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels.PutResponse;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation: count custom and read-only labels
  const { total_count, labels } = value;
  const countCustom = labels.filter(label => label.type === "custom").length;
  const countReadOnly = labels.filter(label => label.type === "read-only").length;

  // 2. Visual structure with Tailwind CSS and LucideReact icons
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <LucideReact.Tag size={20} className="text-gray-500" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-gray-900">Runner Labels</h2>
        </div>
        <span className="text-sm text-gray-600">{total_count}</span>
      </div>

      {/* Empty state */}
      {total_count === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <LucideReact.AlertCircle size={32} className="text-gray-300" aria-hidden="true" />
          <span className="mt-2 text-sm">No labels available</span>
        </div>
      ) : (
        <>
          {/* Summary badges */}
          <div className="flex flex-wrap gap-2 mb-3 text-sm">
            {countCustom > 0 && (
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                {countCustom} custom
              </span>
            )}
            {countReadOnly > 0 && (
              <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                {countReadOnly} read-only
              </span>
            )}
          </div>

          {/* Labels list */}
          <ul className="divide-y divide-gray-100">
            {labels.map((label, index) => (
              <li key={label.id ?? index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <LucideReact.Tag size={16} className="text-gray-400" aria-hidden="true" />
                  <span className="text-sm text-gray-800 truncate">{label.name}</span>
                </div>
                {label.type && (
                  <span
                    className={
                      label.type === "custom"
                        ? "bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
                        : "bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded"
                    }
                  >
                    {label.type === "custom" ? "Custom" : "Read-only"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
