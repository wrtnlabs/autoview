import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposCodespaces {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      codespaces: AutoViewInputSubTypes.codespace[];
    };
  }
  /**
   * A codespace.
   *
   * @title Codespace
   */
  export type codespace = {
    id: number & tags.Type<"int32">;
    /**
     * Automatically generated name of this codespace.
     */
    name: string;
    /**
     * Display name for this codespace.
     */
    display_name?: string | null;
    /**
     * UUID identifying this codespace's environment.
     */
    environment_id: string | null;
    owner: AutoViewInputSubTypes.simple_user;
    billable_owner: AutoViewInputSubTypes.simple_user;
    repository: AutoViewInputSubTypes.minimal_repository;
    machine: AutoViewInputSubTypes.nullable_codespace_machine;
    /**
     * Path to devcontainer.json from repo root used to create Codespace.
     */
    devcontainer_path?: string | null;
    /**
     * Whether the codespace was created from a prebuild.
     */
    prebuild: boolean | null;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    /**
     * Last known time this codespace was started.
     */
    last_used_at: string;
    /**
     * State of this codespace.
     */
    state:
      | "Unknown"
      | "Created"
      | "Queued"
      | "Provisioning"
      | "Available"
      | "Awaiting"
      | "Unavailable"
      | "Deleted"
      | "Moved"
      | "Shutdown"
      | "Archived"
      | "Starting"
      | "ShuttingDown"
      | "Failed"
      | "Exporting"
      | "Updating"
      | "Rebuilding";
    /**
     * API URL for this codespace.
     */
    url: string;
    /**
     * Details about the codespace's git repository.
     */
    git_status: {
      /**
       * The number of commits the local repository is ahead of the remote.
       */
      ahead?: number & tags.Type<"int32">;
      /**
       * The number of commits the local repository is behind the remote.
       */
      behind?: number & tags.Type<"int32">;
      /**
       * Whether the local repository has unpushed changes.
       */
      has_unpushed_changes?: boolean;
      /**
       * Whether the local repository has uncommitted changes.
       */
      has_uncommitted_changes?: boolean;
      /**
       * The current branch (or SHA if in detached HEAD state) of the local repository.
       */
      ref?: string;
    };
    /**
     * The initally assigned location of a new codespace.
     */
    location: "EastUs" | "SouthEastAsia" | "WestEurope" | "WestUs2";
    /**
     * The number of minutes of inactivity after which this codespace will be automatically stopped.
     */
    idle_timeout_minutes: (number & tags.Type<"int32">) | null;
    /**
     * URL to access this codespace on the web.
     */
    web_url: string;
    /**
     * API URL to access available alternate machine types for this codespace.
     */
    machines_url: string;
    /**
     * API URL to start this codespace.
     */
    start_url: string;
    /**
     * API URL to stop this codespace.
     */
    stop_url: string;
    /**
     * API URL to publish this codespace to a new repository.
     */
    publish_url?: (string & tags.Format<"uri">) | null;
    /**
     * API URL for the Pull Request associated with this codespace, if any.
     */
    pulls_url: (string & tags.Format<"uri">) | null;
    recent_folders: string[];
    runtime_constraints?: {
      /**
       * The privacy settings a user can select from when forwarding a port.
       */
      allowed_port_privacy_settings?: string[] | null;
    };
    /**
     * Whether or not a codespace has a pending async operation. This would mean that the codespace is temporarily unavailable. The only thing that you can do with a codespace in this state is delete it.
     */
    pending_operation?: boolean | null;
    /**
     * Text to show user when codespace is disabled by a pending operation
     */
    pending_operation_disabled_reason?: string | null;
    /**
     * Text to show user when codespace idle timeout minutes has been overriden by an organization policy
     */
    idle_timeout_notice?: string | null;
    /**
     * Duration in minutes after codespace has gone idle in which it will be deleted. Must be integer minutes between 0 and 43200 (30 days).
     */
    retention_period_minutes?: (number & tags.Type<"int32">) | null;
    /**
     * When a codespace will be auto-deleted based on the "retention_period_minutes" and "last_used_at"
     */
    retention_expires_at?: (string & tags.Format<"date-time">) | null;
    /**
     * The text to display to a user when a codespace has been stopped for a potentially actionable reason.
     */
    last_known_stop_notice?: string | null;
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
  /**
   * A description of the machine powering a codespace.
   *
   * @title Codespace machine
   */
  export type nullable_codespace_machine = {
    /**
     * The name of the machine.
     */
    name: string;
    /**
     * The display name of the machine includes cores, memory, and storage.
     */
    display_name: string;
    /**
     * The operating system of the machine.
     */
    operating_system: string;
    /**
     * How much storage is available to the codespace.
     */
    storage_in_bytes: number & tags.Type<"int32">;
    /**
     * How much memory is available to the codespace.
     */
    memory_in_bytes: number & tags.Type<"int32">;
    /**
     * How many cores are available to the codespace.
     */
    cpus: number & tags.Type<"int32">;
    /**
     * Whether a prebuild is currently available when creating a codespace for this machine and repository. If a branch was not specified as a ref, the default branch will be assumed. Value will be "null" if prebuilds are not supported or prebuild availability could not be determined. Value will be "none" if no prebuild is available. Latest values "ready" and "in_progress" indicate the prebuild availability status.
     */
    prebuild_availability: "none" | "ready" | "in_progress" | null;
  } | null;
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposCodespaces.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDateTime = (iso: string) => new Date(iso).toLocaleString();
  const getStateIcon = (state: string) => {
    const commonProps = { size: 16, strokeWidth: 2 as number };
    switch (state) {
      case "Available":
        return <LucideReact.CheckCircle color="#10B981" {...commonProps} />;
      case "Queued":
      case "Awaiting":
        return <LucideReact.Clock color="#F59E0B" {...commonProps} />;
      case "Provisioning":
      case "Starting":
      case "Updating":
      case "Rebuilding":
        return (
          <LucideReact.Loader
            className="animate-spin text-gray-500"
            {...commonProps}
          />
        );
      case "Unavailable":
      case "Deleted":
      case "Failed":
        return <LucideReact.AlertTriangle color="#EF4444" {...commonProps} />;
      case "Shutdown":
      case "ShuttingDown":
        return <LucideReact.PowerOff color="#EF4444" {...commonProps} />;
      case "Archived":
      case "Moved":
        return <LucideReact.Archive color="#6B7280" {...commonProps} />;
      default:
        return <LucideReact.Circle color="#9CA3AF" {...commonProps} />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800">Codespaces</h2>
        <span className="text-sm text-gray-600">{value.total_count} total</span>
      </div>
      <div className="space-y-3">
        {value.codespaces.map((cs) => {
          const displayName = cs.display_name ?? cs.name;
          const lastUsed = cs.last_used_at
            ? formatDateTime(cs.last_used_at)
            : "N/A";
          const machineName = cs.machine?.display_name ?? "Standard";

          return (
            <div
              key={cs.id}
              className="flex items-start p-3 bg-gray-50 rounded-lg"
            >
              <img
                src={cs.owner.avatar_url}
                alt={cs.owner.login}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    cs.owner.login,
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <div className="flex-1 ml-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 truncate">
                    {displayName}
                  </span>
                  <div className="flex items-center">
                    {getStateIcon(cs.state)}
                    <span className="ml-1 text-sm text-gray-700">
                      {cs.state}
                    </span>
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-600 truncate">
                  {cs.repository.full_name}
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-600">
                  <LucideReact.Calendar size={14} className="text-gray-400" />
                  <span className="ml-1">Last used: {lastUsed}</span>
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  Machine: {machineName}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
