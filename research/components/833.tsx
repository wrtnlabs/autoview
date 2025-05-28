import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Commit
     *
     * @title Commit
    */
    export interface commit {
        url: string & tags.Format<"uri">;
        sha: string;
        node_id: string;
        html_url: string & tags.Format<"uri">;
        comments_url: string & tags.Format<"uri">;
        commit: {
            url: string & tags.Format<"uri">;
            author: AutoViewInputSubTypes.nullable_git_user;
            committer: AutoViewInputSubTypes.nullable_git_user;
            message: string;
            comment_count: number & tags.Type<"int32">;
            tree: {
                sha: string;
                url: string & tags.Format<"uri">;
            };
            verification?: AutoViewInputSubTypes.verification;
        };
        author: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.empty_object | null;
        committer: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.empty_object | null;
        parents: {
            sha: string;
            url: string & tags.Format<"uri">;
            html_url?: string & tags.Format<"uri">;
        }[];
        stats?: {
            additions?: number & tags.Type<"int32">;
            deletions?: number & tags.Type<"int32">;
            total?: number & tags.Type<"int32">;
        };
        files?: AutoViewInputSubTypes.diff_entry[];
    }
    /**
     * Metaproperties for Git author/committer information.
     *
     * @title Git User
    */
    export type nullable_git_user = {
        name?: string;
        email?: string;
        date?: string;
    } | null;
    /**
     * @title Verification
    */
    export interface verification {
        verified: boolean;
        reason: string;
        payload: string | null;
        signature: string | null;
        verified_at: string | null;
    }
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
    /**
     * An object without any properties.
     *
     * @title Empty Object
    */
    export interface empty_object {
    }
    /**
     * Diff Entry
     *
     * @title Diff Entry
    */
    export interface diff_entry {
        sha: string;
        filename: string;
        status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
        additions: number & tags.Type<"int32">;
        deletions: number & tags.Type<"int32">;
        changes: number & tags.Type<"int32">;
        blob_url: string & tags.Format<"uri">;
        raw_url: string & tags.Format<"uri">;
        contents_url: string & tags.Format<"uri">;
        patch?: string;
        previous_filename?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.commit[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Empty state when there are no commits
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span>No commits available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((commitItem) => {
        // Derive author name safely
        const authorName =
          commitItem.commit.author?.name ??
          (commitItem.author && "login" in commitItem.author
            ? commitItem.author.login
            : undefined) ??
          "Unknown";

        // Format commit date
        const dateStr = commitItem.commit.author?.date
          ? new Date(commitItem.commit.author.date).toLocaleString("default", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "";

        const shortSha = commitItem.sha.slice(0, 7);
        const additions = commitItem.stats?.additions ?? 0;
        const deletions = commitItem.stats?.deletions ?? 0;
        const commentsCount = commitItem.commit.comment_count;

        return (
          <div
            key={commitItem.sha}
            className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between"
          >
            {/* Commit message and meta */}
            <div className="flex items-start md:items-center gap-4">
              <LucideReact.GitCommit
                className="text-gray-400"
                size={20}
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <a
                  href={commitItem.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline truncate max-w-xs"
                >
                  {commitItem.commit.message}
                </a>
                <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-x-3 gap-y-1">
                  <div className="flex items-center gap-1">
                    <LucideReact.User size={14} aria-hidden="true" />
                    <span>{authorName}</span>
                  </div>
                  {dateStr && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Calendar size={14} aria-hidden="true" />
                      <span>{dateStr}</span>
                    </div>
                  )}
                  <span className="font-mono text-gray-400">{shortSha}</span>
                </div>
              </div>
            </div>

            {/* Commit stats and actions */}
            <div className="mt-3 md:mt-0 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {/* Verification */}
              {commitItem.commit.verification && (
                commitItem.commit.verification.verified ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                    aria-label="Verified"
                  />
                ) : (
                  <LucideReact.AlertTriangle
                    className="text-red-500"
                    size={16}
                    aria-label="Unverified"
                  />
                )
              )}

              {/* Additions & Deletions */}
              {(additions > 0 || deletions > 0) && (
                <div className="flex items-center gap-4">
                  {additions > 0 && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Plus
                        className="text-green-500"
                        size={16}
                        aria-hidden="true"
                      />
                      <span>{additions}</span>
                    </div>
                  )}
                  {deletions > 0 && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Minus
                        className="text-red-500"
                        size={16}
                        aria-hidden="true"
                      />
                      <span>{deletions}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Comment count */}
              <a
                href={commitItem.comments_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-gray-800"
              >
                <LucideReact.MessageCircle size={16} aria-hidden="true" />
                <span>{commentsCount}</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
