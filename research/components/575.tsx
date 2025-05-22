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
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  const formatSize = (bytes?: number): string => {
    if (bytes == null) return "-";
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(1)} GB`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Database
          size={20}
          className="text-gray-500 mr-2"
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-700">
          Caches ({value.total_count})
        </h2>
      </div>
      {value.total_count === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <LucideReact.AlertCircle
            size={48}
            className="mb-2"
            aria-hidden="true"
          />
          <span>No caches available</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ref
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Version
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Accessed
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {value.actions_caches.map((cache, index) => (
                <tr key={cache.id ?? index}>
                  <td className="px-4 py-2 text-sm text-gray-700 truncate max-w-xs">
                    {cache.key ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 truncate max-w-xs">
                    {cache.ref ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {cache.version ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                    {formatDate(cache.created_at)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                    {formatDate(cache.last_accessed_at)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-right whitespace-nowrap">
                    {formatSize(cache.size_in_bytes)}
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
