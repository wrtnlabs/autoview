import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace open {
        export namespace marketing {
            export interface OneTimeMsgsView {
                next?: number;
                oneTimeMsgs?: AutoViewInputSubTypes.marketing.OneTimeMsg[];
            }
        }
    }
    export namespace marketing {
        export interface OneTimeMsg {
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
        }
        export interface SendMediumSettings {
            type: string;
        }
        export interface OneTimeMsgDraft {
            oneTimeMsg: AutoViewInputSubTypes.marketing.OneTimeMsg;
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
}
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.OneTimeMsgsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateConfig: Record<AutoViewInputSubTypes.marketing.OneTimeMsg["state"], { icon: JSX.Element; label: string }> = {
    draft: {
      icon: <LucideReact.Clock className="text-amber-500" size={16} />,
      label: "Draft",
    },
    waiting: {
      icon: <LucideReact.Clock className="text-amber-500" size={16} />,
      label: "Waiting",
    },
    sent: {
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
      label: "Sent",
    },
    canceled: {
      icon: <LucideReact.XCircle className="text-red-500" size={16} />,
      label: "Canceled",
    },
    removed: {
      icon: <LucideReact.Trash2 className="text-gray-400" size={16} />,
      label: "Removed",
    },
  };

  const mediumConfig: Record<string, { icon: JSX.Element; label: string }> = {
    appAlimtalk: {
      icon: <LucideReact.MessageSquare className="text-blue-500" size={16} />,
      label: "AlimTalk",
    },
    appLine: {
      icon: <LucideReact.MessageSquare className="text-green-500" size={16} />,
      label: "Line",
    },
    email: {
      icon: <LucideReact.Mail className="text-gray-500" size={16} />,
      label: "Email",
    },
    inAppChat: {
      icon: <LucideReact.MessageCircle className="text-indigo-500" size={16} />,
      label: "In-App Chat",
    },
    xms: {
      icon: <LucideReact.MessageSquare className="text-purple-500" size={16} />,
      label: "XMS",
    },
  };

  const modeLabels: Record<string, string> = {
    immediately: "Immediately",
    reservedWithSenderTime: "Reserved (Sender Time)",
    reservedWithReceiverTime: "Reserved (Receiver Time)",
  };

  const formatDate = (ts?: number): string =>
    ts ? new Date(ts).toLocaleString() : "—";

  const msgs = value.oneTimeMsgs ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  if (msgs.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span className="text-lg">No messages available</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {msgs.map((msg, idx) => {
          const state = msg.state;
          const stateInfo = stateConfig[state] || {
            icon: <LucideReact.Circle className="text-gray-400" size={16} />,
            label: state,
          };
          const medium = msg.sendMedium || "";
          const mediumInfo = mediumConfig[medium] || {
            icon: <LucideReact.MessageSquare className="text-gray-400" size={16} />,
            label: medium || "—",
          };
          const sendMode = modeLabels[msg.sendMode || ""] || "—";
          const sent = msg.sent ?? 0;
          const viewed = msg.view ?? 0;
          const clicked = msg.click ?? 0;
          const goal = msg.goal ?? 0;
          return (
            <div
              key={msg.id ?? idx}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {stateInfo.icon}
                    <h3 className="text-gray-800 font-medium truncate">
                      {msg.name}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-600">{stateInfo.label}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-3">
                  <div className="flex items-center gap-1">
                    {mediumInfo.icon}
                    <span>{mediumInfo.label}</span>
                  </div>
                  <div className="text-gray-400">|</div>
                  <span>{sendMode}</span>
                  {msg.advertising && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Tag size={16} className="text-blue-500" />
                      <span>Advertising</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
                  <div className="flex items-center gap-1">
                    <LucideReact.Send size={16} className="text-gray-500" />
                    <span>{sent}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.Eye size={16} className="text-gray-500" />
                    <span>{viewed}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.MousePointer2 size={16} className="text-gray-500" />
                    <span>{clicked}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.Target size={16} className="text-gray-500" />
                    <span>{goal}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-gray-400">
                  <LucideReact.Calendar size={14} className="mr-1" />
                  <span>Created: {formatDate(msg.createdAt)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {value.next !== undefined && (
        <div className="mt-6 flex justify-center items-center text-blue-600 text-sm">
          <LucideReact.ChevronDown size={16} className="mr-1 animate-pulse" />
          <span>Load more messages...</span>
        </div>
      )}
    </div>
  );
}
