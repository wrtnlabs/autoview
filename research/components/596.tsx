import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunnersLabels {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunnersLabels._DeleteResponse;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, labels } = value;
  const typeBadgeClasses: Record<string, string> = {
    'read-only': 'bg-indigo-100 text-indigo-800',
    'custom': 'bg-green-100 text-green-800',
  };
  const headerText = 'Deleted Runner Labels';
  const totalText = `${total_count} label${total_count === 1 ? '' : 's'} deleted`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const listContent = labels.length > 0 ? (
    <ul className="space-y-3">
      {labels.map((label) => {
        const key = label.id != null ? label.id : label.name;
        const badgeClass = label.type ? typeBadgeClasses[label.type] : 'bg-gray-100 text-gray-800';
        const badgeText =
          label.type === 'read-only'
            ? 'Read-Only'
            : label.type === 'custom'
            ? 'Custom'
            : '';
        return (
          <li
            key={key}
            className="flex items-center justify-between bg-gray-50 p-3 rounded overflow-hidden"
          >
            <span className="text-gray-800 font-medium truncate">{label.name}</span>
            {badgeText && (
              <span className={`ml-2 whitespace-nowrap px-2 py-0.5 text-xs font-medium rounded ${badgeClass}`}>
                {badgeText}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  ) : (
    <p className="text-gray-500">No labels found.</p>
  );

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{headerText}</h2>
      <p className="text-sm text-gray-600 mb-4">{totalText}</p>
      {listContent}
    </div>
  );
}
