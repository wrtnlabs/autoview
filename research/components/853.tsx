import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A release.
     *
     * @title Release
    */
    export type release = {
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
    };
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
    /**
     * Data related to a release.
     *
     * @title Release Asset
    */
    export type release_asset = {
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
     * @title Reaction Rollup
    */
    export type reaction_rollup = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.release;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const releaseName = value.name?.trim() || value.tag_name;
  const statusText = value.draft
    ? 'Draft'
    : value.prerelease
    ? 'Prerelease'
    : 'Published';
  const statusStyles =
    value.draft
      ? 'bg-gray-100 text-gray-800'
      : value.prerelease
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-green-100 text-green-800';

  const createdAt = new Date(value.created_at);
  const formattedCreated = createdAt.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const publishedAt = value.published_at ? new Date(value.published_at) : null;
  const formattedPublished = publishedAt
    ? publishedAt.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unpublished';

  const assetsCount = value.assets.length;
  const totalDownloads = value.assets.reduce(
    (sum, asset) => sum + asset.download_count,
    0,
  );

  const reactionMap: Record<string, string> = {
    '+1': '👍',
    '-1': '👎',
    laugh: '😄',
    confused: '😕',
    heart: '❤️',
    hooray: '🎉',
    eyes: '👀',
    rocket: '🚀',
  };
  const reactionEntries = value.reactions
    ? (Object.entries(value.reactions) as [string, number][]).filter(
        ([key]) => key !== 'url' && key !== 'total_count' && reactionMap[key],
      )
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Avatar, Title, Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={value.author.avatar_url}
            alt={value.author.login}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {releaseName}
            </h2>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>By {value.author.login}</span>
              <span>·</span>
              <span>{formattedPublished}</span>
            </div>
          </div>
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${statusStyles}`}
        >
          {statusText}
        </span>
      </div>

      {/* Description */}
      {value.body ? (
        <p className="mt-3 text-gray-700 text-sm line-clamp-3">
          {value.body}
        </p>
      ) : null}

      {/* Footer: Stats */}
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        <div className="text-sm text-gray-600 space-y-1">
          <div>
            <span className="font-medium text-gray-800">Created:</span>{' '}
            {formattedCreated}
          </div>
          <div>
            <span className="font-medium text-gray-800">Assets:</span>{' '}
            {assetsCount} {assetsCount === 1 ? 'item' : 'items'} ·{' '}
            {totalDownloads.toLocaleString()} downloads
          </div>
        </div>
        {reactionEntries.length > 0 && (
          <div className="flex space-x-3">
            {reactionEntries.map(([key, count]) => (
              <div
                key={key}
                className="flex items-center space-x-1 text-sm text-gray-600"
              >
                <span>{reactionMap[key]}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
