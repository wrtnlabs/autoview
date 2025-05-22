import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    total_gigabytes_bandwidth_used: totalGB,
    total_paid_gigabytes_bandwidth_used: paidGB,
    included_gigabytes_bandwidth: freeGB,
  } = value;

  // Derive percentages for a usage bar
  const freePercent = totalGB > 0 ? Math.min((freeGB / totalGB) * 100, 100) : 0;
  const paidPercent = totalGB > 0 ? Math.min((paidGB / totalGB) * 100, 100) : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-lg font-semibold text-gray-900">
        <LucideReact.Package size={20} className="text-gray-600 mr-2" />
        Packages Billing Usage
      </h2>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Usage */}
        <div className="flex flex-col items-center bg-gray-50 p-3 rounded">
          <LucideReact.Package size={24} className="text-indigo-500 mb-1" />
          <span className="text-sm text-gray-500">Total Used</span>
          <span className="mt-1 text-xl font-medium text-gray-900">
            {totalGB} GB
          </span>
        </div>
        {/* Paid Usage */}
        <div className="flex flex-col items-center bg-gray-50 p-3 rounded">
          <LucideReact.CreditCard size={24} className="text-red-500 mb-1" />
          <span className="text-sm text-gray-500">Paid</span>
          <span className="mt-1 text-xl font-medium text-gray-900">
            {paidGB} GB
          </span>
        </div>
        {/* Free (Included) Usage */}
        <div className="flex flex-col items-center bg-gray-50 p-3 rounded">
          <LucideReact.Gift size={24} className="text-green-500 mb-1" />
          <span className="text-sm text-gray-500">Free</span>
          <span className="mt-1 text-xl font-medium text-gray-900">
            {freeGB} GB
          </span>
        </div>
      </div>

      {/* Usage Breakdown Bar */}
      <div className="mt-4">
        <div className="flex h-2 w-full overflow-hidden rounded bg-gray-200">
          <div
            className="h-full bg-green-400"
            style={{ width: `${freePercent}%` }}
          />
          <div
            className="h-full bg-red-400"
            style={{ width: `${paidPercent}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>Free: {freePercent.toFixed(0)}%</span>
          <span>Paid: {paidPercent.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}
