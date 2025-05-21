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
export type AutoViewInput = AutoViewInputSubTypes.custom_property;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const valueTypeLabels: Record<AutoViewInput["value_type"], string> = {
    string: "String",
    single_select: "Single Select",
    multi_select: "Multi Select",
    true_false: "True / False",
  };
  const sourceLabels: Record<NonNullable<AutoViewInput["source_type"]>, string> = {
    organization: "Organization",
    enterprise: "Enterprise",
  };
  const editableLabels: Record<NonNullable<AutoViewInput["values_editable_by"]>, string> = {
    org_actors: "Organization Actors",
    org_and_repo_actors: "Organization & Repository Actors",
  };
  const defaultValueDisplay = Array.isArray(value.default_value)
    ? value.default_value.join(", ")
    : value.default_value ?? "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Property Name */}
      <h3 className="text-lg font-semibold text-gray-800 truncate">
        {value.property_name}
      </h3>

      {/* Description */}
      {value.description && (
        <p className="mt-1 text-gray-600 line-clamp-3">{value.description}</p>
      )}

      {/* Key Attributes */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <span className="font-medium text-gray-700">Type:</span>{" "}
          <span className="text-gray-900">
            {valueTypeLabels[value.value_type]}
          </span>
        </div>
        {value.source_type && (
          <div>
            <span className="font-medium text-gray-700">Source:</span>{" "}
            <span className="text-gray-900">
              {sourceLabels[value.source_type]}
            </span>
          </div>
        )}
        <div>
          <span className="font-medium text-gray-700">Required:</span>{" "}
          {value.required ? (
            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
              Required
            </span>
          ) : (
            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">
              Optional
            </span>
          )}
        </div>
        {value.default_value !== undefined && value.default_value !== null && (
          <div>
            <span className="font-medium text-gray-700">Default:</span>{" "}
            <span className="text-gray-900">{defaultValueDisplay}</span>
          </div>
        )}
        {value.values_editable_by && (
          <div>
            <span className="font-medium text-gray-700">Editable by:</span>{" "}
            <span className="text-gray-900">
              {editableLabels[value.values_editable_by]}
            </span>
          </div>
        )}
      </div>

      {/* Allowed Values */}
      {value.allowed_values && value.allowed_values.length > 0 && (
        <div className="mt-4">
          <span className="font-medium text-gray-700 text-sm">
            Allowed Values:
          </span>
          <div className="mt-1 flex flex-wrap gap-2 max-h-32 overflow-auto">
            {value.allowed_values.map((val, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-sm bg-gray-100 text-gray-800 rounded"
              >
                {val}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
