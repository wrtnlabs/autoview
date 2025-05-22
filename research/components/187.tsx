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
  const managers = value.managers ?? [];
  const onlines = value.onlines ?? [];

  // Fallback when no group data
  if (!group) {
    return (
      <div className="p-4 flex items-center text-gray-500">
        <LucideReact.AlertCircle size={20} className="mr-2" />
        <span>No group information available.</span>
      </div>
    );
  }

  // Format creation date
  const formattedCreatedDate = group.createdAt
    ? new Date(group.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // Scope badge styles
  const scopeColors: Record<"all" | "public" | "private", string> = {
    all: "bg-green-100 text-green-800",
    public: "bg-blue-100 text-blue-800",
    private: "bg-gray-100 text-gray-800",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-md mx-auto">
      {/* Header: Name & Scope */}
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {group.name}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${scopeColors[group.scope]}`}
        >
          {group.scope.charAt(0).toUpperCase() + group.scope.slice(1)}
        </span>
      </div>

      {/* Description */}
      {group.description && (
        <p className="text-gray-700 text-sm line-clamp-2">
          {group.description}
        </p>
      )}

      {/* Group meta: status, created date, managers count, online count */}
      <div className="flex flex-wrap items-center text-gray-500 text-sm gap-4">
        <div className="flex items-center">
          {group.active ? (
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
          )}
          <span className="ml-1">{group.active ? "Active" : "Inactive"}</span>
        </div>

        {formattedCreatedDate && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span className="ml-1">{formattedCreatedDate}</span>
          </div>
        )}

        <div className="flex items-center">
          <LucideReact.Users size={16} className="text-gray-400" />
          <span className="ml-1">
            {managers.length} Manager{managers.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="flex items-center">
          <LucideReact.UserCheck size={16} className="text-gray-400" />
          <span className="ml-1">{onlines.length} Online</span>
        </div>
      </div>

      {/* Managers Avatars */}
      {managers.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Managers</h3>
          <div className="flex -space-x-2">
            {managers.slice(0, 5).map((mgr, idx) => {
              const name = mgr.name || "Unknown";
              const src = mgr.avatarUrl
                ? mgr.avatarUrl
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    name,
                  )}&background=0D8ABC&color=fff`;
              return (
                <img
                  key={idx}
                  src={src}
                  alt={name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      name,
                    )}&background=ccc&color=555`;
                  }}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              );
            })}
            {managers.length > 5 && (
              <div className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 text-xs font-medium rounded-full border-2 border-white">
                +{managers.length - 5}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
