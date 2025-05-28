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
  const users = value || [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4">
      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span className="text-lg">No users available</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => {
            const displayName = user.name?.trim() || user.login;
            const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName,
            )}&background=random`;
            return (
              <div
                key={user.id}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow"
              >
                <img
                  src={user.avatar_url}
                  alt={`${displayName} avatar`}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = fallbackAvatar;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {displayName}
                  </h3>
                  <div className="text-xs text-gray-500 truncate">
                    @{user.login}
                  </div>
                  {user.email && (
                    <div className="mt-1 flex items-center text-xs text-gray-500 truncate">
                      <LucideReact.Mail size={14} className="mr-1 flex-shrink-0" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {user.site_admin && (
                    <div className="mt-1 inline-flex items-center text-xs text-green-600">
                      <LucideReact.CheckCircle size={14} className="mr-1 flex-shrink-0" />
                      <span>Administrator</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
