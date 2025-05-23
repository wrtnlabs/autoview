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
  // Normalize input array
  const users: AutoViewInputSubTypes.simple_user[] = Array.isArray(value) ? value : [];

  // Empty state
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400">
        <LucideReact.AlertCircle size={48} className="animate-pulse" aria-label="No data" role="img" />
        <p className="mt-2 text-sm">No users available.</p>
      </div>
    );
  }

  // Render user grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users.map((user) => {
        // Derive a display name, fallback to login
        const displayName =
          typeof user.name === "string" && user.name.trim().length > 0 ? user.name : user.login;

        return (
          <div
            key={user.id}
            className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={user.avatar_url}
              alt={`${displayName} avatar`}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  displayName,
                )}&background=0D8ABC&color=fff`;
              }}
            />
            <div className="flex-1 ml-4 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 truncate">{displayName}</h2>
                {user.site_admin && (
                  <LucideReact.CheckCircle
                    className="text-blue-500 flex-shrink-0"
                    size={16}
                    aria-label="Site Admin"
                    role="img"
                  />
                )}
              </div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-blue-600 hover:underline flex items-center gap-1 truncate"
              >
                <LucideReact.Link size={16} aria-hidden="true" />
                <span className="truncate">{user.login}</span>
              </a>
              {user.email && (
                <div className="mt-1 text-sm text-gray-600 flex items-center gap-1 truncate">
                  <LucideReact.Mail size={16} aria-hidden="true" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
