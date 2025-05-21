import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsCacheUsageByRepository.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalRepos: number = value.total_count;

  // Sort repositories by descending cache size for clearer insight
  const sortedRepos = [...value.repository_cache_usages].sort(
    (a, b) => b.active_caches_size_in_bytes - a.active_caches_size_in_bytes
  );

  // Limit the number of entries shown to avoid overly long lists on mobile
  const maxDisplay = 10;
  const displayRepos = sortedRepos.slice(0, maxDisplay);
  const remainingCount = sortedRepos.length - displayRepos.length;

  // Utility to format bytes into human-readable strings
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = bytes / Math.pow(k, i);
    return `${value.toFixed(2)} ${sizes[i]}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <header className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Actions Cache Usage by Repository
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total repositories: {totalRepos}
        </p>
      </header>
      <ul role="list" className="space-y-3">
        {displayRepos.map((repo) => (
          <li
            key={repo.full_name}
            className="flex items-center justify-between"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                {repo.full_name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Caches: {repo.active_caches_count}
              </p>
            </div>
            <div className="ml-4 text-sm font-mono text-gray-700 dark:text-gray-300">
              {formatBytes(repo.active_caches_size_in_bytes)}
            </div>
          </li>
        ))}
        {remainingCount > 0 && (
          <li className="text-sm text-gray-500 dark:text-gray-400">
            And {remainingCount} more repositories...
          </li>
        )}
      </ul>
    </div>
  );
}
