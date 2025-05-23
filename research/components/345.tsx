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
  // 1. Data aggregation and derived constants
  const forksCount = value.forks?.length ?? 0;
  const historyCount = value.history?.length ?? 0;
  const filesCount = value.files
    ? Object.entries(value.files).reduce((count, [, file]) => (file ? count + 1 : count), 0)
    : 0;
  const isPublic = value["public"] ?? false;
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : null;
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : null;
  const description = value.description ?? "";
  const owner = value.owner;
  // Generate a placeholder avatar if the real one fails
  const avatarPlaceholder = owner
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(owner.name ?? owner.login)}&background=0D8ABC&color=fff`
    : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      {/* Header: Owner info or fallback */}
      {owner ? (
        <div className="flex items-center space-x-3">
          <img
            src={owner.avatar_url}
            alt={owner.login}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = avatarPlaceholder;
            }}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {owner.name ?? owner.login}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <LucideReact.User size={12} />
              <span>{owner.login}</span>
            </div>
          </div>
          {isPublic ? (
            <LucideReact.Unlock className="text-green-500" size={16} />
          ) : (
            <LucideReact.Lock className="text-gray-500" size={16} />
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-1 text-gray-900 font-medium">
            <LucideReact.Code size={16} />
            <span>Gist {value.id ?? ""}</span>
          </div>
          {isPublic ? (
            <LucideReact.Unlock className="ml-auto text-green-500" size={16} />
          ) : (
            <LucideReact.Lock className="ml-auto text-gray-500" size={16} />
          )}
        </div>
      )}

      {/* Description */}
      <div className="text-gray-800 text-sm line-clamp-2">{description}</div>

      {/* Stats: files, forks, revisions */}
      <div className="grid grid-cols-3 gap-4 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <LucideReact.FileText size={16} />
          <span>
            {filesCount} {filesCount === 1 ? "File" : "Files"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.GitBranch size={16} />
          <span>
            {forksCount} {forksCount === 1 ? "Fork" : "Forks"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.History size={16} />
          <span>
            {historyCount} {historyCount === 1 ? "Revision" : "Revisions"}
          </span>
        </div>
      </div>

      {/* Timestamps */}
      <div className="flex flex-wrap items-center space-x-4 text-gray-500 text-xs">
        {createdAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={12} />
            <span>Created: {createdAt}</span>
          </div>
        )}
        {updatedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Edit2 size={12} />
            <span>Updated: {updatedAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
