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
  const {
    repository,
    status,
    conclusion,
    head_branch,
    head_sha,
    latest_check_runs_count,
    app,
    created_at,
    updated_at,
    head_commit,
  } = value;

  const shortSha = head_sha ? head_sha.slice(0, 7) : '—';
  const formattedCreated = created_at
    ? new Date(created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : '—';
  const formattedUpdated = updated_at
    ? new Date(updated_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : '—';

  const statusMap: Record<string, { bg: string; text: string }> = {
    queued: { bg: 'bg-gray-100', text: 'text-gray-800' },
    in_progress: { bg: 'bg-blue-100', text: 'text-blue-800' },
    completed: { bg: 'bg-green-100', text: 'text-green-800' },
    waiting: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    requested: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    null: { bg: 'bg-gray-100', text: 'text-gray-800' },
  };
  const conclusionMap: Record<string, { bg: string; text: string }> = {
    success: { bg: 'bg-green-100', text: 'text-green-800' },
    failure: { bg: 'bg-red-100', text: 'text-red-800' },
    neutral: { bg: 'bg-gray-100', text: 'text-gray-800' },
    cancelled: { bg: 'bg-gray-100', text: 'text-gray-800' },
    skipped: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    timed_out: { bg: 'bg-red-100', text: 'text-red-800' },
    action_required: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    startup_failure: { bg: 'bg-red-100', text: 'text-red-800' },
    stale: { bg: 'bg-gray-100', text: 'text-gray-800' },
    null: { bg: 'bg-gray-100', text: 'text-gray-800' },
  };

  const statusKey = status ?? 'null';
  const conclusionKey = conclusion ?? 'null';
  const statusStyles = statusMap[statusKey] || statusMap['null'];
  const conclusionStyles = conclusionMap[conclusionKey] || conclusionMap['null'];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {repository.full_name}
        </h2>
        <div className="mt-2 sm:mt-0 flex space-x-2">
          <span
            className={`px-2 py-1 text-xs font-medium uppercase rounded ${statusStyles.bg} ${statusStyles.text}`}
          >
            {status ?? 'Unknown'}
          </span>
          {conclusion && (
            <span
              className={`px-2 py-1 text-xs font-medium uppercase rounded ${conclusionStyles.bg} ${conclusionStyles.text}`}
            >
              {conclusion}
            </span>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Branch: </span>
          {head_branch || '—'}
        </div>
        <div>
          <span className="font-medium">Commit: </span>
          {shortSha}
        </div>
        <div>
          <span className="font-medium">Checks: </span>
          {latest_check_runs_count}
        </div>
        <div>
          <span className="font-medium">App: </span>
          {app?.name || '—'}
        </div>
        <div className="sm:col-span-2">
          <span className="font-medium">Created: </span>
          {formattedCreated}
        </div>
        <div className="sm:col-span-2">
          <span className="font-medium">Updated: </span>
          {formattedUpdated}
        </div>
      </div>

      {head_commit?.message && (
        <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-700 line-clamp-2">
          {head_commit.message}
        </blockquote>
      )}
    </div>
  );
}
