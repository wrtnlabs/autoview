import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace legacy {
    export namespace open {
      export namespace v4 {
        export type LegacyV4ManagersInfiniteScrollingView = {
          managers?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager[];
          onlines?: AutoViewInputSubTypes.legacy.v4.LegacyV4Online[];
          next?: string;
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
export type AutoViewInput =
  AutoViewInputSubTypes.legacy.open.v4.LegacyV4ManagersInfiniteScrollingView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const managers = value.managers ?? [];
  const onlineIds = new Set<string>(
    value.onlines?.map((o) => o.personId ?? "") || [],
  );
  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  return (
    <div className="p-4">
      {managers.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.Users size={48} className="mb-2" />
          <span className="text-lg">No managers found</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {managers.map((manager, idx) => {
            const key = manager.id ?? idx.toString();
            const isOnline = manager.id ? onlineIds.has(manager.id) : false;
            const email = manager.showEmailToFront
              ? manager.emailForFront || manager.email
              : undefined;
            const mobile = manager.showMobileNumberToFront
              ? manager.mobileNumberForFront || manager.mobileNumber
              : undefined;
            const joined = formatDate(manager.createdAt);
            const placeholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              manager.name,
            )}&background=random`;
            const avatarSrc = manager.avatarUrl || placeholder;

            return (
              <div
                key={key}
                className="flex flex-col bg-white rounded-lg shadow hover:shadow-md transition p-4"
              >
                <div className="flex items-center mb-3">
                  <div className="relative">
                    <img
                      src={avatarSrc}
                      alt={manager.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) =>
                        ((e.currentTarget as HTMLImageElement).src =
                          placeholder)
                      }
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-gray-800 truncate">
                        {manager.name}
                      </span>
                      {manager.statusEmoji && (
                        <span className="ml-2">{manager.statusEmoji}</span>
                      )}
                    </div>
                    {manager.role && (
                      <span
                        className={`inline-block mt-0.5 px-2 py-0.5 text-xs font-medium rounded ${
                          manager.role === "owner"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {manager.role.charAt(0).toUpperCase() +
                          manager.role.slice(1)}
                      </span>
                    )}
                  </div>
                </div>

                {manager.showDescriptionToFront && manager.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {manager.description}
                  </p>
                )}

                {email && (
                  <div className="flex items-center text-gray-700 text-sm mb-1 truncate">
                    <LucideReact.Mail
                      size={16}
                      className="mr-1 text-gray-400"
                    />
                    <span>{email}</span>
                  </div>
                )}

                {mobile && (
                  <div className="flex items-center text-gray-700 text-sm mb-1 truncate">
                    <LucideReact.Phone
                      size={16}
                      className="mr-1 text-gray-400"
                    />
                    <span>{mobile}</span>
                  </div>
                )}

                {joined && (
                  <div className="flex items-center text-gray-500 text-xs mt-auto">
                    <LucideReact.Calendar
                      size={14}
                      className="mr-1 text-gray-400"
                    />
                    <span>Joined {joined}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {value.next && (
        <div className="mt-4 flex justify-center items-center text-sm text-gray-500">
          <LucideReact.ChevronsDown size={16} className="mr-1" />
          <span>More managers available</span>
        </div>
      )}
    </div>
  );
}
