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
  const formatDefaultValue = (dv?: string | string[] | null): string => {
    if (dv == null) return "None";
    return Array.isArray(dv) ? dv.join(", ") : dv;
  };

  const renderBadges = (items?: string[] | null, limit = 5) => {
    if (!items || items.length === 0)
      return <span className="text-sm text-gray-500">None</span>;
    const visible = items.slice(0, limit);
    return (
      <>
        {visible.map((item, idx) => (
          <span
            key={idx}
            className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded mr-1 mb-1"
          >
            {item}
          </span>
        ))}
        {items.length > limit && (
          <span className="inline-block text-gray-500 text-xs">
            +{items.length - limit} more
          </span>
        )}
      </>
    );
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((prop, idx) => (
        <div
          key={idx}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex flex-wrap items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900 mr-2 truncate">
              {prop.property_name}
            </h3>
            {prop.required && (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                Required
              </span>
            )}
          </div>

          {prop.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {prop.description}
            </p>
          )}

          <div className="mb-2 flex flex-wrap">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-1 px-2 py-0.5 rounded">
              Type: {prop.value_type.replace("_", " ")}
            </span>
            {prop.source_type && (
              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 mb-1 px-2 py-0.5 rounded">
                Source: {capitalize(prop.source_type)}
              </span>
            )}
            {prop.values_editable_by && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 mb-1 px-2 py-0.5 rounded">
                Editable By: {prop.values_editable_by.replace(/_/g, " ")}
              </span>
            )}
          </div>

          <div className="mb-2 text-sm text-gray-700">
            <span className="font-medium">Default:</span>{" "}
            {formatDefaultValue(prop.default_value)}
          </div>

          <div>
            <span className="font-medium text-gray-800 text-sm">
              Allowed Values:
            </span>
            <div className="mt-1 flex flex-wrap">
              {renderBadges(prop.allowed_values)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
