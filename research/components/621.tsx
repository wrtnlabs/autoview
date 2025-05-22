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
  const hasUsers = Array.isArray(users) && users.length > 0;

  // Helper: format display name
  const getDisplayName = (user: AutoViewInputSubTypes.simple_user) =>
    user.name?.trim() || user.login;

  // Helper: handle image error
  const onAvatarError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    displayName: string,
  ) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName,
    )}&background=0D8ABC&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {!hasUsers ? (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span>No users available.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => {
            const displayName = getDisplayName(user);
            return (
              <div
                key={user.id}
                className="flex flex-col items-center bg-white rounded-lg shadow-md p-4"
              >
                <img
                  src={user.avatar_url}
                  alt={`${displayName} avatar`}
                  className="w-16 h-16 rounded-full object-cover mb-4"
                  onError={(e) => onAvatarError(e, displayName)}
                />
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {displayName}
                </h3>
                <p className="text-gray-500 text-sm mb-2 truncate">
                  @{user.login}
                </p>
                {user.email && (
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-2 truncate w-full">
                    <LucideReact.Mail size={16} className="text-gray-400" />
                    <span className="truncate">{user.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                  <LucideReact.User size={16} className="text-gray-400" />
                  <span>{user.type}</span>
                </div>
                {user.site_admin && (
                  <div className="flex items-center gap-1 text-green-600 text-sm mb-2">
                    <LucideReact.CheckCircle size={16} />
                    <span>Site Admin</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-gray-600 text-sm truncate w-full">
                  <LucideReact.Link size={16} className="text-gray-400" />
                  <span className="truncate">{user.html_url}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
