import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Check suite configuration preferences for a repository.
     *
     * @title Check Suite Preference
    */
    export interface check_suite_preference {
        preferences: {
            auto_trigger_checks?: {
                app_id: number & tags.Type<"int32">;
                setting: boolean;
            }[];
        };
        repository: AutoViewInputSubTypes.minimal_repository;
    }
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
export type AutoViewInput = AutoViewInputSubTypes.check_suite_preference;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { repository, preferences } = value;
  const owner = repository.owner;
  const autoChecks = preferences.auto_trigger_checks ?? [];

  // Fallback handler for owner avatar
  const handleAvatarError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      owner.login,
    )}&background=0D8ABC&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
      {/* Repository Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
          {repository.full_name}
        </h2>
        {repository.private ? (
          <LucideReact.Lock
            className="text-gray-500"
            size={20}
            aria-label="Private repository"
          />
        ) : (
          <LucideReact.Unlock
            className="text-gray-500"
            size={20}
            aria-label="Public repository"
          />
        )}
      </div>

      {/* Description */}
      {repository.description && (
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
          {repository.description}
        </p>
      )}

      {/* Meta info: owner, language, stars, forks, issues, updated */}
      <div className="mt-3 flex flex-wrap items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm">
        <div className="flex items-center space-x-1">
          <img
            src={owner.avatar_url}
            alt={owner.login}
            className="w-6 h-6 rounded-full object-cover"
            onError={handleAvatarError}
          />
          <span className="truncate">{owner.login}</span>
        </div>
        {repository.language && (
          <div className="flex items-center space-x-1">
            <LucideReact.Code className="text-gray-400" size={16} />
            <span>{repository.language}</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <LucideReact.Star className="text-yellow-500" size={16} />
          <span>{repository.stargazers_count ?? 0}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.GitBranch className="text-gray-500" size={16} />
          <span>{repository.forks_count ?? 0}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.AlertCircle className="text-gray-500" size={16} />
          <span>{repository.open_issues_count ?? 0}</span>
        </div>
        {repository.updated_at && (
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar className="text-gray-400" size={16} />
            <span>{new Date(repository.updated_at).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Auto Trigger Checks Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Auto Trigger Checks ({autoChecks.length})
          </h3>
          {autoChecks.length === 0 && (
            <LucideReact.AlertCircle
              className="text-gray-400"
              size={20}
              aria-label="No auto trigger checks"
            />
          )}
        </div>
        <ul className="mt-2 space-y-2">
          {autoChecks.map((check) => (
            <li
              key={check.app_id}
              className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300"
            >
              <span>App ID {check.app_id}</span>
              {check.setting ? (
                <LucideReact.CheckCircle
                  className="text-green-500"
                  size={16}
                  aria-label="Enabled"
                />
              ) : (
                <LucideReact.XCircle
                  className="text-red-500"
                  size={16}
                  aria-label="Disabled"
                />
              )}
            </li>
          ))}
          {autoChecks.length === 0 && (
            <li className="text-sm text-gray-500">
              No configurations found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
