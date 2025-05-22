import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Gist Simple
   *
   * @title Gist Simple
   */
  export type gist_simple = {
    forks?:
      | {
          id?: string;
          url?: string & tags.Format<"uri">;
          user?: AutoViewInputSubTypes.public_user;
          created_at?: string & tags.Format<"date-time">;
          updated_at?: string & tags.Format<"date-time">;
        }[]
      | null;
    history?: AutoViewInputSubTypes.gist_history[] | null;
    /**
     * Gist
     *
     * @title Gist
     */
    fork_of?: {
      url: string & tags.Format<"uri">;
      forks_url: string & tags.Format<"uri">;
      commits_url: string & tags.Format<"uri">;
      id: string;
      node_id: string;
      git_pull_url: string & tags.Format<"uri">;
      git_push_url: string & tags.Format<"uri">;
      html_url: string & tags.Format<"uri">;
      files: {
        [key: string]: {
          filename?: string;
          type?: string;
          language?: string;
          raw_url?: string;
          size?: number & tags.Type<"int32">;
        };
      };
      public: boolean;
      created_at: string & tags.Format<"date-time">;
      updated_at: string & tags.Format<"date-time">;
      description: string | null;
      comments: number & tags.Type<"int32">;
      comments_enabled?: boolean;
      user: AutoViewInputSubTypes.nullable_simple_user;
      comments_url: string & tags.Format<"uri">;
      owner?: AutoViewInputSubTypes.nullable_simple_user;
      truncated?: boolean;
      forks?: any[];
      history?: any[];
    } | null;
    url?: string;
    forks_url?: string;
    commits_url?: string;
    id?: string;
    node_id?: string;
    git_pull_url?: string;
    git_push_url?: string;
    html_url?: string;
    files?: {
      [key: string]: {
        filename?: string;
        type?: string;
        language?: string;
        raw_url?: string;
        size?: number & tags.Type<"int32">;
        truncated?: boolean;
        content?: string;
        /**
         * The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.
         */
        encoding?: string & tags.Default<"utf-8">;
      } | null;
    };
    public?: boolean;
    created_at?: string;
    updated_at?: string;
    description?: string | null;
    comments?: number & tags.Type<"int32">;
    comments_enabled?: boolean;
    user?: string | null;
    comments_url?: string;
    owner?: AutoViewInputSubTypes.simple_user;
    truncated?: boolean;
  };
  /**
   * Public User
   *
   * @title Public User
   */
  export type public_user = {
    login: string;
    id: number & tags.Type<"int32">;
    user_view_type?: string;
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
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: (string & tags.Format<"email">) | null;
    notification_email?: (string & tags.Format<"email">) | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username?: string | null;
    public_repos: number & tags.Type<"int32">;
    public_gists: number & tags.Type<"int32">;
    followers: number & tags.Type<"int32">;
    following: number & tags.Type<"int32">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    plan?: {
      collaborators: number & tags.Type<"int32">;
      name: string;
      space: number & tags.Type<"int32">;
      private_repos: number & tags.Type<"int32">;
    };
    private_gists?: number & tags.Type<"int32">;
    total_private_repos?: number & tags.Type<"int32">;
    owned_private_repos?: number & tags.Type<"int32">;
    disk_usage?: number & tags.Type<"int32">;
    collaborators?: number & tags.Type<"int32">;
  };
  /**
   * Gist History
   *
   * @title Gist History
   */
  export type gist_history = {
    user?: AutoViewInputSubTypes.nullable_simple_user;
    version?: string;
    committed_at?: string & tags.Format<"date-time">;
    change_status?: {
      total?: number & tags.Type<"int32">;
      additions?: number & tags.Type<"int32">;
      deletions?: number & tags.Type<"int32">;
    };
    url?: string & tags.Format<"uri">;
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
export type AutoViewInput = AutoViewInputSubTypes.gist_simple[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived values
  const gists = value ?? [];

  // 2. Component JSX
  if (gists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-400 mb-2" />
        <span className="text-lg">No gists available</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {gists.map((gist, idx) => {
        // Owner info
        const owner = gist.owner;
        const ownerName = owner?.login ?? "Unknown";
        const avatarSrc = owner?.avatar_url;
        // Dates
        const createdAt = gist.created_at
          ? new Date(gist.created_at).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : null;
        // Files
        const fileNames = gist.files
          ? Object.keys(gist.files).filter((k) => gist.files?.[k] != null)
          : [];
        const fileCount = fileNames.length;
        const displayedFiles = fileNames.slice(0, 3);
        const moreFiles = fileCount - displayedFiles.length;
        // Counts
        const forksCount = gist.forks ? gist.forks.length : 0;
        const commentsCount =
          typeof gist.comments === "number" ? gist.comments : 0;
        // Description
        const description =
          typeof gist.description === "string" &&
          gist.description.trim().length > 0
            ? gist.description
            : "No description";

        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            {/* Header: owner & date */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={ownerName}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        ownerName,
                      )}&background=0D8ABC&color=fff`;
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <LucideReact.User size={16} />
                  </div>
                )}
                <span className="text-gray-800 font-medium">{ownerName}</span>
              </div>
              {createdAt && (
                <div className="flex items-center text-gray-500 text-sm">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  <span>{createdAt}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm line-clamp-2 mb-3">
              {description}
            </p>

            {/* Files */}
            {fileCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <LucideReact.FileText size={16} className="text-gray-500" />
                {displayedFiles.map((name) => (
                  <span
                    key={name}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {name}
                  </span>
                ))}
                {moreFiles > 0 && (
                  <span className="text-gray-500 text-xs">
                    +{moreFiles} more
                  </span>
                )}
              </div>
            )}

            {/* Stats: forks & comments */}
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <LucideReact.GitFork size={16} />
                <span>{forksCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.MessageCircle size={16} />
                <span>{commentsCount}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
