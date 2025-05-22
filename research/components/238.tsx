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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const group = value.group;
  const managers = value.managers ?? [];
  const onlines = value.onlines ?? [];
  const session = value.session;
  const hasBookmark = Boolean(value.bookmark);

  const title = group?.title ?? "Untitled Group";
  const description = group?.description ?? "";
  const scope = group?.scope ?? "all";
  const scopeLabels: Record<string, { icon: JSX.Element; label: string }> = {
    public: {
      icon: <LucideReact.Globe size={16} className="text-gray-500" />,
      label: "Public",
    },
    private: {
      icon: <LucideReact.Lock size={16} className="text-gray-500" />,
      label: "Private",
    },
    all: {
      icon: <LucideReact.Users size={16} className="text-gray-500" />,
      label: "All",
    },
  };
  const { icon: scopeIcon, label: scopeLabel } =
    scopeLabels[scope] || scopeLabels.all;

  // show up to 3 manager names
  const displayManagers = managers.slice(0, 3);
  const extraManagers = managers.length > 3 ? managers.length - 3 : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          {scopeIcon}
          <span>{scopeLabel}</span>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p
          className="mt-2 text-sm text-gray-600 line-clamp-2"
          title={description}
        >
          {description}
        </p>
      )}

      {/* Stats */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Users size={16} className="mr-1" />
          <span>
            {managers.length} Manager{managers.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.UserCheck size={16} className="mr-1" />
          <span>{onlines.length} Online</span>
        </div>
        {session && (
          <>
            <div className="flex items-center">
              <LucideReact.AlertCircle size={16} className="mr-1" />
              <span>
                {session.alert ?? 0} Alert
                {(session.alert ?? 0) !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center">
              <LucideReact.MessageSquare size={16} className="mr-1" />
              <span>{session.unread ?? 0} Unread</span>
            </div>
          </>
        )}
        {hasBookmark && (
          <div className="flex items-center">
            <LucideReact.Bookmark size={16} className="mr-1" />
            <span>Bookmarked</span>
          </div>
        )}
      </div>

      {/* Managers List */}
      {managers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Managers</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {displayManagers.map((m) => (
              <li
                key={m.id ?? m.accountId ?? m.name}
                className="flex items-center text-sm text-gray-600 max-w-[100px] truncate"
                title={m.name}
              >
                <LucideReact.User size={16} className="mr-1 flex-shrink-0" />
                <span className="truncate">{m.name}</span>
              </li>
            ))}
            {extraManagers > 0 && (
              <li className="flex items-center text-sm text-gray-600">
                +{extraManagers} more
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
