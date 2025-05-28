import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace desk {
        export interface ManagersView {
            managers?: AutoViewInputSubTypes.Manager[];
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
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ManagersView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived values
  const managers = value.managers ?? [];

  // 2. Empty state
  if (managers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-lg">No managers available</span>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {managers.map((manager, idx) => {
        const name = manager.name;
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=0D8ABC&color=fff`;
        const avatarSrc = manager.avatarUrl ?? avatarFallback;
        const description =
          manager.showDescriptionToFront && manager.description
            ? manager.description
            : undefined;
        const email =
          manager.showEmailToFront && manager.email ? manager.email : undefined;
        const mobile =
          manager.showMobileNumberToFront && manager.mobileNumber
            ? manager.mobileNumber
            : undefined;

        return (
          <article
            key={manager.id ?? idx}
            className="p-4 bg-white rounded-lg shadow transition-shadow hover:shadow-md"
          >
            <div className="flex items-start space-x-4">
              <img
                src={avatarSrc}
                alt={name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = avatarFallback;
                }}
              />
              <div className="flex-1">
                <h3 className="flex items-center text-lg font-semibold text-gray-900">
                  {name}
                  {manager.operator && (
                    <LucideReact.UserCheck
                      size={16}
                      className="ml-2 text-green-500"
                      aria-label="Operator"
                    />
                  )}
                </h3>
                {description && (
                  <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                    {description}
                  </p>
                )}
                {(email || mobile) && (
                  <div className="mt-3 space-y-1">
                    {email && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <LucideReact.Mail
                          size={16}
                          className="mr-2 text-gray-400"
                        />
                        <span className="truncate">{email}</span>
                      </div>
                    )}
                    {mobile && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <LucideReact.Phone
                          size={16}
                          className="mr-2 text-gray-400"
                        />
                        <span className="truncate">{mobile}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
