import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Base Gist
     *
     * @title Base Gist
    */
    export interface base_gist {
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
                /**
                 * The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.
                */
                encoding?: string & tags.Default<"utf-8">;
            };
        };
        "public": boolean;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        description: string | null;
        comments: number & tags.Type<"int32">;
        comments_enabled?: boolean;
        user: AutoViewInputSubTypes.nullable_simple_user;
        comments_url: string & tags.Format<"uri">;
        owner?: AutoViewInputSubTypes.simple_user;
        truncated?: boolean;
        forks?: any[];
        history?: any[];
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
export type AutoViewInput = AutoViewInputSubTypes.base_gist;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const author = value.owner ?? value.user;
  const authorName = author?.name ?? author?.login ?? "Unknown";
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const fileNames = Object.keys(value.files);
  const filesCount = fileNames.length;
  const previewFiles = fileNames.slice(0, 3);
  const remainingFiles = filesCount > 3 ? filesCount - 3 : 0;
  const rawDescription = value.description ?? "No description provided.";
  const description =
    rawDescription.length > 120 ? rawDescription.slice(0, 120) + "…" : rawDescription;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      {/* Header: Author and Visibility */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {author && (
            <img
              src={author.avatar_url}
              alt={`${author.login}'s avatar`}
              className="w-8 h-8 rounded-full object-cover mr-2"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  authorName,
                )}&background=random&color=fff`;
              }}
            />
          )}
          <span className="text-sm font-medium text-gray-800">{authorName}</span>
        </div>
        <div className="flex items-center">
          {value.public ? (
            <LucideReact.Unlock className="text-green-500" size={18} strokeWidth={1.5} aria-label="Public" />
          ) : (
            <LucideReact.Lock className="text-red-500" size={18} strokeWidth={1.5} aria-label="Private" />
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-3 line-clamp-3">{description}</p>

      {/* Files Preview */}
      {filesCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {previewFiles.map((name) => (
            <span
              key={name}
              className="flex items-center text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1"
            >
              <LucideReact.FileText className="mr-1 text-indigo-500" size={14} strokeWidth={1.5} />
              {name}
            </span>
          ))}
          {remainingFiles > 0 && (
            <span className="flex items-center text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
              +{remainingFiles} more
            </span>
          )}
        </div>
      )}

      {/* Footer: Dates and Comments */}
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-1" size={12} strokeWidth={1.5} />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.RefreshCw className="mr-1" size={12} strokeWidth={1.5} />
          <span>Updated: {updatedAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.MessageCircle className="mr-1" size={12} strokeWidth={1.5} />
          <span>{value.comments} comments</span>
        </div>
      </div>
    </div>
  );
}
