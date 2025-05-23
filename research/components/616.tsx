import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * @title Actions Variable
    */
    export interface actions_variable {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.actions_variable;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);

  const formattedCreated = createdDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedUpdated = updatedDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <LucideReact.Tag size={20} className="text-gray-500" />
        <span className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </span>
      </div>
      <div className="bg-gray-100 rounded-md p-3 font-mono text-sm text-gray-700 break-words">
        {value.value}
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-6 text-gray-500 text-sm">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <time dateTime={value.created_at}>
            Created: {formattedCreated}
          </time>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.RefreshCcw size={16} className="text-gray-400" />
          <time dateTime={value.updated_at}>
            Updated: {formattedUpdated}
          </time>
        </div>
      </div>
    </div>
  );
  // 3. Return the React element.
}
