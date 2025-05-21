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
  
  // Helper to format optional ISO dates
  const formatDate = (iso?: string): string =>
    iso ? new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!users || users.length === 0) {
    return (
      <p className="p-4 text-center text-gray-500">
        No users found.
      </p>
    );
  }

  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const starredDate = formatDate(user.starred_at);
        const isAdmin = user.site_admin;

        return (
          <div
            key={user.id}
            className="flex items-center bg-white rounded-lg shadow-sm hover:shadow-md transition p-4"
          >
            <img
              className="w-12 h-12 rounded-full flex-shrink-0"
              src={user.avatar_url}
              alt={displayName}
            />
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline truncate"
                  title={displayName}
                >
                  {displayName}
                </a>
                {isAdmin && (
                  <span className="px-2 py-0.5 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              {user.email && (
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {user.email}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-400 truncate">
                Type: {user.type}
              </p>
              {starredDate && (
                <p className="mt-1 text-xs text-gray-400">
                  Starred on {starredDate}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
