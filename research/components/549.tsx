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
  // Function to format ISO date into a readable string.
  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((user, idx) => {
        const displayName = user.name?.trim() || user.login;
        const email = user.email?.trim();
        const starredAt = formatDate(user.starred_at);
        return (
          <div
            key={user.id ?? idx}
            className="flex items-center p-4 bg-white rounded-lg shadow-sm"
          >
            <img
              src={user.avatar_url}
              alt={displayName + " avatar"}
              className="w-12 h-12 rounded-full flex-shrink-0"
            />
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h2 className="text-gray-900 font-medium truncate">
                  {displayName}
                </h2>
                {user.site_admin && (
                  <span className="text-xs font-semibold text-white bg-red-500 rounded-full px-2 py-0.5">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm truncate">@{user.login}</p>
              {email && (
                <p className="text-gray-500 text-sm truncate">{email}</p>
              )}
              <div className="mt-1 flex space-x-2 text-xs text-gray-400">
                <span>{user.type}</span>
                {starredAt && <span>★ Starred: {starredAt}</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
