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
  
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  
  const truncateKey = (fullKey: string): string => {
    if (fullKey.length <= 40) return fullKey;
    const prefix = fullKey.slice(0, 20);
    const suffix = fullKey.slice(-10);
    return `${prefix}…${suffix}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          SSH Signing Keys ({keyCount})
        </h2>
      </header>
      <ul className="space-y-4">
        {value.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-md font-medium text-gray-900 truncate">
                {item.title}
              </h3>
              <time className="mt-1 sm:mt-0 text-sm text-gray-500">
                {formatDate(item.created_at)}
              </time>
            </div>
            <p className="mt-2 text-sm font-mono text-gray-700 truncate">
              {truncateKey(item.key)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
