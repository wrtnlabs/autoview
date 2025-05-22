import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsVariables.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const maskedValue = (str: string): string => {
    if (str.length <= 6) return "*".repeat(str.length);
    const prefix = str.slice(0, 3);
    const suffix = str.slice(-3);
    return `${prefix}...${suffix}`;
  };

  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <LucideReact.List className="mr-2 text-gray-600" size={20} />
          Environment Variables ({value.total_count})
        </h2>
      </div>
      {value.variables.length === 0 ? (
        <div className="flex items-center justify-center text-gray-500 py-10">
          <LucideReact.AlertCircle className="mr-2" size={24} />
          No variables found.
        </div>
      ) : (
        <ul className="space-y-4">
          {value.variables.map((variable) => (
            <li
              key={variable.name}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center text-gray-800 font-medium truncate">
                  <LucideReact.Tag className="mr-1 text-gray-500" size={16} />
                  <span className="truncate">{variable.name}</span>
                </div>
                <div className="flex items-center text-gray-600 font-mono truncate">
                  <LucideReact.Key className="mr-1 text-gray-500" size={16} />
                  <span className="truncate">
                    {maskedValue(variable.value)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:items-end text-sm text-gray-500 space-y-1">
                <div className="flex items-center">
                  <LucideReact.Calendar className="mr-1" size={16} />
                  <time dateTime={variable.created_at}>
                    {formatDate(variable.created_at)}
                  </time>
                </div>
                <div className="flex items-center">
                  <LucideReact.Calendar className="mr-1" size={16} />
                  <time dateTime={variable.updated_at}>
                    {formatDate(variable.updated_at)}
                  </time>
                </div>
                <div className="flex items-center">
                  {variable.visibility === "all" && (
                    <LucideReact.Eye
                      className="mr-1 text-green-500"
                      size={16}
                    />
                  )}
                  {variable.visibility === "private" && (
                    <LucideReact.EyeOff
                      className="mr-1 text-red-500"
                      size={16}
                    />
                  )}
                  {variable.visibility === "selected" && (
                    <LucideReact.Users
                      className="mr-1 text-blue-500"
                      size={16}
                    />
                  )}
                  <span className="capitalize">{variable.visibility}</span>
                </div>
                {variable.visibility === "selected" &&
                  variable.selected_repositories_url && (
                    <div className="flex items-center truncate">
                      <LucideReact.Link
                        className="mr-1 text-gray-400"
                        size={16}
                      />
                      <span className="truncate">
                        {variable.selected_repositories_url}
                      </span>
                    </div>
                  )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
