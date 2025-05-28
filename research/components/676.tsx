import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A CodeQL database.
     *
     * @title CodeQL Database
    */
    export interface code_scanning_codeql_database {
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
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_codeql_database[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 2. Handle empty state
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No CodeQL databases available</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((db) => {
        const uploaderName = db.uploader.name ?? db.uploader.login;
        const formattedSize = formatBytes(db.size);
        const createdAt = formatDate(db.created_at);
        const updatedAt = formatDate(db.updated_at);
        const commitShort = db.commit_oid ? db.commit_oid.substring(0, 7) : null;

        return (
          <div
            key={db.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex items-center mb-3">
              <LucideReact.Database className="text-indigo-500" size={20} />
              <h3 className="ml-2 text-lg font-semibold text-gray-900 truncate">
                {db.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <div className="flex items-center">
                <LucideReact.Tag className="text-gray-500" size={16} />
                <span className="ml-1 capitalize">{db.language}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Archive className="text-gray-500" size={16} />
                <span className="ml-1">{formattedSize}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar className="text-gray-500" size={16} />
                <span className="ml-1">{createdAt}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.RefreshCw className="text-gray-500" size={16} />
                <span className="ml-1">{updatedAt}</span>
              </div>
              {commitShort && (
                <div className="flex items-center col-span-1 sm:col-span-2">
                  <LucideReact.GitCommit className="text-gray-500" size={16} />
                  <span className="ml-1 font-mono text-gray-600">{commitShort}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center">
              <img
                src={db.uploader.avatar_url}
                alt={`${uploaderName} avatar`}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    uploaderName,
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <span className="ml-2 text-sm font-medium text-gray-800 truncate">
                {uploaderName}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
