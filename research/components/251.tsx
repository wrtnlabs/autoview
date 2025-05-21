import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace open {
        export namespace marketing {
            export type OneTimeMsgView = {
                oneTimeMsg?: AutoViewInputSubTypes.marketing.OneTimeMsg;
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
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.OneTimeMsgView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const msg = value.oneTimeMsg;
  if (!msg) {
    return (
      <div className="p-4 text-center text-gray-500 italic">
        No message data available
      </div>
    );
  }

  // 1. Define data aggregation/transformation functions or derived constants
  const statusMap = {
    draft: "Draft",
    waiting: "Waiting",
    sent: "Sent",
    canceled: "Canceled",
    removed: "Removed",
  } as const;
  const sendModeMap = {
    immediately: "Immediately",
    reservedWithSenderTime: "Reserved (Sender Time)",
    reservedWithReceiverTime: "Reserved (Receiver Time)",
  } as const;
  const sendMediumMap = {
    appAlimtalk: "App Alimtalk",
    appLine: "App Line",
    email: "Email",
    inAppChat: "In-App Chat",
    xms: "XMS",
  } as const;

  function formatTimestamp(ts?: number): string {
    if (!ts) return "-";
    return new Date(ts).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatLocalDateTime(dt?: string): string {
    if (!dt) return "-";
    const d = new Date(dt);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const formattedStatus = statusMap[msg.state] || msg.state;
  const formattedSendMode = msg.sendMode ? sendModeMap[msg.sendMode] : "";
  const formattedMedium = msg.sendMedium ? sendMediumMap[msg.sendMedium] : "";
  const scheduledAt =
    msg.localStartAt || msg.startAt ? (
      msg.localStartAt
        ? formatLocalDateTime(msg.localStartAt)
        : formatTimestamp(msg.startAt)
    ) : null;

  const metrics = [
    { label: "Sent", value: msg.sent ?? 0 },
    { label: "Views", value: msg.view ?? 0 },
    { label: "Clicks", value: msg.click ?? 0 },
    { label: "Goals", value: msg.goal ?? 0 },
  ];

  return (
    <article className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <header className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {msg.name}
        </h2>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span
            className={`px-2 py-0.5 text-sm font-medium rounded ${
              msg.state === "sent"
                ? "bg-green-100 text-green-800"
                : msg.state === "draft" || msg.state === "waiting"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {formattedStatus}
          </span>
          {formattedMedium && (
            <span className="px-2 py-0.5 text-sm text-gray-700 bg-gray-100 rounded">
              {formattedMedium}
            </span>
          )}
          {formattedSendMode && (
            <span className="px-2 py-0.5 text-sm text-gray-700 bg-gray-100 rounded">
              {formattedSendMode}
            </span>
          )}
        </div>
      </header>

      {/* Schedule & Flags */}
      <section className="mb-4 text-sm text-gray-600 space-y-1">
        {scheduledAt && (
          <p>
            <strong>Scheduled At:</strong> {scheduledAt}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {msg.advertising && (
            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
              Advertising
            </span>
          )}
          {msg.sendToOfflineXms && (
            <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded">
              Offline XMS
            </span>
          )}
          {msg.sendToOfflineEmail && (
            <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded">
              Offline Email
            </span>
          )}
        </div>
      </section>

      {/* Metrics */}
      <section>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Metrics</h3>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {metrics.map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <dt className="text-gray-600">{label}</dt>
              <dd className="font-medium text-gray-800">
                {value.toLocaleString()}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
