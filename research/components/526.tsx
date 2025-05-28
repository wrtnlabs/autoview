import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface combined_billing_usage {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.combined_billing_usage;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const freeStorage = Math.max(
    value.estimated_storage_for_month - value.estimated_paid_storage_for_month,
    0
  );
  const formatGB = (gb: number) => `${gb} GB`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.ChartBar className="mr-2 text-indigo-500" size={20} />
        Billing Usage
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-500 mr-2" size={16} />
          <div>
            <div className="text-sm text-gray-500">Days Left</div>
            <div className="text-md font-medium text-gray-900">
              {value.days_left_in_billing_cycle}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.Database className="text-gray-500 mr-2" size={16} />
          <div>
            <div className="text-sm text-gray-500">Total Storage</div>
            <div className="text-md font-medium text-gray-900">
              {formatGB(value.estimated_storage_for_month)}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.CreditCard className="text-gray-500 mr-2" size={16} />
          <div>
            <div className="text-sm text-gray-500">Paid Storage</div>
            <div className="text-md font-medium text-gray-900">
              {formatGB(value.estimated_paid_storage_for_month)}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.Layers className="text-gray-500 mr-2" size={16} />
          <div>
            <div className="text-sm text-gray-500">Free Storage</div>
            <div className="text-md font-medium text-gray-900">
              {formatGB(freeStorage)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
