import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace open {
        export namespace marketing {
            export type CampaignsView = {
                next?: number;
                campaigns?: AutoViewInputSubTypes.marketing.Campaign[];
                msgs?: AutoViewInputSubTypes.marketing.CampaignMsg[];
            };
        }
    }
    export namespace marketing {
        /**
         * ### 이벤트 기록
         *
         * - 마케팅 이벤트 기록에 대한 [문서](https://www.notion.so/channelio/e5d745446b6342198e9e5b004e48d312)
        */
        export type Campaign = {
            id?: string;
            channelId?: string;
            name: string;
            state?: "draft" | "active" | "stopped" | "removed";
            sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            userQuery?: AutoViewInputSubTypes.Expression;
            triggerEventName: string;
            triggerEventQuery?: AutoViewInputSubTypes.Expression;
            waitingTime: string;
            filterEventName?: string;
            filterEventQuery?: AutoViewInputSubTypes.Expression;
            filterMatch?: "positive" | "negative";
            filterHpc?: AutoViewInputSubTypes.marketing.HoldingPropertyConstant;
            goalEventName?: string;
            goalEventQuery?: AutoViewInputSubTypes.Expression;
            goalEventDuration?: string;
            goalHpc?: AutoViewInputSubTypes.marketing.HoldingPropertyConstant;
            advertising: boolean;
            sendToOfflineXms?: boolean;
            sendToOfflineEmail?: boolean;
            cooldown?: string;
            sendMode: "always" | "away" | "inOperation" | "customUsingSenderTime" | "customUsingReceiverTime" | "custom";
            channelOperationId?: string;
            sendTimeRanges?: AutoViewInputSubTypes.TimeRange[];
            startAt?: number;
            endAt?: number;
            deleteMessageAfterStop?: boolean;
            draft?: AutoViewInputSubTypes.marketing.CampaignDraft;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
            userChatExpireDuration?: string;
            managerId?: string;
            recipeCaseId?: string;
        };
        export type HoldingPropertyConstant = {
            baseEventName: string;
            baseEventKey: string;
            eventQuery?: AutoViewInputSubTypes.Expression;
            baseEventType: "triggerEvent" | "additionalFilter";
            operator?: AutoViewInputSubTypes.EventSchema;
            values?: {};
        };
        export type CampaignDraft = {
            campaign: AutoViewInputSubTypes.marketing.Campaign;
            msgs: AutoViewInputSubTypes.marketing.CampaignMsg[] & tags.MinItems<1> & tags.MaxItems<4>;
        };
        export type CampaignMsg = {
            id: string;
            campaignId?: string;
            channelId?: string;
            name: string;
            sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            settings: AutoViewInputSubTypes.marketing.SendMediumSettings;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
        };
        export type SendMediumSettings = {
            type: string;
        };
    }
    export type Expression = {
        key?: string;
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        operator?: AutoViewInputSubTypes.Operator;
        values?: {}[];
        and?: AutoViewInputSubTypes.Expression[];
        or?: AutoViewInputSubTypes.Expression[];
    };
    export type Operator = {};
    export type EventSchema = {
        id?: string;
        channelId?: string;
        eventName?: string;
        key?: string;
        parentKey?: string;
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        createdAt?: number;
        updatedAt?: number;
        icon?: string;
    };
    export type TimeRange = {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.CampaignsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCampaigns = value.campaigns?.length ?? 0;

  const formatNumber = (n?: number & number): string =>
    n === undefined
      ? '-'
      : n >= 1000
      ? (n / 1000).toFixed(1) + 'k'
      : String(n);

  const formatDate = (ts?: number): string =>
    ts
      ? new Date(ts).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '-';

  const formatMedium = (m: string): string =>
    m
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (s) => s.toUpperCase());

  const stateColors: Record<string, string> = {
    draft: 'bg-gray-200 text-gray-800',
    active: 'bg-green-200 text-green-800',
    stopped: 'bg-yellow-200 text-yellow-800',
    removed: 'bg-red-200 text-red-800',
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4 text-gray-900">
        Campaigns ({totalCampaigns})
      </h2>

      {totalCampaigns > 0 ? (
        <div className="space-y-4">
          {value.campaigns!.map((c, idx) => {
            const stateClass = c.state
              ? stateColors[c.state] || 'bg-gray-100 text-gray-600'
              : 'bg-gray-100 text-gray-600';
            return (
              <div
                key={c.id ?? c.name ?? idx}
                className="p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-md font-semibold text-gray-900 truncate">
                    {c.name}
                  </h3>
                  <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                    <span
                      className={
                        'px-2 py-1 text-xs font-semibold rounded ' + stateClass
                      }
                    >
                      {c.state ?? 'unknown'}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {formatMedium(c.sendMedium)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Trigger:</span>{' '}
                    {c.triggerEventName}
                  </p>
                  <p>
                    <span className="font-medium">Wait:</span> {c.waitingTime}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(c.sent)}
                    </span>{' '}
                    Sent
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(c.view)}
                    </span>{' '}
                    Views
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(c.click)}
                    </span>{' '}
                    Clicks
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(c.goal)}
                    </span>{' '}
                    Goals
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  Created: {formatDate(c.createdAt)}
                  {c.updatedAt ? ` • Updated: ${formatDate(c.updatedAt)}` : ''}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No campaigns available.</p>
      )}

      {value.next !== undefined && (
        <div className="mt-6 text-center">
          <span className="text-sm text-blue-600">
            More campaigns available...
          </span>
        </div>
      )}
    </div>
  );
}
