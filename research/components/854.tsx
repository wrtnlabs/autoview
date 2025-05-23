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
  const publishedAt = value.published_at;
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : 'Unpublished';
  const releaseName = value.name || value.tag_name;
  const isDraft = value.draft;
  const isPrerelease = value.prerelease;
  const assetCount = value.assets.length;
  const reactions = value.reactions;
  const reactionEntries: [string, number][] = reactions
    ? ([
        ['+1', reactions['+1']],
        ['-1', reactions['-1']],
        ['laugh', reactions.laugh],
        ['confused', reactions.confused],
        ['heart', reactions.heart],
        ['hooray', reactions.hooray],
        ['eyes', reactions.eyes],
        ['rocket', reactions.rocket],
      ] as [string, number][])
        .filter(([, count]) => count > 0)
    : [];
  const iconMap: Record<string, JSX.Element> = {
    '+1': <LucideReact.ThumbsUp size={16} className="text-gray-500" aria-label="+1" />,
    '-1': <LucideReact.ThumbsDown size={16} className="text-gray-500" aria-label="-1" />,
    laugh: <LucideReact.Smile size={16} className="text-gray-500" aria-label="laugh" />,
    confused: <LucideReact.AlertCircle size={16} className="text-gray-500" aria-label="confused" />,
    heart: <LucideReact.Heart size={16} className="text-red-500" aria-label="heart" />,
    hooray: <LucideReact.PartyPopper size={16} className="text-yellow-500" aria-label="hooray" />,
    eyes: <LucideReact.Eye size={16} className="text-gray-500" aria-label="eyes" />,
    rocket: <LucideReact.Rocket size={16} className="text-gray-500" aria-label="rocket" />,
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <img
            src={value.author.avatar_url}
            alt={value.author.login}
            className="w-10 h-10 rounded-full object-cover mr-3"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                value.author.login,
              )}&background=ccc&color=fff`;
            }}
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 truncate">{releaseName}</h2>
            <div className="flex items-center text-sm text-gray-500">
              <span>by {value.author.login}</span>
              <LucideReact.Calendar size={14} className="ml-2 mr-1" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-1">
          {isDraft && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Draft
            </span>
          )}
          {isPrerelease && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Prerelease
            </span>
          )}
        </div>
      </div>

      {value.body && (
        <p className="mt-2 text-gray-700 text-sm line-clamp-3">{value.body}</p>
      )}

      {assetCount > 0 && (
        <div className="mt-4">
          <span className="text-sm font-medium text-gray-800">Assets ({assetCount})</span>
          <ul className="mt-1 space-y-1 max-h-40 overflow-auto">
            {value.assets.map((asset) => (
              <li key={asset.id} className="flex items-center text-sm text-gray-600">
                <LucideReact.FileText size={16} className="mr-2 text-indigo-500" />
                <span className="truncate">
                  {asset.name} ({(asset.size / 1024).toFixed(1)} KB)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {reactionEntries.length > 0 && (
        <div className="mt-4 flex items-center flex-wrap gap-4">
          {reactionEntries.map(([type, count]) => (
            <div key={type} className="flex items-center text-sm text-gray-600 space-x-1">
              {iconMap[type]}
              <span>{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
