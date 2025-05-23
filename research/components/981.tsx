import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A public SSH key used to sign Git commits
     *
     * @title SSH Signing Key
    */
    export interface ssh_signing_key {
        key: string;
        id: number & tags.Type<"int32">;
        title: string;
        created_at: string & tags.Format<"date-time">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.ssh_signing_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const created = new Date(value.created_at);
  const formattedDate = created.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = created.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
  const displayDateTime = `${formattedDate}, ${formattedTime}`;

  // Truncate the SSH key for a compact display
  const maxPreviewLength = 80;
  const truncatedKey =
    value.key.length > maxPreviewLength
      ? `${value.key.slice(0, 40)}…${value.key.slice(-40)}`
      : value.key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full p-4 bg-white rounded-lg shadow-md">
      {/* Title */}
      <div className="flex items-center space-x-2">
        <LucideReact.Key className="text-gray-500" size={20} />
        <h3 className="text-lg font-semibold text-gray-900 truncate">{value.title}</h3>
      </div>

      {/* Creation date */}
      <div className="mt-1 flex items-center text-sm text-gray-500">
        <LucideReact.Calendar className="mr-1" size={16} />
        <span>{displayDateTime}</span>
      </div>

      {/* SSH Key Preview */}
      <pre className="mt-3 p-3 bg-gray-50 rounded font-mono text-sm text-gray-700 overflow-x-auto">
        {truncatedKey}
      </pre>
    </div>
  );
}
