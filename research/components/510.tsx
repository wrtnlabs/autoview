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
  // Handle empty or missing data gracefully
  if (!value || value.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={32} className="mr-2" />
        <span>No users available.</span>
      </div>
    );
  }

  // Render a responsive grid of user cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {value.map((user) => {
        // Derive a display name: prefer the provided name, fallback to login
        const displayName = user.name ?? user.login;
        const profileUrl = user.html_url;
        const email = user.email;

        return (
          <div
            key={user.id}
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-center text-center"
          >
            {/* Avatar with fallback to generated initials */}
            <img
              src={user.avatar_url}
              alt={`${displayName}'s avatar`}
              className="w-24 h-24 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName,
                  )}&background=0D8ABC&color=fff`;
              }}
            />

            {/* User's display name and login */}
            <h2 className="mt-2 font-semibold text-lg text-gray-800 truncate">
              {displayName}
            </h2>
            <p className="text-sm text-gray-500 truncate">@{user.login}</p>

            {/* Optional email */}
            {email && (
              <div className="flex items-center text-gray-600 mt-1">
                <LucideReact.Mail size={16} className="mr-1" />
                <span className="text-sm truncate">{email}</span>
              </div>
            )}

            {/* Account type (User/Organization) */}
            <div className="flex items-center text-gray-600 mt-1">
              <LucideReact.Tag size={16} className="mr-1" />
              <span className="text-sm">{user.type}</span>
            </div>

            {/* Link to GitHub profile */}
            <div className="flex items-center text-blue-500 mt-2 w-full">
              <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm truncate hover:underline"
              >
                {profileUrl}
              </a>
            </div>

            {/* Site admin badge */}
            {user.site_admin && (
              <div className="flex items-center text-yellow-500 mt-2">
                <LucideReact.Star size={16} className="mr-1" />
                <span className="text-sm font-medium">Site Admin</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
