import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.ssh_signing_key[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants and helpers
  const sortedKeys = React.useMemo(
    () =>
      [...value].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [value],
  );

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function truncateKey(key: string): string {
    if (key.length <= 24) return key;
    return `${key.slice(0, 12)}…${key.slice(-12)}`;
  }

  // 2. Empty state
  if (sortedKeys.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mr-2 text-gray-400" />
        <span>No SSH Signing Keys available</span>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <ul className="space-y-4">
      {sortedKeys.map((item) => (
        <li
          key={item.id}
          className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-start md:items-center">
            <LucideReact.Key
              size={20}
              className="text-indigo-500 mr-3 flex-shrink-0"
            />
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-gray-900">
                {item.title}
              </h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <LucideReact.Calendar
                  size={14}
                  className="mr-1 flex-shrink-0"
                />
                <span>{formatDate(item.created_at)}</span>
              </div>
            </div>
          </div>
          <code className="mt-3 md:mt-0 text-xs font-mono text-gray-700 truncate w-full md:w-1/3">
            {truncateKey(item.key)}
          </code>
        </li>
      ))}
    </ul>
  );
}
