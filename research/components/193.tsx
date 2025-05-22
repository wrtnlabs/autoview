import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ManagerView = {
                    manager?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager;
                    online?: AutoViewInputSubTypes.legacy.v4.LegacyV4Online;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Manager = {
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
                email: string;
                showEmailToFront?: boolean;
                mobileNumber?: string & tags.Default<"+18004424000">;
                showMobileNumberToFront?: boolean;
                role: "owner" | "member";
                removed?: boolean;
                createdAt?: number;
                displayAsChannel?: boolean;
                defaultGroupWatch?: "all" | "info" | "none";
                defaultDirectChatWatch?: "all" | "info" | "none";
                defaultUserChatWatch?: "all" | "info" | "none";
                operatorScore?: number;
                touchScore?: number;
                avatar?: AutoViewInputSubTypes.TinyFile;
                operatorEmailReminder?: boolean;
                operator?: boolean;
                statusEmoji?: string;
                statusText?: string;
                statusClearAt?: number;
                managerId?: string;
                avatarUrl?: string;
                emailForFront?: string;
                mobileNumberForFront?: string & tags.Default<"+18004424000">;
            };
            export type LegacyV4Online = {
                channelId?: string;
                personType?: string;
                personId?: string;
                id?: string;
            };
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ManagerView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const manager = value.manager;
  const onlineInfo = value.online;
  const isOnline = Boolean(onlineInfo?.id);

  // Format creation date
  const formattedCreatedAt = manager?.createdAt
    ? new Date(manager.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;

  // Determine which email to show
  const emailToShow =
    manager?.showEmailToFront && manager.emailForFront
      ? manager.emailForFront
      : manager?.showEmailToFront && manager.email
      ? manager.email
      : undefined;

  // Determine which mobile number to show
  const mobileToShow =
    manager?.showMobileNumberToFront && manager.mobileNumberForFront
      ? manager.mobileNumberForFront
      : manager?.showMobileNumberToFront && manager.mobileNumber
      ? manager.mobileNumber
      : undefined;

  // Combine status emoji and text
  const statusDisplay =
    manager?.statusText || manager?.statusEmoji
      ? `${manager.statusEmoji || ""} ${manager.statusText || ""}`.trim()
      : undefined;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!manager) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-600">
        No manager data available
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Avatar & Online Indicator */}
      <div className="relative flex-shrink-0">
        {manager.avatarUrl ? (
          <img
            src={manager.avatarUrl}
            alt={`${manager.name} avatar`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            {manager.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span
          className={`absolute bottom-0 right-0 inline-block w-3 h-3 rounded-full ring-2 ring-white ${
            isOnline ? "bg-green-400" : "bg-gray-400"
          }`}
        />
      </div>

      {/* Manager Details */}
      <div className="flex-1 flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {manager.name}
          </h2>
          <span
            className={`px-2 py-0.5 text-xs font-medium uppercase rounded ${
              manager.role === "owner"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {manager.role}
          </span>
        </div>

        {statusDisplay && (
          <p className="text-sm text-gray-500 truncate">{statusDisplay}</p>
        )}

        {manager.description && manager.showDescriptionToFront && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {manager.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {emailToShow && (
            <div className="flex items-center space-x-1">
              <span>📧</span>
              <span className="truncate">{emailToShow}</span>
            </div>
          )}
          {mobileToShow && (
            <div className="flex items-center space-x-1">
              <span>📱</span>
              <span className="truncate">{mobileToShow}</span>
            </div>
          )}
          {formattedCreatedAt && (
            <div className="flex items-center space-x-1">
              <span>📅</span>
              <span>{formattedCreatedAt}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
