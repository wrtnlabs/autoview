import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Gist Simple
     *
     * @title Gist Simple
    */
    export type gist_simple = {
        forks?: {
            id?: string;
            url?: string & tags.Format<"uri">;
            user?: any;
            created_at?: string & tags.Format<"date-time">;
            updated_at?: string & tags.Format<"date-time">;
        }[] | null;
        history?: any[] | null;
        /**
         * Gist
         *
         * @title Gist
        */
        fork_of?: {
            url: string & tags.Format<"uri">;
            forks_url: string & tags.Format<"uri">;
            commits_url: string & tags.Format<"uri">;
            id: string;
            node_id: string;
            git_pull_url: string & tags.Format<"uri">;
            git_push_url: string & tags.Format<"uri">;
            html_url: string & tags.Format<"uri">;
            files: {
                [key: string]: {
                    filename?: string;
                    type?: string;
                    language?: string;
                    raw_url?: string;
                    size?: number & tags.Type<"int32">;
                };
            };
            "public": boolean;
            created_at: string & tags.Format<"date-time">;
            updated_at: string & tags.Format<"date-time">;
            description: string | null;
            comments: number & tags.Type<"int32">;
            comments_enabled?: boolean;
            user: any;
            comments_url: string & tags.Format<"uri">;
            owner?: any;
            truncated?: boolean;
            forks?: any[];
            history?: any[];
        } | null;
        url?: string;
        forks_url?: string;
        commits_url?: string;
        id?: string;
        node_id?: string;
        git_pull_url?: string;
        git_push_url?: string;
        html_url?: string;
        files?: {
            [key: string]: {
                filename?: string;
                type?: string;
                language?: string;
                raw_url?: string;
                size?: number & tags.Type<"int32">;
                truncated?: boolean;
                content?: string;
                /**
                 * The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.
                */
                encoding?: string & tags.Default<"utf-8">;
            } | null;
        };
        "public"?: boolean;
        created_at?: string;
        updated_at?: string;
        description?: string | null;
        comments?: number & tags.Type<"int32">;
        comments_enabled?: boolean;
        user?: string | null;
        comments_url?: string;
        owner?: AutoViewInputSubTypes.simple_user;
        truncated?: boolean;
    };
    export type public_user = any;
    export type gist_history = any;
    export type nullable_simple_user = any;
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
export type AutoViewInput = AutoViewInputSubTypes.gist_simple;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = value.created_at
    ? new Date(value.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const updatedDate = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const forksCount = value.forks?.length ?? 0;
  const commentsCount = value.comments ?? 0;

  // Files info: filter out null entries
  const fileEntries = value.files
    ? (Object.entries(value.files).filter(
        ([, f]) => f != null
      ) as [string, NonNullable<typeof value.files[string]>][])
    : [];
  const fileCount = fileEntries.length;
  const filesInfo = fileEntries.map(([key, file]) => ({
    name: file.filename ?? key,
    size: file.size ?? 0,
  }));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Owner, Creation Date, Visibility */}
      <div className="flex items-center space-x-3 mb-4">
        {value.owner?.avatar_url && (
          <img
            src={value.owner.avatar_url}
            alt={value.owner.login}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 font-semibold truncate">
            {value.owner?.login || "Unknown Owner"}
          </p>
          {createdDate && (
            <p className="text-gray-500 text-xs">{createdDate}</p>
          )}
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value.public
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value.public ? "Public" : "Private"}
        </span>
      </div>

      {/* Description */}
      {value.description != null && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {value.description}
        </p>
      )}

      {/* Files List */}
      <div className="mb-4">
        <p className="text-gray-900 text-sm font-medium mb-2">
          Files ({fileCount})
        </p>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 max-h-24 overflow-auto">
          {filesInfo.map((file) => (
            <li key={file.name} className="truncate">
              <span className="font-medium">{file.name}</span>
              {file.size !== undefined && ` — ${file.size} bytes`}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center text-gray-500 text-xs space-x-4">
        <span>
          {commentsCount} comment{commentsCount === 1 ? "" : "s"}
        </span>
        <span>
          {forksCount} fork{forksCount === 1 ? "" : "s"}
        </span>
        {updatedDate && <span>Updated {updatedDate}</span>}
      </div>

      {/* Forked From Info */}
      {value.fork_of != null && (
        <div className="mt-4 text-xs text-gray-500">
          <p className="truncate">
            Forked from gist ID:{" "}
            <span className="font-medium">{value.fork_of.id}</span>
          </p>
        </div>
      )}
    </div>
  );
}
