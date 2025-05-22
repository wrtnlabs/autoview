import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    allowed_values?:
      | ((string & tags.MaxLength<75>)[] & tags.MaxItems<200>)
      | null;
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
  const typeLabel = (() => {
    switch (value.value_type) {
      case "string":
        return "String";
      case "single_select":
        return "Single Select";
      case "multi_select":
        return "Multi Select";
      case "true_false":
        return "True / False";
      default:
        return value.value_type;
    }
  })();

  const sourceLabel = value.source_type
    ? value.source_type === "organization"
      ? "Organization"
      : "Enterprise"
    : "—";

  const requiredLabel = value.required ? (
    <div className="flex items-center text-green-600">
      <LucideReact.CheckCircle size={16} className="mr-1" />
      Required
    </div>
  ) : (
    <div className="flex items-center text-gray-500">
      <LucideReact.XCircle size={16} className="mr-1" />
      Optional
    </div>
  );

  const defaultLabel =
    value.default_value === null || value.default_value === undefined
      ? "None"
      : Array.isArray(value.default_value)
        ? value.default_value.join(", ")
        : value.default_value;

  const editableByLabel = (() => {
    switch (value.values_editable_by) {
      case "org_actors":
        return "Organization actors";
      case "org_and_repo_actors":
        return "Org & repository actors";
      default:
        return "—";
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2">
        <LucideReact.Tag className="text-blue-500" size={20} />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.property_name}
        </h2>
      </div>

      {/* Description */}
      {value.description ? (
        <p className="mt-2 text-gray-700 text-sm line-clamp-3">
          {value.description}
        </p>
      ) : null}

      {/* Details */}
      <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <dt className="text-gray-500">Type</dt>
          <dd className="text-gray-900">{typeLabel}</dd>
        </div>

        <div>
          <dt className="text-gray-500">Source</dt>
          <dd className="text-gray-900">{sourceLabel}</dd>
        </div>

        <div>
          <dt className="text-gray-500">Requirement</dt>
          <dd>{requiredLabel}</dd>
        </div>

        <div>
          <dt className="text-gray-500">Default</dt>
          <dd className="text-gray-900">{defaultLabel}</dd>
        </div>

        <div>
          <dt className="text-gray-500">Editable by</dt>
          <dd className="text-gray-900">{editableByLabel}</dd>
        </div>

        {value.allowed_values && value.allowed_values.length > 0 ? (
          <div className="sm:col-span-2">
            <dt className="text-gray-500">Allowed values</dt>
            <dd>
              <div className="flex flex-wrap gap-1 mt-1">
                {value.allowed_values.slice(0, 5).map((val, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {val}
                  </span>
                ))}
                {value.allowed_values.length > 5 && (
                  <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
                    +{value.allowed_values.length - 5} more
                  </span>
                )}
              </div>
            </dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
