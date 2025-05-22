import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace open {
    export namespace marketing {
      export type OneTimeMsgUserView = {
        oneTimeMsgUser?: AutoViewInputSubTypes.marketing.OneTimeMsgUser;
      };
    }
  }
  export namespace marketing {
    export type OneTimeMsgUser = {
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
export type AutoViewInput =
  AutoViewInputSubTypes.open.marketing.OneTimeMsgUserView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const data = value.oneTimeMsgUser;
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <p className="text-lg">No metrics available</p>
      </div>
    );
  }

  const sent = data.sent ?? 0;
  const views = data.view ?? 0;
  const clicks = data.click ?? 0;
  const goal = data.goal ?? 0;

  const formatNumber = (n: number) => new Intl.NumberFormat().format(n);
  const viewRate = sent > 0 ? ((views / sent) * 100).toFixed(1) : "0.0";
  const clickRate = sent > 0 ? ((clicks / sent) * 100).toFixed(1) : "0.0";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Campaign Metrics
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <LucideReact.Send
            className="text-gray-500"
            size={20}
            aria-hidden="true"
          />
          <div>
            <div className="text-lg font-medium text-gray-900">
              {formatNumber(sent)}
            </div>
            <div className="text-sm text-gray-500">Sent</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Eye
            className="text-blue-500"
            size={20}
            aria-hidden="true"
          />
          <div>
            <div className="text-lg font-medium text-gray-900">
              {formatNumber(views)}
            </div>
            <div className="text-sm text-gray-500">Viewed</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.MousePointer
            className="text-green-500"
            size={20}
            aria-hidden="true"
          />
          <div>
            <div className="text-lg font-medium text-gray-900">
              {formatNumber(clicks)}
            </div>
            <div className="text-sm text-gray-500">Clicked</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Target
            className="text-purple-500"
            size={20}
            aria-hidden="true"
          />
          <div>
            <div className="text-lg font-medium text-gray-900">
              {formatNumber(goal)}
            </div>
            <div className="text-sm text-gray-500">Goal</div>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>View Rate:</span>
          <span>{viewRate}%</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>Click Rate:</span>
          <span>{clickRate}%</span>
        </div>
      </div>
    </div>
  );
}
