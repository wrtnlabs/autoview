import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace open {
    export namespace marketing {
      export type CampaignUserView = {
        campaignUser?: AutoViewInputSubTypes.marketing.CampaignUser;
      };
    }
  }
  export namespace marketing {
    export type CampaignUser = {
      campaignId?: string;
      userId?: string;
      msgId?: string;
      userChatId?: string;
      sent?: number;
      view?: number;
      goal?: number;
      click?: number;
      version?: number & tags.Type<"int32">;
      id?: string;
      campaignMessageView?: boolean;
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.open.marketing.CampaignUserView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive metrics with safe defaults
  const user = value.campaignUser;
  const sent = user?.sent ?? 0;
  const views = user?.view ?? 0;
  const clicks = user?.click ?? 0;
  const goal = user?.goal ?? 0;
  const viewedStatus = user?.campaignMessageView ?? false;

  const viewRate = sent > 0 ? (views / sent) * 100 : 0;
  const clickRate = views > 0 ? (clicks / views) * 100 : 0;
  const goalProgress = goal > 0 ? (views / goal) * 100 : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {!user ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <LucideReact.AlertCircle size={32} className="mb-2" />
          <span>No campaign data available</span>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Sent & Views */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center gap-1">
              <LucideReact.Send size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                Sent: {sent}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Eye size={16} className="text-green-500" />
              <span className="text-sm font-medium text-gray-700">
                Views: {views} ({viewRate.toFixed(1)}%)
              </span>
            </div>
          </div>

          {/* Clicks & Goal */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center gap-1">
              <LucideReact.MousePointer size={16} className="text-purple-500" />
              <span className="text-sm font-medium text-gray-700">
                Clicks: {clicks} ({clickRate.toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Target size={16} className="text-orange-500" />
              <span className="text-sm font-medium text-gray-700">
                Goal: {goal}
              </span>
            </div>
          </div>

          {/* Goal Progress Bar */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Goal Progress
              </span>
              <span className="text-xs text-gray-500">
                {goalProgress.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
              <div
                className="bg-blue-500 h-2"
                style={{ width: `${Math.min(goalProgress, 100)}%` }}
              />
            </div>
          </div>

          {/* Message Viewed Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Message Viewed:
            </span>
            {viewedStatus ? (
              <LucideReact.CheckCircle size={16} className="text-green-500" />
            ) : (
              <LucideReact.XCircle size={16} className="text-red-500" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
