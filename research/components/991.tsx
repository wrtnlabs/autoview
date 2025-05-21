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
  //    Here we sort users alphabetically by login for consistent display.
  const users = React.useMemo(
    () => [...value].sort((a, b) => a.login.localeCompare(b.login)),
    [value]
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {users.map((user) => {
        const displayName = user.name?.trim() ? user.name! : user.login;
        const userType =
          user.type?.charAt(0).toUpperCase() + user.type.slice(1);
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
            className="bg-white p-4 rounded-lg shadow transition-shadow hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar_url}
                alt={`${displayName} avatar`}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {displayName}
                </h2>
                <p className="text-sm text-gray-600 truncate">{user.login}</p>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              {user.email && (
                <p className="text-sm text-gray-700 truncate">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {userType && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-800 rounded">
                    {userType}
                  </span>
                )}
                {user.site_admin && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                    Admin
                  </span>
                )}
                {starredDate && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                    Starred: {starredDate}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-2 text-xs text-gray-500 truncate">
              <span className="font-medium">Profile URL:</span> {user.html_url}
            </p>
          </div>
        );
      })}
    </div>
  );
}
