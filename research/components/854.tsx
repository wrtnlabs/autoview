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
  const title = value.name && value.name.trim().length > 0 ? value.name : value.tag_name;
  const isDraft = value.draft;
  const isPreRelease = value.prerelease;
  const dateObj = new Date(value.published_at ?? value.created_at);
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const author = value.author;
  const assetCount = value.assets.length;
  const bodyText = value.body_text ?? value.body ?? "No description available.";
  const reactions = value.reactions;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header: Title and Status Badges */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
        <div className="flex space-x-2">
          {isDraft && (
            <span className="px-2 py-0.5 text-xs font-medium text-yellow-800 bg-yellow-100 rounded">
              Draft
            </span>
          )}
          {isPreRelease && (
            <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded">
              Pre-release
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-700 line-clamp-3">
        {bodyText}
      </p>

      {/* Meta Information */}
      <div className="mt-4 flex flex-wrap items-center text-xs text-gray-600 space-x-4">
        {/* Author */}
        <div className="flex items-center space-x-2">
          <img
            src={author.avatar_url}
            alt={author.login}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="truncate">{author.login}</span>
        </div>
        {/* Date */}
        <span>{formattedDate}</span>
        {/* Asset Count */}
        <span>
          {assetCount} {assetCount === 1 ? "asset" : "assets"}
        </span>
        {/* Reactions Summary */}
        {reactions && (
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <span>👍</span>
              <span>{reactions["+1"]}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>❤️</span>
              <span>{reactions.heart}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>💬</span>
              <span>{reactions.total_count}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
