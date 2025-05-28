import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export interface ManagersInfiniteScrollingView {
            next?: string;
            managers?: AutoViewInputSubTypes.Manager[];
            onlines?: AutoViewInputSubTypes.Online[];
            operatorStatuses?: AutoViewInputSubTypes.operator.OperatorStatus[];
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
    export namespace operator {
        export interface OperatorStatus {
            id?: string;
            managerId: string;
            channelId: string;
            operatorStatusType?: "waiting" | "chat" | "call" | "postCall" | "meet" | "eat" | "rest" | "inMeeting" | "education" | "otherWork" | "off" | "vacation";
            enable?: boolean;
            createdAt?: number;
            updatedAt?: number;
            typeUpdatedAt?: number;
            version?: number & tags.Type<"int32">;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ManagersInfiniteScrollingView;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const managers = value.managers ?? [];
  const statuses = value.operatorStatuses ?? [];

  const getStatusDetails = (
    type?: AutoViewInputSubTypes.operator.OperatorStatus["operatorStatusType"],
  ):
    | { icon: React.ReactNode; color: string; label: string }
    | null => {
    switch (type) {
      case "waiting":
        return { icon: <LucideReact.Clock size={16} />, color: "text-amber-500", label: "Waiting" };
      case "chat":
        return { icon: <LucideReact.MessageSquare size={16} />, color: "text-green-500", label: "Chat" };
      case "call":
        return { icon: <LucideReact.PhoneCall size={16} />, color: "text-blue-500", label: "On Call" };
      case "postCall":
        return { icon: <LucideReact.PhoneOutgoing size={16} />, color: "text-purple-500", label: "Post Call" };
      case "meet":
        return { icon: <LucideReact.Video size={16} />, color: "text-indigo-500", label: "Meeting" };
      case "eat":
        return { icon: <LucideReact.Coffee size={16} />, color: "text-yellow-500", label: "Eating" };
      case "rest":
        return { icon: <LucideReact.Moon size={16} />, color: "text-gray-500", label: "Resting" };
      case "inMeeting":
        return { icon: <LucideReact.Users size={16} />, color: "text-blue-600", label: "In Meeting" };
      case "education":
        return { icon: <LucideReact.BookOpen size={16} />, color: "text-pink-500", label: "Education" };
      case "otherWork":
        return { icon: <LucideReact.Briefcase size={16} />, color: "text-gray-500", label: "Other Work" };
      case "off":
        return { icon: <LucideReact.XCircle size={16} />, color: "text-red-500", label: "Off" };
      case "vacation":
        return { icon: <LucideReact.Flag size={16} />, color: "text-green-300", label: "Vacation" };
      default:
        return null;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {managers.map((manager) => {
        const statusType = statuses.find((s) => s.managerId === manager.id)?.operatorStatusType;
        const statusDetails = getStatusDetails(statusType);
        const avatarSrc =
          manager.avatarUrl ??
          `https://ui-avatars.com/api/?name=${encodeURIComponent(manager.name)}&background=0D8ABC&color=fff`;

        return (
          <div
            key={manager.id ?? manager.accountId ?? manager.name}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center">
              <img
                src={avatarSrc}
                alt={manager.name}
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    manager.name,
                  )}&background=0D8ABC&color=fff`;
                }}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <h3 className="text-lg font-semibold text-gray-900 truncate">{manager.name}</h3>
              {manager.operator && (
                <LucideReact.Star
                  className="ml-1 text-yellow-500"
                  size={16}
                  role="img"
                  aria-label="Operator"
                />
              )}
            </div>

            {manager.showDescriptionToFront && manager.description && (
              <p className="text-sm text-gray-500 line-clamp-2 mt-2">{manager.description}</p>
            )}

            <div className="flex flex-wrap gap-3 mt-3 items-center text-sm text-gray-600">
              {manager.showEmailToFront && manager.email && (
                <div className="flex items-center gap-1">
                  <LucideReact.Mail size={16} />
                  <span className="truncate">{manager.email}</span>
                </div>
              )}
              {manager.showMobileNumberToFront && manager.mobileNumber && (
                <div className="flex items-center gap-1">
                  <LucideReact.Phone size={16} />
                  <span>{manager.mobileNumber}</span>
                </div>
              )}
              {statusDetails && (
                <div className={`flex items-center gap-1 ${statusDetails.color}`}>
                  {statusDetails.icon}
                  <span className="capitalize">{statusDetails.label}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
