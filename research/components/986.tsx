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
  // Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <p className="text-lg">No users available.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {value.map((user: AutoViewInputSubTypes.simple_user) => {
        const displayName = user.name?.trim() || user.login;
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={user.id}
            className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md"
          >
            <div className="w-24 h-24 mb-3 rounded-full overflow-hidden bg-gray-100">
              <img
                src={user.avatar_url}
                alt={displayName}
                className="object-cover w-full h-full"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = avatarFallback;
                }}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {displayName}
            </h3>
            <p className="flex items-center mt-1 text-gray-500 text-sm truncate">
              <LucideReact.User size={16} className="mr-1" />
              @{user.login}
            </p>
            {user.email && (
              <p className="flex items-center mt-1 text-gray-500 text-sm truncate">
                <LucideReact.Mail size={16} className="mr-1" />
                {user.email}
              </p>
            )}
            <p className="flex items-center mt-1 text-gray-500 text-sm truncate">
              <LucideReact.Link size={16} className="mr-1" />
              {user.html_url}
            </p>
            {user.site_admin && (
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <LucideReact.CheckCircle size={16} className="mr-1" />
                Site Admin
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
