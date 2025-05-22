import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace desk {
    export type ManagersView = {
      managers?: AutoViewInputSubTypes.Manager[];
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
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ManagersView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived constants
  const managers = value.managers ?? [];

  // 2. Handle empty state
  if (managers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-lg">No managers available</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {managers.map((manager, index) => {
        // Derive avatar source with fallback to initials-based avatar
        const initialsAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          manager.name,
        )}&background=0D8ABC&color=fff`;
        const avatarSrc = manager.avatarUrl ?? initialsAvatar;

        // Determine which contact fields to show
        const showEmail = manager.showEmailToFront && manager.email;
        const showMobile =
          manager.showMobileNumberToFront && manager.mobileNumberForFront;

        return (
          <div
            key={index}
            className="flex items-start p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* Avatar */}
            <img
              src={avatarSrc}
              alt={`${manager.name} avatar`}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              onError={(e) => {
                e.currentTarget.src = initialsAvatar;
              }}
            />

            {/* Manager Info */}
            <div className="ml-4 flex-1">
              {/* Name */}
              <h3 className="text-base font-semibold text-gray-900 truncate">
                {manager.name}
              </h3>

              {/* Description (if allowed) */}
              {manager.showDescriptionToFront && manager.description ? (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {manager.description}
                </p>
              ) : null}

              {/* Contact Info */}
              {(showEmail || showMobile) && (
                <div className="mt-2 flex flex-col space-y-1 text-sm text-gray-500">
                  {showEmail && (
                    <div className="flex items-center gap-2">
                      <LucideReact.Mail size={16} className="text-gray-400" />
                      <span className="truncate">{manager.email}</span>
                    </div>
                  )}
                  {showMobile && (
                    <div className="flex items-center gap-2">
                      <LucideReact.Phone size={16} className="text-gray-400" />
                      <span className="truncate">
                        {manager.mobileNumberForFront}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
