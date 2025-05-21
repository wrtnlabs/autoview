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
  const owner = value.owner;
  const createdDate = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : "Unknown date";
  const updatedDate = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : null;
  const fileKeys = value.files
    ? Object.keys(value.files).filter((key) => value.files && value.files[key] != null)
    : [];
  const fileCount = fileKeys.length;
  const forksCount = value.forks?.length ?? 0;
  const commentsCount = value.comments ?? 0;

  // Prepare file items with name and language
  const fileItems = fileKeys.map((key) => {
    const file = value.files![key]!;
    return {
      name: file.filename ?? key,
      language: file.language ?? "unknown",
    };
  });
  const previewFiles = fileItems.slice(0, 3);
  const moreFiles = fileItems.length - previewFiles.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col space-y-4">
      {/* Header: Owner info and visibility */}
      <div className="flex items-center">
        {owner?.avatar_url && (
          <img
            src={owner.avatar_url}
            alt={`${owner.login} avatar`}
            className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <p className="text-gray-900 font-semibold truncate">{owner?.login || "Unknown User"}</p>
          <p className="text-gray-500 text-xs">Created: {createdDate}</p>
          {updatedDate && <p className="text-gray-500 text-xs">Updated: {updatedDate}</p>}
        </div>
        <span
          className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${
            value.public ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"
          }`}
        >
          {value.public ? "Public" : "Private"}
        </span>
      </div>

      {/* Description */}
      <div className="text-gray-800 text-sm line-clamp-2">
        {value.description || "No description provided."}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div>
          <p className="font-semibold text-gray-900">{fileCount}</p>
          <p className="text-gray-500">Files</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{forksCount}</p>
          <p className="text-gray-500">Forks</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{commentsCount}</p>
          <p className="text-gray-500">Comments</p>
        </div>
      </div>

      {/* File previews */}
      {fileItems.length > 0 && (
        <div>
          <p className="text-gray-700 text-sm font-medium mb-1">Files in this gist:</p>
          <div className="flex flex-wrap gap-2">
            {previewFiles.map((file, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {file.name}
              </span>
            ))}
            {moreFiles > 0 && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{moreFiles} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
