import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposActionsOrganizationVariables {
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
  AutoViewInputSubTypes.IApiReposActionsOrganizationVariables.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, variables } = value;
  const headerLabel =
    total_count === 1 ? "1 Variable" : `${total_count} Variables`;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const maskValue = (val: string): string => {
    const visible = Math.min(val.length, 8);
    const dots = "•".repeat(visible);
    return val.length > visible ? `${dots} (${val.length} chars)` : dots;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4 text-gray-700">
        <LucideReact.Settings size={20} className="mr-2" />
        <h2 className="text-lg font-semibold">{headerLabel}</h2>
      </div>

      {total_count === 0 ? (
        <div className="flex flex-col items-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <p className="mt-2">No variables available</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {variables.map((variable) => (
            <li
              key={variable.name}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                  <LucideReact.Key size={16} className="text-gray-500" />
                  <span className="font-medium text-gray-800 truncate">
                    {variable.name}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.Lock size={16} className="text-gray-400" />
                  <span className="text-gray-600 font-mono">
                    {maskValue(variable.value)}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap text-sm text-gray-500 gap-4">
                <div className="flex items-center space-x-1">
                  <LucideReact.Calendar size={14} className="text-gray-400" />
                  <span>Created: {formatDate(variable.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.Calendar size={14} className="text-gray-400" />
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
