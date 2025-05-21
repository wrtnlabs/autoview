import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.ssh_signing_key[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const keyCount = value.length;
  // Helper to format dates uniformly
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  // Helper to mask long SSH keys for concise display
  const maskKey = (key: string) => {
    if (key.length <= 50) return key;
    const prefix = key.slice(0, 20);
    const suffix = key.slice(-20);
    return `${prefix}…${suffix}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        SSH Signing Keys ({keyCount})
      </h2>
      {keyCount === 0 ? (
        <p className="text-gray-600">No SSH signing keys available.</p>
      ) : (
        <ul className="space-y-4">
          {value.map((item) => {
            const created = formatDate(item.created_at);
            const displayKey = maskKey(item.key);
            return (
              <li
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Created: {created}</p>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-6 flex-shrink-0">
                  <code className="block text-xs font-mono text-gray-700 bg-gray-100 py-1 px-2 rounded overflow-x-auto">
                    {displayKey}
                  </code>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
