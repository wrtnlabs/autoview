import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
          sendMode:
            | "always"
            | "away"
            | "inOperation"
            | "customUsingSenderTime"
            | "customUsingReceiverTime"
            | "custom";
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
    type?:
      | "boolean"
      | "date"
      | "datetime"
      | "list"
      | "listOfNumber"
      | "number"
      | "string"
      | "listOfObject";
    operator?: AutoViewInputSubTypes.Operator;
    values?: {}[];
    and?: AutoViewInputSubTypes.Expression[];
    or?: AutoViewInputSubTypes.Expression[];
  };
  export type Operator = {};
  export type TimeRange = {
    dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] &
      tags.UniqueItems;
    from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
  };
  export namespace marketing {
    export type CampaignDraft = {
      campaign: AutoViewInputSubTypes.marketing.Campaign;
      msgs: AutoViewInputSubTypes.marketing.CampaignMsg[] &
        tags.MinItems<1> &
        tags.MaxItems<4>;
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
      sendMode:
        | "always"
        | "away"
        | "inOperation"
        | "customUsingSenderTime"
        | "customUsingReceiverTime"
        | "custom";
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
    type?:
      | "boolean"
      | "date"
      | "datetime"
      | "list"
      | "listOfNumber"
      | "number"
      | "string"
      | "listOfObject";
    createdAt?: number;
    updatedAt?: number;
    icon?: string;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4CampaignView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const campaign = value.campaign;
  const msgs = value.msgs ?? [];

  // Helper: format timestamp to readable date
  function formatDate(ts?: number): string {
    if (!ts) return "-";
    return new Date(ts).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Helper: format large numbers with K suffix
  function formatNumber(n?: number): string {
    if (n == null) return "-";
    return n >= 1000 ? (n / 1000).toFixed(1) + "K" : n.toString();
  }

  // Helper: minutes -> "HH:MM"
  function formatHM(mins?: number): string {
    if (mins == null) return "-";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  }

  // State badge mapping
  const stateMap: Record<string, { label: string; color: string }> = {
    draft: { label: "Draft", color: "bg-gray-200 text-gray-800" },
    active: { label: "Active", color: "bg-green-100 text-green-800" },
    stopped: { label: "Stopped", color: "bg-yellow-100 text-yellow-800" },
    removed: { label: "Removed", color: "bg-red-100 text-red-800" },
  };

  // Icon for sendMedium
  const mediumIcon: Record<string, React.ReactNode> = {
    email: <LucideReact.Mail size={16} className="text-blue-500" />,
    inAppChat: (
      <LucideReact.MessageSquare size={16} className="text-indigo-500" />
    ),
    appAlimtalk: <LucideReact.Bell size={16} className="text-orange-500" />,
    appLine: <LucideReact.MessageCircle size={16} className="text-green-500" />,
    xms: <LucideReact.AtSign size={16} className="text-purple-500" />,
  };

  // If no campaign data
  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <LucideReact.AlertCircle size={48} className="text-gray-300" />
        <p className="mt-4 text-gray-600">No campaign data available.</p>
      </div>
    );
  }

  const stateInfo = stateMap[campaign.state ?? ""] ?? {
    label: "Unknown",
    color: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {campaign.name}
          </h2>
          <div className="mt-2 flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${stateInfo.color}`}
            >
              {stateInfo.label}
            </span>
            <div className="flex items-center text-sm text-gray-600">
              {mediumIcon[campaign.sendMedium]}
              <span className="ml-1">{campaign.sendMedium}</span>
            </div>
          </div>
        </div>
        <div className="ml-4 text-right text-xs text-gray-500">
          <div>Created: {formatDate(campaign.createdAt)}</div>
          <div>Updated: {formatDate(campaign.updatedAt)}</div>
        </div>
      </div>

      {/* Trigger & Timing */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <div className="font-medium">Trigger Event</div>
          <div className="mt-1 truncate">{campaign.triggerEventName}</div>
        </div>
        <div>
          <div className="font-medium">Wait Time</div>
          <div className="mt-1">{campaign.waitingTime}</div>
        </div>
        {campaign.sendTimeRanges && campaign.sendTimeRanges.length > 0 && (
          <div className="col-span-2">
            <div className="font-medium">Send Time Ranges</div>
            <div className="mt-1 space-y-1">
              {campaign.sendTimeRanges.map((r, i) => (
                <div key={i} className="text-sm text-gray-600">
                  {r.dayOfWeeks.join(", ")}: {formatHM(r.from)}–{formatHM(r.to)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="flex items-center justify-around py-2 bg-gray-50 rounded">
        <div className="flex items-center text-gray-700">
          <LucideReact.Send size={16} className="mr-1 text-blue-500" />
          <span>{formatNumber(campaign.sent)}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.Eye size={16} className="mr-1 text-green-500" />
          <span>{formatNumber(campaign.view)}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.Target size={16} className="mr-1 text-purple-500" />
          <span>{formatNumber(campaign.goal)}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.MousePointer
            size={16}
            className="mr-1 text-yellow-500"
          />
          <span>{formatNumber(campaign.click)}</span>
        </div>
      </div>

      {/* Messages */}
      {msgs.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Messages</h3>
          <ul className="space-y-2">
            {msgs.map((m) => (
              <li
                key={m.id}
                className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 truncate">
                    {m.name}
                  </span>
                  <div className="flex items-center text-gray-600 text-xs">
                    {mediumIcon[m.sendMedium]}
                    <span className="ml-1">{m.sendMedium}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-gray-600 text-xs">
                  <div className="flex items-center">
                    <LucideReact.Send
                      size={14}
                      className="mr-1 text-blue-400"
                    />
                    <span>{formatNumber(m.sent)}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Eye
                      size={14}
                      className="mr-1 text-green-400"
                    />
                    <span>{formatNumber(m.view)}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Target
                      size={14}
                      className="mr-1 text-purple-400"
                    />
                    <span>{formatNumber(m.goal)}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.MousePointer
                      size={14}
                      className="mr-1 text-yellow-400"
                    />
                    <span>{formatNumber(m.click)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
