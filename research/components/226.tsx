import { tags } from "typia";
import React from "react";
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
        export type CampaignDraft = {
            campaign: AutoViewInputSubTypes.marketing.Campaign;
            msgs: AutoViewInputSubTypes.marketing.CampaignMsg[] & tags.MinItems<1> & tags.MaxItems<4>;
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
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
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
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        createdAt?: number;
        updatedAt?: number;
        icon?: string;
    };
    export type TimeRange = {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.CampaignView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const campaign = value.campaign;
  const msgs = value.msgs || [];

  // If there's no campaign data, render a placeholder.
  if (!campaign) {
    return (
      <div className="p-4 text-center text-gray-500">
        No campaign data available.
      </div>
    );
  }

  // Mapping for human-readable states
  const stateMap: Record<string, string> = {
    draft: "Draft",
    active: "Active",
    stopped: "Stopped",
    removed: "Removed",
  };

  // Color badges for states
  const stateColors: Record<string, string> = {
    draft: "bg-yellow-100 text-yellow-800",
    active: "bg-green-100 text-green-800",
    stopped: "bg-red-100 text-red-800",
    removed: "bg-gray-100 text-gray-800",
  };

  // Mapping for sendMedium
  const mediumMap: Record<string, string> = {
    appAlimtalk: "AlimTalk",
    appLine: "Line",
    email: "Email",
    inAppChat: "In-App Chat",
    xms: "XMS",
  };

  // Formatter for timestamps (assumed milliseconds)
  const formatDateTime = (ms?: number) =>
    ms ? new Date(ms).toLocaleString() : "-";

  const formattedStart = formatDateTime(campaign.startAt);
  const formattedEnd = formatDateTime(campaign.endAt);

  // Summary statistics from campaign
  const stats = [
    { label: "Sent", value: campaign.sent ?? 0 },
    { label: "Views", value: campaign.view ?? 0 },
    { label: "Clicks", value: campaign.click ?? 0 },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header: Campaign title, state badge, medium */}
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {campaign.name}
          </h2>
          <div className="mt-2 flex flex-wrap items-center space-x-2">
            <span
              className={`text-sm font-medium px-2 py-1 rounded ${stateColors[campaign.state ?? ""]} border`}
            >
              {stateMap[campaign.state ?? ""] || "Unknown"}
            </span>
            <span className="text-sm text-gray-600">
              {mediumMap[campaign.sendMedium] || campaign.sendMedium}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap space-x-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Schedule:</span>{" "}
            {formattedStart} – {formattedEnd}
          </div>
          <div>
            <span className="font-medium">Messages:</span> {msgs.length}
          </div>
        </div>
      </div>

      {/* Campaign summary stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        {stats.map((s) => (
          <div key={s.label} className="py-2 bg-gray-50 rounded">
            <div className="text-lg font-semibold text-gray-800">
              {s.value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Messages list */}
      {msgs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Messages</h3>
          <ul className="space-y-4">
            {msgs.map((msg) => (
              <li
                key={msg.id}
                className="p-4 border rounded-lg hover:shadow transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm font-semibold text-gray-800 truncate">
                    {msg.name}
                  </div>
                  <span className="text-xs text-gray-500">
                    {mediumMap[msg.sendMedium] || msg.sendMedium}
                  </span>
                </div>
                <div className="mt-2 flex space-x-6 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">Sent:</span>{" "}
                    {(msg.sent ?? 0).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Views:</span>{" "}
                    {(msg.view ?? 0).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Clicks:</span>{" "}
                    {(msg.click ?? 0).toLocaleString()}
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
