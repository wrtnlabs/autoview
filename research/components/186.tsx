import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4GroupView = {
          managers?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager[];
          onlines?: AutoViewInputSubTypes.legacy.v4.LegacyV4Online[];
          bookmark?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatBookmark;
          session?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatSession;
          group?: AutoViewInputSubTypes.legacy.v4.LegacyV4Group;
        };
      }
    }
    export namespace v4 {
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
      export type LegacyV4Online = {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
      };
      export type LegacyV4ChatBookmark = {
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
      export type LegacyV4Group = {
        id?: string;
        channelId?: string;
        name: string;
        scope: "all" | "public" | "private";
        managerIds?: string[] &
          tags.MinItems<1> &
          tags.MaxItems<2147483647> &
          tags.UniqueItems;
        icon?: string & tags.Pattern<"\\S+">;
        description?: string;
        createdAt?: number;
        updatedAt?: number;
        active?: boolean;
      };
    }
  }
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
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4GroupView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const group = value.group;
  const managerCount = value.managers?.length ?? 0;
  const onlineCount = value.onlines?.length ?? 0;
  const unreadCount = value.session?.unread ?? 0;
  const isBookmarked = Boolean(value.bookmark);

  // Determine icon for scope
  const scopeIcon =
    group?.scope === "public" ? (
      <LucideReact.Globe size={16} />
    ) : group?.scope === "private" ? (
      <LucideReact.Lock size={16} />
    ) : (
      <LucideReact.Users size={16} />
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!group) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mr-2" />
        <span>No group data available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {group.name}
        </h2>
        <div className="flex items-center text-gray-500 text-sm gap-1">
          {scopeIcon}
          <span className="capitalize">{group.scope}</span>
        </div>
      </div>

      {group.description && (
        <p className="text-gray-600 text-sm line-clamp-2">
          {group.description}
        </p>
      )}

      <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} />
          <span>
            {managerCount} manager{managerCount !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Activity size={16} />
          <span>{onlineCount} online</span>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-1">
            <LucideReact.MessageCircle className="text-red-500" size={16} />
            <span>{unreadCount} unread</span>
          </div>
        )}
        {isBookmarked && (
          <div className="flex items-center gap-1">
            <LucideReact.Bookmark size={16} />
            <span>Bookmarked</span>
          </div>
        )}
      </div>
    </div>
  );
  // 3. Return the React element.
}
