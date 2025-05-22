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

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Calculate free storage by subtracting paid from total.
  const freeStorage = Math.max(
    0,
    value.estimated_storage_for_month - value.estimated_paid_storage_for_month,
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Billing Cycle Usage
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Days left in billing cycle */}
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <LucideReact.Calendar size={24} className="text-blue-500" />
          <div className="ml-3">
            <div className="text-xs uppercase text-gray-500">
              Days Remaining
            </div>
            <div className="text-xl font-semibold text-gray-800">
              {value.days_left_in_billing_cycle}
            </div>
          </div>
        </div>

        {/* Estimated paid storage */}
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <LucideReact.HardDrive size={24} className="text-green-500" />
          <div className="ml-3">
            <div className="text-xs uppercase text-gray-500">Paid Storage</div>
            <div className="text-xl font-semibold text-gray-800">
              {value.estimated_paid_storage_for_month.toLocaleString()} GB
            </div>
          </div>
        </div>

        {/* Estimated total storage */}
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <LucideReact.Database size={24} className="text-indigo-500" />
          <div className="ml-3">
            <div className="text-xs uppercase text-gray-500">Total Storage</div>
            <div className="text-xl font-semibold text-gray-800">
              {value.estimated_storage_for_month.toLocaleString()} GB
            </div>
          </div>
        </div>

        {/* Derived free storage */}
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <LucideReact.Archive size={24} className="text-yellow-500" />
          <div className="ml-3">
            <div className="text-xs uppercase text-gray-500">Free Storage</div>
            <div className="text-xl font-semibold text-gray-800">
              {freeStorage.toLocaleString()} GB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // 3. Return the React element.
  //    All displayed data is filtered, transformed, and formatted per guidelines.
}
