import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4CampaignsView = {
                    campaigns?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4Campaign[];
                    msgs?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4CampaignMsg[];
                    next?: number;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4CampaignsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data extraction and derived functions
  const campaigns = value.campaigns ?? [];
  const msgs = value.msgs ?? [];
  const nextToken = value.next;

  const formatDate = (ts?: number) =>
    ts
      ? new Date(ts).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "-";

  const formatNumber = (num?: number) =>
    num != null ? num.toLocaleString() : "0";

  const stateColor: Record<string, string> = {
    draft: "bg-gray-200 text-gray-800",
    active: "bg-green-100 text-green-800",
    stopped: "bg-yellow-100 text-yellow-800",
    removed: "bg-red-100 text-red-800",
  };

  const mediumLabel: Record<string, string> = {
    appAlimtalk: "App Alimtalk",
    appLine: "App Line",
    email: "Email",
    inAppChat: "In-App Chat",
    xms: "XMS",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-8">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Campaigns ({campaigns.length})
        </h2>
        <h2 className="mt-2 sm:mt-0 text-xl font-semibold text-gray-900">
          Messages ({msgs.length})
        </h2>
      </div>

      {/* Campaigns List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((camp) => (
          <div
            key={camp.id ?? Math.random()}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {camp.name}
              </h3>
              {camp.state && (
                <span
                  className={`px-2 py-0.5 text-xs font-semibold uppercase rounded ${stateColor[camp.state] ||
                    "bg-gray-100 text-gray-800"}`}
                >
                  {camp.state}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {mediumLabel[camp.sendMedium] || camp.sendMedium}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {formatDate(camp.startAt)} – {formatDate(camp.endAt)}
            </p>
            <div className="mt-4 flex space-x-4 text-sm text-gray-700">
              <div>
                <span className="font-semibold">{formatNumber(camp.sent)}</span>{" "}
                Sent
              </div>
              <div>
                <span className="font-semibold">{formatNumber(camp.view)}</span>{" "}
                Viewed
              </div>
              <div>
                <span className="font-semibold">{formatNumber(camp.click)}</span>{" "}
                Clicked
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {msgs.map((msg) => (
          <div
            key={msg.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {msg.name}
              </h3>
              <span className="text-xs text-gray-500">
                {mediumLabel[msg.sendMedium] || msg.sendMedium}
              </span>
            </div>
            <div className="mt-4 flex space-x-4 text-sm text-gray-700">
              <div>
                <span className="font-semibold">{formatNumber(msg.sent)}</span>{" "}
                Sent
              </div>
              <div>
                <span className="font-semibold">{formatNumber(msg.view)}</span>{" "}
                Viewed
              </div>
              <div>
                <span className="font-semibold">{formatNumber(msg.click)}</span>{" "}
                Clicked
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Return the React element. */}
      {nextToken != null && (
        <div className="text-right text-sm text-gray-500">
          Next Token: <span className="font-medium">{nextToken}</span>
        </div>
      )}
    </div>
  );
}
