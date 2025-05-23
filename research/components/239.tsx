import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export interface GroupView {
            managers?: AutoViewInputSubTypes.Manager[];
            onlines?: AutoViewInputSubTypes.Online[];
            bookmark?: AutoViewInputSubTypes.ChatBookmark;
            session?: AutoViewInputSubTypes.ChatSession;
            group?: AutoViewInputSubTypes.Group;
        }
    }
    export interface Manager {
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
    }
    export interface NameDesc {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    }
    export interface TinyFile {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    }
    export interface Online {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
    }
    export interface ChatBookmark {
        key?: string;
        chatId?: string;
        chatKey?: string;
        bookmarkKey?: string;
        channelId?: string;
        version?: number & tags.Type<"int32">;
        chatType?: string;
        personType?: string;
        personId?: string;
    }
    export interface ChatSession {
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
    }
    export interface Group {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.desk.GroupView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const group = value.group;
  const managers = value.managers ?? [];
  const onlines = value.onlines ?? [];
  const session = value.session;
  const managerCount = managers.length;
  const onlineCount = onlines.length;
  const createdDate = group?.createdAt
    ? new Date(group.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // Badge color mapping for group.scope
  const scopeColors: Record<"all" | "public" | "private", string> = {
    all: "bg-gray-100 text-gray-800",
    public: "bg-blue-100 text-blue-800",
    private: "bg-yellow-100 text-yellow-800",
  };
  const scopeLabel = group?.scope
    ? group.scope.charAt(0).toUpperCase() + group.scope.slice(1)
    : "";

  // Watch mode icon mapping
  const renderWatchIcon = (): JSX.Element | null => {
    if (!session?.watch) return null;
    switch (session.watch) {
      case "all":
        return (
          <LucideReact.CheckCircle
            size={16}
            className="text-green-500 ml-1"
            role="img"
            aria-label="Watching all"
          />
        );
      case "info":
        return (
          <LucideReact.Info
            size={16}
            className="text-blue-500 ml-1"
            role="img"
            aria-label="Watching info"
          />
        );
      default:
        return (
          <LucideReact.XCircle
            size={16}
            className="text-gray-400 ml-1"
            role="img"
            aria-label="Not watching"
          />
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!group) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center text-gray-500">
        <LucideReact.AlertCircle
          size={24}
          className="mr-2"
          role="img"
          aria-label="No data"
        />
        <span>No group data available.</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow w-full max-w-md mx-auto">
      {/* Header: Title, Active Status, Scope */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {group.title}
        </h2>
        <div className="flex items-center space-x-2">
          {group.active ? (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              role="img"
              aria-label="Active"
            />
          ) : (
            <LucideReact.XCircle
              size={16}
              className="text-red-500"
              role="img"
              aria-label="Inactive"
            />
          )}
          {group.scope && (
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${scopeColors[group.scope]}`}
            >
              {scopeLabel}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {group.description && (
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {group.description}
        </p>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap items-center text-gray-500 text-xs mb-4 space-x-4">
        {createdDate && (
          <div className="flex items-center">
            <LucideReact.Calendar
              size={14}
              className="mr-1"
              role="img"
              aria-hidden="true"
            />
            <span>Created: {createdDate}</span>
          </div>
        )}
        {onlineCount > 0 && (
          <div className="flex items-center">
            <LucideReact.Users
              size={14}
              className="mr-1"
              role="img"
              aria-hidden="true"
            />
            <span>{onlineCount} online</span>
          </div>
        )}
        {session?.unread != null && (
          <div className="flex items-center">
            <LucideReact.Mail
              size={14}
              className="mr-1 text-blue-500"
              role="img"
              aria-hidden="true"
            />
            <span>{session.unread} unread</span>
          </div>
        )}
        {renderWatchIcon()}
      </div>

      {/* Managers */}
      {managerCount > 0 && (
        <div className="mb-2">
          <h3 className="text-gray-700 text-sm font-medium mb-1">
            Managers ({managerCount})
          </h3>
          <div className="flex items-center">
            {managers.slice(0, 5).map((mgr, idx) => {
              const src =
                mgr.avatarUrl ??
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  mgr.name
                )}&background=0D8ABC&color=fff`;
              return (
                <img
                  key={idx}
                  src={src}
                  alt={mgr.name}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      mgr.name
                    )}&background=ccc&color=fff`;
                  }}
                  className="-ml-2 first:ml-0 w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                />
              );
            })}
            {managerCount > 5 && (
              <div className="-ml-2 first:ml-0 w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                +{managerCount - 5}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
