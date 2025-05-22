import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.actions_cache_usage_by_repository;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const repositoryName = value.full_name;
  const cachesCount = value.active_caches_count;
  const cachesSizeBytes = value.active_caches_size_in_bytes;

  // Format bytes into human-readable string.
  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  }
  const formattedSize = formatBytes(cachesSizeBytes);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      {/* Repository Name */}
      <div className="flex items-center gap-2 mb-4">
        <LucideReact.GitBranch
          size={20}
          className="text-gray-500"
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {repositoryName}
        </h2>
      </div>
      {/* Statistics */}
      <div className="flex items-center justify-between text-gray-700">
        <div className="flex items-center gap-1">
          <LucideReact.Database
            size={18}
            className="text-gray-500"
            aria-hidden="true"
          />
          <div className="flex flex-col">
            <span className="font-medium">{formattedSize}</span>
            <span className="text-sm text-gray-500">Cache Size</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.List
            size={18}
            className="text-gray-500"
            aria-hidden="true"
          />
          <div className="flex flex-col">
            <span className="font-medium">{cachesCount}</span>
            <span className="text-sm text-gray-500">Cache Count</span>
          </div>
        </div>
      </div>
    </div>
  );
}
