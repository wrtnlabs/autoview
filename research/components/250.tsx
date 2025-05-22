import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace open {
        export namespace marketing {
            export type OneTimeMsgsView = {
                next?: number;
                oneTimeMsgs?: AutoViewInputSubTypes.marketing.OneTimeMsg[];
            };
        }
    }
    export namespace marketing {
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
        export type SendMediumSettings = {
            type: string;
        };
        export type OneTimeMsgDraft = {
            oneTimeMsg: AutoViewInputSubTypes.marketing.OneTimeMsg;
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
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.OneTimeMsgsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const msgs = value.oneTimeMsgs ?? [];

  const formatDate = (ts?: number | string): string => {
    if (!ts) return "-";
    const date = typeof ts === "string" ? new Date(ts) : new Date(ts);
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const formatCount = (n?: number): string => {
    if (n == null) return "0";
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  const stateStyles: Record<string, string> = {
    draft: "bg-gray-200 text-gray-800",
    waiting: "bg-yellow-100 text-yellow-800",
    sent: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
    removed: "bg-red-50 text-red-700",
  };

  const mediumLabels: Record<string, string> = {
    appAlimtalk: "Alimtalk",
    appLine: "Line",
    email: "Email",
    inAppChat: "In-App Chat",
    xms: "Xms",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
      {msgs.length === 0 ? (
        <div className="p-4 text-center text-gray-500 italic">
          No messages to display.
        </div>
      ) : (
        msgs.map((msg, idx) => {
          const state = msg.state ?? "draft";
          const stateClass = stateStyles[state] ?? stateStyles.draft;
          const sched = msg.localStartAt
            ? formatDate(msg.localStartAt)
            : formatDate(msg.startAt);
          return (
            <div
              key={msg.id ?? idx}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {msg.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded ${stateClass}`}
                  >
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-600 flex flex-wrap gap-2">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5H10a.75.75 0 01-.75-.75V4.75A.75.75 0 0110 4z" />
                    </svg>
                    {sched}
                  </span>
                  {msg.sendMedium && (
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.94 6.94a8 8 0 0111.32 0l1.06-1.06a9.5 9.5 0 00-13.44 0l1.06 1.06zm1.06 1.06a5 5 0 017.07 0l1.06-1.06a6.5 6.5 0 00-9.19 0l1.06 1.06zm1.06 1.06a2 2 0 012.83 0l1.06-1.06a3.5 3.5 0 00-4.95 0l1.06 1.06z" />
                        <path d="M12 14a4 4 0 01-8 0H2a6 6 0 0012 0h-2z" />
                      </svg>
                      {mediumLabels[msg.sendMedium] || msg.sendMedium}
                    </span>
                  )}
                  {msg.sendMode && (
                    <span className="px-1 text-xs bg-blue-50 text-blue-800 rounded">
                      {msg.sendMode === "immediately"
                        ? "Immediate"
                        : msg.sendMode === "reservedWithSenderTime"
                        ? "Reserved (Sender Time)"
                        : "Reserved (Receiver Time)"}
                    </span>
                  )}
                  {msg.advertising && (
                    <span className="px-1 text-xs bg-purple-50 text-purple-800 rounded">
                      Advertising
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-sm text-gray-500">Sent</div>
                  <div className="text-base font-semibold text-gray-900">
                    {formatCount(msg.sent)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Views</div>
                  <div className="text-base font-semibold text-gray-900">
                    {formatCount(msg.view)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Clicks</div>
                  <div className="text-base font-semibold text-gray-900">
                    {formatCount(msg.click)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Goals</div>
                  <div className="text-base font-semibold text-gray-900">
                    {formatCount(msg.goal)}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      {/* 3. Return the React element. */}
      {value.next != null && msgs.length > 0 && (
        <div className="p-4 text-center text-blue-600 text-sm">
          More messages available…
        </div>
      )}
    </div>
  );
}
