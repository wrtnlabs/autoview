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
  const group = value.group;
  const managers = value.managers ?? [];
  const onlineCount = value.onlines?.length ?? 0;
  const unreadCount = value.session?.unread ?? 0;
  const hasBookmark = !!value.bookmark;

  const formattedSessionUpdate = value.session?.updatedAt
    ? new Date(value.session.updatedAt).toLocaleString()
    : "";

  // Helper: initials for managers without avatar
  function getInitials(name: string): string {
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  }

  if (!group) {
    return null;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{group.title}</h2>
          <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 space-x-2">
            <span className="capitalize">{group.scope}</span>
            {typeof group.active === "boolean" && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  group.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {group.active ? "Active" : "Inactive"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {group.description && (
        <p className="mt-3 text-gray-700 text-sm line-clamp-2">{group.description}</p>
      )}

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{managers.length}</span>
          <span>Managers</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{onlineCount}</span>
          <span>Online</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{unreadCount}</span>
          <span>Unread</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">
            {hasBookmark ? "Yes" : "No"}
          </span>
          <span>Bookmarked</span>
        </div>
      </div>

      {/* Session update time */}
      {formattedSessionUpdate && (
        <div className="mt-2 text-xs text-gray-400">
          Last update: {formattedSessionUpdate}
        </div>
      )}

      {/* Managers avatars */}
      {managers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Managers</h3>
          <div className="flex -space-x-2">
            {managers.slice(0, 5).map((mgr, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full ring-2 ring-white overflow-hidden bg-gray-200"
              >
                {mgr.avatarUrl ? (
                  <img
                    src={mgr.avatarUrl}
                    alt={mgr.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="flex items-center justify-center w-full h-full text-xs font-medium text-gray-600">
                    {getInitials(mgr.name)}
                  </span>
                )}
              </div>
            ))}
            {managers.length > 5 && (
              <span className="ml-2 text-gray-500 text-sm">
                +{managers.length - 5}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
