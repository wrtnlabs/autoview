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
export type AutoViewInput = AutoViewInputSubTypes.release[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation: sort releases by published date (newest first)
  const releases = [...value].sort((a, b) => {
    const dateA = a.published_at
      ? new Date(a.published_at)
      : new Date(a.created_at);
    const dateB = b.published_at
      ? new Date(b.published_at)
      : new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });

  // Helper to format dates
  const formatDate = (iso?: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {releases.map((release) => {
        const {
          id,
          tag_name,
          name,
          draft,
          prerelease,
          created_at,
          published_at,
          author,
          assets,
          body_text,
          reactions,
        } = release;

        // Body content fallback & truncation
        const description = body_text
          ? body_text
          : release.body
            ? release.body
            : "No description provided.";

        // Reaction icons mapping
        const reactionItems: { icon: JSX.Element; count: number }[] = [];
        if (reactions) {
          if (reactions["+1"] > 0)
            reactionItems.push({
              icon: <LucideReact.ThumbsUp size={16} />,
              count: reactions["+1"],
            });
          if (reactions["-1"] > 0)
            reactionItems.push({
              icon: <LucideReact.ThumbsDown size={16} />,
              count: reactions["-1"],
            });
          if (reactions.laugh > 0)
            reactionItems.push({
              icon: <LucideReact.Laugh size={16} />,
              count: reactions.laugh,
            });
          if (reactions.confused > 0)
            reactionItems.push({
              icon: <LucideReact.HelpCircle size={16} />,
              count: reactions.confused,
            });
          if (reactions.heart > 0)
            reactionItems.push({
              icon: <LucideReact.Heart size={16} className="text-red-500" />,
              count: reactions.heart,
            });
          if (reactions.eyes > 0)
            reactionItems.push({
              icon: <LucideReact.Eye size={16} />,
              count: reactions.eyes,
            });
          if (reactions.rocket > 0)
            reactionItems.push({
              icon: <LucideReact.Rocket size={16} />,
              count: reactions.rocket,
            });
        }

        return (
          <div
            key={id}
            className="p-4 bg-white rounded-lg shadow flex flex-col space-y-4"
          >
            {/* Header: tag name and status badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LucideReact.Tag className="text-indigo-500" size={20} />
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {tag_name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {draft && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <LucideReact.EyeOff size={16} />
                    <span>Draft</span>
                  </div>
                )}
                {prerelease && (
                  <div className="flex items-center gap-1 text-amber-500">
                    <LucideReact.Clock size={16} />
                    <span>Pre-release</span>
                  </div>
                )}
              </div>
            </div>

            {/* Title / release name */}
            {name && (
              <div className="text-gray-700 font-medium truncate">{name}</div>
            )}

            {/* Description truncated */}
            <p className="text-gray-600 text-sm line-clamp-3">{description}</p>

            {/* Footer: author, dates, assets, reactions */}
            <div className="flex flex-wrap items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                {/* Author info */}
                <div className="flex items-center gap-1">
                  <img
                    src={author.avatar_url}
                    alt={author.login}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        author.login,
                      )}&background=0D8ABC&color=fff`;
                    }}
                  />
                  <span>{author.login}</span>
                </div>
                {/* Date */}
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} />
                  <span>{formatDate(published_at || created_at)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-2 md:mt-0">
                {/* Assets count */}
                <div className="flex items-center gap-1">
                  <LucideReact.Archive size={16} />
                  <span>{assets.length} assets</span>
                </div>
                {/* Reactions */}
                {reactionItems.length > 0 && (
                  <div className="flex items-center gap-3">
                    {reactionItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 text-gray-500"
                      >
                        {item.icon}
                        <span>{item.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
