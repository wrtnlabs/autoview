import { tags } from "typia";
import React from "react";
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
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ManagersView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const managers = value.managers ?? [];

  // Format a timestamp (ms since epoch) to a readable date
  const formatDate = (ms?: number): string =>
    ms
      ? new Date(ms).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // Generate initials from a full name
  const getInitials = (name: string): string =>
    name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (managers.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm text-gray-500 text-center">
        No managers available
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <ul className="space-y-4">
        {managers.map((mgr, idx) => {
          const name = mgr.name;
          const description =
            mgr.showDescriptionToFront && mgr.description
              ? mgr.description
              : "";
          const email =
            mgr.showEmailToFront && (mgr.emailForFront || mgr.email)
              ? mgr.emailForFront || mgr.email
              : "";
          const mobile =
            mgr.showMobileNumberToFront &&
            (mgr.mobileNumberForFront || mgr.mobileNumber)
              ? mgr.mobileNumberForFront || mgr.mobileNumber
              : "";
          const joined = formatDate(mgr.createdAt);
          const avatarUrl = mgr.avatarUrl;
          const initials = getInitials(name);

          return (
            <li
              key={mgr.id ?? idx}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                    {initials}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 font-semibold text-base truncate">
                  {name}
                </h3>
                {description && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {description}
                  </p>
                )}
                <div className="mt-2 space-y-1 text-gray-700 text-sm">
                  {email && (
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      <span className="truncate">{email}</span>
                    </p>
                  )}
                  {mobile && (
                    <p>
                      <span className="font-medium">Mobile:</span>{" "}
                      <span className="truncate">{mobile}</span>
                    </p>
                  )}
                </div>
                {joined && (
                  <p className="text-gray-400 text-xs mt-2">
                    Joined: {joined}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
