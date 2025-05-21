import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type packages_billing_usage = {
        /**
         * Sum of the free and paid storage space (GB) for GitHuub Packages.
        */
        total_gigabytes_bandwidth_used: number & tags.Type<"int32">;
        /**
         * Total paid storage space (GB) for GitHuub Packages.
        */
        total_paid_gigabytes_bandwidth_used: number & tags.Type<"int32">;
        /**
         * Free storage space (GB) for GitHub Packages.
        */
        included_gigabytes_bandwidth: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.packages_billing_usage;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation constants
  const total = value.total_gigabytes_bandwidth_used;
  const freeUsage = value.included_gigabytes_bandwidth;
  const paidUsage = value.total_paid_gigabytes_bandwidth_used;
  const formatNumber = (n: number) => n.toLocaleString();
  const freePercent = total > 0 ? (freeUsage / total) * 100 : 0;
  const paidPercent = total > 0 ? (paidUsage / total) * 100 : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Packages Billing Usage</h2>

      <div
        className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-4"
        role="progressbar"
        aria-valuenow={total}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Usage distribution"
      >
        {total > 0 && (
          <>
            <div
              className="h-full bg-green-400"
              style={{ width: `${freePercent}%` }}
            />
            <div
              className="h-full bg-yellow-400"
              style={{ width: `${paidPercent}%` }}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-semibold text-gray-900">Free Usage</p>
          <p>{formatNumber(freeUsage)} GB</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Paid Usage</p>
          <p>{formatNumber(paidUsage)} GB</p>
        </div>
        <div className="col-span-2">
          <p className="font-semibold text-gray-900">Total Usage</p>
          <p>{formatNumber(total)} GB</p>
        </div>
      </div>
    </div>
  );
}
