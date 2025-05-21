import { tags } from "typia";
import React from "react";
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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const commitCount = value.length;
  const sortedCommits = [...value].sort(
    (a, b) =>
      new Date(b.committed_at).getTime() -
      new Date(a.committed_at).getTime(),
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-6">
      <div className="text-sm text-gray-600">
        Total Commits: {commitCount}
      </div>
      <div className="space-y-4">
        {sortedCommits.map((commit, idx) => {
          // Format commit date
          const date = new Date(commit.committed_at);
          const formattedDate = date.toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          // User display name
          const user = commit.user;
          const displayName = user
            ? user.name?.trim() || user.login
            : "Unknown";

          // Change status
          const { additions, deletions, total } = commit.change_status;

          return (
            <div
              key={`${commit.version}-${idx}`}
              className="p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-3">
                {user && (
                  <img
                    src={user.avatar_url}
                    alt={displayName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-gray-900 font-semibold truncate">
                    Version {commit.version}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {formattedDate}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center space-x-4 text-sm">
                {additions !== undefined && (
                  <span className="text-green-600">+{additions}</span>
                )}
                {deletions !== undefined && (
                  <span className="text-red-600">-{deletions}</span>
                )}
                {total !== undefined && (
                  <span className="text-gray-700">{total} total</span>
                )}
              </div>
              <div className="mt-2">
                <span className="block text-blue-600 text-sm truncate">
                  {commit.url}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
