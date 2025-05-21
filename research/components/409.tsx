import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersLabels._DeleteResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const labels = value.labels ?? [];
  const totalLabels = value.total_count;
  const readOnlyCount = labels.filter(label => label.type === "read-only").length;
  const customCount = labels.filter(label => label.type === "custom").length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const renderBadge = (type?: string) => {
    const isReadOnly = type === "read-only";
    const baseStyles = "ml-4 px-2 py-0.5 text-xs font-medium rounded";
    const colorStyles = isReadOnly
      ? "bg-gray-200 text-gray-800"
      : "bg-blue-100 text-blue-800";
    return (
      <span className={`${baseStyles} ${colorStyles}`}>
        {isReadOnly ? "Read-only" : "Custom"}
      </span>
    );
  };

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Runner Labels</h2>

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="font-medium text-gray-900 mr-1">{totalLabels}</span>
          Total Labels
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-900 mr-1">{readOnlyCount}</span>
          Read-only
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-900 mr-1">{customCount}</span>
          Custom
        </div>
      </div>

      {labels.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {labels.map((label, idx) => (
            <li key={idx} className="flex justify-between items-center py-2">
              <span className="flex-1 text-sm text-gray-900 truncate">{label.name}</span>
              {renderBadge(label.type)}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-gray-500">No labels available.</div>
      )}
    </div>
  );
}
