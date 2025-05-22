import { tags } from "typia";
import React from "react";
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
                tags?: string[] & tags.MinItems<0> & tags.MaxItems<10> & tags.UniqueItems;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4UserView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No user data available
      </div>
    );
  }

  const fullName = user.name || user.unifiedId || "Unknown User";
  const avatarUrl = user.avatarUrl;
  const lastSeenAt = user.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString()
    : null;
  const isOnline = Boolean(value.online && value.online.id);
  const statusText = isOnline
    ? "Online"
    : lastSeenAt
    ? `Offline (Last seen: ${lastSeenAt})`
    : "Offline";
  const statusColor = isOnline
    ? "bg-green-100 text-green-800"
    : "bg-gray-100 text-gray-600";

  const unreadCount = user.unread ?? 0;
  const alertCount = user.alert ?? 0;
  const sessionsCount = user.sessionsCount ?? 0;

  const location =
    user.city && user.country
      ? `${user.city}, ${user.country}`
      : user.city || user.country || null;

  const tags = user.tags ?? [];
  const displayTags = tags.slice(0, 5);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={fullName}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-500 flex-shrink-0">
          {fullName
            .split(" ")
            .map((part) => part[0] || "")
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </div>
      )}
      <div className="flex-1 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {fullName}
          </h3>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
          >
            {statusText}
          </span>
        </div>
        {user.email && (
          <p className="text-sm text-gray-600 truncate">{user.email}</p>
        )}
        <div className="flex flex-wrap items-center space-x-2 space-y-1 text-sm text-gray-500">
          {location && (
            <span className="bg-gray-100 px-2 py-0.5 rounded">{location}</span>
          )}
          {user.language && (
            <span className="bg-gray-100 px-2 py-0.5 rounded uppercase">
              {user.language}
            </span>
          )}
          {unreadCount > 0 && (
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              Unread: {unreadCount}
            </span>
          )}
          {alertCount > 0 && (
            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded">
              Alerts: {alertCount}
            </span>
          )}
          {sessionsCount > 0 && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
              Sessions: {sessionsCount}
            </span>
          )}
        </div>
        {displayTags.length > 0 && (
          <div className="flex flex-wrap mt-2 space-x-2 text-xs">
            {displayTags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full truncate max-w-xs"
              >
                {tag}
              </span>
            ))}
            {tags.length > displayTags.length && (
              <span className="text-xs text-gray-500">
                +{tags.length - displayTags.length} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
