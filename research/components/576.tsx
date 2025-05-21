import { tags } from "typia";
import React from "react";
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
  // Format bytes into human-readable string
  function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const num = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${num} ${sizes[i]}`;
  }

  // Format ISO date-time into "MMM D, YYYY, h:mm A" or fallback
  function formatDate(dateString?: string): string {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  const caches = value.actions_caches ?? [];
  const totalCount = value.total_count;
  const totalSize = caches.reduce((sum, c) => sum + (c.size_in_bytes ?? 0), 0);
  const averageSize = caches.length > 0 ? totalSize / caches.length : 0;

  // Sort by last accessed descending, fallback to created date
  const sortedCaches = caches
    .slice()
    .sort((a, b) => {
      const aTime = a.last_accessed_at
        ? new Date(a.last_accessed_at).getTime()
        : a.created_at
        ? new Date(a.created_at).getTime()
        : 0;
      const bTime = b.last_accessed_at
        ? new Date(b.last_accessed_at).getTime()
        : b.created_at
        ? new Date(b.created_at).getTime()
        : 0;
      return bTime - aTime;
    });

  // Display up to 5 caches to maintain mobile performance
  const MAX_DISPLAY = 5;
  const displayCaches = sortedCaches.slice(0, MAX_DISPLAY);
  const extraCount = totalCount > displayCaches.length ? totalCount - displayCaches.length : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Repository Actions Caches
      </h2>
      <div className="flex flex-wrap text-sm text-gray-700 mb-4 gap-x-6 gap-y-2">
        <div>
          <span className="font-medium">Total Caches:</span> {totalCount}
        </div>
        <div>
          <span className="font-medium">Total Size:</span> {formatBytes(totalSize)}
        </div>
        <div>
          <span className="font-medium">Avg. Size:</span>{" "}
          {caches.length > 0 ? formatBytes(averageSize) : "-"}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-3 py-2">Key</th>
              <th className="px-3 py-2">Version</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Last Accessed</th>
              <th className="px-3 py-2 text-right">Size</th>
            </tr>
          </thead>
          <tbody>
            {displayCaches.map((cache, idx) => {
              const key =
                cache.id != null
                  ? `cache-${cache.id}`
                  : cache.key
                  ? `cache-${cache.key}`
                  : `cache-${idx}`;
              return (
                <tr key={key} className="border-b last:border-b-0">
                  <td className="px-3 py-2 text-gray-800 truncate max-w-xs">
                    {cache.key ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-gray-800">{cache.version ?? "-"}</td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
                    {formatDate(cache.created_at)}
                  </td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
                    {formatDate(cache.last_accessed_at)}
                  </td>
                  <td className="px-3 py-2 text-gray-800 text-right whitespace-nowrap">
                    {cache.size_in_bytes != null
                      ? formatBytes(cache.size_in_bytes)
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {extraCount > 0 && (
        <p className="mt-3 text-xs text-gray-500">
          And {extraCount} more cache
          {extraCount > 1 ? "s" : ""}...
        </p>
      )}
    </div>
  );
}
