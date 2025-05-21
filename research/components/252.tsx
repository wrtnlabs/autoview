import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.OneTimeMsgUserView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data extraction and derived metrics
  const userData = value.oneTimeMsgUser;
  if (!userData) {
    return (
      <div className="p-4 bg-white rounded-md shadow-sm text-center text-gray-500">
        No data available
      </div>
    );
  }

  const sent = userData.sent ?? 0;
  const views = userData.view ?? 0;
  const clicks = userData.click ?? 0;
  const goal = userData.goal ?? 0;

  const viewRate = sent > 0 ? (views / sent) * 100 : 0;
  const clickRate = sent > 0 ? (clicks / sent) * 100 : 0;
  const goalProgress = goal > 0 ? (clicks / goal) * 100 : 0;

  const formatNumber = (n: number) => new Intl.NumberFormat('en-US').format(n);
  const formatPercent = (p: number) => `${p.toFixed(1)}%`;

  const msgId = userData.oneTimeMsgId ?? '—';

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Message Metrics</h2>
      <div className="text-sm text-gray-600 mb-4">
        Campaign ID:{' '}
        <span className="font-medium text-gray-800 truncate">{msgId}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <div className="text-gray-500 text-xs uppercase">Sent</div>
          <div className="text-xl font-semibold text-gray-900">
            {formatNumber(sent)}
          </div>
        </div>

        <div>
          <div className="text-gray-500 text-xs uppercase">Views</div>
          <div className="text-xl font-semibold text-gray-900">
            {formatNumber(views)}
          </div>
        </div>

        <div>
          <div className="text-gray-500 text-xs uppercase">Clicks</div>
          <div className="text-xl font-semibold text-gray-900">
            {formatNumber(clicks)}
          </div>
        </div>

        <div>
          <div className="text-gray-500 text-xs uppercase">Goal</div>
          <div className="text-xl font-semibold text-gray-900">
            {goal > 0 ? formatNumber(goal) : '—'}
          </div>
        </div>

        <div>
          <div className="text-gray-500 text-xs uppercase">View Rate</div>
          <div className="text-xl font-semibold text-gray-900">
            {sent > 0 ? formatPercent(viewRate) : '—'}
          </div>
        </div>

        <div>
          <div className="text-gray-500 text-xs uppercase">Click Rate</div>
          <div className="text-xl font-semibold text-gray-900">
            {sent > 0 ? formatPercent(clickRate) : '—'}
          </div>
        </div>
      </div>

      {goal > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1 text-sm text-gray-600">
            <span>Goal Progress</span>
            <span className="font-medium text-gray-800">
              {formatPercent(Math.min(goalProgress, 100))}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(goalProgress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
