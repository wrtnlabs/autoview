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
  // 1. Data aggregation/transformation
  // Treat `value` as an array of GitHub users
  const users = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    If no users, show an empty state.
  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <p className="text-lg">No users available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-12 h-12 flex-shrink-0 rounded-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              const nameForAvatar = user.name ?? user.login;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                nameForAvatar,
              )}&background=0d8abc&color=fff`;
            }}
          />
          <div className="flex-1 ml-4 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {user.login}
            </h2>
            {user.name && (
              <p className="text-sm text-gray-600 truncate">{user.name}</p>
            )}
            {user.email && (
              <div className="flex items-center text-sm text-gray-500 truncate">
                <LucideReact.Mail size={16} className="mr-1 flex-shrink-0" />
                <span>{user.email}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end justify-between ml-4 space-y-1">
            <div className="flex items-center text-sm text-gray-500">
              <LucideReact.User size={16} className="mr-1 flex-shrink-0" />
              <span className="capitalize">{user.type}</span>
            </div>
            {user.site_admin && (
              <div className="flex items-center text-sm text-green-600">
                <LucideReact.CheckCircle
                  size={16}
                  className="mr-1 flex-shrink-0"
                />
                <span>Admin</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
