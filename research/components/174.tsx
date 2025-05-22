import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4CampaignView = {
                    campaign?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4Campaign;
                    msgs?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4CampaignMsg[];
                };
            }
        }
        export namespace v4 {
            export namespace marketing {
                /**
                 * ### 이벤트 기록
                 *
                 * - 마케팅 이벤트 기록에 대한 [문서](https://www.notion.so/channelio/e5d745446b6342198e9e5b004e48d312)
                */
                export type LegacyV4Campaign = {
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
                    goalEventName?: string;
                    goalEventQuery?: AutoViewInputSubTypes.Expression;
                    advertising: boolean;
                    enableSupportBot: boolean;
                    followingSupportBotId?: string;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    cooldown?: string;
                    sendMode: "always" | "away" | "inOperation" | "customUsingSenderTime" | "customUsingReceiverTime" | "custom";
                    sendTimeRanges?: AutoViewInputSubTypes.TimeRange[];
                    startAt?: number;
                    endAt?: number;
                    draft?: AutoViewInputSubTypes.marketing.CampaignDraft;
                    createdAt?: number;
                    updatedAt?: number;
                    sent?: number & tags.Type<"int32">;
                    view?: number & tags.Type<"int32">;
                    goal?: number & tags.Type<"int32">;
                    click?: number & tags.Type<"int32">;
                    userChatExpireDuration?: string;
                    managerId?: string;
                };
                export type LegacyV4CampaignMsg = {
                    id: string;
                    campaignId?: string;
                    name: string;
                    sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
                    settings?: AutoViewInputSubTypes.marketing.SendMediumSettings;
                    createdAt?: number;
                    updatedAt?: number;
                    sent?: number & tags.Type<"int32">;
                    view?: number & tags.Type<"int32">;
                    goal?: number & tags.Type<"int32">;
                    click?: number & tags.Type<"int32">;
                };
            }
        }
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
    export type TimeRange = {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    };
    export namespace marketing {
        export type CampaignDraft = {
            campaign: AutoViewInputSubTypes.marketing.Campaign;
            msgs: AutoViewInputSubTypes.marketing.CampaignMsg[] & tags.MinItems<1> & tags.MaxItems<4>;
        };
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
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4CampaignView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const campaign = value.campaign;
  const messages = value.msgs ?? [];

  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateMap: Record<string, { label: string; tw: string }> = {
    draft: { label: 'Draft', tw: 'bg-gray-200 text-gray-800' },
    active: { label: 'Active', tw: 'bg-green-100 text-green-800' },
    stopped: { label: 'Stopped', tw: 'bg-yellow-100 text-yellow-800' },
    removed: { label: 'Removed', tw: 'bg-red-100 text-red-800' },
  };
  const mediumMap: Record<string, string> = {
    appAlimtalk: 'Alimtalk',
    appLine: 'Line',
    email: 'Email',
    inAppChat: 'In-App Chat',
    xms: 'XMS',
  };
  const formatDate = (ts?: number) =>
    ts
      ? new Date(ts).toLocaleString([], {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      : null;
  const formatNumber = (num: number) => num.toLocaleString();
  const totalSent =
    campaign?.sent ?? messages.reduce((sum, m) => sum + (m.sent ?? 0), 0);
  const totalViews =
    campaign?.view ?? messages.reduce((sum, m) => sum + (m.view ?? 0), 0);
  const totalClicks =
    campaign?.click ?? messages.reduce((sum, m) => sum + (m.click ?? 0), 0);

  // Handle missing campaign data
  if (!campaign) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No campaign data available
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <header>
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {campaign.name}
        </h2>
        <div className="flex items-center space-x-2 mt-2">
          {campaign.state && stateMap[campaign.state] && (
            <span
              className={
                `px-2 py-1 text-xs font-medium rounded ` +
                stateMap[campaign.state].tw
              }
            >
              {stateMap[campaign.state].label}
            </span>
          )}
          {campaign.sendMedium && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
              {mediumMap[campaign.sendMedium]}
            </span>
          )}
        </div>
        {(campaign.startAt || campaign.endAt) && (
          <div className="mt-2 text-sm text-gray-600">
            {campaign.startAt && (
              <span>Start: {formatDate(campaign.startAt)}</span>
            )}
            {campaign.endAt && (
              <span className="ml-4">End: {formatDate(campaign.endAt)}</span>
            )}
          </div>
        )}
      </header>

      {/* Metrics */}
      <section className="mt-4 grid grid-cols-3 text-center">
        <div>
          <div className="text-lg font-bold text-gray-800">
            {formatNumber(totalSent)}
          </div>
          <div className="text-xs text-gray-500">Sent</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-800">
            {formatNumber(totalViews)}
          </div>
          <div className="text-xs text-gray-500">Views</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-800">
            {formatNumber(totalClicks)}
          </div>
          <div className="text-xs text-gray-500">Clicks</div>
        </div>
      </section>

      {/* Messages List */}
      {messages.length > 0 && (
        <section className="mt-6">
          <h3 className="text-md font-medium text-gray-700">
            Messages ({messages.length})
          </h3>
          <ul className="mt-2 space-y-2">
            {messages.map((msg, idx) => (
              <li
                key={idx}
                className="p-3 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-800 truncate">
                    {msg.name}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {mediumMap[msg.sendMedium]}
                  </span>
                </div>
                <div className="mt-2 sm:mt-0 flex space-x-4 text-xs text-gray-600">
                  <div>Sent: {formatNumber(msg.sent ?? 0)}</div>
                  <div>Views: {formatNumber(msg.view ?? 0)}</div>
                  <div>Clicks: {formatNumber(msg.click ?? 0)}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
