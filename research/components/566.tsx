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
  // If no users are provided, show an empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No users available</span>
      </div>
    );
  }

  // Render a responsive grid of user cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((user) => {
        // Determine the display name (fallback to login if name is missing)
        const displayName = user.name?.trim() || user.login;
        // Prepare a fallback avatar URL using ui-avatars.com
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={user.id}
            className="flex items-start p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={user.avatar_url}
                  alt={`${displayName}'s avatar`}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // Fallback to generated avatar on error
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = avatarFallback;
                  }}
                />
              </div>
            </div>

            {/* User Info */}
            <div className="ml-4 flex-1 flex flex-col justify-between">
              <div>
                <h2
                  className="text-lg font-semibold text-gray-900 truncate"
                  title={displayName}
                >
                  {displayName}
                </h2>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 hover:underline mt-1 truncate"
                  title={user.html_url}
                >
                  <LucideReact.Link size={16} className="mr-1" />@{user.login}
                </a>
              </div>

              <div className="flex flex-wrap items-center mt-3 space-x-4 text-sm text-gray-600">
                {/* Email (if available) */}
                {user.email && (
                  <div className="flex items-center truncate">
                    <LucideReact.Mail size={16} className="mr-1" />
                    <span className="truncate" title={user.email}>
                      {user.email}
                    </span>
                  </div>
                )}

                {/* Role indicator */}
                <div className="flex items-center">
                  {user.site_admin ? (
                    <>
                      <LucideReact.CheckCircle
                        size={16}
                        className="text-green-500"
                      />
                      <span className="ml-1">Admin</span>
                    </>
                  ) : (
                    <>
                      <LucideReact.User size={16} className="text-gray-400" />
                      <span className="ml-1">User</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
