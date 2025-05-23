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
  const managerCount = value.managers?.length ?? 0;
  const onlineCount = value.onlines?.length ?? 0;
  const unreadCount = value.session?.unread ?? 0;
  const isBookmarked = !!value.bookmark;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Group title and scope badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.group?.title ?? 'Unnamed Group'}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
            value.group?.scope === 'private'
              ? 'bg-indigo-100 text-indigo-800'
              : value.group?.scope === 'public'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value.group?.scope ?? 'all'}
        </span>
      </div>

      {/* Description (truncated) */}
      {value.group?.description && (
        <p className="text-sm text-gray-600 line-clamp-2">
          {value.group.description}
        </p>
      )}

      {/* Stats row: managers, online, unread, bookmark */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Users size={16} className="mr-1" />
          <span>
            {managerCount} Manager{managerCount !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.UserCheck size={16} className="mr-1 text-green-500" />
          <span>{onlineCount} Online</span>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center">
            <LucideReact.Mail size={16} className="mr-1 text-blue-500" />
            <span>{unreadCount} Unread</span>
          </div>
        )}
        {isBookmarked && (
          <LucideReact.Bookmark
            size={16}
            className="text-yellow-500"
            aria-label="Bookmarked"
            role="img"
          />
        )}
      </div>

      {/* Managers Avatars */}
      {value.managers && value.managers.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Managers</h3>
          <div className="flex -space-x-2">
            {value.managers.slice(0, 5).map((manager, idx) => {
              const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                manager.name,
              )}&background=random`;
              return (
                <img
                  key={idx}
                  src={manager.avatarUrl || fallback}
                  alt={manager.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = fallback;
                  }}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              );
            })}
            {value.managers.length > 5 && (
              <span className="flex items-center justify-center w-8 h-8 text-xs font-medium bg-gray-200 text-gray-600 rounded-full border-2 border-white">
                +{value.managers.length - 5}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
