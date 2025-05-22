import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4CampaignsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (ts?: number) =>
    ts
      ? new Date(ts).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const getStateInfo = (state?: string) => {
    switch (state) {
      case "draft":
        return {
          label: "Draft",
          icon: <LucideReact.Edit2 size={16} className="text-gray-500" />,
        };
      case "active":
        return {
          label: "Active",
          icon: (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ),
        };
      case "stopped":
        return {
          label: "Stopped",
          icon: (
            <LucideReact.PauseCircle size={16} className="text-yellow-500" />
          ),
        };
      case "removed":
        return {
          label: "Removed",
          icon: <LucideReact.XCircle size={16} className="text-red-500" />,
        };
      default:
        return {
          label: "Unknown",
          icon: <LucideReact.HelpCircle size={16} className="text-gray-400" />,
        };
    }
  };

  const getMediumIcon = (m?: string) => {
    switch (m) {
      case "email":
        return <LucideReact.Mail size={16} className="text-blue-500" />;
      case "inAppChat":
        return (
          <LucideReact.MessageSquare size={16} className="text-indigo-500" />
        );
      case "appAlimtalk":
        return (
          <LucideReact.MessageSquare size={16} className="text-green-500" />
        );
      case "appLine":
        return (
          <LucideReact.MessageSquare size={16} className="text-green-400" />
        );
      case "xms":
        return (
          <LucideReact.MessageSquare size={16} className="text-purple-500" />
        );
      default:
        return (
          <LucideReact.MessageSquare size={16} className="text-gray-400" />
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const hasCampaigns =
    Array.isArray(value.campaigns) && value.campaigns.length > 0;
  const hasMsgs = Array.isArray(value.msgs) && value.msgs.length > 0;
  if (!hasCampaigns && !hasMsgs) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2">No data available.</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      {hasCampaigns && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Campaigns
          </h2>
          <div className="space-y-4">
            {value.campaigns!.map((c) => {
              const state = getStateInfo(c.state);
              return (
                <div
                  key={c.id ?? c.name}
                  className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0"
                >
                  <div className="flex items-center space-x-2 truncate">
                    {getMediumIcon(c.sendMedium)}
                    <span className="font-medium text-gray-900 truncate">
                      {c.name}
                    </span>
                    <span className="ml-2 flex items-center space-x-1 text-sm">
                      {state.icon}
                      <span>{state.label}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <LucideReact.Send size={16} className="text-gray-500" />
                      <span>{c.sent ?? 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <LucideReact.Eye size={16} className="text-gray-500" />
                      <span>{c.view ?? 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <LucideReact.Target size={16} className="text-gray-500" />
                      <span>{c.goal ?? 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <LucideReact.MousePointer
                        size={16}
                        className="text-gray-500"
                      />
                      <span>{c.click ?? 0}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 flex flex-wrap space-x-4">
                    <div className="flex items-center space-x-1">
                      <LucideReact.Calendar size={14} />
                      <span>Created: {formatDate(c.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <LucideReact.Clock size={14} />
                      <span>Updated: {formatDate(c.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {hasMsgs && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages</h2>
          <div className="space-y-4">
            {value.msgs!.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0"
              >
                <div className="flex items-center space-x-2 truncate">
                  {getMediumIcon(m.sendMedium)}
                  <span className="font-medium text-gray-900 truncate">
                    {m.name}
                  </span>
                </div>
                <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <LucideReact.Send size={16} className="text-gray-500" />
                    <span>{m.sent ?? 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LucideReact.Eye size={16} className="text-gray-500" />
                    <span>{m.view ?? 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LucideReact.Target size={16} className="text-gray-500" />
                    <span>{m.goal ?? 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LucideReact.MousePointer
                      size={16}
                      className="text-gray-500"
                    />
                    <span>{m.click ?? 0}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center space-x-2">
                  <LucideReact.Calendar size={14} />
                  <span>{formatDate(m.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {typeof value.next === "number" && (
        <div className="text-sm text-gray-500">
          Next offset: <span className="font-medium">{value.next}</span>
        </div>
      )}
    </div>
  );
}
