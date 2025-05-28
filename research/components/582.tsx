import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsOrganizationVariables {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsOrganizationVariables.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, variables } = value;

  // Mask sensitive values, showing only the last 4 characters
  const maskValue = (val: string): string => {
    if (val.length <= 8) return "•".repeat(val.length);
    return `••••${val.slice(-4)}`;
  };

  // Format ISO dates as "Mon DD, YYYY"
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Key className="text-gray-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">
          Organization Variables
        </h2>
        <span className="ml-auto text-sm text-gray-600">
          Total: {total_count}
        </span>
      </div>

      {variables.length === 0 ? (
        <div className="flex items-center justify-center py-6 text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          No variables found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Value
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Created
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {variables.map((v) => (
                <tr key={v.name}>
                  <td className="px-4 py-2 text-sm text-gray-800">{v.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {maskValue(v.value)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 flex items-center">
                    <LucideReact.Calendar
                      className="text-gray-400 mr-1"
                      size={16}
                    />
                    <span>{formatDate(v.created_at)}</span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 flex items-center">
                    <LucideReact.Calendar
                      className="text-gray-400 mr-1"
                      size={16}
                    />
                    <span>{formatDate(v.updated_at)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
