import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Project Collaborator Permission
   *
   * @title Project Collaborator Permission
   */
  export type project_collaborator_permission = {
    permission: string;
    user: AutoViewInputSubTypes.nullable_simple_user;
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type nullable_simple_user = {
    name?: string | null;
    email?: string | null;
    login: string;
    id: number & tags.Type<"int32">;
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
    starred_at?: string;
    user_view_type?: string;
  } | null;
}
export type AutoViewInput =
  AutoViewInputSubTypes.project_collaborator_permission;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { permission, user } = value;
  const displayName = user ? (user.name?.trim() ? user.name! : user.login) : "";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName || "Unknown User",
  )}&background=0D8ABC&color=fff`;
  const formattedPermission =
    permission.charAt(0).toUpperCase() + permission.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center gap-4">
      {/* Permission Badge */}
      <div className="flex items-center gap-1 self-end md:self-auto">
        <LucideReact.Tag size={16} className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          {formattedPermission}
        </span>
      </div>

      {/* User Info */}
      {user ? (
        <>
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={user.avatar_url}
              alt={`${displayName}'s avatar`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = avatarFallback;
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-1">
            {/* Name */}
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {displayName}
            </h2>
            {/* Login */}
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <LucideReact.User size={16} />
              <span className="truncate">{user.login}</span>
            </div>
            {/* Email (if available) */}
            {user.email && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <LucideReact.Mail size={16} />
                <span className="truncate">{user.email}</span>
              </div>
            )}
          </div>
        </>
      ) : (
        // Fallback if user data is null
        <div className="flex items-center gap-2 text-gray-500">
          <LucideReact.AlertCircle size={24} />
          <span className="text-sm">No user data available</span>
        </div>
      )}
    </div>
  );
}
