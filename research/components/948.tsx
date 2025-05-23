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
  const users = value ?? [];
  const userCount = users.length;

  // Empty state when no users are provided
  if (userCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle
          size={48}
          className="text-gray-400"
          aria-label="No users available"
          role="img"
        />
        <p className="mt-4 text-lg">No users available</p>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {/* Header with total user count */}
      <div className="flex items-center mb-4">
        <LucideReact.Users
          size={20}
          className="text-gray-600"
          aria-hidden="true"
        />
        <span className="ml-2 text-lg font-semibold text-gray-900">
          {userCount} Users
        </span>
      </div>

      {/* User grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => {
          const displayName = user.name?.trim() ? user.name! : user.login;
          const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName
          )}&background=0D8ABC&color=fff`;

          return (
            <div
              key={user.id}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              {/* Avatar with fallback */}
              <img
                src={user.avatar_url}
                alt={`${displayName} avatar`}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = avatarFallback;
                }}
              />

              {/* User details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {displayName}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  @{user.login}
                </p>

                <div className="flex items-center space-x-2 mt-1 text-sm">
                  {/* Email, if available */}
                  {user.email && (
                    <div className="flex items-center text-gray-500 truncate">
                      <LucideReact.Mail
                        size={16}
                        className="flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="ml-1 truncate">{user.email}</span>
                    </div>
                  )}

                  {/* Site administrator indicator */}
                  {user.site_admin && (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-blue-500"
                      aria-label="Site administrator"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
