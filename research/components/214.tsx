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
      <div className="p-4 text-center text-gray-500">
        No user data available.
      </div>
    );
  }

  const displayName = user.name ?? "Unnamed User";
  const email = user.email ?? "";
  const avatarUrl = user.avatarUrl;
  const locationParts = [user.city, user.country].filter(Boolean);
  const displayLocation = locationParts.length > 0 ? locationParts.join(", ") : undefined;
  const language = (user.language ?? "en").toUpperCase();
  const unreadCount = user.unread ?? 0;
  const alertCount = user.alert ?? 0;
  const sessions = user.sessionsCount ?? 0;
  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("default", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;
  const lastSeen = user.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleDateString("default", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;
  const isBlocked = user.blocked;
  const isUnsubscribed = user.unsubscribed;

  const online = value.online;
  const isOnline = Boolean(online && (online.id ?? online.channelId));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            ?
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {displayName}
          </h2>
          {email && (
            <p className="text-sm text-gray-500 truncate">{email}</p>
          )}
        </div>
        {isOnline && (
          <span className="flex-shrink-0 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Online
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
        {displayLocation && (
          <div>
            <span className="font-medium text-gray-800">Location:</span>{" "}
            {displayLocation}
          </div>
        )}
        <div>
          <span className="font-medium text-gray-800">Language:</span> {language}
        </div>
        <div>
          <span className="font-medium text-gray-800">Unread:</span> {unreadCount}
        </div>
        <div>
          <span className="font-medium text-gray-800">Alerts:</span> {alertCount}
        </div>
        <div>
          <span className="font-medium text-gray-800">Sessions:</span> {sessions}
        </div>
        {lastSeen && (
          <div>
            <span className="font-medium text-gray-800">Last Seen:</span>{" "}
            {lastSeen}
          </div>
        )}
        {joinDate && (
          <div>
            <span className="font-medium text-gray-800">Joined:</span>{" "}
            {joinDate}
          </div>
        )}
        {isBlocked != null && (
          <div>
            <span className="font-medium text-gray-800">Blocked:</span>{" "}
            {isBlocked ? "Yes" : "No"}
          </div>
        )}
        {isUnsubscribed != null && (
          <div>
            <span className="font-medium text-gray-800">Unsubscribed:</span>{" "}
            {isUnsubscribed ? "Yes" : "No"}
          </div>
        )}
      </div>

      {online && online.channelId && (
        <div className="mt-4 text-xs text-gray-500 truncate">
          <span className="font-medium">Channel ID:</span> {online.channelId}
        </div>
      )}
    </div>
  );
}
