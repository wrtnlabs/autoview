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
  // 1. Data transformation and derived constants
  const users = value;

  // 2. Handle empty state
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No users available</span>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {users.map((user) => {
        const displayName = user.name ?? user.login;
        // Simplify URL display
        const shortUrl = user.html_url.replace(/^https?:\/\//, '');
        return (
          <div
            key={user.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <img
              src={user.avatar_url}
              alt={displayName}
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  displayName,
                )}&background=0D8ABC&color=fff`;
              }}
            />
            <h3 className="mt-2 text-lg font-semibold text-gray-900 truncate">
              {displayName}
            </h3>
            <div className="flex items-center text-gray-500 text-sm mt-1 truncate">
              <LucideReact.User size={16} className="mr-1" />
              <span>{user.login}</span>
            </div>
            {user.email && (
              <div className="flex items-center text-gray-500 text-sm mt-1 truncate">
                <LucideReact.Mail size={16} className="mr-1" />
                <span>{user.email}</span>
              </div>
            )}
            <div className="flex items-center text-gray-500 text-sm mt-1 truncate">
              <LucideReact.Link size={16} className="mr-1" />
              <span>{shortUrl}</span>
            </div>
            <div className="flex items-center mt-2 space-x-2">
              {user.site_admin ? (
                <div className="flex items-center text-green-500 text-sm">
                  <LucideReact.CheckCircle size={16} className="mr-1" />
                  <span>Admin</span>
                </div>
              ) : (
                <div className="flex items-center text-blue-500 text-sm">
                  <LucideReact.User size={16} className="mr-1" />
                  <span>User</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
