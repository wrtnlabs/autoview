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
  const { user, online } = value;
  const displayName = user?.name?.trim() || "Unknown User";
  const userType = user?.type
    ? user.type.charAt(0).toUpperCase() + user.type.slice(1)
    : "User";
  const avatarName = encodeURIComponent(displayName);
  const defaultAvatar = `https://ui-avatars.com/api/?name=${avatarName}&background=0D8ABC&color=fff`;
  const avatarSrc = user?.avatarUrl || defaultAvatar;
  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = defaultAvatar;
  };
  const formatDate = (ts?: number) =>
    ts ? new Date(ts).toLocaleString() : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm text-center text-gray-500">
        <LucideReact.AlertCircle
          size={32}
          className="mx-auto mb-2 text-gray-400"
        />
        <p>No user data available</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full">
      <div className="flex items-center gap-4">
        <img
          src={avatarSrc}
          onError={handleAvatarError}
          alt={displayName}
          className="w-16 h-16 rounded-full object-cover bg-gray-100"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {displayName}
          </h2>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
            {userType}
          </span>
        </div>
        <div className="flex items-center">
          {online ? (
            <>
              <LucideReact.Circle
                size={10}
                className="text-green-500"
              />
              <span className="ml-1 text-sm text-green-600">Online</span>
            </>
          ) : (
            <>
              <LucideReact.Circle
                size={10}
                className="text-gray-400"
              />
              <span className="ml-1 text-sm text-gray-500">Offline</span>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        {user.email && (
          <div className="flex items-center gap-1 truncate">
            <LucideReact.Mail size={16} className="text-gray-400" />
            <span className="truncate">{user.email}</span>
          </div>
        )}
        {user.mobileNumber && (
          <div className="flex items-center gap-1">
            <LucideReact.Phone size={16} className="text-gray-400" />
            <span>{user.mobileNumber}</span>
          </div>
        )}
        {user.city && user.country && (
          <div className="flex items-center gap-1">
            <LucideReact.MapPin size={16} className="text-gray-400" />
            <span>
              {user.city}, {user.country}
            </span>
          </div>
        )}
        {user.language && (
          <div className="flex items-center gap-1">
            <LucideReact.Globe size={16} className="text-gray-400" />
            <span>{user.language.toUpperCase()}</span>
          </div>
        )}
        {user.alert !== undefined && (
          <div className="flex items-center gap-1">
            <LucideReact.Bell
              size={16}
              className={user.alert > 0 ? "text-red-500" : "text-gray-400"}
            />
            <span>{user.alert}</span>
          </div>
        )}
        {user.unread !== undefined && (
          <div className="flex items-center gap-1">
            <LucideReact.MessageCircle
              size={16}
              className={user.unread > 0 ? "text-blue-500" : "text-gray-400"}
            />
            <span>{user.unread}</span>
          </div>
        )}
        {user.createdAt && (
          <div className="flex items-center gap-1 col-span-1 sm:col-span-2">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Joined {formatDate(user.createdAt)}</span>
          </div>
        )}
        {user.lastSeenAt && (
          <div className="flex items-center gap-1 col-span-1 sm:col-span-2">
            <LucideReact.Clock size={16} className="text-gray-400" />
            <span>Last seen {formatDate(user.lastSeenAt)}</span>
          </div>
        )}
      </div>

      {user.tags && user.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {user.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
