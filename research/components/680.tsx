import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface code_scanning_variant_analysis_repo_task {
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
     * The new status of the CodeQL variant analysis repository task.
    */
    export type code_scanning_variant_analysis_status = "pending" | "in_progress" | "succeeded" | "failed" | "canceled" | "timed_out";
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_variant_analysis_repo_task;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const repositoryName = value.repository.full_name;
  const ownerLogin = value.repository.owner.login;

  // Map analysis_status to icon, label, and color
  const statusMap: Record<AutoViewInputSubTypes.code_scanning_variant_analysis_status, {
    icon: JSX.Element;
    label: string;
    colorClass: string;
  }> = {
    pending: {
      icon: <LucideReact.Clock size={16} className="text-amber-500" />,
      label: "Pending",
      colorClass: "text-amber-500",
    },
    in_progress: {
      icon: <LucideReact.Loader size={16} className="animate-spin text-blue-500" />,
      label: "In Progress",
      colorClass: "text-blue-500",
    },
    succeeded: {
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      label: "Succeeded",
      colorClass: "text-green-500",
    },
    failed: {
      icon: <LucideReact.XCircle size={16} className="text-red-500" />,
      label: "Failed",
      colorClass: "text-red-500",
    },
    canceled: {
      icon: <LucideReact.XCircle size={16} className="text-gray-500" />,
      label: "Canceled",
      colorClass: "text-gray-500",
    },
    timed_out: {
      icon: <LucideReact.AlertTriangle size={16} className="text-red-500" />,
      label: "Timed Out",
      colorClass: "text-red-500",
    },
  };
  const statusInfo = statusMap[value.analysis_status];

  // Format bytes to human-readable string
  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header: repository name and status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="truncate">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {repositoryName}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            Owner: {ownerLogin}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-2 sm:mt-0">
          {statusInfo.icon}
          <span className={`text-sm font-medium ${statusInfo.colorClass}`}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Body: success metrics or failure message */}
      <div className="space-y-3 text-sm text-gray-700">
        {value.analysis_status === "succeeded" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {value.artifact_size_in_bytes != null && (
              <div className="flex items-center gap-2">
                <LucideReact.Archive size={16} className="text-gray-400" />
                <span>Artifact Size: {formatBytes(value.artifact_size_in_bytes)}</span>
              </div>
            )}
            {value.result_count != null && (
              <div className="flex items-center gap-2">
                <LucideReact.ListChecks size={16} className="text-gray-400" />
                <span>Result Count: {value.result_count}</span>
              </div>
            )}
            {value.database_commit_sha && (
              <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                <LucideReact.GitCommit size={16} className="text-gray-400" />
                <span>
                  Commit: {value.database_commit_sha.slice(0, 7)}
                </span>
              </div>
            )}
            {value.source_location_prefix && (
              <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                <LucideReact.Code size={16} className="text-gray-400" />
                <span>Source Prefix: {value.source_location_prefix}</span>
              </div>
            )}
            {value.artifact_url && (
              <div className="flex items-start gap-2 col-span-1 sm:col-span-2">
                <LucideReact.Link size={16} className="text-gray-400 mt-0.5" />
                <span className="break-all text-blue-600 line-clamp-2">
                  {value.artifact_url}
                </span>
              </div>
            )}
          </div>
        )}
        {value.analysis_status === "failed" && value.failure_message && (
          <div className="flex items-start gap-3 text-red-600">
            <LucideReact.AlertTriangle size={20} className="flex-shrink-0" />
            <p className="break-words">{value.failure_message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
