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
  const online = value.online;
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No user data available</span>
      </div>
    );
  }
  const displayName = user.name?.trim() || "Unknown User";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = user.avatarUrl?.trim() || avatarFallback;

  const createdDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const lastSeenDate =
    !online && user.lastSeenAt
      ? new Date(user.lastSeenAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Avatar and Name + Online Status */}
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            src={avatarSrc}
            alt={displayName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover bg-gray-100"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.onerror = null;
              img.src = avatarFallback;
            }}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {displayName}
          </h2>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            {online ? (
              <LucideReact.UserCheck
                className="text-green-500"
                size={16}
                aria-label="Online"
              />
            ) : (
              <LucideReact.UserX
                className="text-gray-400"
                size={16}
                aria-label="Offline"
              />
            )}
            <span>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
        {user.email && (
          <div className="flex items-center space-x-2 truncate">
            <LucideReact.Mail size={16} className="text-gray-400" />
            <span className="truncate">{user.email}</span>
          </div>
        )}
        {user.mobileNumber && (
          <div className="flex items-center space-x-2 truncate">
            <LucideReact.Phone size={16} className="text-gray-400" />
            <span className="truncate">{user.mobileNumber}</span>
          </div>
        )}
        {user.type && (
          <div className="flex items-center space-x-2 capitalize">
            <LucideReact.Tag size={16} className="text-blue-500" />
            <span>{user.type}</span>
          </div>
        )}
        {online?.channelId && (
          <div className="flex items-center space-x-2 truncate">
            <LucideReact.Link size={16} className="text-gray-400" />
            <span className="truncate">{online.channelId}</span>
          </div>
        )}
        {user.language && (
          <div className="flex items-center space-x-2 capitalize">
            <LucideReact.Globe size={16} className="text-gray-400" />
            <span>{user.language}</span>
          </div>
        )}
        {createdDate && (
          <div className="flex items-center space-x-2">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Joined {createdDate}</span>
          </div>
        )}
        {lastSeenDate && (
          <div className="flex items-center space-x-2">
            <LucideReact.Clock size={16} className="text-gray-400" />
            <span>Last seen {lastSeenDate}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {user.tags && user.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {user.tags.slice(0, 5).map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
          {user.tags.length > 5 && (
            <span className="text-gray-500 text-xs">
              +{user.tags.length - 5} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
