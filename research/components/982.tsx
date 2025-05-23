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
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center gap-2">
        <LucideReact.Key size={20} className="text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {value.title}
        </h3>
      </div>
      <div className="mt-1 flex items-center text-sm text-gray-600 gap-1">
        <LucideReact.Calendar size={16} />
        <span>{formattedDate}</span>
      </div>
      <div className="mt-4 text-xs font-mono text-gray-800 bg-gray-100 p-2 rounded-lg overflow-x-auto whitespace-pre break-all max-h-40">
        {value.key}
      </div>
    </div>
  );
  // 3. Return the React element.
  //    All displayed data is appropriately filtered, transformed, and formatted.
}
