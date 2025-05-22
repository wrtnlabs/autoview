import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposActionsVariables {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      variables: AutoViewInputSubTypes.actions_variable[];
    };
  }
  /**
   * @title Actions Variable
   */
  export type actions_variable = {
    /**
     * The name of the variable.
     */
    name: string;
    /**
     * The value of the variable.
     */
    value: string;
    /**
     * The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
     */
    created_at: string;
    /**
     * The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
     */
    updated_at: string;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposActionsVariables.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, variables } = value;

  // Mask variable values for confidentiality, showing only last 4 characters
  const maskValue = (val: string): string => {
    if (val.length <= 4) return "•".repeat(val.length);
    const maskedLength = val.length - 4;
    return "•".repeat(maskedLength) + val.slice(-4);
  };

  // Format ISO date strings into "Mon DD, YYYY, HH:MM AM/PM"
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    const datePart = date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const timePart = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${datePart}, ${timePart}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4 text-lg font-semibold text-gray-800">
        <LucideReact.List size={20} className="mr-2 text-gray-500" />
        <span>Variables ({total_count})</span>
      </div>

      {/* No-data state */}
      {total_count === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mx-auto mb-2" />
          <p>No variables available.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {variables.map((variable) => (
            <li
              key={variable.name}
              className="p-4 bg-gray-50 rounded-md flex flex-col sm:flex-row sm:justify-between"
            >
              {/* Name & Masked Value */}
              <div className="flex-1">
                <div className="font-medium text-gray-900 truncate">
                  {variable.name}
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  <span className="font-mono bg-gray-200 px-1 rounded">
                    {maskValue(variable.value)}
                  </span>
                </div>
              </div>

              {/* Timestamps */}
              <div className="mt-3 sm:mt-0 sm:ml-6 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  <span>Created: {formatDate(variable.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.RefreshCw size={16} className="mr-1" />
                  <span>Updated: {formatDate(variable.updated_at)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
