import { tags } from "typia";
import React from "react";
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
        "public": boolean;
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
  // Format a date string into a human-readable format.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Render nothing if there is no data.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No gists available.
      </div>
    );
  }

  // Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((gist) => {
        const author = gist.owner ?? gist.user;
        const login = author?.login ?? "Unknown";
        const avatar = author?.avatar_url;
        const description = gist.description?.trim() || "No description";
        const created = formatDate(gist.created_at);
        const filesCount = Object.keys(gist.files || {}).length;
        const commentsCount = gist.comments;
        const isPublic = gist.public;

        return (
          <div
            key={gist.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            {/* Header: Avatar, Username, Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {avatar && (
                  <img
                    src={avatar}
                    alt={`${login} avatar`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-gray-800 font-medium truncate">
                  {login}
                </span>
              </div>
              <span className="text-sm text-gray-500">{created}</span>
            </div>

            {/* Description */}
            <p className="mt-2 text-gray-700 text-sm line-clamp-2">
              {description}
            </p>

            {/* Footer: badges for files, comments, visibility */}
            <div className="mt-3 flex flex-wrap items-center space-x-4 text-xs">
              <span className="flex-shrink-0 bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                {filesCount} file{filesCount !== 1 ? "s" : ""}
              </span>
              <span className="flex-shrink-0 bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                {commentsCount} comment{commentsCount !== 1 ? "s" : ""}
              </span>
              <span
                className={`flex-shrink-0 px-2 py-0.5 rounded ${
                  isPublic
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {isPublic ? "Public" : "Private"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
