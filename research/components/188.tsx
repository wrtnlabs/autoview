import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4ThreadView {
                    chat?: AutoViewInputSubTypes.legacy.v4.LegacyV4Chat;
                    message?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Message;
                    bot?: AutoViewInputSubTypes.legacy.v4.LegacyV4Bot;
                    managers?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager[];
                    thread?: AutoViewInputSubTypes.legacy.v4.LegacyV4Thread;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4Chat {
                active?: boolean;
                channelId?: string;
                id?: string;
                managerIds?: string[] & tags.UniqueItems;
            }
            export namespace message {
                export interface LegacyV4Message {
                    chatKey?: string;
                    id?: string;
                    mainKey?: string;
                    threadKey?: string;
                    root?: boolean;
                    channelId?: string;
                    chatType?: string;
                    chatId?: string;
                    personType?: string;
                    personId?: string;
                    requestId?: string;
                    language?: string;
                    createdAt?: number;
                    version?: number & tags.Type<"int32">;
                    blocks?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block[];
                    plainText?: string;
                    updatedAt?: number;
                    buttons?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Button[] & tags.MinItems<1> & tags.MaxItems<2>;
                    files?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4File[] & tags.MinItems<1> & tags.MaxItems<4>;
                    webPage?: AutoViewInputSubTypes.legacy.v4.LegacyV4WebPage;
                    log?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Log;
                    reactions?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Reaction[];
                    profileBot?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4ProfileBotInput[] & tags.MinItems<1> & tags.MaxItems<2147483647>;
                    state?: "sending" | "sent" | "failed" | "removed";
                    options?: ("actAsManager" | "displayAsChannel" | "doNotPost" | "doNotSearch" | "doNotSendApp" | "doNotUpdateDesk" | "immutable" | "private" | "silent")[] & tags.UniqueItems;
                    marketing?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4MessageMarketing;
                    supportBot?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4MessageSupportBot;
                    threadMsg?: boolean;
                    broadcastedMsg?: boolean;
                    rootMessageId?: string;
                }
                export interface LegacyV4Block {
                    type: "bullets" | "code" | "text";
                    language?: string;
                    value?: string;
                    blocks?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block[];
                }
                export interface LegacyV4Button {
                    title: string;
                    colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
                    url: string;
                }
                export interface LegacyV4File {
                    id: string;
                    type?: string;
                    name: string;
                    size: number & tags.Type<"int32">;
                    contentType?: string;
                    duration?: number;
                    width?: number & tags.Type<"int32">;
                    height?: number & tags.Type<"int32">;
                    orientation?: number & tags.Type<"int32">;
                    animated?: boolean;
                    bucket: string;
                    key: string;
                    previewKey?: string;
                    channelId?: string;
                    chatType?: string;
                    chatId?: string;
                }
                export interface LegacyV4Log {
                    action?: "changeName" | "changeScope" | "close" | "create" | "invite" | "join" | "assign" | "unassign" | "leave" | "open" | "remove" | "snooze" | "addTags" | "removeTags";
                    values?: string[];
                }
                export interface LegacyV4Reaction {
                    emojiName: string;
                    personKeys?: string[] & tags.UniqueItems;
                    empty?: boolean;
                }
                export interface LegacyV4ProfileBotInput {
                    id?: string;
                    key?: string;
                    type?: string;
                    name?: string;
                    value?: AutoViewInputSubTypes.AttributeValue;
                }
                export interface LegacyV4MessageMarketing {
                    type?: string;
                    id?: string;
                    advertising?: boolean;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    exposureType?: "fullScreen";
                }
                export interface LegacyV4MessageSupportBot {
                    id?: string;
                    revisionId?: string;
                    sectionId?: string;
                    stepIndex?: number & tags.Type<"int32">;
                    buttons?: AutoViewInputSubTypes.legacy.v4.LegacyV4SupportBotRouteSection_dollar_LegacyV4Button[];
                    submitButtonIndex?: number & tags.Type<"int32">;
                }
            }
            export interface LegacyV4WebPage {
                id: string;
                url: string;
                title?: string;
                description?: string;
                imageUrl?: string;
                videoUrl?: string;
                publisher?: string;
                author?: string;
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
                bucket?: string;
                previewKey?: string;
                logo?: string;
                name?: string;
            }
            export interface LegacyV4SupportBotRouteSection_dollar_LegacyV4Button {
                text: string;
                nextSectionId: string;
            }
            export interface LegacyV4Bot {
                id?: string;
                channelId?: string;
                name: string;
                createdAt?: number;
                avatar?: AutoViewInputSubTypes.legacy.v4.LegacyV4TinyFile;
                avatarUrl?: string;
                color: string & tags.Default<"#123456">;
            }
            export interface LegacyV4TinyFile {
                bucket: string;
                key: string;
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
            }
            export interface LegacyV4Manager {
                id?: string;
                channelId?: string;
                accountId?: string;
                name: string;
                description?: string;
                showDescriptionToFront?: boolean;
                nameDescI18nMap?: {
                    [key: string]: AutoViewInputSubTypes.NameDesc;
                };
                profile?: {
                    [key: string]: {};
                };
                email: string;
                showEmailToFront?: boolean;
                mobileNumber?: string & tags.Default<"+18004424000">;
                showMobileNumberToFront?: boolean;
                role: "owner" | "member";
                removed?: boolean;
                createdAt?: number;
                displayAsChannel?: boolean;
                defaultGroupWatch?: "all" | "info" | "none";
                defaultDirectChatWatch?: "all" | "info" | "none";
                defaultUserChatWatch?: "all" | "info" | "none";
                operatorScore?: number;
                touchScore?: number;
                avatar?: AutoViewInputSubTypes.TinyFile;
                operatorEmailReminder?: boolean;
                operator?: boolean;
                statusEmoji?: string;
                statusText?: string;
                statusClearAt?: number;
                managerId?: string;
                avatarUrl?: string;
                emailForFront?: string;
                mobileNumberForFront?: string & tags.Default<"+18004424000">;
            }
            export interface LegacyV4Thread {
                id?: string;
                channelId?: string;
                managerIds?: string[] & tags.UniqueItems;
                repliedManagerIds?: string[] & tags.UniqueItems;
                replyCount?: number & tags.Type<"int32">;
                lastMessageId?: string;
                version?: number & tags.Type<"int32">;
                updatedAt?: number;
                createdAt?: number;
                chatType?: string;
                chatId?: string;
                chatKey?: string;
                rootMessageId?: string;
            }
        }
    }
    export interface AttributeValue {
        s?: string;
        n?: string;
        b?: {
            short?: number & tags.Type<"int32">;
            char?: string;
            int?: number & tags.Type<"int32">;
            long?: number & tags.Type<"int32">;
            float?: number;
            double?: number;
            direct?: boolean;
            readOnly?: boolean;
        };
        m?: {
            [key: string]: AutoViewInputSubTypes.AttributeValue;
        };
        l?: AutoViewInputSubTypes.AttributeValue[];
        ss?: string[];
        ns?: string[];
        bs?: {
            short?: number & tags.Type<"int32">;
            char?: string;
            int?: number & tags.Type<"int32">;
            long?: number & tags.Type<"int32">;
            float?: number;
            double?: number;
            direct?: boolean;
            readOnly?: boolean;
        }[];
        "null"?: boolean;
        bool?: boolean;
    }
    export interface NameDesc {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    }
    export interface TinyFile {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ThreadView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const chatActive = value.chat?.active;
  const channelId = value.chat?.channelId ?? "";
  const managerCount = value.managers?.length ?? 0;
  const replyCount = value.thread?.replyCount ?? 0;
  const lastUpdated = value.thread?.updatedAt
    ? new Date(value.thread.updatedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const msg = value.message;
  const messageText = msg?.plainText?.trim() ?? "";
  const createdAt = msg?.createdAt
    ? new Date(msg.createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const getStateIcon = (state?: string) => {
    switch (state) {
      case "sending":
        return <LucideReact.Clock className="text-amber-500" size={16} />;
      case "sent":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "failed":
        return <LucideReact.AlertTriangle className="text-red-500" size={16} />;
      case "removed":
        return <LucideReact.XCircle className="text-gray-400" size={16} />;
      default:
        return null;
    }
  };

  const botName = value.bot?.name;
  const botAvatarUrl = value.bot?.avatarUrl;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto space-y-4">
      {/* Header: Chat & Bot Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {chatActive ? (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ) : (
            <LucideReact.XCircle className="text-gray-400" size={16} />
          )}
          <span className="text-sm font-medium text-gray-700 truncate">
            {channelId || "No Channel"}
          </span>
        </div>
        {botName && (
          <div className="flex items-center gap-2">
            <LucideReact.User className="text-gray-500" size={16} />
            <span className="text-sm text-gray-600 truncate">{botName}</span>
          </div>
        )}
      </div>

      {/* Thread Summary */}
      <div className="flex items-center text-sm text-gray-600 gap-4">
        <div className="flex items-center gap-1">
          <LucideReact.MessageCircle size={16} className="text-gray-500" />
          <span>{replyCount} replies</span>
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} className="text-gray-500" />
            <span>{lastUpdated}</span>
          </div>
        )}
      </div>

      {/* Message Preview */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Message:</span>
          <div className="flex items-center gap-1">
            {getStateIcon(msg?.state)}
            {createdAt && <span>{createdAt}</span>}
          </div>
        </div>
        {messageText ? (
          <p className="text-gray-700 text-sm line-clamp-3">{messageText}</p>
        ) : (
          <div className="flex items-center gap-2 text-gray-400">
            <LucideReact.AlertCircle size={20} />
            <span>No message content</span>
          </div>
        )}
      </div>

      {/* Managers */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Managers ({managerCount})</h4>
        {managerCount > 0 ? (
          <div className="flex flex-wrap gap-2">
            {value.managers!.map((mgr, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full truncate"
                title={mgr.name}
              >
                {mgr.name}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-400">
            <LucideReact.UserMinus size={16} />
            <span>No managers assigned</span>
          </div>
        )}
      </div>
    </div>
  );
}
