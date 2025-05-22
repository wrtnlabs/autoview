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
  /**
   * Stargazer
   *
   * @title Stargazer
   */
  export type stargazer = {
    starred_at: string & tags.Format<"date-time">;
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
  | AutoViewInputSubTypes.simple_user[]
  | AutoViewInputSubTypes.stargazer[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Determine if the array is of stargazers
  const isStargazer =
    Array.isArray(value) &&
    value.length > 0 &&
    (value[0] as AutoViewInputSubTypes.stargazer).starred_at !== undefined;

  // Empty or invalid data state
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-4 text-lg">No data available</span>
      </div>
    );
  }

  const items = value as any[];

  // Render list of user cards or stargazer cards
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, idx) => {
        if (isStargazer) {
          // Stargazer entry
          const { starred_at, user } = item as AutoViewInputSubTypes.stargazer;
          const displayUser = user ?? null;
          const username = displayUser?.login ?? "Unknown User";
          const fullName = displayUser?.name ?? "";
          const avatarSrc =
            displayUser?.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              username,
            )}&background=0D8ABC&color=fff`;
          const profileUrl = displayUser?.html_url ?? "#";
          const formattedDate = new Date(starred_at).toLocaleDateString(
            undefined,
            { year: "numeric", month: "short", day: "numeric" },
          );

          return (
            <li
              key={idx}
              className="bg-white p-4 rounded-lg shadow flex space-x-4"
            >
              <img
                src={avatarSrc}
                alt={username}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      username,
                    )}&background=0D8ABC&color=fff`;
                }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <LucideReact.Star size={16} className="text-amber-400" />
                    <a
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 font-semibold hover:underline truncate"
                    >
                      {username}
                    </a>
                  </div>
                  <span className="text-sm text-gray-500">{formattedDate}</span>
                </div>
                {fullName && (
                  <p className="mt-1 text-gray-600 text-sm truncate">
                    {fullName}
                  </p>
                )}
                {displayUser?.email && (
                  <div className="flex items-center gap-1 text-gray-500 mt-1">
                    <LucideReact.Mail size={14} />
                    <span className="text-sm truncate">
                      {displayUser.email}
                    </span>
                  </div>
                )}
              </div>
            </li>
          );
        } else {
          // Simple user entry
          const user = item as AutoViewInputSubTypes.simple_user;
          const username = user.login;
          const fullName = user.name ?? "";
          const avatarSrc =
            user.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              username,
            )}&background=0D8ABC&color=fff`;
          const profileUrl = user.html_url;

          return (
            <li
              key={idx}
              className="bg-white p-4 rounded-lg shadow flex space-x-4"
            >
              <img
                src={avatarSrc}
                alt={username}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      username,
                    )}&background=0D8ABC&color=fff`;
                }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <LucideReact.User size={16} className="text-gray-400" />
                    <a
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 font-semibold hover:underline truncate"
                    >
                      {username}
                    </a>
                  </div>
                  {user.site_admin && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                {fullName && (
                  <p className="mt-1 text-gray-600 text-sm truncate">
                    {fullName}
                  </p>
                )}
                {user.email && (
                  <div className="flex items-center gap-1 text-gray-500 mt-1">
                    <LucideReact.Mail size={14} />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                )}
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
}
