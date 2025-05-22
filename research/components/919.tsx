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
  // 1. Data transformation and derived constants
  const users = Array.isArray(value) ? value : [];

  // 2. Handle empty state
  if (users.length === 0) {
    return (
      <p className="p-4 text-center text-gray-500">
        No users to display.
      </p>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="space-y-4">
      {users.map((user) => {
        const displayName = user.name?.trim() || user.login;
        return (
          <div
            key={user.id}
            className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <img
              src={user.avatar_url}
              alt={`${displayName} avatar`}
              className="w-12 h-12 rounded-full mr-4 flex-shrink-0"
            />
            <div className="flex flex-col flex-grow min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {displayName}
                </h2>
                {user.site_admin && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium text-white bg-red-600 rounded">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{user.login}</p>
              {user.email && (
                <p className="text-sm text-blue-600 truncate">
                  {user.email}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
