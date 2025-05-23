import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface actions_billing_usage {
        /**
         * The sum of the free and paid GitHub Actions minutes used.
        */
        total_minutes_used: number & tags.Type<"int32">;
        /**
         * The total paid GitHub Actions minutes used.
        */
        total_paid_minutes_used: number & tags.Type<"int32">;
        /**
         * The amount of free GitHub Actions minutes available.
        */
        included_minutes: number & tags.Type<"int32">;
        minutes_used_breakdown: {
            /**
             * Total minutes used on Ubuntu runner machines.
            */
            UBUNTU?: number & tags.Type<"int32">;
            /**
             * Total minutes used on macOS runner machines.
            */
            MACOS?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows runner machines.
            */
            WINDOWS?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Ubuntu 4 core runner machines.
            */
            ubuntu_4_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Ubuntu 8 core runner machines.
            */
            ubuntu_8_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Ubuntu 16 core runner machines.
            */
            ubuntu_16_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Ubuntu 32 core runner machines.
            */
            ubuntu_32_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Ubuntu 64 core runner machines.
            */
            ubuntu_64_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows 4 core runner machines.
            */
            windows_4_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows 8 core runner machines.
            */
            windows_8_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows 16 core runner machines.
            */
            windows_16_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows 32 core runner machines.
            */
            windows_32_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows 64 core runner machines.
            */
            windows_64_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on macOS 12 core runner machines.
            */
            macos_12_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on all runner machines.
            */
            total?: number & tags.Type<"int32">;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.actions_billing_usage;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const freeMinutes = value.total_minutes_used - value.total_paid_minutes_used;
  const usagePercent = value.included_minutes > 0
    ? Math.min(Math.round((value.total_minutes_used / value.included_minutes) * 100), 100)
    : 0;

  const breakdown = value.minutes_used_breakdown || {};
  const osBreakdown = [
    { label: 'Ubuntu', minutes: breakdown.UBUNTU },
    { label: 'macOS', minutes: breakdown.MACOS },
    { label: 'Windows', minutes: breakdown.WINDOWS },
  ].filter(item => typeof item.minutes === 'number');

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <LucideReact.Activity className="text-blue-500" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">Actions Billing Usage</h2>
      </div>
      <div className="space-y-4">
        {/* Usage Progress */}
        <div>
          <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
            <span>Usage</span>
            <span>
              {value.total_minutes_used} / {value.included_minutes} min ({usagePercent}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-full"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>
        {/* Free vs Paid */}
        <div className="flex space-x-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <LucideReact.Gift className="text-green-500" size={16} />
            <span>{freeMinutes} free min</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <LucideReact.CreditCard className="text-blue-500" size={16} />
            <span>{value.total_paid_minutes_used} paid min</span>
          </div>
        </div>
        {/* OS Breakdown */}
        {osBreakdown.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-700">By OS</h3>
            <div className="grid grid-cols-3 gap-2">
              {osBreakdown.map(({ label, minutes }) => (
                <div key={label} className="flex items-center gap-1 text-sm text-gray-600">
                  <LucideReact.Cpu size={16} className="text-gray-500" />
                  <span>{label}: {minutes} min</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
