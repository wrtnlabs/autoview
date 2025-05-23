import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4OneTimeMsgUserView {
                    oneTimeMsgUser?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4OneTimeMsgUser;
                }
            }
        }
        export namespace v4 {
            export namespace marketing {
                export interface LegacyV4OneTimeMsgUser {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4OneTimeMsgUserView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data extraction and derived metrics
  const user = value.oneTimeMsgUser;
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={32} className="mb-2" />
        <span>No message data available</span>
      </div>
    );
  }

  const {
    sent = 0,
    view = 0,
    click = 0,
    goal = 0,
  } = user;

  // Calculate rates (guard against division by zero)
  const viewRate = sent > 0 ? (view / sent) * 100 : 0;
  const clickRate = view > 0 ? (click / view) * 100 : 0;
  const overallClickRate = sent > 0 ? (click / sent) * 100 : 0;

  // 2. Compose the visual structure
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        One-Time Message Metrics
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="flex flex-col items-center">
          <LucideReact.Send size={20} className="text-indigo-500 mb-1" />
          <span className="text-xl font-medium text-gray-900">{sent}</span>
          <span className="text-sm text-gray-500">Sent</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.Eye size={20} className="text-blue-500 mb-1" />
          <span className="text-xl font-medium text-gray-900">{view}</span>
          <span className="text-sm text-gray-500">Viewed</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.MousePointer size={20} className="text-green-500 mb-1" />
          <span className="text-xl font-medium text-gray-900">{click}</span>
          <span className="text-sm text-gray-500">Clicks</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.Target size={20} className="text-amber-500 mb-1" />
          <span className="text-xl font-medium text-gray-900">{goal}</span>
          <span className="text-sm text-gray-500">Goal</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="flex items-center justify-center space-x-1">
          <span className="text-sm font-medium text-gray-700">View Rate:</span>
          <span className="text-sm text-gray-900">
            {viewRate.toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <span className="text-sm font-medium text-gray-700">Click Rate:</span>
          <span className="text-sm text-gray-900">
            {clickRate.toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <span className="text-sm font-medium text-gray-700">Overall CTR:</span>
          <span className="text-sm text-gray-900">
            {overallClickRate.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
