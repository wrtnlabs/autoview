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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedSize = (() => {
    const bytes = value.size;
    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const num = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
    return `${num} ${units[i]}`;
  })();

  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const uploader = value.uploader;
  const avatarFallback = uploader
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        uploader.login,
      )}&background=0D8ABC&color=fff`
    : "";

  function handleImgError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    if (avatarFallback) {
      e.currentTarget.src = avatarFallback;
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Asset name, label, state */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2 truncate">
          <LucideReact.FileText className="text-indigo-500" size={24} />
          <h2 className="text-lg font-medium text-gray-900 truncate">
            {value.name}
          </h2>
          {value.label && (
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800 rounded">
              {value.label}
            </span>
          )}
        </div>
        <div className="mt-2 sm:mt-0 flex items-center">
          {value.state === "open" ? (
            <span className="flex items-center text-green-600">
              <LucideReact.CheckCircle size={16} className="mr-1" />
              Open
            </span>
          ) : (
            <span className="flex items-center text-blue-600">
              <LucideReact.UploadCloud size={16} className="mr-1" />
              Uploaded
            </span>
          )}
        </div>
      </div>

      {/* Details list */}
      <div className="space-y-3 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <LucideReact.Download size={16} className="text-gray-400" />
          <span>{value.download_count.toLocaleString()} downloads</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Tag size={16} className="text-gray-400" />
          <span>{value.content_type}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Folder size={16} className="text-gray-400" />
          <span>{formattedSize}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Clock size={16} className="text-gray-400" />
          <span>Updated: {updatedAt}</span>
        </div>

        {/* Uploader info */}
        {uploader && (
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            <img
              src={uploader.avatar_url}
              onError={handleImgError}
              alt={uploader.login}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-gray-800 truncate">{uploader.login}</span>
          </div>
        )}
      </div>
    </div>
  );
}
