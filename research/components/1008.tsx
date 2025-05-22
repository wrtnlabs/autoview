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

  const freePercent = totalGB > 0 ? (freeGB / totalGB) * 100 : 0;
  const paidPercent = totalGB > 0 ? (paidGB / totalGB) * 100 : 0;

  const formatGB = (n: number) => `${n.toLocaleString()} GB`;
  const formatPercent = (p: number) => `${p.toFixed(1)}%`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2">
        <LucideReact.Package
          aria-hidden="true"
          size={20}
          className="text-gray-700"
        />
        <h2 className="text-lg font-semibold text-gray-800">
          Packages Billing Usage
        </h2>
      </div>

      {/* Usage Bar */}
      <div
        className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-4"
        aria-label="Usage breakdown"
      >
        {totalGB > 0 ? (
          <>
            <div
              className="h-3 bg-green-500"
              style={{ width: `${freePercent}%` }}
              aria-label={`Free usage: ${formatPercent(freePercent)}`}
            />
            <div
              className="h-3 bg-blue-500"
              style={{ width: `${paidPercent}%` }}
              aria-label={`Paid usage: ${formatPercent(paidPercent)}`}
            />
          </>
        ) : (
          <div className="h-3 bg-gray-300 w-full" />
        )}
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Free Usage */}
        <div className="flex items-center gap-2">
          <LucideReact.CheckCircle
            aria-hidden="true"
            size={16}
            className="text-green-500"
          />
          <span className="text-sm text-gray-700">
            Included Free:{" "}
            <span className="font-medium">
              {formatGB(freeGB)} ({formatPercent(freePercent)})
            </span>
          </span>
        </div>
        {/* Paid Usage */}
        <div className="flex items-center gap-2">
          <LucideReact.CreditCard
            aria-hidden="true"
            size={16}
            className="text-blue-500"
          />
          <span className="text-sm text-gray-700">
            Paid Usage:{" "}
            <span className="font-medium">
              {formatGB(paidGB)} ({formatPercent(paidPercent)})
            </span>
          </span>
        </div>
      </div>

      {/* Total Summary */}
      <div className="flex items-center gap-2 mt-4 border-t border-gray-100 pt-4">
        <LucideReact.BarChart2
          aria-hidden="true"
          size={16}
          className="text-gray-500"
        />
        <span className="text-sm text-gray-700">
          Total Usage: <span className="font-medium">{formatGB(totalGB)}</span>
        </span>
      </div>
    </section>
  );
}
