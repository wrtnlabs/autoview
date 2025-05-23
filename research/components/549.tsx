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
  // Ensure we have an array of users
  const users = Array.isArray(value) ? value : [];

  // Empty state
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-4 text-lg">No users available</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 text-gray-600 text-sm">
        {users.length} user{users.length > 1 ? "s" : ""}
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {users.map((user) => {
          const displayName = user.name?.trim() || user.login;
          const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName
          )}&background=0D8ABC&color=fff`;
          const starredDate =
            user.starred_at != null
              ? new Date(user.starred_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : null;

          return (
            <li key={user.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-2">
                  <img
                    src={user.avatar_url}
                    alt={`${displayName}'s avatar`}
                    className="w-full h-full rounded-full object-cover border"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.onerror = null;
                      img.src = fallbackAvatar;
                    }}
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-lg truncate">
                  {displayName}
                </h3>
                <p className="text-gray-500 text-sm truncate">
                  @{user.login}
                </p>
                {user.email && (
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <LucideReact.Mail size={16} className="flex-shrink-0" />
                    <span className="ml-1 truncate">{user.email}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <LucideReact.User size={16} className="flex-shrink-0" />
                  <span className="ml-1">{user.type}</span>
                </div>
                <div className="flex items-center text-sm mt-1">
                  <span className="text-gray-500">Admin:</span>
                  {user.site_admin ? (
                    <LucideReact.CheckCircle
                      size={16}
                      className="ml-1 text-green-500"
                      aria-label="Site admin"
                    />
                  ) : (
                    <LucideReact.XCircle
                      size={16}
                      className="ml-1 text-red-500"
                      aria-label="Not site admin"
                    />
                  )}
                </div>
                {starredDate && (
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <LucideReact.Star
                      size={16}
                      className="flex-shrink-0 text-yellow-400"
                    />
                    <span className="ml-1">Starred: {starredDate}</span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
