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
  // 1. Data aggregation/transformation
  const users = value;
  // Helper to capitalize a word
  const capitalize = (s: string): string =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // If no users, render a simple placeholder
  if (!users || users.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No users to display.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const loginHandle = user.name ? `@${user.login}` : null;
        const typeLabel = capitalize(user.type);
        const starredAt = user.starred_at
          ? new Date(user.starred_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : null;

        return (
          <div
            key={user.id}
            className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <img
              className="w-12 h-12 rounded-full flex-shrink-0"
              src={user.avatar_url}
              alt={`${user.login} avatar`}
            />
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {displayName}
                </h2>
                {user.site_admin && (
                  <span className="px-2 py-0.5 text-xs font-medium text-red-800 bg-red-100 rounded">
                    Admin
                  </span>
                )}
              </div>
              {loginHandle && (
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {loginHandle}
                </p>
              )}
              {user.email && (
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {user.email}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center space-x-2 text-sm text-gray-500">
                <span className="truncate">{typeLabel}</span>
                {starredAt && (
                  <span className="truncate">Starred: {starredAt}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
