import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Commit
   *
   * @title Commit
   */
  export type commit = {
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
    author:
      | AutoViewInputSubTypes.simple_user
      | AutoViewInputSubTypes.empty_object
      | null;
    committer:
      | AutoViewInputSubTypes.simple_user
      | AutoViewInputSubTypes.empty_object
      | null;
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
  };
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
  export type verification = {
    verified: boolean;
    reason: string;
    payload: string | null;
    signature: string | null;
    verified_at: string | null;
  };
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
  /**
   * An object without any properties.
   *
   * @title Empty Object
   */
  export type empty_object = {};
  /**
   * Diff Entry
   *
   * @title Diff Entry
   */
  export type diff_entry = {
    sha: string;
    filename: string;
    status:
      | "added"
      | "removed"
      | "modified"
      | "renamed"
      | "copied"
      | "changed"
      | "unchanged";
    additions: number & tags.Type<"int32">;
    deletions: number & tags.Type<"int32">;
    changes: number & tags.Type<"int32">;
    blob_url: string & tags.Format<"uri">;
    raw_url: string & tags.Format<"uri">;
    contents_url: string & tags.Format<"uri">;
    patch?: string;
    previous_filename?: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.commit;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const commitDateStr =
    value.commit.author?.date ?? value.commit.committer?.date;
  const commitDate = commitDateStr ? new Date(commitDateStr) : null;
  const formattedDate = commitDate
    ? commitDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      ", " +
      commitDate.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";
  const authorInfo =
    value.author && "avatar_url" in value.author && value.author.avatar_url
      ? value.author
      : null;
  const authorName =
    authorInfo?.login ?? value.commit.author?.name ?? "Unknown";
  const avatarUrl =
    authorInfo?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      authorName,
    )}&background=0D8ABC&color=fff`;
  const additions = value.stats?.additions ?? 0;
  const deletions = value.stats?.deletions ?? 0;
  const parentsCount = value.parents.length;
  const files = value.files ?? [];
  const displayedFiles = files.slice(0, 3);
  const remainingFiles = files.length - displayedFiles.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Commit message */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
        {value.commit.message}
      </h3>

      {/* Author and date */}
      <div className="flex items-center mb-4">
        <img
          src={avatarUrl}
          alt={authorName}
          className="w-8 h-8 rounded-full object-cover mr-2"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                authorName,
              )}&background=0D8ABC&color=fff`;
          }}
        />
        <div>
          <p className="text-sm font-medium text-gray-700">{authorName}</p>
          {formattedDate && (
            <div className="flex items-center text-gray-500 text-xs">
              <LucideReact.Calendar size={14} className="mr-1" />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats: additions, deletions, parents */}
      <div className="flex items-center text-gray-600 text-sm space-x-4 mb-4">
        <div className="flex items-center">
          <LucideReact.Plus
            className="text-green-500 mr-1"
            size={16}
            strokeWidth={2}
          />
          <span>{additions}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Minus
            className="text-red-500 mr-1"
            size={16}
            strokeWidth={2}
          />
          <span>{deletions}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.GitBranch
            className="text-gray-500 mr-1"
            size={16}
            strokeWidth={2}
          />
          <span>
            {parentsCount} parent{parentsCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* File changes */}
      {files.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Changed files
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {displayedFiles.map((file) => (
              <li key={file.sha} className="flex items-center gap-2">
                <LucideReact.FileText
                  size={16}
                  className="text-gray-500"
                  strokeWidth={2}
                />
                <span className="truncate">
                  {file.filename}{" "}
                  <span className="italic text-gray-400">({file.status})</span>
                </span>
              </li>
            ))}
            {remainingFiles > 0 && (
              <li className="text-sm text-gray-500">+ {remainingFiles} more</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
