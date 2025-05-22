import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Gist Simple
     *
     * @title Gist Simple
    */
    export type gist_simple = {
        forks?: {
            id?: string;
            url?: string & tags.Format<"uri">;
            user?: any;
            created_at?: string & tags.Format<"date-time">;
            updated_at?: string & tags.Format<"date-time">;
        }[] | null;
        history?: any[] | null;
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
            "public": boolean;
            created_at: string & tags.Format<"date-time">;
            updated_at: string & tags.Format<"date-time">;
            description: string | null;
            comments: number & tags.Type<"int32">;
            comments_enabled?: boolean;
            user: any;
            comments_url: string & tags.Format<"uri">;
            owner?: any;
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
        "public"?: boolean;
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
    export type public_user = any;
    export type gist_history = any;
    export type nullable_simple_user = any;
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
  const owner = value.owner;
  const description = value.description?.trim() || "No description provided.";
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown date";
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // Extract file names
  const fileNames = value.files
    ? Object.values(value.files)
        .filter((f): f is NonNullable<typeof f> => f != null && !!f.filename)
        .map((f) => f.filename!)
    : [];
  const totalFiles = fileNames.length;
  const visibleFiles = fileNames.slice(0, 3);
  const remainingFiles = totalFiles - visibleFiles.length;

  // Counts
  const forksCount = Array.isArray(value.forks) ? value.forks.length : 0;
  const commentsCount = typeof value.comments === "number" ? value.comments : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header: Owner, Dates, Visibility */}
      <div className="flex items-center p-4 space-x-4">
        {owner?.avatar_url && (
          <img
            src={owner.avatar_url}
            alt={owner.login}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 font-semibold truncate">
            {owner?.login || "Unknown User"}
          </p>
          <p className="text-gray-500 text-sm">Created: {createdAt}</p>
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value.public
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value.public ? "Public" : "Private"}
        </span>
      </div>

      {/* Description */}
      <div className="px-4">
        <p className="text-gray-700 text-sm line-clamp-3">{description}</p>
      </div>

      {/* Files List */}
      {totalFiles > 0 && (
        <div className="px-4 mt-4">
          <p className="text-gray-800 text-sm font-medium">
            Files ({totalFiles})
          </p>
          <ul className="mt-1 list-disc list-inside text-gray-600 text-sm">
            {visibleFiles.map((name, idx) => (
              <li key={idx} className="truncate">
                {name}
              </li>
            ))}
            {remainingFiles > 0 && (
              <li className="text-gray-500">... and {remainingFiles} more</li>
            )}
          </ul>
        </div>
      )}

      {/* Footer: Comments, Forks, Updated */}
      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between text-gray-600 text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-lg">💬</span>
          <span>{commentsCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg">🔀</span>
          <span>{forksCount}</span>
        </div>
        {updatedAt && (
          <div className="text-gray-500 truncate">
            Updated: {updatedAt}
          </div>
        )}
      </div>
    </div>
  );
}
