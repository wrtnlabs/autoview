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
  const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // 2. Handle empty data case
  if (!value || value.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No users available.
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const displayEmail = user.email?.trim();
        const userType = capitalize(user.type);
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
            className="flex flex-col sm:flex-row items-start bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={user.avatar_url}
              alt={`${displayName} avatar`}
              className="w-full sm:w-16 h-16 object-cover rounded-t-lg sm:rounded-full sm:rounded-l-lg"
            />
            <div className="flex-1 p-4">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {displayName}
              </h2>
              <p className="text-sm text-gray-500">@{user.login}</p>
              {displayEmail && (
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {displayEmail}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                  {userType}
                </span>
                {user.site_admin && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                    Admin
                  </span>
                )}
                {starredAt && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                    Starred: {starredAt}
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
