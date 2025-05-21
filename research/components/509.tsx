import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.org_repo_custom_property_values[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const repos = Array.isArray(value) ? value : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (repos.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No repositories found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => {
        const { repository_id, repository_full_name, properties } = repo;

        // Filter out properties without meaningful values
        const displayedProperties = properties.filter(
          (p) =>
            p.value != null &&
            (!(Array.isArray(p.value)) || (Array.isArray(p.value) && p.value.length > 0)) &&
            !(typeof p.value === "string" && p.value.trim() === "")
        );

        return (
          <div
            key={repository_id}
            className="p-4 bg-white rounded-lg shadow border border-gray-200 flex flex-col"
          >
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {repository_full_name}
            </h3>

            {displayedProperties.length > 0 ? (
              <ul className="mt-3 space-y-2 flex-1">
                {displayedProperties.map((p) => {
                  const raw = p.value!;
                  const displayValue = Array.isArray(raw)
                    ? raw.join(", ")
                    : String(raw);

                  return (
                    <li
                      key={p.property_name}
                      className="flex justify-between items-start"
                    >
                      <span className="text-gray-600">{p.property_name}</span>
                      <span className="text-gray-900 font-medium truncate ml-2">
                        {displayValue}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 text-gray-500 text-sm">
                No custom properties.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
