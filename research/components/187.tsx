import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4GroupView {
                    managers?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager[];
                    onlines?: AutoViewInputSubTypes.legacy.v4.LegacyV4Online[];
                    bookmark?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatBookmark;
                    session?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatSession;
                    group?: AutoViewInputSubTypes.legacy.v4.LegacyV4Group;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4Manager {
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
            }
            export interface LegacyV4Online {
                channelId?: string;
                personType?: string;
                personId?: string;
                id?: string;
            }
            export interface LegacyV4ChatBookmark {
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
            export interface LegacyV4ChatSession {
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
            }
            export interface LegacyV4Group {
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
            }
        }
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
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4GroupView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const group = value.group;
  const managers = value.managers ?? [];
  const onlineCount = value.onlines?.length ?? 0;
  const session = value.session;
  const bookmark = value.bookmark;
  const unreadCount = session?.unread ?? 0;
  const alertCount = session?.alert ?? 0;

  const formattedCreatedAt = group?.createdAt
    ? new Date(group.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  const formattedUpdatedAt = group?.updatedAt
    ? new Date(group.updatedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  // badge color by scope
  const scopeBadgeClasses: Record<string, string> = {
    all: 'bg-gray-100 text-gray-800',
    public: 'bg-blue-100 text-blue-800',
    private: 'bg-red-100 text-red-800',
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!group) {
    return (
      <div className="flex items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} aria-label="No data" />
        <span className="ml-2">No Group Information Available</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{group.name}</h2>
          {group.active !== undefined && (
            group.active ? (
              <LucideReact.CheckCircle
                size={16}
                className="text-green-500"
                aria-label="Active"
              />
            ) : (
              <LucideReact.XCircle
                size={16}
                className="text-red-500"
                aria-label="Inactive"
              />
            )
          )}
        </div>
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded ${
            scopeBadgeClasses[group.scope] || scopeBadgeClasses.all
          }`}
        >
          {group.scope.toUpperCase()}
        </span>
      </div>

      {/* Description */}
      {group.description && (
        <p className="mt-2 text-gray-700 text-sm line-clamp-2">
          {group.description}
        </p>
      )}

      {/* Stats Grid */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-gray-600 text-sm">
        <div className="flex items-center">
          <LucideReact.Users size={16} className="text-gray-400" aria-label="Managers" />
          <span className="ml-1">
            {managers.length} Manager{managers.length !== 1 && 's'}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.Activity size={16} className="text-gray-400" aria-label="Online users" />
          <span className="ml-1">{onlineCount} Online</span>
        </div>
        <div className="flex items-center">
          <LucideReact.MessageSquare size={16} className="text-gray-400" aria-label="Unread messages" />
          <span className="ml-1">{unreadCount} Unread</span>
        </div>
        <div className="flex items-center">
          {bookmark ? (
            <>
              <LucideReact.Bookmark size={16} className="text-gray-400" aria-label="Bookmarked" />
              <span className="ml-1">Bookmarked</span>
            </>
          ) : (
            <>
              <LucideReact.Bookmark
                size={16}
                className="text-gray-400 opacity-50"
                aria-label="Not bookmarked"
              />
              <span className="ml-1">Not Bookmarked</span>
            </>
          )}
        </div>
      </div>

      {/* Footer Dates */}
      <div className="mt-4 flex flex-wrap items-center text-gray-500 text-xs space-x-4">
        {formattedCreatedAt && (
          <div className="flex items-center">
            <LucideReact.Calendar size={14} aria-label="Created date" />
            <span className="ml-1">Created: {formattedCreatedAt}</span>
          </div>
        )}
        {formattedUpdatedAt && (
          <div className="flex items-center">
            <LucideReact.Edit2 size={14} aria-label="Updated date" />
            <span className="ml-1">Updated: {formattedUpdatedAt}</span>
          </div>
        )}
        {alertCount > 0 && (
          <div className="flex items-center">
            <LucideReact.AlertTriangle
              size={14}
              className="text-amber-500"
              aria-label="Alerts"
            />
            <span className="ml-1">
              {alertCount} Alert{alertCount !== 1 && 's'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
  // 3. Return the React element.
}
