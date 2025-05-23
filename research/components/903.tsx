import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiSearchRepositories {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            incomplete_results: boolean;
            items: AutoViewInputSubTypes.repo_search_result_item[];
        }
    }
    /**
     * Repo Search Result Item
     *
     * @title Repo Search Result Item
    */
    export interface repo_search_result_item {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        full_name: string;
        owner: AutoViewInputSubTypes.nullable_simple_user;
        "private": boolean;
        html_url: string & tags.Format<"uri">;
        description: string | null;
        fork: boolean;
        url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        pushed_at: string & tags.Format<"date-time">;
        homepage: (string & tags.Format<"uri">) | null;
        size: number & tags.Type<"int32">;
        stargazers_count: number & tags.Type<"int32">;
        watchers_count: number & tags.Type<"int32">;
        language: string | null;
        forks_count: number & tags.Type<"int32">;
        open_issues_count: number & tags.Type<"int32">;
        master_branch?: string;
        default_branch: string;
        score: number;
        forks_url: string & tags.Format<"uri">;
        keys_url: string;
        collaborators_url: string;
        teams_url: string & tags.Format<"uri">;
        hooks_url: string & tags.Format<"uri">;
        issue_events_url: string;
        events_url: string & tags.Format<"uri">;
        assignees_url: string;
        branches_url: string;
        tags_url: string & tags.Format<"uri">;
        blobs_url: string;
        git_tags_url: string;
        git_refs_url: string;
        trees_url: string;
        statuses_url: string;
        languages_url: string & tags.Format<"uri">;
        stargazers_url: string & tags.Format<"uri">;
        contributors_url: string & tags.Format<"uri">;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        commits_url: string;
        git_commits_url: string;
        comments_url: string;
        issue_comment_url: string;
        contents_url: string;
        compare_url: string;
        merges_url: string & tags.Format<"uri">;
        archive_url: string;
        downloads_url: string & tags.Format<"uri">;
        issues_url: string;
        pulls_url: string;
        milestones_url: string;
        notifications_url: string;
        labels_url: string;
        releases_url: string;
        deployments_url: string & tags.Format<"uri">;
        git_url: string;
        ssh_url: string;
        clone_url: string;
        svn_url: string & tags.Format<"uri">;
        forks: number & tags.Type<"int32">;
        open_issues: number & tags.Type<"int32">;
        watchers: number & tags.Type<"int32">;
        topics?: string[];
        mirror_url: (string & tags.Format<"uri">) | null;
        has_issues: boolean;
        has_projects: boolean;
        has_pages: boolean;
        has_wiki: boolean;
        has_downloads: boolean;
        has_discussions?: boolean;
        archived: boolean;
        /**
         * Returns whether or not this repository disabled.
        */
        disabled: boolean;
        /**
         * The repository visibility: public, private, or internal.
        */
        visibility?: string;
        license: AutoViewInputSubTypes.nullable_license_simple;
        permissions?: {
            admin: boolean;
            maintain?: boolean;
            push: boolean;
            triage?: boolean;
            pull: boolean;
        };
        text_matches?: AutoViewInputSubTypes.search_result_text_matches;
        temp_clone_token?: string;
        allow_merge_commit?: boolean;
        allow_squash_merge?: boolean;
        allow_rebase_merge?: boolean;
        allow_auto_merge?: boolean;
        delete_branch_on_merge?: boolean;
        allow_forking?: boolean;
        is_template?: boolean;
        web_commit_signoff_required?: boolean;
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
     * License Simple
     *
     * @title License Simple
    */
    export type nullable_license_simple = {
        key: string;
        name: string;
        url: (string & tags.Format<"uri">) | null;
        spdx_id: string | null;
        node_id: string;
        html_url?: string & tags.Format<"uri">;
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
export type AutoViewInput = AutoViewInputSubTypes.IApiSearchRepositories.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedTotal = value.total_count.toLocaleString();
  const items = value.items ?? [];
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  const placeholderAvatar = (username: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center text-gray-700 space-x-1">
          <LucideReact.List size={20} />
          <span className="text-lg font-semibold">{formattedTotal} repositories</span>
        </div>
        {value.incomplete_results && (
          <div className="flex items-center text-amber-500 space-x-1">
            <LucideReact.AlertTriangle size={20} />
            <span className="text-sm">Incomplete results</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
            <div className="flex items-center mb-2 space-x-3">
              <img
                src={item.owner?.avatar_url ?? ''}
                alt={`${item.owner?.login ?? 'User'} avatar`}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = placeholderAvatar(item.owner?.login ?? '');
                }}
              />
              <span className="font-medium text-gray-800 truncate">{item.owner?.login}</span>
            </div>

            <h3 className="text-indigo-600 font-semibold text-lg truncate">{item.full_name}</h3>
            <p className="mt-1 text-gray-600 text-sm line-clamp-2">
              {item.description ?? 'No description'}
            </p>

            <div className="mt-auto pt-4 flex flex-wrap gap-3 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <LucideReact.Star size={16} className="text-yellow-400" />
                <span>{item.stargazers_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.GitBranch size={16} className="text-gray-400" />
                <span>{item.forks_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.GitPullRequest size={16} className="text-gray-400" />
                <span>{item.open_issues_count}</span>
              </div>
              {item.language && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Code size={16} className="text-gray-400" />
                  <span>{item.language}</span>
                </div>
              )}
            </div>

            <div className="mt-2 text-xs text-gray-400 flex items-center">
              <LucideReact.Calendar size={14} />
              <span className="ml-1">Updated {formatDate(item.updated_at)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
