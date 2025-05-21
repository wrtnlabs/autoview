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



// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const user = value.user;
  if (!user) {
    return (
      <div className="p-4 text-center text-gray-500">
        No user information available.
      </div>
    );
  }

  const displayName = user.name?.trim() || 'Unnamed User';
  const role = user.type
    ? user.type.charAt(0).toUpperCase() + user.type.slice(1)
    : undefined;
  const email = user.email;
  const phone = user.mobileNumber;
  const isOnline = Boolean(value.online);
  const lastSeen = user.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : undefined;
  const initials = displayName
    .split(' ')
    .map((w) => w[0] || '')
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow flex items-center space-x-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
            {initials}
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h2 className="text-gray-900 text-lg font-medium truncate">
            {displayName}
          </h2>
          {role && (
            <span className="px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-100 rounded">
              {role}
            </span>
          )}
        </div>

        {(email || phone) && (
          <div className="mt-1 flex flex-wrap items-center space-x-4 text-gray-500 text-sm">
            {email && <div className="truncate">{email}</div>}
            {phone && <div className="truncate">{phone}</div>}
          </div>
        )}

        <div className="mt-2 text-sm">
          {isOnline ? (
            <span className="flex items-center text-green-600 font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Online
            </span>
          ) : lastSeen ? (
            <span className="text-gray-500">Last seen: {lastSeen}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
