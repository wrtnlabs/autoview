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
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <LucideReact.Key className="text-gray-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
      </div>
      <div className="mt-3 space-y-3">
        <div className="flex items-center text-gray-600 text-sm">
          <LucideReact.Calendar className="mr-1.5" size={16} />
          <span>{formattedDate}</span>
        </div>
        <div>
          <div className="flex items-center text-gray-600 text-sm mb-1">
            <LucideReact.FileText className="mr-1.5" size={16} />
            <span>Public Key</span>
          </div>
          <code className="block w-full px-3 py-2 text-sm font-mono text-gray-700 bg-gray-50 border border-gray-100 rounded break-all">
            {value.key}
          </code>
        </div>
      </div>
    </div>
  );
}
