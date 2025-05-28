import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Issue Event for Issue
     *
     * @title Issue Event for Issue
    */
    export type issue_event_for_issue = AutoViewInputSubTypes.labeled_issue_event | AutoViewInputSubTypes.unlabeled_issue_event | AutoViewInputSubTypes.assigned_issue_event | AutoViewInputSubTypes.unassigned_issue_event | AutoViewInputSubTypes.milestoned_issue_event | AutoViewInputSubTypes.demilestoned_issue_event | AutoViewInputSubTypes.renamed_issue_event | AutoViewInputSubTypes.review_requested_issue_event | AutoViewInputSubTypes.review_request_removed_issue_event | AutoViewInputSubTypes.review_dismissed_issue_event | AutoViewInputSubTypes.locked_issue_event | AutoViewInputSubTypes.added_to_project_issue_event | AutoViewInputSubTypes.moved_column_in_project_issue_event | AutoViewInputSubTypes.removed_from_project_issue_event | AutoViewInputSubTypes.converted_note_to_issue_issue_event;
    /**
     * Labeled Issue Event
     *
     * @title Labeled Issue Event
    */
    export interface labeled_issue_event {
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
    export interface enterprise {
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
    }
    /**
     * Unlabeled Issue Event
     *
     * @title Unlabeled Issue Event
    */
    export interface unlabeled_issue_event {
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
    }
    /**
     * Assigned Issue Event
     *
     * @title Assigned Issue Event
    */
    export interface assigned_issue_event {
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
    }
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
    export interface unassigned_issue_event {
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
    }
    /**
     * Milestoned Issue Event
     *
     * @title Milestoned Issue Event
    */
    export interface milestoned_issue_event {
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
    }
    /**
     * Demilestoned Issue Event
     *
     * @title Demilestoned Issue Event
    */
    export interface demilestoned_issue_event {
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
    }
    /**
     * Renamed Issue Event
     *
     * @title Renamed Issue Event
    */
    export interface renamed_issue_event {
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
    }
    /**
     * Review Requested Issue Event
     *
     * @title Review Requested Issue Event
    */
    export interface review_requested_issue_event {
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
     * Review Request Removed Issue Event
     *
     * @title Review Request Removed Issue Event
    */
    export interface review_request_removed_issue_event {
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
    }
    /**
     * Review Dismissed Issue Event
     *
     * @title Review Dismissed Issue Event
    */
    export interface review_dismissed_issue_event {
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
    }
    /**
     * Locked Issue Event
     *
     * @title Locked Issue Event
    */
    export interface locked_issue_event {
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
    }
    /**
     * Added to Project Issue Event
     *
     * @title Added to Project Issue Event
    */
    export interface added_to_project_issue_event {
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
    }
    /**
     * Moved Column in Project Issue Event
     *
     * @title Moved Column in Project Issue Event
    */
    export interface moved_column_in_project_issue_event {
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
    }
    /**
     * Removed from Project Issue Event
     *
     * @title Removed from Project Issue Event
    */
    export interface removed_from_project_issue_event {
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
    }
    /**
     * Converted Note to Issue Issue Event
     *
     * @title Converted Note to Issue Issue Event
    */
    export interface converted_note_to_issue_issue_event {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.issue_event_for_issue[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const eventIconMap: Record<string, { icon: React.ElementType; color: string }> = {
    labeled: { icon: LucideReact.Tag, color: 'text-green-500' },
    unlabeled: { icon: LucideReact.Tag, color: 'text-gray-500' },
    assigned: { icon: LucideReact.UserPlus, color: 'text-green-500' },
    unassigned: { icon: LucideReact.UserMinus, color: 'text-gray-500' },
    milestoned: { icon: LucideReact.Flag, color: 'text-teal-500' },
    demilestoned: { icon: LucideReact.Flag, color: 'text-gray-500' },
    renamed: { icon: LucideReact.Edit2, color: 'text-blue-500' },
    review_requested: { icon: LucideReact.MessageSquare, color: 'text-blue-500' },
    review_request_removed: { icon: LucideReact.MessageSquare, color: 'text-gray-500' },
    review_dismissed: { icon: LucideReact.MessageSquare, color: 'text-gray-500' },
    locked: { icon: LucideReact.Lock, color: 'text-red-500' },
    added_to_project: { icon: LucideReact.PlusSquare, color: 'text-indigo-500' },
    moved_column: { icon: LucideReact.Move, color: 'text-indigo-500' },
    removed_from_project: { icon: LucideReact.MinusSquare, color: 'text-indigo-500' },
    converted_note_to_issue: { icon: LucideReact.Edit2, color: 'text-orange-500' },
  };

  function renderDetail(
    event: AutoViewInputSubTypes.issue_event_for_issue
  ): React.ReactNode {
    if ('label' in event) {
      return (
        <span className="ml-1">
          <span
            className="px-1.5 py-0.5 rounded text-xs font-medium"
            style={{ backgroundColor: `#${event.label.color}`, color: '#fff' }}
          >
            {event.label.name}
          </span>
        </span>
      );
    }
    if ('assignee' in event) {
      return (
        <span className="ml-1 font-medium">
          {(event as AutoViewInputSubTypes.assigned_issue_event).assignee.login}
        </span>
      );
    }
    if ('milestone' in event) {
      return <span className="ml-1 font-medium">{event.milestone.title}</span>;
    }
    if ('rename' in event) {
      return (
        <span className="ml-1 font-medium">
          {event.rename.from} → {event.rename.to}
        </span>
      );
    }
    if ('review_requester' in event) {
      return (
        <span className="ml-1 font-medium">
          {event.review_requester.login}
        </span>
      );
    }
    if ('dismissed_review' in event) {
      return (
        <span className="ml-1 font-medium">
          {event.dismissed_review.state}
        </span>
      );
    }
    if ('lock_reason' in event) {
      return event.lock_reason ? (
        <span className="ml-1 italic">{event.lock_reason}</span>
      ) : null;
    }
    if ('project_card' in event && event.project_card) {
      return (
        <span className="ml-1 font-medium">
          {event.project_card.column_name}
        </span>
      );
    }
    return null;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <ul className="space-y-4">
      {value.map((event) => {
        const key = event.id;
        const typeKey = event.event as string;
        const { icon: Icon, color } =
          eventIconMap[typeKey] || {
            icon: LucideReact.Activity,
            color: 'text-gray-400',
          };
        const actionText = typeKey.replace(/_/g, ' ');
        const when = formatDate(event.created_at);
        const detail = renderDetail(event);

        return (
          <li key={key} className="flex items-start">
            <div className="mt-1.5">
              <Icon size={20} className={color} />
            </div>
            <div className="ml-3 flex-1 bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <img
                  src={event.actor.avatar_url}
                  alt={event.actor.login}
                  className="w-6 h-6 rounded-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      event.actor.login
                    )}&background=0D8ABC&color=fff`;
                  }}
                />
                <span className="font-medium text-gray-800">
                  {event.actor.login}
                </span>
              </div>
              <div className="mt-1 text-sm text-gray-700 flex items-center">
                <span className="font-medium capitalize">{actionText}</span>
                {detail}
              </div>
              <div className="mt-1 text-xs text-gray-500 flex items-center">
                <LucideReact.Calendar size={12} className="mr-1" />
                {when}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
