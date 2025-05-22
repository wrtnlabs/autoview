import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4OneTimeMsgUserView = {
          oneTimeMsgUser?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4OneTimeMsgUser;
        };
      }
    }
    export namespace v4 {
      export namespace marketing {
        export type LegacyV4OneTimeMsgUser = {
          oneTimeMsgId?: string;
          userId?: string;
          sent?: number;
          view?: number;
          goal?: number;
          click?: number;
          version?: number & tags.Type<"int32">;
          id?: string;
        };
      }
    }
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4OneTimeMsgUserView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const userMetrics = value.oneTimeMsgUser;
  // If no metrics data, show an empty state
  if (!userMetrics) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No data available</span>
      </div>
    );
  }

  // Safely extract values with defaults
  const sent = userMetrics.sent ?? 0;
  const view = userMetrics.view ?? 0;
  const click = userMetrics.click ?? 0;
  const goal = userMetrics.goal ?? 0;

  // Derived rates
  const viewRate = sent > 0 ? (view / sent) * 100 : 0;
  const clickRate = sent > 0 ? (click / sent) * 100 : 0;
  const goalRate = sent > 0 ? (goal / sent) * 100 : 0;

  // Format numbers
  const formatter = new Intl.NumberFormat();
  const formattedSent = formatter.format(sent);
  const formattedView = formatter.format(view);
  const formattedClick = formatter.format(click);
  const formattedGoal = formatter.format(goal);
  const formattedViewRate = viewRate.toFixed(1) + "%";
  const formattedClickRate = clickRate.toFixed(1) + "%";
  const formattedGoalRate = goalRate.toFixed(1) + "%";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Message Performance
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col items-center">
          <LucideReact.Send size={20} className="text-blue-500 mb-1" />
          <span className="text-sm text-gray-600">Sent</span>
          <span className="text-xl font-medium text-gray-900">
            {formattedSent}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.Eye size={20} className="text-indigo-500 mb-1" />
          <span className="text-sm text-gray-600">Views</span>
          <span className="text-xl font-medium text-gray-900">
            {formattedView}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.MousePointer size={20} className="text-green-500 mb-1" />
          <span className="text-sm text-gray-600">Clicks</span>
          <span className="text-xl font-medium text-gray-900">
            {formattedClick}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.Flag size={20} className="text-red-500 mb-1" />
          <span className="text-sm text-gray-600">Conversions</span>
          <span className="text-xl font-medium text-gray-900">
            {formattedGoal}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
          <span className="text-sm text-gray-700">View Rate</span>
          <span className="text-sm font-medium text-gray-900">
            {formattedViewRate}
          </span>
        </div>
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
          <span className="text-sm text-gray-700">Click Rate</span>
          <span className="text-sm font-medium text-gray-900">
            {formattedClickRate}
          </span>
        </div>
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
          <span className="text-sm text-gray-700">Conv. Rate</span>
          <span className="text-sm font-medium text-gray-900">
            {formattedGoalRate}
          </span>
        </div>
      </div>
    </div>
  );
}
