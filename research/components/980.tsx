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
export type AutoViewInput = AutoViewInputSubTypes.ssh_signing_key[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const keys: AutoViewInputSubTypes.ssh_signing_key[] = value;

  // 2. Handle empty state
  if (keys.length === 0) {
    return (
      <div className="flex flex-col items-center text-gray-400 py-8">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No SSH signing keys available</span>
      </div>
    );
  }

  // 3. Render list of SSH signing keys
  return (
    <ul role="list" className="space-y-4">
      {keys.map((item) => {
        const { id, title, key, created_at } = item;
        // Format created date
        const formattedDate = new Date(created_at).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        // Truncate long key for preview
        const keyPreview =
          key.length > 30 ? `${key.slice(0, 15)}…${key.slice(-10)}` : key;

        return (
          <li
            key={id}
            className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between"
          >
            {/* Title with icon */}
            <div className="flex items-center space-x-2">
              <LucideReact.Key className="text-indigo-500" size={20} />
              <h3 className="text-gray-900 font-medium truncate">{title}</h3>
            </div>

            {/* Metadata: creation date and ID */}
            <div className="mt-2 md:mt-0 flex flex-col md:flex-row md:items-center md:space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <LucideReact.Calendar className="mr-1" size={16} />
                <time dateTime={created_at}>{formattedDate}</time>
              </div>
              <div className="flex items-center mt-1 md:mt-0">
                <LucideReact.Hash className="mr-1" size={16} />
                <span>#{id}</span>
              </div>
            </div>

            {/* Key preview */}
            <div className="mt-3 md:mt-0 text-sm font-mono text-gray-700 truncate">
              {keyPreview}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
