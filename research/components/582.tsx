import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsOrganizationVariables.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Sort variables by creation date (newest first)
  const sortedVariables = value.variables
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  // Date formatting utility
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Organization Variables ({value.total_count})
      </h2>
      <ul className="space-y-4">
        {sortedVariables.map((variable) => (
          <li
            key={variable.name}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {variable.name}
              </h3>
              <span className="mt-1 sm:mt-0 text-sm text-gray-500">
                Created: {formatDate(variable.created_at)}
              </span>
            </div>
            <p className="mt-2 text-gray-700 truncate">{variable.value}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
              <span>Updated: {formatDate(variable.updated_at)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
