import LucideReact from "lucide-react";
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
  const title = value.name?.trim() || value.tag_name;
  const authorName = value.author.login;
  const publishedDate = value.published_at
    ? new Date(value.published_at)
    : null;
  const formattedDate = publishedDate
    ? publishedDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unpublished";
  const description = value.body?.trim() || "No description provided.";
  const isDraft = value.draft;
  const isPrerelease = value.prerelease;
  const assetCount = value.assets.length;
  const totalDownloads = value.assets.reduce(
    (sum, a) => sum + a.download_count,
    0,
  );
  const previewAssets = value.assets.slice(0, 3);

  // Format bytes into human-readable string
  const formatSize = (bytes: number): string => {
    if (bytes >= 1e6) return (bytes / 1e6).toFixed(1) + " MB";
    if (bytes >= 1e3) return (bytes / 1e3).toFixed(1) + " KB";
    return bytes + " B";
  };

  // Placeholder for avatar on error
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full p-4 bg-white rounded-lg shadow-md">
      {/* Header: Title, Status, Author, Date */}
      <div className="flex items-start space-x-4">
        <img
          src={value.author.avatar_url}
          alt={authorName}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = avatarPlaceholder;
          }}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {title}
            </h2>
            {(isDraft || isPrerelease) && (
              <div className="flex space-x-1">
                {isDraft && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-800 rounded-full">
                    Draft
                  </span>
                )}
                {isPrerelease && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Prerelease
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 space-x-3">
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.User size={16} className="text-gray-400" />
              <span>{authorName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700 text-sm line-clamp-3">{description}</p>

      {/* Assets & Reactions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assets Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Assets ({assetCount})
          </h3>
          {assetCount > 0 ? (
            <ul className="space-y-2">
              {previewAssets.map((asset) => (
                <li
                  key={asset.id}
                  className="flex items-center justify-between text-sm text-gray-700"
                >
                  <span className="flex-1 truncate">{asset.name}</span>
                  <div className="flex items-center space-x-1 ml-4">
                    <LucideReact.Download size={16} className="text-gray-500" />
                    <span>{asset.download_count}</span>
                    <span className="text-gray-400">
                      ({formatSize(asset.size)})
                    </span>
                  </div>
                </li>
              ))}
              {assetCount > previewAssets.length && (
                <li className="text-sm text-gray-500">
                  +{assetCount - previewAssets.length} more
                </li>
              )}
              <li className="pt-2 text-sm text-gray-500 flex items-center space-x-1">
                <LucideReact.ArrowDownCircle
                  size={16}
                  className="text-gray-400"
                />
                <span>{totalDownloads.toLocaleString()} total downloads</span>
              </li>
            </ul>
          ) : (
            <div className="flex items-center text-sm text-gray-500">
              <LucideReact.AlertCircle size={16} className="mr-1" />
              <span>No assets available</span>
            </div>
          )}
        </div>

        {/* Reactions Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-2">Reactions</h3>
          {value.reactions?.total_count ? (
            <div className="flex flex-wrap gap-4">
              {value.reactions["+1"] > 0 && (
                <div className="flex items-center text-sm text-gray-700">
                  <LucideReact.ThumbsUp
                    size={16}
                    className="text-green-500 mr-1"
                  />
                  <span>{value.reactions["+1"]}</span>
                </div>
              )}
              {value.reactions["-1"] > 0 && (
                <div className="flex items-center text-sm text-gray-700">
                  <LucideReact.ThumbsDown
                    size={16}
                    className="text-red-500 mr-1"
                  />
                  <span>{value.reactions["-1"]}</span>
                </div>
              )}
              {value.reactions.laugh > 0 && (
                <div className="flex items-center text-sm text-gray-700">
                  <LucideReact.Smile
                    size={16}
                    className="text-yellow-500 mr-1"
                  />
                  <span>{value.reactions.laugh}</span>
                </div>
              )}
              {value.reactions.confused > 0 && (
                <div className="flex items-center text-sm text-gray-700">
                  <LucideReact.Frown
                    size={16}
                    className="text-amber-500 mr-1"
                  />
                  <span>{value.reactions.confused}</span>
                </div>
              )}
              {value.reactions.heart > 0 && (
                <div className="flex items-center text-sm text-gray-700">
                  <LucideReact.Heart size={16} className="text-pink-500 mr-1" />
                  <span>{value.reactions.heart}</span>
                </div>
              )}
              {value.reactions.hooray > 0 && (
                <div className="flex items-center text-sm text-gray-700">
                  <LucideReact.Star
                    size={16}
                    className="text-indigo-500 mr-1"
                  />
                  <span>{value.reactions.hooray}</span>
                </div>
              )}
              {value.reactions.eyes > 0 && (
                <div className="flex items-center text-sm text-gray-700">
                  <LucideReact.Eye size={16} className="text-gray-500 mr-1" />
                  <span>{value.reactions.eyes}</span>
                </div>
              )}
              {value.reactions.rocket > 0 && (
                <div className="flex items-center text-sm text-gray-700">
                  <LucideReact.Rocket
                    size={16}
                    className="text-purple-500 mr-1"
                  />
                  <span>{value.reactions.rocket}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center text-sm text-gray-500">
              <LucideReact.ThumbsUp size={16} className="mr-1" />
              <span>No reactions yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
