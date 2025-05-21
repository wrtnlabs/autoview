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
  const title: string = value.name
    ? `${value.name} (${value.tag_name})`
    : value.tag_name;

  const formattedCreated: string = new Date(value.created_at).toLocaleDateString(
    undefined,
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

  const formattedPublished: string | null = value.published_at
    ? new Date(value.published_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const displayDate: string = formattedPublished || formattedCreated;
  const dateLabel: string = value.published_at ? 'Published' : 'Created';
  const assetsCount: number = value.assets.length;

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb: number = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb: number = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  type ReactionEntry = { emoji: string; count: number };
  const reactionData: ReactionEntry[] = value.reactions
    ? [
        { emoji: '👍', count: value.reactions['+1'] },
        { emoji: '👎', count: value.reactions['-1'] },
        { emoji: '😄', count: value.reactions.laugh },
        { emoji: '😕', count: value.reactions.confused },
        { emoji: '❤️', count: value.reactions.heart },
        { emoji: '🎉', count: value.reactions.hooray },
        { emoji: '👀', count: value.reactions.eyes },
        { emoji: '🚀', count: value.reactions.rocket },
      ].filter((item) => item.count > 0)
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col space-y-4 max-w-md mx-auto">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
        <div className="flex space-x-2">
          {value.draft && (
            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
              Draft
            </span>
          )}
          {!value.draft && value.prerelease && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
              Pre-release
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-500">
        {dateLabel} on {displayDate} by{' '}
        <span className="font-medium text-gray-700">{value.author.login}</span>
      </p>

      <p className="text-gray-700 text-sm line-clamp-3">
        {value.body?.trim() || 'No release notes available.'}
      </p>

      {assetsCount > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-900 mb-2">
            Assets ({assetsCount})
          </p>
          <ul className="space-y-2">
            {value.assets.map((asset) => (
              <li
                key={asset.id}
                className="flex justify-between text-sm text-gray-700"
              >
                <span className="truncate">{asset.name}</span>
                <span className="ml-2 text-gray-500">
                  {formatBytes(asset.size)} • {asset.download_count} downloads
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {reactionData.length > 0 && (
        <div className="pt-4 border-t border-gray-200 flex space-x-4">
          {reactionData.map((r, idx) => (
            <span key={idx} className="flex items-center text-sm text-gray-600">
              <span className="mr-1">{r.emoji}</span>
              <span>{r.count}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
