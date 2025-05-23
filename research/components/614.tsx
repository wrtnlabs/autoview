import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsVariables {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            variables: AutoViewInputSubTypes.actions_variable[];
        }
    }
    /**
     * @title Actions Variable
    */
    export interface actions_variable {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsVariables.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const formattedTotal = totalCount.toLocaleString();
  const variables = value.variables;
  const hasVariables = variables.length > 0;

  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Code className="text-gray-500 mr-2" size={20} />
        <h2 className="text-xl font-semibold text-gray-800">
          Action Variables ({formattedTotal})
        </h2>
      </div>

      {hasVariables ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {variables.map((variable) => (
            <div
              key={variable.name}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-2">
                <LucideReact.Tag className="text-blue-500 mr-2" size={18} />
                <h3 className="text-md font-medium text-gray-900 truncate">
                  {variable.name}
                </h3>
              </div>
              <div className="flex items-center mb-2">
                <LucideReact.Key className="text-gray-500 mr-2" size={16} />
                <span
                  className="text-sm text-gray-800 truncate"
                  title={variable.value}
                >
                  {variable.value}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <LucideReact.Calendar className="mr-1" size={14} />
                <span>Created {formatDate(variable.created_at)}</span>
              </div>
              {variable.updated_at !== variable.created_at && (
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <LucideReact.RefreshCw className="mr-1" size={14} />
                  <span>Updated {formatDate(variable.updated_at)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No variables found.</span>
        </div>
      )}
    </div>
  );
}
