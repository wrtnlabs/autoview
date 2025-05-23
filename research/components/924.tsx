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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived values and formatting
  const owner = value.owner;
  const initialAvatar = owner?.avatar_url;
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    owner?.login ?? value.name,
  )}&background=0D8ABC&color=fff`;
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  // 2. Visual structure
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <div className="flex items-start">
        <img
          src={initialAvatar ?? fallbackAvatar}
          alt={`${owner?.login ?? 'Owner'} avatar`}
          className="w-10 h-10 rounded-full object-cover bg-gray-200"
          onError={(e) => {
            e.currentTarget.src = fallbackAvatar;
          }}
        />
        <div className="ml-4 flex-1">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            {value.full_name}
            <LucideReact.Link size={16} className="ml-2 text-gray-400" />
          </h2>
          {value.description && (
            <p className="mt-2 text-gray-700 text-sm line-clamp-3">
              {value.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center">
          {value.private ? (
            <LucideReact.Lock size={16} className="text-gray-500" />
          ) : (
            <LucideReact.Unlock size={16} className="text-gray-500" />
          )}
          <span className="ml-1">{value.private ? 'Private' : 'Public'}</span>
        </div>
        {value.archived && (
          <div className="flex items-center">
            <LucideReact.Archive size={16} className="text-gray-500" />
            <span className="ml-1">Archived</span>
          </div>
        )}
        {value.language && (
          <div className="flex items-center">
            <LucideReact.Code size={16} className="text-gray-500" />
            <span className="ml-1">{value.language}</span>
          </div>
        )}
        {value.license && (
          <div className="flex items-center">
            <LucideReact.FileText size={16} className="text-gray-500" />
            <span className="ml-1">{value.license.name}</span>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Star size={16} className="text-yellow-500" />
          <span className="ml-1">{value.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.GitFork size={16} className="text-gray-500" />
          <span className="ml-1">{value.forks_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Eye size={16} className="text-gray-500" />
          <span className="ml-1">{value.watchers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.AlertCircle size={16} className="text-red-500" />
          <span className="ml-1">{value.open_issues_count.toLocaleString()}</span>
        </div>
      </div>

      {(createdAt || updatedAt) && (
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
          {createdAt && (
            <div className="flex items-center">
              <LucideReact.Calendar size={12} className="text-gray-400" />
              <span className="ml-1">Created: {createdAt}</span>
            </div>
          )}
          {updatedAt && (
            <div className="flex items-center">
              <LucideReact.Calendar size={12} className="text-gray-400" />
              <span className="ml-1">Updated: {updatedAt}</span>
            </div>
          )}
        </div>
      )}

      {value.topics && value.topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {value.topics.map((topic) => (
            <span
              key={topic}
              className="flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
            >
              <LucideReact.Tag size={12} className="mr-1 text-gray-500" />
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
