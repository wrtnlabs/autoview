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
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {value.map((user) => {
        const displayName = user.name ?? user.login;
        const isAdmin = user.site_admin;
        const starredAt = user.starred_at
          ? formatDate(user.starred_at)
          : null;

        return (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col"
          >
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar_url}
                alt={`${displayName} avatar`}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-gray-900 font-semibold text-lg truncate">
                  {user.login}
                </h3>
                {user.name && (
                  <p className="text-gray-500 text-sm truncate">
                    {user.name}
                  </p>
                )}
              </div>
              {isAdmin && (
                <span className="ml-auto text-xs font-medium bg-red-600 text-white px-2 py-1 rounded-full">
                  ADMIN
                </span>
              )}
            </div>

            <div className="mt-3 space-y-1 text-gray-700 text-sm flex-grow">
              {user.email && (
                <p className="truncate">
                  <span className="font-medium text-gray-800">
                    Email:&nbsp;
                  </span>
                  {user.email}
                </p>
              )}
              {starredAt && (
                <p>
                  <span className="font-medium text-gray-800">
                    Starred:&nbsp;
                  </span>
                  {starredAt}
                </p>
              )}
              <p>
                <span className="font-medium text-gray-800">
                  Type:&nbsp;
                </span>
                {user.type}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
