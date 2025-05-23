import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4ManagersInfiniteScrollingView {
                    managers?: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager[];
                    onlines?: AutoViewInputSubTypes.legacy.v4.LegacyV4Online[];
                    next?: string;
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
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ManagersInfiniteScrollingView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and transformations
  const managers = value.managers ?? [];
  const onlines = value.onlines ?? [];
  const totalManagers = managers.length;
  const totalOnline = onlines.length;
  const hasMore = Boolean(value.next);

  // Helper to format role label
  const formatRole = (role: 'owner' | 'member'): string =>
    role === 'owner' ? 'Owner' : 'Member';

  // Helper to get avatar source with fallback
  const getAvatarSrc = (manager: AutoViewInputSubTypes.legacy.v4.LegacyV4Manager): string =>
    manager.avatarUrl
      ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(manager.name)}&background=random&color=fff`;

  // 2. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="flex items-center text-gray-700">
          <LucideReact.Users size={20} className="mr-2" />
          <span className="font-semibold">{totalManagers}</span>
          <span className="ml-1">Managers</span>
        </div>
        <div className="flex items-center text-gray-700 mt-2 sm:mt-0">
          <LucideReact.CheckCircle size={20} className="mr-2 text-green-500" />
          <span className="font-semibold">{totalOnline}</span>
          <span className="ml-1">Online</span>
        </div>
      </div>
      {/* Managers List */}
      <ul className="space-y-4">
        {managers.map((manager, index) => (
          <li key={manager.id ?? index} className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src={getAvatarSrc(manager)}
                alt={manager.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(manager.name)}&background=ccc&color=555`;
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900 font-medium truncate">{manager.name}</h3>
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded ${
                    manager.role === 'owner'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {formatRole(manager.role)}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center truncate">
                  <LucideReact.Mail size={16} className="mr-1" />
                  <span className="truncate">{manager.email}</span>
                </div>
                {manager.showMobileNumberToFront && manager.mobileNumberForFront && (
                  <div className="flex items-center truncate">
                    <LucideReact.Phone size={16} className="mr-1" />
                    <span className="truncate">{manager.mobileNumberForFront}</span>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* Load More Indicator */}
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <LucideReact.Loader className="animate-spin text-gray-400" size={24} />
        </div>
      )}
    </div>
  );
}
