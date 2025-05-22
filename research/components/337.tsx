import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Repositories associated with a code security configuration and attachment status
    */
    export type code_security_configuration_repositories = {
        /**
         * The attachment status of the code security configuration on the repository.
        */
        status?: "attached" | "attaching" | "detached" | "removed" | "enforced" | "failed" | "updating" | "removed_by_enterprise";
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
}
export type AutoViewInput = AutoViewInputSubTypes.code_security_configuration_repositories[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const processedRepos = value
    .filter((item) => item.repository)
    .map((item) => item.repository!) as AutoViewInputSubTypes.simple_repository[];

  const statusMap: Record<
    string,
    { label: string; colorClasses: string }
  > = {
    attached: { label: "Attached", colorClasses: "bg-green-100 text-green-800" },
    enforced: { label: "Enforced", colorClasses: "bg-green-100 text-green-800" },
    updating: { label: "Updating", colorClasses: "bg-green-100 text-green-800" },
    attaching: { label: "Attaching", colorClasses: "bg-green-100 text-green-800" },
    detached: { label: "Detached", colorClasses: "bg-gray-100 text-gray-800" },
    removed: { label: "Removed", colorClasses: "bg-gray-100 text-gray-800" },
    removed_by_enterprise: {
      label: "Removed By Enterprise",
      colorClasses: "bg-gray-100 text-gray-800",
    },
    failed: { label: "Failed", colorClasses: "bg-red-100 text-red-800" },
  };

  function getStatusBadge(status?: string) {
    if (!status) return null;
    const info = statusMap[status] || {
      label: status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      colorClasses: "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`${info.colorClasses} px-2 py-0.5 rounded-full text-xs font-semibold`}
      >
        {info.label}
      </span>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (processedRepos.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No repositories to display.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {processedRepos.map((repo) => (
        <div
          key={repo.id}
          className="p-4 bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="flex items-start space-x-4">
            <img
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login} avatar`}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {repo.full_name}
                </h3>
                {getStatusBadge(
                  value.find((i) => i.repository?.id === repo.id)?.status
                )}
              </div>
              <div className="mt-1 flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {repo.owner.login}
                </span>
                <span className="text-xs text-white bg-indigo-600 px-2 py-0.5 rounded">
                  {repo.private ? "Private" : "Public"}
                </span>
              </div>
              {repo.description ? (
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                  {repo.description}
                </p>
              ) : (
                <p className="mt-2 text-sm text-gray-500 italic">
                  No description
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
