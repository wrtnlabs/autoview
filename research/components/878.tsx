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
    /**
     * Stargazer
     *
     * @title Stargazer
    */
    export interface stargazer {
        starred_at: string & tags.Format<"date-time">;
        user: AutoViewInputSubTypes.nullable_simple_user;
    }
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
export type AutoViewInput = AutoViewInputSubTypes.simple_user[] | AutoViewInputSubTypes.stargazer[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Determine if we're rendering stargazers (has "user" key)
  const isStargazerList =
    Array.isArray(value) &&
    value.length > 0 &&
    typeof (value[0] as any).starred_at === "string" &&
    "user" in (value[0] as any);

  // Format ISO date strings to a readable format
  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // Empty state
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No data available</span>
      </div>
    );
  }

  // Render stargazers
  if (isStargazerList) {
    const stargazers = value as AutoViewInputSubTypes.stargazer[];
    return (
      <ul role="list" className="space-y-4 p-4">
        {stargazers.map((entry, idx) => {
          const user = entry.user;
          const displayName = user ? user.name || user.login : "Unknown user";
          const avatarSrc = user
            ? user.avatar_url
            : `https://ui-avatars.com/api/?name=Unknown&background=random`;
          return (
            <li
              key={idx}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow"
            >
              <div className="w-12 h-12 overflow-hidden rounded-full flex-shrink-0">
                <img
                  src={avatarSrc}
                  alt={displayName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      displayName
                    )}&background=random`;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {displayName}
                </h3>
                <p className="text-xs text-gray-500">
                  <LucideReact.Calendar size={14} className="inline mr-1" />
                  {formatDateTime(entry.starred_at)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  // Render simple GitHub users
  const users = value as AutoViewInputSubTypes.simple_user[];
  return (
    <ul
      role="list"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4"
    >
      {users.map((user, idx) => {
        const displayName = user.name || user.login;
        const avatarSrc = user.avatar_url;
        return (
          <li
            key={idx}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow text-center"
          >
            <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
              <img
                src={avatarSrc}
                alt={displayName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName
                  )}&background=0D8ABC&color=fff`;
                }}
              />
            </div>
            <h2 className="w-full truncate text-lg font-semibold text-gray-900">
              {displayName}
            </h2>
            <p className="mt-1 flex items-center text-sm text-gray-500 w-full truncate">
              <LucideReact.Mail size={16} className="mr-1 flex-shrink-0" />
              {user.email ?? <span className="italic">No public email</span>}
            </p>
            <p className="mt-2 flex items-center text-xs text-gray-400 w-full truncate">
              <LucideReact.User size={14} className="mr-1 flex-shrink-0" />
              {user.type}
            </p>
            {user.site_admin && (
              <div className="mt-2 flex items-center text-blue-500">
                <LucideReact.ShieldUser size={16} className="mr-1" />
                <span className="text-sm">Site Admin</span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
