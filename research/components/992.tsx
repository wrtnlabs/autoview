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
  const userCount = value.length;
  const adminCount = value.filter((u) => u.site_admin).length;
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          GitHub Users ({userCount})
        </h2>
        {adminCount > 0 && (
          <span className="text-sm font-medium text-gray-700">
            {adminCount} Admin{adminCount > 1 ? "s" : ""}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {value.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow p-4 flex items-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full mr-4 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {user.name || user.login}
              </h3>
              {user.name && (
                <p className="text-sm text-gray-500 truncate">
                  @{user.login}
                </p>
              )}
              {user.email && (
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              )}
              <div className="mt-1 flex flex-wrap items-center space-x-2">
                <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
                  {user.type}
                </span>
                {user.site_admin && (
                  <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                    Admin
                  </span>
                )}
                {user.starred_at && (
                  <span className="text-xs text-gray-400">
                    Starred {formatDate(user.starred_at)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
