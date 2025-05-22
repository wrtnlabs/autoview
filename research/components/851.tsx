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
  const publishedDate = value.published_at ?? value.created_at;
  const formattedDate = new Date(publishedDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const title = value.name ? value.name : `Tag: ${value.tag_name}`;
  const statusBadge = value.draft
    ? { label: "Draft", color: "bg-yellow-100 text-yellow-800" }
    : value.prerelease
      ? { label: "Prerelease", color: "bg-blue-100 text-blue-800" }
      : null;
  const description = value.body_text ?? value.body ?? "";
  const assets = value.assets ?? [];
  const reactions = value.reactions;
  const formatFileSize = (bytes: number) => {
    if (bytes >= 1e6) return (bytes / 1e6).toFixed(1) + " MB";
    if (bytes >= 1e3) return (bytes / 1e3).toFixed(1) + " KB";
    return bytes + " B";
  };
  const reactionMap: Record<string, keyof typeof LucideReact> = {
    "+1": "ThumbsUp",
    "-1": "ThumbsDown",
    laugh: "Smile",
    confused: "AlertTriangle",
    heart: "Heart",
    hooray: "Star",
    eyes: "Eye",
    rocket: "Rocket",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {title}
        </h2>
        {statusBadge && (
          <span
            className={`uppercase text-xs font-medium px-2 py-1 rounded ${statusBadge.color}`}
          >
            {statusBadge.label}
          </span>
        )}
      </div>

      {/* Meta: Date & Author */}
      <div className="flex items-center text-sm text-gray-500 space-x-3">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <time dateTime={publishedDate}>{formattedDate}</time>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={value.author.avatar_url}
            alt={`${value.author.login} avatar`}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) =>
              (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                value.author.login,
              )}&background=ddd&color=555`)
            }
          />
          <span>{value.author.login}</span>
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-700 text-sm whitespace-pre-wrap line-clamp-3">
        {description || (
          <span className="italic text-gray-400">No description provided.</span>
        )}
      </div>

      {/* Assets Summary */}
      {assets.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600 gap-1">
            <LucideReact.Download size={16} />
            <span>
              {assets.length} asset{assets.length > 1 ? "s" : ""}
            </span>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            {assets.slice(0, 3).map((a) => (
              <li key={a.id} className="flex justify-between items-center">
                <span className="truncate">{a.name}</span>
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{formatFileSize(a.size)}</span>
                  <LucideReact.ArrowDownCircle size={14} />
                  <span>{a.download_count}</span>
                </span>
              </li>
            ))}
            {assets.length > 3 && (
              <li className="text-xs text-gray-500">
                +{assets.length - 3} more
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Reactions */}
      {reactions && (
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          {Object.entries(reactions)
            .filter(
              ([key, count]) =>
                key !== "url" &&
                key !== "total_count" &&
                typeof count === "number" &&
                count > 0,
            )
            .map(([key, count]) => {
              const iconName = reactionMap[key];
              const Icon = iconName ? (LucideReact as any)[iconName] : null;
              return (
                Icon && (
                  <div
                    key={key}
                    className="flex items-center gap-1 text-xs"
                    aria-label={`${key} reactions: ${count}`}
                  >
                    <Icon size={14} className="text-gray-500" />
                    <span>{count}</span>
                  </div>
                )
              );
            })}
        </div>
      )}
    </article>
  );
}
