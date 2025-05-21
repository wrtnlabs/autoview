import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export type ManagersInfiniteScrollingView = {
            next?: string;
            managers?: AutoViewInputSubTypes.Manager[];
            onlines?: AutoViewInputSubTypes.Online[];
            operatorStatuses?: AutoViewInputSubTypes.operator.OperatorStatus[];
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
    export namespace operator {
        export type OperatorStatus = {
            id?: string;
            managerId: string;
            channelId: string;
            operatorStatusType?: "waiting" | "chat" | "call" | "postCall" | "meet" | "eat" | "rest" | "inMeeting" | "education" | "otherWork" | "off" | "vacation";
            enable?: boolean;
            createdAt?: number;
            updatedAt?: number;
            typeUpdatedAt?: number;
            version?: number & tags.Type<"int32">;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ManagersInfiniteScrollingView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const managers = value.managers ?? [];

  // Map operator statuses by managerId for quick lookup
  const operatorStatusMap: Record<string, AutoViewInputSubTypes.operator.OperatorStatus> = {};
  (value.operatorStatuses ?? []).forEach((status) => {
    if (status.managerId) operatorStatusMap[status.managerId] = status;
  });

  // Count online entries per personId
  const onlineCountMap: Record<string, number> = {};
  (value.onlines ?? []).forEach((online) => {
    const id = online.personId ?? "";
    if (!onlineCountMap[id]) onlineCountMap[id] = 0;
    onlineCountMap[id] += 1;
  });

  // Status color mapping
  const statusColors: Record<string, string> = {
    waiting: "bg-yellow-100 text-yellow-800",
    chat: "bg-green-100 text-green-800",
    call: "bg-blue-100 text-blue-800",
    postCall: "bg-purple-100 text-purple-800",
    meet: "bg-indigo-100 text-indigo-800",
    eat: "bg-orange-100 text-orange-800",
    rest: "bg-gray-100 text-gray-800",
    off: "bg-red-100 text-red-800",
    vacation: "bg-pink-100 text-pink-800",
    otherWork: "bg-teal-100 text-teal-800",
    inMeeting: "bg-indigo-100 text-indigo-800",
    education: "bg-purple-100 text-purple-800",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {managers.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No managers available.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {managers.map((manager) => {
            const status = manager.id ? operatorStatusMap[manager.id] : undefined;
            const onlineCount = manager.accountId ? onlineCountMap[manager.accountId] || 0 : 0;
            const desc =
              manager.showDescriptionToFront && manager.description
                ? manager.description
                : "";
            const email =
              manager.showEmailToFront && manager.email ? manager.email : "";
            const mobile =
              manager.showMobileNumberToFront && manager.mobileNumber
                ? manager.mobileNumber
                : "";
            const avatarUrl = manager.avatarUrl;
            const initials = manager.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <li key={manager.id ?? manager.accountId ?? Math.random()} className="flex items-start p-4">
                <div className="flex-shrink-0">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={manager.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                      {initials}
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {manager.name}
                    </h3>
                    {onlineCount > 0 && (
                      <span className="flex items-center text-sm text-green-600">
                        <span className="mr-1">●</span>
                        {onlineCount}
                      </span>
                    )}
                  </div>
                  {desc && (
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {desc}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    {status && status.operatorStatusType && (
                      <span
                        className={`px-2 py-0.5 rounded ${statusColors[status.operatorStatusType] || "bg-gray-100 text-gray-800"}`}
                      >
                        {status.operatorStatusType.charAt(0).toUpperCase() +
                          status.operatorStatusType.slice(1)}
                      </span>
                    )}
                    {email && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded truncate">
                        {email}
                      </span>
                    )}
                    {mobile && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded truncate">
                        {mobile}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
