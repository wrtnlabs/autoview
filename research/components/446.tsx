import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsDependabotSecretsRepositories {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            repositories: AutoViewInputSubTypes.minimal_repository[];
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsDependabotSecretsRepositories.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.total_count;
  const repositories = value.repositories;
  const reposToShow = repositories.slice(0, 10);
  const extraCount = repositories.length - reposToShow.length;

  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <LucideReact.Key size={20} className="text-gray-500" aria-hidden />
        Dependabot Secret Repositories ({total})
      </h2>
      <ul className="space-y-4">
        {reposToShow.map((repo) => (
          <li key={repo.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-medium truncate">
                    {repo.name}
                  </span>
                  {repo.private ? (
                    <LucideReact.Lock
                      size={16}
                      className="text-red-500"
                      aria-label="Private"
                    />
                  ) : (
                    <LucideReact.Unlock
                      size={16}
                      className="text-green-500"
                      aria-label="Public"
                    />
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {repo.description ?? "No description"}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <LucideReact.User size={14} aria-hidden />
                    <span>{repo.owner.login}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <LucideReact.Link size={14} aria-hidden />
                    <span className="truncate">{repo.html_url}</span>
                  </div>
                </div>
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {repo.topics.map((topic) => (
                      <span
                        key={topic}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <LucideReact.Star size={16} aria-hidden />
                  <span>{repo.stargazers_count ?? 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.GitBranch size={16} aria-hidden />
                  <span>{repo.forks ?? 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.AlertCircle size={16} aria-hidden />
                  <span>{repo.open_issues_count ?? 0} Issues</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} aria-hidden />
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {extraCount > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          and {extraCount} more repositories...
        </div>
      )}
    </div>
  );
}
