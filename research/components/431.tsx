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
  // Map each status to a consistent badge style
  const statusStyles: Record<string, string> = {
    attached: "bg-green-100 text-green-800",
    enforced: "bg-green-100 text-green-800",
    attaching: "bg-blue-100 text-blue-800",
    updating: "bg-yellow-100 text-yellow-800",
    detached: "bg-gray-100 text-gray-800",
    removed: "bg-red-100 text-red-800",
    removed_by_enterprise: "bg-red-100 text-red-800",
    failed: "bg-red-100 text-red-800",
  };

  const totalRepos = value.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (totalRepos === 0) {
    return (
      <div className="w-full py-6 text-center text-gray-500">
        No repositories found.
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-sm text-gray-700">
        Total Repositories: <span className="font-semibold">{totalRepos}</span>
      </div>
      {value.map((item, idx) => {
        const repo = item.repository;
        if (!repo) return null;

        // Derive human-readable status label
        const rawStatus = item.status ?? "unknown";
        const statusLabel = rawStatus
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        const badgeStyle = statusStyles[rawStatus] || "bg-gray-100 text-gray-800";

        const owner = repo.owner;
        const isPrivate = repo["private"];

        return (
          <div
            key={`${repo.id}-${idx}`}
            className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:justify-between"
          >
            <div className="flex-1">
              <div className="text-lg font-semibold text-gray-900 truncate">
                {repo.full_name}
              </div>
              {repo.description && (
                <p className="text-gray-600 mt-1 line-clamp-2">
                  {repo.description}
                </p>
              )}
              <div className="flex items-center space-x-2 mt-3">
                <img
                  src={owner.avatar_url}
                  alt={owner.login}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-gray-500 text-sm">{owner.login}</span>
                <span
                  className={`ml-2 px-2 py-0.5 text-xs font-medium rounded ${
                    isPrivate
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {isPrivate ? "Private" : "Public"}
                </span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex-shrink-0">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${badgeStyle}`}
              >
                {statusLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
