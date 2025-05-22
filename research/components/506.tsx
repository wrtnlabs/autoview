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
export type AutoViewInput = AutoViewInputSubTypes.custom_property[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Map each value_type to a corresponding icon for quick visual reference.
  const typeIconMap: Record<
    AutoViewInputSubTypes.custom_property["value_type"],
    JSX.Element
  > = {
    string: <LucideReact.FileText size={16} className="text-gray-500" />,
    single_select: <LucideReact.List size={16} className="text-gray-500" />,
    multi_select: <LucideReact.List size={16} className="text-gray-500" />,
    true_false: <LucideReact.ToggleLeft size={16} className="text-gray-500" />,
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {value.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span>No custom properties available</span>
        </div>
      ) : (
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {value.map((prop, idx) => {
            const hasAllowed =
              Array.isArray(prop.allowed_values) &&
              prop.allowed_values.length > 0;
            const defaultVal = prop.default_value;

            return (
              <li
                key={idx}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                {/* Header: Property Name + Type Icon */}
                <div className="flex items-center justify-between">
                  <h3
                    className="text-lg font-semibold text-gray-800 truncate"
                    title={prop.property_name}
                  >
                    {prop.property_name}
                  </h3>
                  {typeIconMap[prop.value_type]}
                </div>

                {/* Description (truncated) */}
                {prop.description && (
                  <p className="mt-1 text-gray-600 text-sm line-clamp-3">
                    {prop.description}
                  </p>
                )}

                {/* Metadata Badges */}
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                  {prop.source_type && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      <LucideReact.Building
                        size={14}
                        className="text-gray-500"
                      />
                      {prop.source_type}
                    </span>
                  )}

                  <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    {prop.required ? (
                      <LucideReact.CheckCircle
                        size={14}
                        className="text-green-500"
                      />
                    ) : (
                      <LucideReact.XCircle size={14} className="text-red-500" />
                    )}
                    {prop.required ? "Required" : "Optional"}
                  </span>

                  {defaultVal != null && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      <LucideReact.Edit size={14} className="text-gray-500" />
                      Default:
                      {Array.isArray(defaultVal)
                        ? defaultVal.join(", ")
                        : defaultVal}
                    </span>
                  )}

                  {hasAllowed && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      <LucideReact.List size={14} className="text-gray-500" />
                      {prop.allowed_values!.length} allowed
                    </span>
                  )}

                  {prop.values_editable_by && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      <LucideReact.Users size={14} className="text-gray-500" />
                      {prop.values_editable_by === "org_actors"
                        ? "Org Actors"
                        : "Org & Repo Actors"}
                    </span>
                  )}
                </div>

                {/* URL (if present) */}
                {prop.url && (
                  <div className="mt-auto pt-3">
                    <div
                      className="text-xs text-blue-500 truncate"
                      title={prop.url}
                    >
                      {prop.url}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
