import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Custom property name and associated value
     *
     * @title Custom Property Value
    */
    export interface custom_property_value {
        /**
         * The name of the property
        */
        property_name: string;
        /**
         * The value assigned to the property
        */
        value: string | string[] | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.custom_property_value[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Sort properties alphabetically for consistent display
  const sortedProps = [...value].sort((a, b) =>
    a.property_name.localeCompare(b.property_name)
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {sortedProps.length === 0 ? (
        <div className="flex items-center justify-center text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <span className="ml-2">No properties available</span>
        </div>
      ) : (
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          {sortedProps.map((item) => {
            const { property_name, value: val } = item;
            return (
              <div key={property_name} className="flex flex-col">
                <dt className="text-sm font-medium text-gray-500">
                  {property_name}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {val === null ? (
                    <div className="flex items-center text-gray-400">
                      <LucideReact.AlertCircle size={16} />
                      <span className="ml-1">N/A</span>
                    </div>
                  ) : Array.isArray(val) ? (
                    <div className="flex flex-wrap gap-1">
                      {val.map((v, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          <LucideReact.Tag
                            size={12}
                            className="mr-1 text-blue-500"
                          />
                          <span className="truncate">{v}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LucideReact.FileText
                        size={16}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span className="ml-1 truncate">{val}</span>
                    </div>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}
