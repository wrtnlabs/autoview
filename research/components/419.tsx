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
  const users = Array.isArray(value) ? value : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-lg">No users found</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {users.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=random&color=fff`;
        return (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center text-center p-4"
          >
            <img
              src={user.avatar_url}
              alt={`${displayName} avatar`}
              className="w-16 h-16 rounded-full object-cover mb-3"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.onerror = null;
                img.src = avatarFallback;
              }}
            />
            <h3 className="text-lg font-semibold text-gray-800 truncate w-full">
              {displayName}
            </h3>
            <p className="text-sm text-gray-500 truncate w-full mb-2">
              @{user.login}
            </p>
            {user.email && (
              <div className="flex items-center text-gray-600 text-sm mb-1 w-full truncate">
                <LucideReact.Mail size={16} className="mr-1 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            )}
            <div className="flex items-center text-gray-500 text-sm mb-2 w-full truncate">
              <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
              <span className="truncate">{user.html_url}</span>
            </div>
            <div className="mt-auto flex items-center text-sm">
              {user.site_admin ? (
                <LucideReact.CheckCircle
                  size={16}
                  className="text-green-500"
                  aria-label="Site administrator"
                />
              ) : (
                <LucideReact.XCircle
                  size={16}
                  className="text-gray-400"
                  aria-label="Regular user"
                />
              )}
              <span className="ml-1 text-gray-600">
                {user.site_admin ? "Admin" : "User"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
