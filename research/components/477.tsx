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
  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No users to display.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {value.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const starredAt = formatDate(user.starred_at);
        return (
          <div
            key={user.id}
            className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <img
              src={user.avatar_url}
              alt={displayName}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {displayName}
              </h2>
              <p className="text-gray-500 truncate">@{user.login}</p>
              {user.email && (
                <p className="text-gray-500 truncate">{user.email}</p>
              )}
              {starredAt && (
                <p className="text-sm text-gray-400">Starred: {starredAt}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                  {user.type}
                </span>
                {user.site_admin && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium text-red-800 bg-red-100 rounded">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
