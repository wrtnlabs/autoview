import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type code_scanning_variant_analysis_repo_task = {
        repository: AutoViewInputSubTypes.simple_repository;
        analysis_status: AutoViewInputSubTypes.code_scanning_variant_analysis_status;
        /**
         * The size of the artifact. This is only available for successful analyses.
        */
        artifact_size_in_bytes?: number & tags.Type<"int32">;
        /**
         * The number of results in the case of a successful analysis. This is only available for successful analyses.
        */
        result_count?: number & tags.Type<"int32">;
        /**
         * The reason of the failure of this repo task. This is only available if the repository task has failed.
        */
        failure_message?: string;
        /**
         * The SHA of the commit the CodeQL database was built against. This is only available for successful analyses.
        */
        database_commit_sha?: string;
        /**
         * The source location prefix to use. This is only available for successful analyses.
        */
        source_location_prefix?: string;
        /**
         * The URL of the artifact. This is only available for successful analyses.
        */
        artifact_url?: string;
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
     * The new status of the CodeQL variant analysis repository task.
    */
    export type code_scanning_variant_analysis_status = "pending" | "in_progress" | "succeeded" | "failed" | "canceled" | "timed_out";
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_variant_analysis_repo_task;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Map analysis statuses to labels and Tailwind color schemes.
  const statusInfo: Record<AutoViewInputSubTypes.code_scanning_variant_analysis_status, { label: string; bg: string; text: string }> = {
    pending:    { label: 'Pending',     bg: 'bg-yellow-100', text: 'text-yellow-800' },
    in_progress:{ label: 'In Progress', bg: 'bg-blue-100',   text: 'text-blue-800' },
    succeeded:  { label: 'Succeeded',   bg: 'bg-green-100',  text: 'text-green-800' },
    failed:     { label: 'Failed',      bg: 'bg-red-100',    text: 'text-red-800' },
    canceled:   { label: 'Canceled',    bg: 'bg-gray-100',   text: 'text-gray-800' },
    timed_out:  { label: 'Timed Out',   bg: 'bg-orange-100', text: 'text-orange-800' },
  };
  const { label: statusLabel, bg: statusBg, text: statusText } = statusInfo[value.analysis_status];

  // Human-friendly byte formatter
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const units = ['KB', 'MB', 'GB', 'TB'] as const;
    let i = 0;
    let num = bytes / 1024;
    while (num >= 1024 && i < units.length - 1) {
      num /= 1024;
      i++;
    }
    return `${num.toFixed(2)} ${units[i]}`;
  };

  const renderedArtifactSize = value.artifact_size_in_bytes !== undefined
    ? formatBytes(value.artifact_size_in_bytes)
    : null;

  const shortSha = value.database_commit_sha
    ? value.database_commit_sha.slice(0, 7)
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="max-w-md w-full p-6 bg-white rounded-xl shadow-md space-y-4">
      {/* Repository Overview */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.repository.full_name}
        </h2>
        <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
          <span>{value.repository.owner.login}</span>
          <span>&bull;</span>
          <span>{value.repository.private ? 'Private' : 'Public'}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 truncate">
          {value.repository.description ?? 'No description provided.'}
        </p>
      </section>

      {/* Analysis Status */}
      <section className="flex items-center">
        <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${statusBg} ${statusText}`}>
          {statusLabel}
        </span>
      </section>

      {/* Succeeded Details */}
      {value.analysis_status === 'succeeded' && (
        <section className="space-y-2">
          {renderedArtifactSize && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">Artifact Size:</span> {renderedArtifactSize}
            </p>
          )}
          {value.result_count !== undefined && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">Results:</span> {value.result_count.toLocaleString()}
            </p>
          )}
          {shortSha && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">DB SHA:</span> {shortSha}
            </p>
          )}
          {value.artifact_url && (
            <p className="text-sm text-gray-500 truncate">
              {value.artifact_url}
            </p>
          )}
        </section>
      )}

      {/* Failure Details */}
      {value.analysis_status === 'failed' && value.failure_message && (
        <section>
          <p className="text-sm text-red-700 overflow-hidden line-clamp-3">
            {value.failure_message}
          </p>
        </section>
      )}
    </article>
  );
}
