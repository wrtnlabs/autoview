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
  // 1. Data transformations and defaults
  const users = value ?? [];

  // Placeholder URL generator for avatar fallback
  const getFallbackAvatar = (displayName: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-400" />
        <span className="mt-2 text-lg">No users available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {users.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const email = user.email?.trim() || null;
        const starredAt = user.starred_at
          ? new Date(user.starred_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : null;

        return (
          <div
            key={user.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
              <img
                src={user.avatar_url}
                alt={`${displayName} avatar`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = getFallbackAvatar(displayName);
                }}
              />
            </div>
            <div className="mt-3 text-center">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {displayName}
              </h3>
              <p className="text-sm text-gray-500 truncate">@{user.login}</p>
            </div>
            <div className="flex items-center mt-2 space-x-2">
              {user.site_admin ? (
                <LucideReact.CheckCircle
                  size={16}
                  className="text-green-500"
                  aria-label="Site Admin"
                />
              ) : (
                <LucideReact.User
                  size={16}
                  className="text-gray-400"
                  aria-label={user.type}
                />
              )}
              <span className="text-sm text-gray-600 capitalize">
                {user.type}
              </span>
            </div>
            {email && (
              <div className="flex items-center mt-2 text-sm text-gray-500 truncate">
                <LucideReact.Mail size={16} className="mr-1" />
                <span>{email}</span>
              </div>
            )}
            {starredAt && (
              <div className="flex items-center mt-2 text-sm text-gray-500 truncate">
                <LucideReact.Star size={16} className="mr-1 text-yellow-400" />
                <span>Starred {starredAt}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
