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
  const gists = Array.isArray(value) ? value : [];

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  if (gists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No Gists Available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {gists.map((gist) => {
        const files = gist.files || {};
        const fileNames = Object.keys(files);
        const fileCount = fileNames.length;
        const firstFile = fileNames[0] || "No files";
        const createdDate = formatDate(gist.created_at);
        const updatedDate = formatDate(gist.updated_at);
        const owner = gist.owner ?? gist.user;
        const ownerName = owner?.login ?? "Unknown";
        const avatarUrl =
          owner?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(ownerName)}`;

        return (
          <article
            key={gist.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Owner and Visibility */}
            <header className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                <img
                  src={avatarUrl}
                  alt={ownerName}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        ownerName,
                      )}`;
                  }}
                />
              </div>
              <span className="text-sm font-medium truncate">{ownerName}</span>
              <span className="ml-auto">
                {gist.public ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                    aria-label="Public"
                  />
                ) : (
                  <LucideReact.Lock
                    className="text-red-500"
                    size={16}
                    aria-label="Private"
                  />
                )}
              </span>
            </header>

            {/* Title / Description */}
            <h2 className="text-base font-semibold mb-1 truncate">
              {gist.description || firstFile}
            </h2>
            {gist.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {gist.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
              <div className="flex items-center">
                <LucideReact.FileText
                  size={14}
                  className="text-blue-500 mr-1"
                  aria-label="Files"
                />
                <span>
                  {fileCount} file{fileCount !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.MessageSquare
                  size={14}
                  className="text-gray-400 mr-1"
                  aria-label="Comments"
                />
                <span>{gist.comments}</span>
              </div>
            </div>

            {/* Dates */}
            <footer className="mt-auto">
              <div className="flex items-center text-xs text-gray-400 space-x-2">
                <LucideReact.Calendar size={12} />
                <span>Created: {createdDate}</span>
              </div>
              <div className="flex items-center text-xs text-gray-400 space-x-2 mt-1">
                <LucideReact.Calendar size={12} />
                <span>Updated: {updatedDate}</span>
              </div>
            </footer>
          </article>
        );
      })}
    </div>
  );
}
