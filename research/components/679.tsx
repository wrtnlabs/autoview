import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A run of a CodeQL query against one or more repositories.
     *
     * @title Variant Analysis
    */
    export interface code_scanning_variant_analysis {
        /**
         * The ID of the variant analysis.
        */
        id: number & tags.Type<"int32">;
        controller_repo: AutoViewInputSubTypes.simple_repository;
        actor: AutoViewInputSubTypes.simple_user;
        query_language: AutoViewInputSubTypes.code_scanning_variant_analysis_language;
        /**
         * The download url for the query pack.
        */
        query_pack_url: string;
        /**
         * The date and time at which the variant analysis was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at?: string;
        /**
         * The date and time at which the variant analysis was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at?: string;
        /**
         * The date and time at which the variant analysis was completed, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ. Will be null if the variant analysis has not yet completed or this information is not available.
        */
        completed_at?: (string & tags.Format<"date-time">) | null;
        status: "in_progress" | "succeeded" | "failed" | "cancelled";
        /**
         * The GitHub Actions workflow run used to execute this variant analysis. This is only available if the workflow run has started.
        */
        actions_workflow_run_id?: number & tags.Type<"int32">;
        /**
         * The reason for a failure of the variant analysis. This is only available if the variant analysis has failed.
        */
        failure_reason?: "no_repos_queried" | "actions_workflow_run_failed" | "internal_error";
        scanned_repositories?: {
            repository: AutoViewInputSubTypes.code_scanning_variant_analysis_repository;
            analysis_status: AutoViewInputSubTypes.code_scanning_variant_analysis_status;
            /**
             * The number of results in the case of a successful analysis. This is only available for successful analyses.
            */
            result_count?: number & tags.Type<"int32">;
            /**
             * The size of the artifact. This is only available for successful analyses.
            */
            artifact_size_in_bytes?: number & tags.Type<"int32">;
            /**
             * The reason of the failure of this repo task. This is only available if the repository task has failed.
            */
            failure_message?: string;
        }[];
        /**
         * Information about repositories that were skipped from processing. This information is only available to the user that initiated the variant analysis.
        */
        skipped_repositories?: {
            access_mismatch_repos: AutoViewInputSubTypes.code_scanning_variant_analysis_skipped_repo_group;
            not_found_repos: {
                /**
                 * The total number of repositories that were skipped for this reason.
                */
                repository_count: number & tags.Type<"int32">;
                /**
                 * A list of full repository names that were skipped. This list may not include all repositories that were skipped.
                */
                repository_full_names: string[];
            };
            no_codeql_db_repos: AutoViewInputSubTypes.code_scanning_variant_analysis_skipped_repo_group;
            over_limit_repos: AutoViewInputSubTypes.code_scanning_variant_analysis_skipped_repo_group;
        };
    }
    /**
     * A GitHub repository.
     *
     * @title Simple Repository
    */
    export interface simple_repository {
        /**
         * A unique identifier of the repository.
        */
        id: number & tags.Type<"int32">;
        /**
         * The GraphQL identifier of the repository.
        */
        node_id: string;
        /**
         * The name of the repository.
        */
        name: string;
        /**
         * The full, globally unique, name of the repository.
        */
        full_name: string;
        owner: AutoViewInputSubTypes.simple_user;
        /**
         * Whether the repository is private.
        */
        "private": boolean;
        /**
         * The URL to view the repository on GitHub.com.
        */
        html_url: string;
        /**
         * The repository description.
        */
        description: string | null;
        /**
         * Whether the repository is a fork.
        */
        fork: boolean;
        /**
         * The URL to get more information about the repository from the GitHub API.
        */
        url: string;
        /**
         * A template for the API URL to download the repository as an archive.
        */
        archive_url: string;
        /**
         * A template for the API URL to list the available assignees for issues in the repository.
        */
        assignees_url: string;
        /**
         * A template for the API URL to create or retrieve a raw Git blob in the repository.
        */
        blobs_url: string;
        /**
         * A template for the API URL to get information about branches in the repository.
        */
        branches_url: string;
        /**
         * A template for the API URL to get information about collaborators of the repository.
        */
        collaborators_url: string;
        /**
         * A template for the API URL to get information about comments on the repository.
        */
        comments_url: string;
        /**
         * A template for the API URL to get information about commits on the repository.
        */
        commits_url: string;
        /**
         * A template for the API URL to compare two commits or refs.
        */
        compare_url: string;
        /**
         * A template for the API URL to get the contents of the repository.
        */
        contents_url: string;
        /**
         * A template for the API URL to list the contributors to the repository.
        */
        contributors_url: string;
        /**
         * The API URL to list the deployments of the repository.
        */
        deployments_url: string;
        /**
         * The API URL to list the downloads on the repository.
        */
        downloads_url: string;
        /**
         * The API URL to list the events of the repository.
        */
        events_url: string;
        /**
         * The API URL to list the forks of the repository.
        */
        forks_url: string;
        /**
         * A template for the API URL to get information about Git commits of the repository.
        */
        git_commits_url: string;
        /**
         * A template for the API URL to get information about Git refs of the repository.
        */
        git_refs_url: string;
        /**
         * A template for the API URL to get information about Git tags of the repository.
        */
        git_tags_url: string;
        /**
         * A template for the API URL to get information about issue comments on the repository.
        */
        issue_comment_url: string;
        /**
         * A template for the API URL to get information about issue events on the repository.
        */
        issue_events_url: string;
        /**
         * A template for the API URL to get information about issues on the repository.
        */
        issues_url: string;
        /**
         * A template for the API URL to get information about deploy keys on the repository.
        */
        keys_url: string;
        /**
         * A template for the API URL to get information about labels of the repository.
        */
        labels_url: string;
        /**
         * The API URL to get information about the languages of the repository.
        */
        languages_url: string;
        /**
         * The API URL to merge branches in the repository.
        */
        merges_url: string;
        /**
         * A template for the API URL to get information about milestones of the repository.
        */
        milestones_url: string;
        /**
         * A template for the API URL to get information about notifications on the repository.
        */
        notifications_url: string;
        /**
         * A template for the API URL to get information about pull requests on the repository.
        */
        pulls_url: string;
        /**
         * A template for the API URL to get information about releases on the repository.
        */
        releases_url: string;
        /**
         * The API URL to list the stargazers on the repository.
        */
        stargazers_url: string;
        /**
         * A template for the API URL to get information about statuses of a commit.
        */
        statuses_url: string;
        /**
         * The API URL to list the subscribers on the repository.
        */
        subscribers_url: string;
        /**
         * The API URL to subscribe to notifications for this repository.
        */
        subscription_url: string;
        /**
         * The API URL to get information about tags on the repository.
        */
        tags_url: string;
        /**
         * The API URL to list the teams on the repository.
        */
        teams_url: string;
        /**
         * A template for the API URL to create or retrieve a raw Git tree of the repository.
        */
        trees_url: string;
        /**
         * The API URL to list the hooks on the repository.
        */
        hooks_url: string;
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
     * The language targeted by the CodeQL query
    */
    export type code_scanning_variant_analysis_language = "cpp" | "csharp" | "go" | "java" | "javascript" | "python" | "ruby" | "rust" | "swift";
    /**
     * Repository Identifier
     *
     * @title Repository Identifier
    */
    export interface code_scanning_variant_analysis_repository {
        /**
         * A unique identifier of the repository.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the repository.
        */
        name: string;
        /**
         * The full, globally unique, name of the repository.
        */
        full_name: string;
        /**
         * Whether the repository is private.
        */
        "private": boolean;
        stargazers_count: number & tags.Type<"int32">;
        updated_at: (string & tags.Format<"date-time">) | null;
    }
    /**
     * The new status of the CodeQL variant analysis repository task.
    */
    export type code_scanning_variant_analysis_status = "pending" | "in_progress" | "succeeded" | "failed" | "canceled" | "timed_out";
    export interface code_scanning_variant_analysis_skipped_repo_group {
        /**
         * The total number of repositories that were skipped for this reason.
        */
        repository_count: number & tags.Type<"int32">;
        /**
         * A list of repositories that were skipped. This list may not include all repositories that were skipped. This is only available when the repository was found and the user has access to it.
        */
        repositories: AutoViewInputSubTypes.code_scanning_variant_analysis_repository[];
    }
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_variant_analysis;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformations and derived values
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : null;
  const completedAt = value.completed_at
    ? new Date(value.completed_at).toLocaleString()
    : null;
  const statusMap: Record<string, { icon: JSX.Element; label: string }> = {
    in_progress: {
      icon: <LucideReact.Clock className="text-amber-500" size={16} />,
      label: "In Progress",
    },
    succeeded: {
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
      label: "Succeeded",
    },
    failed: {
      icon: <LucideReact.AlertTriangle className="text-red-500" size={16} />,
      label: "Failed",
    },
    cancelled: {
      icon: <LucideReact.XCircle className="text-gray-500" size={16} />,
      label: "Cancelled",
    },
  };
  const currentStatus = statusMap[value.status] || {
    icon: <LucideReact.AlertCircle className="text-gray-500" size={16} />,
    label: value.status,
  };

  const scanned = value.scanned_repositories ?? [];
  const totalScanned = scanned.length;
  const statusCounts = scanned.reduce((acc, repo) => {
    const key = repo.analysis_status;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const skipped = value.skipped_repositories;
  const skippedGroups = skipped
    ? [
        {
          label: "Access Mismatch",
          count: skipped.access_mismatch_repos.repository_count,
        },
        {
          label: "Not Found",
          count: skipped.not_found_repos.repository_count,
        },
        {
          label: "No CodeQL DB",
          count: skipped.no_codeql_db_repos.repository_count,
        },
        {
          label: "Over Limit",
          count: skipped.over_limit_repos.repository_count,
        },
      ].filter((g) => g.count > 0)
    : [];

  const languageMap: Record<string, string> = {
    cpp: "C++",
    csharp: "C#",
    go: "Go",
    java: "Java",
    javascript: "JavaScript",
    python: "Python",
    ruby: "Ruby",
    rust: "Rust",
    swift: "Swift",
  };
  const queryLang = languageMap[value.query_language] || value.query_language;

  // 2. JSX composition
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-6">
      {/* Header: ID and Status */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Variant Analysis #{value.id}
        </h2>
        <div className="flex items-center mt-2 sm:mt-0 space-x-1">
          {currentStatus.icon}
          <span className="text-sm font-medium text-gray-700">
            {currentStatus.label}
          </span>
        </div>
      </div>

      {/* Core Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <LucideReact.Calendar className="text-gray-400" size={16} />
            <span>Created:</span>
            <span className="font-medium">{createdAt || "—"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.Calendar className="text-gray-400" size={16} />
            <span>Completed:</span>
            <span className="font-medium">{completedAt || "—"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.FileText className="text-gray-400" size={16} />
            <span>Language:</span>
            <span className="font-medium">{queryLang}</span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.User className="text-gray-400" size={16} />
            <span>Actor:</span>
            <span className="font-medium">{value.actor.login}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <LucideReact.GitBranch className="text-gray-400" size={16} />
            <span>Controller Repo:</span>
            <span className="font-medium">
              {value.controller_repo.full_name}
            </span>
          </div>
          <div>
            <span className="block text-gray-500">Download URL:</span>
            <p className="mt-1 text-xs text-blue-600 break-all">
              {value.query_pack_url}
            </p>
          </div>
        </div>
      </div>

      {/* Scanned Repositories Summary */}
      {totalScanned > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-800">
            Scanned Repositories ({totalScanned})
          </h3>
          <div className="flex flex-wrap gap-2 mt-2 text-xs">
            {Object.entries(statusCounts).map(([key, count]) => {
              const map = statusMap[key] || {
                icon: <LucideReact.AlertCircle size={14} />,
                label: key.replace(/_/g, " "),
              };
              return (
                <span
                  key={key}
                  className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded"
                >
                  {map.icon}
                  <span>
                    {map.label}: {count}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Skipped Repositories Summary */}
      {skippedGroups.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-800">
            Skipped Repositories
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {skippedGroups.map((g) => (
              <span
                key={g.label}
                className="text-xs bg-yellow-50 text-amber-800 px-2 py-1 rounded"
              >
                {g.label}: {g.count}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
