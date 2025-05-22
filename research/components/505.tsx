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
  // Group properties by source_type for clarity
  const grouped = value.reduce(
    (acc, prop) => {
      const key = prop.source_type ?? "organization";
      if (!acc[key]) acc[key] = [];
      acc[key].push(prop);
      return acc;
    },
    {} as Record<string, AutoViewInputSubTypes.custom_property[]>,
  );

  // Icon mapper based on value_type
  const ValueTypeIcon = ({
    type,
  }: {
    type: AutoViewInputSubTypes.custom_property["value_type"];
  }) => {
    switch (type) {
      case "string":
        return <LucideReact.Tag className="text-blue-500" size={16} />;
      case "single_select":
        return <LucideReact.List className="text-green-500" size={16} />;
      case "multi_select":
        return <LucideReact.List className="text-indigo-500" size={16} />;
      case "true_false":
        return (
          <LucideReact.ToggleRight className="text-purple-500" size={16} />
        );
      default:
        return null;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([sourceType, props]) => (
        <section key={sourceType}>
          <h2 className="text-lg font-semibold capitalize mb-4">
            {sourceType === "organization" ? "Organization" : "Enterprise"}{" "}
            Properties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {props.map((prop) => {
              // Prepare derived values
              const defaultVal = Array.isArray(prop.default_value)
                ? prop.default_value.join(", ")
                : prop.default_value != null
                  ? prop.default_value
                  : "—";
              const allowed = prop.allowed_values ?? [];
              const hasAllowed = Array.isArray(allowed) && allowed.length > 0;
              const preview = hasAllowed ? allowed.slice(0, 3) : [];

              return (
                <div
                  key={prop.property_name}
                  className="p-4 bg-white rounded-lg shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800 truncate">
                      {prop.property_name}
                    </h3>
                    <ValueTypeIcon type={prop.value_type} />
                  </div>
                  {prop.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                      {prop.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 text-sm mb-2">
                    <span className="font-semibold text-gray-700">
                      Required:
                    </span>
                    {prop.required ? (
                      <span className="text-red-600">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Default:</span> {defaultVal}
                  </div>
                  {hasAllowed && (
                    <div className="mb-2">
                      <span className="block text-sm font-semibold text-gray-700 mb-1">
                        Allowed Values:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {preview.map((val) => (
                          <span
                            key={val}
                            className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 truncate max-w-xs"
                          >
                            {val}
                          </span>
                        ))}
                        {allowed.length > preview.length && (
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                            +{allowed.length - preview.length} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {prop.values_editable_by && (
                    <div className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">Editable by:</span>{" "}
                      <span className="capitalize">
                        {prop.values_editable_by.replace(/_/g, " & ")}
                      </span>
                    </div>
                  )}
                  {prop.url && (
                    <div className="flex items-center text-sm text-gray-500 mt-2 truncate">
                      <LucideReact.Link
                        size={16}
                        className="mr-1 flex-shrink-0"
                      />
                      <span className="truncate">{prop.url}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
