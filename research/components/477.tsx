import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.simple_user[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper to format ISO date strings to "Mon D, YYYY"
  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // Empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={48} className="opacity-50" />
        <p className="mt-4 text-lg">No users available</p>
      </div>
    );
  }

  // Main grid of user cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {value.map((user) => {
        // Determine display name (fallback to login)
        const displayName = user.name?.trim() || user.login;
        // Fallback avatar on error
        const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <div className="w-20 h-20 mb-3">
              <img
                src={user.avatar_url}
                alt={displayName}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackAvatar;
                }}
              />
            </div>

            {/* Name and Login */}
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {displayName}
            </h3>
            <p className="text-sm text-gray-500 truncate">{user.login}</p>

            {/* Email */}
            {user.email && (
              <div className="flex items-center text-gray-500 text-sm mt-2 truncate">
                <LucideReact.Mail size={16} className="mr-1" />
                <span>{user.email}</span>
              </div>
            )}

            {/* User Type */}
            <div className="flex items-center text-gray-600 text-sm mt-2">
              <LucideReact.Tag size={16} className="text-gray-500 mr-1" />
              <span>{user.type}</span>
            </div>

            {/* Site Admin Badge */}
            {user.site_admin && (
              <div className="flex items-center text-green-600 text-sm mt-1">
                <LucideReact.CheckCircle size={16} className="mr-1" />
                <span>Admin</span>
              </div>
            )}

            {/* Starred At */}
            {user.starred_at && (
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <LucideReact.Calendar size={16} className="mr-1" />
                <span>Starred: {formatDate(user.starred_at)}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
