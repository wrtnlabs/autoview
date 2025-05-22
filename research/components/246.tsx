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
  const manager = value.manager;
  const online = value.online;
  const isOnline = Boolean(online?.id);

  // Fallback state for avatar loading
  const [imgError, setImgError] = React.useState(false);

  if (!manager) {
    return (
      <div className="p-4 flex items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No Manager Assigned</span>
      </div>
    );
  }

  // Avatar source selection
  const encodedName = encodeURIComponent(manager.name);
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodedName}&background=0D8ABC&color=fff`;
  const avatarSrc =
    !imgError && manager.avatarUrl ? manager.avatarUrl : placeholderAvatar;

  // Contact info
  const email =
    manager.showEmailToFront && manager.email ? manager.email : undefined;
  const phone =
    manager.showMobileNumberToFront &&
    (manager.mobileNumberForFront || manager.mobileNumber)
      ? manager.mobileNumberForFront || manager.mobileNumber
      : undefined;

  // Joined date formatting
  const joinedDate =
    manager.createdAt != null
      ? new Date(manager.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;

  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <div>
          <img
            src={avatarSrc}
            alt={`${manager.name} avatar`}
            onError={() => setImgError(true)}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {manager.name}
          </h2>
          {manager.showDescriptionToFront && manager.description && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {manager.description}
            </p>
          )}
          {joinedDate && (
            <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
              <LucideReact.Calendar size={14} />
              <span>Joined {joinedDate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {email && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <LucideReact.Mail size={16} className="text-gray-400" />
            <span className="truncate">{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <LucideReact.Phone size={16} className="text-gray-400" />
            <span className="truncate">{phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm mt-1">
          {isOnline ? (
            <>
              <LucideReact.CheckCircle className="text-green-500" size={16} />
              <span className="text-green-600">Online</span>
            </>
          ) : (
            <>
              <LucideReact.XCircle className="text-red-500" size={16} />
              <span className="text-red-600">Offline</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
