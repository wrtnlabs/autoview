import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.minimal_repository[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived constants
  const formatDate = (iso?: string | null): string => {
    if (!iso) return "Unknown date";
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {value.map((repo) => {
        const {
          id,
          name,
          full_name,
          owner,
          description,
          language,
          stargazers_count,
          forks_count,
          open_issues_count,
          topics,
          license,
          updated_at,
        } = repo;

        const displayDescription = description
          ? description
          : "No description provided.";

        const displayLicense = license?.name ?? "No license";

        const stars = stargazers_count ?? 0;
        const forks = forks_count ?? 0;
        const issues = open_issues_count ?? 0;

        const lastUpdated = formatDate(updated_at);

        return (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <div className="flex items-center p-4">
              <img
                src={owner.avatar_url}
                alt={`${owner.login} avatar`}
                className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {name}
                </h2>
                <p className="text-sm text-gray-500 truncate">{owner.login}</p>
              </div>
            </div>
            <div className="px-4 pb-4 flex-1 flex flex-col">
              <p className="text-gray-700 text-sm line-clamp-2 mb-3 flex-1">
                {displayDescription}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {topics?.slice(0, 5).map((topic) => (
                  <span
                    key={topic}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Updated: {lastUpdated}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between text-gray-600 text-sm">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927C9.3 2.18 10.7 2.18 10.951 2.927l.833 2.538a1 1 0 00.95.69h2.665c.969 0 1.371 1.24.588 1.81l-2.155 1.565a1 1 0 00-.364 1.118l.833 2.538c.25.767-.69 1.4-1.4 1.017l-2.155-1.565a1 1 0 00-1.176 0l-2.155 1.565c-.71.383-1.65-.25-1.4-1.017l.833-2.538a1 1 0 00-.364-1.118L2.963 8.965c-.783-.57-.38-1.81.588-1.81h2.665a1 1 0 00.95-.69l.833-2.538z" />
                  </svg>
                  {stars}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 3a2 2 0 00-2 2v10l4-4h7a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
                  </svg>
                  {issues}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a6 6 0 00-6 6v2a6 6 0 006 6 6 6 0 006-6V8a6 6 0 00-6-6z" />
                  </svg>
                  {forks}
                </span>
              </div>
              <div className="text-right">
                <div>{language ?? "No language"}</div>
                <div className="text-xs text-gray-400">{displayLicense}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
