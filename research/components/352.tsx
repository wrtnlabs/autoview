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
export type AutoViewInput = AutoViewInputSubTypes.gist_simple[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso?: string): string =>
    iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "";

  const placeholderAvatar = (login?: string): string =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login ?? "")}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="space-y-4">
      {value.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 text-gray-500">
          <LucideReact.AlertCircle className="mb-2 text-gray-400" size={48} />
          <span className="text-sm">No gists available</span>
        </div>
      ) : (
        value.map((gist, idx) => {
          const desc = gist.description?.trim() || "No description provided.";
          const created = formatDate(gist.created_at);
          const filesCount = gist.files ? Object.keys(gist.files).length : 0;
          const commentsCount = gist.comments ?? 0;
          const isPublic = gist["public"] === true;
          const owner = gist.owner;
          const login = owner?.login;
          const avatarUrl = owner?.avatar_url || placeholderAvatar(login);

          return (
            <article
              key={gist.id ?? idx}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150"
            >
              <header className="flex items-center mb-2">
                <img
                  src={avatarUrl}
                  alt={login ? `${login}'s avatar` : "User avatar"}
                  className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
                />
                <h2 className="font-medium text-gray-900 truncate">
                  {login || "Unknown User"}
                </h2>
                {isPublic ? (
                  <LucideReact.CheckCircle
                    className="ml-auto text-green-500"
                    size={16}
                    aria-label="Public gist"
                  />
                ) : (
                  <LucideReact.Lock
                    className="ml-auto text-red-500"
                    size={16}
                    aria-label="Private gist"
                  />
                )}
              </header>

              <p className="text-gray-700 text-sm line-clamp-2 mb-3">{desc}</p>

              <footer className="flex flex-wrap items-center text-gray-500 text-xs space-x-4">
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={14} aria-hidden="true" />
                  <time dateTime={gist.created_at || ""}>{created}</time>
                </div>

                <div className="flex items-center gap-1">
                  <LucideReact.FileText size={14} aria-hidden="true" />
                  <span>{filesCount} file{filesCount !== 1 ? "s" : ""}</span>
                </div>

                <div className="flex items-center gap-1">
                  <LucideReact.MessageCircle size={14} aria-hidden="true" />
                  <span>{commentsCount}</span>
                </div>

                {gist.html_url && (
                  <div className="flex items-center gap-1 max-w-xs truncate">
                    <LucideReact.Link size={14} aria-hidden="true" />
                    <span className="truncate">{gist.html_url}</span>
                  </div>
                )}
              </footer>
            </article>
          );
        })
      )}
    </div>
  );
}
