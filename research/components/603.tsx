import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * An invocation of a workflow
     *
     * @title Workflow Run
    */
    export interface workflow_run {
        /**
         * The ID of the workflow run.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the workflow run.
        */
        name?: string | null;
        node_id: string;
        /**
         * The ID of the associated check suite.
        */
        check_suite_id?: number & tags.Type<"int32">;
        /**
         * The node ID of the associated check suite.
        */
        check_suite_node_id?: string;
        head_branch: string | null;
        /**
         * The SHA of the head commit that points to the version of the workflow being run.
        */
        head_sha: string;
        /**
         * The full path of the workflow
        */
        path: string;
        /**
         * The auto incrementing run number for the workflow run.
        */
        run_number: number & tags.Type<"int32">;
        /**
         * Attempt number of the run, 1 for first attempt and higher if the workflow was re-run.
        */
        run_attempt?: number & tags.Type<"int32">;
        referenced_workflows?: AutoViewInputSubTypes.referenced_workflow[] | null;
        event: string;
        status: string | null;
        conclusion: string | null;
        /**
         * The ID of the parent workflow.
        */
        workflow_id: number & tags.Type<"int32">;
        /**
         * The URL to the workflow run.
        */
        url: string;
        html_url: string;
        /**
         * Pull requests that are open with a `head_sha` or `head_branch` that matches the workflow run. The returned pull requests do not necessarily indicate pull requests that triggered the run.
        */
        pull_requests: AutoViewInputSubTypes.pull_request_minimal[] | null;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        actor?: AutoViewInputSubTypes.simple_user;
        triggering_actor?: AutoViewInputSubTypes.simple_user;
        /**
         * The start time of the latest run. Resets on re-run.
        */
        run_started_at?: string;
        /**
         * The URL to the jobs for the workflow run.
        */
        jobs_url: string;
        /**
         * The URL to download the logs for the workflow run.
        */
        logs_url: string;
        /**
         * The URL to the associated check suite.
        */
        check_suite_url: string;
        /**
         * The URL to the artifacts for the workflow run.
        */
        artifacts_url: string;
        /**
         * The URL to cancel the workflow run.
        */
        cancel_url: string;
        /**
         * The URL to rerun the workflow run.
        */
        rerun_url: string;
        /**
         * The URL to the previous attempted run of this workflow, if one exists.
        */
        previous_attempt_url?: string | null;
        /**
         * The URL to the workflow.
        */
        workflow_url: string;
        head_commit: AutoViewInputSubTypes.nullable_simple_commit;
        repository: AutoViewInputSubTypes.minimal_repository;
        head_repository: AutoViewInputSubTypes.minimal_repository;
        head_repository_id?: number & tags.Type<"int32">;
        /**
         * The event-specific title associated with the run or the run-name if set, or the value of `run-name` if it is set in the workflow.
        */
        display_title: string;
    }
    /**
     * A workflow referenced/reused by the initial caller workflow
     *
     * @title Referenced workflow
    */
    export interface referenced_workflow {
        path: string;
        sha: string;
        ref?: string;
    }
    /**
     * @title Pull Request Minimal
    */
    export interface pull_request_minimal {
        id: number & tags.Type<"int32">;
        number: number & tags.Type<"int32">;
        url: string;
        head: {
            ref: string;
            sha: string;
            repo: {
                id: number & tags.Type<"int32">;
                url: string;
                name: string;
            };
        };
        base: {
            ref: string;
            sha: string;
            repo: {
                id: number & tags.Type<"int32">;
                url: string;
                name: string;
            };
        };
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
     * A commit.
     *
     * @title Simple Commit
    */
    export type nullable_simple_commit = {
        /**
         * SHA for the commit
        */
        id: string;
        /**
         * SHA for the commit's tree
        */
        tree_id: string;
        /**
         * Message describing the purpose of the commit
        */
        message: string;
        /**
         * Timestamp of the commit
        */
        timestamp: string;
        /**
         * Information about the Git author
        */
        author: {
            /**
             * Name of the commit's author
            */
            name: string;
            /**
             * Git email address of the commit's author
            */
            email: string;
        } | null;
        /**
         * Information about the Git committer
        */
        committer: {
            /**
             * Name of the commit's committer
            */
            name: string;
            /**
             * Git email address of the commit's committer
            */
            email: string;
        } | null;
    } | null;
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
}
export type AutoViewInput = AutoViewInputSubTypes.workflow_run;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const startTime = value.run_started_at ?? value.created_at;
  const startDate = new Date(startTime);
  const endDate = new Date(value.updated_at);
  const durationMs = endDate.getTime() - startDate.getTime();

  function formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  }

  const duration = formatDuration(durationMs);
  const formattedStart = startDate.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  const statusKey = value.conclusion ?? value.status ?? 'unknown';
  const displayStatus = statusKey.charAt(0).toUpperCase() + statusKey.slice(1);

  // Determine appropriate status icon
  let statusIcon: React.ReactNode;
  if (value.conclusion === 'success') {
    statusIcon = <LucideReact.CheckCircle className="text-green-500" size={20} aria-label="Success" />;
  } else if (value.conclusion === 'failure') {
    statusIcon = <LucideReact.AlertTriangle className="text-red-500" size={20} aria-label="Failure" />;
  } else if (value.conclusion === 'cancelled') {
    statusIcon = <LucideReact.XCircle className="text-amber-500" size={20} aria-label="Cancelled" />;
  } else if (value.status === 'in_progress') {
    statusIcon = <LucideReact.Loader className="animate-spin text-blue-500" size={20} aria-label="In Progress" />;
  } else if (value.status === 'queued') {
    statusIcon = <LucideReact.Clock className="text-amber-500" size={20} aria-label="Queued" />;
  } else {
    statusIcon = <LucideReact.Info className="text-gray-500" size={20} aria-label={displayStatus} />;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Title and Status */}
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {value.display_title || value.name || `Run #${value.run_number}`}
          </h3>
          {value.path && (
            <p className="text-sm text-gray-500 truncate">{value.path}</p>
          )}
        </div>
        <div className="ml-4 flex-shrink-0">{statusIcon}</div>
      </div>

      {/* Repository Info */}
      <div className="flex items-center text-sm text-gray-500">
        <LucideReact.GitBranch size={16} className="mr-1" />
        <span className="truncate">{value.repository.full_name}</span>
      </div>

      {/* Details Grid */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div>
          <dt className="font-medium text-gray-700">Run</dt>
          <dd>#{value.run_number}{value.run_attempt && value.run_attempt > 1 ? ` (Attempt ${value.run_attempt})` : ''}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">Event</dt>
          <dd className="flex items-center gap-1">
            <LucideReact.Tag size={16} className="text-gray-400" />
            <span>{value.event}</span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">Branch</dt>
          <dd className="flex items-center gap-1">
            <LucideReact.GitBranch size={16} className="text-gray-400" />
            <span>{value.head_branch || value.head_sha.slice(0, 7)}</span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">Pull Requests</dt>
          <dd className="flex items-center gap-1">
            <LucideReact.GitPullRequest size={16} className="text-gray-400" />
            <span>{value.pull_requests?.length ?? 0}</span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">Started</dt>
          <dd className="flex items-center gap-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>{formattedStart}</span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">Duration</dt>
          <dd className="flex items-center gap-1">
            <LucideReact.Clock size={16} className="text-gray-400" />
            <span>{duration}</span>
          </dd>
        </div>
        {value.actor && (
          <div className="sm:col-span-2">
            <dt className="font-medium text-gray-700">Actor</dt>
            <dd className="flex items-center gap-2">
              <img
                src={value.actor.avatar_url}
                onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = 'https://ui-avatars.com/api/?name=Unknown&background=CCCCCC&color=ffffff'; }}
                alt={value.actor.login}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span>{value.actor.login}</span>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
