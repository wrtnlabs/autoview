import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Tag protection
     *
     * @title Tag protection
    */
    export interface tag_protection {
        id?: number & tags.Type<"int32">;
        created_at?: string;
        updated_at?: string;
        enabled?: boolean;
        pattern: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.tag_protection;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isEnabled: boolean = value.enabled ?? false;
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleString('default', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : 'N/A';
  const createdAt = formatDate(value.created_at);
  const updatedAt = formatDate(value.updated_at);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Tag Protection</h3>
        <div className="flex items-center">
          {isEnabled ? (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ) : (
            <LucideReact.XCircle className="text-red-500" size={16} />
          )}
          <span className="ml-1 text-sm font-medium text-gray-700">
            {isEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm text-gray-700">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-2">Created: {createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-2">Updated: {updatedAt}</span>
        </div>
        <div className="flex items-start">
          <span className="font-medium">Pattern:</span>
          <code className="ml-2 block bg-gray-100 text-gray-900 px-1 py-0.5 rounded break-all">
            {value.pattern}
          </code>
        </div>
      </div>
    </div>
  );
}
