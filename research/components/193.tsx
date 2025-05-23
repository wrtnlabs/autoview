import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4ManagerView {
                    manager?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager;
                    online?: AutoViewInputSubTypes.legacy.v4.LegacyV4Online;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4Manager {
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
            }
            export interface LegacyV4Online {
                channelId?: string;
                personType?: string;
                personId?: string;
                id?: string;
            }
        }
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ManagerView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const manager = value.manager;
  const online = value.online;

  if (!manager) {
    // No manager data available state
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={48} aria-label="No data" />
        <p className="mt-2 text-sm">No manager data available</p>
      </div>
    );
  }

  const fullName = manager.name;
  const fallbackAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fullName
  )}&background=0D8ABC&color=fff`;
  const imageSrc = manager.avatarUrl || fallbackAvatarUrl;

  const createdAtDate =
    manager.createdAt != null
      ? new Date(manager.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;

  const hasDescription = manager.showDescriptionToFront && !!manager.description;
  const hasEmail = manager.showEmailToFront && !!manager.email;
  const hasMobile =
    manager.showMobileNumberToFront && !!manager.mobileNumber;

  const statusIcon = online && online.id ? (
    <LucideReact.CheckCircle
      size={16}
      className="text-green-500"
      role="img"
      aria-label="Online"
    />
  ) : (
    <LucideReact.XCircle
      size={16}
      className="text-gray-400"
      role="img"
      aria-label="Offline"
    />
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <img
        src={imageSrc}
        alt={`${fullName} avatar`}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = fallbackAvatarUrl;
        }}
      />
      <div className="flex-1 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {fullName}
          </h2>
          {statusIcon}
        </div>
        {hasDescription && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {manager.description}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-700">
          {hasEmail && (
            <div className="flex items-center gap-1">
              <LucideReact.Mail
                size={16}
                className="text-gray-400"
                role="img"
                aria-label="Email"
              />
              <span className="truncate">{manager.email}</span>
            </div>
          )}
          {hasMobile && (
            <div className="flex items-center gap-1">
              <LucideReact.Phone
                size={16}
                className="text-gray-400"
                role="img"
                aria-label="Phone"
              />
              <span className="truncate">{manager.mobileNumber}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <LucideReact.User
              size={16}
              className="text-gray-400"
              role="img"
              aria-label="Role"
            />
            <span className="capitalize">{manager.role}</span>
          </div>
          {createdAtDate && (
            <div className="flex items-center gap-1">
              <LucideReact.Calendar
                size={16}
                className="text-gray-400"
                role="img"
                aria-label="Created"
              />
              <span>{createdAtDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
