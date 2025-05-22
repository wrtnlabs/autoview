import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sortedLabels = React.useMemo(
    () => [...value.labels].sort((a, b) => a.name.localeCompare(b.name)),
    [value.labels],
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-3 text-gray-700">
        <LucideReact.Tag size={20} className="mr-2 text-gray-600" />
        <h2 className="text-lg font-semibold">
          Runner Labels ({value.total_count})
        </h2>
      </div>

      {sortedLabels.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {sortedLabels.map((label, index) => {
            const isReadOnly = label.type === "read-only";
            const bgColor = isReadOnly ? "bg-gray-100" : "bg-blue-100";
            const textColor = isReadOnly ? "text-gray-800" : "text-blue-800";
            const Icon = isReadOnly ? LucideReact.Lock : LucideReact.Tag;

            return (
              <div
                key={index}
                className={`${bgColor} ${textColor} inline-flex items-center px-3 py-1 rounded-full text-sm max-w-xs`}
              >
                <Icon size={14} className="mr-1" />
                <span className="truncate">{label.name}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2">No labels available</p>
        </div>
      )}
    </div>
  );
}
