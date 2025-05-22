import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Custom property name and associated value
   *
   * @title Custom Property Value
   */
  export type custom_property_value = {
    /**
     * The name of the property
     */
    property_name: string;
    /**
     * The value assigned to the property
     */
    value: string | string[] | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.custom_property_value[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation & derived constants
  // Nothing to derive beyond organizing list entries.

  // 2. Early empty-state handling
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <LucideReact.AlertCircle size={36} className="text-gray-400 mb-2" />
        <span className="text-gray-500">No properties available</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <LucideReact.Tag size={20} className="text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-700">Properties</h2>
      </div>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {value.map((prop, idx) => {
          const { property_name, value: val } = prop;
          return (
            <div key={idx} className="flex flex-col">
              <dt className="text-xs font-medium text-gray-500 truncate">
                {property_name}
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {val === null && <span className="text-gray-400">—</span>}
                {typeof val === "string" && val !== "" && (
                  <span className="block truncate line-clamp-2">{val}</span>
                )}
                {typeof val === "string" && val === "" && (
                  <span className="text-gray-400 italic">Empty</span>
                )}
                {Array.isArray(val) && val.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {val.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
                {Array.isArray(val) && val.length === 0 && (
                  <span className="text-gray-400">—</span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
