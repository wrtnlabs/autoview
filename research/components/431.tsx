import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Repositories associated with a code security configuration and attachment status
    */
    export interface code_security_configuration_repositories {
        /**
         * The attachment status of the code security configuration on the repository.
        */
        status?: "attached" | "attaching" | "detached" | "removed" | "enforced" | "failed" | "updating" | "removed_by_enterprise";
        repository?: AutoViewInputSubTypes.simple_repository;
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
}
export type AutoViewInput = AutoViewInputSubTypes.code_security_configuration_repositories[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items = value.filter(item => item.repository);

  const getStatusIcon = (
    status?: AutoViewInputSubTypes.code_security_configuration_repositories["status"]
  ): JSX.Element => {
    switch (status) {
      case "attached":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "attaching":
      case "updating":
        return <LucideReact.Loader className="animate-spin text-amber-500" size={16} />;
      case "detached":
        return <LucideReact.XCircle className="text-gray-500" size={16} />;
      case "removed":
      case "removed_by_enterprise":
        return <LucideReact.Trash className="text-red-500" size={16} />;
      case "enforced":
        return <LucideReact.ShieldCheck className="text-blue-500" size={16} />;
      case "failed":
        return <LucideReact.AlertTriangle className="text-red-500" size={16} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-400" size={16} />;
    }
  };

  const formatStatus = (status?: string): string => {
    if (!status) return "Unknown";
    return status
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    img.onerror = null;
    const name = img.getAttribute("data-owner") || "User";
    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-4 text-lg">No repositories available.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item, idx) => {
        const repo = item.repository!;
        const status = item.status;
        const formattedStatus = formatStatus(status);
        return (
          <div
            key={repo.id}
            className="flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-lg shadow p-4 gap-4"
          >
            <img
              src={repo.owner.avatar_url}
              data-owner={repo.owner.login}
              onError={handleImageError}
              alt={`${repo.owner.login} avatar`}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900 truncate">
                    {repo.full_name}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    {repo.private ? (
                      <>
                        <LucideReact.Lock size={16} /> Private
                      </>
                    ) : (
                      <>
                        <LucideReact.Unlock size={16} /> Public
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(status)}
                  <span className="text-sm font-medium text-gray-700">{formattedStatus}</span>
                </div>
              </div>
              {repo.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{repo.description}</p>
              )}
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 truncate">
                <LucideReact.Link size={16} />
                <span className="truncate">{repo.html_url}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
