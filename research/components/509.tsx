import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * List of custom property values for a repository
     *
     * @title Organization Repository Custom Property Values
    */
    export interface org_repo_custom_property_values {
        repository_id: number & tags.Type<"int32">;
        repository_name: string;
        repository_full_name: string;
        /**
         * List of custom property names and associated values
        */
        properties: AutoViewInputSubTypes.custom_property_value[];
    }
    /**
     * Custom property name and associated value
     *
     * @title Custom Property Value
    */
    export interface custom_property_value {
        /**
         * The name of the property
        */
        property_name: string;
        /**
         * The value assigned to the property
        */
        value: string | string[] | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.org_repo_custom_property_values[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derive list of repositories
  const repos = value;

  // Empty state
  if (repos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No repositories available</p>
      </div>
    );
  }

  // Main render
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {repos.map((repo) => (
        <div key={repo.repository_id} className="p-4 bg-white rounded-lg shadow">
          {/* Repository Header */}
          <div className="flex items-center mb-2">
            <LucideReact.GitBranch className="text-gray-600 mr-2" size={20} />
            <h3 className="text-lg font-medium text-gray-800 truncate">{repo.repository_name}</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4 truncate">{repo.repository_full_name}</p>

          {/* Custom Properties */}
          <div className="text-sm text-gray-700 space-y-2">
            {repo.properties.map((prop) => (
              <div key={prop.property_name} className="flex items-start">
                <LucideReact.Tag size={16} className="text-indigo-500 mr-2 mt-1" />
                <div className="flex-1">
                  <span className="font-semibold text-gray-800">{prop.property_name}:</span>{" "}
                  {prop.value === null ? (
                    <span className="text-gray-500">N/A</span>
                  ) : Array.isArray(prop.value) ? (
                    <span>{prop.value.join(", ")}</span>
                  ) : (
                    <span>{prop.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Properties Count */}
          <div className="mt-4 text-xs text-gray-400">
            {repo.properties.length} {repo.properties.length === 1 ? "property" : "properties"}
          </div>
        </div>
      ))}
    </div>
  );
}
