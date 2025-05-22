import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export type GroupView = {
            managers?: AutoViewInputSubTypes.Manager[];
            onlines?: AutoViewInputSubTypes.Online[];
            bookmark?: AutoViewInputSubTypes.ChatBookmark;
            session?: AutoViewInputSubTypes.ChatSession;
            group?: AutoViewInputSubTypes.Group;
        };
    }
    export type Manager = {
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
        email?: string;
        showEmailToFront?: boolean;
        mobileNumber?: string & tags.Default<"+18004424000">;
        showMobileNumberToFront?: boolean;
        roleId?: string;
        removed?: boolean;
        createdAt?: number;
        updatedAt?: number;
        removedAt?: number;
        displayAsChannel?: boolean;
        defaultGroupWatch?: "all" | "info" | "none";
        defaultDirectChatWatch?: "all" | "info" | "none";
        defaultUserChatWatch?: "all" | "info" | "none";
        chatAlertSound?: "none" | "drop" | "woody" | "bounce" | "crystal" | "xylo" | "quickKnock" | "candy" | "shine";
        meetAlertSound?: "cute" | "basic" | "gentle" | "marimba";
        showPrivateMessagePreview?: boolean;
        operatorScore?: number;
        touchScore?: number;
        avatar?: AutoViewInputSubTypes.TinyFile;
        operatorEmailReminder?: boolean;
        receiveUnassignedAlert?: boolean;
        receiveUnassignedChatAlert?: boolean;
        receiveUnassignedMeetAlert?: boolean;
        operator?: boolean;
        operatorStatusId?: string;
        defaultAllMentionImportant?: boolean;
        userMessageImportant?: boolean;
        assignableUserChatTypes?: ("sync" | "async")[] & tags.UniqueItems;
        autoAssignCapacity?: number & tags.Type<"uint32"> & tags.Maximum<100>;
        enableAutoAssignOnSync?: boolean;
        statusEmoji?: string;
        statusText?: string;
        statusClearAt?: number;
        doNotDisturb?: boolean;
        doNotDisturbClearAt?: number;
        accountDoNotDisturb?: boolean;
        accountDoNotDisturbClearAt?: number;
        enableReactedMessageIndex?: boolean;
        enableTeamMentionedMessageIndex?: boolean;
        operatorUpdatedAt?: number;
        pcInboxMeetAlert?: boolean;
        mobileInboxMeetAlert?: boolean;
        pcTeamChatMeetAlert?: boolean;
        mobileTeamChatMeetAlert?: boolean;
        managerId?: string;
        avatarUrl?: string;
        /**
         * @deprecated
        */
        meetOperator?: boolean;
        emailForFront?: string;
        mobileNumberForFront?: string & tags.Default<"+18004424000">;
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
    export type Online = {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
    };
    export type ChatBookmark = {
        key?: string;
        chatId?: string;
        chatKey?: string;
        bookmarkKey?: string;
        channelId?: string;
        version?: number & tags.Type<"int32">;
        chatType?: string;
        personType?: string;
        personId?: string;
    };
    export type ChatSession = {
        key?: string;
        chatId?: string;
        teamChatSectionId?: string;
        chatKey?: string;
        updatedKey?: string;
        unreadKey?: string;
        channelId?: string;
        alert?: number & tags.Type<"int32">;
        unread?: number & tags.Type<"int32">;
        watch?: "all" | "info" | "none";
        allMentionImportant?: boolean;
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
    export type Group = {
        id?: string;
        channelId?: string;
        title: string;
        scope: "all" | "public" | "private";
        managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
        icon?: string & tags.Pattern<"\\S+">;
        liveMeetId?: string;
        description?: string;
        createdAt?: number;
        updatedAt?: number;
        /**
         * @deprecated
        */
        name?: string;
        active?: boolean;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.desk.GroupView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { group, managers, onlines, bookmark, session } = value;
  if (!group) return null;

  const title = group.title;
  const description = group.description ?? "";

  const scopeLabels: Record<AutoViewInputSubTypes.Group["scope"], string> = {
    all: "All",
    public: "Public",
    private: "Private",
  };
  const scopeLabel = scopeLabels[group.scope] ?? group.scope;

  const isActive = group.active ?? false;

  const managerNames = managers?.map((m) => m.name) ?? [];
  const managerCount = managerNames.length;

  const onlineCount = onlines?.length ?? 0;
  const unreadCount = session?.unread ?? 0;
  const hasBookmark = Boolean(bookmark?.bookmarkKey);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center">
        {group.icon ? (
          <img
            src={group.icon}
            alt={title}
            className="h-12 w-12 rounded-md object-cover mr-4"
          />
        ) : (
          <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center mr-4">
            <span className="text-gray-500 font-bold">{title.charAt(0)}</span>
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
              {scopeLabel}
            </span>
            <span className="flex items-center text-xs text-gray-500">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  isActive ? "bg-green-500" : "bg-gray-400"
                } mr-1`}
              />
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {description && (
        <p className="mt-3 text-gray-600 text-sm line-clamp-2">{description}</p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center text-gray-600 text-sm">
          <svg
            className="h-5 w-5 text-gray-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              fillRule="evenodd"
              d="M4 13a4 4 0 014-4h4a4 4 0 014 4v1H4v-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            {managerCount} Manager{managerCount !== 1 && "s"}
          </span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <svg
            className="h-5 w-5 text-green-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2.166 8.94a8 8 0 0113.668 4.082l1.215 1.215a1 1 0 01-1.414 1.414l-1.293-1.293A8 8 0 012.166 8.94z" />
          </svg>
          <span>{onlineCount} Online</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <svg
            className="h-5 w-5 text-red-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 5a2 2 0 012-2h9a2 2 0 012 2v.086a1 1 0 01-.293.707l-5 5a1 1 0 01-1.414 0l-5-5A1 1 0 012 5.086V5z" />
            <path
              d="M3 9.414V17a1 1 0 001 1h12a1 1 0 001-1V9.414l-6-6-6 6z"
            />
          </svg>
          <span>{unreadCount} Unread</span>
        </div>

        {hasBookmark && (
          <div className="flex items-center text-gray-600 text-sm">
            <svg
              className="h-5 w-5 text-yellow-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 3a2 2 0 00-2 2v12l7-5 7 5V5a2 2 0 00-2-2H5z" />
            </svg>
            <span>Bookmarked</span>
          </div>
        )}
      </div>
    </div>
  );
}
