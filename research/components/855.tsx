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
export type AutoViewInput = AutoViewInputSubTypes.release_asset[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalAssets = value.length;
  const totalSize = value.reduce((acc, a) => acc + a.size, 0);
  const totalDownloads = value.reduce((acc, a) => acc + a.download_count, 0);

  function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Assets Summary</h2>
        <div className="flex flex-wrap gap-4 mt-3 sm:mt-0 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <LucideReact.List size={16} className="text-gray-500" />
            <span>Total: {totalAssets}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.HardDrive size={16} className="text-gray-500" />
            <span>{formatBytes(totalSize)}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Download size={16} className="text-gray-500" />
            <span>{totalDownloads} downloads</span>
          </div>
        </div>
      </div>

      {/* Asset List */}
      <div className="space-y-4">
        {value.map((item) => {
          const ext = item.name.split(".").pop()?.toLowerCase() || "";
          const createdDate = new Date(item.created_at).toLocaleDateString();
          const uploader = item.uploader;
          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-lg"
            >
              {/* Left: Icon + Details */}
              <div className="flex items-center gap-4 min-w-0">
                {ext === "zip" ? (
                  <LucideReact.Archive
                    size={20}
                    className="text-indigo-500 flex-shrink-0"
                  />
                ) : (
                  <LucideReact.FileText
                    size={20}
                    className="text-gray-500 flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {item.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>{formatBytes(item.size)}</span>
                    <span className="flex items-center gap-1">
                      <LucideReact.Calendar size={14} />
                      <span>{createdDate}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <LucideReact.Link size={14} />
                      <span className="truncate">{item.browser_download_url}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Stats & Uploader */}
              <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <LucideReact.Download size={16} />
                  <span>{item.download_count}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {item.state === "uploaded" ? (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                    />
                  ) : (
                    <LucideReact.Unlock size={16} className="text-blue-500" />
                  )}
                  <span
                    className={`capitalize ${
                      item.state === "uploaded"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {item.state}
                  </span>
                </div>
                {uploader && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <img
                      src={uploader.avatar_url}
                      alt={uploader.name ?? uploader.login}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          (uploader.name ?? uploader.login) as string
                        )}&background=0D8ABC&color=fff`;
                      }}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="truncate">
                      {uploader.name ?? uploader.login}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
