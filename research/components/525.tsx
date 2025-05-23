import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface packages_billing_usage {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.packages_billing_usage;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalUsed = value.total_gigabytes_bandwidth_used;
  const paidUsed = value.total_paid_gigabytes_bandwidth_used;
  const freeUsed = totalUsed - paidUsed;
  const included = value.included_gigabytes_bandwidth;

  // Percentages for meter bars
  const freeAllocatedPercent = included > 0
    ? Math.min((freeUsed / included) * 100, 100)
    : 0;
  const paidPercent = totalUsed > 0
    ? Math.min((paidUsed / totalUsed) * 100, 100)
    : 0;

  // Helper to format GB values
  const formatGB = (gb: number) => `${gb.toLocaleString()} GB`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Package className="text-gray-600 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">
          Packages Bandwidth Usage
        </h2>
      </div>

      {/* Usage Bars */}
      <div className="space-y-4">
        {/* Free Usage vs Included */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Free Usage</span>
            <span>
              {formatGB(freeUsed)} / {formatGB(included)}
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-green-400"
              style={{ width: `${freeAllocatedPercent}%` }}
            />
          </div>
        </div>

        {/* Paid Usage */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Paid Usage</span>
            <span>{formatGB(paidUsed)}</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-yellow-500"
              style={{ width: `${paidPercent}%` }}
            />
          </div>
        </div>

        {/* Total Usage Summary */}
        <div className="pt-3 border-t border-gray-200 flex justify-between text-sm font-medium text-gray-800">
          <span>Total Usage</span>
          <span>{formatGB(totalUsed)}</span>
        </div>
      </div>
    </div>
  );
}
