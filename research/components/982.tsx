import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A public SSH key used to sign Git commits
   *
   * @title SSH Signing Key
   */
  export type ssh_signing_key = {
    key: string;
    id: number & tags.Type<"int32">;
    title: string;
    created_at: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.ssh_signing_key;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Title Section */}
      <div className="flex items-center space-x-2">
        <LucideReact.Key className="text-gray-500" size={20} />
        <h2 className="text-lg font-medium text-gray-800 truncate">
          {value.title}
        </h2>
      </div>

      {/* Creation Date */}
      <div className="flex items-center mt-1 text-gray-500 text-sm">
        <LucideReact.Calendar className="mr-1" size={16} />
        <span>{formattedDate}</span>
      </div>

      {/* Public Key Display */}
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-medium">
          Public SSH Key
        </label>
        <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200 font-mono text-xs text-gray-800 overflow-x-auto">
          {value.key}
        </div>
      </div>
    </div>
  );
}
