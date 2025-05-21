import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * An object without any properties.
     *
     * @title Empty Object
    */
    export type empty_object = {};
}
export type AutoViewInput = AutoViewInputSubTypes.empty_object;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Since AutoViewInput is an empty object type, we treat any object with no keys as "no data".
  const entries = Object.entries(value);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
        <span className="text-gray-500 text-sm">No data available</span>
      </div>
    );
  }

  // If in future the schema gains properties, render them as a key/value table:
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full text-left">
        <tbody>
          {entries.map(([key, val]) => {
            // Convert camelCase or snake_case to a human-readable label
            const displayKey = key
              .replace(/_/g, ' ')
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase());
            // Stringify values or show primitives directly
            const displayValue =
              val === null || val === undefined
                ? '-'
                : typeof val === 'object'
                ? JSON.stringify(val)
                : String(val);
            return (
              <tr key={key} className="border-b last:border-none">
                <th className="py-2 pr-4 text-gray-600 align-top whitespace-nowrap">
                  {displayKey}
                </th>
                <td className="py-2 text-gray-800 truncate">{displayValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
