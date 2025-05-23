import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Gist Commit
     *
     * @title Gist Commit
    */
    export interface gist_commit {
        url: string & tags.Format<"uri">;
        version: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        change_status: {
            total?: number & tags.Type<"int32">;
            additions?: number & tags.Type<"int32">;
            deletions?: number & tags.Type<"int32">;
        };
        committed_at: string & tags.Format<"date-time">;
    }
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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCommits = value.length;
  const totalAdditions = value.reduce((sum, commit) => sum + (commit.change_status.additions ?? 0), 0);
  const totalDeletions = value.reduce((sum, commit) => sum + (commit.change_status.deletions ?? 0), 0);
  const commitLabel = totalCommits === 1 ? "Commit" : "Commits";

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const placeholderAvatar = (name: string): string =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center text-gray-700">
          <LucideReact.GitCommit size={20} className="text-gray-500" />
          <span className="ml-2 text-lg font-semibold">
            {totalCommits} {commitLabel}
          </span>
        </div>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center text-green-600">
            <LucideReact.Plus size={16} />
            <span className="ml-1">{totalAdditions}</span>
          </div>
          <div className="flex items-center text-red-600">
            <LucideReact.Minus size={16} />
            <span className="ml-1">{totalDeletions}</span>
          </div>
        </div>
      </div>

      {/* Commit List */}
      <div className="space-y-4">
        {value.map((commit, idx) => {
          const user = commit.user;
          const userName = user ? (user.name ?? user.login) : "Unknown";
          const avatarSrc = user?.avatar_url ?? placeholderAvatar(userName);
          return (
            <div
              key={commit.url + idx}
              className="flex p-4 bg-white rounded-lg shadow-sm"
            >
              <img
                src={avatarSrc}
                alt={userName}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    placeholderAvatar(userName);
                }}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 ml-4 space-y-2">
                {/* Header: Author and Date */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center text-sm text-gray-600 space-x-1">
                    <LucideReact.User size={16} />
                    <span className="font-medium">{userName}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1 sm:mt-0">
                    <LucideReact.Calendar size={16} />
                    <span className="ml-1">{formatDate(commit.committed_at)}</span>
                  </div>
                </div>

                {/* URL */}
                <div className="flex items-center text-sm text-gray-700 space-x-1 truncate">
                  <LucideReact.Link size={16} className="text-gray-500 flex-shrink-0" />
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline truncate"
                  >
                    {commit.url}
                  </a>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center text-green-600">
                    <LucideReact.Plus size={16} />
                    <span className="ml-1">{commit.change_status.additions ?? 0}</span>
                  </div>
                  <div className="flex items-center text-red-600">
                    <LucideReact.Minus size={16} />
                    <span className="ml-1">{commit.change_status.deletions ?? 0}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <LucideReact.Hash size={16} />
                    <span className="ml-1 truncate">{commit.version}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
