import LucideReact from "lucide-react";
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
  // If no users, show a friendly message
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span className="text-sm">No users available.</span>
      </div>
    );
  }

  // Render a responsive grid of user cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {value.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const showSubtitle = Boolean(
          user.name && user.name.trim() && user.name !== user.login,
        );
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=random`;

        return (
          <div
            key={user.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="w-24 h-24 mb-4">
              <img
                src={user.avatar_url}
                alt={displayName}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.src = avatarFallback;
                }}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {displayName}
            </h3>
            {showSubtitle && (
              <p className="mt-1 text-sm text-gray-500 truncate">
                @{user.login}
              </p>
            )}
            {user.site_admin && (
              <div className="flex items-center mt-2 text-green-600">
                <LucideReact.CheckCircle size={16} className="mr-1" />
                <span className="text-sm font-medium">Admin</span>
              </div>
            )}
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                <LucideReact.Link size={16} className="mr-1" />
                <span>Profile</span>
              </a>
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center text-gray-500 hover:text-gray-700 text-sm truncate"
                >
                  <LucideReact.Mail size={16} className="mr-1" />
                  <span>{user.email}</span>
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
