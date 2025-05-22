import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposActionsRunnersLabels.PutResponse;

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation
  const { total_count, labels } = value;
  const readOnlyCount = labels.filter(
    (label) => label.type === "read-only",
  ).length;
  const customCount = labels.filter((label) => label.type === "custom").length;

  // 2. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Tag
          size={20}
          className="text-gray-600"
          aria-label="Labels"
        />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Runner Labels
        </h2>
        <span className="ml-auto text-sm text-gray-500">
          {total_count} total
        </span>
      </div>

      {/* Empty state */}
      {labels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2">No labels available</span>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <LucideReact.Lock
                size={16}
                className="text-blue-500"
                aria-label="Read-only"
              />
              <span>{readOnlyCount} read-only</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Tag
                size={16}
                className="text-green-500"
                aria-label="Custom"
              />
              <span>{customCount} custom</span>
            </div>
          </div>

          {/* Labels grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {labels.map((label, idx) => (
              <li
                key={`${label.name}-${idx}`}
                className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded"
              >
                {label.type === "read-only" ? (
                  <LucideReact.Lock
                    size={16}
                    className="text-blue-500"
                    aria-label="Read-only"
                  />
                ) : (
                  <LucideReact.Tag
                    size={16}
                    className="text-green-500"
                    aria-label="Custom"
                  />
                )}
                <span
                  className="text-sm text-gray-800 truncate"
                  title={label.name}
                >
                  {label.name}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
