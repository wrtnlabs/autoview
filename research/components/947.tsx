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
  // Fallback avatar URL generator for missing images
  const getAvatarFallback = (login: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      login,
    )}&background=0D8ABC&color=fff`;

  // Function to format ISO date strings to a readable format
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // Return a grid of user cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {value.map((user) => {
        const displayName = user.name?.trim() || user.login;
        const email = user.email?.trim();
        const starredAt = user.starred_at;

        return (
          <div
            key={user.login}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
              <img
                src={user.avatar_url}
                alt={displayName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = getAvatarFallback(
                    user.login,
                  );
                }}
              />
            </div>
            <h3
              title={displayName}
              className="mt-3 text-lg font-semibold text-gray-800 truncate"
            >
              {displayName}
            </h3>
            {displayName !== user.login && (
              <p className="text-sm text-gray-500 truncate">{user.login}</p>
            )}
            {email && (
              <div className="mt-2 flex items-center gap-1 text-gray-600">
                <LucideReact.Mail size={16} />
                <span className="text-sm truncate">{email}</span>
              </div>
            )}
            <div className="mt-2 flex items-center gap-2">
              {user.site_admin && (
                <div
                  className="flex items-center text-blue-500"
                  title="Site Administrator"
                >
                  <LucideReact.ShieldCheck size={16} />
                </div>
              )}
              {starredAt && (
                <div
                  className="flex items-center text-gray-500"
                  title="Last starred"
                >
                  <LucideReact.Clock size={16} />
                  <span className="ml-1 text-sm">{formatDate(starredAt)}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
