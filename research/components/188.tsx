import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ThreadView = {
                    chat?: AutoViewInputSubTypes.legacy.v4.LegacyV4Chat;
                    message?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Message;
                    bot?: AutoViewInputSubTypes.legacy.v4.LegacyV4Bot;
                    managers?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager[];
                    thread?: AutoViewInputSubTypes.legacy.v4.LegacyV4Thread;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Chat = {
                active?: boolean;
                channelId?: string;
                id?: string;
                managerIds?: string[] & tags.UniqueItems;
            };
            export namespace message {
                export type LegacyV4Message = {
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
                };
                export type LegacyV4Block = {
                    type: "bullets" | "code" | "text";
                    language?: string;
                    value?: string;
                    blocks?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Block[];
                };
                export type LegacyV4Button = {
                    title: string;
                    colorVariant?: "cobalt" | "green" | "orange" | "red" | "black" | "pink" | "purple";
                    url: string;
                };
                export type LegacyV4File = {
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
                };
                export type LegacyV4Log = {
                    action?: "changeName" | "changeScope" | "close" | "create" | "invite" | "join" | "assign" | "unassign" | "leave" | "open" | "remove" | "snooze" | "addTags" | "removeTags";
                    values?: string[];
                };
                export type LegacyV4Reaction = {
                    emojiName: string;
                    personKeys?: string[] & tags.UniqueItems;
                    empty?: boolean;
                };
                export type LegacyV4ProfileBotInput = {
                    id?: string;
                    key?: string;
                    type?: string;
                    name?: string;
                    value?: AutoViewInputSubTypes.AttributeValue;
                };
                export type LegacyV4MessageMarketing = {
                    type?: string;
                    id?: string;
                    advertising?: boolean;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    exposureType?: "fullScreen";
                };
                export type LegacyV4MessageSupportBot = {
                    id?: string;
                    revisionId?: string;
                    sectionId?: string;
                    stepIndex?: number & tags.Type<"int32">;
                    buttons?: AutoViewInputSubTypes.legacy.v4.LegacyV4SupportBotRouteSection_dollar_LegacyV4Button[];
                    submitButtonIndex?: number & tags.Type<"int32">;
                };
            }
            export type LegacyV4WebPage = {
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
            };
            export type LegacyV4SupportBotRouteSection_dollar_LegacyV4Button = {
                text: string;
                nextSectionId: string;
            };
            export type LegacyV4Bot = {
                id?: string;
                channelId?: string;
                name: string;
                createdAt?: number;
                avatar?: AutoViewInputSubTypes.legacy.v4.LegacyV4TinyFile;
                avatarUrl?: string;
                color: string & tags.Default<"#123456">;
            };
            export type LegacyV4TinyFile = {
                bucket: string;
                key: string;
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
            };
            export type LegacyV4Manager = {
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
            };
            export type LegacyV4Thread = {
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
            };
        }
    }
    export type AttributeValue = {
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
    };
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ThreadView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isActive = value.chat?.active;
  const channelId = value.chat?.channelId || "Unknown Channel";

  // Derive a text preview from plainText or blocks
  const rawText = value.message?.plainText
    || value.message?.blocks?.map(b => b.value || "").join(" ")
    || "No content available";

  // Truncate to 200 characters for safety
  const previewText = rawText.length > 200 ? rawText.slice(0, 197) + "..." : rawText;

  // Format dates
  const createdAt = value.message?.createdAt
    ? new Date(value.message.createdAt).toLocaleString()
    : undefined;
  const updatedAt = value.thread?.updatedAt
    ? new Date(value.thread.updatedAt).toLocaleString()
    : undefined;

  // Map message state to badge styles
  const stateMap: Record<string, { label: string; bg: string; text: string }> = {
    sending: { label: "Sending", bg: "bg-blue-100", text: "text-blue-800" },
    sent:    { label: "Sent",    bg: "bg-green-100", text: "text-green-800" },
    failed:  { label: "Failed",  bg: "bg-red-100",  text: "text-red-800" },
    removed: { label: "Removed", bg: "bg-gray-100", text: "text-gray-800" },
  };
  const stateKey = value.message?.state || "removed";
  const stateInfo = stateMap[stateKey] || stateMap.removed;

  // Bot info
  const botName = value.bot?.name;
  const botColor = value.bot?.color || "#888";

  // Thread info
  const replyCount = value.thread?.replyCount ?? 0;

  // Managers
  const mgrs = value.managers || [];
  const managerLabel =
    mgrs.length === 1 ? mgrs[0].name : `${mgrs.length} managers`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
          <span className="text-sm text-gray-500 truncate">{channelId}</span>
        </div>
        {botName && (
          <span
            className="px-2 py-1 rounded text-sm font-semibold text-white truncate"
            style={{ backgroundColor: botColor }}
          >
            {botName}
          </span>
        )}
      </div>

      {/* Content Preview */}
      <p className="mt-3 text-gray-700 text-sm leading-relaxed line-clamp-2">
        {previewText}
      </p>

      {/* Footer */}
      <div className="mt-4 flex flex-wrap justify-between items-center text-xs text-gray-500">
        <div className="flex space-x-4">
          {createdAt && (
            <div>
              <span className="font-semibold text-gray-700">Created:</span>{" "}
              {createdAt}
            </div>
          )}
          {updatedAt && (
            <div>
              <span className="font-semibold text-gray-700">Updated:</span>{" "}
              {updatedAt}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3 mt-2 sm:mt-0">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${stateInfo.bg} ${stateInfo.text}`}
          >
            {stateInfo.label}
          </span>
          <span>
            <span className="font-semibold text-gray-700">Replies:</span>{" "}
            {replyCount}
          </span>
          {mgrs.length > 0 && (
            <span title={mgrs.map(m => m.name).join(", ")}>
              <span className="font-semibold text-gray-700">Managers:</span>{" "}
              {managerLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
