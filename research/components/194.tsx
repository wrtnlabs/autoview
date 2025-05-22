import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4OneTimeMsgsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const messages = value.oneTimeMsgs ?? [];

  const formatDate = (ts?: number): string => {
    if (!ts) return "—";
    try {
      return new Date(ts).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return String(ts);
    }
  };

  const stateConfig: Record<
    string,
    { icon: JSX.Element; label: string; badge: string }
  > = {
    draft: {
      icon: <LucideReact.Clock size={16} className="text-yellow-500" />,
      label: "Draft",
      badge: "bg-yellow-100 text-yellow-800",
    },
    waiting: {
      icon: <LucideReact.Clock size={16} className="text-amber-500" />,
      label: "Scheduled",
      badge: "bg-amber-100 text-amber-800",
    },
    sent: {
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      label: "Sent",
      badge: "bg-green-100 text-green-800",
    },
    canceled: {
      icon: <LucideReact.XCircle size={16} className="text-red-500" />,
      label: "Canceled",
      badge: "bg-red-100 text-red-800",
    },
    removed: {
      icon: <LucideReact.Trash2 size={16} className="text-gray-500" />,
      label: "Removed",
      badge: "bg-gray-100 text-gray-800",
    },
  };

  const mediumIcon: Record<string, JSX.Element> = {
    email: <LucideReact.Mail size={16} className="text-gray-500" />,
    appAlimtalk: (
      <LucideReact.MessageCircle size={16} className="text-gray-500" />
    ),
    appLine: <LucideReact.MessageCircle size={16} className="text-gray-500" />,
    inAppChat: (
      <LucideReact.MessageSquare size={16} className="text-gray-500" />
    ),
    xms: <LucideReact.MessageSquare size={16} className="text-gray-500" />,
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span className="text-lg">No messages to display</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg, idx) => {
        const cfg = stateConfig[msg.state] ?? stateConfig["draft"];
        const scheduleAt = formatDate(msg.startAt ?? msg.createdAt);
        return (
          <div
            key={msg.id ?? idx}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {msg.name}
              </h3>
              <span
                className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${cfg.badge}`}
              >
                {cfg.icon}
                <span className="ml-1">{cfg.label}</span>
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                {mediumIcon[msg.sendMedium ?? "email"]}
                <span>
                  {(msg.sendMedium ?? "email").replace(/([A-Z])/g, " $1")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>{scheduleAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.PieChart size={16} className="text-gray-400" />
                <span>Goal: {msg.goal ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Send size={16} className="text-gray-400" />
                <span>Sent: {msg.sent ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Eye size={16} className="text-gray-400" />
                <span>Viewed: {msg.view ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.MousePointer size={16} className="text-gray-400" />
                <span>Clicked: {msg.click ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                {msg.enableSupportBot ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                  />
                ) : (
                  <LucideReact.XCircle size={16} className="text-red-500" />
                )}
                <span>Support Bot</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Tag size={16} className="text-blue-500" />
                <span>{msg.advertising ? "Advertising" : "Organic"}</span>
              </div>
            </div>
          </div>
        );
      })}

      {typeof value.next === "number" && (
        <div className="flex items-center justify-center text-sm text-gray-500">
          <span>More messages available</span>
          <LucideReact.ChevronsRight size={16} className="ml-1" />
        </div>
      )}
    </div>
  );
}
