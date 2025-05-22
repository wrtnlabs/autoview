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
export type AutoViewInput = AutoViewInputSubTypes.base_gist[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={32} />
        <span className="mt-2 text-sm">No gists available</span>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {value.map((gist) => {
        const owner = gist.owner ?? gist.user ?? undefined;
        const ownerName = owner?.login ?? "Unknown";
        const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          ownerName,
        )}&background=random`;
        const fileEntries = Object.values(gist.files);
        const fileCount = fileEntries.length;
        const languages = Array.from(
          new Set(
            fileEntries
              .map((f) => f.language)
              .filter((lang): lang is string => Boolean(lang)),
          ),
        );
        const createdDate = formatDate(gist.created_at);

        return (
          <div
            key={gist.id}
            className="flex flex-col justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            {/* Header: Owner & Visibility */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={owner?.avatar_url ?? fallbackAvatar}
                  alt={`${ownerName} avatar`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackAvatar;
                  }}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="ml-2 text-sm font-medium text-gray-900">
                  {ownerName}
                </span>
              </div>
              {gist["public"] ? (
                <LucideReact.Unlock
                  size={16}
                  className="text-green-500"
                  aria-label="Public gist"
                />
              ) : (
                <LucideReact.Lock
                  size={16}
                  className="text-red-500"
                  aria-label="Private gist"
                />
              )}
            </div>

            {/* Description */}
            <p className="mt-3 text-gray-700 text-sm line-clamp-2">
              {gist.description ?? (
                <span className="italic text-gray-400">No description</span>
              )}
            </p>

            {/* Stats */}
            <div className="mt-4 flex flex-wrap items-center text-gray-500 text-xs space-x-4">
              <div className="flex items-center">
                <LucideReact.FileText size={14} />
                <span className="ml-1">
                  {fileCount} file{fileCount !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.MessageCircle size={14} />
                <span className="ml-1">
                  {gist.comments} comment{gist.comments !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar size={14} />
                <span className="ml-1">{createdDate}</span>
              </div>
            </div>

            {/* Languages */}
            {languages.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-gray-500 text-xs">Languages:</span>
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="text-xs bg-gray-200 text-gray-700 rounded px-2 py-0.5"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
