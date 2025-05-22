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
export type AutoViewInput = AutoViewInputSubTypes.gist_simple;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const ownerLogin: string = value.owner?.login ?? value.user ?? "Unknown";
  const avatarUrl: string =
    value.owner?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(ownerLogin)}&background=64748B&color=fff`;
  const createdDate: string | null = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const updatedDate: string | null = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const fileNames: string[] = value.files
    ? Object.keys(value.files).filter((key) => value.files![key] !== null)
    : [];
  const forksCount: number = Array.isArray(value.forks)
    ? value.forks.length
    : 0;
  const historyCount: number = Array.isArray(value.history)
    ? value.history.length
    : 0;
  const commentsCount: number =
    typeof value.comments === "number" ? value.comments : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Owner Info */}
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={avatarUrl}
          alt={`${ownerLogin} avatar`}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              ownerLogin,
            )}&background=64748B&color=fff`;
          }}
        />
        <div className="flex-1 truncate">
          <p className="font-semibold text-gray-800 truncate">{ownerLogin}</p>
          {createdDate && (
            <div className="flex items-center text-gray-500 text-sm">
              <LucideReact.Calendar size={16} className="mr-1" />
              <span>Created: {createdDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {value.description}
        </p>
      )}

      {/* File list */}
      {fileNames.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-600 text-sm font-medium mb-1">Files:</p>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-0.5">
            {fileNames.map((name) => (
              <li key={name} className="truncate">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Metadata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between text-gray-500 text-sm space-y-2 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <LucideReact.GitBranch size={16} className="mr-1" />
            <span>{forksCount}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Clock size={16} className="mr-1" />
            <span>{historyCount}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.MessageCircle size={16} className="mr-1" />
            <span>{commentsCount}</span>
          </div>
        </div>
        {updatedDate && (
          <div className="flex items-center">
            <LucideReact.RefreshCcw size={16} className="mr-1" />
            <span>Updated: {updatedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
