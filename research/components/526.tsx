import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants
  const daysLeft = value.days_left_in_billing_cycle;
  const paidStorage = value.estimated_paid_storage_for_month;
  const totalStorage = value.estimated_storage_for_month;
  const freeStorage = Math.max(0, totalStorage - paidStorage);
  const paidPercent =
    totalStorage > 0 ? Math.min(100, (paidStorage / totalStorage) * 100) : 0;
  const freePercent =
    totalStorage > 0 ? Math.min(100, (freeStorage / totalStorage) * 100) : 0;

  // 2. Compose JSX structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.Database size={20} className="text-indigo-500" />
        Billing Usage
      </h2>

      <div className="flex items-center text-gray-700 mb-4">
        <LucideReact.Calendar size={16} className="text-gray-500 mr-2" />
        <span className="text-sm font-medium">
          {daysLeft} day{daysLeft !== 1 ? "s" : ""} left in billing cycle
        </span>
      </div>

      <div className="mb-2 text-sm font-medium text-gray-700">
        Storage usage this month
      </div>

      {totalStorage > 0 ? (
        <>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${paidPercent}%` }}
            />
            <div
              className="h-full bg-green-400"
              style={{ width: `${freePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>{paidStorage} GB paid</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              <span>{freeStorage} GB free</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{totalStorage} GB total</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={16} className="mr-1" />
          <span className="text-sm">No storage usage recorded</span>
        </div>
      )}
    </div>
  );
}
