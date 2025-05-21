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
  // 1. Handle empty data
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No gists available.
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((gist) => {
        // Derived values
        const author = gist.owner ?? gist.user;
        const displayLogin = author?.login ?? "Unknown";
        const avatarUrl = author?.avatar_url;
        const fileCount = Object.keys(gist.files).length;
        const descriptionText = gist.description?.trim() || "No description";
        const formattedCreated = new Date(gist.created_at).toLocaleString(
          undefined,
          { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }
        );
        const formattedUpdated = new Date(gist.updated_at).toLocaleDateString(
          undefined,
          { year: "numeric", month: "short", day: "numeric" }
        );

        return (
          <div
            key={gist.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col"
          >
            <div className="flex items-center px-4 py-3 border-b border-gray-100">
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt={displayLogin}
                  className="w-8 h-8 rounded-full mr-3 flex-shrink-0"
                />
              )}
              <span className="text-gray-800 font-medium truncate">
                {displayLogin}
              </span>
              <span
                className={`ml-auto text-xs font-semibold ${
                  gist.public ? "text-green-600" : "text-red-600"
                }`}
              >
                {gist.public ? "Public" : "Private"}
              </span>
            </div>
            <div className="flex-1 px-4 py-3">
              <h3 className="text-gray-900 font-semibold text-base mb-2 line-clamp-2">
                {descriptionText}
              </h3>
              <div className="flex items-center text-xs text-gray-500 space-x-4">
                <span>
                  {fileCount} file{fileCount !== 1 ? "s" : ""}
                </span>
                <span>
                  {gist.comments} comment{gist.comments !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-xs text-gray-400 flex justify-between">
              <span>Created: {formattedCreated}</span>
              <span>Updated: {formattedUpdated}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
