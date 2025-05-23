import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export interface UserView {
            user?: AutoViewInputSubTypes.user.User;
            online?: AutoViewInputSubTypes.Online;
        }
    }
    export namespace user {
        export interface User {
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
export type AutoViewInput = AutoViewInputSubTypes.desk.UserView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const user = value.user;
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={24} aria-label="No data" />
        <span className="ml-2">No user data</span>
      </div>
    );
  }

  // Derived and formatted values
  const displayName = user.name ?? "Unnamed User";
  const userType =
    user.type != null
      ? user.type.charAt(0).toUpperCase() + user.type.slice(1)
      : null;
  const formattedLastSeen = user.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString()
    : null;
  const location = [user.city, user.province, user.country]
    .filter(Boolean)
    .join(", ");
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=0D8ABC&color=fff`;
  const avatarUrl = user.avatarUrl || avatarFallback;

  const tagsCount = user.tags?.length ?? 0;
  const sessions = user.sessionsCount ?? 0;
  const unread = user.unread ?? 0;
  const alerts = user.alert ?? 0;
  const webSessions = user.web?.sessionsCount ?? 0;
  const mobileSessions = user.mobile?.sessionsCount ?? 0;
  const isOnline = Boolean(value.online);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      {/* Header */}
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.currentTarget;
              img.onerror = null;
              img.src = avatarFallback;
            }}
          />
        </div>
        <div className="ml-4 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {displayName}
          </h2>
          {userType && (
            <span className="mt-1 inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
              {userType}
            </span>
          )}
        </div>
        <div className="ml-auto">
          {isOnline ? (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={16}
              aria-label="Online"
            />
          ) : (
            <LucideReact.XCircle
              className="text-gray-400"
              size={16}
              aria-label="Offline"
            />
          )}
        </div>
      </div>

      {/* Contact & Meta */}
      <div className="mt-4 space-y-2 text-gray-700">
        {user.email && (
          <div className="flex items-center">
            <LucideReact.Mail
              size={16}
              className="text-gray-400"
              aria-label="Email"
            />
            <span className="ml-2 truncate">{user.email}</span>
          </div>
        )}
        {user.mobileNumber && (
          <div className="flex items-center">
            <LucideReact.Phone
              size={16}
              className="text-gray-400"
              aria-label="Phone"
            />
            <span className="ml-2 truncate">{user.mobileNumber}</span>
          </div>
        )}
        {formattedLastSeen && (
          <div className="flex items-center">
            <LucideReact.Clock
              size={16}
              className="text-gray-400"
              aria-label="Last seen"
            />
            <span className="ml-2">{formattedLastSeen}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center">
            <LucideReact.MapPin
              size={16}
              className="text-gray-400"
              aria-label="Location"
            />
            <span className="ml-2 truncate">{location}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 flex flex-wrap gap-4 text-gray-700">
        <div className="flex items-center">
          <LucideReact.Tag
            size={16}
            className="text-gray-400"
            aria-label="Tags"
          />
          <span className="ml-2">{tagsCount} tags</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Users
            size={16}
            className="text-gray-400"
            aria-label="Sessions"
          />
          <span className="ml-2">{sessions} sessions</span>
        </div>
        {unread > 0 && (
          <div className="flex items-center">
            <LucideReact.MessageCircle
              size={16}
              className="text-gray-400"
              aria-label="Unread messages"
            />
            <span className="ml-2">{unread} unread</span>
          </div>
        )}
        {alerts > 0 && (
          <div className="flex items-center">
            <LucideReact.AlertOctagon
              size={16}
              className="text-gray-400"
              aria-label="Alerts"
            />
            <span className="ml-2">{alerts} alerts</span>
          </div>
        )}
        {webSessions > 0 && (
          <div className="flex items-center">
            <LucideReact.Globe
              size={16}
              className="text-gray-400"
              aria-label="Web sessions"
            />
            <span className="ml-2">{webSessions} web</span>
          </div>
        )}
        {mobileSessions > 0 && (
          <div className="flex items-center">
            <LucideReact.Smartphone
              size={16}
              className="text-gray-400"
              aria-label="Mobile sessions"
            />
            <span className="ml-2">{mobileSessions} mobile</span>
          </div>
        )}
      </div>
    </div>
  );
}
