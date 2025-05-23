import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsVariables {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            variables: AutoViewInputSubTypes.organization_actions_variable[];
        }
    }
    /**
     * Organization variable for GitHub Actions.
     *
     * @title Actions Variable for an Organization
    */
    export interface organization_actions_variable {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsVariables.GetResponse;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const { total_count, variables } = value;

  // 1. Data transformation helpers
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  const maskValue = (val: string): string => {
    if (val.length <= 8) return '••••••••';
    return `${val.slice(0, 4)}…${val.slice(-4)}`;
  };

  const getVisibilityIcon = (
    visibility: AutoViewInputSubTypes.organization_actions_variable['visibility']
  ): React.ReactNode => {
    switch (visibility) {
      case 'all':
        return <LucideReact.Users size={16} className="text-blue-500" aria-label="All repositories" />;
      case 'private':
        return <LucideReact.Lock size={16} className="text-red-500" aria-label="Private" />;
      case 'selected':
        return <LucideReact.List size={16} className="text-yellow-500" aria-label="Selected repos" />;
      default:
        return null;
    }
  };

  // 2. Visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Key size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Actions Variables ({total_count})</h2>
      </div>

      {variables.length === 0 ? (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No variables found</span>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {variables.map((v, idx) => (
            <div key={idx} className="py-4 flex flex-col md:flex-row md:justify-between">
              <div className="flex items-center space-x-2">
                <LucideReact.FileText size={18} className="text-gray-500" />
                <span className="font-medium text-gray-900">{v.name}</span>
                <span className="ml-4 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                  {maskValue(v.value)}
                </span>
              </div>
              <div className="mt-2 md:mt-0 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center space-x-1">
                  {getVisibilityIcon(v.visibility)}
                  <span className="capitalize">{v.visibility}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.Calendar size={16} />
                  <span>Created: {formatDate(v.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.RotateCw size={16} />
                  <span>Updated: {formatDate(v.updated_at)}</span>
                </div>
                {v.selected_repositories_url && (
                  <div className="flex items-center space-x-1 truncate">
                    <LucideReact.Link size={16} />
                    <span className="truncate">{v.selected_repositories_url}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
