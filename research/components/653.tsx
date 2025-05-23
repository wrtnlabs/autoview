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
  // 1. Data transformation
  const users = Array.isArray(value) ? value : [];
  const userCount = users.length;

  // 2. JSX composition with Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Users className="text-gray-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-700">
          {userCount} GitHub User{userCount !== 1 ? "s" : ""}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          const displayName = user.name ?? user.login;
          const isAdmin = user.site_admin;
          const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            const initials = encodeURIComponent(
              displayName
                .split(" ")
                .map((n) => n[0] ?? "")
                .join("")
            );
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff`;
          };

          return (
            <div
              key={user.id}
              className="flex items-center p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <img
                  src={user.avatar_url}
                  alt={`${displayName} avatar`}
                  onError={handleError}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-center">
                  <p className="text-md font-medium text-gray-800 truncate">
                    {displayName}
                  </p>
                  {isAdmin && (
                    <LucideReact.CheckCircle
                      className="ml-2 text-green-500 flex-shrink-0"
                      size={16}
                      aria-label="Site Admin"
                      role="img"
                    />
                  )}
                </div>
                <div className="mt-1 text-sm text-gray-500 flex items-center truncate">
                  <LucideReact.AtSign
                    className="mr-1 text-gray-400"
                    size={14}
                  />
                  <span>{user.login}</span>
                </div>
                {user.email && (
                  <div className="mt-1 text-sm text-gray-500 flex items-center truncate">
                    <LucideReact.Mail
                      className="mr-1 text-gray-400"
                      size={14}
                    />
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
