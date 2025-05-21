import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiUserInstallationsRepositories {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            repository_selection?: string;
            repositories: AutoViewInputSubTypes.repository[];
        };
    }
    /**
     * A repository on GitHub.
     *
     * @title Repository
    */
    export type repository = {
        /**
         * Unique identifier of the repository
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the repository.
        */
        name: string;
        full_name: string;
        license: AutoViewInputSubTypes.nullable_license_simple;
        forks: number & tags.Type<"int32">;
        permissions?: {
            admin: boolean;
            pull: boolean;
            triage?: boolean;
            push: boolean;
            maintain?: boolean;
        };
        owner: AutoViewInputSubTypes.simple_user;
        /**
         * Whether the repository is private or public.
        */
        "private": boolean;
        html_url: string & tags.Format<"uri">;
        description: string | null;
        fork: boolean;
        url: string & tags.Format<"uri">;
        archive_url: string;
        assignees_url: string;
        blobs_url: string;
        branches_url: string;
        collaborators_url: string;
        comments_url: string;
        commits_url: string;
        compare_url: string;
        contents_url: string;
        contributors_url: string & tags.Format<"uri">;
        deployments_url: string & tags.Format<"uri">;
        downloads_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        forks_url: string & tags.Format<"uri">;
        git_commits_url: string;
        git_refs_url: string;
        git_tags_url: string;
        git_url: string;
        issue_comment_url: string;
        issue_events_url: string;
        issues_url: string;
        keys_url: string;
        labels_url: string;
        languages_url: string & tags.Format<"uri">;
        merges_url: string & tags.Format<"uri">;
        milestones_url: string;
        notifications_url: string;
        pulls_url: string;
        releases_url: string;
        ssh_url: string;
        stargazers_url: string & tags.Format<"uri">;
        statuses_url: string;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        tags_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        trees_url: string;
        clone_url: string;
        mirror_url: (string & tags.Format<"uri">) | null;
        hooks_url: string & tags.Format<"uri">;
        svn_url: string & tags.Format<"uri">;
        homepage: (string & tags.Format<"uri">) | null;
        language: string | null;
        forks_count: number & tags.Type<"int32">;
        stargazers_count: number & tags.Type<"int32">;
        watchers_count: number & tags.Type<"int32">;
        /**
         * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
        */
        size: number & tags.Type<"int32">;
        /**
         * The default branch of the repository.
        */
        default_branch: string;
        open_issues_count: number & tags.Type<"int32">;
        /**
         * Whether this repository acts as a template that can be used to generate new repositories.
        */
        is_template?: boolean;
        topics?: string[];
        /**
         * Whether issues are enabled.
        */
        has_issues: boolean;
        /**
         * Whether projects are enabled.
        */
        has_projects: boolean;
        /**
         * Whether the wiki is enabled.
        */
        has_wiki: boolean;
        has_pages: boolean;
        /**
         * Whether downloads are enabled.
         *
         * @deprecated
        */
        has_downloads: boolean;
        /**
         * Whether discussions are enabled.
        */
        has_discussions?: boolean;
        /**
         * Whether the repository is archived.
        */
        archived: boolean;
        /**
         * Returns whether or not this repository disabled.
        */
        disabled: boolean;
        /**
         * The repository visibility: public, private, or internal.
        */
        visibility?: string & tags.Default<"public">;
        pushed_at: (string & tags.Format<"date-time">) | null;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        /**
         * Whether to allow rebase merges for pull requests.
        */
        allow_rebase_merge?: boolean;
        temp_clone_token?: string;
        /**
         * Whether to allow squash merges for pull requests.
        */
        allow_squash_merge?: boolean;
        /**
         * Whether to allow Auto-merge to be used on pull requests.
        */
        allow_auto_merge?: boolean;
        /**
         * Whether to delete head branches when pull requests are merged
        */
        delete_branch_on_merge?: boolean;
        /**
         * Whether or not a pull request head branch that is behind its base branch can always be updated even if it is not required to be up to date before merging.
        */
        allow_update_branch?: boolean;
        /**
         * Whether a squash merge commit can use the pull request title as default. **This property is closing down. Please use `squash_merge_commit_title` instead.
         *
         * @deprecated
        */
        use_squash_pr_title_as_default?: boolean;
        /**
         * The default value for a squash merge commit title:
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).
        */
        squash_merge_commit_title?: "PR_TITLE" | "COMMIT_OR_PR_TITLE";
        /**
         * The default value for a squash merge commit message:
         *
         * - `PR_BODY` - default to the pull request's body.
         * - `COMMIT_MESSAGES` - default to the branch's commit messages.
         * - `BLANK` - default to a blank commit message.
        */
        squash_merge_commit_message?: "PR_BODY" | "COMMIT_MESSAGES" | "BLANK";
        /**
         * The default value for a merge commit title.
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).
        */
        merge_commit_title?: "PR_TITLE" | "MERGE_MESSAGE";
        /**
         * The default value for a merge commit message.
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `PR_BODY` - default to the pull request's body.
         * - `BLANK` - default to a blank commit message.
        */
        merge_commit_message?: "PR_BODY" | "PR_TITLE" | "BLANK";
        /**
         * Whether to allow merge commits for pull requests.
        */
        allow_merge_commit?: boolean;
        /**
         * Whether to allow forking this repo
        */
        allow_forking?: boolean;
        /**
         * Whether to require contributors to sign off on web-based commits
        */
        web_commit_signoff_required?: boolean;
        open_issues: number & tags.Type<"int32">;
        watchers: number & tags.Type<"int32">;
        master_branch?: string;
        starred_at?: string;
        /**
         * Whether anonymous git access is enabled for this repository
        */
        anonymous_access_enabled?: boolean;
    };
    /**
     * License Simple
     *
     * @title License Simple
    */
    export type nullable_license_simple = {
        key: string;
        name: string;
        url: (string & tags.Format<"uri">) | null;
        spdx_id: string | null;
        node_id: string;
        html_url?: string & tags.Format<"uri">;
    } | null;
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
export type AutoViewInput = AutoViewInputSubTypes.IApiUserInstallationsRepositories.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived constants
  const formatDate = (iso: string | null): string => {
    if (!iso) return "Unknown";
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const selectionLabel = value.repository_selection
    ? value.repository_selection.charAt(0).toUpperCase() +
      value.repository_selection.slice(1)
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Repositories ({value.total_count})
        </h2>
        {selectionLabel && (
          <span className="text-sm text-gray-500 capitalize">
            {selectionLabel}
          </span>
        )}
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {value.repositories.map((repo) => (
          <div
            key={repo.id}
            className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login ?? "owner avatar"}
                  className="w-8 h-8 rounded-full"
                />
                <h3 className="text-md font-medium text-gray-900 truncate">
                  {repo.name}
                </h3>
              </div>
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  repo.private
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {repo.private ? "Private" : "Public"}
              </span>
            </div>
            {repo.description && (
              <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                {repo.description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center text-xs text-gray-500 space-x-2">
              {repo.language && (
                <span className="px-1.5 py-0.5 bg-gray-200 rounded">
                  {repo.language}
                </span>
              )}
              {repo.license?.name && (
                <span className="px-1.5 py-0.5 bg-gray-200 rounded">
                  {repo.license.name}
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927C9.349 2.05 10.651 2.05 10.951 2.927l.735 2.49a1 1 0 00.95.69h2.62c.969 0 1.371 1.24.588 1.81l-2.12 1.54a1 1 0 00-.364 1.118l.735 2.49c.3.877-.755 1.603-1.54 1.118l-2.12-1.54a1 1 0 00-1.176 0l-2.12 1.54c-.785.485-1.84-.241-1.54-1.118l.735-2.49a1 1 0 00-.364-1.118L2.156 7.917c-.783-.57-.38-1.81.588-1.81h2.62a1 1 0 00.95-.69l.735-2.49z" />
                  </svg>
                  <span>{repo.stargazers_count}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-4.414-4.414A1 1 0 0012.586 4H5zm7 2H6v2h6V5z" />
                  </svg>
                  <span>{repo.forks_count}</span>
                </span>
              </div>
              <span>Updated {formatDate(repo.updated_at)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
