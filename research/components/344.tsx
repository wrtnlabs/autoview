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

  // 2 & 3. Compose the visual structure using JSX and Tailwind CSS and return the React element.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2">No gists available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((gist) => {
        const fileNames = Object.keys(gist.files);
        const fileCount = fileNames.length;
        const primaryFile = fileNames[0] || "";
        const owner = gist.owner ?? gist.user;
        const login = owner?.login || "User";
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          login,
        )}&background=ccc&color=fff`;
        const avatarUrl = owner?.avatar_url || defaultAvatar;

        return (
          <div
            key={gist.id}
            className="flex flex-col bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex items-center">
              <img
                src={avatarUrl}
                alt={`${login} avatar`}
                onError={(e) => {
                  e.currentTarget.src = defaultAvatar;
                }}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="ml-2 font-medium text-gray-800">{login}</span>
              <span className="ml-auto flex items-center text-gray-500 text-sm">
                <LucideReact.Calendar size={16} />
                <time className="ml-1">{formatDate(gist.updated_at)}</time>
              </span>
            </div>
            <div className="mt-2">
              <p className="text-gray-700 line-clamp-2">
                {gist.description || "No description"}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
              <div className="flex items-center">
                <LucideReact.FileText size={16} className="text-indigo-500" />
                <span className="ml-1">
                  {fileCount} file{fileCount !== 1 ? "s" : ""}
                </span>
              </div>
              {primaryFile && (
                <div className="flex items-center max-w-xs">
                  <LucideReact.Tag size={16} className="text-gray-400" />
                  <span className="ml-1 truncate">{primaryFile}</span>
                </div>
              )}
              <div className="flex items-center">
                <LucideReact.MessageCircle
                  size={16}
                  className="text-gray-400"
                />
                <span className="ml-1">{gist.comments}</span>
              </div>
              <a
                href={gist.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center ml-auto text-blue-500 hover:underline"
              >
                <LucideReact.Link size={16} />
                <span className="ml-1">View</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
