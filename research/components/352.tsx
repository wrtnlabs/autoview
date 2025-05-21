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
export type AutoViewInput = AutoViewInputSubTypes.gist_simple[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper: format ISO date strings to a human-friendly date
  const formatDate = (dateStr?: string): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '—';

  // If no gists, display a placeholder
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No gists available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {value.map((gist, index) => {
        const {
          id,
          description,
          created_at,
          updated_at,
          forks,
          comments,
          html_url,
        } = gist;
        // "public" is a reserved word; access via index signature
        const isPublic = gist['public'] ?? false;
        // Owner details
        const owner = gist.owner as Partial<AutoViewInputSubTypes.simple_user> | undefined;
        const ownerLogin = owner?.login ?? 'Unknown';
        const ownerAvatar = owner?.avatar_url;
        // Files count
        const files = gist.files;
        const fileCount = files
          ? Object.values(files).filter((f) => f != null).length
          : 0;
        // Fork count
        const forkCount = Array.isArray(forks) ? forks.length : 0;
        // Comments count
        const commentCount = comments ?? 0;

        return (
          <div
            key={id ?? index}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              {ownerAvatar ? (
                <img
                  src={ownerAvatar}
                  alt={ownerLogin}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {ownerLogin}
                </p>
                {html_url && (
                  <a
                    href={html_url}
                    className="text-xs text-blue-500 hover:underline truncate block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Gist
                  </a>
                )}
              </div>
              <span
                className={
                  'px-2 py-0.5 text-xs font-semibold rounded-full ' +
                  (isPublic
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800')
                }
              >
                {isPublic ? 'Public' : 'Private'}
              </span>
            </div>

            <p className="mt-2 text-gray-700 text-sm line-clamp-2">
              {description ?? 'No description provided.'}
            </p>

            <div className="mt-3 flex flex-wrap items-center text-gray-500 text-xs space-x-4">
              <span>{fileCount} file{fileCount !== 1 ? 's' : ''}</span>
              <span>Forks: {forkCount}</span>
              <span>Comments: {commentCount}</span>
              <span>Created: {formatDate(created_at)}</span>
              <span>Updated: {formatDate(updated_at)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
