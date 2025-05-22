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
  const userCount = users.length;
  const dateOpts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-800">
        GitHub Users ({userCount})
      </h2>

      {userCount === 0 ? (
        <p className="mt-2 text-gray-600">No users to display.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {users.map((user: AutoViewInputSubTypes.simple_user) => {
            const displayName = user.name?.trim() || user.login;
            const formattedStarredAt = user.starred_at
              ? new Date(user.starred_at).toLocaleDateString(undefined, dateOpts)
              : null;

            return (
              <li
                key={user.id}
                className="flex items-start p-4 bg-white rounded-lg shadow-sm"
              >
                <img
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                  className="w-12 h-12 rounded-full flex-shrink-0"
                />
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-gray-900 font-medium truncate">
                    {displayName}
                  </p>
                  {user.name && (
                    <p className="text-gray-500 text-sm truncate">
                      @{user.login}
                    </p>
                  )}
                  {user.email && (
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {user.email}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-medium">
                      {user.type}
                    </span>
                    {user.site_admin && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-100 text-red-800 text-xs font-medium">
                        Admin
                      </span>
                    )}
                    {user.user_view_type && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800 text-xs font-medium">
                        {user.user_view_type}
                      </span>
                    )}
                    {formattedStarredAt && (
                      <span className="text-gray-400 text-xs">
                        Starred {formattedStarredAt}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
