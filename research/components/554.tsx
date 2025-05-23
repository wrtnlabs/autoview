import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A team's access to a repository.
     *
     * @title Team Repository
    */
    export interface team_repository {
        /**
         * Unique identifier of the repository
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the repository.
        */
        name: string;
        full_name: string;
        license: AutoViewInputSubTypes.nullable_license_simple;
        forks: number & tags.Type<"int32">;
        permissions?: {
            admin: boolean;
            pull: boolean;
            triage?: boolean;
            push: boolean;
            maintain?: boolean;
        };
        role_name?: string;
        owner: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * Whether the repository is private or public.
        */
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
        git_url: string;
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
        ssh_url: string;
        stargazers_url: string & tags.Format<"uri">;
        statuses_url: string;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        tags_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        trees_url: string;
        clone_url: string;
        mirror_url: (string & tags.Format<"uri">) | null;
        hooks_url: string & tags.Format<"uri">;
        svn_url: string & tags.Format<"uri">;
        homepage: (string & tags.Format<"uri">) | null;
        language: string | null;
        forks_count: number & tags.Type<"int32">;
        stargazers_count: number & tags.Type<"int32">;
        watchers_count: number & tags.Type<"int32">;
        size: number & tags.Type<"int32">;
        /**
         * The default branch of the repository.
        */
        default_branch: string;
        open_issues_count: number & tags.Type<"int32">;
        /**
         * Whether this repository acts as a template that can be used to generate new repositories.
        */
        is_template?: boolean;
        topics?: string[];
        /**
         * Whether issues are enabled.
        */
        has_issues: boolean;
        /**
         * Whether projects are enabled.
        */
        has_projects: boolean;
        /**
         * Whether the wiki is enabled.
        */
        has_wiki: boolean;
        has_pages: boolean;
        /**
         * Whether downloads are enabled.
        */
        has_downloads: boolean;
        /**
         * Whether the repository is archived.
        */
        archived: boolean;
        /**
         * Returns whether or not this repository disabled.
        */
        disabled: boolean;
        /**
         * The repository visibility: public, private, or internal.
        */
        visibility?: string & tags.Default<"public">;
        pushed_at: (string & tags.Format<"date-time">) | null;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        /**
         * Whether to allow rebase merges for pull requests.
        */
        allow_rebase_merge?: boolean;
        temp_clone_token?: string;
        /**
         * Whether to allow squash merges for pull requests.
        */
        allow_squash_merge?: boolean;
        /**
         * Whether to allow Auto-merge to be used on pull requests.
        */
        allow_auto_merge?: boolean;
        /**
         * Whether to delete head branches when pull requests are merged
        */
        delete_branch_on_merge?: boolean;
        /**
         * Whether to allow merge commits for pull requests.
        */
        allow_merge_commit?: boolean;
        /**
         * Whether to allow forking this repo
        */
        allow_forking?: boolean;
        /**
         * Whether to require contributors to sign off on web-based commits
        */
        web_commit_signoff_required?: boolean;
        subscribers_count?: number & tags.Type<"int32">;
        network_count?: number & tags.Type<"int32">;
        open_issues: number & tags.Type<"int32">;
        watchers: number & tags.Type<"int32">;
        master_branch?: string;
    }
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
}
export type AutoViewInput = AutoViewInputSubTypes.team_repository;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const licenseName = value.license?.name ?? 'No license';
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : '';
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : '';
  const isPrivate = value.private;
  const status = value.archived
    ? 'Archived'
    : value.disabled
    ? 'Disabled'
    : isPrivate
    ? 'Private'
    : 'Public';
  const statusIcon =
    value.archived ? (
      <LucideReact.Archive className="text-gray-500 inline-block" size={16} />
    ) : value.disabled ? (
      <LucideReact.AlertTriangle className="text-red-500 inline-block" size={16} />
    ) : isPrivate ? (
      <LucideReact.Lock className="text-yellow-500 inline-block" size={16} />
    ) : (
      <LucideReact.Globe className="text-green-500 inline-block" size={16} />
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow max-w-md mx-auto">
      {/* Header: Name & Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 truncate">
          <LucideReact.Code className="text-gray-700" size={20} />
          <h2 className="text-lg font-semibold text-gray-800 truncate">{value.full_name}</h2>
        </div>
        <div className="flex items-center space-x-1 text-sm font-medium text-gray-600">
          {statusIcon}
          <span>{status}</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-2 text-gray-600 text-sm line-clamp-2">
        {value.description ?? 'No description available.'}
      </p>

      {/* Stats */}
      <div className="mt-4 flex flex-wrap items-center text-sm text-gray-600 space-x-4">
        <div className="flex items-center space-x-1">
          <LucideReact.Star className="text-yellow-500" size={16} />
          <span>{value.stargazers_count}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.GitBranch className="text-gray-500" size={16} />
          <span>{value.forks_count}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Eye className="text-gray-500" size={16} />
          <span>{value.watchers_count}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-gray-500">·</span>
          <span>{value.language ?? '—'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.FileSignature className="text-gray-500" size={16} />
          <span>{licenseName}</span>
        </div>
      </div>

      {/* Footer: Owner & Dates */}
      <div className="mt-4 border-t pt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {value.owner?.avatar_url ? (
            <img
              src={value.owner.avatar_url}
              alt={value.owner.login}
              className="h-8 w-8 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  value.owner?.login ?? ''
                )}&background=0D8ABC&color=fff`;
              }}
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <LucideReact.User size={16} />
            </div>
          )}
          <span className="text-gray-700 text-sm truncate">{value.owner?.login ?? 'Unknown'}</span>
        </div>
        <div className="text-xs text-gray-500 flex flex-col items-end">
          {createdAt && (
            <span className="flex items-center space-x-1">
              <LucideReact.Calendar size={12} />
              <span>Created: {createdAt}</span>
            </span>
          )}
          {updatedAt && (
            <span className="flex items-center space-x-1 mt-1">
              <LucideReact.RefreshCw size={12} />
              <span>Updated: {updatedAt}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
