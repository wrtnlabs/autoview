import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Tag protection
   *
   * @title Tag protection
   */
  export type tag_protection = {
    id?: number & tags.Type<"int32">;
    created_at?: string;
    updated_at?: string;
    enabled?: boolean;
    pattern: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.tag_protection[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr?: string): string =>
    dateStr
      ? new Date(dateStr).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No protected tag patterns available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden divide-y divide-gray-200">
      {value.map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[auto_1fr] items-start gap-4 p-4"
        >
          {item.enabled ? (
            <LucideReact.CheckCircle
              size={20}
              className="text-green-500 mt-1"
              aria-label="Enabled"
            />
          ) : (
            <LucideReact.XCircle
              size={20}
              className="text-red-500 mt-1"
              aria-label="Disabled"
            />
          )}
          <div className="flex flex-col w-full">
            <span className="font-mono text-gray-900 truncate">
              {item.pattern}
            </span>
            <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-500">
              <div className="flex items-center">
                <LucideReact.Calendar
                  size={16}
                  className="text-gray-400 mr-1"
                />
                <span title={item.created_at ?? ""}>
                  Created: {formatDate(item.created_at)}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar
                  size={16}
                  className="text-gray-400 mr-1"
                />
                <span title={item.updated_at ?? ""}>
                  Updated: {formatDate(item.updated_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
