import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A run of a CodeQL query against one or more repositories.
   *
   * @title Variant Analysis
   */
  export type code_scanning_variant_analysis = {
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
    failure_reason?:
      | "no_repos_queried"
      | "actions_workflow_run_failed"
      | "internal_error";
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
  };
  /**
   * A GitHub repository.
   *
   * @title Simple Repository
   */
  export type simple_repository = {
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
    private: boolean;
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
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
  /**
   * The language targeted by the CodeQL query
   */
  export type code_scanning_variant_analysis_language =
    | "cpp"
    | "csharp"
    | "go"
    | "java"
    | "javascript"
    | "python"
    | "ruby"
    | "rust"
    | "swift";
  /**
   * Repository Identifier
   *
   * @title Repository Identifier
   */
  export type code_scanning_variant_analysis_repository = {
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
    private: boolean;
    stargazers_count: number & tags.Type<"int32">;
    updated_at: (string & tags.Format<"date-time">) | null;
  };
  /**
   * The new status of the CodeQL variant analysis repository task.
   */
  export type code_scanning_variant_analysis_status =
    | "pending"
    | "in_progress"
    | "succeeded"
    | "failed"
    | "canceled"
    | "timed_out";
  export type code_scanning_variant_analysis_skipped_repo_group = {
    /**
     * The total number of repositories that were skipped for this reason.
     */
    repository_count: number & tags.Type<"int32">;
    /**
     * A list of repositories that were skipped. This list may not include all repositories that were skipped. This is only available when the repository was found and the user has access to it.
     */
    repositories: AutoViewInputSubTypes.code_scanning_variant_analysis_repository[];
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.code_scanning_variant_analysis;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : "–";
  const completedAt = value.completed_at
    ? new Date(value.completed_at).toLocaleString()
    : "–";
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : null;

  // Status icon mapping
  const statusConfig: Record<
    AutoViewInput["status"],
    { Icon: typeof LucideReact.Clock; color: string; label: string }
  > = {
    in_progress: {
      Icon: LucideReact.Clock,
      color: "text-amber-500",
      label: "In Progress",
    },
    succeeded: {
      Icon: LucideReact.CheckCircle,
      color: "text-green-500",
      label: "Succeeded",
    },
    failed: {
      Icon: LucideReact.AlertTriangle,
      color: "text-red-500",
      label: "Failed",
    },
    cancelled: {
      Icon: LucideReact.XCircle,
      color: "text-gray-500",
      label: "Cancelled",
    },
  };
  const {
    Icon: StatusIcon,
    color: statusColor,
    label: statusLabel,
  } = statusConfig[value.status];

  // Scanned repositories summary
  const scanned = value.scanned_repositories ?? [];
  const totalScanned = scanned.length;
  const scannedCounts = scanned.reduce<Record<string, number>>((acc, repo) => {
    acc[repo.analysis_status] = (acc[repo.analysis_status] || 0) + 1;
    return acc;
  }, {});

  // Skipped repositories summary
  const skips = value.skipped_repositories;
  const skipGroups: { label: string; count: number }[] = [];
  if (skips) {
    if (skips.access_mismatch_repos?.repository_count)
      skipGroups.push({
        label: "Access Mismatch",
        count: skips.access_mismatch_repos.repository_count,
      });
    if (skips.not_found_repos?.repository_count)
      skipGroups.push({
        label: "Not Found",
        count: skips.not_found_repos.repository_count,
      });
    if (skips.no_codeql_db_repos?.repository_count)
      skipGroups.push({
        label: "No DB",
        count: skips.no_codeql_db_repos.repository_count,
      });
    if (skips.over_limit_repos?.repository_count)
      skipGroups.push({
        label: "Over Limit",
        count: skips.over_limit_repos.repository_count,
      });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Variant Analysis #{value.id}
        </h2>
        <div className="flex items-center gap-1">
          <StatusIcon className={`${statusColor}`} size={20} strokeWidth={2} />
          <span className="text-sm font-medium text-gray-700">
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Actor and Controller Repo */}
      <div className="flex items-center space-x-3">
        <img
          src={value.actor.avatar_url}
          alt={value.actor.login}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              value.actor.login,
            )}&background=0D8ABC&color=fff`;
          }}
        />
        <span className="text-sm font-medium text-gray-700">
          {value.actor.login}
        </span>
        <LucideReact.ChevronRight className="text-gray-400" size={16} />
        <span className="text-sm text-blue-600 truncate">
          {value.controller_repo.full_name}
        </span>
      </div>

      {/* Query Details */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <LucideReact.Code size={16} className="text-gray-500" />
          <span className="capitalize">{value.query_language}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <LucideReact.Download size={16} className="text-blue-500" />
          <a
            href={value.query_pack_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline truncate"
          >
            Download Pack
          </a>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <div>
            <p className="font-medium text-gray-700">Created</p>
            <p>{createdAt}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <div>
            <p className="font-medium text-gray-700">Completed</p>
            <p>{completedAt}</p>
          </div>
        </div>
        {updatedAt && (
          <div className="col-span-full flex items-center gap-1">
            <LucideReact.RefreshCw size={16} />
            <div>
              <p className="font-medium text-gray-700">Last Updated</p>
              <p>{updatedAt}</p>
            </div>
          </div>
        )}
      </div>

      {/* Scanned Repositories Summary */}
      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          Scanned Repositories
        </h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <LucideReact.ListOrdered size={16} className="text-gray-500" />
            <span>Total: {totalScanned}</span>
          </div>
          {(
            [
              "pending",
              "in_progress",
              "succeeded",
              "failed",
              "canceled",
              "timed_out",
            ] as const
          ).map((st) =>
            scannedCounts[st] ? (
              <div key={st} className="flex items-center gap-1">
                {
                  {
                    pending: (
                      <LucideReact.Clock size={16} className="text-amber-500" />
                    ),
                    in_progress: (
                      <LucideReact.Activity
                        size={16}
                        className="text-blue-500"
                      />
                    ),
                    succeeded: (
                      <LucideReact.CheckCircle
                        size={16}
                        className="text-green-500"
                      />
                    ),
                    failed: (
                      <LucideReact.AlertTriangle
                        size={16}
                        className="text-red-500"
                      />
                    ),
                    canceled: (
                      <LucideReact.XCircle
                        size={16}
                        className="text-gray-500"
                      />
                    ),
                    timed_out: (
                      <LucideReact.StopCircle
                        size={16}
                        className="text-yellow-600"
                      />
                    ),
                  }[st]
                }
                <span>
                  {scannedCounts[st]} {st.replace("_", " ")}
                </span>
              </div>
            ) : null,
          )}
        </div>
      </div>

      {/* Skipped Repositories */}
      {skipGroups.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Skipped Repositories
          </h3>
          <div className="flex flex-wrap gap-4 text-sm">
            {skipGroups.map((g) => (
              <div key={g.label} className="flex items-center gap-1">
                <LucideReact.SkipBack size={16} className="text-gray-500" />
                <span>
                  {g.label}: {g.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
