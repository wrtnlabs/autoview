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
  const [avatarError, setAvatarError] = React.useState(false);

  // Choose display name: release name or tag name
  const displayName = value.name ?? value.tag_name;

  // Determine the date to show: published or created
  const dateToShow = value.published_at ?? value.created_at;
  const formattedDate = new Date(dateToShow).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Prepare the description/body text, truncated if too long
  const fullBody = value.body_text ?? value.body ?? '';
  const truncatedBody =
    fullBody.length > 200 ? fullBody.slice(0, 200).trimEnd() + '…' : fullBody;

  // Count assets
  const assetCount = value.assets.length;

  // Fallback avatar based on login initials
  const avatarFallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    value.author.login,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Author and date */}
      <div className="flex items-center space-x-3">
        <img
          src={avatarError ? avatarFallbackUrl : value.author.avatar_url}
          alt={value.author.login}
          className="h-10 w-10 rounded-full object-cover"
          onError={() => setAvatarError(true)}
        />
        <div>
          <div className="text-sm font-medium text-gray-900">
            {value.author.login}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <LucideReact.Calendar className="mr-1" size={14} />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Release title and status badges */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {displayName}
        </h2>
        <div className="mt-1 flex flex-wrap gap-2">
          {value.draft && (
            <span className="px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 rounded">
              Draft
            </span>
          )}
          {value.prerelease && (
            <span className="px-2 py-0.5 text-xs font-medium text-indigo-700 bg-indigo-100 rounded">
              Pre-release
            </span>
          )}
        </div>
      </div>

      {/* Release notes/body */}
      {truncatedBody && (
        <p className="mt-3 text-sm text-gray-700 line-clamp-3">
          {truncatedBody}
        </p>
      )}

      {/* Footer: assets and reactions */}
      <div className="mt-4 flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-1">
          <LucideReact.DownloadCloud size={16} />
          <span>
            {assetCount} {assetCount === 1 ? 'asset' : 'assets'}
          </span>
        </div>
        {value.reactions && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <LucideReact.ThumbsUp size={16} />
              <span>{value.reactions['+1']}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.ThumbsDown size={16} />
              <span>{value.reactions['-1']}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.Heart className="text-red-500" size={16} />
              <span>{value.reactions.heart}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
