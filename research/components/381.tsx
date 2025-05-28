import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface actions_hosted_runner_limits {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.actions_hosted_runner_limits;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { current_usage, maximum } = value.public_ips;
  const usagePercent = maximum > 0 ? Math.round((current_usage / maximum) * 100) : 0;
  const usageLabel = `${current_usage} of ${maximum}`;
  const percentLabel = `${usagePercent}% used`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-sm w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Server size={20} className="text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">
          Static Public IP Limits
        </h3>
      </div>
      <div className="flex justify-between items-baseline">
        <span className="text-2xl font-bold text-gray-900">{usageLabel}</span>
        <span className="text-sm text-gray-600">{percentLabel}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
        <div
          className="bg-blue-500 h-full"
          style={{ width: `${usagePercent}%` }}
        />
      </div>
    </div>
  );
}
