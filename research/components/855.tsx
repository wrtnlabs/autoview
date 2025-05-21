import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
}
export type AutoViewInput = AutoViewInputSubTypes.release_asset[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(1)} GB`;
  };

  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return `${num}`;
  };

  const assets = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!assets || assets.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No assets to display.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="p-4 bg-white rounded-lg shadow flex items-center"
        >
          <div className="flex-shrink-0">
            {asset.uploader ? (
              <img
                src={asset.uploader.avatar_url}
                alt={asset.uploader.login}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200" />
            )}
          </div>
          <div className="ml-4 flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {asset.name}
            </h3>
            {asset.label && (
              <p className="mt-1 text-sm text-gray-500 truncate">
                {asset.label}
              </p>
            )}
            <div className="mt-2 text-sm text-gray-600 flex flex-wrap items-center space-x-2">
              <span>{formatSize(asset.size)}</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>
                {formatNumber(asset.download_count)} downloads
              </span>
              <span className="hidden sm:inline">&bull;</span>
              <span>{formatDate(asset.created_at)}</span>
            </div>
          </div>
          <span
            className={
              "ml-4 inline-flex items-center px-2 py-1 rounded text-xs font-medium " +
              (asset.state === "uploaded"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800")
            }
          >
            {asset.state === "uploaded" ? "Uploaded" : "Open"}
          </span>
        </div>
      ))}
    </div>
  );
}
