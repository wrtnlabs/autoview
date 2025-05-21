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
export type AutoViewInput = AutoViewInputSubTypes.release_asset;



// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation / derived constants
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };
  const formattedSize = formatBytes(value.size);
  const formattedDownloads = new Intl.NumberFormat().format(value.download_count);
  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const updatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const stateLabel = value.state === 'uploaded' ? 'Uploaded' : 'Open';
  const stateColorClasses =
    value.state === 'uploaded'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  const host = (() => {
    try {
      return new URL(value.browser_download_url).hostname;
    } catch {
      return value.browser_download_url;
    }
  })();
  const uploaderName = value.uploader?.login ?? 'Unknown';
  const avatarUrl = value.uploader?.avatar_url;

  // 2. JSX structure with Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
      {/* Asset summary */}
      <div className="flex-1 flex items-start space-x-3">
        <div className="text-2xl">📦</div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {value.name}
          </h3>
          {value.label && (
            <p className="text-sm text-gray-500 truncate">{value.label}</p>
          )}
          <p className="mt-1 text-sm text-gray-400 truncate">{host}</p>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-3 md:gap-x-8">
        <div className="col-span-2 md:col-auto">
          <span
            className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${stateColorClasses}`}
          >
            {stateLabel}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Type</p>
          <p className="text-sm font-medium text-gray-800 truncate">
            {value.content_type}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Size</p>
          <p className="text-sm font-medium text-gray-800">
            {formattedSize}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Downloads</p>
          <p className="text-sm font-medium text-gray-800">
            {formattedDownloads}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Created</p>
          <p className="text-sm font-medium text-gray-800">{createdAt}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Updated</p>
          <p className="text-sm font-medium text-gray-800">{updatedAt}</p>
        </div>

        {/* Uploader info */}
        <div className="col-span-full flex items-center space-x-2 mt-2">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={uploaderName}
              className="w-5 h-5 rounded-full"
            />
          )}
          <p className="text-sm text-gray-700 truncate">
            Uploaded by: {uploaderName}
          </p>
        </div>
      </div>
    </div>
  );
}
