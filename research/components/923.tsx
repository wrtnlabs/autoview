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
  // Utility: format large numbers (e.g., 1500 → "1.5k")
  const formatNumber = (n?: number): string => {
    if (n === undefined || n === null) return "0";
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
  };

  // Utility: format ISO date to "MMM D, YYYY"
  const formatDate = (iso?: string | null): string => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("default", { year: "numeric", month: "short", day: "numeric" });
  };

  // If no data, show a placeholder
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No repositories available.
      </div>
    );
  }

  // Render a responsive grid of repository cards
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {value.map((repo) => {
        const latestDate = repo.updated_at ?? repo.pushed_at ?? repo.created_at ?? "";
        const updatedLabel = latestDate ? `Updated ${formatDate(latestDate)}` : "";

        return (
          <div
            key={repo.id}
            className="flex flex-col p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* Owner */}
            <div className="flex items-center space-x-3">
              <img
                src={repo.owner.avatar_url}
                alt={`${repo.owner.login} avatar`}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <span className="text-sm font-medium text-gray-700 truncate">
                {repo.owner.login}
              </span>
            </div>

            {/* Repo Name */}
            <h3
              className="mt-2 text-lg font-semibold text-gray-900 truncate"
              title={repo.full_name}
            >
              {repo.name}
            </h3>

            {/* Description */}
            {repo.description && (
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {repo.description}
              </p>
            )}

            {/* Stats */}
            <div className="mt-3 flex items-center space-x-4 text-gray-500 text-sm">
              <div className="flex items-center space-x-1">
                <span className="text-sm">★</span>
                <span>{formatNumber(repo.stargazers_count)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-sm">🍴</span>
                <span>{formatNumber(repo.forks_count)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-sm">❗</span>
                <span>{formatNumber(repo.open_issues_count)}</span>
              </div>
            </div>

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {repo.topics.slice(0, 5).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            {/* Updated At */}
            {updatedLabel && (
              <div className="mt-auto pt-3 text-xs text-gray-400">
                {updatedLabel}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
