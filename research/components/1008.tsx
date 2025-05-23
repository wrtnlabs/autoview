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
  const totalGb = value.total_gigabytes_bandwidth_used;
  const paidGb = value.total_paid_gigabytes_bandwidth_used;
  const includedGb = value.included_gigabytes_bandwidth;

  // Free used is whatever portion of total beyond paid usage
  const freeUsedGb = Math.max(0, totalGb - paidGb);
  // Remaining free allowance
  const remainingFreeGb = Math.max(0, includedGb - freeUsedGb);

  // Percentages for visualization
  const freePercent = totalGb > 0 ? (freeUsedGb / totalGb) * 100 : 0;
  const paidPercent = totalGb > 0 ? (paidGb / totalGb) * 100 : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.BarChart2 className="text-gray-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">
          Packages Billing Usage
        </h2>
      </div>

      {/* Usage bar */}
      <div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${freePercent}%` }}
          />
          <div
            className="bg-red-500 h-full"
            style={{ width: `${paidPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm mt-2 text-gray-600">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 inline-block rounded-full mr-1" />
            <span>
              Free Used ({freeUsedGb.toLocaleString()} GB)
            </span>
          </div>
          <span>{freePercent.toFixed(1)}%</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1 text-gray-600">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-red-500 inline-block rounded-full mr-1" />
            <span>
              Paid Used ({paidGb.toLocaleString()} GB)
            </span>
          </div>
          <span>{paidPercent.toFixed(1)}%</span>
        </div>
      </div>

      {/* Detailed stats */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="flex items-center">
          <LucideReact.Database className="text-gray-500 mr-2" size={16} />
          <span>
            Included Allowance:&nbsp;
            <strong>{includedGb.toLocaleString()} GB</strong>
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.CheckCircle className="text-green-500 mr-2" size={16} />
          <span>
            Remaining Free:&nbsp;
            <strong>{remainingFreeGb.toLocaleString()} GB</strong>
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.CreditCard className="text-red-500 mr-2" size={16} />
          <span>
            Paid Usage:&nbsp;
            <strong>{paidGb.toLocaleString()} GB</strong>
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.Package className="text-gray-500 mr-2" size={16} />
          <span>
            Total Usage:&nbsp;
            <strong>{totalGb.toLocaleString()} GB</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
