import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Timeline Event
   *
   * @title Timeline Event
   */
  export type timeline_issue_events =
    | AutoViewInputSubTypes.labeled_issue_event
    | AutoViewInputSubTypes.unlabeled_issue_event
    | AutoViewInputSubTypes.milestoned_issue_event
    | AutoViewInputSubTypes.demilestoned_issue_event
    | AutoViewInputSubTypes.renamed_issue_event
    | AutoViewInputSubTypes.review_requested_issue_event
    | AutoViewInputSubTypes.review_request_removed_issue_event
    | AutoViewInputSubTypes.review_dismissed_issue_event
    | AutoViewInputSubTypes.locked_issue_event
    | AutoViewInputSubTypes.added_to_project_issue_event
    | AutoViewInputSubTypes.moved_column_in_project_issue_event
    | AutoViewInputSubTypes.removed_from_project_issue_event
    | AutoViewInputSubTypes.converted_note_to_issue_issue_event
    | AutoViewInputSubTypes.timeline_comment_event
    | AutoViewInputSubTypes.timeline_cross_referenced_event
    | AutoViewInputSubTypes.timeline_committed_event
    | AutoViewInputSubTypes.timeline_reviewed_event
    | AutoViewInputSubTypes.timeline_line_commented_event
    | AutoViewInputSubTypes.timeline_commit_commented_event
    | AutoViewInputSubTypes.timeline_assigned_issue_event
    | AutoViewInputSubTypes.timeline_unassigned_issue_event
    | AutoViewInputSubTypes.state_change_issue_event;
  /**
   * Labeled Issue Event
   *
   * @title Labeled Issue Event
   */
  export type labeled_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    label: {
      name: string;
      color: string;
    };
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
   * Unlabeled Issue Event
   *
   * @title Unlabeled Issue Event
   */
  export type unlabeled_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    label: {
      name: string;
      color: string;
    };
  };
  /**
   * Milestoned Issue Event
   *
   * @title Milestoned Issue Event
   */
  export type milestoned_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    milestone: {
      title: string;
    };
  };
  /**
   * Demilestoned Issue Event
   *
   * @title Demilestoned Issue Event
   */
  export type demilestoned_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    milestone: {
      title: string;
    };
  };
  /**
   * Renamed Issue Event
   *
   * @title Renamed Issue Event
   */
  export type renamed_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    rename: {
      from: string;
      to: string;
    };
  };
  /**
   * Review Requested Issue Event
   *
   * @title Review Requested Issue Event
   */
  export type review_requested_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    review_requester: AutoViewInputSubTypes.simple_user;
    requested_team?: AutoViewInputSubTypes.team;
    requested_reviewer?: AutoViewInputSubTypes.simple_user;
  };
  /**
   * Groups of organization members that gives permissions on specified repositories.
   *
   * @title Team
   */
  export type team = {
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
  };
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
   * Review Request Removed Issue Event
   *
   * @title Review Request Removed Issue Event
   */
  export type review_request_removed_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    review_requester: AutoViewInputSubTypes.simple_user;
    requested_team?: AutoViewInputSubTypes.team;
    requested_reviewer?: AutoViewInputSubTypes.simple_user;
  };
  /**
   * Review Dismissed Issue Event
   *
   * @title Review Dismissed Issue Event
   */
  export type review_dismissed_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    dismissed_review: {
      state: string;
      review_id: number & tags.Type<"int32">;
      dismissal_message: string | null;
      dismissal_commit_id?: string;
    };
  };
  /**
   * Locked Issue Event
   *
   * @title Locked Issue Event
   */
  export type locked_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    lock_reason: string | null;
  };
  /**
   * Added to Project Issue Event
   *
   * @title Added to Project Issue Event
   */
  export type added_to_project_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    project_card?: {
      id: number & tags.Type<"int32">;
      url: string & tags.Format<"uri">;
      project_id: number & tags.Type<"int32">;
      project_url: string & tags.Format<"uri">;
      column_name: string;
      previous_column_name?: string;
    };
  };
  /**
   * Moved Column in Project Issue Event
   *
   * @title Moved Column in Project Issue Event
   */
  export type moved_column_in_project_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    project_card?: {
      id: number & tags.Type<"int32">;
      url: string & tags.Format<"uri">;
      project_id: number & tags.Type<"int32">;
      project_url: string & tags.Format<"uri">;
      column_name: string;
      previous_column_name?: string;
    };
  };
  /**
   * Removed from Project Issue Event
   *
   * @title Removed from Project Issue Event
   */
  export type removed_from_project_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    project_card?: {
      id: number & tags.Type<"int32">;
      url: string & tags.Format<"uri">;
      project_id: number & tags.Type<"int32">;
      project_url: string & tags.Format<"uri">;
      column_name: string;
      previous_column_name?: string;
    };
  };
  /**
   * Converted Note to Issue Issue Event
   *
   * @title Converted Note to Issue Issue Event
   */
  export type converted_note_to_issue_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.integration;
    project_card?: {
      id: number & tags.Type<"int32">;
      url: string & tags.Format<"uri">;
      project_id: number & tags.Type<"int32">;
      project_url: string & tags.Format<"uri">;
      column_name: string;
      previous_column_name?: string;
    };
  };
  /**
   * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
   *
   * @title GitHub app
   */
  export type integration = {
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
   * Timeline Comment Event
   *
   * @title Timeline Comment Event
   */
  export type timeline_comment_event = {
    event: string;
    actor: AutoViewInputSubTypes.simple_user;
    /**
     * Unique identifier of the issue comment
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * URL for the issue comment
     */
    url: string;
    /**
     * Contents of the issue comment
     */
    body?: string;
    body_text?: string;
    body_html?: string;
    html_url: string & tags.Format<"uri">;
    user: AutoViewInputSubTypes.simple_user;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    issue_url: string & tags.Format<"uri">;
    author_association: AutoViewInputSubTypes.author_association;
    performed_via_github_app?: AutoViewInputSubTypes.nullable_integration;
    reactions?: AutoViewInputSubTypes.reaction_rollup;
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
   * Timeline Cross Referenced Event
   *
   * @title Timeline Cross Referenced Event
   */
  export type timeline_cross_referenced_event = {
    event: string;
    actor?: AutoViewInputSubTypes.simple_user;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    source: {
      type?: string;
      issue?: AutoViewInputSubTypes.issue;
    };
  };
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
   * @title Sub-issues Summary
   */
  export type sub_issues_summary = {
    total: number & tags.Type<"int32">;
    completed: number & tags.Type<"int32">;
    percent_completed: number & tags.Type<"int32">;
  };
  /**
   * Timeline Committed Event
   *
   * @title Timeline Committed Event
   */
  export type timeline_committed_event = {
    event?: string;
    /**
     * SHA for the commit
     */
    sha: string;
    node_id: string;
    url: string & tags.Format<"uri">;
    /**
     * Identifying information for the git-user
     */
    author: {
      /**
       * Timestamp of the commit
       */
      date: string;
      /**
       * Git email address of the user
       */
      email: string;
      /**
       * Name of the git user
       */
      name: string;
    };
    /**
     * Identifying information for the git-user
     */
    committer: {
      /**
       * Timestamp of the commit
       */
      date: string;
      /**
       * Git email address of the user
       */
      email: string;
      /**
       * Name of the git user
       */
      name: string;
    };
    /**
     * Message describing the purpose of the commit
     */
    message: string;
    tree: {
      /**
       * SHA for the commit
       */
      sha: string;
      url: string & tags.Format<"uri">;
    };
    parents: {
      /**
       * SHA for the commit
       */
      sha: string;
      url: string & tags.Format<"uri">;
      html_url: string & tags.Format<"uri">;
    }[];
    verification: {
      verified: boolean;
      reason: string;
      signature: string | null;
      payload: string | null;
      verified_at: string | null;
    };
    html_url: string & tags.Format<"uri">;
  };
  /**
   * Timeline Reviewed Event
   *
   * @title Timeline Reviewed Event
   */
  export type timeline_reviewed_event = {
    event: string;
    /**
     * Unique identifier of the review
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    user: AutoViewInputSubTypes.simple_user;
    /**
     * The text of the review.
     */
    body: string | null;
    state: string;
    html_url: string & tags.Format<"uri">;
    pull_request_url: string & tags.Format<"uri">;
    _links: {
      html: {
        href: string;
      };
      pull_request: {
        href: string;
      };
    };
    submitted_at?: string & tags.Format<"date-time">;
    /**
     * A commit SHA for the review.
     */
    commit_id: string;
    body_html?: string;
    body_text?: string;
    author_association: AutoViewInputSubTypes.author_association;
  };
  /**
   * Timeline Line Commented Event
   *
   * @title Timeline Line Commented Event
   */
  export type timeline_line_commented_event = {
    event?: string;
    node_id?: string;
    comments?: AutoViewInputSubTypes.pull_request_review_comment[];
  };
  /**
   * Pull Request Review Comments are comments on a portion of the Pull Request's diff.
   *
   * @title Pull Request Review Comment
   */
  export type pull_request_review_comment = {
    /**
     * URL for the pull request review comment
     */
    url: string;
    /**
     * The ID of the pull request review to which the comment belongs.
     */
    pull_request_review_id: (number & tags.Type<"int32">) | null;
    /**
     * The ID of the pull request review comment.
     */
    id: number & tags.Type<"int32">;
    /**
     * The node ID of the pull request review comment.
     */
    node_id: string;
    /**
     * The diff of the line that the comment refers to.
     */
    diff_hunk: string;
    /**
     * The relative path of the file to which the comment applies.
     */
    path: string;
    /**
     * The line index in the diff to which the comment applies. This field is closing down; use `line` instead.
     */
    position?: number & tags.Type<"int32">;
    /**
     * The index of the original line in the diff to which the comment applies. This field is closing down; use `original_line` instead.
     */
    original_position?: number & tags.Type<"int32">;
    /**
     * The SHA of the commit to which the comment applies.
     */
    commit_id: string;
    /**
     * The SHA of the original commit to which the comment applies.
     */
    original_commit_id: string;
    /**
     * The comment ID to reply to.
     */
    in_reply_to_id?: number & tags.Type<"int32">;
    user: AutoViewInputSubTypes.simple_user;
    /**
     * The text of the comment.
     */
    body: string;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    /**
     * HTML URL for the pull request review comment.
     */
    html_url: string;
    /**
     * URL for the pull request that the review comment belongs to.
     */
    pull_request_url: string;
    author_association: AutoViewInputSubTypes.author_association;
    _links: {
      self: {
        href: string & tags.Format<"uri">;
      };
      html: {
        href: string & tags.Format<"uri">;
      };
      pull_request: {
        href: string & tags.Format<"uri">;
      };
    };
    /**
     * The first line of the range for a multi-line comment.
     */
    start_line?: (number & tags.Type<"int32">) | null;
    /**
     * The first line of the range for a multi-line comment.
     */
    original_start_line?: (number & tags.Type<"int32">) | null;
    /**
     * The side of the first line of the range for a multi-line comment.
     */
    start_side?: "LEFT" | "RIGHT" | null;
    /**
     * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
     */
    line?: number & tags.Type<"int32">;
    /**
     * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
     */
    original_line?: number & tags.Type<"int32">;
    /**
     * The side of the diff to which the comment applies. The side of the last line of the range for a multi-line comment
     */
    side?: "LEFT" | "RIGHT";
    /**
     * The level at which the comment is targeted, can be a diff line or a file.
     */
    subject_type?: "line" | "file";
    reactions?: AutoViewInputSubTypes.reaction_rollup;
    body_html?: string;
    body_text?: string;
  };
  /**
   * Timeline Commit Commented Event
   *
   * @title Timeline Commit Commented Event
   */
  export type timeline_commit_commented_event = {
    event?: string;
    node_id?: string;
    commit_id?: string;
    comments?: AutoViewInputSubTypes.commit_comment[];
  };
  /**
   * Commit Comment
   *
   * @title Commit Comment
   */
  export type commit_comment = {
    html_url: string & tags.Format<"uri">;
    url: string & tags.Format<"uri">;
    id: number & tags.Type<"int32">;
    node_id: string;
    body: string;
    path: string | null;
    position: (number & tags.Type<"int32">) | null;
    line: (number & tags.Type<"int32">) | null;
    commit_id: string;
    user: AutoViewInputSubTypes.nullable_simple_user;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    author_association: AutoViewInputSubTypes.author_association;
    reactions?: AutoViewInputSubTypes.reaction_rollup;
  };
  /**
   * Timeline Assigned Issue Event
   *
   * @title Timeline Assigned Issue Event
   */
  export type timeline_assigned_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    assignee: AutoViewInputSubTypes.simple_user;
  };
  /**
   * Timeline Unassigned Issue Event
   *
   * @title Timeline Unassigned Issue Event
   */
  export type timeline_unassigned_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    assignee: AutoViewInputSubTypes.simple_user;
  };
  /**
   * State Change Issue Event
   *
   * @title State Change Issue Event
   */
  export type state_change_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.nullable_integration;
    state_reason?: string | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.timeline_issue_events[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Utility functions for formatting dates and deriving event metadata.
  const formatDate = (dateStr?: string): string =>
    dateStr ? new Date(dateStr).toLocaleString() : "";

  const getEventDate = (e: any): string | undefined =>
    e.created_at || e.submitted_at || e.author?.date;

  const getIcon = (e: any): JSX.Element => {
    if ("label" in e) {
      return (
        <LucideReact.Tag
          size={16}
          className="text-blue-500"
          aria-hidden="true"
        />
      );
    }
    if ("milestone" in e) {
      return (
        <LucideReact.Calendar
          size={16}
          className="text-indigo-500"
          aria-hidden="true"
        />
      );
    }
    if ("rename" in e) {
      return (
        <LucideReact.Edit2
          size={16}
          className="text-purple-500"
          aria-hidden="true"
        />
      );
    }
    if ("review_requester" in e) {
      return e.event === "review_requested" ? (
        <LucideReact.UserCheck
          size={16}
          className="text-green-500"
          aria-hidden="true"
        />
      ) : (
        <LucideReact.UserX
          size={16}
          className="text-red-500"
          aria-hidden="true"
        />
      );
    }
    if ("dismissed_review" in e) {
      return (
        <LucideReact.XCircle
          size={16}
          className="text-red-500"
          aria-hidden="true"
        />
      );
    }
    if ("lock_reason" in e) {
      return (
        <LucideReact.Lock
          size={16}
          className="text-gray-500"
          aria-hidden="true"
        />
      );
    }
    if ("project_card" in e) {
      if (e.event === "added_to_project") {
        return (
          <LucideReact.PlusSquare
            size={16}
            className="text-green-500"
            aria-hidden="true"
          />
        );
      }
      if (e.event === "moved_column_in_project") {
        return (
          <LucideReact.Move
            size={16}
            className="text-yellow-500"
            aria-hidden="true"
          />
        );
      }
      if (e.event === "removed_from_project") {
        return (
          <LucideReact.MinusSquare
            size={16}
            className="text-red-500"
            aria-hidden="true"
          />
        );
      }
    }
    if (e.event === "converted_note_to_issue") {
      return (
        <LucideReact.FileText
          size={16}
          className="text-blue-400"
          aria-hidden="true"
        />
      );
    }
    if ("issue_url" in e && "body" in e) {
      return (
        <LucideReact.MessageSquare
          size={16}
          className="text-gray-400"
          aria-hidden="true"
        />
      );
    }
    if ("source" in e) {
      return (
        <LucideReact.Repeat
          size={16}
          className="text-teal-500"
          aria-hidden="true"
        />
      );
    }
    if ("sha" in e && "message" in e) {
      return (
        <LucideReact.GitCommit
          size={16}
          className="text-gray-600"
          aria-hidden="true"
        />
      );
    }
    if ("pull_request_url" in e && !("body" in e)) {
      return (
        <LucideReact.CheckCircle
          size={16}
          className="text-green-500"
          aria-hidden="true"
        />
      );
    }
    if ("comments" in e && "commit_id" in e) {
      return (
        <LucideReact.MessageCircle
          size={16}
          className="text-gray-500"
          aria-hidden="true"
        />
      );
    }
    if ("comments" in e) {
      return (
        <LucideReact.Code
          size={16}
          className="text-gray-500"
          aria-hidden="true"
        />
      );
    }
    if ("assignee" in e) {
      return e.event === "assigned" ? (
        <LucideReact.UserPlus
          size={16}
          className="text-green-500"
          aria-hidden="true"
        />
      ) : (
        <LucideReact.UserMinus
          size={16}
          className="text-red-500"
          aria-hidden="true"
        />
      );
    }
    if ("state_reason" in e) {
      return (
        <LucideReact.RefreshCw
          size={16}
          className="text-blue-500"
          aria-hidden="true"
        />
      );
    }
    return (
      <LucideReact.Info
        size={16}
        className="text-gray-400"
        aria-hidden="true"
      />
    );
  };

  const getDescription = (e: any): string => {
    if ("label" in e) {
      const action = e.event === "labeled" ? "added" : "removed";
      return `${action} label "${e.label.name}"`;
    }
    if ("milestone" in e) {
      const action = e.event === "milestoned" ? "added" : "removed";
      return `${action} milestone "${e.milestone.title}"`;
    }
    if ("rename" in e) {
      return `renamed from "${e.rename.from}" to "${e.rename.to}"`;
    }
    if ("review_requester" in e) {
      const who =
        e.requested_reviewer?.login ?? e.requested_team?.name ?? "someone";
      return e.event === "review_requested"
        ? `requested review from ${who}`
        : `removed review request from ${who}`;
    }
    if ("dismissed_review" in e) {
      return `dismissed review (#${e.dismissed_review.review_id})`;
    }
    if ("lock_reason" in e) {
      return `locked conversation${e.lock_reason ? `: ${e.lock_reason}` : ""}`;
    }
    if ("project_card" in e) {
      const col = e.project_card?.column_name ?? "unknown";
      if (e.event === "added_to_project")
        return `added to project column "${col}"`;
      if (e.event === "moved_column_in_project")
        return `moved project card to "${col}"`;
      if (e.event === "removed_from_project")
        return `removed from project column "${col}"`;
    }
    if (e.event === "converted_note_to_issue") {
      return "converted note to issue";
    }
    if ("issue_url" in e && "body" in e) {
      const text = (e.body || e.body_text || "").toString().trim();
      const snippet = text.split("\n")[0].slice(0, 80);
      return snippet
        ? `"${snippet}${text.length > 80 ? "…" : ""}"`
        : "commented";
    }
    if ("source" in e) {
      const src = e.source;
      const label = src.issue
        ? `issue #${src.issue.number}`
        : src.type || "item";
      return `cross-referenced ${label}`;
    }
    if ("sha" in e && "message" in e) {
      return `committed ${e.sha.slice(0, 7)}: ${e.message.split("\n")[0]}`;
    }
    if ("pull_request_url" in e && !("body" in e)) {
      return `review ${e.state}`;
    }
    if ("comments" in e && "commit_id" in e) {
      const cnt = e.comments?.length ?? 0;
      return `${cnt} commit comment${cnt === 1 ? "" : "s"}`;
    }
    if ("comments" in e) {
      const cnt = e.comments?.length ?? 0;
      return `${cnt} line comment${cnt === 1 ? "" : "s"}`;
    }
    if ("assignee" in e) {
      return e.event === "assigned"
        ? `assigned to ${e.assignee.login}`
        : `unassigned from ${e.assignee.login}`;
    }
    if ("state_reason" in e) {
      return `changed state${e.state_reason ? `: ${e.state_reason}` : ""}`;
    }
    return e.event.replace(/_/g, " ");
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      <ul className="flex flex-col space-y-4">
        {value.map((evt, idx) => {
          const e = evt as any;
          const actor = e.actor ?? e.user ?? null;
          const dateText = formatDate(getEventDate(e));
          const icon = getIcon(e);
          const desc = getDescription(e);

          return (
            <li key={idx} className="flex items-start">
              <div className="flex-shrink-0 mt-1">{icon}</div>
              <div className="ml-3 flex-1">
                {actor && (
                  <div className="flex items-center gap-2">
                    <img
                      src={actor.avatar_url}
                      alt={actor.login}
                      onError={(ev) => {
                        (ev.currentTarget as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            actor.login,
                          )}&background=random`;
                      }}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium">{actor.login}</span>
                  </div>
                )}
                <p className="text-sm text-gray-700 mt-1">{desc}</p>
                {dateText && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <LucideReact.Calendar size={12} />
                    <span className="ml-1">{dateText}</span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
