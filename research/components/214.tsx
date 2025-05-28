import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4UserView {
                    user?: AutoViewInputSubTypes.legacy.v4.LegacyV4User;
                    online?: AutoViewInputSubTypes.Online;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4User {
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
            }
        }
    }
    export namespace profile {
        export interface UserProfile {
            [key: string]: {};
        }
    }
    export interface WebInfo {
        device?: string;
        os?: string;
        osName?: string;
        browser?: string;
        browserName?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    }
    export interface MobileInfo {
        device?: string;
        os?: string;
        osName?: string;
        appName?: string;
        appVersion?: string;
        sdkName?: string;
        sdkVersion?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    }
    export interface Online {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4UserView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const online = value.online;
  const isOnline = Boolean(online?.id);

  const displayName = user?.name ?? user?.email ?? "Unknown User";
  const avatarUrl =
    user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&background=random&color=fff`;
  const avatarFallback = avatarUrl;

  const formattedLastSeen = user?.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;
  const tags = user?.tags ?? [];
  const alerts = user?.alert ?? 0;
  const unread = user?.unread ?? 0;
  const location = [user?.city, user?.country].filter(Boolean).join(", ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <LucideReact.AlertCircle
          size={48}
          className="text-gray-400 mb-2"
          aria-label="No data"
        />
        <span className="text-gray-600">No user data available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = avatarFallback;
            }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {displayName}
            </h2>
            {isOnline ? (
              <LucideReact.Circle
                size={12}
                className="text-green-500"
                aria-label="Online"
              />
            ) : (
              <LucideReact.Circle
                size={12}
                className="text-gray-300"
                aria-label="Offline"
              />
            )}
          </div>
          {tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        {user.email && (
          <div className="flex items-center space-x-2">
            <LucideReact.Mail size={16} />
            <span className="truncate">{user.email}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center space-x-2">
            <LucideReact.MapPin size={16} />
            <span className="truncate">{location}</span>
          </div>
        )}
        {formattedLastSeen && (
          <div className="flex items-center space-x-2">
            <LucideReact.Clock size={16} />
            <span>Last seen: {formattedLastSeen}</span>
          </div>
        )}
        {unread > 0 && (
          <div className="flex items-center space-x-2">
            <LucideReact.MessageSquare size={16} />
            <span>{unread} unread messages</span>
          </div>
        )}
        {alerts > 0 && (
          <div className="flex items-center space-x-2">
            <LucideReact.Bell size={16} />
            <span>{alerts} alerts</span>
          </div>
        )}
        {user.mobile?.sessionsCount != null && (
          <div className="flex items-center space-x-2">
            <LucideReact.Smartphone size={16} />
            <span>{user.mobile.sessionsCount} mobile sessions</span>
          </div>
        )}
        {user.web?.sessionsCount != null && (
          <div className="flex items-center space-x-2">
            <LucideReact.Monitor size={16} />
            <span>{user.web.sessionsCount} web sessions</span>
          </div>
        )}
        {user.language && (
          <div className="flex items-center space-x-2">
            <LucideReact.Globe size={16} />
            <span>{user.language.toUpperCase()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
