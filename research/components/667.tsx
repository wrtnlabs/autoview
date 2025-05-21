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
  // Since AutoViewInput is defined as an empty object, there are no properties to display.
  // We render a friendly placeholder indicating that there's no data to show.

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md flex items-center justify-center">
      <p className="text-gray-500 text-sm">No data available to display.</p>
    </div>
  );
}
