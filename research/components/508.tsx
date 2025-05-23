import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Custom property defined on an organization
     *
     * @title Organization Custom Property
    */
    export interface custom_property {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.custom_property;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    property_name,
    description,
    value_type,
    required,
    default_value,
    allowed_values,
    values_editable_by,
    source_type,
  } = value;

  const typeMap: Record<AutoViewInputSubTypes.custom_property["value_type"], string> = {
    string: "String",
    single_select: "Single Select",
    multi_select: "Multiple Select",
    true_false: "True / False",
  };

  const sourceMap: Record<NonNullable<typeof source_type>, string> = {
    organization: "Organization",
    enterprise: "Enterprise",
  };

  const editableMap: Record<NonNullable<typeof values_editable_by>, string> = {
    org_actors: "Organization actors",
    org_and_repo_actors: "Organization & repository actors",
  };

  const defaultDisplay =
    default_value == null
      ? "None"
      : Array.isArray(default_value)
      ? default_value.join(", ")
      : default_value;

  const trimmedAllowed = Array.isArray(allowed_values) ? allowed_values : [];
  const previewAllowed = trimmedAllowed.slice(0, 4);
  const moreCount = trimmedAllowed.length > 4 ? trimmedAllowed.length - 4 : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{property_name}</h2>
        {required ? (
          <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
            Required
          </span>
        ) : (
          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
            Optional
          </span>
        )}
      </div>

      {description && (
        <p className="mb-3 text-gray-600 text-sm line-clamp-3">
          {description}
        </p>
      )}

      <dl className="grid grid-cols-1 gap-y-2 text-sm text-gray-700">
        <div className="flex items-center">
          <LucideReact.Tag size={16} className="text-gray-500 mr-2" />
          <dt className="font-medium mr-1">Type:</dt>
          <dd>{typeMap[value_type]}</dd>
        </div>

        {source_type && (
          <div className="flex items-center">
            <LucideReact.Building size={16} className="text-gray-500 mr-2" />
            <dt className="font-medium mr-1">Source:</dt>
            <dd>{sourceMap[source_type]}</dd>
          </div>
        )}

        <div className="flex items-center">
          <LucideReact.RotateCw size={16} className="text-gray-500 mr-2" />
          <dt className="font-medium mr-1">Default:</dt>
          <dd className="truncate">{defaultDisplay}</dd>
        </div>

        {previewAllowed.length > 0 && (
          <div className="flex items-start">
            <LucideReact.List size={16} className="text-gray-500 mr-2 mt-1" />
            <dt className="font-medium mr-1">Allowed:</dt>
            <dd className="flex flex-wrap gap-1">
              {previewAllowed.map((val, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
                >
                  {val}
                </span>
              ))}
              {moreCount > 0 && (
                <span className="text-gray-500 text-xs mt-0.5">
                  +{moreCount} more
                </span>
              )}
            </dd>
          </div>
        )}

        {values_editable_by && (
          <div className="flex items-center">
            <LucideReact.Users size={16} className="text-gray-500 mr-2" />
            <dt className="font-medium mr-1">Editable by:</dt>
            <dd>{editableMap[values_editable_by]}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
