import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ManagersInfiniteScrollingView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const managers = value.managers ?? [];
  const onlines = value.onlines ?? [];
  const managerCount = managers.length;
  const onlineCount = onlines.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header with summary */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Managers ({managerCount})
        </h2>
        <div className="text-sm text-gray-500">{onlineCount} online</div>
      </div>

      {/* List of managers */}
      {managerCount === 0 ? (
        <p className="text-gray-500">No managers available.</p>
      ) : (
        <ul className="space-y-4">
          {managers.map((mgr) => {
            const {
              id,
              name,
              description,
              showDescriptionToFront,
              avatarUrl,
              email,
              showEmailToFront,
              role,
            } = mgr;
            const displayRole =
              role?.charAt(0).toUpperCase() + role.slice(1);
            const initial = name?.charAt(0).toUpperCase() ?? "";

            return (
              <li
                key={id ?? name}
                className="flex items-center space-x-4"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={`${name} avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-medium">
                    {initial}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-md font-medium text-gray-900 truncate">
                      {name}
                    </h3>
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">
                      {displayRole}
                    </span>
                  </div>
                  {showDescriptionToFront && description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {description}
                    </p>
                  )}
                  {showEmailToFront && email && (
                    <p className="text-sm text-gray-600 mt-1">{email}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Indicator if more data is available */}
      {value.next && (
        <div className="mt-4 text-center">
          <span className="text-sm text-indigo-600">
            More available...
          </span>
        </div>
      )}
    </div>
  );
}
