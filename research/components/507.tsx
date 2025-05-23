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
  type BadgeConfig = { label: string; icon: JSX.Element; color: string };

  const typeConfig: Record<AutoViewInput["value_type"], BadgeConfig> = {
    string: {
      label: "String",
      icon: <LucideReact.Type size={16} className="text-gray-500" />,
      color: "bg-gray-100 text-gray-800",
    },
    single_select: {
      label: "Single Select",
      icon: <LucideReact.List size={16} className="text-blue-500" />,
      color: "bg-blue-100 text-blue-800",
    },
    multi_select: {
      label: "Multi Select",
      icon: <LucideReact.Layers size={16} className="text-purple-500" />,
      color: "bg-purple-100 text-purple-800",
    },
    true_false: {
      label: "True / False",
      icon: <LucideReact.ToggleLeft size={16} className="text-green-500" />,
      color: "bg-green-100 text-green-800",
    },
  };
  const selectedType = typeConfig[value.value_type];

  const sourceConfig: Record<NonNullable<AutoViewInput["source_type"]>, BadgeConfig> = {
    organization: {
      label: "Organization",
      icon: <LucideReact.Building size={16} className="text-indigo-500" />,
      color: "bg-indigo-100 text-indigo-800",
    },
    enterprise: {
      label: "Enterprise",
      icon: <LucideReact.Briefcase size={16} className="text-yellow-500" />,
      color: "bg-yellow-100 text-yellow-800",
    },
  };

  const isRequired = !!value.required;
  const requiredText = isRequired ? "Required" : "Optional";
  const requiredIcon = isRequired
    ? <LucideReact.CheckCircle size={16} className="text-green-500" />
    : <LucideReact.MinusCircle size={16} className="text-gray-400" />;

  const defaultDisplay =
    value.default_value === null || value.default_value === undefined
      ? "None"
      : Array.isArray(value.default_value)
      ? value.default_value.join(", ")
      : value.default_value;

  const allowed = Array.isArray(value.allowed_values) ? value.allowed_values : [];
  const maxBadges = 5;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <LucideReact.Settings size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.property_name}
        </h2>
      </div>

      {/* Badges: type, source, required */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${selectedType.color}`}
        >
          {selectedType.icon}
          <span className="ml-1">{selectedType.label}</span>
        </span>

        {value.source_type && (
          <span
            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${
              sourceConfig[value.source_type].color
            }`}
          >
            {sourceConfig[value.source_type].icon}
            <span className="ml-1">
              {sourceConfig[value.source_type].label}
            </span>
          </span>
        )}

        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-800">
          {requiredIcon}
          <span className="ml-1">{requiredText}</span>
        </span>
      </div>

      {/* Description */}
      {value.description && (
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Default Value */}
      <div className="mt-4">
        <dt className="text-sm font-medium text-gray-500">Default Value</dt>
        <dd className="mt-1 text-sm text-gray-800">{defaultDisplay}</dd>
      </div>

      {/* Allowed Values */}
      {allowed.length > 0 && (
        <div className="mt-4">
          <dt className="text-sm font-medium text-gray-500">Allowed Values</dt>
          <dd className="mt-2 flex flex-wrap gap-1">
            {allowed.slice(0, maxBadges).map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
              >
                {item}
              </span>
            ))}
            {allowed.length > maxBadges && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                +{allowed.length - maxBadges} more
              </span>
            )}
          </dd>
        </div>
      )}

      {/* Editable By */}
      {value.values_editable_by && (
        <div className="mt-4 flex items-center text-sm text-gray-700">
          <LucideReact.Pencil size={16} className="text-gray-500" />
          <span className="ml-2">
            Editable by:{" "}
            {value.values_editable_by === "org_actors"
              ? "Organization Actors"
              : "Organization & Repo Actors"}
          </span>
        </div>
      )}
    </div>
  );
}
