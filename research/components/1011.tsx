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
  // Handle empty state when no keys are provided
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span className="text-lg">No SSH Signing Keys available.</span>
      </div>
    );
  }

  // Render a list of SSH signing keys with title, truncated key, and creation date
  return (
    <div className="space-y-4">
      {value.map((item) => {
        // Format creation date
        const createdDate = new Date(item.created_at);
        const formattedDate = createdDate.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        // Prepare a truncated version of the key to avoid layout issues
        const rawKey = item.key.trim();
        const truncatedKey =
          rawKey.length > 40
            ? `${rawKey.slice(0, 20)}…${rawKey.slice(-20)}`
            : rawKey;

        return (
          <div
            key={item.id}
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Title */}
            <div className="flex items-center space-x-2">
              <LucideReact.Key size={20} className="text-gray-500" />
              <span className="font-medium text-gray-900 truncate">
                {item.title}
              </span>
            </div>

            {/* Key & Date */}
            <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-gray-600 text-sm">
              <div className="flex items-center">
                <LucideReact.Code size={16} className="text-gray-400 mr-1" />
                <span className="font-mono truncate">{truncatedKey}</span>
              </div>
              <div className="flex items-center mt-1 sm:mt-0">
                <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
                <time dateTime={item.created_at}>{formattedDate}</time>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
