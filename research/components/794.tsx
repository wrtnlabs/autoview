import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Issues are a great way to keep track of tasks, enhancements, and bugs for your projects.
   *
   * @title Issue
   */
  export type issue = {
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * URL for the issue
     */
    url: string;
    repository_url: string & tags.Format<"uri">;
    labels_url: string;
    comments_url: string & tags.Format<"uri">;
    events_url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    /**
     * Number uniquely identifying the issue within its repository
     */
    number: number & tags.Type<"int32">;
    /**
     * State of the issue; either 'open' or 'closed'
     */
    state: string;
    /**
     * The reason for the current state
     */
    state_reason?: "completed" | "reopened" | "not_planned" | null;
    /**
     * Title of the issue
     */
    title: string;
    /**
     * Contents of the issue
     */
    body?: string | null;
    user: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * Labels to associate with this issue; pass one or more label names to replace the set of labels on this issue; send an empty array to clear all labels from the issue; note that the labels are silently dropped for users without push access to the repository
     */
    labels: (
      | string
      | {
          id?: number & tags.Type<"int32">;
          node_id?: string;
          url?: string & tags.Format<"uri">;
          name?: string;
          description?: string | null;
          color?: string | null;
          default?: boolean;
        }
    )[];
    assignee: AutoViewInputSubTypes.nullable_simple_user;
    assignees?: AutoViewInputSubTypes.simple_user[] | null;
    milestone: AutoViewInputSubTypes.nullable_milestone;
    locked: boolean;
    active_lock_reason?: string | null;
    comments: number & tags.Type<"int32">;
    pull_request?: {
      merged_at?: (string & tags.Format<"date-time">) | null;
      diff_url: (string & tags.Format<"uri">) | null;
      html_url: (string & tags.Format<"uri">) | null;
      patch_url: (string & tags.Format<"uri">) | null;
      url: (string & tags.Format<"uri">) | null;
    };
    closed_at: (string & tags.Format<"date-time">) | null;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    draft?: boolean;
    closed_by?: AutoViewInputSubTypes.nullable_simple_user;
    body_html?: string;
    body_text?: string;
    timeline_url?: string & tags.Format<"uri">;
    type?: AutoViewInputSubTypes.issue_type;
    repository?: AutoViewInputSubTypes.repository;
    performed_via_github_app?: AutoViewInputSubTypes.nullable_integration;
    author_association: AutoViewInputSubTypes.author_association;
    reactions?: AutoViewInputSubTypes.reaction_rollup;
    sub_issues_summary?: AutoViewInputSubTypes.sub_issues_summary;
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
   * The type of issue.
   *
   * @title Issue Type
   */
  export type issue_type = {
    /**
     * The unique identifier of the issue type.
     */
    id: number & tags.Type<"int32">;
    /**
     * The node identifier of the issue type.
     */
    node_id: string;
    /**
     * The name of the issue type.
     */
    name: string;
    /**
     * The description of the issue type.
     */
    description: string | null;
    /**
     * The color of the issue type.
     */
    color?:
      | "gray"
      | "blue"
      | "green"
      | "yellow"
      | "orange"
      | "red"
      | "pink"
      | "purple"
      | null;
    /**
     * The time the issue type created.
     */
    created_at?: string;
    /**
     * The time the issue type last updated.
     */
    updated_at?: string;
    /**
     * The enabled state of the issue type.
     */
    is_enabled?: boolean;
  } | null;
  /**
   * A repository on GitHub.
   *
   * @title Repository
   */
  export type repository = {
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
    private: boolean;
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
  };
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
   * An enterprise on GitHub.
   *
   * @title Enterprise
   */
  export type enterprise = {
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
  };
  /**
   * How the author is associated with the repository.
   *
   * @title author_association
   */
  export type author_association =
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";
  /**
   * @title Reaction Rollup
   */
  export type reaction_rollup = {
    url: string & tags.Format<"uri">;
    total_count: number & tags.Type<"int32">;
    "+1": number & tags.Type<"int32">;
    "-1": number & tags.Type<"int32">;
    laugh: number & tags.Type<"int32">;
    confused: number & tags.Type<"int32">;
    heart: number & tags.Type<"int32">;
    hooray: number & tags.Type<"int32">;
    eyes: number & tags.Type<"int32">;
    rocket: number & tags.Type<"int32">;
  };
  /**
   * @title Sub-issues Summary
   */
  export type sub_issues_summary = {
    total: number & tags.Type<"int32">;
    completed: number & tags.Type<"int32">;
    percent_completed: number & tags.Type<"int32">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.issue;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isOpen = value.state === "open";
  const statusLabel = isOpen ? "Open" : "Closed";
  const StatusIcon = isOpen ? LucideReact.Circle : LucideReact.CheckCircle;
  const statusColor = isOpen ? "text-green-500" : "text-red-500";

  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const bodyRaw = value.body_text ?? value.body ?? "";
  const bodyPreview =
    bodyRaw.length > 200 ? bodyRaw.slice(0, 200) + "…" : bodyRaw;

  const labelElements = (value.labels ?? []).map((lbl, i) => {
    if (typeof lbl === "string") {
      return (
        <span
          key={i}
          className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded"
        >
          {lbl}
        </span>
      );
    } else {
      const name = lbl.name ?? "Label";
      const bg = lbl.color ? `#${lbl.color}` : "#E5E7EB";
      const color = lbl.color ? "#fff" : "#374151";
      return (
        <span
          key={i}
          className="inline-block text-xs px-2 py-0.5 rounded"
          style={{ backgroundColor: bg, color }}
        >
          {name}
        </span>
      );
    }
  });

  const assignees = Array.isArray(value.assignees) ? value.assignees : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header: Title, Number, State */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <StatusIcon size={20} className={statusColor} />
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.title}
          </h2>
          <span className="text-sm text-gray-500">#{value.number}</span>
        </div>
        {value.milestone && (
          <span className="mt-2 sm:mt-0 inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
            {value.milestone.title}
          </span>
        )}
      </div>

      {/* Meta: Date, Author, Comments */}
      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>{createdDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.User size={16} />
          <span>{value.user?.login}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.MessageCircle size={16} />
          <span>{value.comments}</span>
        </div>
      </div>

      {/* Labels */}
      {labelElements.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">{labelElements}</div>
      )}

      {/* Body Preview */}
      {bodyPreview && (
        <p className="mt-3 text-gray-700 text-sm line-clamp-3">{bodyPreview}</p>
      )}

      {/* Assignees */}
      {assignees.length > 0 && (
        <div className="mt-4 flex items-center">
          <span className="text-sm text-gray-500 mr-2">Assignees:</span>
          <div className="flex -space-x-2">
            {assignees.map((u) => (
              <img
                key={u.id}
                src={u.avatar_url}
                alt={u.login}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    u.login,
                  )}&background=0D8ABC&color=fff`;
                }}
                className="w-6 h-6 rounded-full border-2 border-white"
                title={u.login}
              />
            ))}
          </div>
        </div>
      )}

      {/* Reactions Summary */}
      {value.reactions && (
        <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center gap-1">
            <LucideReact.ThumbsUp size={16} />
            <span>{value.reactions["+1"]}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Heart size={16} />
            <span>{value.reactions.heart}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Laugh size={16} />
            <span>{value.reactions.laugh}</span>
          </div>
        </div>
      )}
    </div>
  );
}
