import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiSearchCommits {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            incomplete_results: boolean;
            items: AutoViewInputSubTypes.commit_search_result_item[];
        };
    }
    /**
     * Commit Search Result Item
     *
     * @title Commit Search Result Item
    */
    export type commit_search_result_item = {
        url: string & tags.Format<"uri">;
        sha: string;
        html_url: string & tags.Format<"uri">;
        comments_url: string & tags.Format<"uri">;
        commit: {
            author: {
                name: string;
                email: string;
                date: string & tags.Format<"date-time">;
            };
            committer: AutoViewInputSubTypes.nullable_git_user;
            comment_count: number & tags.Type<"int32">;
            message: string;
            tree: {
                sha: string;
                url: string & tags.Format<"uri">;
            };
            url: string & tags.Format<"uri">;
            verification?: AutoViewInputSubTypes.verification;
        };
        author: AutoViewInputSubTypes.nullable_simple_user;
        committer: AutoViewInputSubTypes.nullable_git_user;
        parents: {
            url?: string;
            html_url?: string;
            sha?: string;
        }[];
        repository: AutoViewInputSubTypes.minimal_repository;
        score: number;
        node_id: string;
        text_matches?: AutoViewInputSubTypes.search_result_text_matches;
    };
    /**
     * Metaproperties for Git author/committer information.
     *
     * @title Git User
    */
    export type nullable_git_user = {
        name?: string;
        email?: string;
        date?: string;
    } | null;
    /**
     * @title Verification
    */
    export type verification = {
        verified: boolean;
        reason: string;
        payload: string | null;
        signature: string | null;
        verified_at: string | null;
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
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
    /**
     * @title Search Result Text Matches
    */
    export type search_result_text_matches = {
        object_url?: string;
        object_type?: string | null;
        property?: string;
        fragment?: string;
        matches?: {
            text?: string;
            indices?: (number & tags.Type<"int32">)[];
        }[];
    }[];
}
export type AutoViewInput = AutoViewInputSubTypes.IApiSearchCommits.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedTotal =
    value.total_count > 999
      ? `${(value.total_count / 1000).toFixed(1)}k`
      : value.total_count.toString();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Commits ({formattedTotal})
        </h2>
        <span
          className={`text-sm font-medium ${
            value.incomplete_results ? "text-yellow-600" : "text-green-600"
          }`}
        >
          {value.incomplete_results ? "Partial Results" : "Complete"}
        </span>
      </div>

      {/* List of commit cards */}
      <div className="mt-4 space-y-4">
        {value.items.map((item) => {
          // Derive author name: prefer GitHub login, fallback to commit author name
          const authorName =
            item.author?.login ??
            item.commit.author.name ??
            "Unknown author";
          // Short SHA
          const shortSha = item.sha.slice(0, 7);
          // First line of commit message
          const summary =
            item.commit.message.split("\n", 1)[0] || "No commit message";

          return (
            <div
              key={item.sha}
              className="relative p-4 bg-gray-50 border border-gray-200 rounded-md"
            >
              {/* Score badge */}
              <span className="absolute top-2 right-2 text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                {item.score.toFixed(1)}
              </span>

              {/* Commit message */}
              <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                {summary}
              </h3>

              {/* Author and date */}
              <div className="mt-1 flex items-center text-sm text-gray-600 space-x-2">
                <span>{authorName}</span>
                <span>•</span>
                <span>{formatDate(item.commit.author.date)}</span>
              </div>

              {/* SHA and repository */}
              <div className="mt-2 flex items-center text-sm text-gray-500 space-x-1">
                <span className="font-mono">{shortSha}</span>
                <span>in</span>
                <span className="font-semibold truncate">
                  {item.repository.full_name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
