import * as LucideReact from "lucide-react";
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
  // Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle className="text-gray-400 mb-2" size={48} />
        <span>No gists available</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {value.map((gist) => {
        const owner = gist.owner ?? gist.user;
        const fileCount = Object.keys(gist.files).length;
        const description = gist.description?.trim() || "No description";
        const createdDate = new Date(gist.created_at).toLocaleDateString(
          undefined,
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
        );

        return (
          <div
            key={gist.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col"
          >
            {/* Owner Info */}
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                {owner?.avatar_url ? (
                  <img
                    src={owner.avatar_url}
                    alt={`${owner.login} avatar`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        owner.login,
                      )}&background=0D8ABC&color=fff`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>
              <span className="ml-3 font-medium text-gray-800 truncate">
                {owner?.login}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm flex-1 line-clamp-2">
              {description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center text-xs text-gray-500 mt-4 gap-2">
              <div className="flex items-center">
                <LucideReact.FileText
                  size={16}
                  className="text-gray-500 mr-1"
                />
                <span>
                  {fileCount} file{fileCount !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.MessageSquare
                  size={16}
                  className="text-gray-500 mr-1"
                />
                <span>
                  {gist.comments} comment{gist.comments !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center">
                {gist.public ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500 mr-1"
                  />
                ) : (
                  <LucideReact.Lock size={16} className="text-gray-500 mr-1" />
                )}
                <span>{gist.public ? "Public" : "Private"}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar
                  size={16}
                  className="text-gray-400 mr-1"
                />
                <span>Created {createdDate}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
