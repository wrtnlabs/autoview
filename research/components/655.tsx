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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const users = value;
  const userCount = users.length;
  const userLabel = userCount === 1 ? "User" : "Users";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {userCount === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-lg">No users found</span>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-700 font-medium">
            {userCount} {userLabel}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => {
              const displayName = user.name ?? user.login;
              const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName
              )}&background=0D8ABC&color=fff`;

              return (
                <div
                  key={user.id}
                  className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <img
                    src={user.avatar_url}
                    alt={displayName}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.onerror = null;
                      img.src = fallbackAvatar;
                    }}
                  />
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {displayName}
                      </h3>
                      {user.site_admin && (
                        <LucideReact.BadgeCheck
                          className="text-blue-500 flex-shrink-0"
                          size={16}
                          aria-label="Site Admin"
                        />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">@{user.login}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 truncate">
                      <LucideReact.Link size={16} className="flex-shrink-0" />
                      <span className="truncate">{user.html_url}</span>
                    </div>
                    {user.email && (
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 truncate">
                        <LucideReact.Mail size={16} className="flex-shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
