import { tags } from "typia";
import React from "react";
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
  const users = value;
  const totalUsers = users.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        GitHub Users ({totalUsers})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => {
          // Derived display name: prefer name, fallback to login
          const displayName = user.name?.trim() || user.login;
          // Optional formatted starred date
          const starredDate = user.starred_at
            ? new Date(user.starred_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : null;

          return (
            <div
              key={user.id}
              className="flex flex-col items-center bg-white rounded-lg shadow p-4"
            >
              <img
                src={user.avatar_url}
                alt={`${displayName} avatar`}
                className="w-20 h-20 rounded-full mb-2 object-cover"
              />
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {displayName}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  @{user.login}
                </p>
                {user.site_admin && (
                  <span className="mt-1 inline-block px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              {user.email && (
                <p className="mt-2 text-sm text-gray-600 truncate">
                  {user.email}
                </p>
              )}
              {starredDate && (
                <p className="mt-1 text-xs text-gray-400">
                  Starred at {starredDate}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
