import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  export namespace operator {
    export type OperatorStatus = {
      id?: string;
      managerId: string;
      channelId: string;
      operatorStatusType?:
        | "waiting"
        | "chat"
        | "call"
        | "postCall"
        | "meet"
        | "eat"
        | "rest"
        | "inMeeting"
        | "education"
        | "otherWork"
        | "off"
        | "vacation";
      enable?: boolean;
      createdAt?: number;
      updatedAt?: number;
      typeUpdatedAt?: number;
      version?: number & tags.Type<"int32">;
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.desk.ManagersInfiniteScrollingView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const managers = value.managers ?? [];
  const onlineIds = new Set<string>(
    value.onlines
      ?.map((o) => o.personId ?? "")
      .filter((id) => !!id) as string[],
  );
  const statusMap = new Map<
    string,
    AutoViewInputSubTypes.operator.OperatorStatus
  >();
  value.operatorStatuses?.forEach((status) => {
    if (status.managerId) statusMap.set(status.managerId, status);
  });
  const statusConfig: Record<string, { icon: JSX.Element; label: string }> = {
    waiting: {
      icon: <LucideReact.Clock size={16} className="text-amber-500" />,
      label: "Waiting",
    },
    chat: {
      icon: <LucideReact.MessageCircle size={16} className="text-blue-500" />,
      label: "Chat",
    },
    call: {
      icon: <LucideReact.PhoneCall size={16} className="text-indigo-500" />,
      label: "Call",
    },
    postCall: {
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      label: "Post-Call",
    },
    meet: {
      icon: <LucideReact.Video size={16} className="text-purple-500" />,
      label: "Meet",
    },
    eat: {
      icon: <LucideReact.Coffee size={16} className="text-yellow-500" />,
      label: "Break",
    },
    rest: {
      icon: <LucideReact.Bed size={16} className="text-gray-500" />,
      label: "Rest",
    },
    inMeeting: {
      icon: <LucideReact.Users size={16} className="text-pink-500" />,
      label: "In Meeting",
    },
    education: {
      icon: <LucideReact.BookOpen size={16} className="text-teal-500" />,
      label: "Education",
    },
    otherWork: {
      icon: <LucideReact.Briefcase size={16} className="text-gray-600" />,
      label: "Other Work",
    },
    off: {
      icon: <LucideReact.Moon size={16} className="text-gray-500" />,
      label: "Off",
    },
    vacation: {
      icon: <LucideReact.Sun size={16} className="text-yellow-600" />,
      label: "Vacation",
    },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {managers.length > 0 ? (
        managers.map((manager) => {
          const isOnline = !!(manager.id && onlineIds.has(manager.id));
          const status =
            manager.id && statusMap.has(manager.id)
              ? statusMap.get(manager.id)
              : undefined;
          const statusEntry =
            status && status.operatorStatusType
              ? statusConfig[status.operatorStatusType]
              : undefined;
          const avatarSrc =
            manager.avatarUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              manager.name,
            )}&background=0D8ABC&color=fff`;

          return (
            <div
              key={manager.id || manager.name}
              className="flex items-start bg-white rounded-lg shadow p-4 space-x-4"
            >
              <div className="relative">
                <img
                  src={avatarSrc}
                  alt={manager.name}
                  onError={(e) =>
                    (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      manager.name,
                    )}&background=0D8ABC&color=fff`)
                  }
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full ring-2 ring-white ${
                    isOnline ? "bg-green-400" : "bg-gray-300"
                  }`}
                  aria-label={isOnline ? "Online" : "Offline"}
                  title={isOnline ? "Online" : "Offline"}
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {manager.name}
                </h3>
                {manager.description && manager.showDescriptionToFront && (
                  <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                    {manager.description}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  {manager.email && manager.showEmailToFront && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Mail size={16} />
                      <span className="truncate">{manager.email}</span>
                    </div>
                  )}
                  {manager.mobileNumber && manager.showMobileNumberToFront && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Phone size={16} />
                      <span className="truncate">{manager.mobileNumber}</span>
                    </div>
                  )}
                </div>
                {statusEntry && (
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    {statusEntry.icon}
                    <span className="text-gray-700">{statusEntry.label}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center text-gray-400 py-12">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-4">No managers to display</p>
        </div>
      )}
    </div>
  );
}
