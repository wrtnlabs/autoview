import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace open {
        export namespace marketing {
            export interface CampaignsView {
                next?: number;
                campaigns?: AutoViewInputSubTypes.marketing.Campaign[];
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
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.CampaignsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const campaigns = value.campaigns ?? [];
  const totalCampaigns = campaigns.length;
  const totalSent = campaigns.reduce((sum, c) => sum + (c.sent ?? 0), 0);
  const totalViews = campaigns.reduce((sum, c) => sum + (c.view ?? 0), 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.click ?? 0), 0);

  function formatNumber(n: number): string {
    if (n >= 1000) {
      const k = n / 1000;
      return `${Number.isInteger(k) ? k.toFixed(0) : k.toFixed(1)}K`;
    }
    return `${n}`;
  }

  function formatDate(ts?: number): string {
    if (!ts) return "-";
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const stateMap: Record<
    Exclude<AutoViewInputSubTypes.marketing.Campaign["state"], undefined>,
    { label: string; styles: string; icon: JSX.Element }
  > = {
    draft: {
      label: "Draft",
      styles: "bg-gray-100 text-gray-800",
      icon: <LucideReact.Edit2 size={16} className="text-gray-600" />,
    },
    active: {
      label: "Active",
      styles: "bg-green-100 text-green-800",
      icon: <LucideReact.CheckCircle size={16} className="text-green-600" />,
    },
    stopped: {
      label: "Stopped",
      styles: "bg-amber-100 text-amber-800",
      icon: <LucideReact.PauseCircle size={16} className="text-amber-600" />,
    },
    removed: {
      label: "Removed",
      styles: "bg-red-100 text-red-800",
      icon: <LucideReact.XCircle size={16} className="text-red-600" />,
    },
  };

  const mediumMap: Record<
    AutoViewInputSubTypes.marketing.Campaign["sendMedium"],
    { label: string; icon: JSX.Element }
  > = {
    email: {
      label: "Email",
      icon: <LucideReact.Mail size={16} className="text-gray-500" />,
    },
    appAlimtalk: {
      label: "AlimTalk",
      icon: <LucideReact.MessageCircle size={16} className="text-blue-500" />,
    },
    appLine: {
      label: "Line",
      icon: <LucideReact.MessageCircle size={16} className="text-green-500" />,
    },
    inAppChat: {
      label: "In-App Chat",
      icon: <LucideReact.MessageSquare size={16} className="text-indigo-500" />,
    },
    xms: {
      label: "XMS",
      icon: <LucideReact.MessageSquare size={16} className="text-purple-500" />,
    },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <div className="flex flex-wrap items-center space-x-4 text-gray-700">
          <div className="flex items-center space-x-1">
            <LucideReact.Users size={20} />
            <span>{totalCampaigns} Campaigns</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.Send size={20} />
            <span>{formatNumber(totalSent)} Sent</span>
          </div>
          {totalViews > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.Eye size={20} />
              <span>{formatNumber(totalViews)} Views</span>
            </div>
          )}
          {totalClicks > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.MousePointer size={20} className="text-gray-500" />
              <span>{formatNumber(totalClicks)} Clicks</span>
            </div>
          )}
        </div>
        {value.next !== undefined && (
          <div className="mt-2 sm:mt-0 text-blue-600 flex items-center">
            <span>Load More</span>
            <LucideReact.ArrowRight className="ml-1" size={20} />
          </div>
        )}
      </div>

      {/* Campaign list or empty state */}
      {totalCampaigns === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2">No campaigns available.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {campaigns.map((c, i) => {
            const stateKey = c.state ?? "draft";
            const stateInfo = stateMap[stateKey as keyof typeof stateMap];
            const mediumInfo = mediumMap[c.sendMedium];
            return (
              <li
                key={c.id ?? i}
                className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {c.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {mediumInfo.icon}
                    <span className="text-sm text-gray-600">
                      {mediumInfo.label}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${stateInfo.styles}`}
                    >
                      {stateInfo.icon}
                      <span className="ml-1">{stateInfo.label}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <LucideReact.Send size={16} />
                      <span>{formatNumber(c.sent ?? 0)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <LucideReact.Eye size={16} />
                      <span>{formatNumber(c.view ?? 0)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <LucideReact.MousePointer size={16} className="text-gray-500" />
                      <span>{formatNumber(c.click ?? 0)}</span>
                    </div>
                    {c.goal !== undefined && (
                      <div className="flex items-center space-x-1">
                        <LucideReact.Target size={16} />
                        <span>{formatNumber(c.goal)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 sm:ml-4 text-sm text-gray-500 whitespace-nowrap">
                  <div>Created: {formatDate(c.createdAt)}</div>
                  <div>Updated: {formatDate(c.updatedAt)}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
