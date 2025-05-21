import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4OneTimeMsgsView = {
                    oneTimeMsgs?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4OneTimeMsg[];
                    next?: number;
                };
            }
        }
        export namespace v4 {
            export namespace marketing {
                export type LegacyV4OneTimeMsg = {
                    id?: string;
                    channelId?: string;
                    name: string;
                    state: "draft" | "waiting" | "sent" | "canceled" | "removed";
                    sendMode?: "immediately" | "reservedWithSenderTime" | "reservedWithReceiverTime";
                    sendMedium?: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
                    settings?: AutoViewInputSubTypes.marketing.SendMediumSettings;
                    userQuery?: AutoViewInputSubTypes.Expression;
                    goalEventName?: string;
                    goalEventQuery?: AutoViewInputSubTypes.Expression;
                    enableSupportBot: boolean;
                    followingSupportBotId?: string;
                    advertising: boolean;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    startAt?: number;
                    draft?: AutoViewInputSubTypes.marketing.OneTimeMsgDraft;
                    createdAt?: number;
                    updatedAt?: number;
                    sent?: number & tags.Type<"int32">;
                    view?: number & tags.Type<"int32">;
                    goal?: number & tags.Type<"int32">;
                    click?: number & tags.Type<"int32">;
                    userChatExpireDuration?: string;
                };
            }
        }
    }
    export namespace marketing {
        export type SendMediumSettings = {
            type: string;
        };
        export type OneTimeMsgDraft = {
            oneTimeMsg: AutoViewInputSubTypes.marketing.OneTimeMsg;
        };
        export type OneTimeMsg = {
            id?: string;
            channelId?: string;
            name: string;
            state: "draft" | "waiting" | "sent" | "canceled" | "removed";
            sendMode?: "immediately" | "reservedWithSenderTime" | "reservedWithReceiverTime";
            channelOperationId?: string;
            sendMedium?: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            settings?: AutoViewInputSubTypes.marketing.SendMediumSettings;
            userQuery?: AutoViewInputSubTypes.Expression;
            goalEventName?: string;
            goalEventQuery?: AutoViewInputSubTypes.Expression;
            goalEventDuration?: string;
            advertising: boolean;
            sendToOfflineXms?: boolean;
            sendToOfflineEmail?: boolean;
            startAt?: number;
            localStartAt?: string & tags.Format<"date-time">;
            draft?: AutoViewInputSubTypes.marketing.OneTimeMsgDraft;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
            userChatExpireDuration?: string;
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
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4OneTimeMsgsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const messages = value.oneTimeMsgs ?? [];
  const messageCount = messages.length;

  const sumMetrics = messages.reduce(
    (acc, msg) => {
      acc.sent += msg.sent ?? 0;
      acc.view += msg.view ?? 0;
      acc.goal += msg.goal ?? 0;
      acc.click += msg.click ?? 0;
      return acc;
    },
    { sent: 0, view: 0, goal: 0, click: 0 }
  );

  const formatDate = (ts?: number) =>
    ts ? new Date(ts).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "--";

  const stateStyles: Record<string, { label: string; classes: string }> = {
    draft: { label: "Draft", classes: "bg-gray-100 text-gray-800" },
    waiting: { label: "Waiting", classes: "bg-blue-100 text-blue-800" },
    sent: { label: "Sent", classes: "bg-green-100 text-green-800" },
    canceled: { label: "Canceled", classes: "bg-red-100 text-red-800" },
    removed: { label: "Removed", classes: "bg-gray-200 text-gray-600 line-through" },
  };

  const mediumLabels: Record<string, string> = {
    appAlimtalk: "Alimtalk",
    appLine: "LINE",
    email: "Email",
    inAppChat: "In-App Chat",
    xms: "XMS",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-6">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-2xl font-semibold text-gray-800">One-Time Messages</h2>
        <div className="mt-2 sm:mt-0 text-sm text-gray-500">
          {messageCount} message{messageCount !== 1 ? "s" : ""} • Sent: {sumMetrics.sent} • Views: {sumMetrics.view} • Goals: {sumMetrics.goal} • Clicks: {sumMetrics.click}
        </div>
      </div>

      {/* Empty state */}
      {messageCount === 0 && (
        <div className="text-center text-gray-500 py-8">
          No messages to display.
        </div>
      )}

      {/* Message cards */}
      <div className="space-y-4">
        {messages.map((msg, idx) => {
          const stateInfo = stateStyles[msg.state] || { label: msg.state, classes: "bg-gray-100 text-gray-800" };
          const medium = msg.sendMedium ? mediumLabels[msg.sendMedium] || msg.sendMedium : "—";

          return (
            <div
              key={msg.id ?? idx}
              className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row md:justify-between"
            >
              {/* Left section: title & meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {msg.name}
                  </h3>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded ${stateInfo.classes}`}>
                    {stateInfo.label}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap text-sm text-gray-600 space-x-4">
                  <span>Medium: {medium}</span>
                  {msg.startAt && <span>Scheduled: {formatDate(msg.startAt)}</span>}
                  {msg.createdAt && <span>Created: {formatDate(msg.createdAt)}</span>}
                </div>
              </div>

              {/* Right section: metrics */}
              <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-sm font-medium text-gray-500">Sent</div>
                  <div className="mt-1 text-lg font-semibold text-gray-800">{msg.sent ?? 0}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Views</div>
                  <div className="mt-1 text-lg font-semibold text-gray-800">{msg.view ?? 0}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Goals</div>
                  <div className="mt-1 text-lg font-semibold text-gray-800">{msg.goal ?? 0}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Clicks</div>
                  <div className="mt-1 text-lg font-semibold text-gray-800">{msg.click ?? 0}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination indicator */}
      {value.next != null && (
        <div className="text-center text-sm text-gray-500">
          More messages available...
        </div>
      )}
    </div>
  );
}
