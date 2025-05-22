import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4SessionBasedUserChatsView = {
          messages?: AutoViewInputSubTypes.legacy.v4.message.LegacyV4Message[];
          sessions?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatSession[];
          userChats?: AutoViewInputSubTypes.legacy.v4.LegacyV4UserChat[];
          users?: AutoViewInputSubTypes.legacy.v4.LegacyV4User[];
          managers?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager[];
          chatTags?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatTag[];
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
      export type LegacyV4ChatSession = {
        key?: string;
        chatId?: string;
        chatKey?: string;
        updatedKey?: string;
        unreadKey?: string;
        channelId?: string;
        alert?: number & tags.Type<"int32">;
        unread?: number & tags.Type<"int32">;
        watch?: "all" | "info" | "none";
        readAt?: number;
        receivedAt?: number;
        postedAt?: number;
        updatedAt?: number;
        createdAt?: number;
        version?: number & tags.Type<"int32">;
        id?: string;
        chatType?: string;
        personType?: string;
        personId?: string;
      };
      export type LegacyV4UserChat = {
        id?: string;
        channelId?: string;
        appUserKey?: string;
        state?: "closed" | "opened" | "snoozed" | "queued";
        managed?: boolean;
        userId?: string;
        name?: string;
        description?: string;
        handling?: "waiting" | "supportBot";
        supportBot?: AutoViewInputSubTypes.legacy.v4.LegacyV4UserChat_dollar_LegacyV4UserChatSupportBot;
        marketing?: AutoViewInputSubTypes.legacy.v4.LegacyV4UserChat_dollar_LegacyV4UserChatMarketing;
        pluginId?: string;
        sourcePage?: string;
        messengerType?: string;
        messengerId?: string;
        managerIds?: string[] &
          tags.MinItems<1> &
          tags.MaxItems<2147483647> &
          tags.UniqueItems;
        assigneeId?: string;
        tags?: string[] &
          tags.MinItems<1> &
          tags.MaxItems<8> &
          tags.UniqueItems;
        firstOpenedAt?: number;
        openedAt?: number;
        createdAt?: number;
        frontMessageId?: string;
        frontUpdatedAt?: number;
        deskMessageId?: string;
        deskUpdatedAt?: number;
        firstAssigneeIdAfterOpen?: string;
        firstRepliedAtAfterOpen?: number;
        oneStop?: boolean;
        waitingTime?: number & tags.Type<"int32">;
        avgReplyTime?: number & tags.Type<"int32">;
        totalReplyTime?: number & tags.Type<"int32">;
        replyCount?: number & tags.Type<"int32">;
        resolutionTime?: number & tags.Type<"int32">;
        operationWaitingTime?: number & tags.Type<"int32">;
        operationAvgReplyTime?: number & tags.Type<"int32">;
        operationTotalReplyTime?: number & tags.Type<"int32">;
        operationReplyCount?: number & tags.Type<"int32">;
        operationResolutionTime?: number & tags.Type<"int32">;
        firstAskedAt?: number;
        askedAt?: number;
        closedAt?: number;
        snoozedAt?: number;
        expiresAt?: number;
        version?: number & tags.Type<"int32">;
      };
      export type LegacyV4UserChat_dollar_LegacyV4UserChatSupportBot = {
        id?: string;
        revisionId?: string;
        sectionPath?: string[];
      };
      export type LegacyV4UserChat_dollar_LegacyV4UserChatMarketing = {
        type?: string;
        id?: string;
        enableSupportBot?: boolean;
        supportBotId?: string;
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
      export type LegacyV4ChatTag = {
        id?: string;
        channelId?: string;
        colorVariant?:
          | "red"
          | "orange"
          | "yellow"
          | "olive"
          | "green"
          | "cobalt"
          | "purple"
          | "pink"
          | "navy";
        name: string;
        key: string;
        description?: string;
        followerIds?: string[] &
          tags.MinItems<1> &
          tags.MaxItems<2147483647> &
          tags.UniqueItems;
        createdAt?: number;
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
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4SessionBasedUserChatsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const messages = value.messages ?? [];
  const sessions = value.sessions ?? [];
  const userChats = value.userChats ?? [];
  const users = value.users ?? [];
  const managers = value.managers ?? [];
  const tags = value.chatTags ?? [];

  const messageCount = messages.length;
  const sessionCount = sessions.length;
  const chatCount = userChats.length;
  const userCount = users.length;
  const managerCount = managers.length;
  const tagCount = tags.length;

  // Recent items for preview (up to 3)
  const recentMessages = messages
    .filter((m) => m.createdAt)
    .sort((a, b) => b.createdAt! - a.createdAt!)
    .slice(0, 3);
  const recentChats = userChats.slice(0, 3);

  // Helper for formatting dates
  const formatDate = (ts?: number) =>
    ts
      ? new Date(ts).toLocaleString(undefined, {
          dateStyle: "short",
          timeStyle: "short",
        })
      : "-";

  // Mapping user chat state to human labels
  const chatStateLabel = (state?: string) => {
    switch (state) {
      case "opened":
        return "Opened";
      case "closed":
        return "Closed";
      case "snoozed":
        return "Snoozed";
      case "queued":
        return "Queued";
      default:
        return "Unknown";
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Metrics summary */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
        <div className="flex flex-col items-center">
          <LucideReact.MessageCircle className="text-blue-500" size={24} />
          <span className="mt-1 font-medium">{messageCount}</span>
          <span className="text-sm text-gray-500">Messages</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.Layers className="text-indigo-500" size={24} />
          <span className="mt-1 font-medium">{sessionCount}</span>
          <span className="text-sm text-gray-500">Sessions</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.Activity className="text-green-500" size={24} />
          <span className="mt-1 font-medium">{chatCount}</span>
          <span className="text-sm text-gray-500">User Chats</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.Users className="text-purple-500" size={24} />
          <span className="mt-1 font-medium">{userCount}</span>
          <span className="text-sm text-gray-500">Users</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.UserCheck className="text-teal-500" size={24} />
          <span className="mt-1 font-medium">{managerCount}</span>
          <span className="text-sm text-gray-500">Managers</span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.Tag className="text-yellow-500" size={24} />
          <span className="mt-1 font-medium">{tagCount}</span>
          <span className="text-sm text-gray-500">Tags</span>
        </div>
      </div>

      {/* Recent Messages Preview */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Recent Messages
        </h2>
        {recentMessages.length === 0 ? (
          <div className="flex items-center text-gray-400">
            <LucideReact.AlertCircle size={20} className="mr-2" />
            <span>No messages available</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {recentMessages.map((msg, idx) => (
              <li
                key={idx}
                className="flex justify-between items-start bg-gray-50 p-2 rounded-md"
              >
                <span className="text-sm text-gray-800 truncate line-clamp-2">
                  {msg.plainText ?? msg.id}
                </span>
                <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                  <LucideReact.Calendar
                    size={14}
                    className="inline-block mr-1 text-gray-400"
                  />
                  {formatDate(msg.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent User Chats Preview */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Recent User Chats
        </h2>
        {recentChats.length === 0 ? (
          <div className="flex items-center text-gray-400">
            <LucideReact.AlertCircle size={20} className="mr-2" />
            <span>No chats available</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {recentChats.map((chat, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
              >
                <span className="text-sm text-gray-800 truncate">
                  {chat.name ?? chat.id ?? "Chat"}
                </span>
                <div className="flex items-center space-x-1">
                  <LucideReact.Tag size={16} className="text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {chatStateLabel(chat.state)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination Tokens */}
      <div className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <LucideReact.ChevronLeft size={16} />
          <span>{value.prev ?? "-"}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>{value.next ?? "-"}</span>
          <LucideReact.ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
}
