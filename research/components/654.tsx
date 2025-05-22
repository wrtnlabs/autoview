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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Ensure we have an array of users
  const users = Array.isArray(value) ? value : [];

  // Image error handler to fallback to initials avatar
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    displayName: string,
  ) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName,
    )}&background=0D8ABC&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const profileUrl = user.html_url;
        const email = user.email?.trim() || null;
        const isAdmin = user.site_admin;

        return (
          <div
            key={user.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* Avatar */}
            <div className="w-24 h-24 mb-4">
              <img
                src={user.avatar_url}
                alt={`${displayName} avatar`}
                onError={(e) => handleImageError(e, displayName)}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="text-center">
              {/* Name and Admin Badge */}
              <h3 className="flex items-center justify-center text-lg font-semibold text-gray-900">
                {isAdmin && (
                  <LucideReact.Shield
                    className="mr-1 text-blue-500"
                    size={16}
                  />
                )}
                <span className="truncate">{displayName}</span>
              </h3>

              {/* GitHub Profile Link */}
              <div className="mt-1 flex items-center justify-center text-sm text-gray-600 space-x-1">
                <LucideReact.Link size={16} className="text-gray-400" />
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate hover:underline"
                >
                  {user.login}
                </a>
              </div>

              {/* Email */}
              {email && (
                <div className="mt-1 flex items-center justify-center text-sm text-gray-600 space-x-1">
                  <LucideReact.Mail size={16} className="text-gray-400" />
                  <span className="truncate">{email}</span>
                </div>
              )}

              {/* Account Type */}
              <div className="mt-2 flex items-center justify-center space-x-1">
                <LucideReact.User size={16} className="text-gray-400" />
                <span className="text-sm text-gray-500">{user.type}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
