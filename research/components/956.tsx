import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Key
     *
     * @title Key
    */
    export type key = {
        key: string;
        id: number & tags.Type<"int32">;
        url: string;
        title: string;
        created_at: string & tags.Format<"date-time">;
        verified: boolean;
        read_only: boolean;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.key[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">
        No API keys to display.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((item) => {
        const maskedKey =
          item.key.length > 8
            ? `${item.key.slice(0, 4)}…${item.key.slice(-4)}`
            : item.key;

        return (
          <div
            key={item.id}
            className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 truncate">
                {item.url}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-wrap items-center gap-2">
              <code className="text-sm font-mono text-gray-700 bg-gray-100 rounded px-2 py-1 truncate">
                {maskedKey}
              </code>
              <span className="text-sm text-gray-500">
                {formatDate(item.created_at)}
              </span>
              <span
                className={
                  "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium " +
                  (item.verified
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800")
                }
              >
                {item.verified ? "Verified" : "Unverified"}
              </span>
              <span
                className={
                  "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium " +
                  (item.read_only
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800")
                }
              >
                {item.read_only ? "Read-only" : "Editable"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
