import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4CampaignUserView = {
          campaignUser?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4CampaignUser;
        };
      }
    }
    export namespace v4 {
      export namespace marketing {
        export type LegacyV4CampaignUser = {
          campaignId?: string;
          userId?: string;
          msgId?: string;
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
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4CampaignUserView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data extraction and derived metrics
  const campaign = value.campaignUser;
  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No campaign data</span>
      </div>
    );
  }

  const sent = campaign.sent ?? 0;
  const views = campaign.view ?? 0;
  const clicks = campaign.click ?? 0;
  const goal = campaign.goal ?? 0;
  const openRate = sent > 0 ? (views / sent) * 100 : 0;
  const clickRate = sent > 0 ? (clicks / sent) * 100 : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
        <LucideReact.BarChart2 className="mr-2 text-indigo-500" size={20} />
        Campaign Metrics
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <LucideReact.Send className="text-blue-500" size={16} />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Sent</div>
            <div className="text-lg font-medium text-gray-800">
              {sent.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <LucideReact.Eye className="text-green-500" size={16} />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Views</div>
            <div className="text-lg font-medium text-gray-800">
              {views.toLocaleString()}{" "}
              <span className="text-sm text-gray-500">
                ({openRate.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <LucideReact.MousePointer className="text-purple-500" size={16} />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Clicks</div>
            <div className="text-lg font-medium text-gray-800">
              {clicks.toLocaleString()}{" "}
              <span className="text-sm text-gray-500">
                ({clickRate.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <LucideReact.Target className="text-red-500" size={16} />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Goal</div>
            <div className="text-lg font-medium text-gray-800">
              {goal.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
