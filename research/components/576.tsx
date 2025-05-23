import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Repository actions caches
     *
     * @title Repository actions caches
    */
    export interface actions_cache_list {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.actions_cache_list;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCaches = value.total_count;
  const caches = value.actions_caches ?? [];
  const cacheCount = caches.length;

  // Helper to format bytes into human-readable strings
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const k = 1024;
    const sizes = ['KB', 'MB', 'GB', 'TB'];
    let i = 0;
    let result = bytes;
    while (result >= k && i < sizes.length - 1) {
      result /= k;
      i++;
    }
    return `${result.toFixed(2)} ${sizes[i]}`;
  };

  // Helper to format ISO date-time strings
  const formatDate = (iso?: string): string => {
    if (!iso) return '-';
    const d = new Date(iso);
    return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  };

  // Compute average cache size
  const totalSize = caches.reduce((sum, c) => sum + (c.size_in_bytes ?? 0), 0);
  const averageSize = cacheCount > 0 ? totalSize / cacheCount : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <LucideReact.Database size={20} className="text-gray-600" />
          Repository Actions Caches
        </h2>
        <div className="flex gap-4 text-sm text-gray-600 mt-2 sm:mt-0">
          <div className="flex items-center gap-1">
            <LucideReact.List size={16} className="text-gray-500" />
            <span>{totalCaches} total</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.HardDrive size={16} className="text-gray-500" />
            <span>Avg. size: {cacheCount > 0 ? formatBytes(averageSize) : '-'}</span>
          </div>
        </div>
      </div>

      {/* No-data state */}
      {cacheCount === 0 ? (
        <div className="flex flex-col items-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2">No caches available.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Key</th>
                <th className="px-4 py-2">Ref</th>
                <th className="px-4 py-2">Version</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Last Accessed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {caches.map((cache, idx) => (
                <tr key={cache.id ?? idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 truncate max-w-xs flex items-center gap-1">
                    <LucideReact.Tag size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">{cache.key ?? '-'}</span>
                  </td>
                  <td className="px-4 py-2 truncate max-w-xs">{cache.ref ?? '-'}</td>
                  <td className="px-4 py-2">{cache.version ?? '-'}</td>
                  <td className="px-4 py-2 flex items-center gap-1">
                    <LucideReact.HardDrive size={16} className="text-gray-400 flex-shrink-0" />
                    <span>{cache.size_in_bytes != null ? formatBytes(cache.size_in_bytes) : '-'}</span>
                  </td>
                  <td className="px-4 py-2 flex items-center gap-1">
                    <LucideReact.Calendar size={16} className="text-gray-400 flex-shrink-0" />
                    <span>{formatDate(cache.created_at)}</span>
                  </td>
                  <td className="px-4 py-2 flex items-center gap-1">
                    <LucideReact.Clock size={16} className="text-gray-400 flex-shrink-0" />
                    <span>{formatDate(cache.last_accessed_at)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
