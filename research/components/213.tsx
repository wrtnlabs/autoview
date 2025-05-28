import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4UserView {
                    user?: AutoViewInputSubTypes.legacy.v4.LegacyV4User;
                    online?: AutoViewInputSubTypes.Online;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4User {
                id?: string;
                channelId?: string;
                memberId?: string;
                veilId?: string;
                unifiedId?: string;
                name?: string;
                profile?: {
                    [key: string]: {};
                };
                profileOnce?: AutoViewInputSubTypes.profile.UserProfile;
                tags?: string[] & tags.MinItems<0> & tags.MaxItems<10> & tags.UniqueItems;
                alert?: number & tags.Type<"int32">;
                unread?: number & tags.Type<"int32">;
                popUpChatId?: string;
                blocked?: boolean;
                unsubscribed?: boolean;
                hasChat?: boolean;
                hasPushToken?: boolean;
                language?: string & tags.Default<"en">;
                country?: string;
                city?: string;
                latitude?: number;
                longitude?: number;
                web?: AutoViewInputSubTypes.WebInfo;
                mobile?: AutoViewInputSubTypes.MobileInfo;
                sessionsCount?: number & tags.Type<"int32">;
                lastSeenAt?: number;
                createdAt?: number;
                updatedAt?: number;
                expireAt?: number;
                version?: number & tags.Type<"int32">;
                managedKey?: number & tags.Type<"int32">;
                member?: boolean;
                email?: string;
                userId?: string;
                avatarUrl?: string;
                managed?: boolean;
                mobileNumber?: string & tags.Default<"+18004424000">;
                systemLanguage?: string & tags.Default<"en">;
            }
        }
    }
    export namespace profile {
        export interface UserProfile {
            [key: string]: {};
        }
    }
    export interface WebInfo {
        device?: string;
        os?: string;
        osName?: string;
        browser?: string;
        browserName?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    }
    export interface MobileInfo {
        device?: string;
        os?: string;
        osName?: string;
        appName?: string;
        appVersion?: string;
        sdkName?: string;
        sdkVersion?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    }
    export interface Online {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4UserView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const online = value.online;
  const name = user?.name ?? "Unknown User";
  const avatarUrl =
    user?.avatarUrl ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  const location = [user?.city, user?.country].filter(Boolean).join(", ");
  const tags = user?.tags ?? [];
  const displayTags = tags.slice(0, 3);
  const extraTagCount = tags.length > displayTags.length ? tags.length - displayTags.length : 0;
  const formatDate = (ts?: number) =>
    ts
      ? new Date(ts).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      : "";
  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow max-w-sm mx-auto">
      {user ? (
        <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-shrink-0">
            <img
              src={avatarUrl}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  name,
                )}&background=random`;
              }}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
              {user.member && (
                <LucideReact.CheckCircle
                  className="text-green-500"
                  size={16}
                  aria-label="Member"
                />
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-2 mt-1">
              {online ? (
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-600 text-xs">Online</span>
                </div>
              ) : user.lastSeenAt ? (
                <div className="flex items-center space-x-1">
                  <LucideReact.Clock size={14} className="text-gray-400" />
                  <span>{formatDate(user.lastSeenAt)}</span>
                </div>
              ) : null}
            </div>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              {user.email && (
                <div className="flex items-center space-x-2">
                  <LucideReact.Mail size={16} className="text-gray-400" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center space-x-2">
                  <LucideReact.MapPin size={16} className="text-gray-400" />
                  <span className="truncate">{location}</span>
                </div>
              )}
              {typeof user.unread === "number" && (
                <div className="flex items-center space-x-2">
                  <LucideReact.Mail size={16} className="text-amber-500" />
                  <span>{user.unread} Unread</span>
                </div>
              )}
              {typeof user.alert === "number" && (
                <div className="flex items-center space-x-2">
                  <LucideReact.AlertTriangle size={16} className="text-red-500" />
                  <span>{user.alert} Alerts</span>
                </div>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {displayTags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {extraTagCount > 0 && (
                    <span className="text-gray-500 text-xs">+{extraTagCount} more</span>
                  )}
                </div>
              )}
              {user.createdAt && (
                <div className="flex items-center space-x-2">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span className="text-xs text-gray-500">
                    Joined {formatDate(user.createdAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <LucideReact.AlertCircle size={48} className="text-gray-400" />
          <p className="mt-4 text-gray-500">No user data available</p>
        </div>
      )}
    </article>
  );
}
