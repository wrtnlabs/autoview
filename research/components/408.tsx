import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels._DeleteResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sortedLabels = Array.isArray(value.labels)
    ? [...value.labels].sort((a, b) => a.name.localeCompare(b.name))
    : [];
  const labelCount =
    typeof value.total_count === "number"
      ? value.total_count
      : sortedLabels.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const hasLabels = sortedLabels.length > 0;
  const labelItems = hasLabels
    ? sortedLabels.map((label, index) => {
        const key = label.id ?? label.name ?? index;
        const isReadOnly = label.type === "read-only";
        const pillClasses = `inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium ${
          isReadOnly
            ? "bg-gray-100 text-gray-800"
            : "bg-indigo-100 text-indigo-800"
        }`;
        const Icon = isReadOnly ? LucideReact.Lock : LucideReact.Tag;
        const iconLabel = isReadOnly ? "Read-only label" : "Custom label";

        return (
          <span key={key} className={pillClasses}>
            {label.name}
            <Icon size={12} className="ml-1" aria-label={iconLabel} />
          </span>
        );
      })
    : null;

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Tag size={20} className="text-indigo-500" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Runner Labels ({labelCount})
        </h2>
      </div>
      {hasLabels ? (
        <div className="flex flex-wrap gap-2">{labelItems}</div>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={20} className="mr-2" />
          <span>No labels available</span>
        </div>
      )}
    </div>
  );
}
