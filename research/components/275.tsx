import { tags } from "typia";
import React from "react";
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
  const user = value.user;
  const isOnline = Boolean(value.online);
  const displayName = user?.name?.trim() || "Unknown User";
  const initials = displayName
    .split(" ")
    .filter((s) => s.length > 0)
    .map((s) => s.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
  const userType = user?.type
    ? user.type.charAt(0).toUpperCase() + user.type.slice(1)
    : undefined;
  const email = user?.email;
  const phone = user?.mobileNumber;
  const location = [user?.city, user?.country].filter(Boolean).join(", ");
  const createdAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;
  const lastSeen = user?.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : undefined;
  const sessions = user?.sessionsCount;
  const alertCount = user?.alert;
  const unreadCount = user?.unread;
  const tags = user?.tags || [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No user data available.
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={displayName}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
            <span className="text-gray-600 font-medium">{initials}</span>
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {displayName}
            <span
              className={`inline-block ml-2 w-2 h-2 rounded-full ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
              title={isOnline ? "Online" : "Offline"}
            />
          </h2>
          {userType && (
            <p className="text-sm text-gray-500">{userType}</p>
          )}
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        {email && (
          <div>
            <dt className="font-medium">Email</dt>
            <dd className="truncate">{email}</dd>
          </div>
        )}
        {phone && (
          <div>
            <dt className="font-medium">Phone</dt>
            <dd className="truncate">{phone}</dd>
          </div>
        )}
        {location && (
          <div>
            <dt className="font-medium">Location</dt>
            <dd className="truncate">{location}</dd>
          </div>
        )}
        {sessions !== undefined && (
          <div>
            <dt className="font-medium">Sessions</dt>
            <dd>{sessions}</dd>
          </div>
        )}
        {alertCount !== undefined && (
          <div>
            <dt className="font-medium">Alerts</dt>
            <dd>{alertCount}</dd>
          </div>
        )}
        {unreadCount !== undefined && (
          <div>
            <dt className="font-medium">Unread</dt>
            <dd>{unreadCount}</dd>
          </div>
        )}
        {createdAt && (
          <div>
            <dt className="font-medium">Joined</dt>
            <dd>{createdAt}</dd>
          </div>
        )}
        {!isOnline && lastSeen && (
          <div>
            <dt className="font-medium">Last Seen</dt>
            <dd>{lastSeen}</dd>
          </div>
        )}
      </dl>

      {tags.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 5).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {tag}
              </span>
            ))}
            {tags.length > 5 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                +{tags.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
}
