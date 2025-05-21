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
  const { name, value: rawValue, created_at, updated_at } = value;
  const displayValue = rawValue.length > 100 ? `${rawValue.slice(0, 100)}...` : rawValue;
  const createdDate = new Date(created_at);
  const updatedDate = new Date(updated_at);
  const formattedCreated = createdDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const formattedUpdated = updatedDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <header className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800 truncate" title={name}>
          {name}
        </h2>
      </header>
      <section className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Value</p>
        <pre
          className="text-sm text-gray-900 bg-gray-50 p-2 rounded overflow-x-auto whitespace-pre-wrap break-words line-clamp-3"
          title={rawValue}
        >
          {displayValue}
        </pre>
      </section>
      <footer className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500">
        <div className="mb-2 sm:mb-0">
          <p className="font-medium">Created</p>
          <p>{formattedCreated}</p>
        </div>
        <div>
          <p className="font-medium">Updated</p>
          <p>{formattedUpdated}</p>
        </div>
      </footer>
    </div>
  );
}
