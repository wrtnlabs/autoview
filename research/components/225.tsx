import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.CampaignsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const campaigns = value.campaigns ?? [];
  const msgsCount = value.msgs?.length ?? 0;
  const campaignCount = campaigns.length;

  const formatNumber = (num?: number) => (num ?? 0).toLocaleString();

  const totals = campaigns.reduce(
    (acc, c) => {
      acc.sent += c.sent ?? 0;
      acc.view += c.view ?? 0;
      acc.goal += c.goal ?? 0;
      acc.click += c.click ?? 0;
      return acc;
    },
    { sent: 0, view: 0, goal: 0, click: 0 },
  );

  const getMediumMeta = (medium: string) => {
    switch (medium) {
      case "email":
        return {
          icon: <LucideReact.Mail size={16} className="text-blue-500" />,
          label: "Email",
        };
      case "xms":
        return {
          icon: (
            <LucideReact.MessageSquare size={16} className="text-indigo-500" />
          ),
          label: "XMS",
        };
      case "inAppChat":
        return {
          icon: (
            <LucideReact.MessageCircle size={16} className="text-purple-500" />
          ),
          label: "In-App",
        };
      case "appLine":
        return {
          icon: (
            <LucideReact.MessageSquare size={16} className="text-green-500" />
          ),
          label: "Line",
        };
      case "appAlimtalk":
        return {
          icon: <LucideReact.Bell size={16} className="text-yellow-500" />,
          label: "Alimtalk",
        };
      default:
        return {
          icon: (
            <LucideReact.MessageSquare size={16} className="text-gray-500" />
          ),
          label: medium,
        };
    }
  };

  const stateBadge = (state?: string) => {
    switch (state) {
      case "active":
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">
            Active
          </span>
        );
      case "draft":
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded">
            Draft
          </span>
        );
      case "stopped":
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
            Stopped
          </span>
        );
      case "removed":
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
            Removed
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded">
            Unknown
          </span>
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (campaignCount === 0) {
    return (
      <div className="p-6 flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No campaigns available</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      {/* Summary */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center text-gray-700 space-x-1">
          <LucideReact.Users size={20} className="text-gray-600" />
          <span className="font-medium">{campaignCount}</span>
          <span className="text-sm text-gray-500">Campaigns</span>
        </div>
        <div className="flex items-center text-gray-700 space-x-1">
          <LucideReact.MessageSquare size={20} className="text-gray-600" />
          <span className="font-medium">{msgsCount}</span>
          <span className="text-sm text-gray-500">Messages</span>
        </div>
        <div className="flex flex-wrap items-center text-gray-700 space-x-4">
          <div className="flex items-center space-x-1">
            <LucideReact.Send size={16} className="text-gray-600" />
            <span className="text-sm">{formatNumber(totals.sent)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.Eye size={16} className="text-gray-600" />
            <span className="text-sm">{formatNumber(totals.view)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.CheckCircle size={16} className="text-gray-600" />
            <span className="text-sm">{formatNumber(totals.goal)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.MousePointer size={16} className="text-gray-600" />
            <span className="text-sm">{formatNumber(totals.click)}</span>
          </div>
        </div>
      </div>

      {/* Campaign list */}
      <div className="space-y-4">
        {campaigns.map((c, idx) => {
          const { icon, label } = getMediumMeta(c.sendMedium);
          return (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex flex-wrap items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {c.name}
                </h3>
                {stateBadge(c.state)}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-gray-600 text-sm">
                <div className="flex items-center space-x-1">
                  {icon}
                  <span>{label}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.Clock size={16} className="text-gray-500" />
                  <span>Delay: {c.waitingTime}</span>
                </div>
                {c.advertising && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                    Advertising
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-700">
                <div className="flex items-center space-x-1 text-sm">
                  <LucideReact.Send size={16} />
                  <span>{formatNumber(c.sent)}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <LucideReact.Eye size={16} />
                  <span>{formatNumber(c.view)}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <LucideReact.CheckCircle size={16} />
                  <span>{formatNumber(c.goal)}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <LucideReact.MousePointer size={16} />
                  <span>{formatNumber(c.click)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination hint */}
      {typeof value.next === "number" && (
        <div className="mt-6 flex justify-end text-blue-600 text-sm items-center space-x-1">
          <span>More results available</span>
          <LucideReact.ChevronsRight size={16} />
        </div>
      )}
    </div>
  );
}
