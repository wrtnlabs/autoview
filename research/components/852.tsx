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
  const releaseName = value.name?.trim() || value.tag_name;
  const createdAt = new Date(value.created_at);
  const createdDate = createdAt.toLocaleDateString("default", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const publishedAtDate = value.published_at
    ? new Date(value.published_at)
    : null;
  const publishedDate = publishedAtDate
    ? publishedAtDate.toLocaleDateString("default", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const assetCount = value.assets.length;
  const totalDownloads = value.assets.reduce(
    (sum, asset) => sum + asset.download_count,
    0,
  );

  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    value.author.login,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Tag and Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LucideReact.Tag size={20} className="text-gray-500" />
          <h2
            className="text-lg font-semibold text-gray-800 truncate"
            title={value.tag_name}
          >
            {value.tag_name}
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          {value.draft && (
            <span className="inline-flex items-center px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
              <LucideReact.Edit2 size={14} className="mr-1" />
              Draft
            </span>
          )}
          {value.prerelease && (
            <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
              <LucideReact.AlertTriangle size={14} className="mr-1" />
              Pre-release
            </span>
          )}
        </div>
      </div>

      {/* Release Title */}
      <h3
        className="text-xl font-bold text-gray-900 truncate"
        title={releaseName}
      >
        {releaseName}
      </h3>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <img
            src={value.author.avatar_url}
            alt={`${value.author.login} avatar`}
            className="w-6 h-6 rounded-full"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = avatarFallback;
            }}
          />
          <span>{value.author.login}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span title={createdAt.toLocaleString()}>{createdDate}</span>
        </div>
        {publishedDate && (
          <div className="flex items-center space-x-1">
            <LucideReact.CheckCircle size={16} className="text-green-500" />
            <span title={publishedAtDate!.toLocaleString()}>
              {publishedDate}
            </span>
          </div>
        )}
      </div>

      {/* Description Preview */}
      {value.body && (
        <p className="text-gray-700 text-sm line-clamp-3">{value.body}</p>
      )}

      {/* Assets & Reactions Summary */}
      <div className="flex flex-wrap items-center text-gray-600 text-sm space-x-6">
        <div className="flex items-center space-x-1">
          <LucideReact.Archive size={16} />
          <span>
            {assetCount} Asset{assetCount !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.DownloadCloud size={16} />
          <span>{totalDownloads.toLocaleString()} Downloads</span>
        </div>
        {value.reactions && (
          <div className="flex items-center space-x-1">
            <LucideReact.Smile size={16} />
            <span>
              {value.reactions.total_count.toLocaleString()} Reactions
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
