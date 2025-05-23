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
  // Fallback avatar generator
  const fallbackAvatarUrl = (login: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=0D8ABC&color=fff`;

  const users: AutoViewInput = value ?? [];

  // Empty state
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.User size={48} className="mb-2" />
        <span className="text-sm">No users available</span>
      </div>
    );
  }

  // Render user cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => {
        const displayName = user.name?.trim() || user.login;
        return (
          <div
            key={user.id}
            className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            {/* Avatar */}
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src={user.avatar_url}
                alt={`${displayName}'s avatar`}
                className="w-full h-full rounded-full object-cover border"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackAvatarUrl(user.login);
                }}
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {displayName}
              </h3>
              <p className="text-sm text-gray-500 truncate">@{user.login}</p>

              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {user.email && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <LucideReact.Mail size={16} />
                    <span className="truncate max-w-[120px]">{user.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-gray-600">
                  <LucideReact.Tag size={16} />
                  <span className="capitalize">{user.type}</span>
                </div>
                {user.site_admin && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <LucideReact.ShieldUser size={16} aria-label="Site Admin" />
                    <span>Admin</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
