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
  // 1. Handle empty or missing data
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-300" />
        <span className="mt-3 text-sm">No users available.</span>
      </div>
    );
  }

  // 2. Render user cards in a responsive grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {value.map((user) => {
        // Derived display values
        const displayName = user.name?.trim();
        const displayEmail = user.email?.trim();
        const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.login,
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={user.id}
            className="flex bg-white rounded-lg shadow-sm hover:shadow-md transition p-4"
          >
            {/* Avatar */}
            <img
              src={user.avatar_url}
              alt={displayName || user.login}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
              }}
            />

            {/* User Info */}
            <div className="ml-4 flex-1 flex flex-col truncate">
              {/* Login */}
              <span className="flex items-center text-gray-900 font-medium truncate">
                <LucideReact.User size={16} className="text-gray-500 mr-1" />
                {user.login}
              </span>

              {/* Optional full name */}
              {displayName && (
                <span className="mt-1 text-sm text-gray-600 truncate">
                  {displayName}
                </span>
              )}

              {/* Optional email */}
              {displayEmail && (
                <span className="mt-1 flex items-center text-sm text-gray-600 truncate">
                  <LucideReact.Mail size={14} className="text-gray-400 mr-1" />
                  {displayEmail}
                </span>
              )}

              {/* Site admin badge */}
              {user.site_admin && (
                <span className="mt-2 inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                  <LucideReact.CheckCircle
                    size={12}
                    className="text-green-600 mr-1"
                  />
                  Admin
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
