import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type actions_billing_usage = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.actions_billing_usage;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const included = value.included_minutes;
  const totalUsed = value.total_minutes_used;
  const paidUsed = value.total_paid_minutes_used;
  const freeUsed = totalUsed - paidUsed;
  const percentUsed = included > 0 ? (totalUsed / included) * 100 : 0;
  const formatter = new Intl.NumberFormat();

  // Prepare top‐level OS breakdown
  const breakdown = value.minutes_used_breakdown || {};
  const osOrder = ['UBUNTU', 'MACOS', 'WINDOWS'] as const;
  const osData = osOrder
    .map((key) => ({
      label: key.charAt(0) + key.slice(1).toLowerCase(),
      minutes: breakdown[key] ?? 0,
    }))
    .filter((item) => item.minutes > 0);

  // Prepare other machine‐type breakdown
  const otherData = Object.entries(breakdown)
    .filter(
      ([key]) =>
        !osOrder.includes(key as any) &&
        key !== 'total' &&
        (breakdown as Record<string, unknown>)[key] != null
    )
    .map(([key, v]) => ({
      label: key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      minutes: (v as number) ?? 0,
    }))
    .filter((item) => item.minutes > 0);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        GitHub Actions Billing Usage
      </h2>

      <div className="mb-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Included Minutes</span>
          <span className="font-medium">{formatter.format(included)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Used</span>
          <span className="font-medium">{formatter.format(totalUsed)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Free Used</span>
          <span className="font-medium">{formatter.format(freeUsed)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Paid Used</span>
          <span className="font-medium">{formatter.format(paidUsed)}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Usage</span>
          <span>{percentUsed.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-2"
            style={{ width: `${Math.min(percentUsed, 100)}%` }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium text-gray-700 mb-2">
          Usage Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {osData.concat(otherData).map(({ label, minutes }) => (
            <div
              key={label}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
            >
              <span className="text-gray-700">{label}</span>
              <span className="font-medium">{formatter.format(minutes)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
