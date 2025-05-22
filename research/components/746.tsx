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
  const createdAt = new Date(value.created_at);
  const updatedAt = new Date(value.updated_at);
  const formattedCreatedAt = createdAt.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const formattedUpdatedAt = updatedAt.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 max-w-full">
      {/* Variable Name */}
      <div className="flex items-center mb-3">
        <LucideReact.FileText className="text-gray-500 mr-2" size={18} />
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h3>
      </div>

      {/* Variable Value */}
      <div className="flex items-start bg-gray-50 p-3 rounded mb-4">
        <LucideReact.Code className="text-gray-500 mr-2 mt-1" size={16} />
        <pre className="text-sm text-gray-800 whitespace-pre-wrap break-all">
          {value.value}
        </pre>
      </div>

      {/* Timestamps */}
      <div className="flex flex-wrap text-sm text-gray-500 gap-x-6">
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-1" size={16} />
          <span>Created: {formattedCreatedAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.RefreshCcw className="mr-1" size={16} />
          <span>Updated: {formattedUpdatedAt}</span>
        </div>
      </div>
    </div>
  );
}
