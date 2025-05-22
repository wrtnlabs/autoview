import LucideReact from "lucide-react";
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
  // Helper to format ISO dates to a human-readable form
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // Ensure we always have an array to map over
  const users = Array.isArray(value) ? value : [];

  // Render a responsive grid of user cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => {
        // Determine display name fallback
        const displayName = user.name?.trim() || user.login;
        // Fallback avatar using initials
        const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=ccc&color=fff`;

        // Image onError handler to swap to placeholder
        const handleImgError = (
          e: React.SyntheticEvent<HTMLImageElement, Event>,
        ) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = placeholderAvatar;
        };

        return (
          <div
            key={user.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="w-16 h-16 mb-3">
              <img
                src={user.avatar_url}
                alt={`${displayName} avatar`}
                onError={handleImgError}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              {displayName}
            </h3>
            <p className="text-sm text-gray-500">@{user.login}</p>

            {user.email && (
              <div className="flex items-center mt-2 text-sm text-gray-600 truncate">
                <LucideReact.Mail size={16} className="mr-1" />
                <span>{user.email}</span>
              </div>
            )}

            <div className="flex items-center mt-2 text-sm text-gray-600 truncate">
              <LucideReact.Link size={16} className="mr-1" />
              <span>{user.html_url}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {user.site_admin && (
                <span className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  <LucideReact.CheckCircle size={14} className="mr-1" />
                  Admin
                </span>
              )}
              {user.starred_at && (
                <span className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                  <LucideReact.Star size={14} className="mr-1" />
                  Starred {formatDate(user.starred_at)}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
