import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace open {
        export namespace marketing {
            export interface OneTimeMsgUserView {
                oneTimeMsgUser?: AutoViewInputSubTypes.marketing.OneTimeMsgUser;
            }
        }
    }
    export namespace marketing {
        export interface OneTimeMsgUser {
            oneTimeMsgId?: string;
            userId?: string;
            sent?: number;
            view?: number;
            goal?: number;
            click?: number;
            version?: number & tags.Type<"int32">;
            id?: string;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.OneTimeMsgUserView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const data = value.oneTimeMsgUser;
  const sentCount = data?.sent ?? 0;
  const viewCount = data?.view ?? 0;
  const clickCount = data?.click ?? 0;
  const goalCount = data?.goal ?? 0;

  // Calculate rates relative to sentCount
  const viewRate = sentCount > 0 ? (viewCount / sentCount) * 100 : 0;
  const clickRate = sentCount > 0 ? (clickCount / sentCount) * 100 : 0;

  // Formatting helpers
  const formatNumber = (num: number) => num.toLocaleString();
  const formatPercent = (num: number) => `${num.toFixed(1)}%`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No data available</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
      <h2 className="text-lg font-semibold mb-4">One-Time Message Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Sent */}
        <div className="flex items-center">
          <LucideReact.Send size={20} className="text-blue-500" />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Sent</div>
            <div className="text-xl font-semibold">{formatNumber(sentCount)}</div>
          </div>
        </div>
        {/* Views */}
        <div className="flex items-center">
          <LucideReact.Eye size={20} className="text-green-500" />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Views</div>
            <div className="text-xl font-semibold">
              {formatNumber(viewCount)}{' '}
              <span className="text-sm text-gray-400">({formatPercent(viewRate)})</span>
            </div>
          </div>
        </div>
        {/* Goal */}
        <div className="flex items-center">
          <LucideReact.Target size={20} className="text-indigo-500" />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Goal</div>
            <div className="text-xl font-semibold">{formatNumber(goalCount)}</div>
          </div>
        </div>
        {/* Clicks */}
        <div className="flex items-center">
          <LucideReact.MousePointer size={20} className="text-red-500" />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Clicks</div>
            <div className="text-xl font-semibold">
              {formatNumber(clickCount)}{' '}
              <span className="text-sm text-gray-400">({formatPercent(clickRate)})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
