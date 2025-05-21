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
  //    Here, we derive displayName, userType, and format starred_at into a readable date.
  const users = value;
  const formatDate = (iso?: string | null): string | null => {
    if (!iso) return null;
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!users || users.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No users to display.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => {
        const displayName = user.name?.trim() ? user.name! : user.login;
        const userType =
          user.user_view_type?.trim().charAt(0).toUpperCase() +
          user.user_view_type!.trim().slice(1) ||
          user.type.charAt(0).toUpperCase() + user.type.slice(1);
        const starredAt = formatDate(user.starred_at || null);

        return (
          <div
            key={user.id}
            className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <img
              src={user.avatar_url}
              alt={`${displayName} avatar`}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {displayName}
                </h3>
                {user.site_admin && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate">
                @{user.login}
              </p>
              {user.email && (
                <p className="text-sm text-gray-700 truncate">
                  {user.email}
                </p>
              )}
              <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 space-x-2">
                <span className="truncate">{userType}</span>
                {starredAt && (
                  <>
                    <span>•</span>
                    <span className="truncate">
                      Starred at {starredAt}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
