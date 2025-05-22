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
  // 1. Derived constants and helper functions
  const users = value;
  const getAvatarFallback = (login: string): string =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=0D8ABC&color=fff`;

  // 2. Render empty state
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={36} className="mb-2" />
        <span>No users available.</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => {
          const displayName = user.name?.trim() ? user.name! : user.login;
          return (
            <li
              key={user.id}
              className="flex items-start space-x-4 bg-white rounded-lg shadow hover:shadow-md transition p-4"
            >
              <img
                src={user.avatar_url}
                alt={`Avatar of ${displayName}`}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = getAvatarFallback(user.login);
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 truncate">
                  {displayName}
                </h3>
                <p className="text-sm text-gray-500 truncate">@{user.login}</p>

                {user.email && (
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-2 truncate">
                    <LucideReact.Mail size={16} />
                    <span className="truncate">{user.email}</span>
                  </div>
                )}

                <div className="flex items-center gap-1 text-sm text-gray-500 mt-2 truncate">
                  <LucideReact.Link size={16} />
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline truncate"
                  >
                    View Profile
                  </a>
                </div>

                {user.site_admin && (
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                    <LucideReact.CheckCircle size={16} />
                    <span>Site Admin</span>
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
