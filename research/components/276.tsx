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
  // 1. Define data aggregation/transformation
  const user = value.user;
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No user data available
      </div>
    );
  }

  const fullName = user.name?.trim() || "Unnamed User";
  const userType = user.type
    ? user.type.charAt(0).toUpperCase() + user.type.slice(1)
    : undefined;

  const isOnline = !!value.online;
  const statusText = isOnline
    ? "Online"
    : user.lastSeenAt
    ? `Last seen ${new Date(user.lastSeenAt).toLocaleString()}`
    : "Offline";
  const statusColor = isOnline ? "text-green-500" : "text-gray-400";

  const location = [user.city, user.country].filter(Boolean).join(", ");
  const language = user.language?.toUpperCase();
  const sessions =
    user.sessionsCount !== undefined ? `${user.sessionsCount}` : undefined;
  const tags = user.tags || [];

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start">
      <div className="flex-shrink-0 mb-4 sm:mb-0">
        <img
          src={
            user.avatarUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              fullName,
            )}&background=gray&color=white`
          }
          alt={fullName}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
        />
      </div>
      <div className="flex-grow sm:ml-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 truncate">
            {fullName}
          </h2>
          <span
            className={`mt-2 sm:mt-0 ${statusColor} text-sm flex items-center`}
          >
            <span
              className={`inline-block w-2 h-2 rounded-full mr-1 ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            {statusText}
          </span>
        </div>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
          {userType && <li>Type: {userType}</li>}
          {user.email && <li>Email: {user.email}</li>}
          {user.mobileNumber && <li>Mobile: {user.mobileNumber}</li>}
          {location && <li>Location: {location}</li>}
          {language && <li>Language: {language}</li>}
          {sessions && <li>Sessions: {sessions}</li>}
        </ul>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap">
            {tags.slice(0, 10).map((tag, idx) => (
              <span
                key={idx}
                className="mr-2 mb-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full truncate"
              >
                {tag}
              </span>
            ))}
            {tags.length > 10 && (
              <span className="mb-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                +{tags.length - 10} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
