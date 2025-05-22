import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Base Gist
   *
   * @title Base Gist
   */
  export type base_gist = {
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
        /**
         * The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.
         */
        encoding?: string & tags.Default<"utf-8">;
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
    owner?: AutoViewInputSubTypes.simple_user;
    truncated?: boolean;
    forks?: any[];
    history?: any[];
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
export type AutoViewInput = AutoViewInputSubTypes.base_gist;

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const author = value.owner || value.user;
  const authorName = author?.name?.trim() || author?.login || "Unknown";
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName,
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = author?.avatar_url || avatarPlaceholder;
  const fileCount = Object.keys(value.files).length;
  const languages = Array.from(
    new Set(
      Object.values(value.files)
        .map((f) => f.language)
        .filter(Boolean) as string[],
    ),
  );
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const forksCount = value.forks?.length ?? 0;
  const commentsCount = value.comments;
  const description = value.description?.trim();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm max-w-md mx-auto flex flex-col space-y-4">
      {/* Author Info */}
      <div className="flex items-center space-x-3">
        <img
          src={avatarSrc}
          alt={authorName}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = avatarPlaceholder;
          }}
        />
        <div className="flex flex-col">
          <span className="text-gray-900 font-medium">{authorName}</span>
          {author?.login && (
            <span className="text-gray-500 text-xs">@{author.login}</span>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        {description ? (
          <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
        ) : (
          <p className="text-gray-500 italic text-sm">
            No description provided.
          </p>
        )}
      </div>

      {/* Languages */}
      {languages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <span
              key={lang}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
            >
              {lang}
            </span>
          ))}
        </div>
      )}

      {/* Stats & Links */}
      <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-1">
            <LucideReact.FileText size={16} className="text-gray-500" />
            <span>
              {fileCount} {fileCount === 1 ? "file" : "files"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.MessageCircle size={16} className="text-gray-500" />
            <span>{commentsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.GitBranch size={16} className="text-gray-500" />
            <span>{forksCount}</span>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} className="text-gray-500" />
            <span>{createdDate}</span>
          </div>
          <div className="flex items-center gap-1 max-w-[150px]">
            <LucideReact.Link size={16} className="text-gray-500" />
            <span className="truncate">{value.html_url}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
