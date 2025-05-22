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
  const typeLabels: Record<AutoViewInput['value_type'], string> = {
    string: 'String',
    single_select: 'Single Select',
    multi_select: 'Multi Select',
    true_false: 'True/False',
  };
  const valueTypeLabel = typeLabels[value.value_type];
  const sourceLabel = value.source_type
    ? value.source_type.charAt(0).toUpperCase() + value.source_type.slice(1)
    : 'N/A';
  const isRequired = value.required ? 'Yes' : 'No';
  const defaultValue =
    value.default_value != null
      ? Array.isArray(value.default_value)
        ? value.default_value.join(', ')
        : value.default_value
      : '—';
  const description = value.description ?? '—';

  const allowed = Array.isArray(value.allowed_values) ? value.allowed_values : [];
  const previewAllowed = allowed.slice(0, 3);
  const remainingCount = allowed.length - previewAllowed.length;

  const editableByMap: Record<NonNullable<AutoViewInput['values_editable_by']>, string> = {
    org_actors: 'Organization Actors',
    org_and_repo_actors: 'Organization & Repository Actors',
  };
  const editableBy = value.values_editable_by
    ? editableByMap[value.values_editable_by]
    : '—';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 truncate">
        {value.property_name}
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mb-4">
        <div>
          <span className="font-medium">Type:</span> {valueTypeLabel}
        </div>
        <div>
          <span className="font-medium">Source:</span> {sourceLabel}
        </div>
        <div>
          <span className="font-medium">Required:</span> {isRequired}
        </div>
        <div>
          <span className="font-medium">Editable By:</span> {editableBy}
        </div>
        <div className="col-span-2">
          <span className="font-medium">Default Value:</span> {defaultValue}
        </div>
      </div>
      {value.description != null && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>
      )}
      {allowed.length > 0 && (
        <div>
          <span className="font-medium text-gray-700 text-sm">
            Allowed Values:
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {previewAllowed.map((val, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs truncate"
              >
                {val}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                +{remainingCount} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
