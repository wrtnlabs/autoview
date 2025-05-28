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
  const caches = value.actions_caches ?? [];
  const hasCaches = caches.length > 0;

  function formatDate(dateStr?: string): string {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleString();
  }

  function formatBytes(bytes?: number): string {
    if (bytes == null) return '—';
    if (bytes < 1024) return `${bytes} B`;
    const k = 1024;
    const sizes = ['KB', 'MB', 'GB', 'TB'];
    let i = 0;
    let dbl = bytes;
    while (dbl >= k && i < sizes.length - 1) {
      dbl /= k;
      i++;
    }
    return `${dbl.toFixed(1)} ${sizes[i]}`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4 text-gray-700">
        <LucideReact.ListOrdered className="mr-2 text-gray-600" size={20} />
        <h2 className="text-lg font-semibold">Actions Caches ({value.total_count})</h2>
      </div>

      { !hasCaches ? (
        <div className="flex flex-col items-center py-8 text-gray-500">
          <LucideReact.AlertCircle className="mb-2" size={48} />
          <span>No caches available.</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {caches.map((cache, idx) => (
            <li
              key={cache.id ?? idx}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-800 truncate" title={cache.key}>
                  <LucideReact.Tag className="inline-block mr-1 text-gray-500" size={16} />
                  {cache.key ?? '—'}
                </div>
                <span className="text-sm text-gray-500">{cache.version ? `v${cache.version}` : '—'}</span>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <LucideReact.Calendar className="mr-1 text-gray-500" size={16} />
                  <span title={formatDate(cache.created_at)}>
                    Created: {formatDate(cache.created_at)}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Clock className="mr-1 text-gray-500" size={16} />
                  <span title={formatDate(cache.last_accessed_at)}>
                    Last Accessed: {formatDate(cache.last_accessed_at)}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Database className="mr-1 text-gray-500" size={16} />
                  <span>Size: {formatBytes(cache.size_in_bytes)}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.GitBranch className="mr-1 text-gray-500" size={16} />
                  <span>{cache.ref ?? '—'}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
