import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4CampaignUserView {
                    campaignUser?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4CampaignUser;
                }
            }
        }
        export namespace v4 {
            export namespace marketing {
                export interface LegacyV4CampaignUser {
                    campaignId?: string;
                    userId?: string;
                    msgId?: string;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4CampaignUserView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data extraction and formatting helpers
  const campaignUser = value.campaignUser;
  const formatNumber = (num?: number): string => num !== undefined ? num.toLocaleString() : "";
  
  if (!campaignUser) {
    // Empty state when there's no data
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <LucideReact.AlertCircle size={24} className="text-gray-400" />
        <span className="mt-2 text-sm text-gray-500">No campaign data available.</span>
      </div>
    );
  }

  // Destructure only the informative fields
  const { campaignId, sent, view, click, goal } = campaignUser;

  // Prepare a list of metrics to display, omitting undefined values
  const metrics: {
    key: string;
    value: number;
    icon: JSX.Element;
  }[] = [
    { key: "Sent", value: sent ?? -1, icon: <LucideReact.Send size={16} className="text-blue-500" /> },
    { key: "Views", value: view ?? -1, icon: <LucideReact.Eye size={16} className="text-indigo-500" /> },
    { key: "Clicks", value: click ?? -1, icon: <LucideReact.MousePointer size={16} className="text-green-500" /> },
    { key: "Goal", value: goal ?? -1, icon: <LucideReact.Flag size={16} className="text-amber-500" /> },
  ].filter(metric => metric.value >= 0);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      {/* Header: Campaign Identifier */}
      {campaignId && (
        <div className="text-xs font-mono text-gray-500 truncate">
          Campaign: {campaignId}
        </div>
      )}

      {/* Metrics Grid */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {metrics.map(({ key, value, icon }) => (
          <div key={key} className="flex items-center space-x-2">
            {icon}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {formatNumber(value)}
              </span>
              <span className="text-[10px] uppercase text-gray-400">
                {key}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
