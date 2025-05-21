import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4OneTimeMsgView = {
                    oneTimeMsg?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4OneTimeMsg;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4OneTimeMsgView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const msg = value.oneTimeMsg;
  if (!msg) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        No message data available.
      </div>
    );
  }

  const stateLabelMap: Record<typeof msg.state, string> = {
    draft: "Draft",
    waiting: "Waiting",
    sent: "Sent",
    canceled: "Canceled",
    removed: "Removed",
  };
  const stateColorMap: Record<typeof msg.state, string> = {
    draft: "bg-gray-100 text-gray-800",
    waiting: "bg-yellow-100 text-yellow-800",
    sent: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
    removed: "bg-gray-100 text-gray-800",
  };
  const mediumLabelMap: Record<NonNullable<typeof msg.sendMedium>, string> = {
    appAlimtalk: "AlimTalk",
    appLine: "LINE",
    email: "Email",
    inAppChat: "In-App Chat",
    xms: "XMS",
  };
  const modeLabelMap: Record<NonNullable<typeof msg.sendMode>, string> = {
    immediately: "Immediately",
    reservedWithSenderTime: "Scheduled (Sender Time)",
    reservedWithReceiverTime: "Scheduled (Receiver Time)",
  };

  function formatDateTime(ts?: number): string {
    if (!ts) return "-";
    const date = new Date(ts);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatCount(n?: number & number): string {
    if (n == null) return "-";
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return n.toString();
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <header className="flex justify-between items-start">
        <h2
          className="text-lg font-semibold text-gray-900 truncate"
          title={msg.name}
        >
          {msg.name}
        </h2>
        <span
          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
            stateColorMap[msg.state]
          }`}
        >
          {stateLabelMap[msg.state]}
        </span>
      </header>

      <div className="mt-2 flex flex-wrap text-sm text-gray-600 space-x-4">
        {msg.sendMedium && (
          <div>{mediumLabelMap[msg.sendMedium]}</div>
        )}
        {msg.sendMode && <div>{modeLabelMap[msg.sendMode]}</div>}
        {msg.startAt && (
          <div>Scheduled: {formatDateTime(msg.startAt)}</div>
        )}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-gray-500">Sent</dt>
        <dd className="font-medium text-gray-900">
          {formatCount(msg.sent)}
        </dd>

        <dt className="text-gray-500">Views</dt>
        <dd className="font-medium text-gray-900">
          {formatCount(msg.view)}
        </dd>

        <dt className="text-gray-500">Clicks</dt>
        <dd className="font-medium text-gray-900">
          {formatCount(msg.click)}
        </dd>

        <dt className="text-gray-500">Goals</dt>
        <dd className="font-medium text-gray-900">
          {formatCount(msg.goal)}
        </dd>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        {msg.enableSupportBot && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            Support Bot Enabled
          </span>
        )}
        {msg.advertising && (
          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
            Advertising
          </span>
        )}
        {msg.sendToOfflineXms && (
          <span className="inline-block bg-indigo-50 text-indigo-800 text-xs px-2 py-1 rounded-full">
            Offline XMS
          </span>
        )}
        {msg.sendToOfflineEmail && (
          <span className="inline-block bg-indigo-50 text-indigo-800 text-xs px-2 py-1 rounded-full">
            Offline Email
          </span>
        )}
      </div>
    </article>
  );
}
