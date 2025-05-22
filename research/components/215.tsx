import * as LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow text-gray-500 flex items-center justify-center">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No user data available</span>
      </div>
    );
  }

  const displayName = user.name || user.email || "Unknown User";
  const formatDate = (ms?: number): string =>
    ms ? new Date(ms).toLocaleString() : "N/A";
  const isOnline = Boolean(value.online?.id);
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = user.avatarUrl || avatarFallback;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Avatar, Name, Online Status */}
      <div className="flex items-center">
        <img
          src={avatarSrc}
          alt={displayName}
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = avatarFallback;
          }}
        />
        <div className="ml-4 flex-1">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {displayName}
            </h2>
            <LucideReact.Circle
              className={`ml-2 ${
                isOnline ? "text-green-500" : "text-gray-400"
              }`}
              size={12}
            />
          </div>
          {user.email && (
            <div className="flex items-center text-gray-500 text-sm mt-1 truncate">
              <LucideReact.Mail size={16} />
              <span className="ml-1">{user.email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-gray-600 text-sm">
        {user.city && user.country && (
          <div className="flex items-center">
            <LucideReact.MapPin size={16} />
            <span className="ml-1 truncate">
              {user.city}, {user.country}
            </span>
          </div>
        )}
        {user.lastSeenAt && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} />
            <span className="ml-1">{formatDate(user.lastSeenAt)}</span>
          </div>
        )}
        {typeof user.alert === "number" && (
          <div className="flex items-center">
            <LucideReact.AlertTriangle className="text-yellow-500" size={16} />
            <span className="ml-1">{user.alert} alerts</span>
          </div>
        )}
        {typeof user.unread === "number" && (
          <div className="flex items-center">
            <LucideReact.MessageCircle size={16} />
            <span className="ml-1">{user.unread} unread</span>
          </div>
        )}
        {typeof user.sessionsCount === "number" && (
          <div className="flex items-center">
            <LucideReact.Users size={16} />
            <span className="ml-1">{user.sessionsCount} sessions</span>
          </div>
        )}
        {user.language && (
          <div className="flex items-center">
            <LucideReact.Globe size={16} />
            <span className="ml-1 uppercase">{user.language}</span>
          </div>
        )}
        {user.hasChat && (
          <div className="flex items-center">
            <LucideReact.MessageSquare size={16} />
            <span className="ml-1">Chat Enabled</span>
          </div>
        )}
        {user.hasPushToken && (
          <div className="flex items-center">
            <LucideReact.Bell size={16} />
            <span className="ml-1">Push Notifications</span>
          </div>
        )}
        {user.blocked && (
          <div className="flex items-center text-red-500">
            <LucideReact.Lock size={16} />
            <span className="ml-1">Blocked</span>
          </div>
        )}
        {user.unsubscribed && (
          <div className="flex items-center text-gray-500">
            <LucideReact.XCircle size={16} />
            <span className="ml-1">Unsubscribed</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {user.tags && user.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {user.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Client Platforms */}
      <div className="mt-4 flex items-center space-x-4 text-gray-500 text-sm">
        {user.web && (
          <div className="flex items-center">
            <LucideReact.Monitor size={16} />
            <span className="ml-1">Web Client</span>
          </div>
        )}
        {user.mobile && (
          <div className="flex items-center">
            <LucideReact.Smartphone size={16} />
            <span className="ml-1">Mobile Client</span>
          </div>
        )}
      </div>
    </div>
  );
}
