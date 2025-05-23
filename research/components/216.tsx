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
  // Fallback UI when no user data is provided
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <LucideReact.AlertCircle size={48} className="text-gray-300" />
        <p className="mt-4 text-gray-500">No user data available</p>
      </div>
    );
  }

  // Derive display name
  const displayName = user.name || user.email || "Unknown User";
  // Build avatar URL with fallback to initials-based avatar
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = user.avatarUrl || defaultAvatar;
  // Online status determination
  const isOnline = Boolean(value.online?.id);
  // Format last seen date/time
  const lastSeen =
    user.lastSeenAt != null
      ? new Date(user.lastSeenAt).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : null;
  const statusText = isOnline
    ? "Online"
    : lastSeen
    ? `Last seen: ${lastSeen}`
    : "Offline";
  const statusColor = isOnline ? "text-green-500" : "text-gray-500";
  const statusIcon = (
    <LucideReact.Circle size={12} className={`mr-1 ${statusColor}`} />
  );

  // Location string
  const location = [user.city, user.country].filter(Boolean).join(", ");
  const tags = user.tags ?? [];

  // Handler to fallback avatar on error
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = defaultAvatar;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={avatarUrl}
          alt={`${displayName} avatar`}
          onError={handleImageError}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900">{displayName}</h2>
          <div className="flex items-center text-sm text-gray-500">
            {statusIcon}
            <span>{statusText}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-gray-700 text-sm">
        {user.email && (
          <div className="flex items-center">
            <LucideReact.Mail size={16} className="mr-2 text-gray-400" />
            <span className="truncate">{user.email}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center">
            <LucideReact.MapPin size={16} className="mr-2 text-gray-400" />
            <span className="truncate">{location}</span>
          </div>
        )}
        {user.sessionsCount != null && (
          <div className="flex items-center">
            <LucideReact.Users size={16} className="mr-2 text-gray-400" />
            <span>Sessions: {user.sessionsCount}</span>
          </div>
        )}
      </div>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
  // 3. Return the React element.
}
