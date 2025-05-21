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
  if (!group) {
    return (
      <div className="p-4 text-center text-gray-500">
        No group data available.
      </div>
    );
  }

  const managersCount = value.managers?.length ?? 0;
  const onlineCount = value.onlines?.length ?? 0;
  const unreadCount = value.session?.unread ?? 0;
  const isBookmarked = !!value.bookmark;
  const createdDate = group.createdAt
    ? new Date(group.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;
  const scopeLabel =
    group.scope.charAt(0).toUpperCase() + group.scope.slice(1);
  const initials = group.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      {/* Header: Icon or Initials + Name + Badges */}
      <div className="flex items-center space-x-4">
        {group.icon ? (
          <img
            src={group.icon}
            alt={`${group.name} icon`}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
            {initials}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-800 truncate">
            {group.name}
          </h2>
          <div className="mt-1 flex flex-wrap gap-2">
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
              {scopeLabel}
            </span>
            {group.active === false ? (
              <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                Inactive
              </span>
            ) : null}
            {isBookmarked && (
              <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                ★ Bookmarked
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description (truncated) */}
      {group.description && (
        <p className="text-gray-600 text-sm line-clamp-2">
          {group.description}
        </p>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-gray-800">{managersCount}</span>
          <span>Managers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-gray-800">{onlineCount}</span>
          <span>Online</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-gray-800">{unreadCount}</span>
          <span>Unread</span>
        </div>
        {createdDate && (
          <div className="flex flex-col items-center">
            <span className="font-semibold text-gray-800">{createdDate}</span>
            <span>Created</span>
          </div>
        )}
      </div>
    </div>
  );
}
