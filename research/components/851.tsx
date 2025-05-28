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
  const publishedDate = value.published_at ?? value.created_at;
  const formattedDate = new Date(publishedDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const statusLabel = value.draft
    ? "Draft"
    : value.prerelease
    ? "Prerelease"
    : "Release";
  const statusClasses = value.draft
    ? "bg-yellow-100 text-yellow-800"
    : value.prerelease
    ? "bg-blue-100 text-blue-800"
    : "bg-green-100 text-green-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Title and Status */}
      <div className="flex items-start justify-between">
        <div className="pr-4">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {value.name || value.tag_name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">Tag: {value.tag_name}</p>
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${statusClasses}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm line-clamp-3">
        {value.body?.trim() || "No description provided."}
      </p>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.User size={16} className="text-gray-400" />
          <span className="ml-1 truncate">{value.author.login}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-1">{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Download size={16} className="text-gray-400" />
          <span className="ml-1">{value.assets.length} assets</span>
        </div>
        {value.reactions && (
          <div className="flex items-center">
            <LucideReact.Heart size={16} className="text-red-400" />
            <span className="ml-1">{value.reactions.total_count}</span>
          </div>
        )}
      </div>

      {/* Assets List */}
      {value.assets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {value.assets.slice(0, 3).map((asset) => (
            <li
              key={asset.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="truncate">{asset.name}</span>
              <div className="flex items-center text-gray-500">
                <LucideReact.Download size={14} className="text-gray-400" />
                <span className="ml-1">{asset.download_count}</span>
              </div>
            </li>
          ))}
          {value.assets.length > 3 && (
            <li className="text-xs text-gray-500">
              +{value.assets.length - 3} more assets
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
