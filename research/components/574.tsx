import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * GitHub Actions Cache Usage by repository.
     *
     * @title Actions Cache Usage by repository
    */
    export type actions_cache_usage_by_repository = {
        /**
         * The repository owner and name for the cache usage being shown.
        */
        full_name: string;
        /**
         * The sum of the size in bytes of all the active cache items in the repository.
        */
        active_caches_size_in_bytes: number & tags.Type<"int32">;
        /**
         * The number of active caches in the repository.
        */
        active_caches_count: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.actions_cache_usage_by_repository;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { full_name, active_caches_count, active_caches_size_in_bytes } = value;

  // Convert bytes to a human-readable string (e.g., "1.23 MB")
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const units = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);
    return `${size.toFixed(2)} ${units[i]}`;
  };

  const readableSize = formatBytes(active_caches_size_in_bytes);
  const countDisplay = active_caches_count.toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6">
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {full_name}
        </h3>
        <div className="mt-2 flex flex-wrap text-sm text-gray-600 space-x-4">
          <div className="flex items-center space-x-1">
            <span className="font-medium text-gray-700">Caches:</span>
            <span>{countDisplay}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-medium text-gray-700">Total Size:</span>
            <span>{readableSize}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
