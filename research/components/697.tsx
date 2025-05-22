import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Repository Collaborator Permission
   *
   * @title Repository Collaborator Permission
   */
  export type repository_collaborator_permission = {
    permission: string;
    role_name: string;
    user: AutoViewInputSubTypes.nullable_collaborator;
  };
  /**
   * Collaborator
   *
   * @title Collaborator
   */
  export type nullable_collaborator = {
    login: string;
    id: number & tags.Type<"int32">;
    email?: string | null;
    name?: string | null;
    node_id: string;
    avatar_url: string & tags.Format<"uri">;
    gravatar_id: string | null;
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    followers_url: string & tags.Format<"uri">;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string & tags.Format<"uri">;
    organizations_url: string & tags.Format<"uri">;
    repos_url: string & tags.Format<"uri">;
    events_url: string;
    received_events_url: string & tags.Format<"uri">;
    type: string;
    site_admin: boolean;
    permissions?: {
      pull: boolean;
      triage?: boolean;
      push: boolean;
      maintain?: boolean;
      admin: boolean;
    };
    role_name: string;
    user_view_type?: string;
  } | null;
}
export type AutoViewInput =
  AutoViewInputSubTypes.repository_collaborator_permission;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const fullNameOrLogin = user?.name
    ? user.name
    : user?.login
      ? user.login
      : "Unknown User";
  const login = user?.login ?? "";
  const email = user?.email ?? "";
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fullNameOrLogin,
  )}&background=0D8ABC&color=fff`;

  function getPermissionStyle(permission: string): string {
    const p = permission.toLowerCase();
    if (p.includes("admin")) return "bg-green-100 text-green-800";
    if (p.includes("write")) return "bg-blue-100 text-blue-800";
    if (p.includes("read")) return "bg-gray-100 text-gray-800";
    return "bg-indigo-100 text-indigo-800";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user?.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={fullNameOrLogin}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              (e.currentTarget.src = avatarPlaceholder)
            }
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <LucideReact.User size={24} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 flex flex-col space-y-0.5 min-w-0">
        <span className="font-semibold text-gray-900 truncate">
          {fullNameOrLogin}
        </span>
        {login && (
          <span className="text-gray-500 text-sm truncate">@{login}</span>
        )}
        {email && (
          <div className="flex items-center text-gray-500 text-sm truncate">
            <LucideReact.Mail size={14} className="mr-1" />
            <span className="truncate">{email}</span>
          </div>
        )}
      </div>

      {/* Permission & Role Badges */}
      <div className="flex flex-col items-end space-y-1">
        <span
          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getPermissionStyle(
            value.permission,
          )}`}
        >
          {value.permission.charAt(0).toUpperCase() + value.permission.slice(1)}
        </span>
        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
          {value.role_name.charAt(0).toUpperCase() + value.role_name.slice(1)}
        </span>
      </div>
    </div>
  );
}
