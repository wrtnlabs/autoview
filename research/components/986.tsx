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
  // Compose the user cards grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {value.map((user, index) => {
        // Derived display name: prefer name, fallback to login
        const displayName = user.name?.trim() ? user.name : user.login;
        // Email may be null
        const email = user.email ?? null;
        // Site admin badge flag
        const isAdmin = user.site_admin;

        return (
          <div
            key={index}
            className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={user.avatar_url}
              alt={`${displayName} avatar`}
              className="w-16 h-16 rounded-full flex-shrink-0"
            />
            <div className="ml-4 flex-1 overflow-hidden">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {displayName}
              </h2>
              <p className="text-sm text-gray-600 truncate">
                @{user.login}
              </p>
              {email && (
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {email}
                </p>
              )}
            </div>
            {isAdmin && (
              <span className="ml-3 inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                Admin
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
