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

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4">
      {/* Header with total count */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          GitHub Users ({userCount})
        </h2>
      </div>
      {/* Responsive grid of user cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-4 bg-white rounded-lg shadow transition-shadow hover:shadow-md"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full flex-shrink-0"
            />
            <div className="ml-4 overflow-hidden">
              {/* Display full name if available, otherwise login */}
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {user.name ?? user.login}
              </h3>
              {/* Display login as subtitle only when name is present */}
              {user.name && (
                <p className="text-sm text-gray-500 truncate">
                  @{user.login}
                </p>
              )}
              {/* Display email if available */}
              {user.email && (
                <p className="text-sm text-gray-500 truncate">
                  {user.email}
                </p>
              )}
              {/* Badge for site administrators */}
              {user.site_admin && (
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium text-white bg-red-500 rounded">
                  ADMIN
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
