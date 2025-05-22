import { tags } from "typia";
import React from "react";
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
    export type code_scanning_variant_analysis_language = "cpp" | "csharp" | "go" | "java" | "javascript" | "python" | "ruby" | "rust" | "swift";
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
        "private": boolean;
        stargazers_count: number & tags.Type<"int32">;
        updated_at: (string & tags.Format<"date-time">) | null;
    };
    /**
     * The new status of the CodeQL variant analysis repository task.
    */
    export type code_scanning_variant_analysis_status = "pending" | "in_progress" | "succeeded" | "failed" | "canceled" | "timed_out";
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
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_variant_analysis;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusLabel = value.status
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
  const statusColor = {
    in_progress: 'bg-yellow-100 text-yellow-800',
    succeeded: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
  }[value.status] ?? 'bg-gray-100 text-gray-800';

  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : '—';
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : '—';
  const completedAt =
    value.completed_at != null
      ? new Date(value.completed_at).toLocaleString()
      : '—';

  const languageLabel =
    value.query_language.charAt(0).toUpperCase() +
    value.query_language.slice(1);

  const scanned = value.scanned_repositories ?? [];
  const totalScanned = scanned.length;
  const succeededCount = scanned.filter(r => r.analysis_status === 'succeeded').length;
  const failedCount = scanned.filter(r => r.analysis_status === 'failed').length;
  const inProgressCount = scanned.filter(r =>
    ['pending', 'in_progress'].includes(r.analysis_status)
  ).length;

  const skipped = value.skipped_repositories;
  const skipGroups = skipped
    ? [
        { label: 'Access Mismatch', count: skipped.access_mismatch_repos.repository_count },
        { label: 'Not Found', count: skipped.not_found_repos.repository_count },
        { label: 'No CodeQL DB', count: skipped.no_codeql_db_repos.repository_count },
        { label: 'Over Limit', count: skipped.over_limit_repos.repository_count },
      ]
    : [];
  const totalSkipped = skipGroups.reduce((sum, g) => sum + g.count, 0);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Variant Analysis #{value.id}
        </h2>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      {/* Core Info */}
      <div className="text-sm text-gray-700 space-y-1">
        <div>
          <span className="font-medium text-gray-800">Controller Repo:</span>{' '}
          {value.controller_repo.full_name}
        </div>
        <div>
          <span className="font-medium text-gray-800">Actor:</span> {value.actor.login}
        </div>
        <div>
          <span className="font-medium text-gray-800">Language:</span> {languageLabel}
        </div>
        <div>
          <span className="font-medium text-gray-800">Query Pack URL:</span>{' '}
          <span className="block break-all text-blue-600">
            {value.query_pack_url}
          </span>
        </div>
      </div>

      {/* Dates */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div>
          <dt className="font-medium text-gray-800">Created</dt>
          <dd>{createdAt}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-800">Updated</dt>
          <dd>{updatedAt}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-800">Completed</dt>
          <dd>{completedAt}</dd>
        </div>
      </dl>

      {/* Scanning Summary */}
      <div className="space-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Scanned Repositories:</span> {totalScanned}
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-green-600">✅</span>
            <span>{succeededCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-600">⚠️</span>
            <span>{inProgressCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-red-600">❌</span>
            <span>{failedCount}</span>
          </div>
        </div>
        {totalSkipped > 0 && (
          <div>
            <div>
              <span className="font-medium">Skipped Repositories:</span> {totalSkipped}
            </div>
            <ul className="mt-1 flex flex-wrap gap-2">
              {skipGroups.map(
                grp =>
                  grp.count > 0 && (
                    <li
                      key={grp.label}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                    >
                      {grp.label}: {grp.count}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
