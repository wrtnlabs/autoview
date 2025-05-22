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
  const displayName = user.name ?? user.email ?? 'Unknown User';
  const isOnline = Boolean(
    value.online && (value.online.id || value.online.personId || value.online.channelId)
  );
  const statusColor = isOnline ? 'bg-green-500' : 'bg-gray-400';

  const formatDate = (ts?: number): string | undefined => {
    if (!ts) return undefined;
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const lastSeen = formatDate(user.lastSeenAt);
  const joined = formatDate(user.createdAt);
  const sessions = user.sessionsCount;
  const unread = user.unread;
  const location = [user.city, user.country].filter(Boolean).join(', ');
  const tags = user.tags ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={`${displayName} avatar`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-gray-500">
              ?
            </span>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {displayName}
          </h2>
          <span
            className={`w-3 h-3 rounded-full ${statusColor}`}
            title={isOnline ? 'Online' : 'Offline'}
          />
        </div>
        {user.email && (
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        )}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
          {location && (
            <div className="truncate">
              <strong className="font-medium text-gray-700">Location: </strong>
              {location}
            </div>
          )}
          {joined && (
            <div className="truncate">
              <strong className="font-medium text-gray-700">Joined: </strong>
              {joined}
            </div>
          )}
          {lastSeen && (
            <div className="truncate">
              <strong className="font-medium text-gray-700">Last seen: </strong>
              {lastSeen}
            </div>
          )}
          {sessions !== undefined && (
            <div className="truncate">
              <strong className="font-medium text-gray-700">Sessions: </strong>
              {sessions}
            </div>
          )}
          {unread !== undefined && unread > 0 && (
            <div className="truncate">
              <strong className="font-medium text-gray-700">Unread: </strong>
              {unread}
            </div>
          )}
        </div>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-1 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
