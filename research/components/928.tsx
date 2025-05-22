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
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((user) => (
        <div
          key={user.id}
          className="flex items-center p-4 bg-white rounded-lg shadow-sm"
        >
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-12 h-12 rounded-full flex-shrink-0"
          />
          <div className="flex-1 ml-4 overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {user.name || user.login}
            </h3>
            {user.name && (
              <p className="text-sm text-gray-500 truncate">
                @{user.login}
              </p>
            )}
            {user.email && (
              <p className="text-sm text-gray-600 truncate mt-1">
                {user.email}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end space-y-1 ml-4">
            {user.site_admin && (
              <span className="px-2 py-0.5 text-xs font-medium text-white bg-red-500 rounded-full">
                Admin
              </span>
            )}
            {user.starred_at && (
              <span className="px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                Starred {formatDate(user.starred_at)}
              </span>
            )}
            {user.user_view_type && (
              <span className="px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                {user.user_view_type}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
