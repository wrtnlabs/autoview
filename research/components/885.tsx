import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.simple_user[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const users = value;
  const totalUsers = users.length;

  // Generates a placeholder avatar based on the user's display name
  const fallbackAvatar = (displayName: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {/* Header with total count */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          GitHub Users ({totalUsers})
        </h2>
      </div>

      {/* Empty state */}
      {totalUsers === 0 ? (
        <div className="flex flex-col items-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2">No users available.</p>
        </div>
      ) : (
        // Grid of user cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => {
            const displayName = user.name ?? user.login;
            return (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={user.avatar_url}
                    alt={`${displayName}'s avatar`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = fallbackAvatar(displayName);
                    }}
                  />
                </div>

                {/* User details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-md font-medium text-gray-900 truncate">
                    {displayName}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-1 truncate">
                    <LucideReact.AtSign size={14} />
                    <span className="truncate">{user.login}</span>
                  </div>
                  {user.email && (
                    <div className="flex items-center text-sm text-gray-500 space-x-1 truncate">
                      <LucideReact.Mail size={14} />
                      <span className="truncate">{user.email}</span>
                    </div>
                  )}
                </div>

                {/* Admin badge and type */}
                <div className="flex flex-col items-end space-y-1">
                  {user.site_admin && (
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={16}
                      aria-label="Site Admin"
                    />
                  )}
                  <span className="text-xs text-gray-500 capitalize">
                    {user.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
