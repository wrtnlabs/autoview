import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
          sendMode?:
            | "immediately"
            | "reservedWithSenderTime"
            | "reservedWithReceiverTime";
          sendMedium?:
            | "appAlimtalk"
            | "appLine"
            | "email"
            | "inAppChat"
            | "xms";
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
      sendMode?:
        | "immediately"
        | "reservedWithSenderTime"
        | "reservedWithReceiverTime";
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
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4OneTimeMsgView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived configurations and formatting functions
  const msg = value.oneTimeMsg;
  const stateConfig = {
    draft: { label: "Draft", icon: LucideReact.Edit, color: "text-blue-500" },
    waiting: {
      label: "Waiting",
      icon: LucideReact.Clock,
      color: "text-amber-500",
    },
    sent: {
      label: "Sent",
      icon: LucideReact.CheckCircle,
      color: "text-green-500",
    },
    canceled: {
      label: "Canceled",
      icon: LucideReact.XCircle,
      color: "text-red-500",
    },
    removed: {
      label: "Removed",
      icon: LucideReact.Trash2,
      color: "text-gray-500",
    },
  } as const;

  const fmtNumber = (n?: number) =>
    n != null ? new Intl.NumberFormat().format(n) : "-";
  const fmtDate = (ts?: number) =>
    ts != null ? new Date(ts).toLocaleString() : "-";

  if (!msg) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg">
        <LucideReact.AlertCircle className="text-gray-400" size={48} />
        <span className="mt-2 text-gray-500">No message data available</span>
      </div>
    );
  }

  const cfg = stateConfig[msg.state];
  const medium = msg.sendMedium
    ? msg.sendMedium.charAt(0).toUpperCase() + msg.sendMedium.slice(1)
    : "-";
  const mode =
    msg.sendMode === "immediately"
      ? "Immediate"
      : msg.sendMode === "reservedWithSenderTime"
        ? "Reserved (Sender)"
        : msg.sendMode === "reservedWithReceiverTime"
          ? "Reserved (Receiver)"
          : "-";

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {msg.name}
        </h2>
        <div className="flex items-center">
          <cfg.icon className={`${cfg.color}`} size={20} />
          <span className={`ml-1 text-sm font-medium ${cfg.color}`}>
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Basic Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm text-gray-700">
        <div className="flex items-center">
          <LucideReact.Mail className="text-gray-400 mr-2" size={16} />
          <span>Medium:</span>
          <span className="ml-auto font-medium text-gray-900">{medium}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Settings className="text-gray-400 mr-2" size={16} />
          <span>Mode:</span>
          <span className="ml-auto font-medium text-gray-900">{mode}</span>
        </div>
        {msg.startAt != null && (
          <div className="flex items-center">
            <LucideReact.Calendar className="text-gray-400 mr-2" size={16} />
            <span>Scheduled:</span>
            <span className="ml-auto font-medium text-gray-900">
              {fmtDate(msg.startAt)}
            </span>
          </div>
        )}
        <div className="flex items-center">
          {msg.enableSupportBot ? (
            <LucideReact.CheckCircle
              className="text-green-500 mr-2"
              size={16}
            />
          ) : (
            <LucideReact.XCircle className="text-red-500 mr-2" size={16} />
          )}
          <span>Support Bot</span>
          <span className="ml-auto font-medium text-gray-900">
            {msg.enableSupportBot ? "Enabled" : "Disabled"}
          </span>
        </div>
        <div className="flex items-center">
          {msg.advertising ? (
            <LucideReact.CheckCircle
              className="text-green-500 mr-2"
              size={16}
            />
          ) : (
            <LucideReact.XCircle className="text-red-500 mr-2" size={16} />
          )}
          <span>Advertising</span>
          <span className="ml-auto font-medium text-gray-900">
            {msg.advertising ? "On" : "Off"}
          </span>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div>
          <span className="text-gray-500">Sent</span>
          <div className="flex items-center mt-1">
            <LucideReact.Send className="text-gray-500 mr-1" size={16} />
            <span className="font-medium text-gray-900">
              {fmtNumber(msg.sent)}
            </span>
          </div>
        </div>
        <div>
          <span className="text-gray-500">Views</span>
          <div className="flex items-center mt-1">
            <LucideReact.Eye className="text-gray-500 mr-1" size={16} />
            <span className="font-medium text-gray-900">
              {fmtNumber(msg.view)}
            </span>
          </div>
        </div>
        <div>
          <span className="text-gray-500">Clicks</span>
          <div className="flex items-center mt-1">
            <LucideReact.MousePointer
              className="text-gray-500 mr-1"
              size={16}
            />
            <span className="font-medium text-gray-900">
              {fmtNumber(msg.click)}
            </span>
          </div>
        </div>
        <div>
          <span className="text-gray-500">Goals</span>
          <div className="flex items-center mt-1">
            <LucideReact.Target className="text-gray-500 mr-1" size={16} />
            <span className="font-medium text-gray-900">
              {fmtNumber(msg.goal)}
            </span>
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
        <span>Created: {fmtDate(msg.createdAt)}</span>
        <span>Updated: {fmtDate(msg.updatedAt)}</span>
      </div>
    </div>
  );
}
