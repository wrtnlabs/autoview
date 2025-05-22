import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Check suite configuration preferences for a repository.
     *
     * @title Check Suite Preference
    */
    export type check_suite_preference = {
        preferences: {
            auto_trigger_checks?: {
                app_id: number & tags.Type<"int32">;
                setting: boolean;
            }[];
        };
        repository: AutoViewInputSubTypes.minimal_repository;
    };
    /**
     * Minimal Repository
     *
     * @title Minimal Repository
    */
    export type minimal_repository = {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        full_name: string;
        owner: AutoViewInputSubTypes.simple_user;
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
        git_url?: string;
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
        ssh_url?: string;
        stargazers_url: string & tags.Format<"uri">;
        statuses_url: string;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        tags_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        trees_url: string;
        clone_url?: string;
        mirror_url?: string | null;
        hooks_url: string & tags.Format<"uri">;
        svn_url?: string;
        homepage?: string | null;
        language?: string | null;
        forks_count?: number & tags.Type<"int32">;
        stargazers_count?: number & tags.Type<"int32">;
        watchers_count?: number & tags.Type<"int32">;
        /**
         * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
        */
        size?: number & tags.Type<"int32">;
        default_branch?: string;
        open_issues_count?: number & tags.Type<"int32">;
        is_template?: boolean;
        topics?: string[];
        has_issues?: boolean;
        has_projects?: boolean;
        has_wiki?: boolean;
        has_pages?: boolean;
        has_downloads?: boolean;
        has_discussions?: boolean;
        archived?: boolean;
        disabled?: boolean;
        visibility?: string;
        pushed_at?: (string & tags.Format<"date-time">) | null;
        created_at?: (string & tags.Format<"date-time">) | null;
        updated_at?: (string & tags.Format<"date-time">) | null;
        permissions?: {
            admin?: boolean;
            maintain?: boolean;
            push?: boolean;
            triage?: boolean;
            pull?: boolean;
        };
        role_name?: string;
        temp_clone_token?: string;
        delete_branch_on_merge?: boolean;
        subscribers_count?: number & tags.Type<"int32">;
        network_count?: number & tags.Type<"int32">;
        code_of_conduct?: AutoViewInputSubTypes.code_of_conduct;
        license?: {
            key?: string;
            name?: string;
            spdx_id?: string;
            url?: string;
            node_id?: string;
        } | null;
        forks?: number & tags.Type<"int32">;
        open_issues?: number & tags.Type<"int32">;
        watchers?: number & tags.Type<"int32">;
        allow_forking?: boolean;
        web_commit_signoff_required?: boolean;
        security_and_analysis?: AutoViewInputSubTypes.security_and_analysis;
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
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export type code_of_conduct = {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    };
    export type security_and_analysis = {
        advanced_security?: {
            status?: "enabled" | "disabled";
        };
        code_security?: {
            status?: "enabled" | "disabled";
        };
        /**
         * Enable or disable Dependabot security updates for the repository.
        */
        dependabot_security_updates?: {
            /**
             * The enablement status of Dependabot security updates for the repository.
            */
            status?: "enabled" | "disabled";
        };
        secret_scanning?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_push_protection?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_non_provider_patterns?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_ai_detection?: {
            status?: "enabled" | "disabled";
        };
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.check_suite_preference;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { preferences, repository } = value;
  const checks = preferences.auto_trigger_checks ?? [];
  const enabledCount = checks.filter((c) => c.setting).length;

  // Truncate long descriptions
  const description =
    repository.description && repository.description.length > 100
      ? repository.description.slice(0, 100) + "..."
      : repository.description;

  // Helper to format large numbers
  const formatNumber = (n: number | undefined): string => {
    if (n === undefined) return "0";
    return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6 max-w-md mx-auto">
      {/* Repository Info */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <img
          src={repository.owner.avatar_url}
          alt={`${repository.owner.login} avatar`}
          className="w-12 h-12 rounded-full flex-shrink-0"
        />
        <div className="mt-3 sm:mt-0 flex-1">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {repository.full_name}
          </h2>
          {description && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {description}
            </p>
          )}
          <div className="flex flex-wrap items-center mt-2 space-x-2">
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded ${
                repository.private
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {repository.private ? "Private" : "Public"}
            </span>
            {repository.language && (
              <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">
                {repository.language}
              </span>
            )}
            {repository.default_branch && (
              <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">
                branch: {repository.default_branch}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center mt-3 text-gray-500 text-sm space-x-4">
            <span>⭐ {formatNumber(repository.stargazers_count)}</span>
            <span>🍴 {formatNumber(repository.forks_count)}</span>
            <span>👀 {formatNumber(repository.watchers_count)}</span>
            <span>❗ {formatNumber(repository.open_issues_count)}</span>
          </div>
        </div>
      </section>

      {/* Auto Trigger Checks */}
      <section>
        <h3 className="text-md font-medium text-gray-800 mb-2">
          Auto Trigger Checks ({checks.length}){" "}
          <span className="text-sm text-gray-500">
            • Enabled: {enabledCount}
          </span>
        </h3>
        {checks.length === 0 ? (
          <p className="text-gray-600 text-sm">
            No auto trigger checks configured.
          </p>
        ) : (
          <ul className="divide-y divide-gray-200 border border-gray-100 rounded">
            {checks.map((check) => (
              <li
                key={check.app_id}
                className="flex justify-between items-center px-4 py-2"
              >
                <span className="text-gray-700 text-sm">
                  App ID {check.app_id}
                </span>
                <span
                  className={`text-sm font-medium ${
                    check.setting ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {check.setting ? "Enabled" : "Disabled"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
