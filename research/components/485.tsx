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
  // 1. Data aggregation/transformation functions
  const repos = value || [];

  const formatDate = (dateString?: string | null): string =>
    dateString
      ? new Date(dateString).toLocaleDateString("default", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // 2. Compose the visual structure
  if (repos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No repositories available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="flex flex-col bg-white p-4 rounded-lg shadow transition-shadow hover:shadow-md"
        >
          {/* Header: Name & privacy */}
          <div className="flex items-center">
            <LucideReact.Folder size={20} className="text-gray-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800 truncate">
              {repo.name}
            </h3>
            {repo.private && (
              <span title="Private" className="ml-1">
                <LucideReact.Lock size={16} className="text-gray-400" />
              </span>
            )}
          </div>

          {/* Description */}
          {repo.description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {repo.description}
            </p>
          )}

          {/* Owner */}
          <div className="flex items-center mt-3">
            <img
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              onError={(e) => {
                e.currentTarget.src =
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(repo.owner.login) +
                  "&background=random";
              }}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="ml-2 text-sm text-gray-500">
              {repo.owner.login}
            </span>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-500">
            <div className="flex items-center">
              <LucideReact.Star size={16} />
              <span className="ml-1 text-sm">
                {repo.stargazers_count ?? 0}
              </span>
            </div>
            <div className="flex items-center">
              <LucideReact.GitBranch size={16} />
              <span className="ml-1 text-sm">{repo.forks_count ?? 0}</span>
            </div>
            <div className="flex items-center">
              <LucideReact.Eye size={16} />
              <span className="ml-1 text-sm">{repo.watchers_count ?? 0}</span>
            </div>
            {repo.language && (
              <div className="flex items-center">
                <LucideReact.Tag size={16} />
                <span className="ml-1 text-sm">{repo.language}</span>
              </div>
            )}
            <div className="flex items-center">
              <LucideReact.AlertCircle size={16} />
              <span className="ml-1 text-sm">
                {repo.open_issues_count ?? 0}
              </span>
            </div>
          </div>

          {/* Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {repo.topics.slice(0, 5).map((topic) => (
                <span
                  key={topic}
                  className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                >
                  {topic}
                </span>
              ))}
              {repo.topics.length > 5 && (
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  +{repo.topics.length - 5} more
                </span>
              )}
            </div>
          )}

          {/* Dates */}
          <div className="flex items-center mt-4 text-gray-400 text-sm">
            {repo.created_at && (
              <>
                <LucideReact.Calendar size={16} />
                <span className="ml-1">
                  Created: {formatDate(repo.created_at)}
                </span>
              </>
            )}
            {repo.updated_at && (
              <>
                <span className="mx-2">|</span>
                <LucideReact.Calendar size={16} />
                <span className="ml-1">
                  Updated: {formatDate(repo.updated_at)}
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
