import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Minimal Repository
     *
     * @title Minimal Repository
    */
    export interface minimal_repository {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        full_name: string;
        owner: AutoViewInputSubTypes.simple_user;
        "private": boolean;
        html_url: string & tags.Format<"uri">;
        description: string | null;
        fork: boolean;
        url: string & tags.Format<"uri">;
        archive_url: string;
        assignees_url: string;
        blobs_url: string;
        branches_url: string;
        collaborators_url: string;
        comments_url: string;
        commits_url: string;
        compare_url: string;
        contents_url: string;
        contributors_url: string & tags.Format<"uri">;
        deployments_url: string & tags.Format<"uri">;
        downloads_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        forks_url: string & tags.Format<"uri">;
        git_commits_url: string;
        git_refs_url: string;
        git_tags_url: string;
        git_url?: string;
        issue_comment_url: string;
        issue_events_url: string;
        issues_url: string;
        keys_url: string;
        labels_url: string;
        languages_url: string & tags.Format<"uri">;
        merges_url: string & tags.Format<"uri">;
        milestones_url: string;
        notifications_url: string;
        pulls_url: string;
        releases_url: string;
        ssh_url?: string;
        stargazers_url: string & tags.Format<"uri">;
        statuses_url: string;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        tags_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        trees_url: string;
        clone_url?: string;
        mirror_url?: string | null;
        hooks_url: string & tags.Format<"uri">;
        svn_url?: string;
        homepage?: string | null;
        language?: string | null;
        forks_count?: number & tags.Type<"int32">;
        stargazers_count?: number & tags.Type<"int32">;
        watchers_count?: number & tags.Type<"int32">;
        /**
         * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
        */
        size?: number & tags.Type<"int32">;
        default_branch?: string;
        open_issues_count?: number & tags.Type<"int32">;
        is_template?: boolean;
        topics?: string[];
        has_issues?: boolean;
        has_projects?: boolean;
        has_wiki?: boolean;
        has_pages?: boolean;
        has_downloads?: boolean;
        has_discussions?: boolean;
        archived?: boolean;
        disabled?: boolean;
        visibility?: string;
        pushed_at?: (string & tags.Format<"date-time">) | null;
        created_at?: (string & tags.Format<"date-time">) | null;
        updated_at?: (string & tags.Format<"date-time">) | null;
        permissions?: {
            admin?: boolean;
            maintain?: boolean;
            push?: boolean;
            triage?: boolean;
            pull?: boolean;
        };
        role_name?: string;
        temp_clone_token?: string;
        delete_branch_on_merge?: boolean;
        subscribers_count?: number & tags.Type<"int32">;
        network_count?: number & tags.Type<"int32">;
        code_of_conduct?: AutoViewInputSubTypes.code_of_conduct;
        license?: {
            key?: string;
            name?: string;
            spdx_id?: string;
            url?: string;
            node_id?: string;
        } | null;
        forks?: number & tags.Type<"int32">;
        open_issues?: number & tags.Type<"int32">;
        watchers?: number & tags.Type<"int32">;
        allow_forking?: boolean;
        web_commit_signoff_required?: boolean;
        security_and_analysis?: AutoViewInputSubTypes.security_and_analysis;
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
    /**
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export interface code_of_conduct {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    }
    export type security_and_analysis = {
        advanced_security?: {
            status?: "enabled" | "disabled";
        };
        code_security?: {
            status?: "enabled" | "disabled";
        };
        /**
         * Enable or disable Dependabot security updates for the repository.
        */
        dependabot_security_updates?: {
            /**
             * The enablement status of Dependabot security updates for the repository.
            */
            status?: "enabled" | "disabled";
        };
        secret_scanning?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_push_protection?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_non_provider_patterns?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_ai_detection?: {
            status?: "enabled" | "disabled";
        };
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.minimal_repository[];



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Formatter for dates
  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value && value.length > 0 ? (
        value.map((repo) => (
          <div
            key={repo.id}
            className="flex flex-col bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            {/* Header: Owner avatar and Repo name */}
            <div className="flex items-center gap-3">
              <img
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    repo.owner.login
                  )}&background=random`;
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <LucideReact.GitBranch
                    size={16}
                    className="text-gray-500"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {repo.name}
                  </h2>
                  {repo.private && (
                    <LucideReact.Lock
                      size={16}
                      className="text-gray-500"
                      strokeWidth={1.5}
                      aria-label="Private"
                    />
                  )}
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline truncate flex items-center gap-1"
                >
                  <LucideReact.Link size={14} className="inline-block" />
                  {new URL(repo.html_url).hostname}
                </a>
              </div>
            </div>

            {/* Description */}
            {repo.description && (
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {repo.description}
              </p>
            )}

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {repo.topics.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
                {repo.topics.length > 4 && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    +{repo.topics.length - 4} more
                  </span>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mt-4">
              <div className="flex items-center gap-1">
                <LucideReact.Star
                  size={16}
                  className="text-yellow-400"
                  strokeWidth={1.5}
                />
                <span>{(repo.stargazers_count ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.GitBranch
                  size={16}
                  className="text-gray-500"
                  strokeWidth={1.5}
                />
                <span>{(repo.forks_count ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.AlertCircle
                  size={16}
                  className="text-red-500"
                  strokeWidth={1.5}
                />
                <span>{(repo.open_issues_count ?? 0).toLocaleString()}</span>
              </div>
              {repo.language && (
                <div className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#6b7280" }}
                  />
                  <span>{repo.language}</span>
                </div>
              )}
              {repo.updated_at && (
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar
                    size={16}
                    className="text-gray-400"
                    strokeWidth={1.5}
                  />
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-4 text-lg">No repositories available</span>
        </div>
      )}
    </div>
  );
}
