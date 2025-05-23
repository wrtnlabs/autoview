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
  // 1. Derived constants and helper values
  const userCount = value.length;

  // 2. Handle empty state
  if (userCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No users available.</span>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        GitHub Users ({userCount})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {value.map((user) => {
          // Determine display name
          const displayName =
            user.name && user.name.trim() ? user.name : user.login;
          // Placeholder for avatar fallback
          const placeholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName,
          )}&background=random`;

          return (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center space-y-2"
            >
              <div className="relative">
                <img
                  src={user.avatar_url}
                  alt={displayName}
                  className="w-20 h-20 rounded-full object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholder;
                  }}
                />
                {user.site_admin && (
                  <LucideReact.CheckCircle
                    className="text-green-500 absolute bottom-0 right-0 bg-white rounded-full"
                    size={20}
                    aria-label="Site Admin"
                  />
                )}
              </div>
              <div className="text-lg font-medium text-gray-900 truncate">
                {displayName}
              </div>
              {displayName !== user.login && (
                <div className="text-sm text-gray-500 truncate">
                  @{user.login}
                </div>
              )}
              {user.email && (
                <div className="flex items-center text-sm text-gray-600 truncate">
                  <LucideReact.Mail
                    size={16}
                    className="mr-1 text-gray-400"
                  />
                  <span>{user.email}</span>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <LucideReact.Tag size={16} className="mr-1 text-gray-400" />
                <span>{user.type}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
