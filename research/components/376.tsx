import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsCacheUsageByRepository {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            repository_cache_usages: AutoViewInputSubTypes.actions_cache_usage_by_repository[];
        }
    }
    /**
     * GitHub Actions Cache Usage by repository.
     *
     * @title Actions Cache Usage by repository
    */
    export interface actions_cache_usage_by_repository {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsCacheUsageByRepository.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalRepos = value.total_count;
  const totalCacheSize = value.repository_cache_usages.reduce(
    (sum, repo) => sum + repo.active_caches_size_in_bytes,
    0,
  );

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const valueKb = bytes / Math.pow(k, i);
    return `${valueKb.toFixed(2)} ${sizes[i]}`;
  };

  // Sort repositories by cache size descending and take top 5
  const topRepos = [...value.repository_cache_usages]
    .sort((a, b) => b.active_caches_size_in_bytes - a.active_caches_size_in_bytes)
    .slice(0, 5);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <header className="flex items-center gap-2 mb-4">
        <LucideReact.Database size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Actions Cache Usage</h2>
      </header>

      <div className="flex flex-wrap gap-4 text-gray-700">
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} className="text-gray-500" />
          <span>Total Repositories: {totalRepos}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.HardDrive size={16} className="text-gray-500" />
          <span>Total Cache Size: {formatBytes(totalCacheSize)}</span>
        </div>
      </div>

      {topRepos.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead>
              <tr>
                <th className="px-3 py-2 font-medium">Repository</th>
                <th className="px-3 py-2 font-medium">Caches Count</th>
                <th className="px-3 py-2 font-medium">Cache Size</th>
              </tr>
            </thead>
            <tbody>
              {topRepos.map((repo) => (
                <tr key={repo.full_name} className="border-t">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <LucideReact.Folder size={16} className="text-gray-500" />
                      <span className="truncate max-w-xs">{repo.full_name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">{repo.active_caches_count}</td>
                  <td className="px-3 py-2">{formatBytes(repo.active_caches_size_in_bytes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No cache usage data available.</span>
        </div>
      )}
    </div>
  );
}
