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
  const manager = value.manager;
  if (!manager) return null;

  // 1. Data aggregation and derived constants
  const name = manager.name;
  const description = manager.description || "";
  const email =
    manager.showEmailToFront && manager.email ? manager.email : undefined;
  const mobile =
    manager.showMobileNumberToFront && manager.mobileNumber
      ? manager.mobileNumber
      : undefined;
  const joinedDate = manager.createdAt
    ? new Date(manager.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;
  const isOnline = Boolean(value.online);
  const statusText = isOnline ? "Online" : "Offline";
  const statusBg = isOnline ? "bg-green-100" : "bg-gray-100";
  const statusTextColor = isOnline ? "text-green-600" : "text-gray-600";
  const avatarUrl = manager.avatarUrl?.trim() || undefined;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-500 flex-shrink-0">
          {initials}
        </div>
      )}
      <div className="flex-1 flex flex-col space-y-2 w-full">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-medium text-gray-900 truncate">{name}</h2>
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded ${statusBg} ${statusTextColor}`}
          >
            {statusText}
          </span>
        </div>
        {description && (
          <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
        )}
        {(email || mobile) && (
          <div className="flex flex-wrap text-sm text-gray-600 space-x-4">
            {email && <span className="truncate">✉️ {email}</span>}
            {mobile && <span className="truncate">📱 {mobile}</span>}
          </div>
        )}
        {joinedDate && (
          <p className="text-xs text-gray-500">Joined: {joinedDate}</p>
        )}
      </div>
    </div>
  );
}
