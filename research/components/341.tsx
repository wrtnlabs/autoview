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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const gists = value;
  const totalGists = gists.length;
  const publicCount = gists.filter(g => g.public).length;
  const privateCount = totalGists - publicCount;
  const totalComments = gists.reduce((sum, g) => sum + g.comments, 0);

  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {/* Overview */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gists Overview</h2>
        <div className="mt-2 flex flex-wrap gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <LucideReact.GitBranch size={16} className="text-indigo-500" />
            <span>{totalGists} gist{totalGists !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Globe2 size={16} className="text-green-500" />
            <span>{publicCount} public</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Lock size={16} className="text-red-500" />
            <span>{privateCount} private</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.MessageCircle size={16} className="text-gray-500" />
            <span>{totalComments} comment{totalComments !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {totalGists === 0 ? (
        <div className="flex flex-col items-center text-gray-500 py-8">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2">No Gists Available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {gists.map(gist => {
            const author = gist.owner ?? gist.user;
            const authorName = author ? author.name ?? author.login : 'Unknown';
            const avatarUrl = author?.avatar_url;
            const fileCount = Object.keys(gist.files).length;

            return (
              <li key={gist.id} className="bg-white rounded-lg shadow p-4">
                {/* Header: Avatar, Title, Visibility */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={`${authorName} avatar`}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={e => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            authorName,
                          )}&background=random`;
                        }}
                      />
                    ) : (
                      <LucideReact.User size={40} className="text-gray-400" />
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 line-clamp-2">
                        {gist.description ?? 'No Description'}
                      </h3>
                      <p className="text-sm text-gray-500">By {authorName}</p>
                    </div>
                  </div>
                  {gist.public ? (
                    <LucideReact.Globe2
                      size={20}
                      className="text-green-500"
                      aria-label="Public"
                    />
                  ) : (
                    <LucideReact.Lock
                      size={20}
                      className="text-red-500"
                      aria-label="Private"
                    />
                  )}
                </div>

                {/* Metadata */}
                <div className="mt-2 flex flex-wrap gap-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-1">
                    <LucideReact.FileText size={16} className="text-indigo-500" />
                    <span>
                      {fileCount} file{fileCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.MessageCircle size={16} className="text-gray-500" />
                    <span>
                      {gist.comments} comment{gist.comments !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar size={16} className="text-gray-400" />
                    <span>Created {formatDate(gist.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.Clock size={16} className="text-gray-400" />
                    <span>Updated {formatDate(gist.updated_at)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
