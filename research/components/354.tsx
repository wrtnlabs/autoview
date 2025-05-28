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
  // 1. Define data aggregation/transformation functions or derived constants
  const owner = value.owner;
  const ownerName = owner?.name ?? owner?.login ?? "Unknown";
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    ownerName,
  )}&background=0D8ABC&color=fff`;
  const fileEntries = value.files
    ? Object.entries(value.files).filter(([, f]) => f != null)
    : [];
  const fileCount = fileEntries.length;
  const displayedFiles = fileEntries.slice(0, 2).map(([name]) => name);
  const extraFilesCount = fileCount - displayedFiles.length;
  const forksCount = value.forks?.length ?? 0;
  const historyCount = value.history?.length ?? 0;
  const commentsCount = value.comments ?? 0;
  const isPublic = value["public"] ?? false;
  const formattedDate = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center p-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
          <img
            src={owner?.avatar_url ?? avatarPlaceholder}
            alt={ownerName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = avatarPlaceholder;
            }}
          />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center text-sm font-semibold text-gray-800">
            <LucideReact.User size={16} className="text-gray-500 mr-1" />
            <span className="truncate">{ownerName}</span>
          </div>
          {formattedDate && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <LucideReact.Calendar size={12} className="mr-1" />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 pb-4">
        {value.description != null && value.description !== "" && (
          <p className="text-gray-700 text-sm line-clamp-2 mb-3">
            {value.description}
          </p>
        )}
        <div className="flex flex-wrap items-center text-xs text-gray-500 gap-4">
          <div className="flex items-center">
            <LucideReact.FileText size={12} className="mr-1" />
            <span>
              {fileCount} file{fileCount === 1 ? "" : "s"}
            </span>
          </div>
          <div className="flex items-center">
            <LucideReact.GitBranch size={12} className="mr-1" />
            <span>{forksCount}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Hash size={12} className="mr-1" />
            <span>{historyCount}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.MessageCircle size={12} className="mr-1" />
            <span>{commentsCount}</span>
          </div>
          <div className="flex items-center">
            {isPublic ? (
              <LucideReact.Unlock size={12} className="text-green-500 mr-1" />
            ) : (
              <LucideReact.Lock size={12} className="text-red-500 mr-1" />
            )}
            <span>{isPublic ? "Public" : "Private"}</span>
          </div>
        </div>
        {fileCount > 0 && (
          <div className="mt-3 text-xs text-gray-500">
            <span className="font-semibold">Files:</span>{" "}
            <span className="truncate">
              {displayedFiles.join(", ")}
              {extraFilesCount > 0 ? ` +${extraFilesCount} more` : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
