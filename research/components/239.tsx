import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    chatAlertSound?:
      | "none"
      | "drop"
      | "woody"
      | "bounce"
      | "crystal"
      | "xylo"
      | "quickKnock"
      | "candy"
      | "shine";
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
    managerIds?: string[] &
      tags.MinItems<1> &
      tags.MaxItems<2147483647> &
      tags.UniqueItems;
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
  const { group, managers = [], onlines = [], session, bookmark } = value;

  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const scopeClasses = {
    all: "bg-gray-200 text-gray-800",
    public: "bg-blue-100 text-blue-800",
    private: "bg-purple-100 text-purple-800",
  } as const;

  const badgeScopeClass = group
    ? scopeClasses[group.scope] || scopeClasses.all
    : scopeClasses.all;

  const displayManagers = managers.slice(0, 5);
  const extraManagers = managers.length - displayManagers.length;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!group) {
    return (
      <div className="p-4 text-gray-500 flex items-center justify-center">
        <LucideReact.AlertCircle size={24} className="mr-2" />
        <span>No group data available</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col space-y-4">
      {/* Group Info */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {group.title}
        </h2>
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${badgeScopeClass}`}
        >
          {group.scope.charAt(0).toUpperCase() + group.scope.slice(1)}
        </span>
      </div>
      {group.description && (
        <p className="text-gray-600 text-sm line-clamp-2">
          {group.description}
        </p>
      )}

      {/* Managers */}
      {managers.length > 0 && (
        <div>
          <div className="flex items-center text-gray-700 text-sm mb-1">
            <LucideReact.Users size={16} className="mr-1" />
            <span>Managers</span>
          </div>
          <div className="flex items-center -space-x-2">
            {displayManagers.map((mgr) => (
              <div
                key={mgr.id || mgr.accountId || mgr.name}
                className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100"
              >
                {mgr.avatarUrl ? (
                  <img
                    src={mgr.avatarUrl}
                    alt={mgr.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          mgr.name,
                        )}&background=random`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs uppercase">
                    {getInitials(mgr.name)}
                  </div>
                )}
              </div>
            ))}
            {extraManagers > 0 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                +{extraManagers}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Online Users */}
      {onlines.length > 0 && (
        <div className="flex items-center text-sm text-gray-700">
          <LucideReact.UserCheck size={16} className="mr-1 text-green-500" />
          <span>{onlines.length} Online</span>
        </div>
      )}

      {/* Session Stats */}
      {session && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm text-gray-700">
            <LucideReact.Mail size={16} className="mr-1" />
            <span>{session.unread ?? 0} Unread</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <LucideReact.Bell size={16} className="mr-1" />
            <span>{session.alert ?? 0} Alerts</span>
          </div>
        </div>
      )}

      {/* Bookmark */}
      {bookmark && (
        <div className="flex items-center text-sm text-gray-700">
          <LucideReact.Bookmark size={16} className="mr-1" />
          <span>
            Bookmark: {bookmark.bookmarkKey || bookmark.chatKey || "N/A"}
          </span>
        </div>
      )}
    </div>
  );
}
