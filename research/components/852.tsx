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
export type AutoViewInput = AutoViewInputSubTypes.release;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    tag_name,
    name: releaseName,
    target_commitish,
    draft,
    prerelease,
    created_at,
    published_at,
    author,
    assets,
    body_text,
    body,
    reactions,
  } = value;

  const title = releaseName ?? tag_name;
  const dateSource = published_at ?? created_at;
  const dateObj = new Date(dateSource);
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const rawDescription = body_text ?? body ?? '';
  const description =
    rawDescription.length > 200
      ? rawDescription.slice(0, 200).trimEnd() + '…'
      : rawDescription;

  const assetCount = assets.length;
  const totalDownloads = assets.reduce((sum, asset) => sum + asset.download_count, 0);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <header className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <LucideReact.Calendar size={16} className="mr-1" />
            <time dateTime={dateObj.toISOString()}>{formattedDate}</time>
            <span className="mx-2">•</span>
            <span className="truncate">Based on {target_commitish}</span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          {draft && (
            <div className="flex items-center text-gray-500 text-xs uppercase tracking-wide">
              <LucideReact.Clock size={14} className="mr-1" />
              Draft
            </div>
          )}
          {prerelease && (
            <div className="flex items-center text-amber-500 text-xs uppercase tracking-wide">
              <LucideReact.Tag size={14} className="mr-1" />
              Prerelease
            </div>
          )}
        </div>
      </header>

      <div className="mt-4 flex items-center">
        <img
          src={author.avatar_url}
          alt={author.login}
          className="w-10 h-10 rounded-full object-cover mr-3 bg-gray-200"
        />
        <div>
          <div className="text-gray-900 font-medium truncate">{author.login}</div>
        </div>
      </div>

      {description && (
        <p className="mt-4 text-gray-700 text-sm line-clamp-3">{description}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-gray-600 text-sm">
        <div className="flex items-center">
          <LucideReact.Download size={16} className="mr-1" />
          <span>
            {assetCount} asset{assetCount !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.DownloadCloud size={16} className="mr-1" />
          <span>{totalDownloads.toLocaleString()} downloads</span>
        </div>
        {reactions && (
          <div className="flex items-center">
            <LucideReact.ThumbsUp size={16} className="mr-1 text-blue-500" />
            <span>{reactions['+1']}</span>
          </div>
        )}
      </div>
    </article>
  );
}
