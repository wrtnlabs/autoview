import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4ChatBasedUserChatsView = {
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
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChatBasedUserChatsView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const messageCount = value.messages?.length ?? 0;
  const sessionCount = value.sessions?.length ?? 0;
  const userChatCount = value.userChats?.length ?? 0;
  const userCount = value.users?.length ?? 0;
  const managerCount = value.managers?.length ?? 0;
  const tagCount = value.chatTags?.length ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Messages */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <div className="p-2 bg-indigo-100 rounded-md">
            <LucideReact.MessageSquare size={24} className="text-indigo-600" />
          </div>
          <div className="ml-4">
            <div className="text-2xl font-semibold text-gray-800">
              {messageCount}
            </div>
            <div className="text-sm text-gray-500">Messages</div>
          </div>
        </div>
        {/* Sessions */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <div className="p-2 bg-green-100 rounded-md">
            <LucideReact.Calendar size={24} className="text-green-600" />
          </div>
          <div className="ml-4">
            <div className="text-2xl font-semibold text-gray-800">
              {sessionCount}
            </div>
            <div className="text-sm text-gray-500">Sessions</div>
          </div>
        </div>
        {/* User Chats */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <div className="p-2 bg-blue-100 rounded-md">
            <LucideReact.Users size={24} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="text-2xl font-semibold text-gray-800">
              {userChatCount}
            </div>
            <div className="text-sm text-gray-500">User Chats</div>
          </div>
        </div>
        {/* Users */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <div className="p-2 bg-yellow-100 rounded-md">
            <LucideReact.User size={24} className="text-yellow-600" />
          </div>
          <div className="ml-4">
            <div className="text-2xl font-semibold text-gray-800">
              {userCount}
            </div>
            <div className="text-sm text-gray-500">Users</div>
          </div>
        </div>
        {/* Managers */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <div className="p-2 bg-red-100 rounded-md">
            <LucideReact.UserCheck size={24} className="text-red-600" />
          </div>
          <div className="ml-4">
            <div className="text-2xl font-semibold text-gray-800">
              {managerCount}
            </div>
            <div className="text-sm text-gray-500">Managers</div>
          </div>
        </div>
        {/* Chat Tags */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow">
          <div className="p-2 bg-purple-100 rounded-md">
            <LucideReact.Tag size={24} className="text-purple-600" />
          </div>
          <div className="ml-4">
            <div className="text-2xl font-semibold text-gray-800">
              {tagCount}
            </div>
            <div className="text-sm text-gray-500">Chat Tags</div>
          </div>
        </div>
      </div>

      {/* Pagination Tokens */}
      {(value.prev || value.next) && (
        <div className="mt-6 flex justify-between text-sm">
          {value.prev ? (
            <div className="flex items-center text-blue-600 truncate">
              <LucideReact.ChevronLeft size={16} />
              <span className="ml-1 truncate">{value.prev}</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-400">
              <LucideReact.ChevronLeft size={16} />
              <span className="ml-1">Prev</span>
            </div>
          )}
          {value.next ? (
            <div className="flex items-center text-blue-600 truncate">
              <span className="mr-1 truncate">{value.next}</span>
              <LucideReact.ChevronRight size={16} />
            </div>
          ) : (
            <div className="flex items-center text-gray-400">
              <span className="mr-1">Next</span>
              <LucideReact.ChevronRight size={16} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
