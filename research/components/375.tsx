import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface actions_cache_usage_org_enterprise {
        /**
         * The count of active caches across all repositories of an enterprise or an organization.
        */
        total_active_caches_count: number & tags.Type<"int32">;
        /**
         * The total size in bytes of all active cache items across all repositories of an enterprise or an organization.
        */
        total_active_caches_size_in_bytes: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.actions_cache_usage_org_enterprise;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_active_caches_count;
  const totalSize = value.total_active_caches_size_in_bytes;
  const averageSize = totalCount > 0 ? totalSize / totalCount : 0;

  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    const units = ['KB', 'MB', 'GB', 'TB'];
    let i = 0;
    let b = bytes;
    while (b >= 1024 && i < units.length - 1) {
      b /= 1024;
      i++;
    }
    return `${b.toFixed(1)} ${units[i]}`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow md:max-w-md">
      <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
        <LucideReact.Database
          size={20}
          className="text-indigo-500 mr-2"
          aria-hidden="true"
        />
        Cache Usage
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <LucideReact.Database
            size={16}
            className="text-gray-500"
            aria-hidden="true"
          />
          <div>
            <div className="text-sm text-gray-500">Active Caches</div>
            <div className="text-base font-medium text-gray-900">
              {totalCount}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.HardDrive
            size={16}
            className="text-gray-500"
            aria-hidden="true"
          />
          <div>
            <div className="text-sm text-gray-500">Total Size</div>
            <div className="text-base font-medium text-gray-900">
              {formatBytes(totalSize)}
            </div>
          </div>
        </div>
        {totalCount > 0 && (
          <div className="sm:col-span-2">
            <div className="text-sm text-gray-500">Average Size per Cache</div>
            <div className="text-base font-medium text-gray-900">
              {formatBytes(averageSize)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
