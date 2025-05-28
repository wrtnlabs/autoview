import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4OneTimeMsgsView {
                    oneTimeMsgs?: AutoViewInputSubTypes.legacy.v4.marketing.LegacyV4OneTimeMsg[];
                    next?: number;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4OneTimeMsgsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const messages = value.oneTimeMsgs ?? [];
  const totalCount = messages.length;

  const formatDateTime = (timestamp?: number): string => {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderState = (state?: string) => {
    switch (state) {
      case 'draft':
        return (
          <div className="flex items-center text-gray-500">
            <LucideReact.Edit size={16} aria-hidden={true} />
            <span className="ml-1 text-sm">Draft</span>
          </div>
        );
      case 'waiting':
        return (
          <div className="flex items-center text-amber-500">
            <LucideReact.Clock size={16} aria-hidden={true} />
            <span className="ml-1 text-sm">Waiting</span>
          </div>
        );
      case 'sent':
        return (
          <div className="flex items-center text-green-500">
            <LucideReact.CheckCircle size={16} aria-hidden={true} />
            <span className="ml-1 text-sm">Sent</span>
          </div>
        );
      case 'canceled':
        return (
          <div className="flex items-center text-red-500">
            <LucideReact.XCircle size={16} aria-hidden={true} />
            <span className="ml-1 text-sm">Canceled</span>
          </div>
        );
      case 'removed':
        return (
          <div className="flex items-center text-gray-400">
            <LucideReact.Trash2 size={16} aria-hidden={true} />
            <span className="ml-1 text-sm">Removed</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-500">
            <span className="ml-1 text-sm capitalize">{state}</span>
          </div>
        );
    }
  };

  const renderMedium = (medium?: string) => {
    if (!medium) return null;
    let icon: React.ReactNode;
    let label = medium;
    switch (medium) {
      case 'email':
        icon = <LucideReact.Mail size={16} aria-hidden={true} />;
        label = 'Email';
        break;
      case 'appAlimtalk':
        icon = <LucideReact.MessageSquare size={16} aria-hidden={true} />;
        label = 'Alimtalk';
        break;
      case 'appLine':
        icon = <LucideReact.MessageSquare size={16} aria-hidden={true} />;
        label = 'Line';
        break;
      case 'inAppChat':
        icon = <LucideReact.MessageSquare size={16} aria-hidden={true} />;
        label = 'In-App Chat';
        break;
      case 'xms':
        icon = <LucideReact.MessageSquare size={16} aria-hidden={true} />;
        label = 'XMS';
        break;
      default:
        icon = <LucideReact.Link size={16} aria-hidden={true} />;
    }
    return (
      <div className="flex items-center text-gray-400">
        {icon}
        <span className="ml-1 text-sm">{label}</span>
      </div>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Messages ({totalCount})
        </h2>
        {value.next != null && (
          <span className="text-sm text-gray-500">Next: {value.next}</span>
        )}
      </div>

      {totalCount === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} aria-hidden={true} />
          <p className="mt-2">No messages available</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg, idx) => (
            <li
              key={msg.id ?? idx}
              className="flex flex-col p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-2">
                  {renderState(msg.state)}
                  <span className="ml-2 text-gray-800 font-medium truncate">
                    {msg.name}
                  </span>
                </div>
                {renderMedium(msg.sendMedium)}
              </div>

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-500 text-sm">
                <div className="flex items-center">
                  <LucideReact.Calendar size={16} aria-hidden={true} />
                  <span className="ml-1">
                    {formatDateTime(msg.startAt ?? msg.createdAt)}
                  </span>
                </div>
                {msg.sendMode && (
                  <div className="flex items-center">
                    <LucideReact.Clock size={16} aria-hidden={true} />
                    <span className="ml-1 capitalize">{msg.sendMode}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <LucideReact.Send size={16} aria-hidden={true} />
                  <span className="ml-1">{msg.sent ?? 0}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Eye size={16} aria-hidden={true} />
                  <span className="ml-1">{msg.view ?? 0}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Flag size={16} aria-hidden={true} />
                  <span className="ml-1">{msg.goal ?? 0}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.MousePointer size={16} aria-hidden={true} />
                  <span className="ml-1">{msg.click ?? 0}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
