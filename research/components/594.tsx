import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposActionsRunnersLabels {
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
  AutoViewInputSubTypes.IApiReposActionsRunnersLabels.PostResponse;

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformations and derived values
  const labels = value.labels ?? [];
  const readOnlyCount = labels.filter(
    (label) => label.type === "read-only",
  ).length;
  const customCount = labels.filter((label) => label.type === "custom").length;

  // 2. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-3">
        <LucideReact.Tag size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Runner Labels</h2>
      </div>

      {/* Summary */}
      <div className="flex items-center text-sm text-gray-600 space-x-6 mb-4">
        <div className="flex items-center">
          <LucideReact.Hash
            size={16}
            className="mr-1"
            aria-label="Total labels"
          />
          <span>Total: {value.total_count}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Lock
            size={16}
            className="mr-1 text-red-500"
            aria-label="Read-only labels"
          />
          <span>Read-only: {readOnlyCount}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Tag
            size={16}
            className="mr-1 text-blue-500"
            aria-label="Custom labels"
          />
          <span>Custom: {customCount}</span>
        </div>
      </div>

      {/* Labels List or Empty State */}
      {labels.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {labels.map((label) => (
            <li
              key={label.id ?? label.name}
              className={`
                flex items-center truncate px-3 py-1 text-sm font-medium rounded-full
                ${label.type === "read-only" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}
              `}
            >
              {label.type === "read-only" ? (
                <LucideReact.Lock
                  size={14}
                  className="mr-1"
                  aria-label="Read-only label"
                />
              ) : (
                <LucideReact.Tag
                  size={14}
                  className="mr-1"
                  aria-label="Custom label"
                />
              )}
              <span className="truncate">{label.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-gray-400">
          <LucideReact.AlertCircle size={24} aria-label="No labels" />
          <span className="mt-2">No labels available</span>
        </div>
      )}
    </div>
  );
}
