import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * @title Actions Variable
    */
    export type actions_variable = {
        /**
         * The name of the variable.
        */
        name: string;
        /**
         * The value of the variable.
        */
        value: string;
        /**
         * The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.actions_variable;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { name, value: varValue, created_at, updated_at } = value;

  // Mask or truncate the variable value for readability and security
  const displayValue =
    varValue.length > 10
      ? `${varValue.slice(0, 4)}…${varValue.slice(-4)}`
      : varValue;

  // Format ISO dates into a human-readable medium format
  const createdDate = new Date(created_at);
  const updatedDate = new Date(updated_at);
  const formattedCreated = createdDate.toLocaleString("default", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const formattedUpdated = updatedDate.toLocaleString("default", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  // 3. Return the React element.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>

      <div className="mt-3 space-y-2 text-sm text-gray-600">
        <div className="flex">
          <span className="font-medium text-gray-700">Value:</span>
          <code className="ml-2 font-mono text-gray-800 break-all">{displayValue}</code>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700">Created:</span>
          <span className="ml-2">{formattedCreated}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700">Updated:</span>
          <span className="ml-2">{formattedUpdated}</span>
        </div>
      </div>
    </div>
  );
}
