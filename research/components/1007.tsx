import * as LucideReact from "lucide-react";
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
  const total = value.total_minutes_used;
  const paid = value.total_paid_minutes_used;
  const included = value.included_minutes;
  const freeUsed = Math.max(total - paid, 0);

  const freeFrac = total > 0 ? freeUsed / total : 0;
  const paidFrac = total > 0 ? paid / total : 0;

  const breakdown = value.minutes_used_breakdown;
  const entries = Object.entries(breakdown).filter(
    ([k, v]) => k !== "total" && v != null,
  ) as [string, number][];
  const osOrder = ["UBUNTU", "MACOS", "WINDOWS"];
  const orderedEntries = entries.sort((a, b) => {
    const ai = osOrder.indexOf(a[0]);
    const bi = osOrder.indexOf(b[0]);
    if (ai !== -1 || bi !== -1) {
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }
    return a[0].localeCompare(b[0]);
  });
  const formatLabel = (key: string): string => {
    const mapping: Record<string, string> = {
      UBUNTU: "Ubuntu",
      MACOS: "macOS",
      WINDOWS: "Windows",
    };
    if (mapping[key]) return mapping[key];
    return key
      .split("_")
      .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
      .join(" ");
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4 text-gray-700 font-semibold">
        <LucideReact.Clock size={20} className="mr-2" />
        <span>Total usage: {total} min</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2 flex overflow-hidden">
        {freeUsed > 0 && (
          <div className="bg-green-500 h-full" style={{ flexGrow: freeFrac }} />
        )}
        {paid > 0 && (
          <div className="bg-blue-500 h-full" style={{ flexGrow: paidFrac }} />
        )}
      </div>

      <div className="flex justify-between text-sm mb-4">
        <div className="flex items-center text-gray-600">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-1" />
          <span>
            Free used: {freeUsed} / {included} min
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-1" />
          <span>Paid: {paid} min</span>
        </div>
      </div>

      <div className="text-gray-700 font-medium mb-2">Breakdown by runner:</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {orderedEntries.map(([key, val]) => (
          <div
            key={key}
            className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm"
          >
            <span className="truncate">{formatLabel(key)}</span>
            <span className="font-semibold">{val}m</span>
          </div>
        ))}
      </div>
    </div>
  );
}
