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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  if (!user) return null;

  // Format timestamps into human-readable strings
  function formatDate(ts?: number): string {
    if (!ts) return '';
    const date = new Date(ts);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Derived display values
  const displayName = user.name?.trim() || 'Unknown User';
  const displayEmail = user.email ?? '';
  const location = [user.city, user.country].filter(Boolean).join(', ');
  const lastSeenText = user.lastSeenAt ? formatDate(user.lastSeenAt) : '';
  const onlineStatus = value.online ? 'Online' : 'Offline';
  const onlineDotClass = value.online ? 'bg-green-500' : 'bg-gray-400';
  const tags = user.tags ?? [];
  const unreadCount = user.unread ?? 0;
  const alertCount = user.alert ?? 0;
  // Fallback avatar using first initial if no URL
  const avatarSrc =
    user.avatarUrl ||
    `https://via.placeholder.com/48/DDD/888?text=${encodeURIComponent(
      displayName.charAt(0).toUpperCase(),
    )}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="relative flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
      {/* Notification badges */}
      {(unreadCount > 0 || alertCount > 0) && (
        <div className="absolute top-2 right-2 flex space-x-1">
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium text-white bg-red-500 rounded-full">
              {unreadCount} unread
            </span>
          )}
          {alertCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium text-white bg-yellow-500 rounded-full">
              {alertCount} alerts
            </span>
          )}
        </div>
      )}

      {/* Avatar */}
      <img
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        src={avatarSrc}
        alt={displayName}
      />

      {/* Main info */}
      <div className="flex-1 min-w-0">
        {/* Name & Type */}
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{displayName}</h2>
          {user.type && (
            <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
              {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
            </span>
          )}
        </div>

        {/* Email & Location */}
        {displayEmail && <p className="text-sm text-gray-500 truncate">{displayEmail}</p>}
        {location && <p className="text-sm text-gray-500">{location}</p>}

        {/* Online status & Last seen */}
        <div className="flex items-center space-x-1 mt-1">
          <span className={`w-2 h-2 rounded-full ${onlineDotClass}`}></span>
          <span className="text-sm text-gray-500">
            {onlineStatus}
            {lastSeenText ? ` · Last seen ${lastSeenText}` : ''}
          </span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap mt-2">
            {tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-800 bg-gray-100 px-2 py-0.5 rounded mr-1 mb-1 truncate"
              >
                {tag}
              </span>
            ))}
            {tags.length > 5 && (
              <span className="text-xs font-medium text-gray-500 px-1">
                +{tags.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
