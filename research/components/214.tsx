import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4UserView = {
          user?: AutoViewInputSubTypes.legacy.v4.LegacyV4User;
          online?: AutoViewInputSubTypes.Online;
        };
      }
    }
    export namespace v4 {
      export type LegacyV4User = {
        id?: string;
        channelId?: string;
        memberId?: string;
        veilId?: string;
        unifiedId?: string;
        name?: string;
        profile?: {
          [key: string]: {};
        };
        profileOnce?: AutoViewInputSubTypes.profile.UserProfile;
        tags?: string[] &
          tags.MinItems<0> &
          tags.MaxItems<10> &
          tags.UniqueItems;
        alert?: number & tags.Type<"int32">;
        unread?: number & tags.Type<"int32">;
        popUpChatId?: string;
        blocked?: boolean;
        unsubscribed?: boolean;
        hasChat?: boolean;
        hasPushToken?: boolean;
        language?: string & tags.Default<"en">;
        country?: string;
        city?: string;
        latitude?: number;
        longitude?: number;
        web?: AutoViewInputSubTypes.WebInfo;
        mobile?: AutoViewInputSubTypes.MobileInfo;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
        createdAt?: number;
        updatedAt?: number;
        expireAt?: number;
        version?: number & tags.Type<"int32">;
        managedKey?: number & tags.Type<"int32">;
        member?: boolean;
        email?: string;
        userId?: string;
        avatarUrl?: string;
        managed?: boolean;
        mobileNumber?: string & tags.Default<"+18004424000">;
        systemLanguage?: string & tags.Default<"en">;
      };
    }
  }
  export namespace profile {
    export type UserProfile = {
      [key: string]: {};
    };
  }
  export type WebInfo = {
    device?: string;
    os?: string;
    osName?: string;
    browser?: string;
    browserName?: string;
    sessionsCount?: number & tags.Type<"int32">;
    lastSeenAt?: number;
  };
  export type MobileInfo = {
    device?: string;
    os?: string;
    osName?: string;
    appName?: string;
    appVersion?: string;
    sdkName?: string;
    sdkVersion?: string;
    sessionsCount?: number & tags.Type<"int32">;
    lastSeenAt?: number;
  };
  export type Online = {
    channelId?: string;
    personType?: string;
    personId?: string;
    id?: string;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4UserView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and derived constants
  const user = value.user;
  const isOnline = Boolean(value.online);
  const displayName = user?.name ?? user?.unifiedId ?? "Unknown User";
  const avatarUrl =
    user?.avatarUrl ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName,
    )}&background=random&color=fff`;
  const statusText = isOnline ? "Online" : "Offline";
  const statusIcon = isOnline ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  ) : (
    <LucideReact.XCircle className="text-red-500" size={16} />
  );
  const email = user?.email;
  const location = [user?.city, user?.country].filter(Boolean).join(", ");
  const lastSeen = user?.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString()
    : null;
  const sessions = user?.sessionsCount ?? 0;
  const unread = user?.unread ?? 0;
  const alerts = user?.alert ?? 0;
  const tags = Array.isArray(user?.tags) ? user!.tags! : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No user data available</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center p-4 border-b border-gray-200">
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full rounded-full object-cover bg-gray-100"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName,
              )}&background=64748b&color=fff`;
            }}
          />
        </div>
        <div className="ml-4 flex-1 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {displayName}
          </h2>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            {statusIcon}
            <span className="ml-1">{statusText}</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3 text-gray-700 text-sm">
        {email && (
          <div className="flex items-center gap-2">
            <LucideReact.Mail size={16} className="text-gray-400" />
            <span className="truncate">{email}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center gap-2">
            <LucideReact.MapPin size={16} className="text-gray-400" />
            <span className="truncate">{location}</span>
          </div>
        )}
        {lastSeen && (
          <div className="flex items-center gap-2">
            <LucideReact.Clock size={16} className="text-gray-400" />
            <span>Last seen: {lastSeen}</span>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            <LucideReact.Users size={16} className="text-gray-400" />
            <span>{sessions} sessions</span>
          </div>
          {unread > 0 && (
            <div className="flex items-center gap-1">
              <LucideReact.MessageSquare size={16} className="text-gray-400" />
              <span>{unread} unread</span>
            </div>
          )}
          {alerts > 0 && (
            <div className="flex items-center gap-1">
              <LucideReact.AlertTriangle size={16} className="text-gray-400" />
              <span>{alerts} alerts</span>
            </div>
          )}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs truncate"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
