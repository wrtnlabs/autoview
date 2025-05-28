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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.map((prop) => {
        // Derive display values
        const defaultVal =
          prop.default_value == null
            ? "None"
            : Array.isArray(prop.default_value)
            ? prop.default_value.join(", ")
            : prop.default_value;
        const editableBy = prop.values_editable_by
          ? prop.values_editable_by === "org_actors"
            ? "Org Actors"
            : "Org & Repo Actors"
          : "Not Specified";
        const source = prop.source_type
          ? prop.source_type.charAt(0).toUpperCase() + prop.source_type.slice(1)
          : "Not Specified";

        return (
          <div
            key={prop.property_name}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {prop.property_name}
              </h3>
              <span className="text-xs font-medium uppercase px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {prop.value_type.replace("_", " ")}
              </span>
            </div>

            {prop.description && (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {prop.description}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                {prop.required ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                    aria-label="Required"
                  />
                ) : (
                  <LucideReact.XCircle
                    className="text-red-500"
                    size={16}
                    aria-label="Optional"
                  />
                )}
                <span>{prop.required ? "Required" : "Optional"}</span>
              </div>

              <div className="flex items-center gap-1">
                <LucideReact.Info
                  className="text-gray-400"
                  size={16}
                  aria-label="Default Value"
                />
                <span>Default: {defaultVal}</span>
              </div>

              {prop.allowed_values && (
                <div className="flex items-center gap-1">
                  <LucideReact.Tag
                    className="text-gray-400"
                    size={16}
                    aria-label="Allowed Values"
                  />
                  <span>Allowed: {prop.allowed_values.length}</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <LucideReact.Layers
                  className="text-gray-400"
                  size={16}
                  aria-label="Source Type"
                />
                <span>Source: {source}</span>
              </div>

              <div className="flex items-center gap-1">
                <LucideReact.Edit3
                  className="text-gray-400"
                  size={16}
                  aria-label="Editable By"
                />
                <span>Editable: {editableBy}</span>
              </div>

              {prop.url && (
                <div className="flex items-center gap-1 w-full">
                  <LucideReact.Link
                    className="text-gray-400"
                    size={16}
                    aria-label="API URL"
                  />
                  <a
                    href={prop.url}
                    className="truncate hover:underline text-blue-600 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {prop.url}
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
