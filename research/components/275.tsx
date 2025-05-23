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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  // Fallback when no user data is provided
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" aria-label="No data" />
        <span>No user information available</span>
      </div>
    );
  }

  // Derive display name
  const displayName = user.name ?? user.unifiedId ?? "Unknown User";
  // Map user type to human-readable string
  const typeMap: Record<string, string> = {
    member: "Member",
    lead: "Lead",
    unified: "Unified",
  };
  const userType = user.type ? typeMap[user.type] : undefined;
  // Online status
  const isOnline = Boolean(value.online && value.online.id);
  // Format dates
  const formatDate = (ms?: number) =>
    ms
      ? new Date(ms).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "N/A";
  const lastSeen = isOnline ? "Online" : formatDate(user.lastSeenAt);
  // Avatar handling
  const [avatarError, setAvatarError] = React.useState(false);
  const avatarSrc =
    !avatarError && user.avatarUrl
      ? user.avatarUrl
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-xs w-full p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
      {/* Avatar */}
      <div className="w-24 h-24 mb-4">
        <img
          src={avatarSrc}
          alt={displayName}
          className="w-full h-full rounded-full object-cover"
          onError={() => setAvatarError(true)}
        />
      </div>
      {/* Name and Type */}
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
        <LucideReact.User size={20} className="text-gray-700" aria-label="User" />
        {displayName}
      </h2>
      {userType && (
        <span className="mt-1 text-sm text-gray-500">{userType}</span>
      )}
      {/* Online Status */}
      <div className="mt-2 flex items-center text-sm text-gray-600">
        {isOnline ? (
          <LucideReact.Circle
            className="text-green-500 mr-1"
            size={12}
            strokeWidth={2}
            aria-label="Online"
          />
        ) : (
          <LucideReact.Circle
            className="text-gray-400 mr-1"
            size={12}
            strokeWidth={2}
            aria-label="Offline"
          />
        )}
        <span>{lastSeen}</span>
      </div>
      {/* Contact & Qualifications */}
      <dl className="mt-4 w-full space-y-2 text-sm text-gray-700">
        {user.email && (
          <div className="flex items-center gap-2">
            <LucideReact.Mail size={16} className="text-gray-400" aria-label="Email" />
            <span className="flex-1 truncate">{user.email}</span>
            {user.emailQualified ? (
              <LucideReact.CheckCircle
                size={16}
                className="text-green-500"
                aria-label="Email verified"
              />
            ) : (
              <LucideReact.XCircle
                size={16}
                className="text-red-400"
                aria-label="Email not verified"
              />
            )}
          </div>
        )}
        {user.mobileNumber && (
          <div className="flex items-center gap-2">
            <LucideReact.Phone size={16} className="text-gray-400" aria-label="Phone" />
            <span className="flex-1 truncate">{user.mobileNumber}</span>
            {user.mobileNumberQualified ? (
              <LucideReact.CheckCircle
                size={16}
                className="text-green-500"
                aria-label="Mobile verified"
              />
            ) : (
              <LucideReact.XCircle
                size={16}
                className="text-red-400"
                aria-label="Mobile not verified"
              />
            )}
          </div>
        )}
        {typeof user.unread === "number" && (
          <div className="flex items-center gap-2">
            <LucideReact.MessageSquare
              size={16}
              className="text-gray-400"
              aria-label="Messages"
            />
            <span>{user.unread} unread messages</span>
          </div>
        )}
        {typeof user.alert === "number" && user.alert > 0 && (
          <div className="flex items-center gap-2">
            <LucideReact.AlertCircle
              size={16}
              className="text-amber-500"
              aria-label="Alerts"
            />
            <span>{user.alert} alerts</span>
          </div>
        )}
      </dl>
      {/* Tags */}
      {user.tags && user.tags.length > 0 && (
        <div className="mt-4 w-full">
          <h3 className="text-sm font-medium text-gray-800 mb-1">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {user.tags.slice(0, 10).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
              >
                <LucideReact.Tag size={12} className="text-blue-600" aria-label="Tag" />
                {tag}
              </span>
            ))}
            {user.tags.length > 10 && (
              <span className="text-xs text-gray-500">
                +{user.tags.length - 10} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
