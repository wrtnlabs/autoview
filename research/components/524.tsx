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
  const freeUsed = value.total_minutes_used - value.total_paid_minutes_used;
  const included = value.included_minutes;
  const freeRemaining = Math.max(included - freeUsed, 0);
  const freePercentage = included > 0 ? Math.min((freeUsed / included) * 100, 100) : 0;

  // Prepare breakdown entries excluding the 'total' field and zero/undefined values
  const breakdownEntries = Object.entries(value.minutes_used_breakdown)
    .filter(([key, minutes]) => key !== "total" && typeof minutes === "number" && minutes > 0) as [string, number][];

  // Helper to turn keys like "ubuntu_4_core" into "Ubuntu 4 Core"
  const formatLabel = (key: string) =>
    key
      .toLowerCase()
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Clock className="text-gray-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">Actions Minutes Usage</h2>
      </div>

      {/* Usage Summary */}
      <div className="mb-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Free Used: {freeUsed} / {included} min</span>
          <span>Paid Used: {value.total_paid_minutes_used} min</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-4">
        <div
          className="bg-green-500 h-4"
          style={{ width: `${freePercentage}%` }}
        />
      </div>
      <div className="mb-4 text-sm">
        {freeRemaining > 0 ? (
          <span className="text-gray-700">Free Remaining: {freeRemaining} min</span>
        ) : (
          <span className="flex items-center text-red-500">
            <LucideReact.AlertTriangle className="mr-1" size={16} />
            Free Quota Exceeded
          </span>
        )}
      </div>

      {/* Detailed Breakdown */}
      {breakdownEntries.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
            <LucideReact.LayoutGrid className="mr-1 text-gray-600" size={18} />
            Breakdown
          </h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {breakdownEntries.map(([key, minutes]) => (
              <li key={key} className="flex items-center text-gray-700 text-sm">
                <LucideReact.Cpu className="text-gray-400 mr-1" size={16} />
                <span>{formatLabel(key)}: {minutes} min</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
