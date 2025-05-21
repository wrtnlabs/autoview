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
export type AutoViewInput = AutoViewInputSubTypes.release[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Sort releases by published date (newest first).
  const releases = [...value].sort((a, b) => {
    const dateA = new Date(b.published_at ?? b.created_at).getTime();
    const dateB = new Date(a.published_at ?? a.created_at).getTime();
    return dateA - dateB;
  });

  //    Date formatter for display.
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Render a list of release "cards" with key details: author, date, title, description, status, assets, and key reactions.
  return (
    <div className="space-y-6">
      {releases.map((release) => {
        const publishedDate = release.published_at ?? release.created_at;
        const title = release.name?.trim() || release.tag_name;
        const description =
          release.body_text?.trim() ||
          release.body?.trim() ||
          "No description provided.";
        const statusLabel = release.draft
          ? "Draft"
          : release.prerelease
          ? "Prerelease"
          : "Published";
        const statusClasses = release.draft
          ? "bg-yellow-100 text-yellow-800"
          : release.prerelease
          ? "bg-blue-100 text-blue-800"
          : "bg-green-100 text-green-800";
        const assetsCount = release.assets.length;
        return (
          <div
            key={release.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={release.author.avatar_url}
                  alt={release.author.login}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  {release.author.login}
                </span>
              </div>
              <time
                dateTime={publishedDate}
                className="text-xs text-gray-500"
              >
                {formatDate(publishedDate)}
              </time>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-gray-800 truncate">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-3">
              {description}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded ${statusClasses}`}
                >
                  {statusLabel}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                  {assetsCount} asset{assetsCount !== 1 ? "s" : ""}
                </span>
              </div>
              {release.reactions && (
                <div className="mt-2 sm:mt-0 flex items-center space-x-3 text-gray-500 text-xs">
                  <span className="flex items-center space-x-1">
                    <span>👍</span>
                    <span>{release.reactions["+1"]}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>❤️</span>
                    <span>{release.reactions.heart}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>🎉</span>
                    <span>{release.reactions.hooray}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
