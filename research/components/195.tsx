import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4OneTimeMsgView {
                    oneTimeMsg?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4OneTimeMsg;
                }
            }
        }
        export namespace v4 {
            export namespace marketing {
                export interface LegacyV4OneTimeMsg {
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
                }
            }
        }
    }
    export namespace marketing {
        export interface SendMediumSettings {
            type: string;
        }
        export interface OneTimeMsgDraft {
            oneTimeMsg: AutoViewInputSubTypes.marketing.OneTimeMsg;
        }
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4OneTimeMsgView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const msg = value.oneTimeMsg;
  if (!msg) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500 bg-white rounded-lg shadow">
        <LucideReact.AlertCircle size={24} />
        <p className="mt-2">No message data available.</p>
      </div>
    );
  }

  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDateTime = (ts?: number): string =>
    ts
      ? new Date(ts).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      : '—';

  const startAt = formatDateTime(msg.startAt);
  const createdAt = formatDateTime(msg.createdAt);
  const updatedAt = formatDateTime(msg.updatedAt);

  // State mapping: icon + color
  const stateConfig: Record<string, { icon: JSX.Element; color: string }> = {
    draft: { icon: <LucideReact.Edit2 size={16} />, color: 'text-gray-500' },
    waiting: { icon: <LucideReact.Clock size={16} />, color: 'text-amber-500' },
    sent: { icon: <LucideReact.CheckCircle size={16} />, color: 'text-green-500' },
    canceled: { icon: <LucideReact.XCircle size={16} />, color: 'text-red-500' },
    removed: { icon: <LucideReact.MinusCircle size={16} />, color: 'text-red-500' },
  };
  const stateInfo = stateConfig[msg.state] || stateConfig.draft;

  // Medium icons mapping
  const mediumIcons = {
    email: LucideReact.Mail,
    inAppChat: LucideReact.MessageCircle,
    appLine: LucideReact.Slack,
    appAlimtalk: LucideReact.Smartphone,
    xms: LucideReact.MessageSquare,
  };
  const MediumIcon = msg.sendMedium
    ? (mediumIcons as Record<string, React.ComponentType<any>>)[msg.sendMedium]
    : null;

  // Metrics definition
  type Metric = { label: string; value?: number; icon: JSX.Element };
  const metrics: Metric[] = [
    { label: 'Sent', value: msg.sent, icon: <LucideReact.Send size={16} /> },
    { label: 'Viewed', value: msg.view, icon: <LucideReact.Eye size={16} /> },
    { label: 'Goal', value: msg.goal, icon: <LucideReact.Target size={16} /> },
    { label: 'Clicks', value: msg.click, icon: <LucideReact.MousePointer size={16} /> },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Name + State */}
      <div className="flex items-center justify-between">
        <h2 className="flex-1 text-lg font-semibold text-gray-800 truncate">{msg.name}</h2>
        <div className={`flex items-center gap-1 text-sm ${stateInfo.color}`}>
          {stateInfo.icon}
          <span className="capitalize">{msg.state}</span>
        </div>
      </div>

      {/* Schedule */}
      <div className="flex items-center text-sm text-gray-600 gap-1">
        <LucideReact.Calendar size={16} />
        <span>Scheduled: {startAt}</span>
      </div>

      {/* Send Mode & Medium */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-700">
        {msg.sendMode && (
          <div className="flex items-center gap-1">
            <LucideReact.Clock size={16} />
            <span className="capitalize">
              {msg.sendMode.replace(/([a-z])([A-Z])/g, '$1 $2')}
            </span>
          </div>
        )}
        {MediumIcon && (
          <div className="flex items-center gap-1">
            <MediumIcon size={16} className="text-gray-500" />
            <span className="capitalize">{msg.sendMedium}</span>
          </div>
        )}
      </div>

      {/* Features: Advertising & Support Bot */}
      <div className="flex items-center gap-4 text-gray-500">
        {msg.advertising && <LucideReact.Megaphone size={16} />}
        {msg.enableSupportBot && <LucideReact.MessageCircle size={16} />}
      </div>

      {/* Goal Event Name */}
      {msg.goalEventName && (
        <div className="flex items-center text-sm text-gray-600 gap-1">
          <LucideReact.Target size={16} />
          <span>Goal Event: {msg.goalEventName}</span>
        </div>
      )}

      {/* Metrics */}
      <div className="flex flex-wrap gap-6 text-gray-700">
        {metrics.map((mt) =>
          mt.value !== undefined ? (
            <div key={mt.label} className="flex items-center gap-1 text-sm">
              {mt.icon}
              <span>{mt.value}</span>
            </div>
          ) : null
        )}
      </div>

      {/* Timestamps */}
      <div className="flex flex-wrap text-xs text-gray-400 gap-4">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={12} />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={12} />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
