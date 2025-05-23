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
  // If no users, show empty state
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center text-gray-400 py-8">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span className="text-lg">No users available.</span>
      </div>
    );
  }

  // Compose user cards in a responsive grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {value.map((user) => {
        const displayName = user.name ?? user.login;
        const email = user.email ?? "";
        const starredAt = user.starred_at
          ? new Date(user.starred_at).toLocaleDateString()
          : null;

        return (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-5 flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <div className="w-24 h-24 mb-4">
              <img
                src={user.avatar_url}
                alt={`${displayName}'s avatar`}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      displayName
                    )}&background=0D8ABC&color=fff`;
                }}
              />
            </div>

            {/* Name and Login */}
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {displayName}
            </h2>
            {user.name && (
              <p className="text-gray-500 text-sm truncate">
                @{user.login}
              </p>
            )}

            {/* Email */}
            {email && (
              <div className="flex items-center text-gray-600 text-sm mt-3 w-full justify-center">
                <LucideReact.Mail size={16} className="mr-1" />
                <span className="truncate">{email}</span>
              </div>
            )}

            {/* Type */}
            <div className="flex items-center text-gray-600 text-sm mt-3 w-full justify-center">
              <LucideReact.Tag size={16} className="mr-1" />
              <span className="capitalize truncate">{user.type}</span>
            </div>

            {/* Site Admin Status */}
            <div className="flex items-center text-sm mt-3 w-full justify-center">
              {user.site_admin ? (
                <>
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500 mr-1"
                    aria-label="Admin"
                  />
                  <span className="text-green-600">Admin</span>
                </>
              ) : (
                <>
                  <LucideReact.User
                    size={16}
                    className="text-gray-400 mr-1"
                    aria-label="User"
                  />
                  <span className="text-gray-600">User</span>
                </>
              )}
            </div>

            {/* Starred Date */}
            {starredAt && (
              <div className="flex items-center text-gray-600 text-sm mt-3 w-full justify-center">
                <LucideReact.Star
                  size={16}
                  className="text-amber-400 mr-1"
                />
                <span className="truncate">Starred on {starredAt}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
