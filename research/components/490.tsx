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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const users = value;
  const getAvatarFallback = (displayName: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;

  // 2. Handle empty state
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2">No users available.</p>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {users.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const avatarFallback = getAvatarFallback(displayName);

        return (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
              <img
                src={user.avatar_url}
                alt={displayName}
                className="w-full h-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = avatarFallback;
                }}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {displayName}
            </h3>
            <p className="text-sm text-gray-500 truncate">@{user.login}</p>

            {user.email && (
              <div className="flex items-center text-sm text-gray-500 mt-2 truncate">
                <LucideReact.Mail size={16} className="mr-1" />
                <span>{user.email}</span>
              </div>
            )}

            <div className="flex items-center text-sm text-gray-500 mt-2 break-all">
              <LucideReact.Link size={16} className="mr-1" />
              <span>{user.html_url}</span>
            </div>

            {user.site_admin && (
              <div className="flex items-center text-sm text-blue-500 mt-2">
                <LucideReact.CheckCircle size={16} className="mr-1" />
                <span>Admin</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
