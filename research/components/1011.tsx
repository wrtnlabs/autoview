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
export type AutoViewInput = AutoViewInputSubTypes.ssh_signing_key[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const maskKey = (key: string) =>
    key.length > 8 ? `${key.slice(0, 4)}…${key.slice(-4)}` : key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <p className="text-lg">No SSH Signing Keys available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.map((item) => {
        const { id, title, key, created_at } = item;
        return (
          <div
            key={id}
            className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-gray-800 font-semibold text-sm truncate">
                {title}
              </h3>
              <span className="text-gray-500 text-xs">#{id}</span>
            </div>
            <div className="p-4 flex flex-col space-y-3">
              <div className="flex items-center text-gray-700 text-sm">
                <LucideReact.Key
                  size={16}
                  className="mr-1 flex-shrink-0 text-gray-500"
                />
                <span className="font-mono truncate">{maskKey(key)}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <LucideReact.Calendar
                  size={16}
                  className="mr-1 flex-shrink-0"
                />
                <time dateTime={created_at}>{formatDate(created_at)}</time>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
