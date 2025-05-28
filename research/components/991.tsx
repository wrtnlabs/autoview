import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.simple_user[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived values and helper functions
  const users = value;
  const userCount = users.length;
  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";
  const placeholderAvatar = (name: string | null | undefined, login: string): string => {
    const label = name || login;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(label)}&background=0D8ABC&color=fff`;
  };

  // Empty state
  if (userCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-4 text-lg">No users available</span>
      </div>
    );
  }

  // Main render
  return (
    <div className="space-y-6">
      {/* Header with total user count */}
      <div className="flex items-center text-gray-700">
        <LucideReact.Users size={20} className="mr-2" />
        <span className="text-lg font-semibold">{userCount} Users</span>
      </div>

      {/* User cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            {/* Avatar, name, login, admin badge */}
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar_url}
                alt={user.name || user.login}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = placeholderAvatar(user.name, user.login);
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-md font-medium text-gray-900 truncate">
                  {user.name || user.login}
                </p>
                {user.name && (
                  <p className="text-sm text-gray-500 truncate">
                    @{user.login}
                  </p>
                )}
              </div>
              {user.site_admin && (
                <LucideReact.ShieldCheck
                  size={20}
                  className="text-blue-500"
                  aria-label="Site Admin"
                />
              )}
            </div>

            {/* Optional email */}
            {user.email && (
              <div className="flex items-center mt-3 text-gray-600">
                <LucideReact.Mail size={16} className="mr-1" />
                <span className="text-sm truncate">{user.email}</span>
              </div>
            )}

            {/* User type */}
            <div className="flex items-center mt-2 text-gray-600 text-sm">
              <LucideReact.Tag size={16} className="mr-1" />
              <span className="capitalize">{user.type}</span>
            </div>

            {/* Optional starred date */}
            {user.starred_at && (
              <div className="flex items-center mt-2 text-gray-600 text-sm">
                <LucideReact.Star size={16} className="mr-1 text-amber-400" />
                <span>Starred on {formatDate(user.starred_at)}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
