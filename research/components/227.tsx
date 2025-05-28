import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace open {
        export namespace marketing {
            export interface CampaignUserView {
                campaignUser?: AutoViewInputSubTypes.marketing.CampaignUser;
            }
        }
    }
    export namespace marketing {
        export interface CampaignUser {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.CampaignUserView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const campaign = value.campaignUser;
  // 1. Handle missing data
  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No campaign data available</span>
      </div>
    );
  }

  // 2. Derive and format metrics
  const {
    sent = 0,
    view = 0,
    click = 0,
    goal = 0,
  } = campaign;
  const openRate = sent > 0 ? (view / sent) * 100 : 0;
  const clickThroughRate = view > 0 ? (click / view) * 100 : 0;

  // 3. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">Campaign Metrics</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Sent */}
        <div className="flex items-center space-x-2">
          <LucideReact.Send className="text-gray-500" size={20} />
          <div>
            <div className="text-sm text-gray-500">Sent</div>
            <div className="font-medium text-gray-800">{sent.toLocaleString()}</div>
          </div>
        </div>
        {/* Views */}
        <div className="flex items-center space-x-2">
          <LucideReact.Eye className="text-gray-500" size={20} />
          <div>
            <div className="text-sm text-gray-500">Views</div>
            <div className="font-medium text-gray-800">{view.toLocaleString()}</div>
          </div>
        </div>
        {/* Clicks */}
        <div className="flex items-center space-x-2">
          <LucideReact.MousePointer className="text-gray-500" size={20} />
          <div>
            <div className="text-sm text-gray-500">Clicks</div>
            <div className="font-medium text-gray-800">{click.toLocaleString()}</div>
          </div>
        </div>
        {/* Goal */}
        <div className="flex items-center space-x-2">
          <LucideReact.Target className="text-gray-500" size={20} />
          <div>
            <div className="text-sm text-gray-500">Goal</div>
            <div className="font-medium text-gray-800">{goal.toLocaleString()}</div>
          </div>
        </div>
        {/* Open Rate */}
        <div className="flex items-center space-x-2">
          <LucideReact.Percent className="text-gray-500" size={20} />
          <div>
            <div className="text-sm text-gray-500">Open Rate</div>
            <div className="font-medium text-gray-800">{openRate.toFixed(1)}%</div>
          </div>
        </div>
        {/* Click‐Through Rate */}
        <div className="flex items-center space-x-2">
          <LucideReact.TrendingUp className="text-gray-500" size={20} />
          <div>
            <div className="text-sm text-gray-500">Click-Through Rate</div>
            <div className="font-medium text-gray-800">{clickThroughRate.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
