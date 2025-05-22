import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace desk {
    export type ManagerView = {
      manager?: AutoViewInputSubTypes.Manager;
      online?: AutoViewInputSubTypes.Online;
    };
  }
  export type Manager = {
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
    chatAlertSound?:
      | "none"
      | "drop"
      | "woody"
      | "bounce"
      | "crystal"
      | "xylo"
      | "quickKnock"
      | "candy"
      | "shine";
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
  };
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
  export type Online = {
    channelId?: string;
    personType?: string;
    personId?: string;
    id?: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ManagerView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive core values
  const manager = value.manager;
  const isOnline = Boolean(value.online?.id);

  if (!manager) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500 italic">
        No manager information available.
      </div>
    );
  }

  const displayName = manager.name;
  const avatarSrc =
    manager.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName,
    )}&background=0D8ABC&color=fff`;
  const description =
    manager.showDescriptionToFront && manager.description
      ? manager.description
      : null;
  const email =
    manager.showEmailToFront && manager.email ? manager.email : null;
  const phone =
    manager.showMobileNumberToFront && manager.mobileNumber
      ? manager.mobileNumber
      : null;

  // 2. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-start space-x-4 max-w-md w-full">
      {/* Avatar & Online Indicator */}
      <div className="flex-shrink-0">
        <div className="relative">
          <img
            src={avatarSrc}
            alt={displayName}
            className="h-16 w-16 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  displayName,
                )}&background=0D8ABC&color=fff`;
            }}
          />
          <span
            className={
              "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white " +
              (isOnline ? "bg-green-500" : "bg-gray-400")
            }
            title={isOnline ? "Online" : "Offline"}
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900">{displayName}</h2>
        {description && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        )}

        {(email || phone) && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
            {email && (
              <div className="flex items-center space-x-1">
                <LucideReact.Mail className="text-gray-400" size={16} />
                <span className="truncate">{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center space-x-1">
                <LucideReact.Phone className="text-gray-400" size={16} />
                <span className="truncate">{phone}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
