import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
}
export type AutoViewInput = AutoViewInputSubTypes.release_asset;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived data and formatting
  const displayName = value.label ?? value.name;
  const formattedSize = (() => {
    let size = value.size;
    const units = ["B", "KB", "MB", "GB", "TB"];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(1)} ${units[i]}`;
  })();
  const formattedCreated = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedUpdated = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const stateIcon =
    value.state === "uploaded" ? (
      <LucideReact.CheckCircle
        className="text-green-500"
        size={16}
        aria-label="Uploaded"
      />
    ) : (
      <LucideReact.FolderOpen
        className="text-yellow-500"
        size={16}
        aria-label="Open"
      />
    );
  const uploaderName =
    value.uploader?.name ?? value.uploader?.login ?? "Unknown Uploader";
  const avatarSrc =
    value.uploader?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(uploaderName)}`;

  // 2. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <div className="flex items-center gap-3">
        <LucideReact.FileText className="text-indigo-500" size={24} />
        <h2 className="flex-1 text-lg font-semibold text-gray-800 truncate">
          {displayName}
        </h2>
        <div className="flex items-center gap-1">
          {stateIcon}
          <span className="text-sm text-gray-600 capitalize">{value.state}</span>
        </div>
      </div>

      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <LucideReact.Tag className="text-gray-400" size={16} />
          <span className="truncate">{value.content_type}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Archive className="text-gray-400" size={16} />
          <span>{formattedSize}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Download className="text-gray-400" size={16} />
          <span>{value.download_count} downloads</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span>Created: {formattedCreated}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span>Updated: {formattedUpdated}</span>
        </div>
      </div>

      {value.uploader && (
        <div className="mt-4 flex items-center">
          <img
            src={avatarSrc}
            alt={uploaderName}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                uploaderName,
              )}`;
            }}
          />
          <div className="ml-3 text-sm">
            <div className="font-medium text-gray-800">{uploaderName}</div>
            <div className="text-gray-600">ID: {value.uploader.id}</div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm text-blue-600">
          <LucideReact.Link size={16} />
          <span className="truncate block" title={value.browser_download_url}>
            {value.browser_download_url}
          </span>
        </div>
      </div>
    </div>
  );
}
