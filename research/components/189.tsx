import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
          buttons?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Button[] &
            tags.MinItems<1> &
            tags.MaxItems<2>;
          files?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4File[] &
            tags.MinItems<1> &
            tags.MaxItems<4>;
          webPage?: AutoViewInputSubTypes.legacy.v4.LegacyV4WebPage;
          log?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Log;
          reactions?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Reaction[];
          profileBot?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4ProfileBotInput[] &
            tags.MinItems<1> &
            tags.MaxItems<2147483647>;
          state?: "sending" | "sent" | "failed" | "removed";
          options?: (
            | "actAsManager"
            | "displayAsChannel"
            | "doNotPost"
            | "doNotSearch"
            | "doNotSendApp"
            | "doNotUpdateDesk"
            | "immutable"
            | "private"
            | "silent"
          )[] &
            tags.UniqueItems;
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
          colorVariant?:
            | "cobalt"
            | "green"
            | "orange"
            | "red"
            | "black"
            | "pink"
            | "purple";
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
          action?:
            | "changeName"
            | "changeScope"
            | "close"
            | "create"
            | "invite"
            | "join"
            | "assign"
            | "unassign"
            | "leave"
            | "open"
            | "remove"
            | "snooze"
            | "addTags"
            | "removeTags";
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
    null?: boolean;
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
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4ThreadView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { chat, message, bot, managers, thread } = value;
  const formattedThreadCreated = thread?.createdAt
    ? new Date(thread.createdAt).toLocaleString()
    : "";
  const formattedThreadUpdated = thread?.updatedAt
    ? new Date(thread.updatedAt).toLocaleString()
    : "";
  const formattedMessageTime = message?.createdAt
    ? new Date(message.createdAt).toLocaleString()
    : "";
  const managerNames = managers?.map((m) => m.name).filter(Boolean) ?? [];
  const managerDisplay =
    managerNames.length > 0
      ? managerNames.slice(0, 3).join(", ") +
        (managerNames.length > 3 ? ` +${managerNames.length - 3}` : "")
      : null;
  const messagePreview =
    message?.plainText ||
    message?.blocks?.[0]?.value ||
    "No content available.";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-full">
      {/* Thread Header */}
      {thread && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LucideReact.MessageCircle size={20} className="text-gray-500" />
            <span className="text-lg font-semibold text-gray-800">
              Thread Overview
            </span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <LucideReact.Calendar size={16} />
            <span>{formattedThreadCreated}</span>
          </div>
        </div>
      )}

      {/* Chat Status */}
      {chat && typeof chat.active === "boolean" && (
        <div className="flex items-center space-x-2 text-sm">
          {chat.active ? (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ) : (
            <LucideReact.XCircle className="text-red-500" size={16} />
          )}
          <span className="text-gray-700">
            {chat.active ? "Active Chat" : "Inactive Chat"}
          </span>
        </div>
      )}

      {/* Managers */}
      {managerDisplay && (
        <div className="flex items-center space-x-2 text-sm">
          <LucideReact.Users className="text-gray-500" size={16} />
          <span className="text-gray-700">Managers: {managerDisplay}</span>
        </div>
      )}

      {/* Last Message Preview */}
      {message && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <LucideReact.User size={16} />
              <span>
                {message.personType
                  ? `${message.personType}`
                  : message.personId || "Unknown Sender"}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              {message.state === "sending" ? (
                <LucideReact.Clock className="text-amber-500" size={16} />
              ) : message.state === "sent" ? (
                <LucideReact.CheckCircle className="text-green-500" size={16} />
              ) : message.state === "failed" ? (
                <LucideReact.XCircle className="text-red-500" size={16} />
              ) : null}
              <span>
                {message.state
                  ? message.state.charAt(0).toUpperCase() +
                    message.state.slice(1)
                  : ""}
              </span>
            </div>
          </div>
          <p className="text-gray-800 text-sm line-clamp-2">{messagePreview}</p>
          {formattedMessageTime && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <LucideReact.Clock size={14} />
              <span>{formattedMessageTime}</span>
            </div>
          )}
        </div>
      )}

      {/* Bot Information */}
      {bot && (
        <div className="flex items-center space-x-2 text-sm">
          <LucideReact.Cpu className="text-gray-500" size={16} />
          <span className="text-gray-700">Bot: {bot.name}</span>
        </div>
      )}

      {/* Thread Stats */}
      {thread && (
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {typeof thread.replyCount === "number" && (
            <div className="flex items-center space-x-1">
              <LucideReact.MessageSquare size={16} />
              <span>{thread.replyCount} replies</span>
            </div>
          )}
          {thread.lastMessageId && (
            <div className="flex items-center space-x-1">
              <LucideReact.Hash size={16} />
              <span>Last Msg ID: {thread.lastMessageId}</span>
            </div>
          )}
          {formattedThreadUpdated && (
            <div className="flex items-center space-x-1">
              <LucideReact.Edit2 size={16} />
              <span>Updated: {formattedThreadUpdated}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
