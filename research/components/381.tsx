import { tags } from "typia";
import React from "react";
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
  // Prevent division by zero and clamp between 0 and 100
  const usageRatio = maximum > 0 ? current_usage / maximum : 0;
  const percentage = Math.round(Math.min(Math.max(usageRatio * 100, 0), 100));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We render a card showing "Static Public IP Limits" with a usage bar.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-800">Static Public IP Limits</h2>
      <div className="mt-3 flex justify-between text-sm text-gray-600">
        <span>Used</span>
        <span>{current_usage} of {maximum}</span>
      </div>
      <div className="mt-2 relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-width duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-end pr-1">
          <span className="text-xs font-medium text-gray-700">{percentage}%</span>
        </div>
      </div>
    </div>
  );
  // 3. Return the React element.
  //    All displayed data is filtered, transformed, and formatted per guidelines.
}
