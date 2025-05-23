import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Base Gist
     *
     * @title Base Gist
    */
    export interface base_gist {
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
    }
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
    export interface simple_user {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.base_gist[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper: format ISO date to "MMM dd, yyyy"
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // Visual structure: a responsive grid of gist cards
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {value.map((gist) => {
        // Choose display user: owner if present, else user
        const user = gist.owner ?? gist.user;
        const displayName = user
          ? user.name?.trim() || user.login
          : 'Unknown User';
        const avatarUrl = user?.avatar_url;

        // File summary
        const fileNames = Object.keys(gist.files);
        const fileCount = fileNames.length;

        return (
          <div
            key={gist.id}
            className="flex flex-col justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            {/* Header: Avatar and Username */}
            <div className="flex items-center mb-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      displayName,
                    )}&background=0D8ABC&color=fff`;
                  }}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <LucideReact.User className="text-gray-400" size={20} />
                </div>
              )}
              <div className="text-lg font-semibold text-gray-800 truncate">
                {displayName}
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <p className="text-gray-900 font-medium line-clamp-2">
                {gist.description ?? 'No description'}
              </p>
            </div>

            {/* Metadata: dates and visibility */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-3 mb-4">
              <div className="flex items-center">
                <LucideReact.Calendar className="mr-1" size={16} />
                <span title={gist.created_at}>
                  {formatDate(gist.created_at)}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.RefreshCcw className="mr-1" size={16} />
                <span title={gist.updated_at}>
                  {formatDate(gist.updated_at)}
                </span>
              </div>
              <div className="flex items-center">
                {gist.public ? (
                  <LucideReact.Unlock
                    className="mr-1 text-green-500"
                    size={16}
                  />
                ) : (
                  <LucideReact.Lock className="mr-1 text-red-500" size={16} />
                )}
                <span>{gist.public ? 'Public' : 'Private'}</span>
              </div>
            </div>

            {/* File count and comments */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <LucideReact.FileText className="mr-1" size={16} />
                <span>
                  {fileCount} file{fileCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.MessageCircle className="mr-1" size={16} />
                <span>
                  {gist.comments} comment{gist.comments !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* URL (non-clickable) */}
            <div className="mt-auto text-xs text-gray-400 flex items-center">
              <LucideReact.Link className="mr-1" size={14} />
              <span className="truncate">{gist.html_url}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
