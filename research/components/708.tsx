import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Combined Commit Status
     *
     * @title Combined Commit Status
    */
    export type combined_commit_status = {
        state: string;
        statuses: AutoViewInputSubTypes.simple_commit_status[];
        sha: string;
        total_count: number & tags.Type<"int32">;
        repository: AutoViewInputSubTypes.minimal_repository;
        commit_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
    };
    /**
     * @title Simple Commit Status
    */
    export type simple_commit_status = {
        description: string | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        state: string;
        context: string;
        target_url: (string & tags.Format<"uri">) | null;
        required?: boolean | null;
        avatar_url: (string & tags.Format<"uri">) | null;
        url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
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
export type AutoViewInput = AutoViewInputSubTypes.combined_commit_status;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    state: overallState,
    statuses,
    sha,
    total_count: totalCount,
    repository,
  } = value;

  // Truncate SHA to 7 characters
  const shortSha = sha.slice(0, 7);

  // Repository display values
  const repoName = repository.full_name;
  const repoDescription = repository.description;

  // Badge style map for different states
  const badgeStyles: Record<string, { text: string; bg: string }> = {
    success: { text: "text-green-800", bg: "bg-green-100" },
    failure: { text: "text-red-800", bg: "bg-red-100" },
    pending: { text: "text-yellow-800", bg: "bg-yellow-100" },
    in_progress: { text: "text-yellow-800", bg: "bg-yellow-100" },
    error: { text: "text-red-800", bg: "bg-red-100" },
    canceled: { text: "text-gray-800", bg: "bg-gray-100" },
    neutral: { text: "text-gray-800", bg: "bg-gray-100" },
    queued: { text: "text-yellow-800", bg: "bg-yellow-100" },
    default: { text: "text-blue-800", bg: "bg-blue-100" },
  };
  const overallBadge = badgeStyles[overallState] || badgeStyles.default;

  // Find the most recent update timestamp among statuses
  const lastUpdatedStatus = statuses.reduce((latest, current) => {
    return new Date(current.updated_at) > new Date(latest.updated_at)
      ? current
      : latest;
  }, statuses[0]);
  const formattedLastUpdate = new Date(lastUpdatedStatus.updated_at).toLocaleString();

  // Display only the first three statuses in the list
  const displayStatuses = statuses.slice(0, 3);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Repository Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {repoName}
          </h3>
          {repoDescription && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {repoDescription}
            </p>
          )}
        </div>
        <span
          className={`flex-shrink-0 px-2 py-1 text-xs font-medium uppercase rounded-full ${overallBadge.text} ${overallBadge.bg}`}
        >
          {overallState}
        </span>
      </div>

      {/* Commit and Update Info */}
      <div className="mt-3 flex flex-wrap items-center text-sm text-gray-500">
        <span className="truncate">
          Commit: <span className="font-mono">{shortSha}</span>
        </span>
        <span className="mx-2">·</span>
        <span>Updated: {formattedLastUpdate}</span>
        <span className="mx-2">·</span>
        <span>{totalCount} status{totalCount !== 1 ? "es" : ""}</span>
      </div>

      {/* Statuses List */}
      <div className="mt-4 space-y-2">
        {displayStatuses.map((s) => {
          const style = badgeStyles[s.state] || badgeStyles.default;
          return (
            <div key={s.id} className="flex items-center justify-between">
              <span className="flex-1 text-sm text-gray-700 truncate">
                {s.context}
              </span>
              <span
                className={`ml-2 flex-shrink-0 px-2 py-0.5 text-xs font-medium uppercase rounded-full ${style.text} ${style.bg}`}
              >
                {s.state}
              </span>
            </div>
          );
        })}
        {totalCount > displayStatuses.length && (
          <p className="text-sm text-gray-500">
            +{totalCount - displayStatuses.length} more
          </p>
        )}
      </div>
    </div>
  );
}
