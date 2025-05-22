import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace open {
    export namespace marketing {
      export type CampaignView = {
        campaign?: AutoViewInputSubTypes.marketing.Campaign;
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
    export type CampaignDraft = {
      campaign: AutoViewInputSubTypes.marketing.Campaign;
      msgs: AutoViewInputSubTypes.marketing.CampaignMsg[] &
        tags.MinItems<1> &
        tags.MaxItems<4>;
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
  export type TimeRange = {
    dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] &
      tags.UniqueItems;
    from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.CampaignView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const campaign = value.campaign;
  // Mapping for campaign state to label, icon, and colors
  const stateMap: Record<
    string,
    { label: string; Icon: any; color: string; bg: string }
  > = {
    draft: {
      label: "Draft",
      Icon: LucideReact.Clock,
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
    active: {
      label: "Active",
      Icon: LucideReact.CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    stopped: {
      label: "Stopped",
      Icon: LucideReact.XCircle,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    removed: {
      label: "Removed",
      Icon: LucideReact.Trash2,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  };

  // Date formatter for timestamps
  const formatDateTime = (ts?: number) =>
    ts
      ? new Date(ts).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  if (!campaign) {
    return (
      <div className="p-4 bg-white rounded-lg shadow flex items-center justify-center text-gray-500">
        <LucideReact.AlertCircle className="mr-2 text-gray-400" size={20} />
        <span>No campaign data available</span>
      </div>
    );
  }

  const stateKey = campaign.state || "draft";
  const stateInfo = stateMap[stateKey] || stateMap.draft;
  const startAt = formatDateTime(campaign.startAt);
  const endAt = campaign.endAt ? formatDateTime(campaign.endAt) : "";
  const stats = [
    { label: "Sent", value: campaign.sent ?? 0, Icon: LucideReact.Send },
    { label: "Viewed", value: campaign.view ?? 0, Icon: LucideReact.Eye },
    {
      label: "Clicked",
      value: campaign.click ?? 0,
      Icon: LucideReact.MousePointer,
    },
    { label: "Goal", value: campaign.goal ?? 0, Icon: LucideReact.Target },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {campaign.name}
        </h2>
        <span
          className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${stateInfo.bg} ${stateInfo.color} rounded-full`}
        >
          <stateInfo.Icon className="mr-1" size={14} />
          {stateInfo.label}
        </span>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-6">
        <div className="flex items-center">
          <LucideReact.Tag className="mr-1 text-gray-400" size={16} />
          <span>{campaign.sendMedium}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-1 text-gray-400" size={16} />
          <span>
            {startAt}
            {endAt ? ` — ${endAt}` : ""}
          </span>
        </div>
        {campaign.waitingTime && (
          <div className="flex items-center">
            <LucideReact.Clock className="mr-1 text-gray-400" size={16} />
            <span>Wait: {campaign.waitingTime}</span>
          </div>
        )}
        <div className="flex items-center">
          <LucideReact.Play className="mr-1 text-gray-400" size={16} />
          <span>Trigger: {campaign.triggerEventName}</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map(({ label, value, Icon }, idx) => (
          <div key={idx} className="flex items-center">
            <Icon className="mr-2 text-gray-500" size={16} />
            <div>
              <div className="text-xs text-gray-500">{label}</div>
              <div className="text-lg font-medium text-gray-800">
                {value.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Messages */}
      {value.msgs && value.msgs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Messages</h3>
          <div className="space-y-4">
            {value.msgs.map((msg) => (
              <div
                key={msg.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {msg.name}
                  </span>
                  <time
                    dateTime={
                      msg.createdAt
                        ? new Date(msg.createdAt).toISOString()
                        : undefined
                    }
                    className="text-xs text-gray-500"
                    title={
                      msg.createdAt
                        ? new Date(msg.createdAt).toLocaleString()
                        : undefined
                    }
                  >
                    {formatDateTime(msg.createdAt)}
                  </time>
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-4 mb-3">
                  <LucideReact.Tag className="mr-1 text-gray-400" size={14} />
                  <span>{msg.sendMedium}</span>
                </div>
                <div className="flex space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <LucideReact.Send className="mr-1" size={14} />
                    <span className="text-sm">{msg.sent ?? 0}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Eye className="mr-1" size={14} />
                    <span className="text-sm">{msg.view ?? 0}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.MousePointer className="mr-1" size={14} />
                    <span className="text-sm">{msg.click ?? 0}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Target className="mr-1" size={14} />
                    <span className="text-sm">{msg.goal ?? 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
