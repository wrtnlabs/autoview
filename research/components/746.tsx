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
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const formattedUpdated = updatedDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-4 max-w-sm">
      {/* Variable Name */}
      <div className="flex items-center text-gray-800">
        <LucideReact.Tag size={18} className="mr-2 text-gray-500" />
        <span className="text-lg font-semibold truncate">{value.name}</span>
      </div>

      {/* Variable Value */}
      <div>
        <div className="flex items-center text-gray-800 mb-1">
          <LucideReact.Code size={16} className="mr-2 text-gray-500" />
          <span className="text-sm font-medium">Value</span>
        </div>
        <div className="font-mono text-sm bg-gray-50 text-gray-700 px-2 py-1 rounded overflow-x-auto">
          {value.value}
        </div>
      </div>

      {/* Created At */}
      <div className="flex items-center text-sm text-gray-500">
        <LucideReact.Calendar size={16} className="mr-2" />
        <span>Created: {formattedCreated}</span>
      </div>

      {/* Updated At */}
      <div className="flex items-center text-sm text-gray-500">
        <LucideReact.RefreshCw size={16} className="mr-2" />
        <span>Updated: {formattedUpdated}</span>
      </div>
    </div>
  );
}
