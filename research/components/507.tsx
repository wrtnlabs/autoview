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
  const {
    property_name,
    description,
    value_type,
    required,
    default_value,
    allowed_values,
    source_type,
    url,
    values_editable_by,
  } = value;

  // Human-readable labels for types, sources, and edit permissions
  const typeLabels: Record<
    AutoViewInputSubTypes.custom_property["value_type"],
    string
  > = {
    string: "Text",
    single_select: "Single Select",
    multi_select: "Multi Select",
    true_false: "True / False",
  };
  const typeLabel = typeLabels[value_type] || value_type;

  const sourceLabels: Record<
    NonNullable<AutoViewInputSubTypes.custom_property["source_type"]>,
    string
  > = {
    organization: "Organization",
    enterprise: "Enterprise",
  };
  const sourceLabel = source_type ? sourceLabels[source_type] : null;

  const editByLabels: Record<
    NonNullable<AutoViewInputSubTypes.custom_property["values_editable_by"]>,
    string
  > = {
    org_actors: "Org Actors",
    org_and_repo_actors: "Org & Repo Actors",
  };
  const editByLabel = values_editable_by
    ? editByLabels[values_editable_by]
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
      {/* Header: Property Name and Required Badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {property_name}
        </h3>
        {required && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium uppercase px-2 py-0.5 rounded">
            <LucideReact.CheckCircle size={14} />
            Required
          </span>
        )}
      </div>

      {/* Metadata Row */}
      <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
        {sourceLabel && (
          <div className="flex items-center gap-1">
            {source_type === "organization" ? (
              <LucideReact.Users size={16} className="text-gray-500" />
            ) : (
              <LucideReact.Building size={16} className="text-gray-500" />
            )}
            <span>{sourceLabel}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LucideReact.Tag size={16} className="text-gray-500" />
          <span>{typeLabel}</span>
        </div>
        {editByLabel && (
          <div className="flex items-center gap-1">
            <LucideReact.User2 size={16} className="text-gray-500" />
            <span>{editByLabel}</span>
          </div>
        )}
        {url && (
          <div className="flex items-center gap-1 break-all text-xs">
            <LucideReact.Link size={16} className="text-gray-500" />
            <span className="truncate">{url}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">{description}</p>
      )}

      {/* Default Value */}
      {default_value != null && (
        <div className="mt-3 flex items-start gap-2">
          <span className="text-sm font-medium text-gray-700">Default:</span>
          {Array.isArray(default_value) ? (
            <div className="flex flex-wrap gap-2">
              {default_value.map((val, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {val}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-sm text-gray-600">{default_value}</span>
          )}
        </div>
      )}

      {/* Allowed Values */}
      {allowed_values && allowed_values.length > 0 && (
        <div className="mt-4">
          <span className="text-sm font-medium text-gray-700">
            Allowed Values:
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {allowed_values.map((val, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
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
