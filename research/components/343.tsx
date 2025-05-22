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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((gist) => {
        // Determine the gist owner (fallback to user)
        const owner = gist.owner ?? gist.user;
        const ownerName = owner?.login ?? "Unknown";
        const ownerAvatar = owner?.avatar_url;

        // Files and forks counts
        const fileCount = Object.keys(gist.files).length;
        const forkCount = Array.isArray(gist.forks) ? gist.forks.length : 0;

        // Description handling
        const rawDesc = gist.description?.trim() || "No description";
        const description =
          rawDesc.length > 120 ? rawDesc.slice(0, 120) + "…" : rawDesc;

        // Formatted creation date
        const createdAt = formatDate(gist.created_at);

        return (
          <div
            key={gist.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:space-x-4"
          >
            {ownerAvatar && (
              <img
                src={ownerAvatar}
                alt={`${ownerName}'s avatar`}
                className="w-12 h-12 rounded-full object-cover mb-3 sm:mb-0"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-900 font-semibold text-lg truncate">
                  {ownerName}
                </h3>
                <span
                  className={
                    "text-sm font-medium " +
                    (gist.public ? "text-green-600" : "text-red-600")
                  }
                >
                  {gist.public ? "Public" : "Private"}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {description}
              </p>
              <div className="flex flex-wrap items-center text-gray-500 text-xs space-x-4">
                <span>Files: {fileCount}</span>
                <span>Comments: {gist.comments}</span>
                <span>Forks: {forkCount}</span>
                <span>Created: {createdAt}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
