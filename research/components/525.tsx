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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.total_gigabytes_bandwidth_used;
  const free = value.included_gigabytes_bandwidth;
  const paid = value.total_paid_gigabytes_bandwidth_used;
  const freePercent = total > 0 ? (free / total) * 100 : 0;
  const paidPercent = total > 0 ? (paid / total) * 100 : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const content = (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Packages Billing Usage</h2>
      <div className="mb-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${Math.min(freePercent, 100)}%` }}
          />
          <div
            className="h-full bg-red-400"
            style={{ width: `${Math.min(paidPercent, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>Free {freePercent.toFixed(0)}%</span>
          <span>Paid {paidPercent.toFixed(0)}%</span>
        </div>
      </div>
      <ul className="space-y-2 text-gray-700">
        <li className="flex justify-between">
          <span>Total Usage:</span>
          <span>{new Intl.NumberFormat().format(total)} GB</span>
        </li>
        <li className="flex justify-between">
          <span>Included (Free):</span>
          <span>{new Intl.NumberFormat().format(free)} GB</span>
        </li>
        <li className="flex justify-between">
          <span>Paid:</span>
          <span>{new Intl.NumberFormat().format(paid)} GB</span>
        </li>
      </ul>
    </div>
  );

  // 3. Return the React element.
  return content;
}
