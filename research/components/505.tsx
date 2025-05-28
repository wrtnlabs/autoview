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
export type AutoViewInput = AutoViewInputSubTypes.custom_property[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const properties = value;
  const total = properties.length;

  const valueTypeLabels: Record<AutoViewInputSubTypes.custom_property["value_type"], string> = {
    string: "Text",
    single_select: "Single Select",
    multi_select: "Multiple Select",
    true_false: "True / False",
  };
  const sourceTypeLabels: Record<NonNullable<AutoViewInputSubTypes.custom_property["source_type"]>, string> = {
    organization: "Organization",
    enterprise: "Enterprise",
  };
  const editableByLabels: Record<NonNullable<AutoViewInputSubTypes.custom_property["values_editable_by"]>, string> = {
    org_actors: "Organization Actors",
    org_and_repo_actors: "Organization & Repository Actors",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No custom properties available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Custom Properties</h2>
        <span className="text-sm text-gray-600">{total} items</span>
      </div>
      <ul className="divide-y divide-gray-200">
        {properties.map((prop, idx) => {
          // Format default value
          let defaultDisplay: string | null = null;
          if (prop.default_value !== undefined && prop.default_value !== null) {
            if (Array.isArray(prop.default_value)) {
              defaultDisplay = prop.default_value.join(", ");
            } else {
              defaultDisplay = prop.default_value;
            }
          }

          const typeLabel = valueTypeLabels[prop.value_type];
          const sourceLabel = prop.source_type ? sourceTypeLabels[prop.source_type] : null;
          const editableLabel = prop.values_editable_by
            ? editableByLabels[prop.values_editable_by]
            : null;

          return (
            <li
              key={idx}
              className="py-4 flex flex-col md:flex-row md:items-start md:justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-gray-900">
                    {prop.property_name}
                  </span>
                  {prop.required ? (
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={16}
                      aria-label="Required"
                    />
                  ) : (
                    <LucideReact.XCircle
                      className="text-gray-400"
                      size={16}
                      aria-label="Optional"
                    />
                  )}
                </div>
                {prop.description && (
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {prop.description}
                  </p>
                )}
              </div>
              <div className="mt-3 md:mt-0 md:ml-6 flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <LucideReact.Code size={16} className="mr-1" aria-label="Value Type" />
                  {typeLabel}
                </div>
                {defaultDisplay && (
                  <div className="flex items-center">
                    <LucideReact.Info size={16} className="mr-1" aria-label="Default Value" />
                    <span className="font-medium text-gray-700">{defaultDisplay}</span>
                  </div>
                )}
                {prop.allowed_values && prop.allowed_values.length > 0 && (
                  <div className="flex items-center">
                    <LucideReact.List
                      size={16}
                      className="mr-1"
                      aria-label="Allowed Values Count"
                    />
                    <span className="font-medium text-gray-700">
                      {prop.allowed_values.length} allowed
                    </span>
                  </div>
                )}
                {sourceLabel && (
                  <div className="flex items-center">
                    <LucideReact.Link size={16} className="mr-1" aria-label="Source Type" />
                    {sourceLabel}
                  </div>
                )}
                {editableLabel && (
                  <div className="flex items-center">
                    <LucideReact.User size={16} className="mr-1" aria-label="Editable By" />
                    <span className="font-medium text-gray-700">{editableLabel}</span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
}
