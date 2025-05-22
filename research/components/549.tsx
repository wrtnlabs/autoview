import LucideReact from "lucide-react";
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
  // Derived: Check for empty list
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-lg">No users available</span>
      </div>
    );
  }

  // Return a responsive grid of user cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {value.map((user) => {
        // Fallback avatar URL
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name ?? user.login,
        )}&background=0D8ABC&color=fff&size=128`;

        return (
          <div
            key={user.id}
            className="flex flex-col items-center bg-white rounded-lg shadow-md p-5"
          >
            <div className="w-24 h-24 mb-4">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = avatarFallback;
                }}
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {user.name ?? user.login}
              </h3>
              {user.name && (
                <p className="text-sm text-gray-500 truncate">@{user.login}</p>
              )}
            </div>
            <div className="mt-3 w-full space-y-2 text-sm text-gray-600">
              {user.email && (
                <div className="flex items-center gap-1">
                  <LucideReact.Mail size={16} className="text-gray-400" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <LucideReact.Link size={16} className="text-gray-400" />
                <span className="truncate">{user.html_url}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                <LucideReact.User size={14} />
                <span>{user.type}</span>
              </div>
              {user.site_admin && (
                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  <LucideReact.CheckCircle size={14} />
                  <span>Admin</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
