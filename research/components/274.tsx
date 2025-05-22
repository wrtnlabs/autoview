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
      <div className="p-4 flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No user data available</span>
      </div>
    );
  }

  const fullName = user.name ?? "Unknown User";
  const encodedName = encodeURIComponent(fullName);
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodedName}&background=0D8ABC&color=fff`;
  const avatarSrc = user.avatarUrl ?? fallbackAvatar;
  const isOnline = Boolean(value.online);
  const statusIcon = isOnline ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  ) : (
    <LucideReact.XCircle className="text-gray-400" size={16} />
  );
  const statusText = isOnline ? "Online" : "Offline";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex space-x-4 max-w-md w-full">
      <div className="flex-shrink-0">
        <img
          src={avatarSrc}
          alt={fullName}
          className="w-16 h-16 rounded-full object-cover bg-gray-100"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackAvatar;
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        {/* Header: Name & Status */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {fullName}
          </h2>
          <div className="flex items-center space-x-1">
            {statusIcon}
            <span className="text-sm text-gray-500">{statusText}</span>
          </div>
        </div>

        {/* Contact & Role */}
        <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600 space-x-4">
          {user.type && (
            <span className="capitalize bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
              {user.type}
            </span>
          )}
          {user.email && (
            <div className="flex items-center space-x-1">
              <LucideReact.Mail className="text-gray-400" size={16} />
              <span className="truncate">{user.email}</span>
            </div>
          )}
          {user.mobileNumber && (
            <div className="flex items-center space-x-1">
              <LucideReact.Phone className="text-gray-400" size={16} />
              <span>{user.mobileNumber}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {user.tags && user.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {user.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Unread & Alerts */}
        {(typeof user.unread === "number" ||
          typeof user.alert === "number") && (
          <div className="mt-3 flex space-x-4 text-sm text-gray-600">
            {typeof user.unread === "number" && (
              <div className="flex items-center space-x-1">
                <LucideReact.MessageSquare
                  className="text-gray-400"
                  size={16}
                />
                <span>{user.unread} unread</span>
              </div>
            )}
            {typeof user.alert === "number" && (
              <div className="flex items-center space-x-1">
                <LucideReact.AlertTriangle className="text-red-500" size={16} />
                <span>{user.alert} alerts</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
