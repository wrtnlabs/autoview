import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Gist Commit
   *
   * @title Gist Commit
   */
  export type gist_commit = {
    url: string & tags.Format<"uri">;
    version: string;
    user: AutoViewInputSubTypes.nullable_simple_user;
    change_status: {
      total?: number & tags.Type<"int32">;
      additions?: number & tags.Type<"int32">;
      deletions?: number & tags.Type<"int32">;
    };
    committed_at: string & tags.Format<"date-time">;
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
export type AutoViewInput = AutoViewInputSubTypes.gist_commit[];

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper: Format ISO date-time into human-readable form
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // Helper: Determine avatar URL, with fallback to initials if none
  const getAvatarInfo = (
    user: AutoViewInputSubTypes.nullable_simple_user,
  ): { avatarUrl: string; displayName: string } => {
    if (user) {
      const name = user.name?.trim() || user.login;
      return {
        avatarUrl: user.avatar_url,
        displayName: name,
      };
    }
    return {
      avatarUrl:
        "https://ui-avatars.com/api/?name=Unknown&background=0D8ABC&color=fff",
      displayName: "Unknown User",
    };
  };

  // Empty state
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span className="text-lg">No commits to display</span>
      </div>
    );
  }

  // Main render: Grid of commit cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.map((commit, idx) => {
        const { avatarUrl, displayName } = getAvatarInfo(commit.user);
        const shortSha = commit.version.slice(0, 7);
        const date = formatDate(commit.committed_at);
        const additions = commit.change_status.additions ?? 0;
        const deletions = commit.change_status.deletions ?? 0;
        const total = commit.change_status.total ?? additions + deletions;

        return (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-150"
          >
            {/* Header: Avatar and user info */}
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-12 h-12 rounded-full object-cover bg-gray-100"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://ui-avatars.com/api/?name=Unknown&background=0D8ABC&color=fff";
                }}
              />
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800 truncate">
                  {displayName}
                </div>
                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <LucideReact.Calendar size={14} />
                  <span className="ml-1">{date}</span>
                </div>
              </div>
            </div>

            {/* Commit SHA */}
            <div className="mt-3 text-sm font-mono text-gray-700 truncate">
              {shortSha}
            </div>

            {/* Change statistics */}
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center text-green-600">
                <LucideReact.Plus size={16} strokeWidth={2} />
                <span className="ml-1">{additions}</span>
              </div>
              <div className="flex items-center text-red-600">
                <LucideReact.Minus size={16} strokeWidth={2} />
                <span className="ml-1">{deletions}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <LucideReact.BarChart2 size={16} strokeWidth={2} />
                <span className="ml-1">{total}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
