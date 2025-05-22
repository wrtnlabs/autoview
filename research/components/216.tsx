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
  // Helper: format relative time
  function getTimeAgo(ts: number): string {
    const date = new Date(ts);
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  if (!user) {
    // 3. Return placeholder if no user data
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mx-auto" />
        <p className="mt-2 text-sm">No user data available.</p>
      </div>
    );
  }

  const name = user.name?.trim() || "Unknown User";
  const email = user.email;
  const cityCountry = [user.city, user.country].filter(Boolean).join(", ");
  const sessionsCount = user.sessionsCount;
  const isOnline = Boolean(value.online && Object.keys(value.online).length);
  const lastSeen = user.lastSeenAt ? getTimeAgo(user.lastSeenAt) : null;
  const tags = Array.isArray(user.tags) ? user.tags : [];
  const displayedTags = tags.slice(0, 3);
  const remainingTagCount = tags.length - displayedTags.length;

  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name,
  )}&background=0D8ABC&color=fff`;
  const imgSrc = user.avatarUrl || placeholderAvatar;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={imgSrc}
          alt={name}
          onError={(e) => {
            const img = e.currentTarget;
            img.onerror = null;
            img.src = placeholderAvatar;
          }}
          className="w-12 h-12 rounded-full object-cover bg-gray-100"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {name}
          </h2>
          {email && (
            <div className="mt-1 flex items-center text-gray-500 text-sm truncate">
              <LucideReact.Mail size={16} />
              <span className="ml-1 truncate">{email}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        {cityCountry && (
          <div className="flex items-center truncate">
            <LucideReact.MapPin size={16} />
            <span className="ml-1 truncate">{cityCountry}</span>
          </div>
        )}
        {typeof sessionsCount === "number" && (
          <div className="flex items-center">
            <LucideReact.Users size={16} className="text-gray-500" />
            <span className="ml-1">{sessionsCount} sessions</span>
          </div>
        )}
        <div className="flex items-center">
          {isOnline ? (
            <>
              <LucideReact.CheckCircle className="text-green-500" size={16} />
              <span className="ml-1 text-green-600">Online Now</span>
            </>
          ) : (
            <>
              <LucideReact.Clock className="text-gray-400" size={16} />
              <span className="ml-1">Last seen {lastSeen || "—"}</span>
            </>
          )}
        </div>
      </div>

      {displayedTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1">
          {displayedTags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {remainingTagCount > 0 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
              +{remainingTagCount} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
