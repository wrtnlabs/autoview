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
  const {
    total_minutes_used,
    included_minutes,
    total_paid_minutes_used,
    minutes_used_breakdown,
  } = value;

  const used = total_minutes_used;
  const included = included_minutes;
  const remaining = Math.max(included - used, 0);
  const usagePercent = included > 0 ? Math.min(100, (used / included) * 100) : 0;
  const formattedPercent = usagePercent.toFixed(1);

  // Format numbers with thousand separators
  const fmt = (n: number) => n.toLocaleString();
  const formattedIncluded = fmt(included);
  const formattedUsed = fmt(used);
  const formattedRemaining = fmt(remaining);
  const formattedPaid = fmt(total_paid_minutes_used);

  // OS-level breakdown
  type BreakdownKey = keyof typeof minutes_used_breakdown;
  const osKeys: { key: BreakdownKey; label: string }[] = [
    { key: 'UBUNTU', label: 'Ubuntu' },
    { key: 'MACOS', label: 'macOS' },
    { key: 'WINDOWS', label: 'Windows' },
  ];
  const osBreakdown = osKeys
    .map(({ key, label }) => ({
      label,
      value: minutes_used_breakdown[key] ?? 0,
    }))
    .filter(item => item.value > 0);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <header>
        <h2 className="text-xl font-semibold text-gray-800">
          GitHub Actions Minutes Usage
        </h2>
      </header>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formattedUsed} / {formattedIncluded} min</span>
          <span>{formattedPercent}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={usagePercent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="w-full h-2 mt-1 bg-gray-200 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-blue-500"
            style={{ width: `${usagePercent}%` }}
          />
        </div>
      </div>

      {/* Summary Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Free Minutes</p>
          <p className="font-medium text-gray-800">{formattedIncluded}</p>
        </div>
        <div>
          <p className="text-gray-500">Used Minutes</p>
          <p className="font-medium text-gray-800">{formattedUsed}</p>
        </div>
        <div>
          <p className="text-gray-500">Remaining</p>
          <p className="font-medium text-gray-800">{formattedRemaining}</p>
        </div>
        <div>
          <p className="text-gray-500">Paid Minutes</p>
          <p className="font-medium text-gray-800">{formattedPaid}</p>
        </div>
      </div>

      {/* OS Breakdown */}
      {osBreakdown.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-700 mb-2">OS Breakdown</p>
          <ul className="space-y-1 text-sm text-gray-800">
            {osBreakdown.map(({ label, value }) => (
              <li key={label} className="flex justify-between">
                <span>{label}</span>
                <span>{fmt(value)} min</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
