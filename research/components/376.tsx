import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsCacheUsageByRepository {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      repository_cache_usages: AutoViewInputSubTypes.actions_cache_usage_by_repository[];
    };
  }
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
  AutoViewInputSubTypes.IApiOrgsActionsCacheUsageByRepository.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, repository_cache_usages: repos } = value;

  // Convert bytes into human-readable format
  function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const num = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${num} ${sizes[i]}`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!repos || repos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No cache usage data available.</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-800">
          <LucideReact.GitBranch size={20} className="mr-2 text-indigo-500" />
          <h2 className="text-lg font-semibold">Cache Usage by Repository</h2>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.ListOrdered size={16} className="mr-1" />
          <span>{total_count} repos</span>
        </div>
      </div>

      {/* Repository List */}
      <ul className="divide-y divide-gray-200">
        {repos.map((repo) => (
          <li
            key={repo.full_name}
            className="flex flex-col sm:flex-row sm:justify-between px-2 py-3 hover:bg-gray-50 transition"
          >
            {/* Repo Name */}
            <div className="flex items-center">
              <LucideReact.Folder size={18} className="mr-2 text-gray-500" />
              <span className="text-gray-800 font-medium truncate">
                {repo.full_name}
              </span>
            </div>
            {/* Metrics */}
            <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0 text-gray-600 text-sm">
              <div className="flex items-center">
                <LucideReact.Database size={16} className="mr-1" />
                <span>{repo.active_caches_count}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.HardDrive size={16} className="mr-1" />
                <span>{formatBytes(repo.active_caches_size_in_bytes)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
