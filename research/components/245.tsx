import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export interface ManagerView {
            manager?: AutoViewInputSubTypes.Manager;
            online?: AutoViewInputSubTypes.Online;
        }
    }
    export interface Manager {
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
        email?: string;
        showEmailToFront?: boolean;
        mobileNumber?: string & tags.Default<"+18004424000">;
        showMobileNumberToFront?: boolean;
        roleId?: string;
        removed?: boolean;
        createdAt?: number;
        updatedAt?: number;
        removedAt?: number;
        displayAsChannel?: boolean;
        defaultGroupWatch?: "all" | "info" | "none";
        defaultDirectChatWatch?: "all" | "info" | "none";
        defaultUserChatWatch?: "all" | "info" | "none";
        chatAlertSound?: "none" | "drop" | "woody" | "bounce" | "crystal" | "xylo" | "quickKnock" | "candy" | "shine";
        meetAlertSound?: "cute" | "basic" | "gentle" | "marimba";
        showPrivateMessagePreview?: boolean;
        operatorScore?: number;
        touchScore?: number;
        avatar?: AutoViewInputSubTypes.TinyFile;
        operatorEmailReminder?: boolean;
        receiveUnassignedAlert?: boolean;
        receiveUnassignedChatAlert?: boolean;
        receiveUnassignedMeetAlert?: boolean;
        operator?: boolean;
        operatorStatusId?: string;
        defaultAllMentionImportant?: boolean;
        userMessageImportant?: boolean;
        assignableUserChatTypes?: ("sync" | "async")[] & tags.UniqueItems;
        autoAssignCapacity?: number & tags.Type<"uint32"> & tags.Maximum<100>;
        enableAutoAssignOnSync?: boolean;
        statusEmoji?: string;
        statusText?: string;
        statusClearAt?: number;
        doNotDisturb?: boolean;
        doNotDisturbClearAt?: number;
        accountDoNotDisturb?: boolean;
        accountDoNotDisturbClearAt?: number;
        enableReactedMessageIndex?: boolean;
        enableTeamMentionedMessageIndex?: boolean;
        operatorUpdatedAt?: number;
        pcInboxMeetAlert?: boolean;
        mobileInboxMeetAlert?: boolean;
        pcTeamChatMeetAlert?: boolean;
        mobileTeamChatMeetAlert?: boolean;
        managerId?: string;
        avatarUrl?: string;
        /**
         * @deprecated
        */
        meetOperator?: boolean;
        emailForFront?: string;
        mobileNumberForFront?: string & tags.Default<"+18004424000">;
    }
    export interface NameDesc {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    }
    export interface TinyFile {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    }
    export interface Online {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ManagerView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Prepare data and derived values
  const manager = value.manager;
  const isOnline = Boolean(value.online?.id);

  // Fallback avatar generation (initials-based)
  const defaultAvatar = manager
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        manager.name
      )}&background=0D8ABC&color=fff`
    : '';

  // Determine avatar source URL
  const avatarSrc = manager?.avatarUrl
    ? manager.avatarUrl
    : manager?.avatar
    ? `https://${manager.avatar.bucket}.s3.amazonaws.com/${manager.avatar.key}`
    : defaultAvatar;

  // 2. If there's no manager data, show an empty state
  if (!manager) {
    return (
      <div className="p-4 text-gray-500 flex items-center justify-center">
        <LucideReact.AlertCircle size={24} className="text-gray-400" />
        <span className="ml-2">No manager data available</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start">
      {/* Avatar */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={avatarSrc}
          alt={manager.name}
          className="w-full h-full object-cover rounded-full bg-gray-100"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = defaultAvatar;
          }}
        />
      </div>

      {/* Textual Details */}
      <div className="mt-4 sm:mt-0 sm:ml-4 flex-1">
        {/* Name & Online Status */}
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {manager.name}
          </h2>
          <LucideReact.Circle
            size={12}
            className={`ml-2 ${isOnline ? 'text-green-500' : 'text-gray-400'}`}
            aria-label={isOnline ? 'Online' : 'Offline'}
          />
        </div>

        {/* Description */}
        {manager.showDescriptionToFront && manager.description && (
          <p className="mt-2 text-gray-600 text-sm line-clamp-3">
            {manager.description}
          </p>
        )}

        {/* Contact Info */}
        <div className="mt-3 space-y-2 text-sm">
          {manager.showEmailToFront && manager.email && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Mail size={16} className="text-gray-400" />
              <span className="ml-2 truncate">{manager.email}</span>
            </div>
          )}
          {manager.showMobileNumberToFront && manager.mobileNumber && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Phone size={16} className="text-gray-400" />
              <span className="ml-2">{manager.mobileNumber}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
