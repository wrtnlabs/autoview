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
  // Empty state when there are no users
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <p>No users available.</p>
      </div>
    );
  }

  // Render a responsive grid of user cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {value.map((user) => {
        // Derive a display name and avatar fallback URL
        const displayName = user.name?.trim() || user.login;
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            {/* Avatar */}
            <div className="w-full aspect-square bg-gray-100">
              <img
                src={user.avatar_url}
                alt={`${displayName} avatar`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src = avatarFallback;
                }}
              />
            </div>

            {/* User details */}
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {displayName}
              </h2>
              <p className="text-sm text-gray-500 truncate">@{user.login}</p>

              {user.email && (
                <div className="flex items-center text-gray-600 mt-2">
                  <LucideReact.Mail size={16} className="mr-1 flex-shrink-0" />
                  <span className="text-sm truncate">{user.email}</span>
                </div>
              )}

              {user.html_url && (
                <div className="flex items-center text-gray-600 mt-1">
                  <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
                  <span className="text-xs truncate break-all">{user.html_url}</span>
                </div>
              )}

              {/* Badges */}
              <div className="mt-auto pt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  {user.type}
                </span>
                {user.site_admin && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    <LucideReact.ShieldCheck size={12} className="mr-0.5" />
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
