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
  // Derived constants
  const userCount = value.length;
  const header = (
    <div className="mb-4 flex items-center gap-2 text-gray-700">
      <LucideReact.Users size={20} className="text-gray-500" />
      <span className="text-lg font-semibold">
        {userCount} {userCount === 1 ? "User" : "Users"}
      </span>
    </div>
  );

  // No-data state
  if (userCount === 0) {
    return (
      <div className="p-4 flex flex-col items-center text-gray-400">
        {header}
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No users available</span>
      </div>
    );
  }

  // Main rendering
  return (
    <div className="p-4">
      {header}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {value.map((user: AutoViewInputSubTypes.simple_user) => {
          const displayName = user.name ?? user.login;
          const starredAt = user.starred_at
            ? new Date(user.starred_at).toLocaleDateString()
            : null;

          return (
            <li
              key={user.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              {/* Avatar and basic info */}
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar_url}
                  alt={`${displayName} avatar`}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        displayName
                      )}&background=0D8ABC&color=fff`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-gray-800 truncate">
                      {displayName}
                    </span>
                    <span className="text-xs text-gray-500 uppercase bg-gray-100 px-1 py-px rounded">
                      {user.type}
                    </span>
                    {user.site_admin && (
                      <LucideReact.CheckCircle
                        size={16}
                        className="text-blue-500"
                        aria-label="Site Admin"
                      />
                    )}
                  </div>
                  <div className="mt-1 text-sm text-gray-500 truncate">
                    @{user.login}
                  </div>
                </div>
              </div>

              {/* Contact & links */}
              <div className="mt-3 space-y-1">
                {user.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <LucideReact.Mail size={16} className="text-gray-400" />
                    <span className="ml-1 truncate">{user.email}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <LucideReact.Link size={16} className="text-gray-400" />
                  <span className="ml-1 truncate">{user.html_url}</span>
                </div>
                {starredAt && (
                  <div className="flex items-center text-sm text-gray-600">
                    <LucideReact.Star size={16} className="text-yellow-400" />
                    <span className="ml-1">Starred at {starredAt}</span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
