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
  const { chat, thread, bot, managers = [], message } = value;
  const chatStatus = chat?.active ? "Active" : "Inactive";
  const replyCount = thread?.replyCount ?? 0;
  const managerNames = managers.map((m) => m.name).filter(Boolean) as string[];
  const lastMsgText = message?.plainText ?? "No content";
  const truncatedMsg =
    lastMsgText.length > 100 ? `${lastMsgText.slice(0, 100)}…` : lastMsgText;
  const lastMsgDate = message?.createdAt
    ? new Date(message.createdAt).toLocaleString()
    : null;
  const updatedDate = thread?.updatedAt
    ? new Date(thread.updatedAt).toLocaleString()
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      {/* Chat Status */}
      <div className="flex items-center space-x-2">
        {chat?.active ? (
          <LucideReact.CheckCircle size={16} className="text-green-500" />
        ) : (
          <LucideReact.XCircle size={16} className="text-red-500" />
        )}
        <span className="text-sm font-medium text-gray-700">
          Chat is {chatStatus}
        </span>
      </div>

      {/* Bot Info */}
      {bot?.name && (
        <div className="flex items-center space-x-2">
          <LucideReact.Bot size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700">Bot: {bot.name}</span>
        </div>
      )}

      {/* Managers */}
      {managerNames.length > 0 && (
        <div>
          <div className="flex items-center space-x-2">
            <LucideReact.Users size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Managers ({managerNames.length})
            </span>
          </div>
          <div className="mt-1 flex flex-wrap gap-2">
            {managerNames.map((name, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Thread Replies */}
      <div className="flex items-center space-x-2">
        <LucideReact.MessageSquare size={16} className="text-gray-500" />
        <span className="text-sm text-gray-700">Replies: {replyCount}</span>
      </div>

      {/* Last Message Preview */}
      <div>
        <div className="text-sm font-medium text-gray-700">Last Message</div>
        <div className="text-sm text-gray-600 line-clamp-2 mt-1">
          {truncatedMsg}
        </div>
        {lastMsgDate && (
          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-1">
            <LucideReact.Calendar size={12} className="text-gray-400" />
            <span>{lastMsgDate}</span>
          </div>
        )}
      </div>

      {/* Thread Updated Date */}
      {updatedDate && (
        <div className="flex items-center space-x-2">
          <LucideReact.RefreshCw size={16} className="text-gray-500" />
          <span className="text-xs text-gray-500">Updated: {updatedDate}</span>
        </div>
      )}
    </div>
  );
}
