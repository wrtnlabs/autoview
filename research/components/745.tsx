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
  // 1. Derive keys and empty state
  const keys = Object.keys(value);
  const isEmpty = keys.length === 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Show a friendly message when there's no data; otherwise list all properties.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {isEmpty ? (
        <p className="text-center text-gray-500">No data to display.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {keys.map((key) => (
            <li key={key} className="py-2 flex justify-between">
              <span className="font-medium text-gray-700 truncate">{key}</span>
              <span className="text-gray-900 truncate">
                {String((value as any)[key])}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
