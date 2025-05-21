import { tags } from "typia";
import React from "react";
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
  const user = value.user;
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No user data available
      </div>
    );
  }

  // 1. Define data aggregation/transformation functions or derived constants
  const fullName = user.name?.trim() || "Unnamed User";
  const typeLabel = user.type
    ? user.type.charAt(0).toUpperCase() + user.type.slice(1)
    : "Unknown";
  const isOnline = Boolean(value.online);
  const lastSeen = user.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString()
    : null;
  const email = user.email || null;
  const mobile = user.mobileNumber || null;
  const unreadCount = user.unread ?? 0;
  const alertCount = user.alert ?? 0;
  const location = [user.city, user.country].filter(Boolean).join(", ") || null;
  const tags = user.tags ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
      {/* Avatar & Online Status */}
      <div className="relative flex-shrink-0">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-500">
            {fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        )}
        <span
          className={[
            "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white",
            isOnline ? "bg-green-500" : "bg-gray-400",
          ].join(" ")}
        />
      </div>

      {/* User Info */}
      <div className="flex-1 flex flex-col space-y-2">
        {/* Name, Type, Online */}
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {fullName}
          </h2>
          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full truncate">
            {typeLabel}
          </span>
          {isOnline && (
            <span className="ml-2 flex items-center text-green-600 text-xs font-medium">
              ● Online
            </span>
          )}
        </div>

        {/* Contact & Location */}
        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600">
          {email && (
            <span className="flex items-center truncate">
              📧 {email}
              {user.emailQualified && (
                <span className="ml-1 text-green-500">✓</span>
              )}
            </span>
          )}
          {mobile && (
            <span className="flex items-center truncate">
              📱 {mobile}
              {user.mobileNumberQualified && (
                <span className="ml-1 text-green-500">✓</span>
              )}
            </span>
          )}
          {location && (
            <span className="flex items-center truncate">📍 {location}</span>
          )}
          {!isOnline && lastSeen && (
            <span className="flex items-center truncate">
              Last seen: {lastSeen}
            </span>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap mt-2 space-x-2">
            {tags.slice(0, 5).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full truncate"
              >
                {tag}
              </span>
            ))}
            {tags.length > 5 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                +{tags.length - 5} more
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex space-x-4 mt-2 text-sm text-gray-700">
          <span>Messages: {unreadCount}</span>
          <span>Alerts: {alertCount}</span>
        </div>
      </div>
    </div>
  );
}
