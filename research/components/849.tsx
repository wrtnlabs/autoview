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
export type AutoViewInput = AutoViewInputSubTypes.release_asset;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived and formatted values
  const authorName = value.uploader?.name ?? value.uploader?.login ?? "Unknown";
  const placeholderAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName,
  )}&background=random&color=fff`;
  const avatarUrl = value.uploader?.avatar_url ?? placeholderAvatarUrl;

  const readableSize = (() => {
    const bytes = value.size;
    if (bytes >= 1e9) return (bytes / 1e9).toFixed(2) + " GB";
    if (bytes >= 1e6) return (bytes / 1e6).toFixed(2) + " MB";
    if (bytes >= 1e3) return (bytes / 1e3).toFixed(2) + " KB";
    return bytes + " B";
  })();

  const readableDownloads =
    value.download_count >= 1000
      ? (value.download_count / 1000).toFixed(1) + "K"
      : String(value.download_count);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const createdAt = formatDate(value.created_at);
  const updatedAt = formatDate(value.updated_at);

  const stateText = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const stateIcon =
    value.state === "uploaded" ? (
      <LucideReact.CheckCircle size={16} className="text-green-500" />
    ) : (
      <LucideReact.Clock size={16} className="text-amber-500" />
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      {/* Header: Avatar, Name & Label, State */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={avatarUrl}
            alt={`${authorName}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.onerror = null;
              img.src = placeholderAvatarUrl;
            }}
          />
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {value.name}
            </h2>
            {value.label && (
              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                {value.label}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-700 space-x-1">
          {stateIcon}
          <span>{stateText}</span>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.File size={16} className="text-indigo-500" />
          <span>Type: {value.content_type}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Archive size={16} className="text-gray-400" />
          <span>Size: {readableSize}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Download size={16} className="text-gray-400" />
          <span>Downloads: {readableDownloads}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Updated: {updatedAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.User size={16} className="text-gray-400" />
          <span>Uploader: {authorName}</span>
        </div>
      </div>
    </div>
  );
}
