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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const users = value;

  // Helper to format starred date
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => {
          const displayName = user.name ?? user.login;
          const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName,
          )}&background=random`;
          const starredAt = user.starred_at
            ? formatDate(user.starred_at)
            : null;

          return (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow flex flex-col items-center text-center p-4"
            >
              <img
                src={user.avatar_url}
                alt={`${displayName} avatar`}
                className="w-24 h-24 rounded-full object-cover mb-3"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackAvatar;
                }}
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {displayName}
              </h3>
              <p className="text-sm text-gray-500 mb-2">@{user.login}</p>

              {user.email && (
                <div className="flex items-center text-gray-600 mb-2 truncate">
                  <LucideReact.Mail size={16} className="mr-1" />
                  <span className="text-sm">{user.email}</span>
                </div>
              )}

              <div className="flex items-center text-gray-600 mb-2">
                <LucideReact.User size={16} className="mr-1" />
                <span className="text-sm">{user.type}</span>
              </div>

              <div className="flex items-center mb-2">
                {user.site_admin ? (
                  <>
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500 mr-1"
                    />
                    <span className="text-sm text-green-600">Admin</span>
                  </>
                ) : (
                  <>
                    <LucideReact.XCircle
                      size={16}
                      className="text-red-500 mr-1"
                    />
                    <span className="text-sm text-red-500">User</span>
                  </>
                )}
              </div>

              {starredAt && (
                <div className="flex items-center text-gray-600">
                  <LucideReact.Star
                    size={16}
                    className="text-yellow-500 mr-1"
                  />
                  <span className="text-sm">Starred on {starredAt}</span>
                </div>
              )}
            </div>
          );
        })}

        {users.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-10">
            <LucideReact.AlertCircle size={48} className="text-gray-400 mb-4" />
            <span className="text-gray-500">No users to display.</span>
          </div>
        )}
      </div>
    </div>
  );
}
