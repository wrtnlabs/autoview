import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const {
    author,
    html_url,
    tag_name,
    name,
    draft,
    prerelease,
    created_at,
    published_at,
    body_text,
    body,
    assets,
    reactions,
  } = value;

  // Derive display values
  const displayTitle = name?.trim() || tag_name;
  const displayDescription = (body_text || body || "").trim();
  const formattedCreated = new Date(created_at).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedPublished = published_at
    ? new Date(published_at).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unpublished";

  // Prepare asset summary
  const assetCount = assets.length;
  const assetNames = assets
    .slice(0, 3)
    .map((a) => a.name)
    .join(", ");
  const moreAssets = assetCount > 3 ? `, +${assetCount - 3} more` : "";

  // Fallback for avatar load error
  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    const initials = encodeURIComponent(author.login);
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: author avatar & name, status badges, dates */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={author.avatar_url}
            alt={`${author.login}'s avatar`}
            onError={handleAvatarError}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-gray-800">{author.login}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          {draft && (
            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full">
              Draft
            </span>
          )}
          {prerelease && (
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
              Prerelease
            </span>
          )}
          <div className="flex items-center text-gray-500">
            <LucideReact.Calendar size={14} />
            <span className="ml-1">{formattedPublished}</span>
          </div>
        </div>
      </div>

      {/* Title with link */}
      <h2 className="text-lg font-semibold text-blue-600 hover:underline">
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          {displayTitle}
        </a>
      </h2>

      {/* Description truncated */}
      {displayDescription && (
        <p className="text-gray-700 text-sm line-clamp-3">
          {displayDescription}
        </p>
      )}

      {/* Footer: created date, assets summary, reactions */}
      <div className="flex flex-wrap items-center justify-between text-gray-600 text-sm">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={14} />
          <span>Created: {formattedCreated}</span>
        </div>

        {assetCount > 0 && (
          <div className="flex items-center space-x-1">
            <LucideReact.Package size={14} />
            <span title={`${assetNames}${moreAssets}`}>
              {assetNames}
              {moreAssets}
            </span>
          </div>
        )}

        {reactions && (
          <div className="flex items-center space-x-1">
            <LucideReact.ThumbsUp size={14} />
            <span>{reactions.total_count} Reactions</span>
          </div>
        )}
      </div>
    </div>
  );
}
