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
  // Transform input array
  const users = value ?? [];

  // Empty state placeholder
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
        <LucideReact.AlertCircle className="text-gray-300" size={48} />
        <p className="mt-4">No users to display.</p>
      </div>
    );
  }

  // Compose visual user cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => {
        const displayName = user.name && user.name.trim() ? user.name : user.login;
        return (
          <div
            key={user.id}
            className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex-shrink-0">
              <img
                src={user.avatar_url}
                alt={displayName}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName,
                  )}&background=0D8ABC&color=fff`;
                }}
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-gray-900 truncate">{displayName}</h2>
                {user.site_admin && (
                  <LucideReact.ShieldCheck
                    className="ml-2 text-blue-500"
                    size={16}
                    aria-label="Site Admin"
                  />
                )}
              </div>
              <p className="text-sm text-gray-500">@{user.login}</p>
              {user.email && (
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <LucideReact.Mail className="text-gray-400 mr-1" size={16} />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
              <div className="flex items-center mt-2 space-x-2 text-xs">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded">
                  {user.type}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
