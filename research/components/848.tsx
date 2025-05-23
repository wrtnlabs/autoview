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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const formattedSize = formatBytes(value.size);
  const formattedCreated = new Date(value.created_at).toLocaleString();
  const formattedUpdated = new Date(value.updated_at).toLocaleString();
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);

  const uploaderLogin = value.uploader?.login ?? "Unknown uploader";
  const avatarUrl =
    value.uploader?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      uploaderLogin
    )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Uploader Info */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
          <img
            src={avatarUrl}
            alt={uploaderLogin}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  uploaderLogin
                )}&background=0D8ABC&color=fff`;
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">{uploaderLogin}</span>
          <span className="text-xs text-gray-500">Created: {formattedCreated}</span>
        </div>
      </div>

      {/* Asset Name and Label */}
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <LucideReact.FileText className="text-indigo-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h3>
        </div>
        {value.label && (
          <p className="mt-1 text-sm text-gray-500 truncate">{value.label}</p>
        )}
      </div>

      {/* Details Grid */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>{new Date(value.created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Updated: {formattedUpdated}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Download size={16} />
          <span>{value.download_count.toLocaleString()} downloads</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.HardDrive size={16} />
          <span>{formattedSize}</span>
        </div>
      </div>

      {/* State */}
      <div className="mt-4 flex items-center text-sm text-gray-700">
        <span>Status:</span>
        {value.state === "open" ? (
          <LucideReact.CheckCircle
            className="ml-2 text-green-500"
            size={16}
            aria-label={stateLabel}
          />
        ) : (
          <LucideReact.UploadCloud
            className="ml-2 text-gray-500"
            size={16}
            aria-label={stateLabel}
          />
        )}
        <span className="ml-1">{stateLabel}</span>
      </div>
    </div>
  );
}
