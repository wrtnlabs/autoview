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
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mx-auto" />
        <p className="mt-2">User data unavailable</p>
      </div>
    );
  }

  const displayName = user.name?.trim() || "Unknown User";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=0D8ABC&color=fff`;

  const isOnline = Boolean(value.online?.id);
  const statusIcon = isOnline ? (
    <LucideReact.CheckCircle size={16} className="text-green-500" />
  ) : (
    <LucideReact.XCircle size={16} className="text-gray-400" />
  );
  const statusText = isOnline
    ? "Online"
    : user.lastSeenAt
    ? `Last seen ${new Date(user.lastSeenAt).toLocaleString()}`
    : "Offline";

  const email = user.email;
  const phone = user.mobileNumber;
  const location = [user.city, user.country].filter(Boolean).join(", ");
  const sessions = user.sessionsCount;
  const language = user.language || user.systemLanguage;

  const tags = Array.isArray(user.tags) ? user.tags : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto flex flex-col items-center sm:flex-row sm:items-start gap-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={user.avatarUrl || avatarFallback}
          alt={displayName}
          onError={(e) => {
            e.currentTarget.src = avatarFallback;
          }}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="flex-1 w-full">
        <h2 className="text-lg font-semibold text-gray-900">{displayName}</h2>
        <div className="mt-1 flex items-center text-sm text-gray-500 gap-1">
          {statusIcon}
          <span>{statusText}</span>
        </div>

        <div className="mt-3 space-y-2 text-sm text-gray-600">
          {email && (
            <div className="flex items-center gap-1">
              <LucideReact.Mail size={16} className="text-gray-400" />
              <span className="truncate">{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-1">
              <LucideReact.Phone size={16} className="text-gray-400" />
              <span>{phone}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1">
              <LucideReact.MapPin size={16} className="text-gray-400" />
              <span className="truncate">{location}</span>
            </div>
          )}
          {sessions != null && (
            <div className="flex items-center gap-1">
              <LucideReact.Users size={16} className="text-gray-400" />
              <span>{sessions} sessions</span>
            </div>
          )}
          {language && (
            <div className="flex items-center gap-1">
              <LucideReact.Globe size={16} className="text-gray-400" />
              <span>{language}</span>
            </div>
          )}
        </div>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
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
