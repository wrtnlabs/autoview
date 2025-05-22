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
  // 1. Data aggregation/transformation
  const user = value.user;
  const onlineInfo = value.online;
  const displayName = user?.name || "Unknown User";
  const userType = user?.type
    ? user.type.charAt(0).toUpperCase() + user.type.slice(1)
    : "";
  const isOnline = !!onlineInfo;
  const statusText = isOnline ? "Online" : "Offline";
  const statusColor = isOnline ? "text-green-500" : "text-gray-400";
  const formattedLastSeen = user?.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString("default", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;
  const sessions = user?.sessionsCount ?? null;
  const unreadCount = user?.unread ?? 0;
  const alertCount = user?.alert ?? 0;
  const email = user?.emailQualified && user.email ? user.email : null;
  const phone =
    user?.mobileNumberQualified && user.mobileNumber ? user.mobileNumber : null;
  const avatarUrl =
    user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName,
    )}&background=0D8ABC&color=fff`;

  // 2. JSX structure with Tailwind CSS
  return (
    <div className="max-w-sm w-full bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={avatarUrl}
          alt={displayName}
          className="w-16 h-16 rounded-full object-cover bg-gray-100"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName,
              )}&background=random`;
          }}
        />
      </div>

      {/* User Info */}
      <div className="flex-1 w-full">
        {/* Name & Type */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
            <LucideReact.User size={20} className="text-gray-500" />
            {displayName}
          </h2>
          {userType && (
            <span className="text-xs uppercase font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              {userType}
            </span>
          )}
        </div>

        {/* Online Status */}
        <div className="flex items-center mt-2 text-sm">
          <LucideReact.Circle size={12} className={statusColor} />
          <span className={`ml-1 ${statusColor}`}>{statusText}</span>
        </div>

        {/* Last Seen */}
        {formattedLastSeen && (
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span className="ml-1">Last seen: {formattedLastSeen}</span>
          </div>
        )}

        {/* Contact & Stats */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {email && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Mail size={16} className="text-gray-400" />
              <span className="ml-1 truncate">{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Phone size={16} className="text-gray-400" />
              <span className="ml-1 truncate">{phone}</span>
            </div>
          )}
          {sessions !== null && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Users size={16} className="text-gray-400" />
              <span className="ml-1">{sessions} sessions</span>
            </div>
          )}
          <div className="flex items-center text-gray-700">
            <LucideReact.MessageSquare size={16} className="text-gray-400" />
            <span className="ml-1">{unreadCount} unread</span>
          </div>
          <div className="flex items-center text-gray-700">
            <LucideReact.AlertTriangle size={16} className="text-gray-400" />
            <span className="ml-1">{alertCount} alerts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
