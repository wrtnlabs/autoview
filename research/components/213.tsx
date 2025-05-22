import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
        tags?: string[] &
          tags.MinItems<0> &
          tags.MaxItems<10> &
          tags.UniqueItems;
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
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4UserView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const online = value.online;
  const displayName =
    user?.name || user?.unifiedId || user?.userId || user?.id || "Unknown User";

  const avatarSrc =
    user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`;
  };

  const formattedLastSeen = user?.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  const location =
    user?.city && user?.country
      ? `${user.city}, ${user.country}`
      : user?.city || user?.country || null;

  const tags = user?.tags && user.tags.length > 0 ? user.tags : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!user && !online) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No user data available</span>
      </div>
    );
  }

  return (
    <div className="max-w-xs w-full bg-white shadow-md rounded-lg p-4 mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 mb-3">
          <img
            src={avatarSrc}
            alt={displayName}
            onError={handleImageError}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {displayName}
        </h2>
        {user?.member && (
          <div className="flex items-center mt-1 text-blue-500 text-sm">
            <LucideReact.BadgeCheck size={16} />
            <span className="ml-1">Member</span>
          </div>
        )}
        {/* Status */}
        <div className="flex items-center mt-2 text-sm text-gray-600">
          {online?.id ? (
            <>
              <LucideReact.CheckCircle className="text-green-500" size={16} />
              <span className="ml-1">Online</span>
            </>
          ) : formattedLastSeen ? (
            <>
              <LucideReact.Clock className="text-gray-400" size={16} />
              <span className="ml-1">Last seen: {formattedLastSeen}</span>
            </>
          ) : (
            <span className="italic text-gray-400">Offline</span>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-gray-700 text-sm">
        {user?.email && (
          <div className="flex items-center">
            <LucideReact.Mail className="text-gray-400" size={16} />
            <span className="ml-2 truncate">{user.email}</span>
          </div>
        )}
        {user?.mobileNumber && (
          <div className="flex items-center">
            <LucideReact.Phone className="text-gray-400" size={16} />
            <span className="ml-2 truncate">{user.mobileNumber}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center">
            <LucideReact.MapPin className="text-gray-400" size={16} />
            <span className="ml-2 truncate">{location}</span>
          </div>
        )}
        {typeof user?.sessionsCount === "number" && (
          <div className="flex items-center">
            <LucideReact.Users className="text-gray-400" size={16} />
            <span className="ml-2">Sessions: {user.sessionsCount}</span>
          </div>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full truncate"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
