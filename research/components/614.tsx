import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsVariables.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const variables = value.variables;
  const formattedTotalCount = totalCount.toLocaleString();

  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return (
      date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }) +
      ', ' +
      date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const content = (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Actions Variables</h2>
        <p className="text-sm text-gray-600">Total: {formattedTotalCount}</p>
      </div>
      <div className="space-y-4">
        {variables.length === 0 ? (
          <p className="text-center text-gray-500">No variables available.</p>
        ) : (
          variables.map((variable, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-lg font-medium text-gray-800">
                  {variable.name}
                </span>
                <span className="mt-2 sm:mt-0 text-sm font-mono text-gray-700 truncate">
                  {variable.value}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap text-xs text-gray-500 space-x-4">
                <div>Created: {formatDate(variable.created_at)}</div>
                <div>Updated: {formatDate(variable.updated_at)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // 3. Return the React element.
  return content;
}
