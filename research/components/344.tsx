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

  // Utility: format ISO date to "MMM D, YYYY"
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (gists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} aria-label="No data" />
        <span className="mt-2 text-lg">No Gists Available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gists.map((gist) => {
        // Derive display user (prefer owner over user)
        const user = gist.owner ?? gist.user;
        const login = user?.login ?? "Unknown";
        const avatarUrl = user?.avatar_url;
        const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          login
        )}&background=random&color=fff`;

        const createdAt = formatDate(gist.created_at);
        const updatedAt = formatDate(gist.updated_at);
        const fileCount = Object.keys(gist.files).length;
        const forksCount = gist.forks?.length ?? 0;

        return (
          <div
            key={gist.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <img
                  src={avatarUrl || fallbackAvatar}
                  alt={login}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackAvatar;
                  }}
                />
                <span className="font-medium text-gray-800">{login}</span>
                {gist.public ? (
                  <LucideReact.Globe
                    className="ml-1 text-blue-500"
                    size={16}
                    aria-label="Public gist"
                  />
                ) : (
                  <LucideReact.Lock
                    className="ml-1 text-gray-500"
                    size={16}
                    aria-label="Private gist"
                  />
                )}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <LucideReact.Calendar size={16} aria-label="Created at" />
                <span className="ml-1">{createdAt}</span>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 flex-1">
              <p className="text-gray-700 text-sm line-clamp-2">
                {gist.description ?? "No description provided."}
              </p>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-gray-500 text-sm">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <LucideReact.FileText size={16} aria-label="Files" />
                  <span className="ml-1">{fileCount}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.GitBranch size={16} aria-label="Forks" />
                  <span className="ml-1">{forksCount}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.MessageCircle size={16} aria-label="Comments" />
                  <span className="ml-1">{gist.comments}</span>
                </div>
              </div>
              <div className="flex items-center">
                <LucideReact.RefreshCw size={16} aria-label="Last updated" />
                <span className="ml-1">{updatedAt}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
