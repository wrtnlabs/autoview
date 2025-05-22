import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Custom property defined on an organization
     *
     * @title Organization Custom Property
    */
    export type custom_property = {
        /**
         * The name of the property
        */
        property_name: string;
        /**
         * The URL that can be used to fetch, update, or delete info about this property via the API.
        */
        url?: string;
        /**
         * The source type of the property
        */
        source_type?: "organization" | "enterprise";
        /**
         * The type of the value for the property
        */
        value_type: "string" | "single_select" | "multi_select" | "true_false";
        /**
         * Whether the property is required.
        */
        required?: boolean;
        /**
         * Default value of the property
        */
        default_value?: string | string[] | null;
        /**
         * Short description of the property
        */
        description?: string | null;
        /**
         * An ordered list of the allowed values of the property.
         * The property can have up to 200 allowed values.
        */
        allowed_values?: ((string & tags.MaxLength<75>)[] & tags.MaxItems<200>) | null;
        /**
         * Who can edit the values of the property
        */
        values_editable_by?: "org_actors" | "org_and_repo_actors" | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.custom_property[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const typeLabels: Record<AutoViewInputSubTypes.custom_property["value_type"], string> = {
    string: "Text",
    single_select: "Single Select",
    multi_select: "Multi Select",
    true_false: "True / False",
  };
  const sourceLabels: Record<NonNullable<AutoViewInputSubTypes.custom_property["source_type"]>, string> = {
    organization: "Organization",
    enterprise: "Enterprise",
  };
  const editableByLabels: Record<NonNullable<AutoViewInputSubTypes.custom_property["values_editable_by"]>, string> = {
    org_actors: "Organization Actors",
    org_and_repo_actors: "Organization & Repository Actors",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.map((prop) => (
        <div key={prop.property_name} className="bg-white rounded-lg shadow p-4 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {prop.property_name}
          </h3>
          {prop.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
              {prop.description}
            </p>
          )}
          <div className="flex flex-wrap mt-3 gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
              {typeLabels[prop.value_type]}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                prop.required
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {prop.required ? "Required" : "Optional"}
            </span>
            {prop.source_type && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                {sourceLabels[prop.source_type]} Level
              </span>
            )}
            {prop.values_editable_by && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                {editableByLabels[prop.values_editable_by]}
              </span>
            )}
          </div>
          {prop.default_value != null && (
            <div className="mt-3 text-sm">
              <span className="font-medium text-gray-700">Default:</span>{" "}
              <span className="text-gray-800">
                {Array.isArray(prop.default_value)
                  ? prop.default_value.join(", ")
                  : prop.default_value || "None"}
              </span>
            </div>
          )}
          {prop.allowed_values && prop.allowed_values.length > 0 && (
            <div className="mt-3">
              <span className="text-sm font-medium text-gray-700">
                Allowed Values:
              </span>
              <div className="flex flex-wrap mt-1 gap-2">
                {prop.allowed_values.slice(0, 5).map((val) => (
                  <span
                    key={val}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-800"
                  >
                    {val}
                  </span>
                ))}
                {prop.allowed_values.length > 5 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-800">
                    +{prop.allowed_values.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
