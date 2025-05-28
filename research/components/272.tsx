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



// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and derived values
  const user = value.user;
  const online = value.online;

  // Fallback when no user data is provided
  if (!user) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mr-2" />
        <span>No user data available</span>
      </div>
    );
  }

  // Derive display name
  const displayName = user.name?.trim() || "Unknown User";

  // Map user.type to a human-readable label
  const statusMap: Record<string, string> = {
    member: "Member",
    lead: "Lead",
    unified: "Unified",
  };
  const statusLabel = statusMap[user.type ?? "member"];

  // Avatar with fallback to initials-based placeholder
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = user.avatarUrl || avatarPlaceholder;

  // Online status determination
  const isOnline = Boolean(online?.id);

  // Format last seen timestamp if available
  const formattedLastSeen = user.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleString()
    : null;

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-4 flex flex-col items-start md:flex-row md:items-center gap-4">
      <img
        src={avatarSrc}
        alt={displayName}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.onerror = null;
          img.src = avatarPlaceholder;
        }}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 flex flex-col w-full gap-2">
        {/* Header: Name, Type, and Online Status */}
        <div className="flex items-center justify-between w-full">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {displayName}
            </h2>
            <span className="text-sm text-gray-500 capitalize">
              {statusLabel}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Circle
              size={12}
              color={isOnline ? "#10B981" : "#9CA3AF"}
            />
            <span className="text-sm text-gray-600">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-1">
          {user.email && (
            <div className="flex items-center gap-2 text-gray-700">
              <LucideReact.Mail size={16} className="text-gray-400" />
              <span className="text-sm truncate">{user.email}</span>
            </div>
          )}
          {user.mobileNumber && (
            <div className="flex items-center gap-2 text-gray-700">
              <LucideReact.Phone size={16} className="text-gray-400" />
              <span className="text-sm truncate">{user.mobileNumber}</span>
            </div>
          )}
        </div>

        {/* Unread messages and alert counts */}
        <div className="flex items-center gap-4 mt-2">
          {typeof user.unread === "number" && (
            <div className="flex items-center gap-1 text-gray-700">
              <LucideReact.MessageSquare
                size={16}
                className="text-blue-500"
              />
              <span className="text-sm">{user.unread}</span>
            </div>
          )}
          {typeof user.alert === "number" && (
            <div className="flex items-center gap-1 text-gray-700">
              <LucideReact.AlertCircle
                size={16}
                className="text-red-500"
              />
              <span className="text-sm">{user.alert}</span>
            </div>
          )}
        </div>

        {/* Last seen timestamp for offline users */}
        {!isOnline && formattedLastSeen && (
          <div className="flex items-center gap-1 mt-2 text-gray-600">
            <LucideReact.Calendar
              size={16}
              className="text-gray-400"
            />
            <span className="text-sm">Last seen: {formattedLastSeen}</span>
          </div>
        )}
      </div>
    </div>
  );
}
