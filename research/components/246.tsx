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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Extract manager info
  const manager = value.manager;
  if (!manager) {
    return (
      <div className="p-4 bg-white rounded-lg shadow flex items-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mr-2" aria-hidden />
        <span>No manager data available</span>
      </div>
    );
  }

  // Destructure relevant fields
  const {
    name,
    description,
    showDescriptionToFront,
    email,
    showEmailToFront,
    mobileNumber,
    showMobileNumberToFront,
    avatarUrl,
    updatedAt,
  } = manager;

  // Avatar handling
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name,
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = avatarUrl ?? avatarFallback;

  // Format last update date
  const formattedUpdated = updatedAt
    ? new Date(updatedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  // Online status
  const isOnline = Boolean(value.online && value.online.id);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          src={avatarSrc}
          alt={name}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = avatarFallback;
          }}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
        {description && showDescriptionToFront && (
          <p className="mt-1 text-gray-600 text-sm line-clamp-2">{description}</p>
        )}

        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
          {showEmailToFront && email && (
            <div className="flex items-center">
              <LucideReact.Mail size={16} className="mr-1 text-gray-400" aria-hidden />
              <span className="truncate">{email}</span>
            </div>
          )}
          {showMobileNumberToFront && mobileNumber && (
            <div className="flex items-center">
              <LucideReact.Phone size={16} className="mr-1 text-gray-400" aria-hidden />
              <span>{mobileNumber}</span>
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center text-sm">
          {isOnline ? (
            <>
              <LucideReact.Circle className="text-green-500 mr-1" size={10} aria-label="Online" />
              <span className="text-green-600">Online</span>
            </>
          ) : (
            <>
              <LucideReact.Circle className="text-gray-400 mr-1" size={10} aria-label="Offline" />
              <span className="text-gray-500">Offline</span>
            </>
          )}
        </div>

        {formattedUpdated && (
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <LucideReact.Calendar size={14} className="mr-1" aria-hidden />
            <span>Updated: {formattedUpdated}</span>
          </div>
        )}
      </div>
    </div>
  );
}
