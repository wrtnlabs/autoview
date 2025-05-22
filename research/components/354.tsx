import LucideReact from "lucide-react";
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
  const fileList = value.files
    ? Object.entries(value.files).reduce<string[]>((acc, [key, file]) => {
        if (file) acc.push(file.filename ?? key);
        return acc;
      }, [])
    : [];
  const filesCount = fileList.length;
  const commentsCount = value.comments ?? 0;
  const forksCount = value.forks?.length ?? 0;
  const historyCount = value.history?.length ?? 0;
  const isPublic = value["public"] ?? false;

  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const owner = value.owner;
  const ownerName = owner ? owner.name || owner.login : "";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    ownerName || "Gist",
  )}&background=64748b&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-4">
      <div className="flex-shrink-0">
        {owner ? (
          <img
            src={owner.avatar_url}
            alt={ownerName}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = avatarFallback;
            }}
            className="w-16 h-16 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
            <LucideReact.User className="text-gray-400" size={32} />
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <h2
            className="text-lg font-semibold text-gray-800 truncate"
            title={fileList[0] || "Gist"}
          >
            {fileList[0] || "Gist"}
          </h2>
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full uppercase ${
              isPublic
                ? "bg-green-100 text-green-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {isPublic ? "Public" : "Private"}
          </span>
        </div>
        {value.description != null && (
          <p className="mt-2 text-gray-600 line-clamp-2">
            {value.description || (
              <span className="italic text-gray-400">No description</span>
            )}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <LucideReact.FileText size={16} className="text-gray-400" />
            <span>
              {filesCount} {filesCount === 1 ? "file" : "files"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.MessageSquare size={16} className="text-gray-400" />
            <span>
              {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.GitBranch size={16} className="text-gray-400" />
            <span>
              {forksCount} {forksCount === 1 ? "fork" : "forks"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Clock size={16} className="text-gray-400" />
            <span>
              {historyCount} {historyCount === 1 ? "revision" : "revisions"}
            </span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-6 text-sm text-gray-500">
          {createdAt && (
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <time dateTime={value.created_at}>{createdAt}</time>
            </div>
          )}
          {updatedAt && (
            <div className="flex items-center gap-1">
              <LucideReact.Edit2 size={16} className="text-gray-400" />
              <time dateTime={value.updated_at}>{updatedAt}</time>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
