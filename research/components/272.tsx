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
      <div className="p-4 bg-white rounded-lg shadow-md text-gray-500 flex flex-col items-center">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No user data available</span>
      </div>
    );
  }

  const displayName =
    user.name ??
    (user.memberId ? `Member #${user.memberId}` : undefined) ??
    (user.unifiedId ? `User ${user.unifiedId}` : "Unknown User");

  const avatarSrc =
    user.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName,
    )}&background=0D8ABC&color=fff&size=128`;

  const isOnline = Boolean(value.online?.id);
  const lastSeen = user.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex items-center">
        <div className="flex-shrink-0">
          <img
            src={avatarSrc}
            alt={displayName}
            className="h-16 w-16 rounded-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName,
              )}&background=0D8ABC&color=fff&size=128`)
            }
          />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {displayName}
            </h2>
            {isOnline ? (
              <LucideReact.CheckCircle
                className="ml-2 text-green-500"
                size={16}
                aria-label="Online"
              />
            ) : (
              <LucideReact.XCircle
                className="ml-2 text-gray-400"
                size={16}
                aria-label="Offline"
              />
            )}
          </div>
          <div className="mt-1 flex items-center text-sm">
            {user.type && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full capitalize">
                {user.type}
              </span>
            )}
            {!isOnline && lastSeen && (
              <span className="ml-2 text-gray-500 truncate">
                Last seen {lastSeen}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 space-y-2 text-sm text-gray-700">
        {user.email && (
          <div className="flex items-center gap-1">
            <LucideReact.Mail className="text-gray-400" size={16} />
            <span className="truncate">{user.email}</span>
            {user.emailQualified ? (
              <LucideReact.CheckCircle
                className="text-green-500 ml-1"
                size={16}
                aria-label="Email verified"
              />
            ) : (
              <LucideReact.AlertTriangle
                className="text-yellow-500 ml-1"
                size={16}
                aria-label="Email not verified"
              />
            )}
          </div>
        )}
        {user.mobileNumber && (
          <div className="flex items-center gap-1">
            <LucideReact.Phone className="text-gray-400" size={16} />
            <span>{user.mobileNumber}</span>
            {user.mobileNumberQualified ? (
              <LucideReact.CheckCircle
                className="text-green-500 ml-1"
                size={16}
                aria-label="Phone verified"
              />
            ) : (
              <LucideReact.AlertTriangle
                className="text-yellow-500 ml-1"
                size={16}
                aria-label="Phone not verified"
              />
            )}
          </div>
        )}
        {user.tags && user.tags.length > 0 && (
          <div className="flex items-center gap-1">
            <LucideReact.Tag className="text-blue-500" size={16} />
            <span>
              {user.tags.length} tag{user.tags.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
