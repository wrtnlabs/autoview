import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Minimal Repository
     *
     * @title Minimal Repository
    */
    export interface minimal_repository {
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
    /**
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export interface code_of_conduct {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    }
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
  // 1. Early empty-state handling
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-300" />
        <span className="mt-2">No repositories available</span>
      </div>
    );
  }

  // 2. Return a responsive grid of repository cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((repo) => {
        // Derived / formatted values
        const ownerName = repo.owner.name ?? repo.owner.login;
        const stars = repo.stargazers_count ?? 0;
        const forks = repo.forks ?? 0;
        const watchers = repo.watchers_count ?? repo.watchers ?? 0;
        const issues = repo.open_issues_count ?? 0;
        const updatedDate = repo.updated_at
          ? new Date(repo.updated_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : null;

        return (
          <div
            key={repo.id}
            className="flex flex-col justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header: Name and privacy */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {repo.name}
              </h3>
              {repo.private ? (
                <LucideReact.Lock size={16} className="text-gray-500" />
              ) : (
                <LucideReact.Unlock size={16} className="text-gray-500" />
              )}
            </div>

            {/* Owner info */}
            <div className="flex items-center gap-2 mb-3">
              <img
                src={repo.owner.avatar_url}
                alt={`${ownerName} avatar`}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    ownerName
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <span className="text-sm font-medium text-gray-700 truncate">
                {ownerName}
              </span>
            </div>

            {/* Description */}
            {repo.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {repo.description}
              </p>
            )}

            {/* Topics */}
            {Array.isArray(repo.topics) && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {repo.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full truncate"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            {/* Stats and metadata */}
            <div className="mt-auto flex flex-wrap items-center justify-between text-sm text-gray-500 gap-2">
              <div className="flex items-center gap-1">
                <LucideReact.Star size={16} className="text-yellow-500" />
                <span>{stars}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.GitBranch size={16} className="text-gray-500" />
                <span>{forks}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Eye size={16} className="text-gray-500" />
                <span>{watchers}</span>
              </div>
              {issues > 0 && (
                <div className="flex items-center gap-1">
                  <LucideReact.AlertCircle size={16} className="text-red-400" />
                  <span>{issues}</span>
                </div>
              )}
              {repo.language && (
                <div className="flex items-center gap-1">
                  <LucideReact.Code size={16} className="text-gray-400" />
                  <span>{repo.language}</span>
                </div>
              )}
              {repo.license?.name && (
                <div className="flex items-center gap-1">
                  <LucideReact.FileText size={16} className="text-gray-400" />
                  <span className="truncate">{repo.license.name}</span>
                </div>
              )}
              {updatedDate && (
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span>{updatedDate}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
