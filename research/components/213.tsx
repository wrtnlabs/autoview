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
      <div className="p-4 bg-gray-100 text-gray-500 text-center rounded-lg">
        No user data available.
      </div>
    );
  }

  const displayName = user.name ?? user.email ?? "Unknown User";
  const avatarUrl = user.avatarUrl;
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isOnline = Boolean(value.online?.id || value.online?.personId);
  const statusColor = isOnline ? "bg-green-500" : "bg-gray-400";

  const lastSeen = user.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  const sessionCount = user.sessionsCount ?? 0;
  const location = [user.city, user.country].filter(Boolean).join(", ");
  const userTags = user.tags ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4 max-w-sm">
      {/* Avatar & Online Status */}
      <div className="relative flex-shrink-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
            {initials}
          </div>
        )}
        <span
          className={`absolute bottom-0 right-0 block w-4 h-4 rounded-full ring-2 ring-white ${statusColor}`}
        />
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-medium text-gray-900 truncate">
          {displayName}
        </h2>
        {user.email && (
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        )}

        <div className="mt-2 flex flex-wrap items-center space-x-2 text-xs text-gray-400">
          {location && <span>{location}</span>}
          <span>Sessions: {sessionCount}</span>
          {!isOnline && lastSeen && <span>Last seen: {lastSeen}</span>}
        </div>

        {userTags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {userTags.slice(0, 5).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
            {userTags.length > 5 && (
              <span className="text-xs text-gray-500">
                +{userTags.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
