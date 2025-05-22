import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels.PostResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const labels = Array.isArray(value.labels) ? value.labels : [];
  const totalCount =
    typeof value.total_count === "number" ? value.total_count : labels.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  //    (e.g., return <div className="p-4 bg-white rounded-lg shadow-md">...</div>;)
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header: Total Labels */}
      <div className="flex items-center mb-4 text-gray-700">
        <LucideReact.Tag size={20} className="text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold">
          {totalCount} {totalCount === 1 ? "Label" : "Labels"}
        </h2>
      </div>

      {/* Label List or Empty State */}
      {labels.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {labels.map((label, index) => {
            const isReadOnly = label.type === "read-only";
            return (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800 max-w-xs truncate"
                title={label.name}
              >
                {isReadOnly ? (
                  <LucideReact.Lock size={14} className="text-gray-500" />
                ) : (
                  <LucideReact.Tag size={14} className="text-blue-500" />
                )}
                <span className="truncate">{label.name}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span className="text-sm">No labels available</span>
        </div>
      )}
    </div>
  );
}
