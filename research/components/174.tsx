import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4CampaignView {
                    campaign?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4Campaign;
                    msgs?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4CampaignMsg[];
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4CampaignView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const campaign = value.campaign;
  if (!campaign) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="text-gray-400" />
        <span className="mt-2 text-sm">No campaign data available</span>
      </div>
    );
  }

  const stateKey = campaign.state ?? "unknown";
  const stateMap: Record<string, { icon: React.ReactNode; color: string }> = {
    draft: {
      icon: <LucideReact.Clock size={16} className="text-gray-500" />,
      color: "text-gray-500",
    },
    active: {
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      color: "text-green-500",
    },
    stopped: {
      icon: <LucideReact.XCircle size={16} className="text-red-500" />,
      color: "text-red-500",
    },
    removed: {
      icon: <LucideReact.Trash2 size={16} className="text-red-500" />,
      color: "text-red-500",
    },
    unknown: {
      icon: <LucideReact.HelpCircle size={16} className="text-gray-400" />,
      color: "text-gray-400",
    },
  };
  const stateInfo = stateMap[stateKey];

  function formatDate(ts?: number): string {
    return ts ? new Date(ts).toLocaleString() : "N/A";
  }

  const metrics = [
    {
      label: "Sent",
      value: campaign.sent ?? 0,
      icon: <LucideReact.Send size={16} className="text-blue-500" />,
    },
    {
      label: "Views",
      value: campaign.view ?? 0,
      icon: <LucideReact.Eye size={16} className="text-indigo-500" />,
    },
    {
      label: "Goals",
      value: campaign.goal ?? 0,
      icon: <LucideReact.Target size={16} className="text-purple-500" />,
    },
    {
      label: "Clicks",
      value: campaign.click ?? 0,
      icon: <LucideReact.MousePointer size={16} className="text-teal-500" />,
    },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {campaign.name}
        </h2>
        <div className="flex items-center">
          {stateInfo.icon}
          <span className={`ml-1 text-sm font-medium ${stateInfo.color}`}>
            {stateKey}
          </span>
        </div>
      </div>

      {/* Key properties */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Mail size={16} className="text-gray-500" />
          <span className="ml-1 capitalize">{campaign.sendMedium}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Zap size={16} className="text-gray-500" />
          <span className="ml-1">{campaign.triggerEventName}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Clock size={16} className="text-gray-500" />
          <span className="ml-1">{campaign.waitingTime}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.SlidersHorizontal size={16} className="text-gray-500" />
          <span className="ml-1 capitalize">{campaign.sendMode}</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap gap-4 text-sm">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center text-gray-700">
            {m.icon}
            <span className="ml-1">{m.value}</span>
          </div>
        ))}
      </div>

      {/* Messages list */}
      {value.msgs && value.msgs.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-md font-medium text-gray-800">Messages</h3>
          <div className="space-y-2">
            {value.msgs.map((msg) => (
              <div
                key={msg.id}
                className="p-2 border border-gray-200 rounded flex items-center justify-between"
              >
                <span className="text-sm font-medium text-gray-900 truncate">
                  {msg.name}
                </span>
                <div className="flex space-x-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <LucideReact.Send size={14} className="text-blue-500" />
                    <span className="ml-1">{msg.sent ?? 0}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Eye size={14} className="text-indigo-500" />
                    <span className="ml-1">{msg.view ?? 0}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Target size={14} className="text-purple-500" />
                    <span className="ml-1">{msg.goal ?? 0}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.MousePointer size={14} className="text-teal-500" />
                    <span className="ml-1">{msg.click ?? 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer dates */}
      <div className="flex flex-wrap text-xs text-gray-500">
        <div className="flex items-center mr-4">
          <LucideReact.Calendar size={12} />
          <span className="ml-1">Created: {formatDate(campaign.createdAt)}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={12} />
          <span className="ml-1">Updated: {formatDate(campaign.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}
