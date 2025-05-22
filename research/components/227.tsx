import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.CampaignUserView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const campaignUser = value.campaignUser;
  if (!campaignUser) {
    return (
      <div className="p-4 text-center text-gray-500">
        No campaign data available.
      </div>
    );
  }

  const {
    sent = 0,
    view = 0,
    click = 0,
    goal = 0,
    campaignMessageView,
  } = campaignUser;

  const openRate = sent > 0 ? (view / sent) * 100 : 0;
  const clickThroughRate = view > 0 ? (click / view) * 100 : 0;

  const formatNumber = (n: number) => n.toLocaleString();
  const formatPercent = (n: number) => `${n.toFixed(1)}%`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Campaign Metrics</h2>
        {campaignMessageView != null && (
          <span
            className={
              "px-2 py-1 text-xs font-medium rounded " +
              (campaignMessageView
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800")
            }
          >
            {campaignMessageView ? "Message Viewed" : "Not Viewed"}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Sent</p>
          <p className="text-xl font-semibold text-gray-900">
            {formatNumber(sent)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Views</p>
          <p className="text-xl font-semibold text-gray-900">
            {formatNumber(view)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Clicks</p>
          <p className="text-xl font-semibold text-gray-900">
            {formatNumber(click)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Goal</p>
          <p className="text-xl font-semibold text-gray-900">
            {formatNumber(goal)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Open Rate</p>
          <p className="text-xl font-semibold text-gray-900">
            {formatPercent(openRate)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Click-Through Rate</p>
          <p className="text-xl font-semibold text-gray-900">
            {formatPercent(clickThroughRate)}
          </p>
        </div>
      </div>
    </div>
  );
}
