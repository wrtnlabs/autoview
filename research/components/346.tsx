import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Gist Simple
     *
     * @title Gist Simple
    */
    export interface gist_simple {
        forks?: {
            id?: string;
            url?: string & tags.Format<"uri">;
            user?: AutoViewInputSubTypes.public_user;
            created_at?: string & tags.Format<"date-time">;
            updated_at?: string & tags.Format<"date-time">;
        }[] | null;
        history?: AutoViewInputSubTypes.gist_history[] | null;
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
            user: AutoViewInputSubTypes.nullable_simple_user;
            comments_url: string & tags.Format<"uri">;
            owner?: AutoViewInputSubTypes.nullable_simple_user;
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
    }
    /**
     * Public User
     *
     * @title Public User
    */
    export interface public_user {
        login: string;
        id: number & tags.Type<"int32">;
        user_view_type?: string;
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
        name: string | null;
        company: string | null;
        blog: string | null;
        location: string | null;
        email: (string & tags.Format<"email">) | null;
        notification_email?: (string & tags.Format<"email">) | null;
        hireable: boolean | null;
        bio: string | null;
        twitter_username?: string | null;
        public_repos: number & tags.Type<"int32">;
        public_gists: number & tags.Type<"int32">;
        followers: number & tags.Type<"int32">;
        following: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        plan?: {
            collaborators: number & tags.Type<"int32">;
            name: string;
            space: number & tags.Type<"int32">;
            private_repos: number & tags.Type<"int32">;
        };
        private_gists?: number & tags.Type<"int32">;
        total_private_repos?: number & tags.Type<"int32">;
        owned_private_repos?: number & tags.Type<"int32">;
        disk_usage?: number & tags.Type<"int32">;
        collaborators?: number & tags.Type<"int32">;
    }
    /**
     * Gist History
     *
     * @title Gist History
    */
    export interface gist_history {
        user?: AutoViewInputSubTypes.nullable_simple_user;
        version?: string;
        committed_at?: string & tags.Format<"date-time">;
        change_status?: {
            total?: number & tags.Type<"int32">;
            additions?: number & tags.Type<"int32">;
            deletions?: number & tags.Type<"int32">;
        };
        url?: string & tags.Format<"uri">;
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
export type AutoViewInput = AutoViewInputSubTypes.gist_simple;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const ownerName =
    value.owner?.login ||
    (typeof value.user === "string" ? value.user : "Unknown");
  const ownerAvatar =
    value.owner?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      ownerName,
    )}&background=0D8ABC&color=fff`;
  const forksCount = value.forks?.length ?? 0;
  const historyCount = value.history?.length ?? 0;
  const commentsCount = value.comments ?? 0;

  const fileEntries = value.files
    ? Object.entries(value.files).filter(
        ([, file]) => file !== null && file !== undefined,
      )
    : [];
  const fileCount = fileEntries.length;
  const displayedFiles = fileEntries.slice(0, 3);
  const moreFiles = fileCount - displayedFiles.length;

  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const isPublic = value["public"] !== false;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Description */}
      <div className="flex items-center justify-between">
        <p className="text-gray-800 font-semibold text-lg line-clamp-2">
          {value.description || "No description"}
        </p>
        {value.fork_of && (
          <div className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            <LucideReact.GitBranch size={12} />
            Forked
          </div>
        )}
      </div>

      {/* Owner and Status */}
      <div className="flex items-center gap-2 mt-3">
        <img
          src={ownerAvatar}
          alt={ownerName}
          className="h-8 w-8 rounded-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              ownerName,
            )}&background=0D8ABC&color=fff`;
          }}
        />
        <span className="text-gray-700 text-sm font-medium">{ownerName}</span>
        <span className="ml-auto inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600">
          {isPublic ? (
            <LucideReact.Unlock size={14} className="text-green-500 mr-1" />
          ) : (
            <LucideReact.Lock size={14} className="text-red-500 mr-1" />
          )}
          {isPublic ? "Public" : "Private"}
        </span>
      </div>

      {/* Dates */}
      {(createdAt || updatedAt) && (
        <div className="flex items-center gap-4 text-gray-500 text-xs mt-2">
          {createdAt && (
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={14} />
              <span>Created: {createdAt}</span>
            </div>
          )}
          {updatedAt && (
            <div className="flex items-center gap-1">
              <LucideReact.Edit3 size={14} />
              <span>Updated: {updatedAt}</span>
            </div>
          )}
        </div>
      )}

      {/* Files */}
      <div className="mt-4">
        <div className="text-gray-600 text-sm font-medium">
          Files ({fileCount})
        </div>
        <ul className="mt-1 space-y-1">
          {displayedFiles.map(([name], idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-gray-700 text-sm truncate"
            >
              <LucideReact.FileText
                size={16}
                className="text-indigo-500 flex-shrink-0"
              />
              <span className="truncate">{name}</span>
            </li>
          ))}
        </ul>
        {moreFiles > 0 && (
          <p className="mt-1 text-gray-500 text-xs">+{moreFiles} more</p>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-gray-500 text-sm mt-4">
        <div className="flex items-center gap-1">
          <LucideReact.GitBranch size={16} />
          <span>{forksCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.History size={16} />
          <span>{historyCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.MessageCircle size={16} />
          <span>{commentsCount}</span>
        </div>
      </div>
    </div>
  );
}
