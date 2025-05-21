import { tags } from "typia";
import React from "react";
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
                managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4GroupView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const group = value.group;
  if (!group) return null;

  const {
    name,
    scope,
    description = "",
    createdAt,
  } = group;

  const createdDate = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const managersCount = value.managers?.length ?? 0;
  const onlineCount = value.onlines?.length ?? 0;
  const unreadCount = value.session?.unread ?? 0;
  const updatedAt = value.session?.updatedAt;
  const lastActive = updatedAt
    ? new Date(updatedAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : null;

  const isBookmarked = Boolean(value.bookmark);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        <span
          className={`text-xs font-medium uppercase px-2 py-1 rounded-full ${
            scope === "public"
              ? "bg-green-100 text-green-800"
              : scope === "private"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {scope}
        </span>
      </div>

      {createdDate && (
        <p className="mt-1 text-sm text-gray-500">Created on {createdDate}</p>
      )}

      {description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {description}
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Managers:</span> {managersCount}
        </div>
        <div>
          <span className="font-medium">Online:</span> {onlineCount}
        </div>
        <div>
          <span className="font-medium">Unread:</span> {unreadCount}
        </div>
        {lastActive && (
          <div>
            <span className="font-medium">Last Active:</span> {lastActive}
          </div>
        )}
      </div>

      {isBookmarked && (
        <div className="mt-4 text-sm text-indigo-600 font-medium">
          ★ Bookmarked
        </div>
      )}
    </div>
  );
}
