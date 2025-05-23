import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposCommitsCheckSuites {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            check_suites: AutoViewInputSubTypes.check_suite[];
        }
    }
    /**
     * A suite of checks performed on the code of a given code change
     *
     * @title CheckSuite
    */
    export interface check_suite {
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
        pull_requests: AutoViewInputSubTypes.pull_request_minimal[] | null;
        app: AutoViewInputSubTypes.nullable_integration;
        repository: AutoViewInputSubTypes.minimal_repository;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        head_commit: AutoViewInputSubTypes.simple_commit;
        latest_check_runs_count: number & tags.Type<"int32">;
        check_runs_url: string;
        rerequestable?: boolean;
        runs_rerequestable?: boolean;
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
        owner: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.enterprise;
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
     * An enterprise on GitHub.
     *
     * @title Enterprise
    */
    export interface enterprise {
        /**
         * A short description of the enterprise.
        */
        description?: string | null;
        html_url: string & tags.Format<"uri">;
        /**
         * The enterprise's website URL.
        */
        website_url?: (string & tags.Format<"uri">) | null;
        /**
         * Unique identifier of the enterprise
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the enterprise.
        */
        name: string;
        /**
         * The slug url identifier for the enterprise.
        */
        slug: string;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        avatar_url: string & tags.Format<"uri">;
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
     * A commit.
     *
     * @title Simple Commit
    */
    export interface simple_commit {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCommitsCheckSuites.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, check_suites } = value;

  // Unique repositories count
  const uniqueReposCount = React.useMemo(
    () => new Set(check_suites.map(cs => cs.repository.full_name)).size,
    [check_suites]
  );

  // Average number of check runs per suite
  const averageRuns =
    total_count > 0
      ? (
          check_suites.reduce((sum, cs) => sum + cs.latest_check_runs_count, 0) /
          total_count
        ).toFixed(1)
      : '0.0';

  // Group status counts
  const statusCounts: Record<string, number> = React.useMemo(() => {
    const map: Record<string, number> = {};
    check_suites.forEach(cs => {
      const key = cs.status || 'unknown';
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  }, [check_suites]);

  // Formatting date-time
  function formatDate(dateStr: string | null): string {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Map status to icon and color
  function getStatusIcon(status: string | null) {
    switch (status) {
      case 'queued':
      case 'waiting':
      case 'requested':
      case 'pending':
        return <LucideReact.Clock size={16} className="text-amber-500" />;
      case 'in_progress':
        return <LucideReact.Loader size={16} className="animate-spin text-blue-500" />;
      case 'completed':
        return <LucideReact.CheckCircle size={16} className="text-green-500" />;
      default:
        return <LucideReact.AlertTriangle size={16} className="text-gray-400" />;
    }
  }

  // Map conclusion to icon and color
  function getConclusionIcon(conclusion: string | null) {
    switch (conclusion) {
      case 'success':
        return <LucideReact.CheckCircle size={16} className="text-green-500" />;
      case 'failure':
      case 'action_required':
      case 'startup_failure':
      case 'stale':
        return <LucideReact.XCircle size={16} className="text-red-500" />;
      case 'neutral':
      case 'skipped':
        return <LucideReact.MinusCircle size={16} className="text-gray-500" />;
      case 'cancelled':
      case 'timed_out':
        return <LucideReact.AlertTriangle size={16} className="text-amber-500" />;
      default:
        return null;
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
          <LucideReact.ListChecks size={24} className="text-gray-500" />
          <div className="text-xl font-semibold text-gray-800">{total_count}</div>
          <div className="text-sm text-gray-600">Total Suites</div>
        </div>
        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
          <LucideReact.GitBranch size={24} className="text-gray-500" />
          <div className="text-xl font-semibold text-gray-800">{uniqueReposCount}</div>
          <div className="text-sm text-gray-600">Repositories</div>
        </div>
        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
          <LucideReact.BarChart2 size={24} className="text-gray-500" />
          <div className="text-xl font-semibold text-gray-800">{averageRuns}</div>
          <div className="text-sm text-gray-600">Avg Check Runs</div>
        </div>
        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
          <LucideReact.Clock size={24} className="text-gray-500" />
          <div className="text-xl font-semibold text-gray-800">
            {statusCounts['completed'] ?? 0}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>

      {/* Status breakdown chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div
            key={status}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full"
          >
            {getStatusIcon(status)}
            <span className="text-sm text-gray-700">
              {status}:{' '}
              <span className="font-medium text-gray-800">{count}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Recent check suites list */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Recent Check Suites
        </h3>
        <ul className="divide-y">
          {check_suites.slice(0, 5).map(cs => (
            <li key={cs.id} className="py-3">
              <div className="flex justify-between items-start">
                <span className="font-medium text-gray-800 truncate">
                  {cs.repository.full_name}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(cs.created_at)}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <div className="flex items-center gap-1">
                  {getStatusIcon(cs.status)}
                  <span className="text-sm text-gray-700">
                    {cs.status || 'unknown'}
                  </span>
                </div>
                {cs.conclusion && (
                  <div className="flex items-center gap-1">
                    {getConclusionIcon(cs.conclusion)}
                    <span className="text-sm text-gray-700">
                      {cs.conclusion}
                    </span>
                  </div>
                )}
                <div className="text-sm text-gray-600">
                  Runs: {cs.latest_check_runs_count}
                </div>
              </div>
              <div className="text-sm text-gray-700 mt-1 truncate">
                {cs.head_commit.message}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
