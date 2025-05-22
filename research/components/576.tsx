import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Repository actions caches
   *
   * @title Repository actions caches
   */
  export type actions_cache_list = {
    /**
     * Total number of caches
     */
    total_count: number & tags.Type<"int32">;
    /**
     * Array of caches
     */
    actions_caches: {
      id?: number & tags.Type<"int32">;
      ref?: string;
      key?: string;
      version?: string;
      last_accessed_at?: string & tags.Format<"date-time">;
      created_at?: string & tags.Format<"date-time">;
      size_in_bytes?: number & tags.Type<"int32">;
    }[];
  };
}
export type AutoViewInput = AutoViewInputSubTypes.actions_cache_list;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, actions_caches } = value;

  // Sum and average of cache sizes
  const totalSize = actions_caches.reduce(
    (sum, c) => sum + (c.size_in_bytes ?? 0),
    0,
  );
  const avgSize =
    actions_caches.length > 0 ? totalSize / actions_caches.length : 0;

  // Format bytes into human-readable form
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const units = ["KB", "MB", "GB", "TB"];
    let idx = -1;
    let b = bytes;
    while (b >= 1024 && idx < units.length - 1) {
      b /= 1024;
      idx++;
    }
    return `${b.toFixed(1)} ${units[idx]}`;
  };

  // Format ISO date string to "Jan 1, 2023"
  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Limit displayed caches to first 5, show remaining count if any
  const displayedCaches = actions_caches.slice(0, 5);
  const remaining = actions_caches.length - displayedCaches.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header with summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <div className="flex items-center space-x-2">
          <LucideReact.Database
            size={20}
            className="text-blue-500"
            aria-hidden="true"
          />
          <span className="text-lg font-semibold text-gray-800">
            Actions Caches
          </span>
        </div>
        <div className="flex flex-wrap gap-4 mt-2 sm:mt-0 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-900">{total_count}</span>{" "}
            total
          </div>
          <div>
            <span className="font-medium text-gray-900">
              {formatBytes(totalSize)}
            </span>{" "}
            used
          </div>
          <div>
            <span className="font-medium text-gray-900">
              {formatBytes(Math.floor(avgSize))}
            </span>{" "}
            avg
          </div>
        </div>
      </div>

      {/* List of caches */}
      <ul className="divide-y divide-gray-100">
        {displayedCaches.map((cache, idx) => (
          <li
            key={cache.id ?? idx}
            className="py-3 flex justify-between items-center"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {cache.key ?? "Unnamed cache"}
              </p>
              <p className="mt-1 text-xs text-gray-500 truncate">
                {cache.version ? `Version: ${cache.version}` : "No version"}
              </p>
            </div>
            <div className="flex items-center space-x-4 pl-4">
              <div className="flex items-center text-xs text-gray-500">
                <LucideReact.Calendar
                  size={14}
                  className="mr-1"
                  aria-hidden="true"
                />
                <span>
                  {cache.last_accessed_at
                    ? formatDate(cache.last_accessed_at)
                    : "–"}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <LucideReact.Archive
                  size={14}
                  className="mr-1"
                  aria-hidden="true"
                />
                <span>
                  {cache.size_in_bytes != null
                    ? formatBytes(cache.size_in_bytes)
                    : "–"}
                </span>
              </div>
            </div>
          </li>
        ))}
        {remaining > 0 && (
          <li className="py-2 text-center text-sm text-gray-500">
            +{remaining} more cache{remaining > 1 ? "s" : ""}
          </li>
        )}
        {actions_caches.length === 0 && (
          <li className="py-6 text-center text-gray-400">
            <LucideReact.AlertCircle
              size={24}
              className="mx-auto mb-2"
              aria-hidden="true"
            />
            <p>No caches available.</p>
          </li>
        )}
      </ul>
    </div>
  );
}
