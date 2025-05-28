import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnersLabels {
        export interface _DeleteResponse {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels._DeleteResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const labels = value.labels ?? [];
  const totalCount = value.total_count;
  const shownCount = labels.length;
  const customLabels = labels.filter((lbl) => lbl.type === "custom");
  const readOnlyLabels = labels.filter((lbl) => lbl.type === "read-only" || lbl.type === undefined);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  if (shownCount === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
        <LucideReact.AlertCircle size={48} className="text-gray-300" aria-hidden="true" />
        <p className="mt-4 text-gray-500">No runner labels available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LucideReact.Tag size={20} className="text-blue-500" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-gray-800">Runner Labels</h2>
        </div>
        <span className="text-sm text-gray-600">
          Showing {shownCount} of {totalCount}
        </span>
      </div>

      {/* Breakdown */}
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        <div className="flex items-center space-x-1 text-indigo-600">
          <LucideReact.Tag size={16} aria-hidden="true" />
          <span>Custom: {customLabels.length}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-600">
          <LucideReact.Lock size={16} aria-hidden="true" />
          <span>Read‐only: {readOnlyLabels.length}</span>
        </div>
      </div>

      {/* Label List */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {labels.map((label, idx) => {
          const type = label.type ?? "read-only";
          const key = label.id !== undefined ? `lbl-${label.id}` : `lbl-${idx}`;
          return (
            <div
              key={key}
              className="flex items-center space-x-2 p-2 bg-gray-50 rounded border border-gray-200"
            >
              {type === "custom" ? (
                <LucideReact.Tag
                  size={16}
                  className="text-indigo-500 flex-shrink-0"
                  aria-label="Custom label"
                />
              ) : (
                <LucideReact.Lock
                  size={16}
                  className="text-gray-500 flex-shrink-0"
                  aria-label="Read-only label"
                />
              )}
              <span className="text-sm text-gray-700 truncate">{label.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
