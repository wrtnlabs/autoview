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
  // Helper to format ISO dates into "Mon DD, YYYY"
  const formatDate = (iso?: string): string => {
    if (!iso) return '';
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="p-4 bg-gray-100 text-gray-500 text-center rounded">
        No users available.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {value.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const profileUrl = user.html_url;
        const isAdmin = user.site_admin;
        const userType = user.type;
        const email = user.email;
        const starredAt = user.starred_at ? formatDate(user.starred_at) : null;

        return (
          <li
            key={user.id}
            className="flex items-center p-4 bg-white rounded-lg shadow"
          >
            <img
              src={user.avatar_url}
              alt={`${displayName} avatar`}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline truncate"
                >
                  {displayName}
                </a>
                {isAdmin && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                    Admin
                  </span>
                )}
                <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {userType}
                </span>
              </div>
              {email && (
                <div className="text-sm text-gray-500 truncate">{email}</div>
              )}
              {starredAt && (
                <div className="text-xs text-gray-400 mt-1">
                  Starred at {starredAt}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
