import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // Derived constants and helper functions
  const users = value;
  const getFallbackAvatar = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;

  // Empty state
  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No users available</span>
      </div>
    );
  }

  // Main render
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const fallbackSrc = getFallbackAvatar(displayName);

        return (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 mb-4">
              <img
                src={user.avatar_url}
                alt={displayName}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = fallbackSrc;
                }}
              />
            </div>
            <a
              href={user.html_url}
              className="flex items-center text-indigo-600 hover:underline truncate font-medium"
            >
              <LucideReact.Link size={16} className="mr-1" />
              <span className="truncate">{user.login}</span>
            </a>
            {user.name && (
              <span className="text-gray-600 mt-1 truncate">{user.name}</span>
            )}
            {user.email && (
              <div className="flex items-center text-gray-500 mt-2 truncate">
                <LucideReact.Mail size={16} className="mr-1" />
                <span className="truncate">{user.email}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 mt-3">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full truncate">
                {user.type}
              </span>
              {user.site_admin && (
                <div className="flex items-center text-green-500">
                  <LucideReact.CheckCircle size={16} className="mr-1" />
                  <span className="text-xs font-medium">Admin</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
