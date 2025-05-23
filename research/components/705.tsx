import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Pull Request Simple
     *
     * @title Pull Request Simple
    */
    export interface pull_request_simple {
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        html_url: string & tags.Format<"uri">;
        diff_url: string & tags.Format<"uri">;
        patch_url: string & tags.Format<"uri">;
        issue_url: string & tags.Format<"uri">;
        commits_url: string & tags.Format<"uri">;
        review_comments_url: string & tags.Format<"uri">;
        review_comment_url: string;
        comments_url: string & tags.Format<"uri">;
        statuses_url: string & tags.Format<"uri">;
        number: number & tags.Type<"int32">;
        state: string;
        locked: boolean;
        title: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        body: string | null;
        labels: {
            id: number & tags.Type<"int32">;
            node_id: string;
            url: string;
            name: string;
            description: string;
            color: string;
            "default": boolean;
        }[];
        milestone: AutoViewInputSubTypes.nullable_milestone;
        active_lock_reason?: string | null;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        closed_at: (string & tags.Format<"date-time">) | null;
        merged_at: (string & tags.Format<"date-time">) | null;
        merge_commit_sha: string | null;
        assignee: AutoViewInputSubTypes.nullable_simple_user;
        assignees?: AutoViewInputSubTypes.simple_user[] | null;
        requested_reviewers?: AutoViewInputSubTypes.simple_user[] | null;
        requested_teams?: AutoViewInputSubTypes.team[] | null;
        head: {
            label: string;
            ref: string;
            repo: AutoViewInputSubTypes.repository;
            sha: string;
            user: AutoViewInputSubTypes.nullable_simple_user;
        };
        base: {
            label: string;
            ref: string;
            repo: AutoViewInputSubTypes.repository;
            sha: string;
            user: AutoViewInputSubTypes.nullable_simple_user;
        };
        _links: {
            comments: AutoViewInputSubTypes.link;
            commits: AutoViewInputSubTypes.link;
            statuses: AutoViewInputSubTypes.link;
            html: AutoViewInputSubTypes.link;
            issue: AutoViewInputSubTypes.link;
            review_comments: AutoViewInputSubTypes.link;
            review_comment: AutoViewInputSubTypes.link;
            self: AutoViewInputSubTypes.link;
        };
        author_association: AutoViewInputSubTypes.author_association;
        auto_merge: AutoViewInputSubTypes.auto_merge;
        /**
         * Indicates whether or not the pull request is a draft.
        */
        draft?: boolean;
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
     * A collection of related issues and pull requests.
     *
     * @title Milestone
    */
    export type nullable_milestone = {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        labels_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The number of the milestone.
        */
        number: number & tags.Type<"int32">;
        /**
         * The state of the milestone.
        */
        state: "open" | "closed";
        /**
         * The title of the milestone.
        */
        title: string;
        description: string | null;
        creator: AutoViewInputSubTypes.nullable_simple_user;
        open_issues: number & tags.Type<"int32">;
        closed_issues: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        closed_at: (string & tags.Format<"date-time">) | null;
        due_on: (string & tags.Format<"date-time">) | null;
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
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team
    */
    export interface team {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        slug: string;
        description: string | null;
        privacy?: string;
        notification_setting?: string;
        permission: string;
        permissions?: {
            pull: boolean;
            triage: boolean;
            push: boolean;
            maintain: boolean;
            admin: boolean;
        };
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        members_url: string;
        repositories_url: string & tags.Format<"uri">;
        parent: AutoViewInputSubTypes.nullable_team_simple;
    }
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team Simple
    */
    export type nullable_team_simple = {
        /**
         * Unique identifier of the team
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the team
        */
        url: string;
        members_url: string;
        /**
         * Name of the team
        */
        name: string;
        /**
         * Description of the team
        */
        description: string | null;
        /**
         * Permission that the team will have for its repositories
        */
        permission: string;
        /**
         * The level of privacy this team should have
        */
        privacy?: string;
        /**
         * The notification setting the team has set
        */
        notification_setting?: string;
        html_url: string & tags.Format<"uri">;
        repositories_url: string & tags.Format<"uri">;
        slug: string;
        /**
         * Distinguished Name (DN) that team maps to within LDAP environment
        */
        ldap_dn?: string;
    } | null;
    /**
     * A repository on GitHub.
     *
     * @title Repository
    */
    export interface repository {
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
        owner: AutoViewInputSubTypes.simple_user;
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
        /**
         * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
        */
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
         *
         * @deprecated
        */
        has_downloads: boolean;
        /**
         * Whether discussions are enabled.
        */
        has_discussions?: boolean;
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
         * Whether or not a pull request head branch that is behind its base branch can always be updated even if it is not required to be up to date before merging.
        */
        allow_update_branch?: boolean;
        /**
         * Whether a squash merge commit can use the pull request title as default. **This property is closing down. Please use `squash_merge_commit_title` instead.
         *
         * @deprecated
        */
        use_squash_pr_title_as_default?: boolean;
        /**
         * The default value for a squash merge commit title:
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).
        */
        squash_merge_commit_title?: "PR_TITLE" | "COMMIT_OR_PR_TITLE";
        /**
         * The default value for a squash merge commit message:
         *
         * - `PR_BODY` - default to the pull request's body.
         * - `COMMIT_MESSAGES` - default to the branch's commit messages.
         * - `BLANK` - default to a blank commit message.
        */
        squash_merge_commit_message?: "PR_BODY" | "COMMIT_MESSAGES" | "BLANK";
        /**
         * The default value for a merge commit title.
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).
        */
        merge_commit_title?: "PR_TITLE" | "MERGE_MESSAGE";
        /**
         * The default value for a merge commit message.
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `PR_BODY` - default to the pull request's body.
         * - `BLANK` - default to a blank commit message.
        */
        merge_commit_message?: "PR_BODY" | "PR_TITLE" | "BLANK";
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
        open_issues: number & tags.Type<"int32">;
        watchers: number & tags.Type<"int32">;
        master_branch?: string;
        starred_at?: string;
        /**
         * Whether anonymous git access is enabled for this repository
        */
        anonymous_access_enabled?: boolean;
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
     * Hypermedia Link
     *
     * @title Link
    */
    export interface link {
        href: string;
    }
    /**
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
    /**
     * The status of auto merging a pull request.
     *
     * @title Auto merge
    */
    export type auto_merge = {
        enabled_by: AutoViewInputSubTypes.simple_user;
        /**
         * The merge method to use.
        */
        merge_method: "merge" | "squash" | "rebase";
        /**
         * Title for the merge commit message.
        */
        commit_title: string;
        /**
         * Commit message for the merge commit.
        */
        commit_message: string;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.pull_request_simple[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No pull requests found</span>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {value.map((pr) => {
        const isMerged = pr.merged_at !== null;
        const statusText = isMerged
          ? 'Merged'
          : pr.state.charAt(0).toUpperCase() + pr.state.slice(1);
        const statusIcon = isMerged ? (
          <LucideReact.GitMerge className="text-purple-500" size={16} />
        ) : pr.state === 'open' ? (
          <LucideReact.Clock className="text-amber-500" size={16} />
        ) : (
          <LucideReact.XCircle className="text-red-500" size={16} />
        );

        const author = pr.user;
        const avatarUrl = author?.avatar_url
          ? author.avatar_url
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              author?.login || 'Unknown'
            )}&background=0D8ABC&color=fff`;

        return (
          <li key={pr.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={avatarUrl}
                  alt={author?.login || 'User avatar'}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      author?.login || ''
                    )}&background=0D8ABC&color=fff`;
                  }}
                />
                <span className="text-gray-700 font-medium">
                  {author?.login || 'Unknown'}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                {statusIcon}
                <span className="text-gray-600">{statusText}</span>
                {pr.draft && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-800 text-xs rounded">
                    Draft
                  </span>
                )}
              </div>
            </div>

            <h3 className="mt-2 text-lg font-semibold text-blue-600 truncate">
              #{pr.number} {pr.title}
            </h3>

            <div className="mt-1 text-sm text-gray-500 flex items-center space-x-4">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>{formatDate(pr.created_at)}</span>
              </div>
              {pr.merged_at && (
                <div className="flex items-center gap-1">
                  <LucideReact.GitMerge size={16} />
                  <span>{formatDate(pr.merged_at)}</span>
                </div>
              )}
            </div>

            {pr.labels.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {pr.labels.map((label) => (
                  <span
                    key={label.id}
                    className="text-xs font-medium px-2 py-0.5 rounded"
                    style={{ backgroundColor: `#${label.color}` }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-3 text-sm text-gray-700 flex items-center">
              <span className="font-medium">Branch:</span>
              <span className="ml-1 text-gray-600">{pr.head.ref}</span>
              <LucideReact.ArrowRight className="mx-1" size={12} />
              <span className="text-gray-600">{pr.base.ref}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
