import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnerGroupsRepositories {
        export interface GetResponse {
            total_count: number;
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnerGroupsRepositories.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const repos = value.repositories ?? [];

  // Format large numbers (e.g., 1500 → "1.5k")
  const formatCount = (num: number): string => {
    if (num >= 1000) {
      const k = (num / 1000).toFixed(1).replace(/\.0$/, "");
      return `${k}k`;
    }
    return num.toString();
  };

  // Format ISO date as "Jan 1, 2023"
  const formatDate = (iso?: string | null): string => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Fallback avatar generator
  const avatarFallback = (login: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      login,
    )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-center">
        <LucideReact.Github size={20} className="text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Repositories ({totalCount})
        </h2>
      </div>

      {/* Empty State */}
      {repos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span>No repositories found</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => {
            const stars = repo.stargazers_count ?? 0;
            const forks = repo.forks ?? 0;
            return (
              <div
                key={repo.id}
                className="flex flex-col p-4 bg-gray-50 rounded-md hover:shadow-lg transition-shadow"
              >
                {/* Title & Owner */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center overflow-hidden">
                    <div className="w-6 h-6 mr-2 rounded-full overflow-hidden">
                      <img
                        src={repo.owner.avatar_url}
                        alt={repo.owner.login}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = avatarFallback(
                            repo.owner.login,
                          );
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-800 truncate">
                      {repo.name}
                    </span>
                  </div>
                  {repo.private && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      Private
                    </span>
                  )}
                </div>

                {/* Description */}
                {repo.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {repo.description}
                  </p>
                )}

                {/* Stats */}
                <div className="mt-auto flex flex-wrap items-center text-sm text-gray-500 gap-3">
                  <div className="flex items-center">
                    <LucideReact.Star size={16} className="text-yellow-500 mr-1" />
                    <span>{formatCount(stars)}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.GitBranch size={16} className="mr-1" />
                    <span>{formatCount(forks)}</span>
                  </div>
                  {repo.language && (
                    <div className="flex items-center">
                      <LucideReact.Tag size={16} className="text-blue-500 mr-1" />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  {repo.updated_at && (
                    <div className="flex items-center ml-auto">
                      <LucideReact.Calendar size={16} className="mr-1" />
                      <span>{formatDate(repo.updated_at)}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
