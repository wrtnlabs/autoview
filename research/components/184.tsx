import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4MessagesView = {
          messages?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Message[];
          bots?: AutoViewInputSubTypes.legacy.v4.LegacyV4Bot[];
          users?: AutoViewInputSubTypes.legacy.v4.LegacyV4User[];
          supportBots?: AutoViewInputSubTypes.legacy.v4.LegacyV4SupportBot[];
          prev?: string;
          next?: string;
        };
      }
    }
    export namespace v4 {
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
      export type LegacyV4User = {
        id?: string;
        channelId?: string;
        memberId?: string;
        veilId?: string;
        unifiedId?: string;
        name?: string;
        profile?: {
          [key: string]: {};
        };
        profileOnce?: AutoViewInputSubTypes.profile.UserProfile;
        tags?: string[] &
          tags.MinItems<0> &
          tags.MaxItems<10> &
          tags.UniqueItems;
        alert?: number & tags.Type<"int32">;
        unread?: number & tags.Type<"int32">;
        popUpChatId?: string;
        blocked?: boolean;
        unsubscribed?: boolean;
        hasChat?: boolean;
        hasPushToken?: boolean;
        language?: string & tags.Default<"en">;
        country?: string;
        city?: string;
        latitude?: number;
        longitude?: number;
        web?: AutoViewInputSubTypes.WebInfo;
        mobile?: AutoViewInputSubTypes.MobileInfo;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
        createdAt?: number;
        updatedAt?: number;
        expireAt?: number;
        version?: number & tags.Type<"int32">;
        managedKey?: number & tags.Type<"int32">;
        member?: boolean;
        email?: string;
        userId?: string;
        avatarUrl?: string;
        managed?: boolean;
        mobileNumber?: string & tags.Default<"+18004424000">;
        systemLanguage?: string & tags.Default<"en">;
      };
      export type LegacyV4SupportBot = {
        id?: string;
        channelId: string;
        pluginId?: string;
        botName: string;
        name: string;
        order: number & tags.Minimum<0>;
        pageQuery?: AutoViewInputSubTypes.Expression;
        userQuery?: AutoViewInputSubTypes.Expression;
        draft?: AutoViewInputSubTypes.supportbot.SupportBotDraft;
        revisionId?: string;
        state: "draft" | "active" | "stopped";
        runMode: "always" | "away" | "inOperation" | "private";
        start?: number & tags.Type<"int32">;
        stop?: number & tags.Type<"int32">;
        chatOpen?: number & tags.Type<"int32">;
        createdAt?: number;
        updatedAt?: number;
        userChatExpireDuration?: string;
        managerId?: string;
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
  export namespace profile {
    export type UserProfile = {
      [key: string]: {};
    };
  }
  export type WebInfo = {
    device?: string;
    os?: string;
    osName?: string;
    browser?: string;
    browserName?: string;
    sessionsCount?: number & tags.Type<"int32">;
    lastSeenAt?: number;
  };
  export type MobileInfo = {
    device?: string;
    os?: string;
    osName?: string;
    appName?: string;
    appVersion?: string;
    sdkName?: string;
    sdkVersion?: string;
    sessionsCount?: number & tags.Type<"int32">;
    lastSeenAt?: number;
  };
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
  export namespace supportbot {
    export type SupportBotDraft = {
      supportBot?: AutoViewInputSubTypes.supportbot.SupportBot;
      sections?: AutoViewInputSubTypes.supportbot.SupportBotSection[];
    };
    export type SupportBot = {
      id?: string;
      channelId: string;
      botName: string;
      name: string;
      order: number & tags.Minimum<0>;
      pageQuery?: AutoViewInputSubTypes.Expression;
      userQuery?: AutoViewInputSubTypes.Expression;
      draft?: AutoViewInputSubTypes.supportbot.SupportBotDraft;
      revisionId?: string;
      state: "draft" | "active" | "stopped";
      runMode: "always" | "away" | "inOperation" | "private";
      start?: number & tags.Type<"int32">;
      stop?: number & tags.Type<"int32">;
      chatOpen?: number & tags.Type<"int32">;
      createdAt?: number;
      updatedAt?: number;
      userChatExpireDuration?: string;
      managerId?: string;
    };
    export type SupportBotSection = {
      name?: string;
      actions?: AutoViewInputSubTypes.userchat.UserChatStaticAction[];
      id?: string;
      steps?: AutoViewInputSubTypes.supportbot.SupportBotSection_dollar_Step[];
      type: string;
    };
    export type SupportBotSection_dollar_Step = {
      message: AutoViewInputSubTypes.message.NestedMessage;
    };
  }
  export namespace userchat {
    export type UserChatStaticAction = {
      type: string;
    };
  }
  export namespace message {
    export type NestedMessage = {
      blocks?: AutoViewInputSubTypes.message.Block[];
      buttons?: AutoViewInputSubTypes.message.Button[] &
        tags.MinItems<1> &
        tags.MaxItems<2>;
      files?: AutoViewInputSubTypes.message.File[] &
        tags.MinItems<1> &
        tags.MaxItems<30>;
      webPage?: AutoViewInputSubTypes.message.WebPage;
      form?: AutoViewInputSubTypes.message.form.Form;
    };
    export type Block = {
      type: "bullets" | "code" | "text";
      language?: string;
      value?: string;
      blocks?: AutoViewInputSubTypes.message.Block[];
    };
    export type Button = {
      title: string;
      colorVariant?:
        | "cobalt"
        | "green"
        | "orange"
        | "red"
        | "black"
        | "pink"
        | "purple";
      action: AutoViewInputSubTypes.message.action.Action;
      /**
       * @deprecated
       */
      url?: string;
    };
    export namespace action {
      export type Action = {
        attributes?: AutoViewInputSubTypes.message.action.Attributes;
        type: string;
      };
      export type Attributes = {};
    }
    export type File = {
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
    export type WebPage = {
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
    export namespace form {
      export type Form = {
        submittedAt?: number;
        inputs?: AutoViewInputSubTypes.message.form.FormInput[];
        type: string;
      };
      export type FormInput = {
        value?: {};
        readOnly?: boolean;
        type?:
          | "text"
          | "number"
          | "bool"
          | "date"
          | "datetime"
          | "radio"
          | "singleSelect"
          | "checkbox"
          | "multiSelect";
        label?: string;
        bindingKey?: string;
        dataType?:
          | "string"
          | "date"
          | "list"
          | "listOfNumber"
          | "number"
          | "datetime"
          | "boolean";
        userChatProfileBindingKey?: boolean;
        userProfileBindingKey?: boolean;
      };
    }
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4MessagesView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and derived constants
  const messages = value.messages ?? [];
  const users = value.users ?? [];
  const bots = value.bots ?? [];

  // Build lookup maps for users and bots
  const usersMap: Record<string, AutoViewInputSubTypes.legacy.v4.LegacyV4User> =
    {};
  users.forEach((u) => {
    if (u.id) usersMap[u.id] = u;
  });
  const botsMap: Record<string, AutoViewInputSubTypes.legacy.v4.LegacyV4Bot> =
    {};
  bots.forEach((b) => {
    if (b.id) botsMap[b.id] = b;
  });

  // Sort messages by creation time
  const sortedMessages = [...messages].sort(
    (a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0),
  );

  // Date formatter for timestamps
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Helper to get sender's display name
  const getSenderName = (
    msg: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Message,
  ): string => {
    const { personType, personId } = msg;
    if (personType === "bot" && personId && botsMap[personId]) {
      return botsMap[personId].name;
    }
    if (
      personType === "user" &&
      personId &&
      usersMap[personId] &&
      usersMap[personId].name
    ) {
      return usersMap[personId].name!;
    }
    return "Unknown";
  };

  // Helper to get or generate avatar URL
  const getAvatarUrl = (
    msg: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Message,
    senderName: string,
  ): string => {
    if (msg.personType === "bot" && msg.personId && botsMap[msg.personId]) {
      const b = botsMap[msg.personId];
      return (
        b.avatarUrl ??
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          b.name,
        )}&background=64748b&color=fff`
      );
    }
    if (msg.personType === "user" && msg.personId && usersMap[msg.personId]) {
      const u = usersMap[msg.personId];
      return (
        u.avatarUrl ??
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          u.name ?? "",
        )}&background=0d8abc&color=fff`
      );
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      senderName,
    )}&background=0d8abc&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow space-y-4">
      {sortedMessages.length === 0 ? (
        <div className="flex items-center justify-center text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <span className="ml-2">No messages available</span>
        </div>
      ) : (
        sortedMessages.map((msg) => {
          const senderName = getSenderName(msg);
          const avatarSrc = getAvatarUrl(msg, senderName);
          const timestamp = msg.createdAt
            ? dateFormatter.format(new Date(msg.createdAt))
            : "";
          const content =
            msg.plainText ??
            msg.blocks
              ?.map((b) => b.value)
              .filter(Boolean)
              .join(" ") ??
            "";

          return (
            <div
              key={msg.id ?? msg.createdAt}
              className="flex items-start space-x-3"
            >
              <img
                src={avatarSrc}
                alt={senderName}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    senderName,
                  )}&background=0d8abc&color=fff`;
                }}
              />
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-700">
                  {senderName}
                </div>
                {timestamp && (
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <LucideReact.Calendar size={12} />
                    <span>{timestamp}</span>
                  </div>
                )}
                <div className="mt-1 text-sm text-gray-800 line-clamp-3">
                  {content}
                </div>
                {msg.files && msg.files.length > 0 && (
                  <div className="flex flex-wrap items-center mt-2 gap-2 text-gray-500 text-xs">
                    {msg.files.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <LucideReact.FileText size={14} />
                        <span className="truncate max-w-xs">{f.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex items-center mt-2 space-x-3 text-sm">
                    {msg.reactions.map((r, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 text-gray-600"
                      >
                        <span>{r.emojiName}</span>
                        <span>{r.personKeys?.length ?? 0}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
