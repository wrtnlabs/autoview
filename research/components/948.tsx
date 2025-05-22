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
  // Derive a consistent fallback avatar based on GitHub login
  const getAvatarFallback = (login: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=0D8ABC&color=fff`;

  const users = Array.isArray(value) ? value : [];

  // Empty state
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-400" />
        <p className="mt-4">No users available</p>
      </div>
    );
  }

  // Main grid of user cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {users.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const fallbackSrc = getAvatarFallback(user.login);

        return (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center"
          >
            <img
              src={user.avatar_url}
              alt={`${displayName} avatar`}
              className="w-24 h-24 rounded-full object-cover mb-4"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.onerror = null;
                img.src = fallbackSrc;
              }}
            />

            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {displayName}
            </h3>
            {user.name && (
              <p className="text-sm text-gray-500">@{user.login}</p>
            )}

            <div className="mt-3 space-y-1 w-full">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <LucideReact.Link size={16} className="mr-1" />
                <span className="truncate">{user.html_url}</span>
              </div>

              {user.email && (
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <LucideReact.Mail size={16} className="mr-1" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}

              {user.site_admin && (
                <div className="flex items-center justify-center text-sm text-green-600">
                  <LucideReact.CheckCircle size={16} className="mr-1" />
                  <span>Administrator</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
