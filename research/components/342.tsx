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
  const filesArray = value.files
    ? Object.entries(value.files)
        .filter(([, file]) => file != null)
        .map(([key, file]) => ({
          name: file?.filename ?? key,
          language: file?.language,
          size: file?.size,
        }))
    : [];
  const firstFile = filesArray[0];
  const title = firstFile?.name ?? "Gist";
  const description = value.description ?? "No description";
  const owner = value.owner;
  const avatarUrl =
    owner?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      owner?.login ?? "User"
    )}&background=0D8ABC&color=fff`;
  const isPublic = value["public"] ?? false;
  const forksCount = value.forks?.length ?? 0;
  const commentsCount = value.comments ?? 0;
  const historyCount = value.history?.length ?? 0;
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleDateString()
    : "";
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString()
    : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h2>
        {isPublic ? (
          <LucideReact.Unlock
            size={16}
            className="text-green-500"
            aria-label="Public"
          />
        ) : (
          <LucideReact.Lock
            size={16}
            className="text-red-500"
            aria-label="Private"
          />
        )}
      </div>

      {owner && (
        <div className="flex items-center mb-2">
          <img
            src={avatarUrl}
            alt={owner.login}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                owner.login
              )}&background=0D8ABC&color=fff`;
            }}
          />
          <span className="ml-2 text-gray-700 text-sm truncate">
            {owner.name ?? owner.login}
          </span>
        </div>
      )}

      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{description}</p>

      <ul className="flex flex-wrap items-center text-gray-500 text-sm space-x-4 mb-4">
        <li className="flex items-center">
          <LucideReact.FileText size={16} className="text-indigo-500" />
          <span className="ml-1">
            {filesArray.length} file{filesArray.length !== 1 ? "s" : ""}
          </span>
        </li>
        <li className="flex items-center">
          <LucideReact.GitBranch size={16} className="text-gray-500" />
          <span className="ml-1">{forksCount}</span>
        </li>
        <li className="flex items-center">
          <LucideReact.MessageCircle size={16} className="text-gray-500" />
          <span className="ml-1">{commentsCount}</span>
        </li>
        {historyCount > 0 && (
          <li className="flex items-center">
            <LucideReact.Clock size={16} className="text-gray-500" />
            <span className="ml-1">{historyCount}</span>
          </li>
        )}
      </ul>

      <div className="grid grid-cols-2 gap-2 text-gray-500 text-xs">
        {createdAt && (
          <div className="flex items-center">
            <LucideReact.Calendar size={14} />
            <span className="ml-1">Created: {createdAt}</span>
          </div>
        )}
        {updatedAt && (
          <div className="flex items-center">
            <LucideReact.RefreshCcw size={14} />
            <span className="ml-1">Updated: {updatedAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
