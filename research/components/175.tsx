import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4CampaignUserView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const campaign = value.campaignUser;
  // Formatter for numbers
  const numberFormatter = new Intl.NumberFormat(undefined);
  // Helper to format percentage
  const formatPercent = (part: number, total: number): string =>
    total > 0 ? `${((part / total) * 100).toFixed(1)}%` : '0%';

  if (!campaign) {
    // No data available case
    return (
      <div className="p-4 text-center text-gray-500">
        No campaign data available.
      </div>
    );
  }

  // Safely extract metrics with defaults
  const sent    = campaign.sent    ?? 0;
  const views   = campaign.view    ?? 0;
  const clicks  = campaign.click   ?? 0;
  const goal    = campaign.goal    ?? 0;
  const viewRate  = formatPercent(views, sent);
  const clickRate = formatPercent(clicks, sent);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">
        Campaign User Metrics
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <div className="text-sm text-gray-500">Sent</div>
          <div className="mt-1 text-lg font-semibold text-gray-800">
            {numberFormatter.format(sent)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Views</div>
          <div className="mt-1 text-lg font-semibold text-gray-800">
            {numberFormatter.format(views)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Clicks</div>
          <div className="mt-1 text-lg font-semibold text-gray-800">
            {numberFormatter.format(clicks)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Goals</div>
          <div className="mt-1 text-lg font-semibold text-gray-800">
            {numberFormatter.format(goal)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">View Rate</div>
          <div className="mt-1 text-lg font-semibold text-gray-800">
            {viewRate}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Click Rate</div>
          <div className="mt-1 text-lg font-semibold text-gray-800">
            {clickRate}
          </div>
        </div>
      </div>
    </div>
  );
}
