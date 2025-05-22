import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposEnvironmentsVariables {
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
  AutoViewInputSubTypes.IApiReposEnvironmentsVariables.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const { total_count, variables } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.ListOrdered size={20} className="text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-700">
          Environment Variables
          <span className="text-gray-500 ml-1">({total_count})</span>
        </h2>
      </div>

      {variables.length > 0 ? (
        <ul className="space-y-4">
          {variables.map((variable, idx) => (
            <li key={`var-${idx}`} className="p-3 bg-gray-50 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <LucideReact.Tag size={16} className="text-blue-500 mr-2" />
                  <span className="font-medium text-gray-800">
                    {variable.name}
                  </span>
                </div>
              </div>

              <div className="mt-2 flex items-center text-gray-600">
                <LucideReact.Key size={16} className="mr-2" />
                <span className="text-sm truncate">{variable.value}</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <LucideReact.Calendar size={14} className="mr-1" />
                  <span>Created: {formatDate(variable.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Calendar size={14} className="mr-1" />
                  <span>Updated: {formatDate(variable.updated_at)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No variables available.</span>
        </div>
      )}
    </div>
  );
}
