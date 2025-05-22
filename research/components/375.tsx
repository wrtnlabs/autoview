import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.actions_cache_usage_org_enterprise;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    total_active_caches_count: count,
    total_active_caches_size_in_bytes: totalBytes,
  } = value;

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const scaled = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${scaled} ${sizes[i]}`;
  };

  const formattedCount = count.toLocaleString();
  const formattedTotalSize = formatBytes(totalBytes);
  const averageSize = count > 0 ? totalBytes / count : 0;
  const formattedAverageSize = formatBytes(averageSize);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Cache Usage Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center">
          <LucideReact.Database className="text-indigo-500" size={20} />
          <div className="ml-3">
            <div className="text-sm text-gray-500">Active Caches</div>
            <div className="text-xl font-medium text-gray-900">
              {formattedCount}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.HardDrive className="text-green-500" size={20} />
          <div className="ml-3">
            <div className="text-sm text-gray-500">Total Cache Size</div>
            <div className="text-xl font-medium text-gray-900">
              {formattedTotalSize}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.DivideCircle className="text-blue-500" size={20} />
          <div className="ml-3">
            <div className="text-sm text-gray-500">Avg. Cache Size</div>
            <div className="text-xl font-medium text-gray-900">
              {formattedAverageSize}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
