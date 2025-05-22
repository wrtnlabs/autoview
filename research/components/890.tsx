import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Tag protection
   *
   * @title Tag protection
   */
  export type tag_protection = {
    id?: number & tags.Type<"int32">;
    created_at?: string;
    updated_at?: string;
    enabled?: boolean;
    pattern: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.tag_protection;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : undefined;
  const formattedUpdatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : undefined;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      {/* Pattern */}
      <div className="flex items-center mb-2 space-x-2">
        <LucideReact.Tag size={20} className="text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">Pattern</h3>
      </div>
      <div className="bg-gray-50 p-2 rounded font-mono text-sm text-gray-800 break-all overflow-x-auto">
        {value.pattern}
      </div>

      {/* Status */}
      <div className="flex items-center mt-3 space-x-2">
        {value.enabled ? (
          <LucideReact.CheckCircle size={16} className="text-green-500" />
        ) : (
          <LucideReact.XCircle size={16} className="text-red-500" />
        )}
        <span className="text-sm font-medium text-gray-700">
          {value.enabled ? "Enabled" : "Disabled"}
        </span>
      </div>

      {/* Timestamps */}
      {(formattedCreatedAt || formattedUpdatedAt) && (
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
          {formattedCreatedAt && (
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar size={16} />
              <time dateTime={value.created_at!}>{formattedCreatedAt}</time>
            </div>
          )}
          {formattedUpdatedAt && (
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar size={16} />
              <time dateTime={value.updated_at!}>{formattedUpdatedAt}</time>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
