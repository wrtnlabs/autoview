import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4CampaignsView {
                    campaigns?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4Campaign[];
                    msgs?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4CampaignMsg[];
                    next?: number;
                }
            }
        }
        export namespace v4 {
            export namespace marketing {
                /**
                 * ### 이벤트 기록
                 *
                 * - 마케팅 이벤트 기록에 대한 [문서](https://www.notion.so/channelio/e5d745446b6342198e9e5b004e48d312)
                */
                export interface LegacyV4Campaign {
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
                }
                export interface LegacyV4CampaignMsg {
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
                }
            }
        }
    }
    export interface Expression {
        key?: string;
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        operator?: AutoViewInputSubTypes.Operator;
        values?: {}[];
        and?: AutoViewInputSubTypes.Expression[];
        or?: AutoViewInputSubTypes.Expression[];
    }
    export interface Operator {
    }
    export interface TimeRange {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    }
    export namespace marketing {
        export interface CampaignDraft {
            campaign: AutoViewInputSubTypes.marketing.Campaign;
            msgs: AutoViewInputSubTypes.marketing.CampaignMsg[] & tags.MinItems<1> & tags.MaxItems<4>;
        }
        /**
         * ### 이벤트 기록
         *
         * - 마케팅 이벤트 기록에 대한 [문서](https://www.notion.so/channelio/e5d745446b6342198e9e5b004e48d312)
        */
        export interface Campaign {
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
        }
        export interface HoldingPropertyConstant {
            baseEventName: string;
            baseEventKey: string;
            eventQuery?: AutoViewInputSubTypes.Expression;
            baseEventType: "triggerEvent" | "additionalFilter";
            operator?: AutoViewInputSubTypes.EventSchema;
            values?: {};
        }
        export interface CampaignMsg {
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
        }
        export interface SendMediumSettings {
            type: string;
        }
    }
    export interface EventSchema {
        id?: string;
        channelId?: string;
        eventName?: string;
        key?: string;
        parentKey?: string;
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        createdAt?: number;
        updatedAt?: number;
        icon?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4CampaignsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const campaigns = value.campaigns ?? [];
  const msgs = value.msgs ?? [];
  const totalCampaigns = campaigns.length;
  const totalMessages = msgs.length;
  const hasData = totalCampaigns > 0 || totalMessages > 0;

  const stateIcon = (state?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4Campaign["state"]) => {
    switch (state) {
      case "active":
        return <LucideReact.CheckCircle className="text-green-500" size={16} aria-label="Active" />;
      case "draft":
        return <LucideReact.Clock className="text-gray-500" size={16} aria-label="Draft" />;
      case "stopped":
        return <LucideReact.XCircle className="text-yellow-500" size={16} aria-label="Stopped" />;
      case "removed":
        return <LucideReact.Trash2 className="text-red-500" size={16} aria-label="Removed" />;
      default:
        return null;
    }
  };

  const mediumLabel = (m: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4Campaign["sendMedium"]) => {
    const map: Record<string, string> = {
      appAlimtalk: "AlimTalk",
      appLine: "LINE",
      email: "Email",
      inAppChat: "In-App Chat",
      xms: "XMS",
    };
    return map[m] ?? m;
  };

  const renderCampaign = (
    c: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4Campaign,
    i: number
  ) => {
    const created = c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "--";
    return (
      <div key={i} className="mb-4 p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-800 truncate">{c.name}</h3>
          {stateIcon(c.state)}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
          <span className="flex items-center gap-1">
            <LucideReact.Tag size={12} className="text-gray-400" />
            <span>{mediumLabel(c.sendMedium)}</span>
          </span>
          <span className="flex items-center gap-1">
            <LucideReact.Calendar size={12} className="text-gray-400" />
            <span>{created}</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {typeof c.sent === "number" && (
            <div className="flex items-center gap-1">
              <LucideReact.Send size={12} className="text-gray-400" />
              <span>{c.sent}</span>
            </div>
          )}
          {typeof c.view === "number" && (
            <div className="flex items-center gap-1">
              <LucideReact.Eye size={12} className="text-gray-400" />
              <span>{c.view}</span>
            </div>
          )}
          {typeof c.click === "number" && (
            <div className="flex items-center gap-1">
              <LucideReact.Pointer size={12} className="text-gray-400" />
              <span>{c.click}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMessage = (
    m: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4CampaignMsg,
    i: number
  ) => {
    const created = m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "--";
    return (
      <div key={i} className="mb-4 p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-md font-medium text-gray-800 truncate">{m.name}</h4>
          <span className="text-sm text-gray-500">{mediumLabel(m.sendMedium)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <LucideReact.Calendar size={12} className="text-gray-400" />
          <span className="ml-1">{created}</span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {typeof m.sent === "number" && (
            <div className="flex items-center gap-1">
              <LucideReact.Send size={12} className="text-gray-400" />
              <span>{m.sent}</span>
            </div>
          )}
          {typeof m.view === "number" && (
            <div className="flex items-center gap-1">
              <LucideReact.Eye size={12} className="text-gray-400" />
              <span>{m.view}</span>
            </div>
          )}
          {typeof m.click === "number" && (
            <div className="flex items-center gap-1">
              <LucideReact.Pointer size={12} className="text-gray-400" />
              <span>{m.click}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4">
      {!hasData && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No campaigns or messages available</span>
        </div>
      )}

      {totalCampaigns > 0 && (
        <section className="mb-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
            <LucideReact.Layers size={20} className="text-gray-600" />
            Campaigns ({totalCampaigns})
          </h2>
          <div>{campaigns.map(renderCampaign)}</div>
        </section>
      )}

      {totalMessages > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
            <LucideReact.MessageSquare size={20} className="text-gray-600" />
            Messages ({totalMessages})
          </h2>
          <div>{msgs.map(renderMessage)}</div>
        </section>
      )}
    </div>
  );
}
