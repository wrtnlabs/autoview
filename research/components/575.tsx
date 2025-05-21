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

  const formatBytes = (bytes?: number): string => {
    if (bytes === undefined) return "-";
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const { total_count, actions_caches } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Repository Actions Caches ({total_count})
      </h2>
      {actions_caches.length === 0 ? (
        <p className="text-sm text-gray-500">No caches available.</p>
      ) : (
        <ul className="space-y-4">
          {actions_caches.map((cache, idx) => (
            <li
              key={cache.id ?? idx}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-start sm:items-center mb-2">
                <p className="text-gray-900 font-medium truncate">
                  {cache.key ?? `#${cache.id ?? idx}`}
                </p>
                {cache.version && (
                  <span className="text-sm text-gray-500">v{cache.version}</span>
                )}
              </div>
              <div className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {cache.ref && (
                  <p className="truncate">
                    <span className="font-semibold text-gray-700">Ref: </span>
                    {cache.ref}
                  </p>
                )}
                <p>
                  <span className="font-semibold text-gray-700">Size: </span>
                  {formatBytes(cache.size_in_bytes)}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Created: </span>
                  {formatDate(cache.created_at)}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Last Accessed: </span>
                  {formatDate(cache.last_accessed_at)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
