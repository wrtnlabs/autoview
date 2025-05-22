import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsRunnersLabels {
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels.PutResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  // Sort labels alphabetically for consistent display
  const sortedLabels = [...labels].sort((a, b) => a.name.localeCompare(b.name));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const hasLabels = sortedLabels.length > 0;

  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center mb-3">
        <LucideReact.Tag className="text-gray-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Labels ({total_count})
        </h2>
      </div>
      {hasLabels ? (
        <div className="flex flex-wrap gap-2">
          {sortedLabels.map((label, idx) => {
            const isReadOnly = label.type === "read-only";
            const Icon = isReadOnly ? LucideReact.Lock : LucideReact.Tag;
            const iconColor = isReadOnly ? "text-blue-500" : "text-green-500";

            return (
              <span
                key={idx}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
              >
                <Icon
                  className={iconColor}
                  size={14}
                  aria-label={isReadOnly ? "Read-only label" : "Custom label"}
                />
                <span className="text-sm text-gray-800 truncate">
                  {label.name}
                </span>
              </span>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle className="mr-2" size={24} />
          <span className="text-sm">No labels available.</span>
        </div>
      )}
    </div>
  );
}
