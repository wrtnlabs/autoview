import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * An invocation of a workflow
     *
     * @title Workflow Run
    */
    export type workflow_run = {
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
        referenced_workflows?: any[] | null;
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
        pull_requests: any[] | null;
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
    };
    export type referenced_workflow = any;
    export type pull_request_minimal = any;
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
        timestamp: string & tags.Format<"date-time">;
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
    } | null;
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
}
export type AutoViewInput = AutoViewInputSubTypes.workflow_run;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayTitle = value.name && value.name.trim() !== "" ? value.name : value.display_title;

  const formattedDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  const createdAt = formattedDate(value.created_at);
  const updatedAt = formattedDate(value.updated_at);
  const startedAt = formattedDate(value.run_started_at ?? null);

  const repositoryName = value.repository.full_name;
  const branch = value.head_branch ?? "—";
  const sha = value.head_sha.slice(0, 7);

  const getStatusColor = (status?: string | null): string => {
    if (!status) return "bg-gray-200 text-gray-800";
    if (status.includes("in_progress")) return "bg-blue-100 text-blue-800";
    if (status.includes("queued") || status.includes("requested")) return "bg-yellow-100 text-yellow-800";
    if (status.includes("completed")) return "bg-green-100 text-green-800";
    return "bg-gray-200 text-gray-800";
  };

  const getConclusionColor = (conclusion?: string | null): string => {
    if (!conclusion) return "bg-gray-200 text-gray-800";
    if (conclusion === "success") return "bg-green-100 text-green-800";
    if (conclusion === "failure" || conclusion === "timed_out" || conclusion === "action_required")
      return "bg-red-100 text-red-800";
    if (conclusion === "cancelled" || conclusion === "neutral") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-200 text-gray-800";
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{displayTitle}</h2>
        <div className="mt-1 text-sm text-gray-600">
          Run #{value.run_number}
          {value.run_attempt && value.run_attempt > 1 ? ` (Attempt ${value.run_attempt})` : ""}
          {" • "}
          {value.event}
        </div>
      </header>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(value.status)}`}>
          {value.status ?? "Unknown"}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded ${getConclusionColor(value.conclusion)}`}>
          {value.conclusion ?? "N/A"}
        </span>
      </div>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Repository:</span>
          <span className="truncate">{repositoryName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Branch:</span>
          <span className="truncate">{branch}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Commit:</span>
          <span className="font-mono">{sha}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Started:</span>
          <span>{startedAt}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Created:</span>
          <span>{createdAt}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Updated:</span>
          <span>{updatedAt}</span>
        </div>
      </div>

      {(value.actor || value.triggering_actor) && (
        <div className="mt-4 border-t pt-4 space-y-3">
          {value.actor && (
            <div className="flex items-center space-x-2">
              <img
                src={value.actor.avatar_url}
                alt={`${value.actor.login} avatar`}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium text-gray-800 truncate">{value.actor.login}</span>
              <span className="text-xs text-gray-500">Actor</span>
            </div>
          )}
          {value.triggering_actor && (
            <div className="flex items-center space-x-2">
              <img
                src={value.triggering_actor.avatar_url}
                alt={`${value.triggering_actor.login} avatar`}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium text-gray-800 truncate">{value.triggering_actor.login}</span>
              <span className="text-xs text-gray-500">Trigger</span>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
