import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    export type SendMediumSettings = {
      type: string;
    };
    export type OneTimeMsgDraft = {
      oneTimeMsg: AutoViewInputSubTypes.marketing.OneTimeMsg;
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
  AutoViewInputSubTypes.open.marketing.OneTimeMsgsView;

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helpers
  const formatNumber = (num?: number): string => {
    if (num == null) return "-";
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDateTime = (input?: string | number): string | null => {
    if (input == null) return null;
    const d = typeof input === "string" ? new Date(input) : new Date(input);
    return d.toLocaleString();
  };

  // State icon mapping
  const stateMap: Record<
    string,
    { Icon: React.ComponentType<any>; color: string; label: string }
  > = {
    draft: { Icon: LucideReact.Clock, color: "text-gray-500", label: "Draft" },
    waiting: {
      Icon: LucideReact.Clock,
      color: "text-amber-500",
      label: "Waiting",
    },
    sent: {
      Icon: LucideReact.CheckCircle,
      color: "text-green-500",
      label: "Sent",
    },
    canceled: {
      Icon: LucideReact.XCircle,
      color: "text-red-500",
      label: "Canceled",
    },
    removed: {
      Icon: LucideReact.XCircle,
      color: "text-red-500",
      label: "Removed",
    },
  };

  // Medium icon mapping
  const mediumMap: Record<
    string,
    { Icon: React.ComponentType<any>; label: string }
  > = {
    email: { Icon: LucideReact.Mail, label: "Email" },
    inAppChat: { Icon: LucideReact.MessageSquare, label: "In-App Chat" },
    xms: { Icon: LucideReact.MessageCircle, label: "XMS" },
    appLine: { Icon: LucideReact.MessageSquare, label: "Line" },
    appAlimtalk: { Icon: LucideReact.MessageCircle, label: "Alimtalk" },
  };

  const msgs = value.oneTimeMsgs ?? [];

  // Empty state
  if (msgs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No messages available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {msgs.map((msg, idx) => {
        const key = msg.id ?? idx.toString();
        const {
          Icon: StateIcon,
          color: stateColor,
          label: stateLabel,
        } = stateMap[msg.state] || stateMap.draft;
        const med = msg.sendMedium
          ? mediumMap[msg.sendMedium] || {
              Icon: LucideReact.MessageSquare,
              label: msg.sendMedium,
            }
          : null;
        const scheduled = formatDateTime(msg.localStartAt ?? msg.startAt);
        const created = formatDateTime(msg.createdAt);

        return (
          <div
            key={key}
            className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Left: Meta */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {msg.name}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <StateIcon size={16} className={stateColor} />
                <span className="text-gray-600">{stateLabel}</span>
              </div>
              {scheduled && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span>Scheduled: {scheduled}</span>
                </div>
              )}
              {med && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <med.Icon size={16} className="text-gray-400" />
                  <span>{med.label}</span>
                </div>
              )}
              {msg.advertising && (
                <div className="flex items-center gap-2 text-sm text-blue-500">
                  <LucideReact.Tag size={16} />
                  <span>Advertising</span>
                </div>
              )}
              {created && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span>Created: {created}</span>
                </div>
              )}
            </div>
            {/* Right: Statistics */}
            <ul className="flex flex-wrap gap-4 text-sm text-gray-600">
              <li className="flex items-center gap-1">
                <LucideReact.Send size={16} className="text-gray-400" />
                <span>{formatNumber(msg.sent)}</span>
              </li>
              <li className="flex items-center gap-1">
                <LucideReact.Eye size={16} className="text-gray-400" />
                <span>{formatNumber(msg.view)}</span>
              </li>
              <li className="flex items-center gap-1">
                <LucideReact.Target size={16} className="text-gray-400" />
                <span>{formatNumber(msg.goal)}</span>
              </li>
              <li className="flex items-center gap-1">
                <LucideReact.MousePointer2
                  size={16}
                  className="text-gray-400"
                />
                <span>{formatNumber(msg.click)}</span>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
