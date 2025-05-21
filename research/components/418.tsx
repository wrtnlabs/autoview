import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsVariablesRepositories {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            repositories: AutoViewInputSubTypes.minimal_repository[];
        };
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsVariablesRepositories.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatCount = (n?: number): string =>
    n === undefined
      ? "-"
      : n >= 1000
      ? `${(n / 1000).toFixed(1)}k`
      : `${n}`;

  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "-";

  const totalCount = formatCount(value.total_count);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">
        Repositories ({totalCount})
      </h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {value.repositories.map((repo) => {
          const {
            id,
            name,
            description,
            owner,
            "private": isPrivate,
            stargazers_count,
            forks_count,
            language,
            topics,
            license,
            updated_at,
            created_at,
          } = repo;

          const statusLabel = isPrivate ? "Private" : "Public";
          const statusColor = isPrivate ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
          const updatedOrCreated = updated_at ?? created_at;
          const displayDate = formatDate(updatedOrCreated);

          return (
            <div
              key={id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-150"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {name}
                </h3>
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded ${statusColor}`}
                >
                  {statusLabel}
                </span>
              </div>
              {description && (
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                  {description}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center text-xs text-gray-500 space-x-2">
                <span>{owner.login}</span>
                {language && <span>• {language}</span>}
                <span>• Updated on {displayDate}</span>
              </div>
              <div className="mt-3 flex items-center space-x-4 text-sm text-gray-700">
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.364-1.118L2.076 9.373c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.946z" />
                  </svg>
                  <span>{formatCount(stargazers_count)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 3a2 2 0 00-2 2v12l4-4h9a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
                  </svg>
                  <span>{formatCount(forks_count)}</span>
                </div>
              </div>
              {topics && topics.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {topics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {topic}
                    </span>
                  ))}
                  {topics.length > 5 && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                      +{topics.length - 5}
                    </span>
                  )}
                </div>
              )}
              {license && license.name && (
                <div className="mt-3 text-xs text-gray-500">
                  License: {license.name}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
