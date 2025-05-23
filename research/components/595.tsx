import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunnersLabels {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunnersLabels.PutResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sortedLabels = [...value.labels].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const readOnlyLabels = sortedLabels.filter(
    (label) => label.type === "read-only",
  );
  const customLabels = sortedLabels.filter(
    (label) => label.type !== "read-only",
  );
  const total = value.total_count;
  const plural = total === 1 ? "" : "s";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <LucideReact.Tag size={20} className="text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Runner Labels
        </h2>
      </div>
      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
        <LucideReact.ListOrdered size={16} className="mr-1" />
        <span className="text-sm">
          {total} label{plural}
        </span>
      </div>

      {customLabels.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <LucideReact.Tag size={16} className="text-blue-500" />
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Custom Labels ({customLabels.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {customLabels.map((label) => (
              <span
                key={label.id ?? label.name}
                className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {label.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {readOnlyLabels.length > 0 && (
        <section className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <LucideReact.Lock size={16} className="text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Read-Only Labels ({readOnlyLabels.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {readOnlyLabels.map((label) => (
              <span
                key={label.id ?? label.name}
                className="inline-block bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {label.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
