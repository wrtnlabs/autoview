import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4OneTimeMsgUserView;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const stats = value.oneTimeMsgUser;
  if (!stats) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-center">No performance data available.</p>
      </div>
    );
  }

  const sent = stats.sent ?? 0;
  const view = stats.view ?? 0;
  const click = stats.click ?? 0;
  const goal = stats.goal ?? 0;

  const viewRate = sent > 0 ? (view / sent) * 100 : 0;
  const clickRate = sent > 0 ? (click / sent) * 100 : 0;
  const goalProgress = goal > 0 ? (sent / goal) * 100 : 0;

  const formatNumber = (num: number): string => num.toLocaleString();
  const formatPercent = (num: number): string => `${num.toFixed(1)}%`;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Message Performance</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-blue-600">{formatNumber(sent)}</span>
          <span className="text-sm text-gray-500">Sent</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-green-600">{formatNumber(view)}</span>
          <span className="text-sm text-gray-500">Views</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-indigo-600">{formatNumber(click)}</span>
          <span className="text-sm text-gray-500">Clicks</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-purple-600">
            {goal > 0 ? formatNumber(goal) : '—'}
          </span>
          <span className="text-sm text-gray-500">Goal</span>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>View Rate</span>
            <span>{sent > 0 ? formatPercent(viewRate) : '—'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-500 h-2"
              style={{ width: `${sent > 0 ? viewRate : 0}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Click Rate</span>
            <span>{sent > 0 ? formatPercent(clickRate) : '—'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-500 h-2"
              style={{ width: `${sent > 0 ? clickRate : 0}%` }}
            />
          </div>
        </div>

        {goal > 0 && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Goal Progress</span>
              <span>{formatPercent(goalProgress)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-2"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
