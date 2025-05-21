import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposEnvironmentsVariables.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, variables } = value;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-screen-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900">
        Environment Variables ({total_count})
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {variables.map((variable) => (
          <div
            key={variable.name}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-800 truncate">
              {variable.name}
            </h3>
            <p className="mt-2 text-gray-700 text-sm break-words line-clamp-2">
              {variable.value}
            </p>
            <div className="mt-3 text-xs text-gray-500 space-y-1">
              <p>Created: {formatDate(variable.created_at)}</p>
              <p>Updated: {formatDate(variable.updated_at)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
