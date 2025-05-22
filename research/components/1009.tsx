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
  const daysLeft = value.days_left_in_billing_cycle;
  const paidStorage = value.estimated_paid_storage_for_month;
  const totalStorage = value.estimated_storage_for_month;
  const freeStorage = Math.max(totalStorage - paidStorage, 0);
  const paidPercentage = totalStorage > 0 ? (paidStorage / totalStorage) * 100 : 0;
  const freePercentage = totalStorage > 0 ? (freeStorage / totalStorage) * 100 : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // Utilize semantic HTML elements where appropriate.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Billing Usage</h2>
        <span className="text-sm font-medium text-indigo-600">
          {daysLeft} days left
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold text-gray-800">{totalStorage} GB</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Paid</p>
          <p className="text-xl font-bold text-gray-800">{paidStorage} GB</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Free</p>
          <p className="text-xl font-bold text-gray-800">{freeStorage} GB</p>
        </div>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex mb-2">
        <div
          className="h-full bg-green-500"
          style={{ width: `${freePercentage}%` }}
        />
        <div
          className="h-full bg-indigo-500"
          style={{ width: `${paidPercentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>{freePercentage.toFixed(0)}% free</span>
        <span>{paidPercentage.toFixed(0)}% paid</span>
      </div>
    </div>
  );
  // 3. Return the React element.
}
