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
  // Derive a reusable date formatter
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const gists = value ?? [];

  // Empty state
  if (gists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-300" />
        <p className="mt-2 text-lg">No gists available</p>
      </div>
    );
  }

  // Main grid of gist cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gists.map((gist) => {
        // Determine author (fallback to placeholder)
        const author = gist.owner ?? gist.user;
        const authorName = author?.login ?? 'Unknown';
        const avatarUrl =
          author?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            authorName,
          )}&background=0D8ABC&color=fff`;

        // Files info
        const fileKeys = Object.keys(gist.files || {});
        const fileCount = fileKeys.length;

        return (
          <div
            key={gist.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col"
          >
            {/* Author */}
            <div className="flex items-center mb-3">
              <img
                src={avatarUrl}
                alt={authorName}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    authorName,
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <span className="ml-2 text-gray-900 font-medium text-sm">
                {authorName}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-800 text-sm mb-2 line-clamp-2">
              {gist.description ?? 'No description'}
            </p>

            {/* Meta info */}
            <div className="flex items-center text-gray-600 text-xs space-x-4 mb-3">
              <div className="flex items-center">
                <LucideReact.FileText
                  size={16}
                  className="mr-1 text-indigo-500"
                />
                <span>
                  {fileCount} {fileCount === 1 ? 'file' : 'files'}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="mr-1" />
                <span>{formatDate(gist.created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Clock size={16} className="mr-1" />
                <span>{formatDate(gist.updated_at)}</span>
              </div>
            </div>

            {/* Footer stats */}
            <div className="flex items-center text-gray-600 text-xs space-x-4 mt-auto">
              <div className="flex items-center">
                <LucideReact.MessageCircle size={16} className="mr-1" />
                <span>{gist.comments}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.GitBranch size={16} className="mr-1" />
                <span>{gist.forks?.length ?? 0}</span>
              </div>
              <div className="flex items-center flex-1">
                <LucideReact.Link size={16} className="mr-1" />
                <span className="truncate max-w-xs">{gist.html_url}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
