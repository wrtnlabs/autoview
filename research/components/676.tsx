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
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_codeql_database[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatSize = (bytes: number): string => {
    if (bytes >= 1_048_576) {
      return `${(bytes / 1_048_576).toFixed(1)} MB`;
    }
    if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${bytes} B`;
  };

  const truncateCommit = (sha?: string | null): string =>
    sha ? sha.substring(0, 7) : "-";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const databases = value;
  return (
    <div className="p-4">
      {databases.length > 0 ? (
        <div className="space-y-4">
          {databases.map((db) => (
            <div
              key={db.id}
              className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex-shrink-0 flex justify-center items-center p-4 bg-gray-50">
                <img
                  src={db.uploader.avatar_url}
                  alt={`${db.uploader.login} avatar`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {db.name}
                </h2>
                <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600 space-x-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {db.language}
                  </span>
                  <span>{formatSize(db.size)}</span>
                  <span>Created: {formatDate(db.created_at)}</span>
                  <span>Updated: {formatDate(db.updated_at)}</span>
                  <span className="px-1 bg-gray-100 text-gray-700 rounded">
                    {truncateCommit(db.commit_oid)}
                  </span>
                </div>
                <div className="mt-3 text-sm text-gray-700">
                  Uploaded by{" "}
                  <span className="font-medium">{db.uploader.login}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No databases available.
        </div>
      )}
    </div>
  );
}
