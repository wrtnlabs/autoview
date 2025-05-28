import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace open {
        export namespace marketing {
            export interface CampaignView {
                campaign?: AutoViewInputSubTypes.marketing.Campaign;
                msgs?: AutoViewInputSubTypes.marketing.CampaignMsg[];
            }
        }
    }
    export namespace marketing {
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
        export interface CampaignDraft {
            campaign: AutoViewInputSubTypes.marketing.Campaign;
            msgs: AutoViewInputSubTypes.marketing.CampaignMsg[] & tags.MinItems<1> & tags.MaxItems<4>;
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
    export interface TimeRange {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.CampaignView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const campaign = value.campaign;
  const msgs = value.msgs ?? [];

  // Format timestamp to human‐readable string
  const formatDate = (ts?: number) =>
    ts ? new Date(ts).toLocaleString() : "—";

  // Map state to label, color, and icon
  const stateInfo: Record<
    string,
    { label: string; icon: React.ReactNode; color: string }
  > = {
    draft: {
      label: "Draft",
      icon: <LucideReact.Edit2 size={16} className="text-gray-500" />,
      color: "bg-gray-100 text-gray-800",
    },
    active: {
      label: "Active",
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      color: "bg-green-100 text-green-800",
    },
    stopped: {
      label: "Stopped",
      icon: <LucideReact.PauseCircle size={16} className="text-orange-500" />,
      color: "bg-orange-100 text-orange-800",
    },
    removed: {
      label: "Removed",
      icon: <LucideReact.Trash2 size={16} className="text-red-500" />,
      color: "bg-red-100 text-red-800",
    },
  };

  // Map medium to label and icon
  const mediumInfo: Record<
    string,
    { label: string; icon: React.ReactNode }
  > = {
    appAlimtalk: {
      label: "Alimtalk",
      icon: <LucideReact.MessageSquare size={16} className="text-blue-500" />,
    },
    appLine: {
      label: "Line",
      icon: <LucideReact.MessageCircle size={16} className="text-green-500" />,
    },
    email: {
      label: "Email",
      icon: <LucideReact.Mail size={16} className="text-indigo-500" />,
    },
    inAppChat: {
      label: "In-App Chat",
      icon: <LucideReact.MessageSquare size={16} className="text-purple-500" />,
    },
    xms: {
      label: "XMS",
      icon: <LucideReact.Smartphone size={16} className="text-teal-500" />,
    },
  };

  // Safely retrieve numeric metrics
  const getMetric = (n?: number) => (typeof n === "number" ? n : 0);

  // If no campaign data, show placeholder
  if (!campaign) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mx-auto mb-2" />
        <p>No campaign data available.</p>
      </div>
    );
  }

  // Determine state display
  const state = campaign.state ?? "draft";
  const { label: stateLabel, icon: stateIcon, color: stateColor } =
    stateInfo[state] || stateInfo.draft;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 truncate">
            {campaign.name}
          </h2>
          <p className="text-sm text-gray-600">
            Trigger: {campaign.triggerEventName}
          </p>
        </div>
        <div
          className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded ${stateColor}`}
        >
          {stateIcon}
          <span className="ml-1">{stateLabel}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center space-x-1">
          <LucideReact.Send size={16} className="text-gray-500" />
          <span>Sent: {getMetric(campaign.sent)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Eye size={16} className="text-gray-500" />
          <span>Viewed: {getMetric(campaign.view)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.MousePointer size={16} className="text-gray-500" />
          <span>Clicked: {getMetric(campaign.click)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.CheckCircle size={16} className="text-gray-500" />
          <span>Goal: {getMetric(campaign.goal)}</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Clock size={16} />
          <span>Wait: {campaign.waitingTime}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Activity size={16} />
          <span>Mode: {campaign.sendMode}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Start: {formatDate(campaign.startAt)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>End: {formatDate(campaign.endAt)}</span>
        </div>
        <div className="flex items-center space-x-1">
          {mediumInfo[campaign.sendMedium]?.icon}
          <span>{mediumInfo[campaign.sendMedium]?.label}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.User size={16} />
          <span>Channel: {campaign.channelOperationId ?? "—"}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Clock size={16} />
          <span>Created: {formatDate(campaign.createdAt)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Edit3 size={16} />
          <span>Updated: {formatDate(campaign.updatedAt)}</span>
        </div>
      </div>

      {/* Messages Breakdown */}
      {msgs.length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Messages ({msgs.length})
          </h3>
          <ul className="space-y-3">
            {msgs.map((m) => (
              <li
                key={m.id}
                className="p-3 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="font-medium text-gray-900 truncate">
                    {m.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({mediumInfo[m.sendMedium]?.label})
                  </span>
                </div>
                <div className="mt-2 sm:mt-0 flex space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <LucideReact.Send size={14} className="text-gray-500" />
                    <span>{getMetric(m.sent)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LucideReact.Eye size={14} className="text-gray-500" />
                    <span>{getMetric(m.view)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LucideReact.MousePointer size={14} className="text-gray-500" />
                    <span>{getMetric(m.click)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LucideReact.CheckCircle size={14} className="text-gray-500" />
                    <span>{getMetric(m.goal)}</span>
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
