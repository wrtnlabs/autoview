import * as LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.commit[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const commits = Array.isArray(value) ? value : [];
  if (commits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No commits available.</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <ul className="space-y-4">
      {commits.map((item) => {
        // Author display name and avatar logic
        const authorLogin =
          item.author && "login" in item.author && item.author.login
            ? item.author.login
            : undefined;
        const commitMetaName = item.commit.author?.name;
        const displayName = authorLogin || commitMetaName || "Unknown Author";
        const hasAvatar =
          item.author &&
          "avatar_url" in item.author &&
          typeof item.author.avatar_url === "string";
        const avatarSrc = hasAvatar
          ? (item.author as any).avatar_url
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              displayName,
            )}&background=0D8ABC&color=fff`;

        // Commit message and SHA
        const fullMessage = item.commit.message || "";
        const messageTitle = fullMessage.split("\n")[0];
        const shortSha = item.sha.slice(0, 7);

        // Commit date formatting
        const dateStr = item.commit.author?.date ?? item.commit.committer?.date;
        const formattedDate = dateStr
          ? new Date(dateStr).toLocaleDateString("default", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Unknown date";

        // Stats aggregation
        const fileCount = item.files?.length ?? 0;
        const additions =
          item.stats?.additions ??
          (item.files
            ? item.files.reduce((sum, f) => sum + f.additions, 0)
            : 0);
        const deletions =
          item.stats?.deletions ??
          (item.files
            ? item.files.reduce((sum, f) => sum + f.deletions, 0)
            : 0);

        return (
          <li
            key={item.sha}
            className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-lg shadow"
          >
            <img
              src={avatarSrc}
              alt={displayName}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  displayName,
                )}&background=0D8ABC&color=fff`;
              }}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="mt-3 sm:mt-0 sm:ml-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-gray-900 font-medium">{messageTitle}</h3>
                <span className="mt-1 sm:mt-0 text-sm text-gray-500 flex items-center">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  {formattedDate}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600 space-x-2">
                <span className="font-mono bg-gray-100 px-1 rounded">
                  {shortSha}
                </span>
                {fileCount > 0 && (
                  <span className="flex items-center">
                    <LucideReact.FileText
                      size={16}
                      className="text-gray-400 mr-1"
                    />
                    {fileCount} file{fileCount > 1 ? "s" : ""}
                  </span>
                )}
                {additions > 0 && (
                  <span className="flex items-center text-green-600">
                    <LucideReact.Plus
                      size={16}
                      className="mr-1 text-green-500"
                    />
                    +{additions}
                  </span>
                )}
                {deletions > 0 && (
                  <span className="flex items-center text-red-600">
                    <LucideReact.Minus
                      size={16}
                      className="mr-1 text-red-500"
                    />
                    -{deletions}
                  </span>
                )}
              </div>
              <a
                href={item.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-blue-500 hover:underline text-sm"
              >
                <LucideReact.Link size={16} />
                <span className="ml-1">View on GitHub</span>
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
