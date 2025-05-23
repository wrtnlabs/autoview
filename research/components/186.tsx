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
  const onlines = value.onlines ?? [];
  const session = value.session;

  // If there's no group data, show a placeholder
  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} aria-hidden="true" />
        <span className="mt-2 text-sm">No group data available</span>
      </div>
    );
  }

  // Format dates
  const createdDate = group.createdAt
    ? new Date(group.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : null;
  const updatedDate = group.updatedAt
    ? new Date(group.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  // Truncate long description
  const truncatedDescription = group.description
    ? group.description.length > 120
      ? group.description.slice(0, 120) + '…'
      : group.description
    : 'No description';

  // Human-readable scope
  const scopeLabel = (() => {
    switch (group.scope) {
      case 'public': return 'Public';
      case 'private': return 'Private';
      case 'all': return 'All';
      default: return group.scope;
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-5 flex flex-col gap-4">
      {/* Header: Group Name and Active Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{group.name}</h2>
        {group.active ? (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={20}
            role="img"
            aria-label="Active"
          />
        ) : (
          <LucideReact.XCircle
            className="text-red-500"
            size={20}
            role="img"
            aria-label="Inactive"
          />
        )}
      </div>

      {/* Metadata: Scope and Dates */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Tag size={14} aria-hidden="true" />
          <span>{scopeLabel}</span>
        </div>
        {createdDate && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={14} aria-hidden="true" />
            <span>Created {createdDate}</span>
          </div>
        )}
        {updatedDate && (
          <div className="flex items-center gap-1">
            <LucideReact.RefreshCw size={14} aria-hidden="true" />
            <span>Updated {updatedDate}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm line-clamp-2">{truncatedDescription}</p>

      {/* Footer: Counts */}
      <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} aria-hidden="true" />
          <span>{managers.length} manager{managers.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.UserCheck size={16} aria-hidden="true" />
          <span>{onlines.length} online</span>
        </div>
        {session && typeof session.unread === 'number' && (
          <div className="flex items-center gap-1">
            <LucideReact.Mail size={16} aria-hidden="true" />
            <span>{session.unread} unread</span>
          </div>
        )}
      </div>
    </div>
  );
}
