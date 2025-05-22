import { tags } from "typia";
import React from "react";
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
  const isEnabled = value.enabled === true;
  const createdAt = value.created_at ? new Date(value.created_at) : null;
  const updatedAt = value.updated_at ? new Date(value.updated_at) : null;
  const createdAtDisplay = createdAt
    ? createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : 'N/A';
  const updatedAtDisplay = updatedAt
    ? updatedAt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : 'N/A';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm">
      {/* Header with title and status badge */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tag Protection Pattern</h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            isEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {isEnabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>

      {/* Pattern display */}
      <pre className="font-mono text-sm bg-gray-100 p-3 rounded-md break-all overflow-hidden line-clamp-2 mb-4">
        {value.pattern}
      </pre>

      {/* Metadata */}
      <div className="text-sm text-gray-600 space-y-1">
        <div>
          <span className="font-medium text-gray-700">Created:</span> {createdAtDisplay}
        </div>
        <div>
          <span className="font-medium text-gray-700">Updated:</span> {updatedAtDisplay}
        </div>
      </div>
    </div>
  );
}
