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
export type AutoViewInput =
  AutoViewInputSubTypes.code_scanning_codeql_database[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.length;
  const totalSizeBytes = value.reduce((sum, db) => sum + db.size, 0);
  const languagesCount: Record<string, number> = {};
  value.forEach((db) => {
    languagesCount[db.language] = (languagesCount[db.language] || 0) + 1;
  });

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(1)} GB`;
  };

  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-6">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow">
        <div className="text-gray-700">
          <span className="font-semibold">{totalCount}</span> databases •{" "}
          <span className="font-semibold">{formatBytes(totalSizeBytes)}</span>{" "}
          total
        </div>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          {Object.entries(languagesCount).map(([lang, cnt]) => (
            <span
              key={lang}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {lang}: {cnt}
            </span>
          ))}
        </div>
      </div>

      {/* List of databases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {value.map((db) => (
          <div
            key={db.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex flex-col"
          >
            {/* Name & Language */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {db.name}
              </h3>
              <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                {db.language}
              </span>
            </div>

            {/* Uploader */}
            <div className="flex items-center text-gray-600 mb-3">
              <LucideReact.User size={16} className="mr-1" />
              <img
                src={db.uploader.avatar_url}
                alt={db.uploader.login}
                className="w-6 h-6 rounded-full object-cover mr-2"
                onError={(e) =>
                  (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    db.uploader.login,
                  )}&background=0D8ABC&color=fff`)
                }
              />
              <span className="truncate">{db.uploader.login}</span>
            </div>

            {/* Size & Dates */}
            <div className="flex flex-wrap text-gray-500 text-sm gap-3 mb-4">
              <div className="flex items-center">
                <LucideReact.FileText size={16} className="mr-1" />
                <span>{formatBytes(db.size)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="mr-1" />
                <span title={db.created_at}>{formatDate(db.created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.RefreshCcw size={16} className="mr-1" />
                <span title={db.updated_at}>{formatDate(db.updated_at)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
              <a
                href={db.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm"
              >
                <LucideReact.Download size={16} className="mr-1" />
                Download
              </a>
              {db.commit_oid && (
                <span className="text-gray-400 text-xs truncate">
                  Commit: {db.commit_oid.slice(0, 7)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
