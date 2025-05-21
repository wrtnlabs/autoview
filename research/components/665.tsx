import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A suite of checks performed on the code of a given code change
     *
     * @title CheckSuite
    */
    export type check_suite = {
        id: number & tags.Type<"int32">;
        node_id: string;
        head_branch: string | null;
        /**
         * The SHA of the head commit that is being checked.
        */
        head_sha: string;
        /**
         * The phase of the lifecycle that the check suite is currently in. Statuses of waiting, requested, and pending are reserved for GitHub Actions check suites.
        */
        status: "queued" | "in_progress" | "completed" | "waiting" | "requested" | "pending" | null;
        conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required" | "startup_failure" | "stale" | null;
        url: string | null;
        before: string | null;
        after: string | null;
        pull_requests: any[] | null;
        app: AutoViewInputSubTypes.nullable_integration;
        repository: AutoViewInputSubTypes.minimal_repository;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        head_commit: AutoViewInputSubTypes.simple_commit;
        latest_check_runs_count: number & tags.Type<"int32">;
        check_runs_url: string;
        rerequestable?: boolean;
        runs_rerequestable?: boolean;
    };
    export type pull_request_minimal = any;
    /**
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type nullable_integration = {
        /**
         * Unique identifier of the GitHub app
        */
        id: number & tags.Type<"int32">;
        /**
         * The slug name of the GitHub app
        */
        slug?: string;
        node_id: string;
        client_id?: string;
        owner: any | any;
        /**
         * The name of the GitHub app
        */
        name: string;
        description: string | null;
        external_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The set of permissions for the GitHub app
        */
        permissions: {
            [key: string]: string;
        };
        /**
         * The list of events for the GitHub app
        */
        events: string[];
        /**
         * The number of installations associated with the GitHub app
        */
        installations_count?: number & tags.Type<"int32">;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
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
    export type enterprise = any;
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
     * A commit.
     *
     * @title Simple Commit
    */
    export type simple_commit = {
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
            email: string & tags.Format<"email">;
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
            email: string & tags.Format<"email">;
        } | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.check_suite;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const branch = value.head_branch ?? 'N/A';
  const sha = value.head_sha ? value.head_sha.substring(0, 7) : 'N/A';
  const statusMap: Record<string, { label: string; color: string }> = {
    queued: { label: 'Queued', color: 'bg-gray-100 text-gray-800' },
    waiting: { label: 'Waiting', color: 'bg-gray-100 text-gray-800' },
    requested: { label: 'Requested', color: 'bg-yellow-100 text-yellow-800' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
    completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
    'null': { label: 'N/A', color: 'bg-gray-100 text-gray-800' },
  };
  const statusKey = value.status ?? 'null';
  const statusInfo =
    statusMap[statusKey] || { label: String(statusKey), color: 'bg-gray-100 text-gray-800' };
  const conclusionMap: Record<string, { label: string; color: string }> = {
    success: { label: 'Success', color: 'bg-green-100 text-green-800' },
    failure: { label: 'Failure', color: 'bg-red-100 text-red-800' },
    neutral: { label: 'Neutral', color: 'bg-gray-100 text-gray-800' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
    skipped: { label: 'Skipped', color: 'bg-gray-100 text-gray-800' },
    timed_out: { label: 'Timed Out', color: 'bg-red-100 text-red-800' },
    action_required: { label: 'Action Required', color: 'bg-yellow-100 text-yellow-800' },
    startup_failure: { label: 'Startup Failure', color: 'bg-red-100 text-red-800' },
    stale: { label: 'Stale', color: 'bg-gray-100 text-gray-800' },
  };
  const conclusionInfo = value.conclusion
    ? conclusionMap[value.conclusion] || {
        label: String(value.conclusion),
        color: 'bg-gray-100 text-gray-800',
      }
    : null;
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : 'N/A';
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : 'N/A';
  const commit = value.head_commit;
  const author = commit.author ?? commit.committer;
  const authorName = author?.name ?? 'Unknown';
  const commitTime = commit.timestamp
    ? new Date(commit.timestamp).toLocaleString()
    : 'N/A';
  const commitMessage = commit.message;
  const repoName = value.repository.full_name;
  const appName = value.app?.name ?? 'N/A';
  const runCount = value.latest_check_runs_count;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Check Suite #{value.id}
        </h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${statusInfo.color}`}
        >
          {statusInfo.label}
        </span>
      </div>
      {conclusionInfo && statusKey === 'completed' && (
        <div className="mb-2">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded ${conclusionInfo.color}`}
          >
            {conclusionInfo.label}
          </span>
        </div>
      )}
      <div className="mb-2 text-sm text-gray-600">
        Branch: <span className="font-mono">{branch}</span> &bull; Commit:{' '}
        <span className="font-mono">{sha}</span>
      </div>
      <p className="text-sm text-gray-700 truncate mb-1">{commitMessage}</p>
      <div className="mb-2 text-xs text-gray-500">
        By {authorName} on {commitTime}
      </div>
      <div className="flex flex-wrap text-xs text-gray-500 space-x-4 mb-2">
        <div>Repo: {repoName}</div>
        <div>App: {appName}</div>
        <div>Runs: {runCount}</div>
      </div>
      <div className="text-xs text-gray-400">
        Created: {createdAt} &bull; Updated: {updatedAt}
      </div>
    </div>
  );
}
