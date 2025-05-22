import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Contributor Activity
   *
   * @title Contributor Activity
   */
  export type contributor_activity = {
    author: AutoViewInputSubTypes.nullable_simple_user;
    total: number & tags.Type<"int32">;
    weeks: {
      w?: number & tags.Type<"int32">;
      a?: number & tags.Type<"int32">;
      d?: number & tags.Type<"int32">;
      c?: number & tags.Type<"int32">;
    }[];
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type nullable_simple_user = {
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
  } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.contributor_activity[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Handle empty or invalid data
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No contributor activity data available.</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <LucideReact.Users className="mr-2 text-gray-600" size={20} />
        Contributors
      </h2>
      <ul className="space-y-4">
        {value.map((activity, idx) => {
          const author = activity.author;
          if (!author) return null;

          // Derived display name
          const displayName = author.name?.trim() || author.login;

          // Prepare commit counts sparkline
          const commits = activity.weeks.map((w) => w.c ?? 0);
          const maxCommits = Math.max(...commits, 1);

          return (
            <li key={idx} className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Avatar with fallback */}
                {author.avatar_url ? (
                  <img
                    src={author.avatar_url}
                    alt={`${displayName} avatar`}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          displayName,
                        )}&background=0D8ABC&color=fff`;
                    }}
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <LucideReact.User className="text-gray-400" size={16} />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {displayName}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    @{author.login}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Total commits */}
                <div className="flex items-center text-sm text-gray-700 whitespace-nowrap">
                  <LucideReact.Activity
                    className="mr-1 text-gray-500"
                    size={16}
                  />
                  <span>{activity.total}</span>
                </div>
                {/* Sparkline of weekly commits */}
                <div className="flex items-end h-8 space-x-0.5 overflow-hidden">
                  {commits.map((c, i) => (
                    <div
                      key={i}
                      className="bg-blue-500 w-0.5"
                      style={{ height: `${(c / maxCommits) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
