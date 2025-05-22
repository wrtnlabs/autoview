import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Repositories associated with a code security configuration and attachment status
   */
  export type code_security_configuration_repositories = {
    /**
     * The attachment status of the code security configuration on the repository.
     */
    status?:
      | "attached"
      | "attaching"
      | "detached"
      | "removed"
      | "enforced"
      | "failed"
      | "updating"
      | "removed_by_enterprise";
    repository?: AutoViewInputSubTypes.simple_repository;
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
}
export type AutoViewInput =
  AutoViewInputSubTypes.code_security_configuration_repositories[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Map each status to a human-readable label and an icon
  const statusMap: Record<
    NonNullable<
      AutoViewInputSubTypes.code_security_configuration_repositories["status"]
    >,
    { label: string; icon: JSX.Element }
  > = {
    attached: {
      label: "Attached",
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
    },
    attaching: {
      label: "Attaching",
      icon: (
        <LucideReact.Loader className="animate-spin text-amber-500" size={16} />
      ),
    },
    detached: {
      label: "Detached",
      icon: <LucideReact.XCircle className="text-red-500" size={16} />,
    },
    removed: {
      label: "Removed",
      icon: <LucideReact.Trash2 className="text-gray-500" size={16} />,
    },
    enforced: {
      label: "Enforced",
      icon: <LucideReact.ShieldCheck className="text-green-500" size={16} />,
    },
    failed: {
      label: "Failed",
      icon: <LucideReact.AlertTriangle className="text-red-500" size={16} />,
    },
    updating: {
      label: "Updating",
      icon: (
        <LucideReact.RefreshCw
          className="animate-spin text-blue-500"
          size={16}
        />
      ),
    },
    removed_by_enterprise: {
      label: "Removed by Enterprise",
      icon: <LucideReact.AlertTriangle className="text-amber-500" size={16} />,
    },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <ul className="space-y-4">
      {value.map((item, idx) => {
        const repo = item.repository;
        const statusKey = (item.status ?? "detached") as keyof typeof statusMap;
        const { label: statusLabel, icon: statusIcon } = statusMap[
          statusKey
        ] ?? {
          label: item.status || "Unknown",
          icon: <LucideReact.HelpCircle className="text-gray-500" size={16} />,
        };

        return (
          <li
            key={idx}
            className="flex items-center p-4 bg-white rounded-lg shadow-sm"
          >
            {/* Owner Avatar */}
            <div className="flex-shrink-0">
              {repo?.owner.avatar_url ? (
                <img
                  src={repo.owner.avatar_url}
                  alt={`${repo.owner.login} avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      repo.owner.login,
                    )}&background=ccc&color=fff`;
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <LucideReact.User className="text-gray-500" size={20} />
                </div>
              )}
            </div>

            {/* Repository Info */}
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {repo?.full_name ?? "Unknown Repository"}
                </h3>
                {repo?.private ? (
                  <LucideReact.Lock className="text-gray-500" size={14} />
                ) : (
                  <LucideReact.Unlock className="text-gray-500" size={14} />
                )}
              </div>
              {repo?.description && (
                <p className="mt-1 text-sm text-gray-500 truncate line-clamp-2">
                  {repo.description}
                </p>
              )}
            </div>

            {/* Status Indicator */}
            <div className="ml-4 flex items-center space-x-1">
              {statusIcon}
              <span className="text-sm text-gray-700">{statusLabel}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
