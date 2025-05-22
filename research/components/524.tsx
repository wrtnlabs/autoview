import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const freeUsed = Math.min(value.total_minutes_used, value.included_minutes);
  const freePercent =
    value.included_minutes > 0 ? (freeUsed / value.included_minutes) * 100 : 0;
  const freePercentCap = Math.min(freePercent, 100);

  const osBreakdown = value.minutes_used_breakdown;
  const osData: { label: string; key: keyof typeof osBreakdown }[] = [
    { label: "Ubuntu", key: "UBUNTU" },
    { label: "macOS", key: "MACOS" },
    { label: "Windows", key: "WINDOWS" },
  ];
  const filteredOs = osData.filter(
    (item) => osBreakdown[item.key] !== undefined,
  );

  const formatNumber = (n: number) => n.toLocaleString();
  const formatPercent = (n: number) => `${n.toFixed(1)}%`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Activity size={20} className="text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          GitHub Actions Billing Usage
        </h2>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <LucideReact.Gift size={20} className="text-indigo-500" />
          <div>
            <p className="text-sm text-gray-600">Included</p>
            <p className="text-md font-medium text-gray-800">
              {formatNumber(value.included_minutes)} min
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.Cpu size={20} className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Free Used</p>
            <p className="text-md font-medium text-gray-800">
              {formatNumber(freeUsed)} min
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.CreditCard size={20} className="text-red-500" />
          <div>
            <p className="text-sm text-gray-600">Paid Used</p>
            <p className="text-md font-medium text-gray-800">
              {formatNumber(value.total_paid_minutes_used)} min
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.Clock size={20} className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Total Used</p>
            <p className="text-md font-medium text-gray-800">
              {formatNumber(value.total_minutes_used)} min
            </p>
          </div>
        </div>
      </div>

      {/* Free Usage Progress */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Free Usage</span>
          <span className="text-sm text-gray-600">
            {formatPercent(freePercentCap)}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
          <div
            className="h-2 bg-blue-500"
            style={{ width: `${freePercentCap}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {formatNumber(freeUsed)} of {formatNumber(value.included_minutes)}{" "}
          minutes
        </p>
      </div>

      {/* OS Breakdown */}
      {filteredOs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Usage Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {filteredOs.map((item) => {
              const used = osBreakdown[item.key] as number;
              const pct =
                value.total_minutes_used > 0
                  ? (used / value.total_minutes_used) * 100
                  : 0;
              return (
                <div
                  key={item.key}
                  className="flex flex-col p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-600">
                    {item.label}
                  </span>
                  <span className="text-lg font-semibold text-gray-800 mt-1">
                    {formatNumber(used)} min
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    {formatPercent(pct)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
