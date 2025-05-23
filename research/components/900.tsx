import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiSearchCommits {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            incomplete_results: boolean;
            items: AutoViewInputSubTypes.commit_search_result_item[];
        }
    }
    /**
     * Commit Search Result Item
     *
     * @title Commit Search Result Item
    */
    export interface commit_search_result_item {
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
    }
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
    export interface verification {
        verified: boolean;
        reason: string;
        payload: string | null;
        signature: string | null;
        verified_at: string | null;
    }
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
  const { total_count, incomplete_results, items } = value;
  const displayItems = items.slice(0, 5);
  const remainingCount = total_count - displayItems.length;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-700">
          <LucideReact.GitCommit className="mr-2" size={20} />
          <span className="font-semibold">
            {total_count.toLocaleString()} Commits
          </span>
        </div>
        {incomplete_results ? (
          <div className="flex items-center text-amber-500">
            <LucideReact.AlertTriangle size={20} className="mr-1" />
            <span>Incomplete Results</span>
          </div>
        ) : (
          <div className="flex items-center text-green-500">
            <LucideReact.CheckCircle size={20} className="mr-1" />
            <span>Complete Results</span>
          </div>
        )}
      </div>

      {/* Commit List */}
      {displayItems.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={32} />
          <span className="mt-2">No commits to display</span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {displayItems.map((item) => {
            const authorName =
              item.author?.login ?? item.commit.author.name;
            const avatarSrc = item.author?.avatar_url;
            const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              authorName
            )}&background=random`;

            return (
              <li key={item.sha} className="py-3 flex">
                <div className="flex-shrink-0">
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt={authorName}
                      className="w-10 h-10 rounded-full object-cover bg-gray-100"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          placeholderAvatar;
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <LucideReact.User size={20} />
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate">
                      {item.sha.slice(0, 7)}
                    </span>
                    <div className="flex items-center text-gray-500">
                      <LucideReact.Calendar className="mr-1" size={16} />
                      <span>{formatDate(item.commit.author.date)}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 truncate line-clamp-1">
                    {item.commit.message}
                  </p>
                  <div className="mt-1 flex items-center text-gray-500 text-xs space-x-4">
                    <div className="flex items-center">
                      <LucideReact.User className="mr-1" size={14} />
                      <span>{authorName}</span>
                    </div>
                    <div className="flex items-center">
                      <LucideReact.Archive className="mr-1" size={14} />
                      <span className="truncate">
                        {item.repository.full_name}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Footer */}
      {remainingCount > 0 && (
        <div className="mt-3 text-center text-gray-500 text-sm">
          Showing first {displayItems.length} of {total_count.toLocaleString()}{" "}
          commits
        </div>
      )}
    </div>
  );
}
