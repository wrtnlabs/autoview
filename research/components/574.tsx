import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.actions_cache_usage_by_repository;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    const num = bytes / Math.pow(k, i);
    const formatted = i > 0 && num < 10 ? num.toFixed(1) : Math.round(num).toString();
    return `${formatted} ${sizes[i]}`;
  };

  const { active_caches_size_in_bytes: totalBytes, active_caches_count: count } = value;
  const formattedTotalSize = formatBytes(totalBytes);
  const averageSize = count > 0 ? totalBytes / count : 0;
  const formattedAverageSize = formatBytes(averageSize);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
      {/* Repository Name */}
      <div className="flex items-center mb-4">
        <LucideReact.GitBranch size={20} className="text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900 truncate">{value.full_name}</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Active Caches Count */}
        <div className="flex items-center">
          <LucideReact.Database size={16} className="text-gray-500 mr-1" />
          <div>
            <span className="text-gray-900 font-medium">{count}</span>
            <span className="text-gray-500 ml-1 text-sm">Caches</span>
          </div>
        </div>

        {/* Total Size */}
        <div className="flex items-center">
          <LucideReact.HardDrive size={16} className="text-gray-500 mr-1" />
          <div>
            <span className="text-gray-900 font-medium">{formattedTotalSize}</span>
            <span className="text-gray-500 ml-1 text-sm">Total Size</span>
          </div>
        </div>

        {/* Average Size per Cache */}
        <div className="flex items-center">
          <LucideReact.Calculator size={16} className="text-gray-500 mr-1" />
          <div>
            <span className="text-gray-900 font-medium">{formattedAverageSize}</span>
            <span className="text-gray-500 ml-1 text-sm">Avg Size</span>
          </div>
        </div>
      </div>
    </div>
  );
}
