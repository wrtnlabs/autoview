import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const manager = value.manager;
  if (!manager) {
    return (
      <div className="p-4 text-center text-gray-500">
        No manager information available.
      </div>
    );
  }

  // Derive display name
  const fullName: string = manager.name;

  // Determine avatar URL (prefers explicit URL, falls back to TinyFile S3 URL)
  const avatarFile = manager.avatar;
  const avatarUrl: string | undefined =
    manager.avatarUrl ||
    (avatarFile
      ? `https://${avatarFile.bucket}.s3.amazonaws.com/${avatarFile.key}`
      : undefined);

  // Description (only if allowed)
  const description: string | undefined =
    manager.showDescriptionToFront && manager.description
      ? manager.description
      : undefined;

  // Custom status (emoji + text)
  const customStatus: string | undefined =
    manager.statusEmoji && manager.statusText
      ? `${manager.statusEmoji} ${manager.statusText}`
      : undefined;

  // Online status
  const isOnline: boolean = Boolean(value.online);
  const statusLabel = isOnline ? "Online" : "Offline";
  const statusBg = isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500";
  const dotBg = isOnline ? "bg-green-500" : "bg-gray-400";

  // Contact info
  const email: string | undefined =
    manager.showEmailToFront && (manager.emailForFront || manager.email)
      ? manager.emailForFront || manager.email!
      : undefined;
  const mobile: string | undefined =
    manager.showMobileNumberToFront &&
    (manager.mobileNumberForFront || manager.mobileNumber)
      ? manager.mobileNumberForFront || manager.mobileNumber!
      : undefined;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-500">
            {fullName.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {fullName}
          </h2>
          {customStatus && (
            <p className="text-sm text-gray-500 truncate">{customStatus}</p>
          )}
          <div
            className={`inline-flex items-center mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${statusBg}`}
          >
            <span className={`w-2 h-2 mr-1 rounded-full ${dotBg}`}></span>
            {statusLabel}
          </div>
        </div>
      </div>

      {description && (
        <p className="mt-4 text-gray-700 text-sm line-clamp-2">
          {description}
        </p>
      )}

      {(email || mobile) && (
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          {email && (
            <div>
              <span className="font-medium text-gray-800">Email:</span>{" "}
              {email}
            </div>
          )}
          {mobile && (
            <div>
              <span className="font-medium text-gray-800">Mobile:</span>{" "}
              {mobile}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
