import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type actions_cache_usage_org_enterprise = {
        /**
         * The count of active caches across all repositories of an enterprise or an organization.
        */
        total_active_caches_count: number & tags.Type<"int32">;
        /**
         * The total size in bytes of all active cache items across all repositories of an enterprise or an organization.
        */
        total_active_caches_size_in_bytes: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.actions_cache_usage_org_enterprise;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_active_caches_count, total_active_caches_size_in_bytes } = value;

  // Format numbers with locale separators
  const numberFormatter = new Intl.NumberFormat(undefined);

  const formattedCount = numberFormatter.format(total_active_caches_count);

  // Convert bytes to a human-readable string
  function formatBytes(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let idx = 0;
    let val = bytes;
    while (val >= 1024 && idx < units.length - 1) {
      val /= 1024;
      idx++;
    }
    const formatted = val.toFixed(2).replace(/\.00$/, '');
    return `${formatted} ${units[idx]}`;
  }

  const formattedTotalSize = formatBytes(total_active_caches_size_in_bytes);

  // Derive average size per cache, guard against division by zero
  const avgSize =
    total_active_caches_count > 0
      ? total_active_caches_size_in_bytes / total_active_caches_count
      : 0;
  const formattedAvgSize = formatBytes(avgSize);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Cache Usage Overview
      </h2>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
        <div className="flex-1">
          <dt className="text-sm text-gray-500">Active Caches</dt>
          <dd className="mt-1 text-xl font-semibold text-gray-900">
            {formattedCount}
          </dd>
        </div>
        <div className="flex-1">
          <dt className="text-sm text-gray-500">Total Cache Size</dt>
          <dd className="mt-1 text-xl font-semibold text-gray-900">
            {formattedTotalSize}
          </dd>
        </div>
        <div className="flex-1">
          <dt className="text-sm text-gray-500">Avg. Size per Cache</dt>
          <dd className="mt-1 text-xl font-semibold text-gray-900">
            {formattedAvgSize}
          </dd>
        </div>
      </div>
    </div>
  );
}
