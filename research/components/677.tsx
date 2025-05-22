import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A CodeQL database.
   *
   * @title CodeQL Database
   */
  export type code_scanning_codeql_database = {
    /**
     * The ID of the CodeQL database.
     */
    id: number & tags.Type<"int32">;
    /**
     * The name of the CodeQL database.
     */
    name: string;
    /**
     * The language of the CodeQL database.
     */
    language: string;
    uploader: AutoViewInputSubTypes.simple_user;
    /**
     * The MIME type of the CodeQL database file.
     */
    content_type: string;
    /**
     * The size of the CodeQL database file in bytes.
     */
    size: number & tags.Type<"int32">;
    /**
     * The date and time at which the CodeQL database was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
     */
    created_at: string;
    /**
     * The date and time at which the CodeQL database was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
     */
    updated_at: string;
    /**
     * The URL at which to download the CodeQL database. The `Accept` header must be set to the value of the `content_type` property.
     */
    url: string;
    /**
     * The commit SHA of the repository at the time the CodeQL database was created.
     */
    commit_oid?: string | null;
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_codeql_database;

// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + " KB";
    const mb = kb / 1024;
    if (mb < 1024) return mb.toFixed(1) + " MB";
    const gb = mb / 1024;
    return gb.toFixed(1) + " GB";
  };
  const formattedSize = formatBytes(value.size);

  const commitShort = value.commit_oid
    ? value.commit_oid.substring(0, 7)
    : null;
  const uploaderName = value.uploader.name ?? value.uploader.login;
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    uploaderName,
  )}&background=random`;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Database Name */}
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {value.name}
      </h2>

      {/* Language Badge */}
      <div className="mt-2">
        <span className="inline-block bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded">
          {value.language}
        </span>
      </div>

      {/* Metadata Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
        {/* Uploader Info */}
        <div className="flex items-center gap-2">
          <LucideReact.User size={16} className="text-gray-400" />
          <div className="flex items-center gap-1">
            <img
              src={value.uploader.avatar_url}
              alt={uploaderName}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = avatarPlaceholder;
              }}
            />
            <span className="truncate">{uploaderName}</span>
          </div>
        </div>

        {/* Creation Date */}
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {formattedCreatedAt}</span>
        </div>

        {/* File Size */}
        <div className="flex items-center gap-1">
          <LucideReact.FileText size={16} className="text-gray-400" />
          <span>{formattedSize}</span>
        </div>

        {/* Commit OID (if available) */}
        {commitShort && (
          <div className="flex items-center gap-1">
            <LucideReact.GitBranch size={16} className="text-gray-400" />
            <span className="font-mono">{commitShort}</span>
          </div>
        )}
      </div>
    </div>
  );
}
