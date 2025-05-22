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
  // 1. Derived constants for formatting and aggregation
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown date';
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : undefined;
  const description = value.description ?? 'No description provided.';
  const fileEntries = value.files
    ? Object.entries(value.files).filter(([, file]) => file != null)
    : [];
  const fileCount = fileEntries.length;
  const fileNames = fileEntries.map(([name]) => name);
  const forksCount = value.forks?.length ?? 0;
  const commentsCount = value.comments ?? 0;
  const isPublic = value['public'] ?? false;
  const owner = value.owner;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header: Owner info and visibility */}
      <div className="flex items-center p-4">
        {owner ? (
          <img
            src={owner.avatar_url}
            alt={owner.login}
            className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold text-gray-900 truncate">
            {owner ? owner.login : 'Unknown Owner'}
          </p>
          <p className="text-sm text-gray-600">
            {isPublic ? 'Public Gist' : 'Private Gist'}
          </p>
        </div>
      </div>

      {/* Body: Description and file summary */}
      <div className="px-4 pb-4">
        <p className="text-gray-800 mb-3 line-clamp-3">{description}</p>

        {fileCount > 0 && (
          <div className="flex flex-wrap items-center mb-2 space-x-2 text-sm">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
              {fileCount} {fileCount === 1 ? 'File' : 'Files'}
            </span>
            {fileNames.slice(0, 3).map((name) => (
              <span
                key={name}
                className="truncate max-w-[100px] bg-gray-50 text-gray-600 px-2 py-1 rounded"
              >
                {name}
              </span>
            ))}
            {fileCount > 3 && (
              <span className="text-gray-500">+{fileCount - 3} more</span>
            )}
          </div>
        )}

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 2a1 1 0 00-1 1v1h10V3a1 1 0 10-2 0v1H8V3a1 1 0 00-1-1z" />
              <path
                fillRule="evenodd"
                d="M4 6h12v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm2 2v6h8V8H6z"
                clipRule="evenodd"
              />
            </svg>
            Created {createdAt}
          </span>
          {updatedAt && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 018 8h-2a6 6 0 10-6 6v2a8 8 0 010-16z" />
              </svg>
              Updated {updatedAt}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Comments and forks */}
      <div className="border-t px-4 py-2 flex items-center justify-between text-sm text-gray-600">
        <span className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M18 10c0 3.866-3.582 7-8 7-1.317 0-2.555-.277-3.637-.777L2 18l1.777-4.363A7.945 7.945 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
          </svg>
          {commentsCount} {commentsCount === 1 ? 'Comment' : 'Comments'}
        </span>
        <span className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h3v-2H5V5h10v3h2V5a2 2 0 00-2-2H5z" />
            <path d="M14 12l4-4-4-4v3H9v2h5v3z" />
          </svg>
          {forksCount} {forksCount === 1 ? 'Fork' : 'Forks'}
        </span>
      </div>
    </div>
  );
}
