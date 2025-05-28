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
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_codeql_database;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const uploaderName = value.uploader.name ?? value.uploader.login;
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    uploaderName,
  )}&background=0D8ABC&color=fff`;

  const formatBytes = (bytes: number): string => {
    const k = 1024;
    if (bytes < k) return `${bytes} B`;
    const sizes = ['KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k)) - 1;
    const num = bytes / Math.pow(k, i + 2);
    return `${num.toFixed(2).replace(/\.00$/, '')} ${sizes[i]}`;
  };

  const formattedSize = formatBytes(value.size);
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const commitHash = value.commit_oid ? value.commit_oid.slice(0, 7) : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={value.uploader.avatar_url}
          alt={`${uploaderName} avatar`}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.onerror = null;
            img.src = avatarFallback;
          }}
        />
        <div>
          <div className="text-gray-900 font-semibold">{uploaderName}</div>
          <div className="text-gray-500 text-sm">@{value.uploader.login}</div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800">{value.name}</h2>
        <div className="mt-1">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {value.language}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.FileText size={16} />
          <span>{value.content_type}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Archive size={16} />
          <span>{formattedSize}</span>
        </div>
        <div className="flex items-center space-x-1 col-span-2">
          <LucideReact.Link size={16} />
          <span className="truncate">{value.url}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Updated: {updatedAt}</span>
        </div>
        {commitHash && (
          <div className="flex items-center space-x-1">
            <LucideReact.Code size={16} />
            <span>{commitHash}</span>
          </div>
        )}
      </div>
    </div>
  );
}
