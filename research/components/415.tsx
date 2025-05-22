import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsVariables {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            variables: AutoViewInputSubTypes.organization_actions_variable[];
        };
    }
    /**
     * Organization variable for GitHub Actions.
     *
     * @title Actions Variable for an Organization
    */
    export type organization_actions_variable = {
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
        /**
         * Visibility of a variable
        */
        visibility: "all" | "private" | "selected";
        selected_repositories_url?: string & tags.Format<"uri">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsVariables.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.total_count;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const maskValue = (val: string): string => {
    if (val.length <= 8) return `${val.charAt(0)}••••${val.charAt(val.length - 1)}`;
    return `${val.slice(0, 4)}••••${val.slice(-4)}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Actions Variables</h2>
        <span className="text-sm text-gray-600">
          {total} {total === 1 ? "item" : "items"}
        </span>
      </div>
      <ul className="space-y-3">
        {value.variables.map((variable) => (
          <li
            key={variable.name}
            className="bg-gray-50 border border-gray-200 p-3 rounded-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {variable.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  variable.visibility === "all"
                    ? "bg-green-100 text-green-800"
                    : variable.visibility === "private"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {variable.visibility.charAt(0).toUpperCase() +
                  variable.visibility.slice(1)}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-700 font-mono truncate">
              {maskValue(variable.value)}
            </div>
            <div className="mt-2 flex flex-wrap text-xs text-gray-500 space-x-4">
              <time dateTime={variable.created_at}>
                Created {formatDate(variable.created_at)}
              </time>
              <time dateTime={variable.updated_at}>
                Updated {formatDate(variable.updated_at)}
              </time>
            </div>
            {variable.visibility === "selected" && variable.selected_repositories_url && (
              <div className="mt-2 text-xs text-gray-600">
                <span className="font-semibold">Repos:</span>{" "}
                <span className="truncate block">{variable.selected_repositories_url}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
