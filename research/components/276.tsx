import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace desk {
    export type UserView = {
      user?: AutoViewInputSubTypes.user.User;
      online?: AutoViewInputSubTypes.Online;
    };
  }
  export namespace user {
    export type User = {
      id?: string;
      channelId?: string;
      memberId?: string;
      veilId?: string;
      unifiedId?: string;
      type?: "member" | "lead" | "unified";
      name?: string;
      mobileNumberQualified?: boolean;
      emailQualified?: boolean;
      profile?: {
        [key: string]: {};
      };
      profileOnce?: AutoViewInputSubTypes.profile.UserProfile;
      tags?: string[] & tags.MinItems<0> & tags.MaxItems<20> & tags.UniqueItems;
      userImportTags?: string[] & tags.MinItems<0> & tags.MaxItems<30>;
      alert?: number & tags.Type<"int32">;
      unread?: number & tags.Type<"int32">;
      popUpChatId?: string;
      blocked?: boolean;
      blockedKey?: string;
      unsubscribeEmail?: boolean;
      unsubscribeEmailUpdatedAt?: number;
      unsubscribeTexting?: boolean;
      unsubscribeTextingUpdatedAt?: number;
      hasChat?: boolean;
      mainChatId?: string;
      hasPushToken?: boolean;
      language?: string & tags.Default<"en">;
      country?: string;
      timeZone?: string;
      province?: string;
      city?: string;
      latitude?: number;
      longitude?: number;
      web?: AutoViewInputSubTypes.WebInfo;
      mobile?: AutoViewInputSubTypes.MobileInfo;
      sessionsCount?: number & tags.Type<"int32">;
      lastSeenAt?: number;
      createdAt?: number;
      updatedAt?: number;
      version?: number & tags.Type<"int32">;
      managedKey?: number & tags.Type<"int32">;
      named?: boolean;
      member?: boolean;
      email?: string;
      avatarUrl?: string;
      mobileNumber?: string & tags.Default<"+18004424000">;
      landlineNumber?: string & tags.Default<"+18004424000">;
      constrainted?: boolean;
      systemLanguage?: string & tags.Default<"en">;
    };
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
export type AutoViewInput = AutoViewInputSubTypes.desk.UserView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  if (!user) {
    return (
      <div className="p-4 flex items-center justify-center text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No user data available</span>
      </div>
    );
  }

  const displayName = user.name?.trim() || "Unknown User";
  const avatarSrc =
    user.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
  const isOnline = Boolean(value.online);
  const lastSeen = user.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const userType = user.type;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={avatarSrc}
          alt={displayName}
          className="w-16 h-16 rounded-full object-cover bg-gray-100"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
          }}
        />
      </div>

      {/* Main Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 truncate">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {displayName}
          </h3>
          {userType && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full capitalize">
              {userType}
            </span>
          )}
          <div className="flex-shrink-0">
            {isOnline ? (
              <LucideReact.Circle size={12} className="text-green-500" />
            ) : (
              <LucideReact.Circle size={12} className="text-gray-400" />
            )}
          </div>
        </div>

        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-600">
          {user.email && (
            <div className="flex items-center truncate">
              <LucideReact.Mail size={16} className="text-gray-400" />
              <span className="ml-1 truncate">{user.email}</span>
              {user.emailQualified && (
                <LucideReact.CheckCircle
                  size={14}
                  className="ml-1 text-green-500"
                />
              )}
            </div>
          )}
          {user.mobileNumber && (
            <div className="flex items-center truncate">
              <LucideReact.Phone size={16} className="text-gray-400" />
              <span className="ml-1 truncate">{user.mobileNumber}</span>
              {user.mobileNumberQualified && (
                <LucideReact.CheckCircle
                  size={14}
                  className="ml-1 text-green-500"
                />
              )}
            </div>
          )}
          {!isOnline && lastSeen && (
            <div className="flex items-center truncate">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <span className="ml-1 truncate">Last seen: {lastSeen}</span>
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      {(user.unread! > 0 || user.alert! > 0) && (
        <div className="flex-shrink-0 flex space-x-4">
          {user.unread! > 0 && (
            <div className="flex items-center text-gray-500">
              <LucideReact.MessageSquare size={16} />
              <span className="ml-1 text-sm">{user.unread}</span>
            </div>
          )}
          {user.alert! > 0 && (
            <div className="flex items-center text-red-500">
              <LucideReact.AlertTriangle size={16} />
              <span className="ml-1 text-sm">{user.alert}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
