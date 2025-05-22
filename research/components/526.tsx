import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type combined_billing_usage = {
        /**
         * Numbers of days left in billing cycle.
        */
        days_left_in_billing_cycle: number & tags.Type<"int32">;
        /**
         * Estimated storage space (GB) used in billing cycle.
        */
        estimated_paid_storage_for_month: number & tags.Type<"int32">;
        /**
         * Estimated sum of free and paid storage space (GB) used in billing cycle.
        */
        estimated_storage_for_month: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.combined_billing_usage;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const daysRemaining: number = value.days_left_in_billing_cycle;
  const paidStorage: number = value.estimated_paid_storage_for_month;
  const totalStorage: number = value.estimated_storage_for_month;
  const usagePercent: number = totalStorage > 0 ? (paidStorage / totalStorage) * 100 : 0;
  const usagePercentRounded: string = usagePercent.toFixed(1);
  const daysColorClass: string = daysRemaining <= 5 ? "text-red-500" : "text-green-500";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Billing Usage Summary</h2>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">Days Remaining</span>
        <span className={`text-sm font-medium ${daysColorClass}`}>{daysRemaining} days</span>
      </div>

      <div className="mb-2 text-sm font-medium text-gray-600">Storage Usage</div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-blue-500 h-4"
          style={{ width: `${usagePercentRounded}%` }}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-600">
        <span>Paid: {paidStorage} GB ({usagePercentRounded}%)</span>
        <span>Total: {totalStorage} GB</span>
      </div>
    </div>
  );
}
