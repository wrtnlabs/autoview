import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A codespace.
     *
     * @title Codespace
    */
    export interface codespace {
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
        state: "Unknown" | "Created" | "Queued" | "Provisioning" | "Available" | "Awaiting" | "Unavailable" | "Deleted" | "Moved" | "Shutdown" | "Archived" | "Starting" | "ShuttingDown" | "Failed" | "Exporting" | "Updating" | "Rebuilding";
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
export type AutoViewInput = AutoViewInputSubTypes.codespace;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName = value.display_name ?? value.name;
  const createdAt = new Date(value.created_at).toLocaleString();
  const lastUsedAt = value.last_used_at
    ? new Date(value.last_used_at).toLocaleString()
    : "Never used";
  const machineName = value.machine?.display_name ?? "Unknown";

  const stateBadgeClass = (() => {
    const green = ["Available"];
    const amber = ["Provisioning", "Queued", "Awaiting", "Starting", "Updating", "Rebuilding", "Exporting"];
    const red = ["Unavailable", "Deleted", "Failed", "Shutdown", "ShuttingDown", "Archived", "Moved"];
    if (green.includes(value.state)) return "bg-green-100 text-green-800";
    if (amber.includes(value.state)) return "bg-yellow-100 text-yellow-800";
    if (red.includes(value.state)) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  })();

  const retentionExpiresAt = value.retention_expires_at
    ? new Date(value.retention_expires_at).toLocaleString()
    : null;

  const recent = value.recent_folders ?? [];
  const showFolders = recent.slice(0, 3);
  const moreCount = recent.length - showFolders.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <LucideReact.Code className="text-blue-500" size={20} />
        <h2 className="text-lg font-semibold text-gray-900">{displayName}</h2>
        {displayName !== value.name && (
          <span className="text-sm text-gray-500 truncate">({value.name})</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <LucideReact.User size={16} className="text-gray-500" />
            <span>Owner: {value.owner.login}</span>
          </div>

          <div className="flex items-center space-x-2">
            <LucideReact.GitBranch size={16} className="text-gray-500" />
            <span>Repo: {value.repository.full_name}</span>
          </div>

          <div className="flex items-center space-x-2">
            <LucideReact.Server size={16} className="text-gray-500" />
            <span>Machine: {machineName}</span>
          </div>

          <div className="flex items-center space-x-2">
            <LucideReact.MapPin size={16} className="text-gray-500" />
            <span>Location: {value.location}</span>
          </div>

          <div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${stateBadgeClass}`}>
              {value.state}
            </span>
          </div>

          {value.prebuild != null && (
            <div className="flex items-center space-x-1">
              {value.prebuild ? (
                <LucideReact.CheckCircle size={16} className="text-green-500" />
              ) : (
                <LucideReact.XCircle size={16} className="text-red-500" />
              )}
              <span>Prebuild: {value.prebuild ? "Yes" : "No"}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <LucideReact.Calendar size={16} className="text-gray-500" />
            <span>Created: {createdAt}</span>
          </div>

          <div className="flex items-center space-x-2">
            <LucideReact.Clock size={16} className="text-gray-500" />
            <span>Last Used: {lastUsedAt}</span>
          </div>

          {value.idle_timeout_minutes != null && (
            <div className="flex items-center space-x-2">
              <LucideReact.Clock size={16} className="text-gray-500" />
              <span>Idle Timeout: {value.idle_timeout_minutes} min</span>
            </div>
          )}

          {retentionExpiresAt && (
            <div className="flex items-center space-x-2">
              <LucideReact.Calendar size={16} className="text-gray-500" />
              <span>Expires: {retentionExpiresAt}</span>
            </div>
          )}

          {value.pending_operation && (
            <div className="flex items-center space-x-2">
              <LucideReact.AlertTriangle size={16} className="text-red-500" />
              <span className="text-red-600">
                {value.pending_operation_disabled_reason ?? "Operation pending"}
              </span>
            </div>
          )}

          {recent.length > 0 && (
            <div className="flex items-center space-x-2">
              <LucideReact.Folder size={16} className="text-gray-500" />
              <div className="flex flex-wrap gap-1">
                {showFolders.map((dir) => (
                  <span
                    key={dir}
                    className="bg-gray-100 rounded px-1 text-xs text-gray-600 truncate"
                  >
                    {dir}
                  </span>
                ))}
                {moreCount > 0 && (
                  <span className="text-xs text-gray-500">+{moreCount} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
