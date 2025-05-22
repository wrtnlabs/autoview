import LucideReact from "lucide-react";
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
  const formatDate = (ts?: number): string =>
    ts
      ? new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(ts))
      : "—";

  const chat = value.chat;
  const thread = value.thread;
  const message = value.message;
  const bot = value.bot;
  const managers = value.managers || [];

  // Derive message excerpt
  let messageText = message?.plainText
    ? message.plainText
    : (message?.blocks?.[0]?.value ?? "");
  if (messageText.length > 100) {
    messageText = messageText.slice(0, 100).trimEnd() + "…";
  }

  // Map message state to icon and label
  const state = message?.state;
  const stateMap: Record<string, { icon: JSX.Element; label: string }> = {
    sending: {
      icon: <LucideReact.Clock size={16} className="text-amber-500" />,
      label: "Sending",
    },
    sent: {
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      label: "Sent",
    },
    failed: {
      icon: <LucideReact.AlertTriangle size={16} className="text-red-500" />,
      label: "Failed",
    },
    removed: {
      icon: <LucideReact.XCircle size={16} className="text-gray-500" />,
      label: "Removed",
    },
  };

  // Limit managers displayed
  const maxManagersToShow = 3;
  const displayedManagers = managers.slice(0, maxManagersToShow);
  const remainingManagers = managers.length - displayedManagers.length;

  // Early no-data state
  const hasAny = chat || thread || message || bot || managers.length > 0;
  if (!hasAny) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2">No data available</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto space-y-4">
      {/* Chat Info */}
      {chat && (
        <div className="flex items-center gap-2 text-gray-700">
          {chat.active ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
          <span className="truncate">
            Chat: {chat.channelId ?? chat.id ?? "—"}
          </span>
        </div>
      )}

      {/* Thread Info */}
      {thread && (
        <div className="flex items-center gap-4 text-gray-700">
          <div className="flex items-center gap-1">
            <LucideReact.MessageSquare size={16} />
            <span>
              {thread.replyCount != null
                ? `${thread.replyCount} repl${thread.replyCount === 1 ? "y" : "ies"}`
                : "No replies"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>{formatDate(thread.updatedAt)}</span>
          </div>
        </div>
      )}

      {/* Message Preview */}
      {message && (
        <div className="bg-gray-50 p-3 rounded-lg">
          {messageText ? (
            <p className="text-gray-800 text-sm line-clamp-2">{messageText}</p>
          ) : (
            <p className="text-gray-500 text-sm italic">No message text</p>
          )}
          <div className="mt-2 flex items-center gap-4 text-gray-500 text-xs">
            {message.createdAt != null && (
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>{formatDate(message.createdAt)}</span>
              </div>
            )}
            {state && stateMap[state] && (
              <div className="flex items-center gap-1">
                {stateMap[state].icon}
                <span>{stateMap[state].label}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bot Info */}
      {bot && (
        <div className="flex items-center gap-3">
          {bot.avatarUrl || bot.avatar ? (
            <img
              src={bot.avatarUrl ?? `https://placehold.co/40x40?text=Bot`}
              alt={bot.name}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/40x40?text=Bot";
              }}
            />
          ) : (
            <LucideReact.User size={32} className="text-gray-300" />
          )}
          <span className="text-gray-800 font-medium truncate">{bot.name}</span>
        </div>
      )}

      {/* Managers */}
      {managers.length > 0 && (
        <div className="space-y-1">
          <span className="text-gray-700 font-medium">Managers:</span>
          <div className="flex items-center gap-2 flex-wrap">
            {displayedManagers.map((mgr, idx) => {
              const avatarSrc =
                mgr.avatarUrl ??
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  mgr.name,
                )}&background=random&color=fff`;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full"
                >
                  <img
                    src={avatarSrc}
                    alt={mgr.name}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          mgr.name,
                        )}&background=random&color=fff`;
                    }}
                  />
                  <span className="text-gray-700 text-sm truncate max-w-[6rem]">
                    {mgr.name}
                  </span>
                </div>
              );
            })}
            {remainingManagers > 0 && (
              <span className="text-gray-500 text-sm">
                +{remainingManagers} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
