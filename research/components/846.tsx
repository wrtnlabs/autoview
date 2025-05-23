import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A release.
     *
     * @title Release
    */
    export interface release {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        assets_url: string & tags.Format<"uri">;
        upload_url: string;
        tarball_url: (string & tags.Format<"uri">) | null;
        zipball_url: (string & tags.Format<"uri">) | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the tag.
        */
        tag_name: string;
        /**
         * Specifies the commitish value that determines where the Git tag is created from.
        */
        target_commitish: string;
        name: string | null;
        body?: string | null;
        /**
         * true to create a draft (unpublished) release, false to create a published one.
        */
        draft: boolean;
        /**
         * Whether to identify the release as a prerelease or a full release.
        */
        prerelease: boolean;
        created_at: string & tags.Format<"date-time">;
        published_at: (string & tags.Format<"date-time">) | null;
        author: AutoViewInputSubTypes.simple_user;
        assets: AutoViewInputSubTypes.release_asset[];
        body_html?: string;
        body_text?: string;
        mentions_count?: number & tags.Type<"int32">;
        /**
         * The URL of the release discussion.
        */
        discussion_url?: string;
        reactions?: AutoViewInputSubTypes.reaction_rollup;
    }
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
    /**
     * Data related to a release.
     *
     * @title Release Asset
    */
    export interface release_asset {
        url: string & tags.Format<"uri">;
        browser_download_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The file name of the asset.
        */
        name: string;
        label: string | null;
        /**
         * State of the release asset.
        */
        state: "uploaded" | "open";
        content_type: string;
        size: number & tags.Type<"int32">;
        download_count: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        uploader: AutoViewInputSubTypes.nullable_simple_user;
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
     * @title Reaction Rollup
    */
    export interface reaction_rollup {
        url: string & tags.Format<"uri">;
        total_count: number & tags.Type<"int32">;
        "+1": number & tags.Type<"int32">;
        "-1": number & tags.Type<"int32">;
        laugh: number & tags.Type<"int32">;
        confused: number & tags.Type<"int32">;
        heart: number & tags.Type<"int32">;
        hooray: number & tags.Type<"int32">;
        eyes: number & tags.Type<"int32">;
        rocket: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.release[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const releases: AutoViewInput = value ?? [];

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (releases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={32} />
        <span className="mt-2 text-sm">No releases available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {releases.map((release) => {
        // Derived values: asset count and total size in KB
        const assetCount = release.assets.length;
        const totalSizeKB = (
          release.assets.reduce((sum, a) => sum + a.size, 0) / 1024
        ).toFixed(1);

        const displayDate = release.published_at
          ? formatDate(release.published_at)
          : formatDate(release.created_at);

        return (
          <div
            key={release.id}
            className="flex flex-col justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div>
              {/* Tag and status badges */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <LucideReact.Tag size={18} className="text-indigo-500" />
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {release.tag_name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {release.draft && (
                    <LucideReact.Edit2
                      size={16}
                      aria-label="Draft"
                      className="text-yellow-500"
                    />
                  )}
                  {release.prerelease && (
                    <LucideReact.Flag
                      size={16}
                      aria-label="Prerelease"
                      className="text-blue-400"
                    />
                  )}
                </div>
              </div>

              {/* Release name */}
              {release.name && (
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-300 truncate">
                  {release.name}
                </p>
              )}

              {/* Meta: date and author */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <LucideReact.Calendar size={16} />
                  <span>{displayDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.User size={16} />
                  <span className="truncate">{release.author.login}</span>
                </div>
              </div>

              {/* Body text (truncated) */}
              {release.body_text && (
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {release.body_text}
                </p>
              )}
            </div>

            {/* Footer: assets and reactions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <LucideReact.DownloadCloud size={16} />
                <span>
                  {assetCount} asset{assetCount !== 1 ? 's' : ''} (
                  {totalSizeKB} KB)
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.ThumbsUp size={16} />
                <span>{release.reactions?.total_count ?? 0}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
