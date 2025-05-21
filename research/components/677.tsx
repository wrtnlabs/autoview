import { tags } from "typia";
import React from "react";
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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
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
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const commitShort = value.commit_oid
    ? value.commit_oid.slice(0, 7)
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header: Database Name and Language */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
          {value.language}
        </span>
      </div>

      {/* Metadata Grid */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
        <div>
          <dt className="font-medium">Size</dt>
          <dd>{formatBytes(value.size)}</dd>
        </div>
        <div>
          <dt className="font-medium">Content Type</dt>
          <dd className="truncate">{value.content_type}</dd>
        </div>
        <div>
          <dt className="font-medium">Created</dt>
          <dd>{formatDate(value.created_at)}</dd>
        </div>
        <div>
          <dt className="font-medium">Updated</dt>
          <dd>{formatDate(value.updated_at)}</dd>
        </div>
      </dl>

      {/* Uploader Info */}
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={value.uploader.avatar_url}
          alt={`${value.uploader.login} avatar`}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        <div className="text-sm">
          <p className="font-medium text-gray-800 truncate">
            {value.uploader.login}
          </p>
          {value.uploader.name && (
            <p className="text-gray-500 truncate">{value.uploader.name}</p>
          )}
        </div>
      </div>

      {/* Optional Commit and URL */}
      <div className="text-sm text-gray-600 space-y-2">
        {commitShort && (
          <div>
            <span className="font-medium">Commit:</span>{' '}
            <code className="bg-gray-100 px-1 rounded">{commitShort}</code>
          </div>
        )}
        <div>
          <span className="font-medium">Download URL:</span>
          <p className="mt-1 break-all truncate text-blue-600">
            {value.url}
          </p>
        </div>
      </div>
    </div>
  );
}
