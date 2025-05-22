import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace desk {
    export type UserView = {
      user?: AutoViewInputSubTypes.user.User;
      online?: AutoViewInputSubTypes.Online;
    };
  }
  export namespace user {
    export type User = {
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
    };
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
export type AutoViewInput = AutoViewInputSubTypes.desk.UserView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { user, online } = value;
  const [imgError, setImgError] = React.useState<boolean>(false);

  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow flex items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mr-2" />
        <span>No user data available</span>
      </div>
    );
  }

  const displayName = user.name ?? "Unknown User";
  const avatarUrl = user.avatarUrl;
  const finalAvatar =
    !imgError && avatarUrl
      ? avatarUrl
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=0D8ABC&color=fff`;
  const isOnline = Boolean(online && online.id);
  const statusText = isOnline ? "Online" : "Offline";
  const statusColor = isOnline ? "text-green-500" : "text-gray-400";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-xs mx-auto">
      <div className="flex items-center">
        <div className="relative w-12 h-12 flex-shrink-0">
          <img
            src={finalAvatar}
            alt={displayName}
            className="w-12 h-12 rounded-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
        <div className="ml-4 flex-1">
          <h2 className="text-lg font-medium text-gray-900 truncate">
            {displayName}
          </h2>
          <div className="flex items-center text-sm text-gray-500">
            <LucideReact.Circle className={statusColor} size={12} />
            <span className="ml-1">{statusText}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        {user.email && (
          <div className="flex items-center text-gray-600">
            <LucideReact.Mail className="text-gray-400" size={16} />
            <span className="ml-2 truncate">{user.email}</span>
          </div>
        )}
        {user.mobileNumber && (
          <div className="flex items-center text-gray-600">
            <LucideReact.Phone className="text-gray-400" size={16} />
            <span className="ml-2 truncate">{user.mobileNumber}</span>
          </div>
        )}
        {(user.alert ?? 0) > 0 && (
          <div className="flex items-center text-gray-600">
            <LucideReact.AlertTriangle className="text-amber-500" size={16} />
            <span className="ml-2">{user.alert}</span>
          </div>
        )}
        {(user.unread ?? 0) > 0 && (
          <div className="flex items-center text-gray-600">
            <LucideReact.MessageCircle className="text-blue-500" size={16} />
            <span className="ml-2">{user.unread}</span>
          </div>
        )}
      </div>

      {user.tags && user.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {user.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
          {user.tags.length > 5 && (
            <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">
              +{user.tags.length - 5} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
