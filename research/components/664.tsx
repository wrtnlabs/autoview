import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    private: boolean;
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
  // 1. Data aggregation / transformation
  const { repository, preferences } = value;
  const autoTriggers = preferences.auto_trigger_checks ?? [];
  const enabledCount = autoTriggers.filter((c) => c.setting).length;
  const disabledCount = autoTriggers.length - enabledCount;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Repository Overview */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                repository.owner.login,
              )}&background=0D8ABC&color=fff`;
            }}
            className="w-10 h-10 rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {repository.full_name}
          </h2>
        </div>
        {repository.description && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {repository.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <LucideReact.Star size={16} className="text-yellow-500" />
            <span>{repository.stargazers_count ?? 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.GitFork size={16} className="text-gray-500" />
            <span>{repository.forks_count ?? repository.forks ?? 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Eye size={16} className="text-gray-500" />
            <span>{repository.watchers_count ?? repository.watchers ?? 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.AlertCircle size={16} className="text-red-500" />
            <span>
              {repository.open_issues_count ?? repository.open_issues ?? 0}
            </span>
          </div>
          {repository.language && (
            <div className="flex items-center gap-1">
              <LucideReact.Tag size={16} className="text-blue-500" />
              <span>{repository.language}</span>
            </div>
          )}
          {repository.license?.name && (
            <div className="flex items-center gap-1">
              <LucideReact.BookOpen size={16} className="text-green-500" />
              <span>{repository.license.name}</span>
            </div>
          )}
          {repository.default_branch && (
            <div className="flex items-center gap-1">
              <LucideReact.GitBranch size={16} className="text-gray-500" />
              <span>{repository.default_branch}</span>
            </div>
          )}
        </div>
      </div>

      {/* Auto-Trigger Checks Section */}
      <div className="space-y-2">
        <h3 className="flex items-center text-gray-800 font-medium">
          <LucideReact.Settings size={18} className="mr-2 text-gray-500" />
          Auto Trigger Checks
        </h3>
        {autoTriggers.length > 0 ? (
          <div className="space-y-2">
            {autoTriggers.map((cfg) => (
              <div
                key={cfg.app_id}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <span className="text-sm text-gray-700">
                  App ID: {cfg.app_id}
                </span>
                {cfg.setting ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                    aria-label="Enabled"
                  />
                ) : (
                  <LucideReact.XCircle
                    size={16}
                    className="text-red-500"
                    aria-label="Disabled"
                  />
                )}
              </div>
            ))}
            <div className="text-sm text-gray-600">
              Enabled: {enabledCount}, Disabled: {disabledCount}
            </div>
          </div>
        ) : (
          <div className="flex items-center text-gray-500 text-sm">
            <LucideReact.AlertCircle size={16} className="mr-1" />
            No auto-trigger checks configured
          </div>
        )}
      </div>
    </div>
  );
}
