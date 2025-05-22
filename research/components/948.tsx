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
  //    We derive displayName and ensure email fallback.
  const users = Array.isArray(value) ? value : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users to display.</p>
      ) : (
        users.map((user) => {
          const displayName = user.name?.trim() || user.login;
          const emailLine = user.email
            ? user.email
            : null;
          return (
            <div
              key={user.id}
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={user.avatar_url}
                alt={`${displayName} avatar`}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div className="ml-4 flex-1 min-w-0">
                <h3 className="text-gray-900 font-semibold text-base truncate">
                  {displayName}
                </h3>
                <p className="text-gray-500 text-sm truncate">
                  @{user.login}
                </p>
                {emailLine && (
                  <p className="text-gray-500 text-sm truncate">
                    {emailLine}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    {user.type || 'User'}
                  </span>
                  {user.site_admin && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
