import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace open {
        export namespace marketing {
            export interface OneTimeMsgView {
                oneTimeMsg?: AutoViewInputSubTypes.marketing.OneTimeMsg;
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
export type AutoViewInput = AutoViewInputSubTypes.open.marketing.OneTimeMsgView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const msg = value.oneTimeMsg;
  // Empty state if no message
  if (!msg) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <p className="text-sm">No message data available</p>
      </div>
    );
  }

  // State mapping for label, icon, and colors
  const stateMap: Record<AutoViewInputSubTypes.marketing.OneTimeMsg['state'], {
    label: string;
    icon: JSX.Element;
    bg: string;
    text: string;
  }> = {
    draft: {
      label: 'Draft',
      icon: <LucideReact.Edit2 size={16} />,
      bg: 'bg-gray-100',
      text: 'text-gray-800',
    },
    waiting: {
      label: 'Scheduled',
      icon: <LucideReact.Clock size={16} />,
      bg: 'bg-amber-100',
      text: 'text-amber-800',
    },
    sent: {
      label: 'Sent',
      icon: <LucideReact.CheckCircle size={16} />,
      bg: 'bg-green-100',
      text: 'text-green-800',
    },
    canceled: {
      label: 'Canceled',
      icon: <LucideReact.XCircle size={16} />,
      bg: 'bg-red-100',
      text: 'text-red-800',
    },
    removed: {
      label: 'Removed',
      icon: <LucideReact.Trash2 size={16} />,
      bg: 'bg-red-50',
      text: 'text-red-600',
    },
  };
  const stateInfo = stateMap[msg.state];

  // Send medium mapping
  type MediumKey = Exclude<AutoViewInputSubTypes.marketing.OneTimeMsg['sendMedium'], undefined>;
  const mediumMap: Partial<Record<MediumKey, { label: string; icon: JSX.Element }>> = {
    email: {
      label: 'Email',
      icon: <LucideReact.Mail size={16} />,
    },
    inAppChat: {
      label: 'In-App Chat',
      icon: <LucideReact.MessageSquare size={16} />,
    },
    appAlimtalk: {
      label: 'Alimtalk',
      icon: <LucideReact.MessageCircle size={16} />,
    },
    appLine: {
      label: 'LINE',
      icon: <LucideReact.MessageCircle size={16} />,
    },
    xms: {
      label: 'XMS',
      icon: <LucideReact.MessageSquare size={16} />,
    },
  };
  const mediumInfo = msg.sendMedium ? mediumMap[msg.sendMedium as MediumKey] : undefined;

  // Format dates
  const formattedStart = msg.localStartAt
    ? new Date(msg.localStartAt).toLocaleString()
    : msg.startAt
      ? new Date(msg.startAt).toLocaleString()
      : '—';
  const createdAt = msg.createdAt
    ? new Date(msg.createdAt).toLocaleString()
    : '—';
  const updatedAt = msg.updatedAt
    ? new Date(msg.updatedAt).toLocaleString()
    : '—';

  // Stats with defaults
  const stats: { label: string; value: number; icon: JSX.Element }[] = [
    { label: 'Sent', value: msg.sent ?? 0, icon: <LucideReact.Send size={16} /> },
    { label: 'Opened', value: msg.view ?? 0, icon: <LucideReact.Eye size={16} /> },
    { label: 'Clicked', value: msg.click ?? 0, icon: <LucideReact.MousePointer size={16} /> },
    { label: 'Goal', value: msg.goal ?? 0, icon: <LucideReact.Target size={16} /> },
  ];

  // Feature badges
  const badges: JSX.Element[] = [];
  if (msg.advertising) {
    badges.push(
      <span
        key="adv"
        className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-800"
      >
        <LucideReact.Megaphone size={12} className="mr-1" />
        Advertising
      </span>
    );
  }
  if (msg.sendToOfflineEmail) {
    badges.push(
      <span
        key="off-email"
        className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-purple-100 text-purple-800"
      >
        <LucideReact.Mail size={12} className="mr-1" />
        Offline Email
      </span>
    );
  }
  if (msg.sendToOfflineXms) {
    badges.push(
      <span
        key="off-xms"
        className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-indigo-100 text-indigo-800"
      >
        <LucideReact.MessageSquare size={12} className="mr-1" />
        Offline XMS
      </span>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 truncate">
          <LucideReact.MessageSquare size={24} className="text-indigo-500 flex-shrink-0" />
          <h3 className="text-lg font-semibold text-gray-900 truncate">{msg.name}</h3>
        </div>
        <div
          className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded ${stateInfo.bg} ${stateInfo.text}`}
        >
          {stateInfo.icon}
          <span className="ml-1">{stateInfo.label}</span>
        </div>
      </div>

      {/* Medium & Dates */}
      <div className="mt-3 flex flex-wrap items-center text-sm text-gray-600 space-x-4">
        {mediumInfo && (
          <div className="flex items-center space-x-1">
            {mediumInfo.icon}
            <span>{mediumInfo.label}</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Scheduled: {formattedStart}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Clock size={16} />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.RefreshCw size={16} />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center space-x-2">
            {s.icon}
            <div>
              <p className="text-sm font-medium text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      {badges.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{badges}</div>}
    </div>
  );
}
