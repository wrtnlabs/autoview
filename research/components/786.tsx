import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Issue Event for Issue
   *
   * @title Issue Event for Issue
   */
  export type issue_event_for_issue =
    | AutoViewInputSubTypes.labeled_issue_event
    | AutoViewInputSubTypes.unlabeled_issue_event
    | AutoViewInputSubTypes.assigned_issue_event
    | AutoViewInputSubTypes.unassigned_issue_event
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
    | AutoViewInputSubTypes.converted_note_to_issue_issue_event;
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
   * Assigned Issue Event
   *
   * @title Assigned Issue Event
   */
  export type assigned_issue_event = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string;
    actor: AutoViewInputSubTypes.simple_user;
    event: string;
    commit_id: string | null;
    commit_url: string | null;
    created_at: string;
    performed_via_github_app: AutoViewInputSubTypes.integration;
    assignee: AutoViewInputSubTypes.simple_user;
    assigner: AutoViewInputSubTypes.simple_user;
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
   * Unassigned Issue Event
   *
   * @title Unassigned Issue Event
   */
  export type unassigned_issue_event = {
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
    assigner: AutoViewInputSubTypes.simple_user;
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
}
export type AutoViewInput = AutoViewInputSubTypes.issue_event_for_issue[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Sort events by most recent
  const events = [...value].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  // Format date as "Jan 1, 12:34 PM"
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // Render a human‐friendly description for each event
  const renderDescription = (
    e: AutoViewInputSubTypes.issue_event_for_issue,
  ): JSX.Element => {
    switch (e.event) {
      case "labeled": {
        const ev = e as AutoViewInputSubTypes.labeled_issue_event;
        return (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.Tag size={16} className="text-blue-500" />
            <span>
              added label{" "}
              <span
                className="px-1.5 py-0.5 rounded text-xs font-medium text-white"
                style={{ backgroundColor: `#${ev.label.color}` }}
              >
                {ev.label.name}
              </span>
            </span>
          </div>
        );
      }
      case "unlabeled": {
        const ev = e as AutoViewInputSubTypes.unlabeled_issue_event;
        return (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.Tag size={16} className="text-red-500" />
            <span>removed label {ev.label.name}</span>
          </div>
        );
      }
      case "assigned": {
        const ev = e as AutoViewInputSubTypes.assigned_issue_event;
        return (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.UserPlus size={16} className="text-green-500" />
            <span>assigned to {ev.assignee.login}</span>
          </div>
        );
      }
      case "unassigned": {
        const ev = e as AutoViewInputSubTypes.unassigned_issue_event;
        return (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.UserMinus size={16} className="text-red-500" />
            <span>unassigned from {ev.assignee.login}</span>
          </div>
        );
      }
      case "milestoned": {
        const ev = e as AutoViewInputSubTypes.milestoned_issue_event;
        return (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.Calendar size={16} className="text-indigo-500" />
            <span>added milestone "{ev.milestone.title}"</span>
          </div>
        );
      }
      case "demilestoned": {
        const ev = e as AutoViewInputSubTypes.demilestoned_issue_event;
        return (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.Calendar size={16} className="text-gray-500" />
            <span>removed milestone "{ev.milestone.title}"</span>
          </div>
        );
      }
      case "renamed": {
        const ev = e as AutoViewInputSubTypes.renamed_issue_event;
        return (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.Edit2 size={16} className="text-yellow-500" />
            <span>
              renamed from "{ev.rename.from}" to "{ev.rename.to}"
            </span>
          </div>
        );
      }
      case "review_requested":
      case "review_request_removed": {
        const ev = e as
          | AutoViewInputSubTypes.review_requested_issue_event
          | AutoViewInputSubTypes.review_request_removed_issue_event;
        const action = e.event === "review_requested" ? "requested" : "removed";
        const target = ev.requested_reviewer
          ? ev.requested_reviewer.login
          : ev.requested_team
            ? ev.requested_team.name
            : "review";
        return (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.MessageCircle size={16} className="text-blue-500" />
            <span>
              {action} review {action === "requested" ? "from" : "for"} {target}
            </span>
          </div>
        );
      }
      case "review_dismissed": {
        const ev = e as AutoViewInputSubTypes.review_dismissed_issue_event;
        return (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.XCircle size={16} className="text-red-500" />
            <span>dismissed review (state: {ev.dismissed_review.state})</span>
          </div>
        );
      }
      case "locked": {
        const ev = e as AutoViewInputSubTypes.locked_issue_event;
        return (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.Lock size={16} className="text-gray-500" />
            <span>locked{ev.lock_reason ? ` (${ev.lock_reason})` : ""}</span>
          </div>
        );
      }
      case "added_to_project":
      case "moved_column_in_project":
      case "removed_from_project":
      case "converted_note_to_issue": {
        // treat these generically
        return (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.Layers size={16} className="text-indigo-400" />
            <span>{e.event.replace(/_/g, " ")}</span>
          </div>
        );
      }
      default:
        return <span className="text-gray-700">{e.event}</span>;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {events.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2 text-sm">No events to display</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {events.map((e) => (
            <li
              key={e.id}
              className="flex items-start space-x-3 group hover:bg-gray-50 p-2 rounded"
            >
              <div className="flex-shrink-0 mt-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <img
                    src={e.actor.avatar_url}
                    alt={e.actor.login}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(evt) => {
                      evt.currentTarget.onerror = null;
                      evt.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        e.actor.login,
                      )}&background=ddd&color=555`;
                    }}
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {e.actor.login}
                  </span>
                </div>
                <div className="mt-1 text-sm">{renderDescription(e)}</div>
              </div>
              <time className="ml-4 flex-shrink-0 text-xs text-gray-400">
                {formatDate(e.created_at)}
              </time>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
