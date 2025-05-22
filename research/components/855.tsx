import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
    if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(1)} KB`;
    return `${bytes} B`;
  };

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?name=Unknown&background=ddd&color=777";

  // 2. Handle empty or missing data
  if (!value || value.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <LucideReact.AlertCircle
          size={32}
          className="mx-auto mb-2 text-gray-400"
          aria-hidden="true"
        />
        <p>No release assets available.</p>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {value.map((asset) => (
        <div
          key={asset.id}
          className="overflow-hidden p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          {/* Header: File icon, name and optional label */}
          <div className="flex items-center space-x-2">
            <LucideReact.FileText
              size={20}
              className="text-indigo-500 flex-shrink-0"
              aria-hidden="true"
            />
            <h3
              className="flex-1 text-lg font-semibold text-gray-800 truncate"
              title={asset.name}
            >
              {asset.name}
            </h3>
            {asset.label && (
              <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                {asset.label}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <LucideReact.Tag
                size={16}
                className="text-gray-400 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{asset.content_type}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.Download
                size={16}
                className="text-gray-400 flex-shrink-0"
                aria-hidden="true"
              />
              <span>{formatSize(asset.size)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.ArrowDownCircle
                size={16}
                className="text-gray-400 flex-shrink-0"
                aria-hidden="true"
              />
              <span>{asset.download_count} downloads</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar
                size={16}
                className="text-gray-400 flex-shrink-0"
                aria-hidden="true"
              />
              <span>Created {formatDate(asset.created_at)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar
                size={16}
                className="text-gray-400 flex-shrink-0"
                aria-hidden="true"
              />
              <span>Updated {formatDate(asset.updated_at)}</span>
            </div>
            <div className="flex items-center space-x-1">
              {asset.state === "uploaded" ? (
                <LucideReact.UploadCloud
                  size={16}
                  className="text-amber-500 flex-shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <LucideReact.FolderOpen
                  size={16}
                  className="text-green-500 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
              <span
                className={
                  asset.state === "uploaded"
                    ? "text-amber-600"
                    : "text-green-600"
                }
              >
                {asset.state.charAt(0).toUpperCase() + asset.state.slice(1)}
              </span>
            </div>
          </div>

          {/* Uploader Info */}
          <div className="mt-4 flex items-center space-x-2">
            <img
              src={asset.uploader?.avatar_url ?? DEFAULT_AVATAR}
              alt={asset.uploader?.login ?? "Unknown uploader"}
              className="w-6 h-6 rounded-full object-cover bg-gray-100"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_AVATAR;
              }}
            />
            <span className="text-sm font-medium text-gray-700 truncate">
              {asset.uploader?.login ?? "Unknown"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
