import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4ManagerView = {
          manager?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager;
          online?: AutoViewInputSubTypes.legacy.v4.LegacyV4Online;
        };
      }
    }
    export namespace v4 {
      export type LegacyV4Manager = {
        id?: string;
        channelId?: string;
        accountId?: string;
        name: string;
        description?: string;
        showDescriptionToFront?: boolean;
        nameDescI18nMap?: {
          [key: string]: AutoViewInputSubTypes.NameDesc;
        };
        profile?: {
          [key: string]: {};
        };
        email: string;
        showEmailToFront?: boolean;
        mobileNumber?: string & tags.Default<"+18004424000">;
        showMobileNumberToFront?: boolean;
        role: "owner" | "member";
        removed?: boolean;
        createdAt?: number;
        displayAsChannel?: boolean;
        defaultGroupWatch?: "all" | "info" | "none";
        defaultDirectChatWatch?: "all" | "info" | "none";
        defaultUserChatWatch?: "all" | "info" | "none";
        operatorScore?: number;
        touchScore?: number;
        avatar?: AutoViewInputSubTypes.TinyFile;
        operatorEmailReminder?: boolean;
        operator?: boolean;
        statusEmoji?: string;
        statusText?: string;
        statusClearAt?: number;
        managerId?: string;
        avatarUrl?: string;
        emailForFront?: string;
        mobileNumberForFront?: string & tags.Default<"+18004424000">;
      };
      export type LegacyV4Online = {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
      };
    }
  }
  export type NameDesc = {
    name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
    description?: string;
  };
  export type TinyFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32">;
    height?: number & tags.Type<"int32">;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4ManagerView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const manager = value.manager;
  const online = value.online;
  // If there's no manager data, show placeholder
  if (!manager) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No manager data available</span>
      </div>
    );
  }

  // Derived values
  const isOnline = Boolean(online?.id);
  const roleLabel =
    manager.role.charAt(0).toUpperCase() + manager.role.slice(1);
  const roleBadgeClasses =
    manager.role === "owner"
      ? "bg-indigo-100 text-indigo-800"
      : "bg-gray-100 text-gray-800";

  const email = manager.showEmailToFront
    ? (manager.emailForFront ?? manager.email)
    : undefined;
  const phone = manager.showMobileNumberToFront
    ? (manager.mobileNumberForFront ?? manager.mobileNumber)
    : undefined;

  const joinedDate = manager.createdAt
    ? new Date(manager.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;

  // Avatar handling
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    manager.name,
  )}&background=random`;
  const initialAvatar = manager.avatarUrl || placeholderAvatar;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center gap-4">
      <div className="relative flex-shrink-0">
        <img
          src={initialAvatar}
          alt={`${manager.name} avatar`}
          className="w-16 h-16 rounded-full object-cover bg-gray-100"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholderAvatar;
          }}
        />
        <span
          aria-label={isOnline ? "Online" : "Offline"}
          className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white ${
            isOnline ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      </div>
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {manager.name}
          </h2>
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded ${roleBadgeClasses}`}
          >
            {roleLabel}
          </span>
        </div>
        {manager.description && manager.showDescriptionToFront && (
          <p className="text-sm text-gray-600 line-clamp-2 break-words">
            {manager.description}
          </p>
        )}
        {manager.statusText && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            {manager.statusEmoji && <span>{manager.statusEmoji}</span>}
            <span>{manager.statusText}</span>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
          {email && (
            <div className="flex items-center gap-1 truncate">
              <LucideReact.Mail size={16} className="text-gray-400" />
              <span className="truncate">{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-1 truncate">
              <LucideReact.Phone size={16} className="text-gray-400" />
              <span className="truncate">{phone}</span>
            </div>
          )}
          {joinedDate && (
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <time dateTime={new Date(manager.createdAt!).toISOString()}>
                {joinedDate}
              </time>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
