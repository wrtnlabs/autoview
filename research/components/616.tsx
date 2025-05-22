import LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  const formattedCreated = new Date(value.created_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
  const formattedUpdated = new Date(value.updated_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      {/* Variable Name */}
      <div className="flex items-center mb-3">
        <LucideReact.Tag className="text-indigo-500" size={20} />
        <h2
          className="ml-2 text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
      </div>

      {/* Variable Value */}
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-500">Value</div>
        <div className="mt-1 px-2 py-1 bg-gray-50 text-sm text-gray-900 rounded break-all">
          {value.value}
        </div>
      </div>

      {/* Timestamps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span className="ml-1">Created:</span>
          <span className="ml-1 font-medium text-gray-800">
            {formattedCreated}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.Edit2 className="text-gray-400" size={16} />
          <span className="ml-1">Updated:</span>
          <span className="ml-1 font-medium text-gray-800">
            {formattedUpdated}
          </span>
        </div>
      </div>
    </div>
  );
}
