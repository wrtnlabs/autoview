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
  // 1. Determine if the provided object has any enumerable properties
  const isEmpty = Object.keys(value).length === 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  if (isEmpty) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex items-center justify-center">
        <span className="text-gray-500 italic">No data available.</span>
      </div>
    );
  }

  // In the unlikely event the object has properties (future schema changes), render a simple key/value list
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-2">
      {Object.entries(value).map(([key, val]) => (
        <div key={key} className="flex justify-between">
          <span className="font-medium text-gray-700">{key}</span>
          <span className="text-gray-900">{String(val)}</span>
        </div>
      ))}
    </div>
  );
}
