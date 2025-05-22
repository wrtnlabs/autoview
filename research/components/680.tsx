import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
   * The new status of the CodeQL variant analysis repository task.
   */
  export type code_scanning_variant_analysis_status =
    | "pending"
    | "in_progress"
    | "succeeded"
    | "failed"
    | "canceled"
    | "timed_out";
}
export type AutoViewInput =
  AutoViewInputSubTypes.code_scanning_variant_analysis_repo_task;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    repository,
    analysis_status,
    artifact_size_in_bytes,
    result_count,
    failure_message,
    database_commit_sha,
    artifact_url,
  } = value;

  const repoFullName = repository.full_name;

  const statusMap = {
    pending: {
      text: "Pending",
      icon: LucideReact.Clock,
      color: "text-amber-500",
      spinner: false,
    },
    in_progress: {
      text: "In Progress",
      icon: LucideReact.Loader,
      color: "text-amber-500",
      spinner: true,
    },
    succeeded: {
      text: "Succeeded",
      icon: LucideReact.CheckCircle,
      color: "text-green-500",
      spinner: false,
    },
    failed: {
      text: "Failed",
      icon: LucideReact.AlertTriangle,
      color: "text-red-500",
      spinner: false,
    },
    canceled: {
      text: "Canceled",
      icon: LucideReact.XCircle,
      color: "text-gray-500",
      spinner: false,
    },
    timed_out: {
      text: "Timed Out",
      icon: LucideReact.AlertTriangle,
      color: "text-red-500",
      spinner: false,
    },
  } as const;

  const currentStatus = statusMap[analysis_status];
  const StatusIcon = currentStatus.icon;

  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(1)} GB`;
  }

  const shortSha = database_commit_sha ? database_commit_sha.slice(0, 7) : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      {/* Repository Header */}
      <div className="flex items-center">
        <LucideReact.Folder size={20} className="text-gray-500" />
        <span className="ml-2 text-lg font-semibold text-gray-800">
          {repoFullName}
        </span>
        {repository.private ? (
          <LucideReact.Lock size={16} className="ml-2 text-gray-500" />
        ) : (
          <LucideReact.Unlock size={16} className="ml-2 text-gray-500" />
        )}
      </div>

      {/* Repository Description */}
      {repository.description && (
        <p className="mt-1 text-gray-600 line-clamp-2">
          {repository.description}
        </p>
      )}

      {/* Analysis Status */}
      <div className="mt-4 flex items-center">
        <StatusIcon
          size={16}
          className={`${currentStatus.color}${currentStatus.spinner ? " animate-spin" : ""}`}
        />
        <span className="ml-2 text-sm font-medium text-gray-700">
          {currentStatus.text}
        </span>
      </div>

      {/* Success Details */}
      {analysis_status === "succeeded" && (
        <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
          {typeof result_count === "number" && (
            <div className="flex items-center">
              <LucideReact.List size={16} className="text-gray-500" />
              <span className="ml-2 text-sm">{result_count} results</span>
            </div>
          )}
          {typeof artifact_size_in_bytes === "number" && (
            <div className="flex items-center">
              <LucideReact.Archive size={16} className="text-gray-500" />
              <span className="ml-2 text-sm">
                {formatBytes(artifact_size_in_bytes)}
              </span>
            </div>
          )}
          {shortSha && (
            <div className="flex items-center">
              <LucideReact.GitCommit size={16} className="text-gray-500" />
              <span className="ml-2 text-sm">{shortSha}</span>
            </div>
          )}
          {artifact_url && (
            <div className="flex items-center col-span-2">
              <LucideReact.Link size={16} className="text-gray-500" />
              <span
                className="ml-2 text-sm text-blue-600 break-all truncate"
                title={artifact_url}
              >
                {artifact_url}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Failure Message */}
      {analysis_status === "failed" && failure_message && (
        <div className="mt-4 p-2 bg-red-50 text-red-700 rounded flex items-start">
          <LucideReact.AlertOctagon size={16} className="mr-1 mt-[2px]" />
          <span className="text-sm">{failure_message}</span>
        </div>
      )}
    </div>
  );
}
