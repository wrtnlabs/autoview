import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * List of custom property values for a repository
   *
   * @title Organization Repository Custom Property Values
   */
  export type org_repo_custom_property_values = {
    repository_id: number & tags.Type<"int32">;
    repository_name: string;
    repository_full_name: string;
    /**
     * List of custom property names and associated values
     */
    properties: AutoViewInputSubTypes.custom_property_value[];
  };
  /**
   * Custom property name and associated value
   *
   * @title Custom Property Value
   */
  export type custom_property_value = {
    /**
     * The name of the property
     */
    property_name: string;
    /**
     * The value assigned to the property
     */
    value: string | string[] | null;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.org_repo_custom_property_values[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Format custom property values into badges, text, or placeholder.
  const formatValue = (val: string | string[] | null): React.ReactNode => {
    if (val === null) {
      return <span className="italic text-gray-400">N/A</span>;
    }
    if (Array.isArray(val)) {
      if (val.length === 0) {
        return <span className="italic text-gray-400">None</span>;
      }
      return (
        <div className="flex flex-wrap gap-1">
          {val.map((item, idx) => (
            <span
              key={idx}
              className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      );
    }
    return <span className="text-gray-700">{val}</span>;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Handle empty list state.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-lg">No repositories available</p>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="space-y-4">
      {value.map((repo) => (
        <div
          key={repo.repository_id}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-2">
            <LucideReact.GitBranch className="text-gray-500" size={20} />
            <h2 className="ml-2 text-lg font-semibold text-gray-800 truncate">
              {repo.repository_name}
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-3 truncate">
            {repo.repository_full_name}
          </p>
          {repo.properties && repo.properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {repo.properties.map((prop) => (
                <div
                  key={prop.property_name}
                  className="flex items-start space-x-2"
                >
                  <LucideReact.Tag
                    className="text-blue-500 flex-shrink-0"
                    size={16}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {prop.property_name}
                    </p>
                    <div className="mt-1 text-sm">
                      {formatValue(prop.value)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No custom properties</p>
          )}
        </div>
      ))}
    </div>
  );
}
