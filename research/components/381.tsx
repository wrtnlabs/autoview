import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type actions_hosted_runner_limits = {
    /**
     * Provides details of static public IP limits for GitHub-hosted Hosted Runners
     *
     * @title Static public IP Limits for GitHub-hosted Hosted Runners.
     */
    public_ips: {
      /**
       * The maximum number of static public IP addresses that can be used for Hosted Runners.
       */
      maximum: number & tags.Type<"int32">;
      /**
       * The current number of static public IP addresses in use by Hosted Runners.
       */
      current_usage: number & tags.Type<"int32">;
    };
  };
}
export type AutoViewInput = AutoViewInputSubTypes.actions_hosted_runner_limits;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { current_usage, maximum } = value.public_ips;
  const usagePercent = maximum > 0 ? (current_usage / maximum) * 100 : 0;
  const displayPercent = Math.min(usagePercent, 100).toFixed(1);

  // Determine progress bar color: green for safe, amber for warning, red for critical
  let progressColor = "bg-green-500";
  if (usagePercent >= 90) {
    progressColor = "bg-red-500";
  } else if (usagePercent >= 70) {
    progressColor = "bg-amber-400";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Globe className="text-blue-500" size={24} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Static Public IP Limits
        </h2>
      </div>
      <div className="mb-2 text-sm text-gray-600">
        {current_usage} of {maximum} IPs used ({displayPercent}%)
      </div>
      <div
        role="progressbar"
        aria-valuenow={current_usage}
        aria-valuemin={0}
        aria-valuemax={maximum}
        className="w-full h-3 bg-gray-200 rounded-full overflow-hidden"
      >
        <div
          className={`${progressColor} h-full transition-all duration-300`}
          style={{ width: `${displayPercent}%` }}
        />
      </div>
    </div>
  );
}
