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
  // 1. Derived/aggregated values
  const users = value;
  const userCount = users.length;
  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Early return for empty data
  if (userCount === 0) {
    return (
      <div className="p-4">
        <p className="text-center text-gray-500">No users found.</p>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        GitHub Users ({userCount})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => {
          const displayName = user.name ?? user.login;
          const starredAtLabel = user.starred_at
            ? formatDate(user.starred_at)
            : null;

          return (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow flex flex-col overflow-hidden"
            >
              <div className="flex items-center p-4 space-x-4">
                <img
                  src={user.avatar_url}
                  alt={`${displayName} avatar`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-medium text-blue-600 hover:underline truncate"
                  >
                    {displayName}
                  </a>
                  <p className="text-sm text-gray-500 truncate">
                    @{user.login}
                  </p>
                </div>
                {user.site_admin && (
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              {user.email && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 truncate">
                    📧 {user.email}
                  </p>
                </div>
              )}
              {starredAtLabel && (
                <div className="mt-auto px-4 pb-4">
                  <p className="text-xs text-gray-400">
                    Starred at {starredAtLabel}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
