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
  const title = value.name?.trim() || value.tag_name;
  const rawDate = value.published_at || value.created_at;
  const formattedDate = new Date(rawDate).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const status = value.draft
    ? "Draft"
    : value.prerelease
    ? "Prerelease"
    : "Published";
  const bodySource = value.body_text ?? value.body ?? "";
  const previewBody =
    bodySource.length > 200 ? bodySource.slice(0, 200).trim() + "…" : bodySource;
  const assetCount = value.assets.length;
  const reactions = value.reactions;

  const reactionEmojis: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        {/* Title & Status */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 truncate">{title}</h2>
          <span
            className={
              "px-2 py-1 text-xs font-medium rounded-full " +
              (status === "Published"
                ? "bg-green-100 text-green-800"
                : status === "Draft"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-blue-100 text-blue-800")
            }
          >
            {status}
          </span>
        </div>

        {/* Date */}
        <p className="mt-1 text-gray-500 text-sm">{formattedDate}</p>

        {/* Author */}
        <div className="mt-4 flex items-center">
          <img
            src={value.author.avatar_url}
            alt={value.author.login}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <span className="ml-3 text-gray-700 text-sm truncate">
            {value.author.login}
          </span>
        </div>

        {/* Body Preview */}
        {previewBody && (
          <p className="mt-4 text-gray-700 text-sm leading-relaxed overflow-hidden">
            {previewBody}
          </p>
        )}

        {/* Assets Summary */}
        <div className="mt-4 text-gray-600 text-sm">
          <span className="font-medium">{assetCount}</span>{" "}
          {assetCount === 1 ? "asset" : "assets"}
        </div>

        {/* Reactions */}
        {reactions && (
          <div className="mt-4 flex flex-wrap gap-3">
            {(
              [
                "+1",
                "-1",
                "laugh",
                "confused",
                "heart",
                "hooray",
                "eyes",
                "rocket",
              ] as Array<keyof typeof reactions>
            ).map((key) => {
              const count = reactions[key];
              if (count === undefined || count === 0) return null;
              return (
                <div
                  key={key}
                  className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-gray-700 text-xs"
                >
                  <span className="mr-1">{reactionEmojis[key] || key}</span>
                  <span>{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
